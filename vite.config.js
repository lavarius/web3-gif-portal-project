import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    hmr: {
      port: 443,
    }
  }
});
