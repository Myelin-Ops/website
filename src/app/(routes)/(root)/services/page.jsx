import Header from "@/components/Header";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Footer from "@/components/Footer";
import { getServicesPage, getSiteSettings } from "@/lib/sanityQueries";

export const metadata = {
  title: "Interventions & Services",
  description: "Discover our organizational interventions, neuro-leadership training, and strategic growth services designed for excellence.",
};

// Shown until the Services page document has sections in Sanity; each block
// falls back to its i18next copy (services.json).
const DEFAULT_SECTIONS = [
  { _type: "heroBlock", _key: "hero-1" },
  { _type: "categoriesBlock", _key: "categories-1" },
  { _type: "methodologyBlock", _key: "methodology-1" },
  { _type: "interventionsBlock", _key: "interventions-1" },
  { _type: "ctaBlock", _key: "cta-1" },
];

const I18N_PREFIX = {
  heroBlock: "services.hero",
  categoriesBlock: "services.intro",
  methodologyBlock: "services.methodology",
  interventionsBlock: "services.list",
  ctaBlock: "services.cta",
};

const VARIANT = { heroBlock: "services", ctaBlock: "services" };

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
            variant={VARIANT[section._type]}
            i18nPrefix={I18N_PREFIX[section._type]}
          />
        ))}
      </main>
      <Footer siteSettings={siteSettings} />
    </>
  );
}
