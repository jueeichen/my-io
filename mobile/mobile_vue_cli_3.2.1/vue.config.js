// vue.config.js
const webpack = require("webpack");//配置全局jq用到;
module.exports = {
  // 选项...
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',//开发环境需要./
  outputDir: "dist",//就是打包后的文件夹名字默认'dist'
  assetsDir: "assets",//打包后静态文件名字
  indexPath: "index.html",//打包后的index.html自定义名称
  filenameHashing: false,//关闭文件名哈希
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    // host: "localhost",//一般无需设置;
    port: 3001, // 端口号
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理的时候用
    // 配置多个代理,解决跨域
    // proxy: {
    //   "/api": {
    //     target: "<url>",
    //     ws: true,
    //     changeOrigin: true
    //   },
    //   "/foo": {
    //     target: "<other_url>"
    //   }
    // }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 50, // 换算的基数
            selectorBlackList: ['el', 'mu'], // 忽略转换正则匹配项
            propList: ['*'],
          }),
        ]
      }
    }
  },
  chainWebpack: config => {
    config.module.rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end()
  }
}