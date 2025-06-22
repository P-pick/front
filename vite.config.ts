import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tailwindcss(), svgr()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      host: '0.0.0.0',
      allowedHosts: [env.VITE_NGROK_HOST],
      proxy: {
        '/api': {
          target: 'https://apis.data.go.kr/B551011/KorService2',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
        '/path/navigation': {
          target: 'https://apis.openapi.sk.com/tmap/routes',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/path\/navigation/, ''),
        },
      },
    },
  };
});
