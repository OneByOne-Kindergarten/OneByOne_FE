/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REACT_APP_API_URL: string;
  readonly DEV: boolean;
  readonly MODE: string;
  readonly SSR: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
