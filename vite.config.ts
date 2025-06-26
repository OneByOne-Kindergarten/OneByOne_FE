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
      host: true,
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          secure: false,
        },
        // OAuth 콜백을 프론트엔드로 라우팅
        "^/users/(kakao|naver)/callback": {
          target: "http://localhost:5173",
          changeOrigin: true,
          secure: false,
          bypass(req) {
            const isKakao = req.url?.includes("kakao");
            const provider = isKakao ? "kakao" : "naver";
            const queryString = req.url?.split("?")[1] || "";
            const newUrl = `/auth/oauth-callback?provider=${provider}&${queryString}`;

            console.log(
              `🔄 ${provider} OAuth 콜백 라우팅:`,
              req.url,
              "→",
              newUrl
            );
            return newUrl;
          },
        },
      },
    },
  };
});
