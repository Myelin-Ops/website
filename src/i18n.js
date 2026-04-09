'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import commonEn from './locales/en/common.json';
import homeEn from './locales/en/home.json';
import aboutEn from './locales/en/about.json';
import servicesEn from './locales/en/services.json';

import commonSq from './locales/sq/common.json';
import homeSq from './locales/sq/home.json';
import aboutSq from './locales/sq/about.json';
import servicesSq from './locales/sq/services.json';

const resources = {
  en: {
    translation: {
      ...commonEn,
      ...homeEn,
      about: aboutEn,
      services: servicesEn,
    },
  },
  sq: {
    translation: {
      ...commonSq,
      ...homeSq,
      about: aboutSq,
      services: servicesSq,
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;