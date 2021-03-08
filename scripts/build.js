// 注入环境变量
process.env.NODE_ENV = process.argv.splice(2)[0] || 'dev';
const ora = require('ora');
const compilers = require('./common/compilers');
const { webpackConfigProdJs } = require('./common/paths');

function build() {
  const webpackCompiler = compilers.webpackCompiler(webpackConfigProdJs);
  const spinner = ora('==>> 正在打包 ==>> ');
  spinner.start();

  webpackCompiler.run(err => {
    if (err) {
      throw err;
    }
    console.log('');
    console.log('打包完成。');
    spinner.stop();

    process.exit();
  });
}

build();
