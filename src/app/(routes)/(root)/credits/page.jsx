import Header from "@/components/Header";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Footer from "@/components/Footer";
import { getCreditsPage, getSiteSettings } from "@/lib/sanityQueries";

export const metadata = {
  title: "Credits",
  description: "Acknowledge the team and partners who contributed to the development of the Myelin Ops digital experience.",
};

// Shown until the Credits page document has sections in Sanity; each block
// falls back to its i18next copy (credits.json).
const DEFAULT_SECTIONS = [
  { _type: "heroBlock", _key: "hero-1" },
  { _type: "creditsBodyBlock", _key: "credits-1" },
];

const I18N_PREFIX = {
  heroBlock: "credits.hero",
  creditsBodyBlock: "credits",
};

const VARIANT = { heroBlock: "credits" };

const DOCUMENT_ID = "creditsPage";

export default async function CreditsPage() {
  const [creditsEn, creditsSq, settingsEn, settingsSq] = await Promise.all([
    getCreditsPage("en"),
    getCreditsPage("sq"),
    getSiteSettings("en"),
    getSiteSettings("sq"),
  ]);

  const siteSettings = { en: settingsEn, sq: settingsSq };

  const sectionsEn = creditsEn?.sections?.length ? creditsEn.sections : DEFAULT_SECTIONS;
  const sectionsSq = creditsSq?.sections?.length ? creditsSq.sections : DEFAULT_SECTIONS;

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
          />
        ))}
      </main>
      <Footer siteSettings={siteSettings} />
    </>
  );
}
