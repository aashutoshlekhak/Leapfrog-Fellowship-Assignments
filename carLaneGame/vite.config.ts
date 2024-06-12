import { defineConfig } from "vite";
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        game: "/src/gamePages/gameScreen.html",
        end: "/src/gamePages/gameOver.html",
      },
    },
  },
});
