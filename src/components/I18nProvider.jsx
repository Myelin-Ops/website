'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';

// English translations
const enTranslations = {
  navigation: {
    about: 'About',
    services: 'Services',
    gallery: 'Gallery',
    contact: 'Contact',
    getInTouch: 'Get in touch',
    home: 'HOME',
    aboutUs: 'ABOUT US',
    servicesNav: 'SERVICES',
    team: 'TEAM',
    contactNav: 'CONTACT',
  },
  hero: {
    title: 'We are the protective layer that helps',
    highlight: 'organizations',
    subtitle: 'and people thrive.',
    description: 'Using a scientific method and deep human understanding, we help organizations build resilient cultures where people can grow, connect, and perform at their best.',
  },
  testimonials: {
    label: 'Testimonials',
    quote: '"Working with Myelin has been transformative. Their unique combination of scientific rigor and human-centered approach helped us navigate a complex organizational change. The team\'s ability to translate research into actionable strategies made all the difference in our journey."',
    author: 'Head of People & Culture',
    company: 'International Technology Company',
  },
  gallery: {
    title: 'GALLERY',
  },
  partners: {
    title: 'Our partners',
  },
  whyItMatters: {
    label: 'Why it matters',
    title: 'Organizations are living systems.',
    description: 'Organizations function as interconnected ecosystems where performance stems with internal dynamics.',
  },
  scrollableInsights: {
    card1: {
      title: 'Leadership shapes collective cognition.',
      description: 'Effective leadership determines how teams perceive complexity and psychological safety.',
    },
    card2: {
      title: 'Culture influences performance.',
      description: 'Cultural alignment directly impacts decision quality and operational clarity.',
    },
    card3: {
      title: 'Intervention changes trajectories.',
      description: 'Evidence-based interventions shift organizations from reactive management to sustainable development.',
    },
    scrollHint: 'Scroll down to see more',
  },
  cta: {
    title: 'Ready to strengthen your organization?',
    description: "Let's explore how we can help you build a more resilient and thriving organizational culture.",
    primaryButton: 'Book an exploration call',
    secondaryButton: 'Learn more',
  },
  footer: {
    brand: {
      description: 'Helping organizations build healthier teams, stronger leadership, and workplaces where people thrive.',
    },
    contact: {
      title: 'Contact',
      email: 'info@myelinops.com',
      phone: '+383 49 287 070',
    },
    legal: {
      title: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
    social: {
      title: 'Find us on social',
    },
    company: {
      title: 'Company',
      about: 'About',
      services: 'Services',
      cases: 'Cases',
    },
    language: {
      english: 'English',
      albanian: 'Albanian',
    },
    copyright: '© {{year}} Myelin Ops. All rights reserved.',
  },
};

// Albanian translations
const sqTranslations = {
  navigation: {
    about: 'Rreth Nesh',
    services: 'Shërbimet',
    gallery: 'Galeria',
    contact: 'Kontakt',
    getInTouch: 'Na kontaktoni',
    home: 'KRYESORE',
    aboutUs: 'RRETH NESH',
    servicesNav: 'SHËRBIMET',
    team: 'Ekipi',
    contactNav: 'KONTAKT',
  },
  hero: {
    title: 'Ne jemi shtresa mbrojtëse që ndihmojnë',
    highlight: 'organizatat',
    subtitle: 'dhe individët të zhvillojnë, të riten dhe të suksedojnë.',
    description: 'Duke përdorur një metodë shkencore dhe kuptim të thellë njerëzor, ndihmojmë organizatat të ndërtojnë kultura rezistente ku njerëzit mund të rriten, të lidhen dhe të performojnë në më të mirën e tyre.',
  },
  testimonials: {
    label: 'DËSHMI',
    quote: '"Punimi me Myelin ka qenë transformues. Kombinimi i tyre unik i rigorozitetit shkencor dhe qasjes së qendruar te njeriu na ndihmoi të navigojmë një ndryshim të kompleks organizativ. Aftësia e ekipit për të përkthyer kërkimin në strategji të veprueshme bëri të gjitha ndryshimet në udhëtimin tonë."',
    author: 'Shefi i Njerëzve dhe Kulturës',
    company: 'Kompania Ndërkombëtare e Teknologjisë',
  },
  gallery: {
    title: 'GALERIA',
  },
  partners: {
    title: 'Partnerët tanë',
  },
  whyItMatters: {
    label: 'PSE KA RËNDËSI',
    title: 'Organizatat janë sisteme të gjalla.',
    description: 'Organizatat funksionojnë si ekosisteme të ndërlidhura ku performanca buron nga dinamikat e brendshme.',
  },
  scrollableInsights: {
    card1: {
      title: 'Udhëheqja formëson mendimin kolektiv.',
      description: 'Udhëheqja efektive përcakton si ekipet perceptojnë kompleksitetin dhe sigurinë psikologjike.',
    },
    card2: {
      title: 'Kultura ndikon në performancë.',
      description: 'Pajtueshmëria kulturore ndikon drejtpërdrejt në cilësinë e vendimmarrjes dhe qartësinë operative.',
    },
    card3: {
      title: 'Ndërhyrja ndryshon trajektoret.',
      description: 'Ndërhyrjet e bazuara në fakte ndryshojnë organizatat nga menaxhimi reaktiv në zhvillim të qëndrueshëm.',
    },
    scrollHint: 'Rrëshqit poshtë për të parë më shumë',
  },
  cta: {
    title: 'Gati për të forcuar organizatën tuaj?',
    description: 'Le të eksplorojmë se si mund t\'ju ndihmojmë të ndërtoni një kulturë më rezistente dhe të lulëzuar organizative.',
    primaryButton: 'Caktoni një thirrje eksploruese',
    secondaryButton: 'Mëso më shumë',
  },
  footer: {
    brand: {
      description: 'Ndihmojmë organizatat të ndërtojnë ekipe më të shëndetshme, udhëheqje më të fortë dhe vende pune ku njerëzit lulëzojnë.',
    },
    contact: {
      title: 'Kontakt',
      email: 'info@myelinops.com',
      phone: '+383 49 287 070',
    },
    legal: {
      title: 'Ligjore',
      privacy: 'Politika e Privatësisë',
      terms: 'Kushtet e Shërbimit',
    },
    social: {
      title: 'Na gjeni në rrjete sociale',
    },
    company: {
      title: 'Kompania',
      about: 'Rreth Nesh',
      services: 'Shërbimet',
      cases: 'Rastet',
    },
    language: {
      english: 'Anglisht',
      albanian: 'Shqip',
    },
    copyright: '© {{year}} Myelin Ops. Të gjitha të drejtat e rezervuada.',
  },
};

// Create context for language switching
const I18nContext = createContext({
  language: 'en',
  setLanguage: () => {},
});

export function useI18n() {
  return useContext(I18nContext);
}

export default function I18nProvider({ children }) {
  const [initialized, setInitialized] = useState(false);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n
        .use(initReactI18next)
        .init({
          resources: {
            en: { translation: enTranslations },
            sq: { translation: sqTranslations },
          },
          lng: 'en',
          fallbackLng: 'en',
          interpolation: {
            escapeValue: false,
          },
        })
        .then(() => {
          setInitialized(true);
        });
    } else {
      setInitialized(true);
    }

    // Listen for language changes
    i18n.on('languageChanged', (lng) => {
      setLanguage(lng);
    });

    return () => {
      i18n.off('languageChanged');
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
