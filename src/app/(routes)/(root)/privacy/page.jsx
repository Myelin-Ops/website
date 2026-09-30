import Header from "@/components/Header";
import { DEFAULT_SECTIONS_BY_DOCUMENT } from "@/lib/defaultSections";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Footer from "@/components/Footer";
import { getPrivacyPage, getSiteSettings } from "@/lib/sanityQueries";

export const metadata = {
  title: "Privacy Policy",
  description: "Your privacy is important to Myelin Ops. Read our policy on how we handle and protect your personal information.",
};

// Built-in layout, shown until the page has sections in Sanity (see lib/defaultSections.js).
const DEFAULT_SECTIONS = DEFAULT_SECTIONS_BY_DOCUMENT.privacyPage;

const i18nPrefixFor = (section) =>
  section._type === "legalHeaderBlock" ? "privacy" : `privacy.${section._key}`;

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
      <main className="relative min-h-screen bg-white overflow-hidden">
        {sectionsEn.map((section, i) => (
          <BlockRenderer
            key={section._key ?? i}
            block={{ en: sectionsEn[i], sq: sectionsSq[i] }}
            documentId={DOCUMENT_ID}
            i18nPrefix={i18nPrefixFor(section)}
          />
        ))}
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 pb-24">
          <div className="p-8 bg-gray-50 rounded-3xl text-center">
            <p className="text-gray-500 text-sm">
              For any questions or concerns regarding our privacy practices, please contact us at{" "}
              <a
                href="mailto:info@myelinops.com"
                className="text-black font-semibold hover:text-cyan-600 transition-colors underline underline-offset-4"
              >
                info@myelinops.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer siteSettings={siteSettings} />
    </>
  );
}
