const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const theme = require('./theme');

const rootDir = process.cwd();
const publicDir = path.resolve(rootDir, 'public');
const srcDir = path.resolve(rootDir, 'src');
console.log('rootDir==', rootDir);

module.exports = {
  entry: {
    index: path.resolve(srcDir, 'index.tsx'),
  },
  output: {
    path: rootDir + '/build',
    filename: 'chunks/[name].min.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          colors: false,
          experimentalWatchApi: true,
          onlyCompileBundledFiles: true,
          getCustomTransformers: () => {
            return {
              before: [tsImportPluginFactory({
                libraryDirectory: 'es',
                libraryName: 'antd',
                style: true,
              })]
            };
          },
          compilerOptions: {
            module: 'es2015'
          }
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            }
          },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.less$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[path]_[local]_[hash:base64:6]',
              },
              sourceMap: false,
            }
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: theme,
              javascriptEnabled: true,
            },
          }
        ],
      },
      {
        test: /\.less$/,
        exclude: [/src/],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            }
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: theme,
              javascriptEnabled: true,
            },
          }
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'assets/images/[name]_[hash:base64:6].[ext]',
        }
      },
      {
        test: /\.(ttf|otf)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'assets/fonts/[name]_[hash:base64:6].[ext]',
        }
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      pages: path.resolve(srcDir, 'pages'),
      components: path.resolve(srcDir, 'components'),
      containers: path.resolve(srcDir, 'containers'),
      common: path.resolve(srcDir, 'common'),
      api: path.resolve(srcDir, 'api'),
      assets: path.resolve(srcDir, 'assets'),
      model: path.resolve(srcDir, 'model'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(publicDir, 'index.html'),
      inject: true,
      chunksSortMode: 'none',
      chunks: ['index'],
    }),
    new CaseSensitivePathsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      allChunks: true,
    }),
    new webpack.optimize.ModuleConcatenationPlugin({}),
    // new webpack.DefinePlugin({
    //   'PROCESS_ENV': JSON.stringify({ ...env }),
    // }),
  ],
  // optimization: {
  //   splitChunks: {
  //     name: true
  //   }
  // },
};
