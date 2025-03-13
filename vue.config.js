const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://ophim1.com', // API gốc
        changeOrigin: true,
        secure: false, // Bỏ kiểm tra SSL (nếu cần)
        pathRewrite: { '^/api': '' }, // Thay thế /api thành rỗng
      },
    },
  },
})
