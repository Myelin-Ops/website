'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const enTranslations = {
  navigation: {
    home: 'HOME',
    aboutUs: 'ABOUT US',
    servicesNav: 'SERVICES',
    team: 'TEAM',
    contactNav: 'CONTACT',
  },
  hero: {
    title: 'We are the protective layer that',
    highlight: 'organizations',
    subtitle: 'helps organizations and people thrive.',
    description: 'Science-based strategies that protect your culture, elevate leadership, and drive sustainable performance.',
  },
  testimonials: {
    label: 'TESTIMONIALS',
    viewMore: 'View more',
    list: [
      {
        quote: "It was a privilege to collaborate with Myelin OPS. The company provided an insightful analysis on workplace stress and its impact on performance provided great value to our municipality's employees. Myelin OPS is an ideal partner for any organization seeking to enhance well-being and performance at work.",
        author: "Municipality of Vushtrria",
      },
    ],
  },
  gallery: {
    title: 'TEAM',
  },
  partners: {
    title: 'Our partners',
  },
  whyItMatters: {
    label: 'WHY IT MATTERS',
    title: 'Organizations are living systems.',
    description: 'Organizations function as interconnected ecosystems where performance stems from internal dynamics.',
  },
  scrollableInsights: {
    card1: {
      title: 'Leadership shapes collective cognition.',
      description: 'Effective leadership determines how teams perceive complexity and psychological safety.',
    },
    card2: {
      title: 'Culture directly influences performance.',
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

const sqTranslations = {
  navigation: {
    home: 'KRYESORE',
    aboutUs: 'RRETH NESH',
    servicesNav: 'SHËRBIMET',
    team: 'STAFI',
    contactNav: 'KONTAKT',
  },
  hero: {
    title: 'Ne jemi shtresa mbrojtëse',
    highlight: 'organizatat',
    subtitle: 'që ndihmon organizatat dhe individët të zhvillohen, të rriten dhe të lulëzojnë.',
    description: 'Ndërhyrje të bazuara në evidencë që forcojnë lidershipin, kulturën dhe performancën organizative.',
  },
  testimonials: {
    label: 'DËSHMI',
    viewMore: 'Shiko më shumë',
    list: [
      {
        quote: "Ishte një privilegj të bashkëpunonim me Myelin OPS. Kompania ofroi një analizë të thelluar mbi stresin në punë dhe ndikimin e tij në performancë, e cila solli vlerë të madhe për punonjësit e komunës sonë. Myelin OPS është një partner ideal për çdo organizatë që kërkon të përmirësojë mirëqenien dhe performancën në punë.",
        author: "Komuna e Vushtrrisë",
      },
    ],
  },
  gallery: {
    title: 'STAFI',
  },
  partners: {
    title: 'Partnerët tanë',
  },
  whyItMatters: {
    label: 'PËRSE KA RËNDËSI',
    title: 'Organizatat janë sisteme të gjalla.',
    description: 'Ato funksionojnë përmes ndërveprimit të njerëzve, strukturave dhe kulturës. Kur një element ndryshon, ndikon në të gjithë sistemin.',
  },
  scrollableInsights: {
    card1: {
      title: 'Lidershipi formëson mendimin kolektiv.',
      description: 'Udhëheqja efektive përcakton si ekipet perceptojnë kompleksitetin dhe sigurinë psikologjike.',
    },
    card2: {
      title: 'Kultura ndikon drejtpërdrejt në performancë.',
      description: 'Një kulturë e shëndetshme krijon besim, angazhim dhe rezultate të qëndrueshme.',
    },
    card3: {
      title: 'Ndërhyrja ndryshon trajektoret.',
      description: 'Ndërhyrjet e duhura, të bazuara në analizë dhe evidencë, e zhvendosin organizatën nga menaxhimi reaktiv drejt zhvillimit të qëndrueshëm.',
    },
    scrollHint: 'Rrëshqit poshtë për të parë më shumë',
  },
  cta: {
    title: 'Gati për të forcuar organizatën tuaj?',
    description: "Le të eksplorojmë se si mund t'ju ndihmojmë të ndërtoni një kulturë më rezistente dhe të lulëzuar organizative.",
    primaryButton: 'Rezervo një konsultë',
    secondaryButton: 'Eksploro Shërbimet',
  },
  footer: {
    brand: {
      description: 'Ndërhyrje të bazuara në evidencë për zhvillim organizativ, lidership dhe performancë të qëndrueshme.',
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
    copyright: '© {{year}} Myelin Ops. Të gjitha të drejtat e rezervuara.',
  },
};

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
  });

export default i18n;