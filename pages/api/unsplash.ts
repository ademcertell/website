import { NextApiHandler } from "next";

const API_CLIENTID = process.env.NEXT_PUBLIC_API_CLIENTID;
const API_URL = `https://api.unsplash.com/users/ademcan/photos?client_id=${process.env.UNSPLASH_CLIENT_ID}`;

const handler: NextApiHandler = async (req, res) => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(
        `Unsplash API isteği basarisiz: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "API isteği sirasinda hata oldu." });
  }
};

export default handler;