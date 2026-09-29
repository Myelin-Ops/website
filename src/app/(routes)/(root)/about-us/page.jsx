import Header from "@/components/Header";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Footer from "@/components/Footer";
import { getAboutPage, getInstitutions, getSiteSettings } from "@/lib/sanityQueries";

export const metadata = {
  title: "About Us",
  description: "Learn about Myelin Ops' mission to strengthen organizations. We specialize in psychological safety, operational resilience, and human performance.",
};

// Shown until the About page document has sections in Sanity; each block falls
// back to its i18next copy (about.json) when it has no Sanity content.
const DEFAULT_SECTIONS = [
  { _type: "heroBlock", _key: "hero-1" },
  { _type: "metaphorBlock", _key: "metaphor-1" },
  { _type: "approachBlock", _key: "approach-1" },
  { _type: "institutionsSectionBlock", _key: "institutions-1" },
  { _type: "valuesBlock", _key: "values-1" },
  { _type: "ctaBlock", _key: "cta-1" },
];

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
