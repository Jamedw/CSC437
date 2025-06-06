import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shrek: resolve(__dirname, 'shrek.html'),
        login: resolve(__dirname, 'login.html'),
        register: resolve(__dirname, 'newuser.html')

      },
    },
  },
})
