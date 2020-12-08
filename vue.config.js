module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/bahamut-pie/'
    : '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector',
  ],
};
