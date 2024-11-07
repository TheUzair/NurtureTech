import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend) // Load translations from files
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    // lng: "en",  if we're using a language detector, we do not have to define the lng option
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Path to the language files
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
