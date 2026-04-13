"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translations
import commonEn from "./locales/en/common.json";
import homeEn from "./locales/en/home.json";
import aboutEn from "./locales/en/about.json";
import servicesEn from "./locales/en/services.json";
import teamEn from "./locales/en/team.json";
import contactEn from "./locales/en/contact.json";
import creditsEn from "./locales/en/credits.json";
import privacyEn from "./locales/en/privacy.json";
import termsEn from "./locales/en/terms.json";

import commonSq from "./locales/sq/common.json";
import homeSq from "./locales/sq/home.json";
import aboutSq from "./locales/sq/about.json";
import servicesSq from "./locales/sq/services.json";
import teamSq from "./locales/sq/team.json";
import contactSq from "./locales/sq/contact.json";
import creditsSq from "./locales/sq/credits.json";
import privacySq from "./locales/sq/privacy.json";
import termsSq from "./locales/sq/terms.json";

const resources = {
  en: {
    translation: {
      ...commonEn,
      ...homeEn,
      about: aboutEn,
      services: servicesEn,
      team: teamEn,
      contact: contactEn,
      credits: creditsEn,
      privacy: privacyEn,
      terms: termsEn,
    },
  },
  sq: {
    translation: {
      ...commonSq,
      ...homeSq,
      about: aboutSq,
      services: servicesSq,
      team: teamSq,
      contact: contactSq,
      credits: creditsSq,
      privacy: privacySq,
      terms: termsSq,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;