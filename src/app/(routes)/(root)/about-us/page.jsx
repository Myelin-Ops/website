import Header from "@/components/Header";
import { DEFAULT_SECTIONS_BY_DOCUMENT } from "@/lib/defaultSections";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Footer from "@/components/Footer";
import { getAboutPage, getInstitutions, getSiteSettings } from "@/lib/sanityQueries";

export const metadata = {
  title: "About Us",
  description: "Learn about Myelin Ops' mission to strengthen organizations. We specialize in psychological safety, operational resilience, and human performance.",
};

// Built-in layout, shown until the page has sections in Sanity (see lib/defaultSections.js).
const DEFAULT_SECTIONS = DEFAULT_SECTIONS_BY_DOCUMENT.aboutPage;

// i18next key prefix per block type (About copy lives under "about.*").
const I18N_PREFIX = {
  heroBlock: "about.hero",
  metaphorBlock: "about.metaphor",
  approachBlock: "about.approach",
  institutionsSectionBlock: "about.partners",
  valuesBlock: "about.values",
  ctaBlock: "about.cta",
};

const VARIANT = { heroBlock: "about", ctaBlock: "about" };

const DOCUMENT_ID = "aboutPage";

export default async function AboutPage() {
  const [aboutEn, aboutSq, institutionsEn, institutionsSq, settingsEn, settingsSq] =
    await Promise.all([
      getAboutPage("en"),
      getAboutPage("sq"),
      getInstitutions("en"),
      getInstitutions("sq"),
      getSiteSettings("en"),
      getSiteSettings("sq"),
    ]);

  const siteSettings = { en: settingsEn, sq: settingsSq };
  const institutions = { en: institutionsEn, sq: institutionsSq };

  const sectionsEn = aboutEn?.sections?.length ? aboutEn.sections : DEFAULT_SECTIONS;
  const sectionsSq = aboutSq?.sections?.length ? aboutSq.sections : DEFAULT_SECTIONS;

  return (
    <>
      <Header siteSettings={siteSettings} />
      <main>
        {sectionsEn.map((section, i) => (
          <BlockRenderer
            key={section._key ?? i}
            block={{ en: sectionsEn[i], sq: sectionsSq[i] }}
            documentId={DOCUMENT_ID}
            variant={VARIANT[section._type]}
            i18nPrefix={I18N_PREFIX[section._type]}
            institutions={institutions}
          />
        ))}
      </main>
      <Footer siteSettings={siteSettings} />
    </>
  );
}
