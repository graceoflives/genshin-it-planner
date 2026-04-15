import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(detector)
  .use(backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    load: 'currentOnly',
    backend: {
      loadPath: '/genshin-it-planner/locales/{{lng}}/{{ns}}.json'
    },
    ns: ['common'],
    defaultNS: 'common',
    fallbackLng: 'en-US',
    keySeparator: '.', // enable dot notation for nested keys
    nonExplicitSupportedLngs: false,
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  })

export default i18n
