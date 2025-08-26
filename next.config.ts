import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'res.cloudinary.com',
        port:'',
        pathname:'/**',
        search:''

      },{
        protocol : 'https',
        hostname: 'unsplash.com'
      }
    ]
  }
};

export default nextConfig;
