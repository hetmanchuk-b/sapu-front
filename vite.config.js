import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],

  build: {
    rollupOptions: {
      input: {
        'index': resolve(__dirname, 'src/pages/home/index.html'),
        'article': resolve(__dirname, 'src/pages/article/index.html'),
        'blog': resolve(__dirname, 'src/pages/blog/index.html'),
        'contact': resolve(__dirname, 'src/pages/contact/index.html'),
        'project': resolve(__dirname, 'src/pages/project/index.html'),
        'projects': resolve(__dirname, 'src/pages/projects/index.html'),
        'service': resolve(__dirname, 'src/pages/service/index.html'),
        'veterans': resolve(__dirname, 'src/pages/veterans/index.html'),
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    open: 'src/pages/home/index.html'
  }
})