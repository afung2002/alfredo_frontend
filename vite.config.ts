import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Specify the path to the env directory
  const envDir = path.resolve(process.cwd(), 'env');

  // Load environment variables from the custom env directory
  const env = loadEnv(mode, envDir, '');
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@components': path.resolve(__dirname, './src/components'),
        '@constants': path.resolve(__dirname, './src/constants'),
        '@types': path.resolve(__dirname, './src/types'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@services': path.resolve(__dirname, './src/services'),
        '@redux': path.resolve(__dirname, './src/redux'),
        '@fundManagerLayouts': path.resolve(__dirname, './src/apps/fund-manager/layouts'),
        '@fundManagerPages': path.resolve(__dirname, './src/apps/fund-manager/pages'),
      },
    },
    envDir,
    server: {
      proxy: {
        '/api/v1': {
          target: 'http://54.158.102.128',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1'),
        },
      },
    },
  };
});
