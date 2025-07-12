import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
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
    test: {
      environment: 'jsdom',
      globals: true,
    },
    server: {
      host: '0.0.0.0',
      allowedHosts: [env.VITE_NGROK_HOST],
      proxy: {
        '/api': {
          target: env.VITE_TOUR_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
        '/path/navigation': {
          target: env.VITE_TMAP_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/path\/navigation/, ''),
        },
      },
    },
  };
});
