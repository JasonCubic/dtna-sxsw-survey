import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import vue from '@vitejs/plugin-vue';

const config = defineConfig({
  base: '/dtna-sxsw-survey/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});

export default config;
