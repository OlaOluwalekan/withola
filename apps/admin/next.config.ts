import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ['@prisma/client', 'pg'],
  transpilePackages: ['@repo/database'],
}

export default nextConfig
