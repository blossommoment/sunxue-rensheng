import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:5175"
    },
    allowedHosts: ["74bbd35c815e4b8d8738db0bfb4b20f2.ap-singapore.myide.io"]

  }
});

