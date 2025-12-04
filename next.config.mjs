/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['images.ctfassets.net', 'downloads.ctfassets.net'],
    unoptimized: true, 
  },
  
  eslint: {
    // This tells Next.js to ignore all ESLint errors and warnings during 'pnpm run build'
    ignoreDuringBuilds: true,
  },
  
};

export default nextConfig;