import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// Served from https://jyotisingh2027-art.github.io/Jyoti_Kumari-Singh_portfolio/
export default defineConfig({
  base: "/Jyoti_Kumari-Singh_portfolio/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
