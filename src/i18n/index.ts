import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import vi from './locales/vi.json';

let savedLanguage = 'en';
try {
  savedLanguage = localStorage.getItem('language') === 'vi' ? 'vi' : 'en';
} catch {
  // Keep English when browser storage is unavailable.
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: savedLanguage,
  fallbackLng: 'en',
  supportedLngs: ['en', 'vi'],
  interpolation: { escapeValue: false },
});

export default i18n;
