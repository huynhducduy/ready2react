/// <reference types="vite/client" />

interface ImportMetaEnv {
  // MARK: BEGIN .env environment variables
  readonly VITE_APP_NAME: string
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_DESCRIPTION: string
  readonly VITE_GOOGLE_AUTH_CLIENT_ID: string
  // MARK: END .env environment variables
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
