import Header from "@/components/Header";
import BlockRenderer from "@/components/blocks/BlockRenderer";
import Footer from "@/components/Footer";
import { getTeamPage, getTeamMembers, getSiteSettings } from "@/lib/sanityQueries";

export const metadata = {
  title: "Meet the Team",
  description: "Meet the experts at Myelin Ops. Our psychologists and consultants work at the intersection of human behavior and business performance.",
};

const DEFAULT_SECTIONS = [
  { _type: "heroBlock", _key: "hero-1" },
];

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
      <main>
        {sectionsEn.map((section, i) => (
          <BlockRenderer
            key={section._key ?? i}
            block={{ en: sectionsEn[i], sq: sectionsSq[i] }}
            documentId={DOCUMENT_ID}
            teamMembers={teamMembersData}
            variant={section._type === "heroBlock" ? "simple" : undefined}
          />
        ))}
      </main>
      <Footer siteSettings={siteSettings} />
    </>
  );
}
