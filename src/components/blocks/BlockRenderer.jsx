import HeroBlock from "./HeroBlock";
import CtaBlock from "./CtaBlock";
import WhyItMattersBlock from "./WhyItMattersBlock";
import TestimonialsSectionBlock from "./TestimonialsSectionBlock";
import GalleryBlock from "./GalleryBlock";
import PartnersBlock from "./PartnersBlock";
import MetaphorBlock from "./MetaphorBlock";
import ApproachBlock from "./ApproachBlock";
import ValuesBlock from "./ValuesBlock";
import InstitutionsSectionBlock from "./InstitutionsSectionBlock";
import CategoriesBlock from "./CategoriesBlock";
import MethodologyBlock from "./MethodologyBlock";
import InterventionsBlock from "./InterventionsBlock";
import TeamSectionBlock from "./TeamSectionBlock";
import ContactInfoBlock from "./ContactInfoBlock";
import ContactFormBlock from "./ContactFormBlock";
import CreditsBodyBlock from "./CreditsBodyBlock";
import LegalHeaderBlock from "./LegalHeaderBlock";
import LegalSectionBlock from "./LegalSectionBlock";

const BLOCK_COMPONENTS = {
  heroBlock: HeroBlock,
  ctaBlock: CtaBlock,
  whyItMattersBlock: WhyItMattersBlock,
  testimonialsSectionBlock: TestimonialsSectionBlock,
  gallerySectionBlock: GalleryBlock,
  partnersSectionBlock: PartnersBlock,
  metaphorBlock: MetaphorBlock,
  approachBlock: ApproachBlock,
  institutionsSectionBlock: InstitutionsSectionBlock,
  valuesBlock: ValuesBlock,
  categoriesBlock: CategoriesBlock,
  methodologyBlock: MethodologyBlock,
  interventionsBlock: InterventionsBlock,
  teamSectionBlock: TeamSectionBlock,
  contactInfoBlock: ContactInfoBlock,
  contactFormBlock: ContactFormBlock,
  creditsBodyBlock: CreditsBodyBlock,
  legalHeaderBlock: LegalHeaderBlock,
  legalSectionBlock: LegalSectionBlock,
};

// Dispatches one page-builder section to its renderer component, based on the
// section's `_type`. `block` is a { en, sq } bundle for that single section;
// any extra props (global collections, i18nPrefix/variant overrides) pass through.
function BlockRenderer({ block, ...rest }) {
  const type = block?.en?._type || block?.sq?._type;
  const Component = BLOCK_COMPONENTS[type];
  if (!Component) return null;
  return <Component data={block} {...rest} />;
}

export default BlockRenderer;
