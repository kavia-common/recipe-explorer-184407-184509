import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      // Help environments that fail to resolve modules explicitly
      'react/jsx-runtime': 'react',
      react: 'react',
      'react-dom': 'react-dom'
    },
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['.kavia.ai'],
    port: 3000,
    strictPort: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    watch: {
      usePolling: true,
    },
  },
});
