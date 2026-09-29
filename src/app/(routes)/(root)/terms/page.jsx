import Header from "@/components/Header";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Footer from "@/components/Footer";
import { getTermsPage, getSiteSettings } from "@/lib/sanityQueries";

export const metadata = {
  title: "Terms of Service",
  description: "Review the terms and conditions for using the Myelin Ops platform and services.",
};

// Shown until the Terms page document has sections in Sanity. Each section's
// _key doubles as its i18next key (terms.json), so it falls back to that copy.
const FALLBACK_SECTION_KEYS = [
  "acceptance",
  "services",
  "ip",
  "userConduct",
  "disclaimer",
  "liability",
  "governingLaw",
  "changes",
];

const DEFAULT_SECTIONS = [
  { _type: "legalHeaderBlock", _key: "header-1" },
  ...FALLBACK_SECTION_KEYS.map((key) => ({ _type: "legalSectionBlock", _key: key })),
];

const i18nPrefixFor = (section) =>
  section._type === "legalHeaderBlock" ? "terms" : `terms.${section._key}`;

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
              By using this website, you agree to these legal terms. If you have any inquiries, please contact our legal department at{" "}
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
