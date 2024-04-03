/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  redirects() {
    return [
      {
        source: '/',
        destination: '/landing',
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    additionalData: `@import "@/styles/main.scss";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/globalnomad/**',
      },
      {
        protocol: 'https',
        hostname: 'd2vcremxatlmjn.cloudfront.net',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
