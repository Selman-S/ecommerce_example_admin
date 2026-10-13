/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
  // Allow Cloudinary assets through next/image.
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
    },
  ],
},
};

export default nextConfig;
