import { NextResponse } from "next/server";

const API = "https://api.steampowered.com";

type Player = {
  steamid: string;
  personastate: number;
  gameid?: string;
  gameextrainfo?: string;
  profileurl: string;
  avatarfull: string;
};

function mapStatus(code: number, inGame: boolean) {
  if (inGame) return { label: "In-Game", emoji: "🎮" };
  const map: Record<number, { label: string; emoji: string }> = {
    0: { label: "Offline", emoji: "⚫" },
    1: { label: "Online", emoji: "🟢" },
    2: { label: "Busy", emoji: "🔴" },
    3: { label: "Away", emoji: "🟠" },
    4: { label: "Snooze", emoji: "🟡" },
    5: { label: "Looking to Trade", emoji: "🟣" },
    6: { label: "Looking to Play", emoji: "🟢" },
  };
  return map[code] ?? { label: "Unknown", emoji: "⚪" };
}

export async function GET() {
  try {
    const key = process.env.STEAM_API_KEY!;
    const steamId = process.env.STEAM_ID64!;
    if (!key || !steamId) {
      return NextResponse.json({ error: "Missing env" }, { status: 500 });
    }

    // Player summary (status + in-game)
    const sumRes = await fetch(
      `${API}/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${steamId}`,
      { cache: "no-store" }
    );
    const player: Player | undefined = (await sumRes.json())?.response
      ?.players?.[0];

    if (!player)
      return NextResponse.json({ error: "player-not-found" }, { status: 404 });

    const inGame = Boolean(player.gameid);
    const status = mapStatus(player.personastate ?? 0, inGame);

    if (inGame && player.gameid) {
      const appId = player.gameid;
      return NextResponse.json(
        {
          inGame: true,
          status,
          gameName: player.gameextrainfo ?? "Playing",
          appId,
          storeUrl: `https://store.steampowered.com/app/${appId}`,
          headerImage: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/header.jpg`,
          steamProfileUrl: player.profileurl,
          avatar: player.avatarfull,
        },
        {
          headers: {
            "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
          },
        }
      );
    }

    const recentRes = await fetch(
      `${API}/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${key}&steamid=${steamId}&format=json`,
      { cache: "no-store" }
    );
    const recent = await recentRes.json();
    const recentGames: any[] = recent?.response?.games ?? [];

    const mostRecent = recentGames
      .slice()
      .sort(
        (a, b) => (b.rtime_last_played ?? 0) - (a.rtime_last_played ?? 0)
      )[0];

    if (mostRecent) {
      return NextResponse.json(
        {
          inGame: false,
          status,
          fallback: "recent",
          appId: mostRecent.appid,
          gameName: mostRecent.name,
          storeUrl: `https://store.steampowered.com/app/${mostRecent.appid}`,
          headerImage: `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${mostRecent.appid}/header.jpg`,
          steamProfileUrl: player.profileurl,
          avatar: player.avatarfull,
        },
        {
          headers: {
            "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
          },
        }
      );
    }

    const ownedRes = await fetch(
      `${API}/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${steamId}&include_appinfo=1&include_played_free_games=1&format=json`,
      { cache: "no-store" }
    );
    const owned = await ownedRes.json();
    const games: any[] = owned?.response?.games ?? [];

    const ownedPick = games
      .map((g) => ({ ...g, rtime_last_played: g.rtime_last_played ?? 0 }))
      .sort((a, b) =>
        b.rtime_last_played !== a.rtime_last_played
          ? b.rtime_last_played - a.rtime_last_played
          : (b.playtime_forever ?? 0) - (a.playtime_forever ?? 0)
      )[0];

    return NextResponse.json({
      inGame: false,
      status,
      fallback: ownedPick ? "owned" : null,
      appId: ownedPick?.appid ?? null,
      gameName: ownedPick?.name ?? null,
      storeUrl: ownedPick
        ? `https://store.steampowered.com/app/${ownedPick.appid}`
        : null,
      headerImage: ownedPick
        ? `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${ownedPick.appid}/header.jpg`
        : null,
      steamProfileUrl: player.profileurl,
      avatar: player.avatarfull,
    });
  } catch {
    return NextResponse.json({ error: "Steam API error" }, { status: 500 });
  }
}