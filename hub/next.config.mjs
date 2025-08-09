/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/bube-blog',
  // assetPrefix: '/bube-blog/',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
}

export default nextConfig
