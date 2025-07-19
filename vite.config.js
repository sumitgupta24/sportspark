import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ghPages from 'vite-plugin-gh-pages'

// replace with your repo name
const repoName = 'sportspark'

export default defineConfig({
  plugins: [react(), ghPages()],
  base: `/${SportSpark}/`, // 👈 for GitHub Pages
})
