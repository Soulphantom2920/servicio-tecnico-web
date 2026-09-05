/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_DEPLOY_CONTEXT?: 'development' | 'preview' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
