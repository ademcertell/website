import { NextResponse } from 'next/server';
import getNowPlaying from '@/lib/spotify';

// Bu API rotası, kullanıcının şu anda çalan şarkısını almak için kullanılır.
// Spotify'dan verileri çekmek için "getNowPlaying" fonksiyonunu kullanır.
// Eğer herhangi bir şarkı çalmıyorsa veya veri alınırken hata oluşursa "false" döner.
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    const response = await getNowPlaying();

    // Eğer şu anda herhangi bir şarkı çalmıyorsa veya veri alınırken hata oluşursa "isPlaying: false" döner.
    if (
      response.status === 204 ||
      response.status > 400 ||
      response?.data?.item === null ||
      !response.data
    ) {
      return NextResponse.json({ isPlaying: false });
    }

    const song = response.data;

    // Şu anda çalan şarkı yoksa "isPlaying: false" döner.
    if (song.is_playing === false) {
      return NextResponse.json({ isPlaying: false });
    }

    // Eğer şarkı çalıyorsa, çalan şarkının bilgilerini döner.
    const isPlaying = song.is_playing;
    const name = song.item.name;
    const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
    const album = song.item.album.name;
    const albumImageURL = song.item.album.images[0].url;
    const songUrl = song.item.external_urls.spotify;

    return NextResponse.json({
      isPlaying,
      name,
      artist,
      album,
      albumImageURL,
      songUrl,
    });
  } catch {
    // Herhangi bir hata durumunda, "isPlaying: false" ve "message: 'Error'" döner.
    return NextResponse.json(
      {
        isPlaying: false,
        message: 'Hata',
      },
      { status: 500 }
    );
  }
};
