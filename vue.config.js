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
    client: {
      overlay: false // tắt màn hình đỏ
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Phim Hay Mỗi Ngày', // 👉 Đây là tiêu đề bạn muốn
    },
  },
})
