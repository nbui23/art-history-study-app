import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/art-history-study-app/',
  plugins: [react()],
});
