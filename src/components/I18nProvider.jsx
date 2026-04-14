'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '@/i18n';
import { I18nextProvider } from 'react-i18next';

// Create context for language switching
const I18nContext = createContext({
  language: 'en',
  setLanguage: () => {},
});

export function useI18n() {
  return useContext(I18nContext);
}

export default function I18nProvider({ children }) {
  const [initialized, setInitialized] = useState(i18n.isInitialized);
  const [language, setLanguage] = useState(i18n.language || 'en');

  useEffect(() => {
    const handleInitialized = () => setInitialized(true);
    const handleLanguageChanged = (lng) => setLanguage(lng);

    if (i18n.isInitialized) {
      setInitialized(true);
    } else {
      i18n.on('initialized', handleInitialized);
    }

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('initialized', handleInitialized);
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  if (!initialized) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage: changeLanguage }}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </I18nContext.Provider>
  );
}
