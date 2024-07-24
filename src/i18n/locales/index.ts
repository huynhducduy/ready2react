import type UnionToTupleWithoutOrder from '@/utils/types/UnionToTupleWithoutOrder'

interface Locale {
  [index: string]: string | Locale
}

type LocaleBundle = Record<string, () => Promise<{default: Locale}>>

const locales = {
  en: () => import('./en.json'),
  vi: () => import('./vi.json'),
} satisfies LocaleBundle

export type AvailableLocale = keyof typeof locales

export const availableLocales = Object.keys(locales) as UnionToTupleWithoutOrder<AvailableLocale>

export function isLocaleAvailable(locale: string): locale is AvailableLocale {
  return availableLocales.includes(locale)
}

export default locales
