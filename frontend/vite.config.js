import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // <--- 1. 引入外掛

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // <--- 2. 啟用外掛
  ],
  // 由於 Go 後端在 :8080，前端在 :5173，建議設置代理，但目前先確保 Vue 啟動
  server: {
    host: true, // 確保在網絡中可訪問
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
      },
      '/healthcheck': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
      },
    },
  },
});