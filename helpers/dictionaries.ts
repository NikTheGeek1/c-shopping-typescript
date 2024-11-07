'server-only'

const dictionaries: { [key: string]: () => Promise<any> } = {
  zh: () => import('../public/locales/zh/common.json').then(module => module.default),
  en: () => import('../public/locales/en/common.json').then(module => module.default),
  gr: () => import('../public/locales/gr/common.json').then(module => module.default),
}

export const getDictionary = async (locale: string): Promise<any> => dictionaries[locale]()
