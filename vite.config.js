import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, './index.html'),
        script: path.resolve(__dirname, 'src/script.js'),
        orderForm: path.resolve(__dirname, 'src/order-form.js'),
        style: path.resolve(__dirname, 'src/style.css'),
        orderFormStyles: path.resolve(__dirname, 'src/order-form.css'),
        twoStepOrderFormStyles: path.resolve(__dirname, 'src/two-step-order-form.css'),
        twoStepOrderForm: path.resolve(__dirname, 'src/two-step-order-form.js'),
      },
      external: ["https://www.google.com/recaptcha/api.js"],
      output: {
        assetFileNames: '[name][extname]',
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
      },
    },
    outDir: 'dist',
  },
});
