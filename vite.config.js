import { defineConfig } from 'vite';

export default defineConfig({
  base: '/vanilla-app-template/', // переконайтеся, що це відповідає назві вашого репозиторію
  build: {
    outDir: 'dist',
  },
});
