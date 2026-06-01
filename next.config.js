const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 14.2.5 has a known bug: enabling strictMode with the Redux/React
  // DevTools browser extension throws "Missing ActionQueueContext" and crashes
  // the router. Re-enable after upgrading to Next.js 15+.
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://api.neyome.com/:path*',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'neyome.com',
      },
      {
        protocol: 'https',
        hostname: 'api.neyome.com',
      },
    ],
  },
}

module.exports = withNextIntl(nextConfig)
