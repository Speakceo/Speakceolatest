import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Orbit Student - Young Entrepreneurship Program',
        short_name: 'Orbit Student',
        description: 'Transform your child into a future business leader with our comprehensive 90-Day Young CEO Program.',
        theme_color: '#4F46E5',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: '/icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: '/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    open: true,
    hmr: {
      timeout: 5000
    },
    middlewareMode: false,
    proxy: {},
    historyApiFallback: true
  },
  preview: {
    port: 3000,
    strictPort: true,
    host: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  envPrefix: 'VITE_',
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', '@lottiefiles/react-lottie-player'],
          'chart-vendor': ['apexcharts', 'react-apexcharts'],
          'utils-vendor': ['date-fns', 'zod', 'zustand']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  css: {
    devSourcemap: true
  }
});