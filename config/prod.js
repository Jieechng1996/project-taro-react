/*
 * @Date: 2022-01-13 17:22:13
 * @Author: guojiecheng
 * @LastEditTime: 2022-01-14 09:45:15
 * @LastEditors: guojiecheng
 */
module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
    WEB_TYPE: "'production'",
    WEB_HOST: "'https://e.ausnutria.com'",
  },
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
