// next.config.js
const path = require('path')
const withLess = require('@zeit/next-less')

module.exports = withLess({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]'
  },
  webpack (config) {
    const { resolve = {}, module = {} } = config
    return {
      ...config,
      module: {
        ...module,
        rules: [
          ...(module.rules || []),
          {
            test: /\.(png|woff|woff2|eot|ttf|gif|jpg|ico|svg)$/,
            loader: 'file-loader',
            options: {
              name: '[name]_[hash].[ext]',
              publicPath: `/_next/static/assets`,
              outputPath: 'static/assets'
            }
          }
        ]
      },
      resolve: {
        ...resolve,
        alias: {
          ...(resolve.alias || {}),
          '@utils': path.join(__dirname, 'utils')
        }
      }
    }
  }
})
