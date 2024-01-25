import Vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [UnoCSS(), Vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  base: '/baseline-green/',
});
