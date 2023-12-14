const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */

const nextConfig = {
    async redirects() {
        return [
            {
                source: "/item/:path*",
                destination: "/items/:path*",
                permanent: true
            },
            {
                source: "/collection/:path*",
                destination: "/collections/:path*",
                permanent: true
            },
            {
                source: "/leaderboard/:path*",
                destination: "/leaderboards/:path*",
                permanent: true
            },
            {
                source: "/member/:path*",
                destination: "/members/:path*",
                permanent: true
            },
            {
                source: "/post/:path*",
                destination: "/posts/:path*",
                permanent: true
            }
        ]
    }
}

module.exports = withMDX(nextConfig);
