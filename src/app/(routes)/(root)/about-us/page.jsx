import Header from "@/components/Header";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Footer from "@/components/Footer";
import { getAboutPage, getInstitutions, getSiteSettings } from "@/lib/sanityQueries";

export const metadata = {
  title: "About Us",
  description: "Learn about Myelin Ops' mission to strengthen organizations. We specialize in psychological safety, operational resilience, and human performance.",
};

const DEFAULT_SECTIONS = [
  { _type: "heroBlock", _key: "hero-1" },
];

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
            variant={section._type === "heroBlock" ? "simple" : undefined}
          />
        ))}
      </main>
      <Footer siteSettings={siteSettings} />
    </>
  );
}
