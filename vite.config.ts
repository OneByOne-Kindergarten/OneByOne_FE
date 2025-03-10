import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import withReactRouter from "vite-plugin-next-react-router";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    withReactRouter({
      pageDir: "src/pages", // pages 디렉토리 위치
      extensions: [".tsx"], // 파일 확장자
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
