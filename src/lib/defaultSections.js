// The built-in section layout of every page-builder page. Pages show this until
// their Sanity document has sections, and the save routes copy it into Sanity
// the first time an editor changes something (see ensurePageDocument.js), so an
// edit always has a real document/section to write into.
//
// Stable _keys matter: they're what inline edits and "Manage Sections" point at.
// For Privacy/Terms each section's _key is also its i18next key (privacy.json / terms.json).
const legalSections = (keys) => [
  { _type: "legalHeaderBlock", _key: "header-1" },
  ...keys.map((key) => ({ _type: "legalSectionBlock", _key: key })),
];

export const DEFAULT_SECTIONS_BY_DOCUMENT = {
  homePage: [
    { _type: "heroBlock", _key: "default-hero" },
    { _type: "testimonialsSectionBlock", _key: "default-testimonials" },
    { _type: "gallerySectionBlock", _key: "default-gallery" },
    { _type: "partnersSectionBlock", _key: "default-partners" },
    { _type: "whyItMattersBlock", _key: "default-why-it-matters" },
    { _type: "ctaBlock", _key: "default-cta" },
  ],
  aboutPage: [
    { _type: "heroBlock", _key: "hero-1" },
    { _type: "metaphorBlock", _key: "metaphor-1" },
    { _type: "approachBlock", _key: "approach-1" },
    { _type: "institutionsSectionBlock", _key: "institutions-1" },
    { _type: "valuesBlock", _key: "values-1" },
    { _type: "ctaBlock", _key: "cta-1" },
  ],
  servicesPage: [
    { _type: "heroBlock", _key: "hero-1" },
    { _type: "categoriesBlock", _key: "categories-1" },
    { _type: "methodologyBlock", _key: "methodology-1" },
    { _type: "interventionsBlock", _key: "interventions-1" },
    { _type: "ctaBlock", _key: "cta-1" },
  ],
  teamPage: [
    { _type: "heroBlock", _key: "hero-1" },
    { _type: "teamSectionBlock", _key: "team-1" },
    { _type: "ctaBlock", _key: "cta-1" },
  ],
  contactPage: [
    { _type: "heroBlock", _key: "hero-1" },
    { _type: "contactInfoBlock", _key: "info-1" },
    { _type: "contactFormBlock", _key: "form-1" },
  ],
  creditsPage: [
    { _type: "heroBlock", _key: "hero-1" },
    { _type: "creditsBodyBlock", _key: "credits-1" },
  ],
  privacyPage: legalSections([
    "introduction",
    "dataCollection",
    "useOfData",
    "security",
    "cookies",
    "thirdParties",
    "rights",
    "updates",
  ]),
  termsPage: legalSections([
    "acceptance",
    "services",
    "ip",
    "userConduct",
    "disclaimer",
    "liability",
    "governingLaw",
    "changes",
  ]),
};
