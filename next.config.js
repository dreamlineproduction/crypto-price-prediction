/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['bootstrap'],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add CSS loader for Bootstrap
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });

    return config;
  },
}

module.exports = nextConfig
