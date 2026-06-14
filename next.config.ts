import type { NextConfig } from 'next'

const repoName = 'portfoliov3'
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isGitHubPages ? `/${repoName}` : '',
  assetPrefix: isGitHubPages ? `/${repoName}/` : '',
  images: {
    unoptimized: true,
  },
  // Suppress GSAP and SplitType SSR warnings
  experimental: {},
}

export default nextConfig
