import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
    }) as any,
  ],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-audio': ['wavesurfer.js', '@wavesurfer/react'],
          'vendor-ui': ['@mantine/core', '@mantine/hooks'],
          'vendor-react': ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
