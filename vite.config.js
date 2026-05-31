import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        programs: resolve(__dirname, 'programs.html'),
        cfp: resolve(__dirname, 'cfp.html'),
        innovation: resolve(__dirname, 'innovation.html'),
        life: resolve(__dirname, 'life.html'),
        admissions: resolve(__dirname, 'admissions.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
