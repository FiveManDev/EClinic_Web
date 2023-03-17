/** @type {import('next').NextConfig} */
const path = require("path")
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.printgo.vn",
      "eclinicbucket.s3.ap-southeast-1.amazonaws.com"
    ]
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  }
}

module.exports = nextConfig
