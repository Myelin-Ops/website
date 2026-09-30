import Header from "@/components/Header";
import { DEFAULT_SECTIONS_BY_DOCUMENT } from "@/lib/defaultSections";
import Footer from "@/components/Footer";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import ManageSectionsPanel from "@/components/admin/ManageSectionsPanel";
import {
  getHomePage,
  getTestimonials,
  getGalleryImages,
  getPartners,
  getSiteSettings,
} from "@/lib/sanityQueries";

export const metadata = {
  title: "Home | Elevating Performance",
  description: "Myelin Ops is the protective layer for organizations. We help businesses thrive through operational excellence and strategic growth.",
};

// Built-in layout, shown until the page has sections in Sanity (see lib/defaultSections.js).
const DEFAULT_SECTIONS = DEFAULT_SECTIONS_BY_DOCUMENT.homePage;

const DOCUMENT_ID = "homePage";

export default async function Page() {
  const [
    homeEn,
    homeSq,
    testimonialsEn,
    testimonialsSq,
    settingsEn,
    settingsSq,
    galleryImages,
    partners,
  ] = await Promise.all([
    getHomePage("en"),
    getHomePage("sq"),
    getTestimonials("en"),
    getTestimonials("sq"),
    getSiteSettings("en"),
    getSiteSettings("sq"),
    getGalleryImages(),
    getPartners(),
  ]);

  const siteSettings = { en: settingsEn, sq: settingsSq };
  const testimonialsData = { en: testimonialsEn, sq: testimonialsSq };

  const sectionsEn = homeEn?.sections?.length ? homeEn.sections : DEFAULT_SECTIONS;
  const sectionsSq = homeSq?.sections?.length ? homeSq.sections : DEFAULT_SECTIONS;

  return (
    <>
      <Header siteSettings={siteSettings} />
      {sectionsEn.map((section, i) => (
        <BlockRenderer
          key={section._key ?? i}
          block={{ en: sectionsEn[i], sq: sectionsSq[i] }}
          documentId={DOCUMENT_ID}
          testimonials={testimonialsData}
          images={galleryImages}
          partners={partners}
        />
      ))}
      <Footer siteSettings={siteSettings} />
      <ManageSectionsPanel documentId={DOCUMENT_ID} pageType="homePage" sections={sectionsEn} />
    </>
  );
}
