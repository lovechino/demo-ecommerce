/** @type {import('next').Config} */
const nextConfig = {
 

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.smartwork.3i.com.vn',
        pathname: '/uploads/images/**', 
      },
      
      {
        protocol: 'https',
        hostname: 'file.hstatic.net',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**', 
      }
    
    ],
  },
};

module.exports = nextConfig;