/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: isProd ? '/bube-blog' : '',
  assetPrefix: isProd ? '/bube-blog/' : '',
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
