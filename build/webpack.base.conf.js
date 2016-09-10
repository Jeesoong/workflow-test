var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var precss = require('precss')
var StringReplacePlugin = require("string-replace-webpack-plugin")
var webpack = require("webpack")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    'app': './src/main.js',
    'detail': './mainsrc/static/detail/index.js',
    'poi': './mainsrc/static/poi/index.js',
    'ratelist' : './mainsrc/static/rateList/index.js',
    'bdRedirect' : './mainsrc/static/bdRedirect/index.js',
    'dailyDetail' : './mainsrc/static/dailyDetail/index.js',
    // 'common' : ['widgets/zepto/zepto.js','widgets/juicer/juicer.js','widgets/ajax/index.js'],
    // 'swiper' : ['widgets/swiper/swiper.min.js']
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'widgets': path.resolve(__dirname, '../mainsrc/widgets')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    /*preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],*/
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 2000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /env.js$/,
        loader: StringReplacePlugin.replace({
          replacements: [
            {
              pattern: /aaa/ig,
              replacement: function (match, p1, offset, string) {
                return JSON.stringify(config.host[process.env.NODE_ENV]);
              }
            }
          ]})
      },
      {
        test: /\.scss$/,
        // loader: ExtractTextPlugin.extract({"style", "css!postcss!sass"}),
        loader: ExtractTextPlugin.extract({fallbackLoader:"style-loader", loader:"css-loader!postcss-loader!sass-loader"}),
        include: path.join(projectRoot, '../mainsrc'),
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: "html",
        include: path.join(projectRoot, '../mainsrc'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        // loader: ExtractTextPlugin.extract({fallbackLoader:"style", loader:"css!postcss!sass"}),
        loader: ExtractTextPlugin.extract({fallbackLoader:"style", loader:"css!postcss"}),
        include: path.join(projectRoot, '../mainsrc'),
        exclude: /node_modules/
      },
      {
        test: /\.tpl$/,
        loader: "string"
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
      chunks: ['detail', 'poi','ratelist'], //提取哪些模块共有的部分
      minChunks: 3 // 提取至少2个模块共有的部分
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack-demos',
      filename: 'app/detail.html',
      hash: false,
      inject: true,
      template: path.join(__dirname, '../mainsrc/app/detail.html'),
      //minify: {collapseWhitespace: true},
      chunks: ['vendors', 'detail']

    }),
    new HtmlWebpackPlugin({
      title: 'Webpack-demos',
      filename: 'app/poi.html',
      hash: false,
      inject: true,
      template: path.join(__dirname, '../mainsrc/app/poi.html'),
      //minify: {collapseWhitespace: true},
      chunks: ['vendors','poi']
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack-demos',
      filename: 'app/bd_redirect.html',
      hash: false,
      inject: true,
      template: path.join(__dirname, '../mainsrc/app/bd_redirect.html'),
      //minify: {collapseWhitespace: true},
      chunks: ['bdRedirect']

    }),
    new HtmlWebpackPlugin({
      title: 'Webpack-demos',
      filename: 'app/dailyDetail.html',
      hash: false,
      inject: true,
      template: path.join(__dirname, '../mainsrc/app/dailyDetail.html'),
      //minify: {collapseWhitespace: true},
      chunks: ['dailyDetail']

    }),
    new HtmlWebpackPlugin({
        title: 'Webpack-demos',
        filename: 'app/lineDetail.html',
        hash: false,
        inject: true,
        template: path.join(__dirname, '../mainsrc/app/lineDetail.html'),
        // minify: {collapseWhitespace: true},
        chunks: []

    }),
    new HtmlWebpackPlugin({
        title: 'Webpack-demos',
        filename: 'app/daily.html',
        hash: false,
        inject: true,
        template: path.join(__dirname, '../mainsrc/app/daily.html'),
        // minify: {collapseWhitespace: true},
        chunks: []

    }),
    new HtmlWebpackPlugin({
        title: 'Webpack-demos',
        filename: 'app/midpage.html',
        hash: false,
        inject: true,
        template: path.join(__dirname, '../mainsrc/app/midpage.html'),
        // minify: {collapseWhitespace: true},
        chunks: []

    }),
    new HtmlWebpackPlugin({
      title: 'Webpack-demos',
      filename: 'app/ratelist.html',
      hash: false,
      inject: true,
      template: path.join(__dirname, '../mainsrc/app/ratelist.html'),
      // minify: {collapseWhitespace: true},
      chunks: ['vendors','ratelist']

    }),
    // PC兼容URL
    new HtmlWebpackPlugin({
      filename: 'down/down.html',
      template: 'src/pc/down/down.html',
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyCSS: true,
        minifyJS: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'down/downc.html',
      template: 'src/pc/down/downc.html',
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyCSS: true,
        minifyJS: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'appdown.html',
      template: 'src/pc/appdown.html',
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        minifyCSS: true,
        minifyJS: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    })
  ],
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders()
  },
  postcss: function() {
      return [precss, autoprefixer({ browsers: ['>0%'] })];
  }
}
