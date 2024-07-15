// NOTE: remember to update vite-env.d.ts
export const APP_NAME = import.meta.env.VITE_APP_NAME
export const API_URL = import.meta.env.VITE_API_URL
export const TITLE = import.meta.env.VITE_APP_TITLE
export const DESCRIPTION = import.meta.env.VITE_APP_DESCRIPTION
export const MODE = import.meta.env.MODE
export const DEBUG = ['test', 'development'].includes(import.meta.env.MODE)
