import Header from "@/components/Header";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Footer from "@/components/Footer";
import { getPrivacyPage, getSiteSettings } from "@/lib/sanityQueries";

export const metadata = {
  title: "Privacy Policy",
  description: "Your privacy is important to Myelin Ops. Read our policy on how we handle and protect your personal information.",
};

const DEFAULT_SECTIONS = [
  {
    _type: "legalHeaderBlock",
    _key: "header-1",
    title: "Privacy Policy",
    lastUpdated: new Date().toISOString().split("T")[0],
  },
];

const DOCUMENT_ID = "privacyPage";

export default async function PrivacyPage() {
  const [privacyEn, privacySq, settingsEn, settingsSq] = await Promise.all([
    getPrivacyPage("en"),
    getPrivacyPage("sq"),
    getSiteSettings("en"),
    getSiteSettings("sq"),
  ]);

  const siteSettings = { en: settingsEn, sq: settingsSq };

  const sectionsEn = privacyEn?.sections?.length ? privacyEn.sections : DEFAULT_SECTIONS;
  const sectionsSq = privacySq?.sections?.length ? privacySq.sections : DEFAULT_SECTIONS;

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
