/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_FACEBOOK_PIXEL_ID?: string;
  readonly VITE_ORG_TELEPHONE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
