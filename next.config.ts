import { networkInterfaces } from 'os'

import bundleAnalyzer from '@next/bundle-analyzer'
import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

import ENV from '@/configs/env'

const withNextIntl = createNextIntlPlugin()
const withBundleAnalyzer = bundleAnalyzer({
  enabled: ENV.ANALYZE === 'true',
})

function shouldAllowLocalIP(): boolean {
  if (process.env.ALLOW_LOCAL_IMAGE_IP === 'true') return true
  if (process.env.ALLOW_LOCAL_IMAGE_IP === 'false') return false
  if (process.env.NODE_ENV === 'development') return true

  const cms = process.env.NEXT_PUBLIC_CMS ?? ''
  return /:\/\/(localhost|127\.0\.0\.1)(:\d+)?|\.local(:\d+)?/i.test(cms)
}

/** LAN IPs so phone/tablet can load /_next JS during `next dev`. */
function getLanDevOrigins(): string[] {
  const hosts = new Set<string>()

  for (const nets of Object.values(networkInterfaces())) {
    for (const net of nets ?? []) {
      if (net.family !== 'IPv4' || net.internal) continue
      hosts.add(net.address)
    }
  }

  for (const origin of process.env.ALLOWED_DEV_ORIGINS?.split(',') ?? []) {
    const value = origin.trim()
    if (value) hosts.add(value)
  }

  return [...hosts]
}

const nextConfig: NextConfig = {
  allowedDevOrigins: getLanDevOrigins(),
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
    deviceSizes: [430, 768, 1080, 1280, 1600, 1920],
    dangerouslyAllowLocalIP: shouldAllowLocalIP(),
  },
  reactStrictMode: false,
  output: 'standalone',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    viewTransition: true,
    webVitalsAttribution: ['CLS', 'LCP'],
    // cssChunking: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

// ANALYZE=true pnpm build

export default withBundleAnalyzer(withNextIntl(nextConfig))
