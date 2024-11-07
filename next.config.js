/** @type {import('next').NextConfig} */
const nextConfig = {
  // swcMinify: false, // 'minify' in Next versions < 12.0
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'd27kvsajbyluqu.cloudfront.net',
            port: '',
            pathname: '/orimedia/userplaylist/**'
          },
          {
            protocol: 'https',
            hostname: 'd1twwl5im4sryx.cloudfront.net',
            port: '',
            pathname: '/orimedia/userplaylist/**'
          },
          {
            protocol: 'https',
            hostname: 'd2dpgifhjosriw.cloudfront.net',
            port: '',
            pathname: '/POSTER/**'
          },
          {
            protocol: 'https',
            hostname: 'd1twwl5im4sryx.cloudfront.net',
            port: '',
            pathname: '/POSTER/**'
          },
          {
            protocol: 'https',
            hostname: 'd2dpgifhjosriw.cloudfront.net',
            port: '',
            pathname: '/POSTER/**'
          },
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com' 
          },
          {
            protocol: 'https',
            hostname: 'd27kvsajbyluqu.cloudfront.net',
            pathname: '/orimedia/castandcrew/**'
          },
          {
            protocol: 'https',
            hostname: 'd27kvsajbyluqu.cloudfront.net',
            port: '',
            pathname: '/orimedia/subscriber/**'
          },

          {
            protocol: 'https',
            hostname: 'd1v8zxa9gk5f.cloudfront.net',
            port: '',
            pathname: '/orimedia/posterDest/**'
          },
        ],
        domains: ['firebasestorage.googleapis.com'],
        domains: ['d27kvsajbyluqu.cloudfront.net', 'd1v8zxa9gk5f.cloudfront.net', 'firebasestorage.googleapis.com'],
      },
}
module.exports = nextConfig
