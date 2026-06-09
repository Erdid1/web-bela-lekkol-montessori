// vite.config.js
import { defineConfig } from "file:///sessions/nice-beautiful-curie/mnt/10%20WEB%20BELA%20LEKKOL%20MONTESSORI/bela-lekkol-montessori/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
var __vite_injected_original_dirname = "/sessions/nice-beautiful-curie/mnt/10 WEB BELA LEKKOL MONTESSORI/bela-lekkol-montessori";
var vite_config_default = defineConfig({
  // Chemin de base pour GitHub Pages + domaine custom
  base: "/",
  // Le dossier public/ est copié tel quel dans dist/
  publicDir: "public",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    // Garder les noms de fichiers lisibles (pas de hash aléatoire)
    rollupOptions: {
      input: {
        main: resolve(__vite_injected_original_dirname, "index.html"),
        about: resolve(__vite_injected_original_dirname, "about.html"),
        programs: resolve(__vite_injected_original_dirname, "programs.html"),
        cfp: resolve(__vite_injected_original_dirname, "cfp.html"),
        innovation: resolve(__vite_injected_original_dirname, "innovation.html"),
        life: resolve(__vite_injected_original_dirname, "life.html"),
        admissions: resolve(__vite_injected_original_dirname, "admissions.html"),
        contact: resolve(__vite_injected_original_dirname, "contact.html")
      },
      output: {
        // JS bundlés dans assets/
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        // CSS dans assets/
        assetFileNames: (assetInfo) => {
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name || "")) {
            return "assets/img/[name]-[hash][extname]";
          }
          if (/\.css$/.test(assetInfo.name || "")) {
            return "assets/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvc2Vzc2lvbnMvbmljZS1iZWF1dGlmdWwtY3VyaWUvbW50LzEwIFdFQiBCRUxBIExFS0tPTCBNT05URVNTT1JJL2JlbGEtbGVra29sLW1vbnRlc3NvcmlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9zZXNzaW9ucy9uaWNlLWJlYXV0aWZ1bC1jdXJpZS9tbnQvMTAgV0VCIEJFTEEgTEVLS09MIE1PTlRFU1NPUkkvYmVsYS1sZWtrb2wtbW9udGVzc29yaS92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vc2Vzc2lvbnMvbmljZS1iZWF1dGlmdWwtY3VyaWUvbW50LzEwJTIwV0VCJTIwQkVMQSUyMExFS0tPTCUyME1PTlRFU1NPUkkvYmVsYS1sZWtrb2wtbW9udGVzc29yaS92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAvLyBDaGVtaW4gZGUgYmFzZSBwb3VyIEdpdEh1YiBQYWdlcyArIGRvbWFpbmUgY3VzdG9tXG4gIGJhc2U6ICcvJyxcblxuICAvLyBMZSBkb3NzaWVyIHB1YmxpYy8gZXN0IGNvcGlcdTAwRTkgdGVsIHF1ZWwgZGFucyBkaXN0L1xuICBwdWJsaWNEaXI6ICdwdWJsaWMnLFxuXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZGlzdCcsXG4gICAgYXNzZXRzRGlyOiAnYXNzZXRzJyxcbiAgICAvLyBHYXJkZXIgbGVzIG5vbXMgZGUgZmljaGllcnMgbGlzaWJsZXMgKHBhcyBkZSBoYXNoIGFsXHUwMEU5YXRvaXJlKVxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIG1haW46ICAgICAgICByZXNvbHZlKF9fZGlybmFtZSwgJ2luZGV4Lmh0bWwnKSxcbiAgICAgICAgYWJvdXQ6ICAgICAgIHJlc29sdmUoX19kaXJuYW1lLCAnYWJvdXQuaHRtbCcpLFxuICAgICAgICBwcm9ncmFtczogICAgcmVzb2x2ZShfX2Rpcm5hbWUsICdwcm9ncmFtcy5odG1sJyksXG4gICAgICAgIGNmcDogICAgICAgICByZXNvbHZlKF9fZGlybmFtZSwgJ2NmcC5odG1sJyksXG4gICAgICAgIGlubm92YXRpb246ICByZXNvbHZlKF9fZGlybmFtZSwgJ2lubm92YXRpb24uaHRtbCcpLFxuICAgICAgICBsaWZlOiAgICAgICAgcmVzb2x2ZShfX2Rpcm5hbWUsICdsaWZlLmh0bWwnKSxcbiAgICAgICAgYWRtaXNzaW9uczogIHJlc29sdmUoX19kaXJuYW1lLCAnYWRtaXNzaW9ucy5odG1sJyksXG4gICAgICAgIGNvbnRhY3Q6ICAgICByZXNvbHZlKF9fZGlybmFtZSwgJ2NvbnRhY3QuaHRtbCcpLFxuICAgICAgfSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICAvLyBKUyBidW5kbFx1MDBFOXMgZGFucyBhc3NldHMvXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgLy8gQ1NTIGRhbnMgYXNzZXRzL1xuICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xuICAgICAgICAgIGlmICgvXFwuKHBuZ3xqcGU/Z3xnaWZ8c3ZnfHdlYnB8aWNvKSQvLnRlc3QoYXNzZXRJbmZvLm5hbWUgfHwgJycpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Fzc2V0cy9pbWcvW25hbWVdLVtoYXNoXVtleHRuYW1lXSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgvXFwuY3NzJC8udGVzdChhc3NldEluZm8ubmFtZSB8fCAnJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnYXNzZXRzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV0nO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdJztcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErYixTQUFTLG9CQUFvQjtBQUM1ZCxTQUFTLGVBQWU7QUFEeEIsSUFBTSxtQ0FBbUM7QUFHekMsSUFBTyxzQkFBUSxhQUFhO0FBQUE7QUFBQSxFQUUxQixNQUFNO0FBQUE7QUFBQSxFQUdOLFdBQVc7QUFBQSxFQUVYLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQTtBQUFBLElBRVgsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsTUFBYSxRQUFRLGtDQUFXLFlBQVk7QUFBQSxRQUM1QyxPQUFhLFFBQVEsa0NBQVcsWUFBWTtBQUFBLFFBQzVDLFVBQWEsUUFBUSxrQ0FBVyxlQUFlO0FBQUEsUUFDL0MsS0FBYSxRQUFRLGtDQUFXLFVBQVU7QUFBQSxRQUMxQyxZQUFhLFFBQVEsa0NBQVcsaUJBQWlCO0FBQUEsUUFDakQsTUFBYSxRQUFRLGtDQUFXLFdBQVc7QUFBQSxRQUMzQyxZQUFhLFFBQVEsa0NBQVcsaUJBQWlCO0FBQUEsUUFDakQsU0FBYSxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUNoRDtBQUFBLE1BQ0EsUUFBUTtBQUFBO0FBQUEsUUFFTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQTtBQUFBLFFBRWhCLGdCQUFnQixDQUFDLGNBQWM7QUFDN0IsY0FBSSxrQ0FBa0MsS0FBSyxVQUFVLFFBQVEsRUFBRSxHQUFHO0FBQ2hFLG1CQUFPO0FBQUEsVUFDVDtBQUNBLGNBQUksU0FBUyxLQUFLLFVBQVUsUUFBUSxFQUFFLEdBQUc7QUFDdkMsbUJBQU87QUFBQSxVQUNUO0FBQ0EsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
