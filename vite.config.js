import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: 'js',
    lib: {
        entry: path.resolve(__dirname, "src/main.ts"),
        name: 'kh',
        formats: ['umd', 'iife'],
        fileName: (format) => `khmerformat${format === 'iife' ? '' : '.' + format}.min.js`
    },
    rollupOptions: {
        output: {
            globals: {}
        },
    },
    minify: 'terser'
  },
});