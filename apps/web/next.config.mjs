/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
   remotePatterns:[
    {
      hostname:"cdn.jsdelivr.net",
      protocol:"https",
      pathname:"/**",
    },
    {
      hostname:"avatars.githubusercontent.com",
      protocol:"https",
      pathname:"/**",
    },
    {
      hostname:"tvhistoria.com.br",
      protocol:"https",
      pathname:"/**",
    }
   ]
  },
}

export default nextConfig
