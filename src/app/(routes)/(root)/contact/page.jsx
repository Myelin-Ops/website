import Header from "@/components/Header";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Footer from "@/components/Footer";
import { getContactPage, getSiteSettings } from "@/lib/sanityQueries";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Myelin Ops. Connect with us for consultations, partnerships, or professional inquiries.",
};

const DEFAULT_SECTIONS = [
  { _type: "heroBlock", _key: "hero-1" },
];

const DOCUMENT_ID = "contactPage";

export default async function ContactPage() {
  const [contactEn, contactSq, settingsEn, settingsSq] = await Promise.all([
    getContactPage("en"),
    getContactPage("sq"),
    getSiteSettings("en"),
    getSiteSettings("sq"),
  ]);

  const siteSettings = { en: settingsEn, sq: settingsSq };

  const sectionsEn = contactEn?.sections?.length ? contactEn.sections : DEFAULT_SECTIONS;
  const sectionsSq = contactSq?.sections?.length ? contactSq.sections : DEFAULT_SECTIONS;

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
