import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: "get-with-abort-hook",
    },
    rollupOptions: {
      external: ['react', 'axios'],
    },
  },
});

