
module.exports = (host, port) => {

  return {
    compress: true,
    clientLogLevel: 'none',
    contentBase: './',
    watchContentBase: true,
    hot: true,
    publicPath: '/',
    quiet: true,
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebookincubator/create-react-app/issues/293
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 1000,
    },
    host,
    port,
    public: host,
    overlay: false,
    disableHostCheck: true, // 允许host绑定
    open: false,
    historyApiFallback: true,
    // proxy: {
    //   '/basic-server': 'http://192.168.1.219:9200',
    //   pathRewrite: {
    //     '^/basic-server': '',
    //   },
    //   changeOrigin: true,
    //   // '/': {
    //   //   target: 'http://api.kun.wiki',
    //   //   changeOrigin: true,
    //   //   secure: false,
    //   // }
    // }
  };
};
