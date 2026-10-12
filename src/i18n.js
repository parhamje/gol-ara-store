import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fa from './locales/fa/translation.json';
import en from './locales/en/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    fa: { translation: fa },
    en: { translation: en },
  },
  lng: 'fa',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => {
  document.documentElement.dir = lng === 'fa' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
});

// Set initial direction
document.documentElement.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
document.documentElement.lang = i18n.language;

export default i18n;
