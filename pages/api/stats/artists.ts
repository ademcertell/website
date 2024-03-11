import { NextApiRequest, NextApiResponse } from "next";
import { topArtists } from "@/lib/spotify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await topArtists();
    const { items } = await response.json();

    const artists = items.slice(0, 5).map((artist: any) => ({
      name: artist.name,
      url: artist.external_urls.spotify,
      coverImage: artist.images[1],
      followers: artist.followers.total,
    }));

    res.setHeader(
      "Cache-Control",
      "public, s-maxage=86400, stale-while-revalidate=43200"
    );

    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}