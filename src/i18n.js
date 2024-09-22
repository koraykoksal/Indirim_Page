import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend) // Çeviri dosyalarını yüklemek için http backend'i kullanır
  .use(LanguageDetector) // Kullanıcının dilini tarayıcı ayarlarından algılar
  .use(initReactI18next) // react-i18next'i başlatır
  .init({
    lng:'en', // varsayılan dil
    fallbackLng: 'en', // Varsayılan dil bulunamazsa kullanılacak dil
    debug: false,
    interpolation: {
      escapeValue: false, // React zaten güvenliği sağlar
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false,  // XSS koruması için React zaten kaçış işlemi yapar
    },
    react: {
      useSuspense: true
    },
  });


export default i18n;