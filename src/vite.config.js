import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000, // Puedes cambiar este número si 3000 ya está en uso
    hmr: {
      clientPort: 443, // Importante para HMR en Replit
    },
  },
});
