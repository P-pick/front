import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), svgr()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/setupTests.ts',
    },
    server: {
      proxy: {
        '/api': {
          target: 'https://apis.data.go.kr/B551011/KorService2',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
        '/path/navigation': {
          target: 'https://apis.openapi.sk.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/path\/navigation/, ''),
        },
      },
    },
  };
});
