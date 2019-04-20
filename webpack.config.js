/* eslint-disable no-unused-vars */
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { rules, plugins, loaders } = require('webpack-atoms')
var ManifestPlugin = require('webpack-manifest-plugin')
var WebpackPwaManifest = require('webpack-pwa-manifest')

// sw-precache-webpack-plugin configurations
const SERVICE_WORKER_FILENAME = './service-worker.js'
const SERVICE_WORKER_CACHEID = 'lain'
const SERVICE_WORKER_IGNORE_PATTERNS = [/dist\/.*\.html/]
const SW_PRECACHE_CONFIG = {
  minify: false,
  cacheId: SERVICE_WORKER_CACHEID,
  filename: SERVICE_WORKER_FILENAME,
  staticFileGlobsIgnorePatterns: SERVICE_WORKER_IGNORE_PATTERNS
}
const HTML_WEBPACK_OPTIONS = {
  main: {
    title: 'client',
    template: 'index.html',
    appMountId: 'lain',
    serviceWorker: `/${SERVICE_WORKER_FILENAME}`,
    filename: './index.html',
    inject: true
    // minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    // },
    // chunksSortMode: 'dependency',
  }
}
module.exports = {
  mode: 'production',
  // mode: 'development',
  cache: true,
  entry: './src/z.config.mjs',
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx']
  },
  output: {
    filename: '[name].bundle.mjs',
    chunkFilename: '[name].bundle.mjs',
    library: 'client',
    path: path.resolve(__dirname, 'dist')
  },
  watch: false,
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      rules.js(),
      rules.images(),
      rules.css()
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  plugins: [
    // new WebpackPwaManifest({
    //   name: 'lain',
    //   short_name: 'lain',
    //   description: 'Progressive Web App',
    //   background_color: '#d9fed8',
    //   theme_color: '#cdfecc',
    //   crossorigin: 'use-credentials',
    //   filename: 'manifest.json',
    //   orientation: 'portrait',
    //   display: 'standalone',
    //   start_url: '.',
    //   inject: true,
    //   fingerprints: true,
    //   ios: true,
    //   publicPath: true,
    //   includeDirectory: true,
    //   icons: [
    //     {
    //       src: path.resolve('src/assets/icons/android-icon.png'),
    //       sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
    //     }
    //   ]
    // }),
    // new ManifestPlugin(options),
    plugins.loaderOptions(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.AutomaticPrefetchPlugin(),
    new SWPrecacheWebpackPlugin(SW_PRECACHE_CONFIG),
    new CompressionPlugin(
      {
        test: /\.js/,
        include: /\/includes/,
        exclude: /\/excludes/,
        cache: true
      }
    ),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './static'),
        to: './static',
        ignore: ['.*']
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './src/manifest'),
        to: './',
        ignore: ['.*']
      }
    ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin(HTML_WEBPACK_OPTIONS.main)
  ]
}
