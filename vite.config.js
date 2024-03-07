import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [
    react(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: {
    port: 3030,
    proxy: {
      '/v1/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/socket.io': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  preview: {
    port: 3030,
  },
});
