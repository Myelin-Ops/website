import { sanityFetch } from "./sanity";

// Helper to get localized field value
function localize(field, lang = "en") {
  if (!field) return "";
  return field[lang] || field["en"] || "";
}

// Helper to get localized array
function localizeArray(field, lang = "en") {
  if (!field) return [];
  return field[lang] || field["en"] || [];
}

// Resolves one page-builder block (a `sections[]` array item) into a plain,
// already-localized object, keyed by its `_type`. Shared by every page-builder
// page fetcher below.
function resolveSection(section, lang) {
  if (!section || !section._type) return null;
  const base = { _type: section._type, _key: section._key };

  switch (section._type) {
    case "heroBlock":
      return {
        ...base,
        title: localize(section.title, lang),
        highlight: localize(section.highlight, lang),
        subtitle: localize(section.subtitle, lang),
        description: localize(section.description, lang),
      };
    case "ctaBlock":
      return {
        ...base,
        title: localize(section.title, lang),
        description: localize(section.description, lang),
        subtitle: localize(section.subtitle, lang),
        primaryButton: localize(section.primaryButton, lang),
        secondaryButton: localize(section.secondaryButton, lang),
        button: localize(section.button, lang),
        frameworks: localize(section.frameworks, lang),
        alignment: localize(section.alignment, lang),
      };
    case "whyItMattersBlock":
      return {
        ...base,
        label: localize(section.label, lang),
        title: localize(section.title, lang),
        description: localize(section.description, lang),
        imageUrl: section.imageUrl || null,
        insights: (section.insights || []).map((insight) => ({
          title: localize(insight.title, lang),
          description: localize(insight.description, lang),
          imageUrl: insight.imageUrl || null,
        })),
      };
    case "testimonialsSectionBlock":
      return {
        ...base,
        label: localize(section.label, lang),
        viewMore: localize(section.viewMore, lang),
      };
    case "gallerySectionBlock":
    case "partnersSectionBlock":
    case "institutionsSectionBlock":
      return { ...base, title: localize(section.title, lang) };
    case "metaphorBlock":
      return {
        ...base,
        title: localize(section.title, lang),
        subtitle: localize(section.subtitle, lang),
        cards: (section.cards || []).reduce((acc, card) => {
          acc[card.key] = {
            title: localize(card.title, lang),
            description: localize(card.description, lang),
          };
          return acc;
        }, {}),
      };
    case "approachBlock":
      return {
        ...base,
        title: localize(section.title, lang),
        description1: localize(section.description1, lang),
        items: localizeArray(section.items, lang),
        description2: localize(section.description2, lang),
        imageOneUrl: section.imageOneUrl || null,
        imageTwoUrl: section.imageTwoUrl || null,
      };
    case "valuesBlock":
      return {
        ...base,
        title: localize(section.title, lang),
        items: (section.items || []).reduce((acc, val) => {
          acc[val.key] = {
            title: localize(val.title, lang),
            description: localize(val.description, lang),
          };
          return acc;
        }, {}),
      };
    case "categoriesBlock":
      return {
        ...base,
        title: localize(section.title, lang),
        subtitle: localize(section.subtitle, lang),
        categories: (section.categories || []).map((cat) => ({
          key: cat.key,
          label: localize(cat.label, lang),
        })),
      };
    case "methodologyBlock":
      return {
        ...base,
        title: localize(section.title, lang),
        subtitle: localize(section.subtitle, lang),
        steps: (section.steps || []).reduce((acc, step) => {
          acc[step.key] = {
            title: localize(step.title, lang),
            description: localize(step.description, lang),
          };
          return acc;
        }, {}),
      };
    case "interventionsBlock":
      return {
        ...base,
        interventions: (section.items || []).reduce((acc, item) => {
          acc[item.key] = {
            title: localize(item.title, lang),
            description: localize(item.description, lang),
            items: localizeArray(item.items, lang),
          };
          return acc;
        }, {}),
      };
    case "teamSectionBlock":
      return {
        ...base,
        visionaryLabel: localize(section.visionaryLabel, lang),
        researchLabel: localize(section.researchLabel, lang),
        researchSubtitle: localize(section.researchSubtitle, lang),
      };
    case "contactInfoBlock":
      return {
        ...base,
        emailTitle: localize(section.emailTitle, lang),
        emailSubtitle: localize(section.emailSubtitle, lang),
        emailValue: section.emailValue || "",
        phoneTitle: localize(section.phoneTitle, lang),
        phoneSubtitle: localize(section.phoneSubtitle, lang),
        phoneValue: section.phoneValue || "",
        connectLabel: localize(section.connectLabel, lang),
        creditsLabel: localize(section.creditsLabel, lang),
      };
    case "contactFormBlock":
      return {
        ...base,
        title: localize(section.title, lang),
        nameLabel: localize(section.nameLabel, lang),
        namePlaceholder: localize(section.namePlaceholder, lang),
        emailLabel: localize(section.emailLabel, lang),
        emailPlaceholder: localize(section.emailPlaceholder, lang),
        messageLabel: localize(section.messageLabel, lang),
        messagePlaceholder: localize(section.messagePlaceholder, lang),
        submit: localize(section.submit, lang),
        agreement: localize(section.agreement, lang),
        privacyLink: localize(section.privacyLink, lang),
      };
    case "creditsBodyBlock":
      return {
        ...base,
        supervisorLabel: localize(section.supervisorLabel, lang),
        supervisorName: section.supervisorName || "",
        leadLabel: localize(section.leadLabel, lang),
        leadName: section.leadName || "",
        developersLabel: localize(section.developersLabel, lang),
        developersNames: section.developersNames || "",
        outro: localize(section.outro, lang),
      };
    case "legalHeaderBlock":
      return {
        ...base,
        title: section.title || "",
        lastUpdated: section.lastUpdated || "",
      };
    case "legalSectionBlock":
      return {
        ...base,
        title: localize(section.title, lang),
        content: localize(section.content, lang),
      };
    default:
      return base;
  }
}

// ============ HOME PAGE ============
export async function getHomePage(lang = "en") {
  const data = await sanityFetch(
    // Picture references are expanded to URLs for the Why It Matters block
    // (its own picture and one per insight).
    `*[_type == "homePage" && _id == "homePage"][0]{
      sections[]{
        ...,
        "imageUrl": image.asset->url,
        insights[]{ ..., "imageUrl": image.asset->url }
      }
    }`
  );
  if (!data) return { sections: [] };

  return {
    sections: (data.sections || []).map((section) => resolveSection(section, lang)),
  };
}

// ============ TESTIMONIALS ============
export async function getTestimonials(lang = "en") {
  const data = await sanityFetch(
    `*[_type == "testimonial"] | order(order asc) {
      _id,
      quote,
      author,
      order
    }`
  );

  // Falls back to the other language so a testimonial added in only one
  // language (e.g. translation unavailable) still shows up.
  const other = lang === "en" ? "sq" : "en";
  return data.map((t) => ({
    _id: t._id,
    quote: localize(t.quote, lang) || localize(t.quote, other),
    author: localize(t.author, lang) || localize(t.author, other),
  }));
}

// ============ GALLERY ============
export async function getGalleryImages() {
  return await sanityFetch(
    `*[_type == "galleryImage"] | order(order asc) {
      _id,
      "imageUrl": image.asset->url,
      image,
      alt,
      span,
      order
    }`
  );
}

// ============ PARTNERS (Homepage Carousel) ============
export async function getPartners() {
  return await sanityFetch(
    `*[_type == "partner"] | order(order asc) {
      _id,
      name,
      "logoUrl": logo.asset->url,
      logo,
      scale,
      order
    }`
  );
}

// ============ ABOUT PAGE ============
export async function getAboutPage(lang = "en") {
  // Picture references are expanded to URLs for the Approach block's two pictures.
  const data = await sanityFetch(
    `*[_type == "aboutPage" && _id == "aboutPage"][0]{
      sections[]{
        ...,
        "imageOneUrl": imageOne.asset->url,
        "imageTwoUrl": imageTwo.asset->url
      }
    }`
  );
  if (!data) return { sections: [] };

  return {
    sections: (data.sections || []).map((section) => resolveSection(section, lang)),
  };
}

// ============ INSTITUTIONS (About Page Partners) ============
export async function getInstitutions(lang = "en") {
  return await sanityFetch(
    `*[_type == "institution"] | order(order asc) {
      _id,
      "name": coalesce(name.${lang}, name.en, name.sq),
      "logoUrl": logo.asset->url,
      logo,
      scale,
      order
    }`
  );
}

// ============ SERVICES PAGE ============
export async function getServicesPage(lang = "en") {
  const data = await sanityFetch(`*[_type == "servicesPage" && _id == "servicesPage"][0]{ sections }`);
  if (!data) return { sections: [] };

  return {
    sections: (data.sections || []).map((section) => resolveSection(section, lang)),
  };
}

// ============ TEAM MEMBERS ============
export async function getTeamMembers(lang = "en") {
  const data = await sanityFetch(
    `*[_type == "teamMember"] | order(order asc) {
      _id,
      name,
      role,
      bio,
      "photoUrl": photo.asset->url,
      photo,
      linkedin,
      section,
      order
    }`
  );

  return data.map((m) => ({
    name: m.name,
    role: localize(m.role, lang),
    bio: localize(m.bio, lang),
    photoUrl: m.photoUrl,
    photo: m.photo,
    linkedin: m.linkedin,
    section: m.section,
  }));
}

// ============ TEAM PAGE ============
export async function getTeamPage(lang = "en") {
  const data = await sanityFetch(`*[_type == "teamPage" && _id == "teamPage"][0]{ sections }`);
  if (!data) return { sections: [] };

  return {
    sections: (data.sections || []).map((section) => resolveSection(section, lang)),
  };
}

// ============ CONTACT PAGE ============
export async function getContactPage(lang = "en") {
  const data = await sanityFetch(`*[_type == "contactPage" && _id == "contactPage"][0]{ sections }`);
  if (!data) return { sections: [] };

  return {
    sections: (data.sections || []).map((section) => resolveSection(section, lang)),
  };
}

// ============ SITE SETTINGS ============
export async function getSiteSettings(lang = "en") {
  const data = await sanityFetch(`*[_type == "siteSettings" && _id == "siteSettings"][0]`);
  if (!data) return null;

  return {
    navigation: {
      home: localize(data.navigation?.home, lang),
      aboutuspage: localize(data.navigation?.aboutUs, lang),
      servicesNav: localize(data.navigation?.services, lang),
      team: localize(data.navigation?.team, lang),
      contactNav: localize(data.navigation?.contact, lang),
    },
    footer: {
      brand: {
        description: localize(data.footer?.brandDescription, lang),
      },
      contact: {
        title: localize(data.footer?.contactTitle, lang),
        email: data.footer?.email || "",
        phone: data.footer?.phone || "",
      },
      legal: {
        title: localize(data.footer?.legalTitle, lang),
        privacy: localize(data.footer?.privacyLabel, lang),
        terms: localize(data.footer?.termsLabel, lang),
      },
      social: {
        title: localize(data.footer?.socialTitle, lang),
      },
      company: {
        title: localize(data.footer?.companyTitle, lang),
        about: localize(data.footer?.companyAbout, lang),
        services: localize(data.footer?.companyServices, lang),
        cases: localize(data.footer?.companyCases, lang),
      },
      language: {
        english: localize(data.footer?.languageEnglish, lang),
        albanian: localize(data.footer?.languageAlbanian, lang),
      },
      copyright: localize(data.footer?.copyright, lang),
    },
    socialLinks: data.socialLinks || {},
  };
}

// ============ CREDITS PAGE ============
export async function getCreditsPage(lang = "en") {
  const data = await sanityFetch(`*[_type == "creditsPage" && _id == "creditsPage"][0]{ sections }`);
  if (!data) return { sections: [] };

  return {
    sections: (data.sections || []).map((section) => resolveSection(section, lang)),
  };
}

// ============ PRIVACY PAGE ============
export async function getPrivacyPage(lang = "en") {
  const data = await sanityFetch(`*[_type == "privacyPage" && _id == "privacyPage"][0]{ sections }`);
  if (!data) return { sections: [] };

  return {
    sections: (data.sections || []).map((section) => resolveSection(section, lang)),
  };
}

// ============ TERMS PAGE ============
export async function getTermsPage(lang = "en") {
  const data = await sanityFetch(`*[_type == "termsPage" && _id == "termsPage"][0]{ sections }`);
  if (!data) return { sections: [] };

  return {
    sections: (data.sections || []).map((section) => resolveSection(section, lang)),
  };
}
