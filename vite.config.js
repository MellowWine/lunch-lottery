// 文件路径: vite.config.js

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // ====================================================================
  // VITAL: 关键配置！
  // 请将这里的 'lunch-lottery' 替换成你在 GitHub 上的【仓库名】
  // 例如，如果你的仓库名叫 MyCoolApp，就改成 base: '/MyCoolApp/'
  // ====================================================================
  base: '/lunch-lottery/',

  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})