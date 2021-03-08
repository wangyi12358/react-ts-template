
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const webpackConfigBase = require('./webpack.config.base');

module.exports = {
  ...webpackConfigBase,
  mode: 'production',
  // devtool: 'none',
  output: {
    ...webpackConfigBase.output,
    pathinfo: false,
  },
  plugins: [
    ...webpackConfigBase.plugins,
    // 压缩代码
    // new UglifyJsPlugin(),
    // new OptimizeCssAssetsPlugin({
    //   cssProcessor: require(nodeModulesPath + '/cssnano'), // eslint-disable-line
    //   cssProcessorOptions: { discardComments: { removeAll: true }, zindex: false },
    //   canPrint: true
    // }),
    new CleanWebpackPlugin(),
    // new CompressionWebpackPlugin({
    //   // asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   // test: new RegExp('\\.(' + ['js, css'].join('|') + ')$'),
    //   threshold: 10240,
    //   // deleteOriginalAssets: true, // 删除源文件，不建议
    //   minRatio: 0.8
    // })
  ],
};
