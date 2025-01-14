import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: false, // Disable minification
    rollupOptions: {
      external: ["https://www.google.com/recaptcha/api.js"],
      output: {
        assetFileNames: '[name][extname]', // Removes "assets/" from the path for CSS
        entryFileNames: '[name].js',      // Removes "assets/" from the path for JS
      },
    },
  },
});
