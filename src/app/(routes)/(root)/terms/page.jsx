import Header from "@/components/Header";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Footer from "@/components/Footer";
import { getTermsPage, getSiteSettings } from "@/lib/sanityQueries";

export const metadata = {
  title: "Terms of Service",
  description: "Review the terms and conditions for using the Myelin Ops platform and services.",
};

const DEFAULT_SECTIONS = [
  {
    _type: "legalHeaderBlock",
    _key: "header-1",
    title: "Terms of Service",
    lastUpdated: new Date().toISOString().split("T")[0],
  },
];

const DOCUMENT_ID = "termsPage";

export default async function TermsPage() {
  const [termsEn, termsSq, settingsEn, settingsSq] = await Promise.all([
    getTermsPage("en"),
    getTermsPage("sq"),
    getSiteSettings("en"),
    getSiteSettings("sq"),
  ]);

  const siteSettings = { en: settingsEn, sq: settingsSq };

  const sectionsEn = termsEn?.sections?.length ? termsEn.sections : DEFAULT_SECTIONS;
  const sectionsSq = termsSq?.sections?.length ? termsSq.sections : DEFAULT_SECTIONS;

  return (
    <>
      <Header siteSettings={siteSettings} />
      <main>
        {sectionsEn.map((section, i) => (
          <BlockRenderer
            key={section._key ?? i}
            block={{ en: sectionsEn[i], sq: sectionsSq[i] }}
            documentId={DOCUMENT_ID}
          />
        ))}
      </main>
      <Footer siteSettings={siteSettings} />
    </>
  );
}
