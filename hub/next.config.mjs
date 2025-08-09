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
          // Security headers
          {
            key: "Content-Security-Policy",
            value: csp,
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },

          // Cache-Control headers
          {
            source: "/_next/static/(.*)",
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=31536000, immutable",
              },
            ],
          },
          {
            source: "/static/(.*)",
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=31536000, immutable",
              },
            ],
          },
          {
            source: "/",
            headers: [
              {
                key: "Cache-Control",
                value: "no-cache, no-store, must-revalidate",
              },
            ],
          },
          {
            source: "/(.*)",
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=0, must-revalidate",
              },
            ],
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
