import Header from "@/components/Header";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Footer from "@/components/Footer";
import { getServicesPage, getSiteSettings } from "@/lib/sanityQueries";

export const metadata = {
  title: "Interventions & Services",
  description: "Discover our organizational interventions, neuro-leadership training, and strategic growth services designed for excellence.",
};

const DEFAULT_SECTIONS = [
  { _type: "heroBlock", _key: "hero-1" },
];

const DOCUMENT_ID = "servicesPage";

export default async function ServicesPage() {
  const [servicesEn, servicesSq, settingsEn, settingsSq] = await Promise.all([
    getServicesPage("en"),
    getServicesPage("sq"),
    getSiteSettings("en"),
    getSiteSettings("sq"),
  ]);

  const siteSettings = { en: settingsEn, sq: settingsSq };

  const sectionsEn = servicesEn?.sections?.length ? servicesEn.sections : DEFAULT_SECTIONS;
  const sectionsSq = servicesSq?.sections?.length ? servicesSq.sections : DEFAULT_SECTIONS;

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
