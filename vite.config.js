import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ Set the repo name here
export default defineConfig({
  plugins: [react()],
  base: '/sportspark/', // 👈 Important for GitHub Pages
});
