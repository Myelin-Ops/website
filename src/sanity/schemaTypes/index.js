import localeString from "./objects/localeString";
import localeText from "./objects/localeText";
import localeStringList from "./objects/localeStringList";

import heroBlock from "./blocks/heroBlock";
import ctaBlock from "./blocks/ctaBlock";
import whyItMattersBlock from "./blocks/whyItMattersBlock";
import testimonialsSectionBlock from "./blocks/testimonialsSectionBlock";
import gallerySectionBlock from "./blocks/gallerySectionBlock";
import partnersSectionBlock from "./blocks/partnersSectionBlock";
import metaphorBlock from "./blocks/metaphorBlock";
import approachBlock from "./blocks/approachBlock";
import institutionsSectionBlock from "./blocks/institutionsSectionBlock";
import valuesBlock from "./blocks/valuesBlock";
import categoriesBlock from "./blocks/categoriesBlock";
import methodologyBlock from "./blocks/methodologyBlock";
import interventionsBlock from "./blocks/interventionsBlock";
import teamSectionBlock from "./blocks/teamSectionBlock";
import contactInfoBlock from "./blocks/contactInfoBlock";
import contactFormBlock from "./blocks/contactFormBlock";
import creditsBodyBlock from "./blocks/creditsBodyBlock";
import legalHeaderBlock from "./blocks/legalHeaderBlock";
import legalSectionBlock from "./blocks/legalSectionBlock";

import homePage from "./documents/homePage";
import aboutPage from "./documents/aboutPage";
import servicesPage from "./documents/servicesPage";
import teamPage from "./documents/teamPage";
import contactPage from "./documents/contactPage";
import siteSettings from "./documents/siteSettings";
import creditsPage from "./documents/creditsPage";
import privacyPage from "./documents/privacyPage";
import termsPage from "./documents/termsPage";

import testimonial from "./documents/testimonial";
import galleryImage from "./documents/galleryImage";
import partner from "./documents/partner";
import institution from "./documents/institution";
import teamMember from "./documents/teamMember";

export const schemaTypes = [
  // Shared localized field objects
  localeString,
  localeText,
  localeStringList,

  // Page builder blocks
  heroBlock,
  ctaBlock,
  whyItMattersBlock,
  testimonialsSectionBlock,
  gallerySectionBlock,
  partnersSectionBlock,
  metaphorBlock,
  approachBlock,
  institutionsSectionBlock,
  valuesBlock,
  categoriesBlock,
  methodologyBlock,
  interventionsBlock,
  teamSectionBlock,
  contactInfoBlock,
  contactFormBlock,
  creditsBodyBlock,
  legalHeaderBlock,
  legalSectionBlock,

  // Singleton page documents
  homePage,
  aboutPage,
  servicesPage,
  teamPage,
  contactPage,
  siteSettings,
  creditsPage,
  privacyPage,
  termsPage,

  // Repeatable documents
  testimonial,
  galleryImage,
  partner,
  institution,
  teamMember,
];
