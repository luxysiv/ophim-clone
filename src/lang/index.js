// import Vue from 'vue'
import { createI18n  } from 'vue-i18n'
import { getLanguage } from '@/utils/cookies'

// vue-i18n 
import vi from 'element-plus/dist/locale/vi.mjs'
import en from 'element-plus/dist/locale/en.mjs'

import zh from 'element-plus/dist/locale/zh-cn.mjs'
// User defined lang
import en_US from './en_US'
import vi_VN from './vi_VN'
import zh_CN from './zh_CN'

const messages = {
  'en-US': {
    ...en,
    ...en_US
  },
  'vi-VN': {
    ...vi,
    ...vi_VN
  },
  'zh-CN': {
    ...zh,
    ...zh_CN
  }
}


export const getLocale = () => {
  const cookieLanguage = getLanguage()
  if (cookieLanguage) {
    document.documentElement.lang = cookieLanguage
    return cookieLanguage
  }
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      document.documentElement.lang = locale
      return locale
    }
  }
  // Default language is vietnamese
  return 'vi-VN'
}
const CURRENT_LANG = getLocale()

// first entry

const i18n = createI18n({
  locale: CURRENT_LANG,
  messages
})

export default i18n
