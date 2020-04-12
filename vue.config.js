module.exports = {
  devServer: {
    port: 8000,
    proxy: { // 代理
      '/info': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/info': ''
        }
      }
    }
  }

}
