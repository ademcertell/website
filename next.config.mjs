/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    // Basit ve hatasız çözüm
    domains: [
      "images.unsplash.com",        // Unsplash fotoğrafları
    ],
  },
};

export default nextConfig;
