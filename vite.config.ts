import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/et-si-on-parlait-vraiment/',
  plugins: [react()],
  server: {
    host: true,
  },
});
