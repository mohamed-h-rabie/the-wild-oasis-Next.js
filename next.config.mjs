/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ckjkytyrbmobofvaiuop.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabins-images/**",
      },
    ],
  },
  // for SSG
  // output: "export",
};

export default nextConfig;
