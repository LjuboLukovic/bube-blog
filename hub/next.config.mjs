const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data:",
  "connect-src 'self' www.google-analytics.com www.googletagmanager.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "frame-src 'none'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath: '/bube-blog',
  // assetPrefix: '/bube-blog/',
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: true,
  },
  // output: 'export',
};

export default nextConfig;
