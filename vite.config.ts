import path from "path";

import { sentryVitePlugin } from "@sentry/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import viteCompression from "vite-plugin-compression";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isCI = process.env.CI === "true";

  return {
    plugins: [
      react(),
      svgr(),
      viteCompression({
        algorithm: "gzip",
        ext: ".gz",
      }),
      // CI 환경에서는 Sentry 플러그인을 조건부로 로드
      ...(isCI || !process.env.SENTRY_AUTH_TOKEN
        ? []
        : [
            sentryVitePlugin({
              org: process.env.SENTRY_ORG,
              project: process.env.SENTRY_PROJECT,
              authToken: process.env.SENTRY_AUTH_TOKEN,
              sourcemaps: {
                assets: ["./dist/**/*"],
                ignore: ["node_modules"],
              },
            }),
          ]),
    ],
    resolve: {
      alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    build: {
      sourcemap: true,
    },
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          secure: false,
        },
      },
    },
  };
});
