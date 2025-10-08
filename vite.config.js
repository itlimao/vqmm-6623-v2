import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import obfuscator from "vite-plugin-javascript-obfuscator";

export default defineConfig({
  plugins: [
    react(),
    obfuscator({
      rotateStringArray: true,
      stringArray: true,
      stringArrayThreshold: 0.75,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.75,
      deadCodeInjection: true,
      debugProtection: false,
      disableConsoleOutput: true,
    }),
  ],
  build: {
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: true,
      mangle: true,
      keep_classnames: false,
      keep_fnames: false,
      format: { comments: false },
    },
    rollupOptions: {
      output: {
        entryFileNames: "assets/[hash].js",
        chunkFileNames: "assets/[hash].js",
        assetFileNames: "assets/[hash].[ext]",
        manualChunks: undefined,
      },
    },
  },
});
