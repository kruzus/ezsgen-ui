/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites(){
    return [
      {
        source: '/*',
        destination: 'http://127.0.0.1:9090/genpass',
      },
    ]
  }
}

module.exports = nextConfig
