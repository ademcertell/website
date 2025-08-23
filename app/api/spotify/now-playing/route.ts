import { NextResponse } from "next/server";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";

async function getAccessToken() {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
    }),
    cache: "no-store",
  });

  return response.json();
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    const res = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: "no-store",
    });

    if (res.status === 204 || res.status > 400) {
      return NextResponse.json({ isPlaying: false });
    }

    const song = await res.json();

    return NextResponse.json({
      isPlaying: song.is_playing,
      title: song.item?.name,
      artist: song.item?.artists?.map((a: any) => a.name).join(", "),
      albumImageUrl: song.item?.album?.images?.[0]?.url,
      songUrl: song.item?.external_urls?.spotify,
      progressMs: song.progress_ms,
      durationMs: song.item?.duration_ms,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ isPlaying: false });
  }
}
