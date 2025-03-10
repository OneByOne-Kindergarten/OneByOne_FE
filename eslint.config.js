import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
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
    },
    rules: {
      semi: ["error", "always"],
      "import/order": [
        // import 순서 정렬
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ], // 그룹별 정렬
          alphabetize: {
            order: "asc", // 알파벳 순 정렬
            caseInsensitive: true, // 대소문자 무시
          },
        },
      ],
      // 컴포넌트 선언 방식
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "function-declaration", // 함수 선언식 형태
          unnamedComponents: "arrow-function", // 화살표 함수 형태
        },
      ],
      // 컴포넌트 이름 PascalCase 강제
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "function",
          format: ["PascalCase"],
          custom: {
            regex: "^[A-Z]",
            match: true,
          },
        },
      ],
      "no-multiple-empty-lines": "error", // 여러 줄 공백 금지
      "no-unused-vars": "off", // 사용하지 않는 변수 금지
      "no-console": "error", // 콘솔로그 사용 시 에러
      "tailwindcss/classnames-order": "warn", // Tailwind 클래스 이름 정렬
      "tailwindcss/enforces-shorthand": "warn", // Tailwind 단축 속성 사용
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  }
);
