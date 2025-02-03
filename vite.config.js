import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    minify: false, // Disable minification
    rollupOptions: {
      input: {
        // Entry points for HTML and additional JS files
        script: path.resolve(__dirname, 'src/script.js'), // Additional JS entry
        orderForm: path.resolve(__dirname, 'src/order-form.js'), // Additional JS entry
        style: path.resolve(__dirname, 'src/style.css'), // Additional JS entry
        orderFormStyles: path.resolve(__dirname, 'src/order-form.css'), // Additional JS entry
        twoStepOrderFormStyles: path.resolve(__dirname, 'src/two-step-order-form.css'), // Additional JS entry
        twoStepOrderForm: path.resolve(__dirname, 'src/two-step-order-form.js'), // Additional JS entry



      },
      external: ["https://www.google.com/recaptcha/api.js"], // External dependencies
      output: {
        assetFileNames: '[name][extname]', // Custom asset names
        entryFileNames: '[name].js',      // Output JS files as [name].js
        chunkFileNames: '[name]-[hash].js', // Name dynamically imported chunks
      },
    },
    outDir: 'dist', // Output directory
  },
});
