import Header from "@/components/Header";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Footer from "@/components/Footer";
import { getContactPage, getSiteSettings } from "@/lib/sanityQueries";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Myelin Ops. Connect with us for consultations, partnerships, or professional inquiries.",
};

// Shown until the Contact page document has sections in Sanity; each block
// falls back to its i18next copy (contact.json).
const DEFAULT_SECTIONS = [
  { _type: "heroBlock", _key: "hero-1" },
  { _type: "contactInfoBlock", _key: "info-1" },
  { _type: "contactFormBlock", _key: "form-1" },
];

const I18N_PREFIX = {
  heroBlock: "contact.hero",
  contactInfoBlock: "contact.info",
  contactFormBlock: "contact.form",
};

const VARIANT = { heroBlock: "contact" };

// Info + form render as two columns of one shared grid, not stacked sections.
const GRID_TYPES = new Set(["contactInfoBlock", "contactFormBlock"]);

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

  const groups = [];
  sectionsEn.forEach((section, i) => {
    const grid = GRID_TYPES.has(section._type);
    const last = groups[groups.length - 1];
    if (grid && last?.grid) last.items.push(i);
    else groups.push({ grid, key: section._key ?? i, items: [i] });
  });

  const renderBlock = (i) => {
    const section = sectionsEn[i];
    return (
      <BlockRenderer
        key={section._key ?? i}
        block={{ en: sectionsEn[i], sq: sectionsSq[i] }}
        documentId={DOCUMENT_ID}
        variant={VARIANT[section._type]}
        i18nPrefix={I18N_PREFIX[section._type]}
      />
    );
  };

  return (
    <>
      <Header siteSettings={siteSettings} />
      <main>
        {groups.map((group) =>
          group.grid ? (
            <section key={group.key} className="pb-32 px-4 md:px-12 max-w-400 mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {group.items.map(renderBlock)}
              </div>
            </section>
          ) : (
            group.items.map(renderBlock)
          ),
        )}
      </main>
      <Footer siteSettings={siteSettings} />
    </>
  );
}
