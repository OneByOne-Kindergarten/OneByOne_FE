import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
    },
    rules: {
      semi: ["error", "always"],
      "no-unused-vars": "off", // 사용하지 않는 변수 금지
      "@typescript-eslint/no-unused-vars": "warn",
      ...reactHooks.configs.recommended.rules,
      "react-hooks/exhaustive-deps": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // Import 순서 정렬 규칙
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node.js 내장 모듈
            "external", // 써드파티 라이브러리
            "internal", // 내부 모듈 (절대경로)
            "parent", // 상위 디렉토리 (../)
            "sibling", // 같은 디렉토리 (./)
            "index", // index 파일
            "type", // 타입 import
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      // 사용하지 않는 import 제거
      "import/no-unused-modules": "off",
      // 중복 import 금지
      "import/no-duplicates": "error",
    },
  }
);
