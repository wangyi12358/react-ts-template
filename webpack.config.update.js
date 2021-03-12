const rootSrc = __dirname + '/src';

module.exports = (config) => {

  config = {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        components: rootSrc + '/components',
        common: rootSrc + '/common',
        assets: rootSrc + '/assets',
        api: rootSrc + '/api',
        model: rootSrc + '/model',
        pages: rootSrc + '/pages'
      }
    },
  };

  return config;
};