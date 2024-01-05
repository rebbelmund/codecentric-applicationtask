import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/

// const path = require('path')

export default defineConfig({
  plugins: [vue(), EnvironmentPlugin('all')],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
