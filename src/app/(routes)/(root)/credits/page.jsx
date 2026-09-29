import Header from "@/components/Header";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Footer from "@/components/Footer";
import { getCreditsPage, getSiteSettings } from "@/lib/sanityQueries";

export const metadata = {
  title: "Credits",
  description: "Acknowledge the team and partners who contributed to the development of the Myelin Ops digital experience.",
};

const DEFAULT_SECTIONS = [
  { _type: "heroBlock", _key: "hero-1" },
];

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
            variant={section._type === "heroBlock" ? "simple" : undefined}
          />
        ))}
      </main>
      <Footer siteSettings={siteSettings} />
    </>
  );
}
