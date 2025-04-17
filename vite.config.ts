import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      svgr(),
      viteCompression({
        algorithm: "gzip",
        ext: ".gz",
      }),
    ],
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    server: {
      host: true, // 로컬 테스트를 위해 호스트 설정
      proxy: {
        "/api": {
          target: env.VITE_PUBLIC_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          secure: false,
        },
      },
    },
  };
});
