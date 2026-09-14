import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.svg', 'favicon.ico'],
      manifest: {
        name: 'HERITEX - Explore Heritage, Experience Technology',
        short_name: 'HERITEX',
        description: 'Ekosistem Game-Based Cultural Literacy, AI Verifier, Living Map, dan Pelestarian Cagar Budaya Indonesia.',
        theme_color: '#FAF8F5',
        background_color: '#FAF8F5',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/logo.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
