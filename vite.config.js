import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Chemin de base pour GitHub Pages + domaine custom
  base: '/',

  // Le dossier public/ est copié tel quel dans dist/
  publicDir: 'public',

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Garder les noms de fichiers lisibles (pas de hash aléatoire)
    rollupOptions: {
      input: {
        main:        resolve(__dirname, 'index.html'),
        about:       resolve(__dirname, 'about.html'),
        programs:    resolve(__dirname, 'programs.html'),
        cfp:         resolve(__dirname, 'cfp.html'),
        innovation:  resolve(__dirname, 'innovation.html'),
        life:        resolve(__dirname, 'life.html'),
        admissions:  resolve(__dirname, 'admissions.html'),
        contact:     resolve(__dirname, 'contact.html'),
        actualites:  resolve(__dirname, 'actualites.html'),
      },
      output: {
        // JS bundlés dans assets/
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        // CSS dans assets/
        assetFileNames: (assetInfo) => {
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name || '')) {
            return 'assets/img/[name]-[hash][extname]';
          }
          if (/\.css$/.test(assetInfo.name || '')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
