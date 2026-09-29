import Header from "@/components/Header";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Footer from "@/components/Footer";
import { getTeamPage, getTeamMembers, getSiteSettings } from "@/lib/sanityQueries";

export const metadata = {
  title: "Meet the Team",
  description: "Meet the experts at Myelin Ops. Our psychologists and consultants work at the intersection of human behavior and business performance.",
};

// Shown until the Team page document has sections in Sanity; each block falls
// back to its i18next copy (team.json).
const DEFAULT_SECTIONS = [
  { _type: "heroBlock", _key: "hero-1" },
  { _type: "teamSectionBlock", _key: "team-1" },
  { _type: "ctaBlock", _key: "cta-1" },
];

const I18N_PREFIX = {
  heroBlock: "team.hero",
  teamSectionBlock: "team",
  ctaBlock: "team.cta",
};

const VARIANT = { heroBlock: "team", ctaBlock: "team" };

const DOCUMENT_ID = "teamPage";

export default async function TeamPage() {
  const [teamPageEn, teamPageSq, membersEn, membersSq, settingsEn, settingsSq] =
    await Promise.all([
      getTeamPage("en"),
      getTeamPage("sq"),
      getTeamMembers("en"),
      getTeamMembers("sq"),
      getSiteSettings("en"),
      getSiteSettings("sq"),
    ]);

  const siteSettings = { en: settingsEn, sq: settingsSq };
  const teamMembersData = { en: membersEn, sq: membersSq };

  const sectionsEn = teamPageEn?.sections?.length ? teamPageEn.sections : DEFAULT_SECTIONS;
  const sectionsSq = teamPageSq?.sections?.length ? teamPageSq.sections : DEFAULT_SECTIONS;

  return (
    <>
      <Header siteSettings={siteSettings} />
      <main className="bg-[#F6F8F8]">
        {sectionsEn.map((section, i) => (
          <BlockRenderer
            key={section._key ?? i}
            block={{ en: sectionsEn[i], sq: sectionsSq[i] }}
            documentId={DOCUMENT_ID}
            teamMembers={teamMembersData}
            variant={VARIANT[section._type]}
            i18nPrefix={I18N_PREFIX[section._type]}
          />
        ))}
      </main>
      <Footer siteSettings={siteSettings} />
    </>
  );
}
