import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, type Plugin } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Automatically create dist/404.html from dist/index.html for GitHub Pages SPA support
function githubPagesSpaPlugin(): Plugin {
  return {
    name: 'github-pages-spa',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexFile = path.resolve(distDir, 'index.html');
      const notFoundFile = path.resolve(distDir, '404.html');
      try {
        if (fs.existsSync(indexFile)) {
          fs.copyFileSync(indexFile, notFoundFile);
        }
      } catch (err) {
        console.warn('Could not copy 404.html for GitHub Pages:', err);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    // Configures the correct subpath for GitHub Pages: https://<username>.github.io/amazon-ungating-tool/
    base: '/amazon-ungating-tool/',
    plugins: [react(), tailwindcss(), githubPagesSpaPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
