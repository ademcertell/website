// lib/spotify.ts
import querystring from "querystring";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";

const clientId = process.env.SPOTIFY_CLIENT_ID!;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN!;

if (!clientId || !clientSecret || !refreshToken) {
  throw new Error("Missing Spotify env vars.");
}

function b64(s: string) {
  return Buffer.from(s).toString("base64");
}

async function getAccessToken(): Promise<string> {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${b64(`${clientId}:${clientSecret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error("Spotify token failed: " + t);
  }
  const j = await res.json();
  return j.access_token as string;
}

export async function getNowPlayingSafe() {
  const access = await getAccessToken();

  const res = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${access}` },
    cache: "no-store",
  });

  // 204 => çalmıyor
  if (res.status === 204 || res.status === 202) {
    return { isPlaying: false } as const;
  }
  if (!res.ok) {
    return { isPlaying: false } as const;
  }

  const song = await res.json();

  const item = song?.item;
  if (!item) return { isPlaying: false } as const;

  return {
    isPlaying: song.is_playing === true,
    title: item.name as string,
    artist: item.artists?.map((a: any) => a.name).join(", ") as string,
    albumName: item.album?.name as string,
    albumImageUrl: item.album?.images?.[0]?.url as string,
    songUrl: item.external_urls?.spotify as string,
    progressMs: song.progress_ms as number,
    durationMs: item.duration_ms as number,
  };
}
