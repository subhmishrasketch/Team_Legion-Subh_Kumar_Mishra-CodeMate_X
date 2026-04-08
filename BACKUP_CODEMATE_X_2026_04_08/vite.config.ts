import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // make sure the generated icons are included in the build output
      includeAssets: [
        "favicon.svg",
        "robots.txt",
        "icons/icon-192x192.png",
        "icons/icon-512x512.png",
        "icons/apple-touch-icon.png"
      ],
      manifest: {
        name: "CodeMate",
        short_name: "CodeMate",
        description: "CodeMate: Student collaboration platform",
        theme_color: "#3c50dc",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "icons/animated-icon.svg",
            sizes: "100x100",
            type: "image/svg+xml"
          },
          {
            src: "favicon.svg",
            sizes: "any",
            type: "image/svg+xml"
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "favicon.ico",
            sizes: "32x32",
            type: "image/x-icon"
          }
        ]
      }
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
