interface Locale {
  [index: string]: string | Locale
}

type LocaleBundle = Record<string, () => Promise<{default: Locale}>>

const bundles: LocaleBundle = {
  en: () => import('./en.json'),
  vi: () => import('./vi.json'),
}

export const availableLocales = Object.keys(bundles)

export default bundles
