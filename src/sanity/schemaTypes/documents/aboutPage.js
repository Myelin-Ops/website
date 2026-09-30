import heroBlock from "../blocks/heroBlock";
import metaphorBlock from "../blocks/metaphorBlock";
import approachBlock from "../blocks/approachBlock";
import institutionsSectionBlock from "../blocks/institutionsSectionBlock";
import valuesBlock from "../blocks/valuesBlock";
import ctaBlock from "../blocks/ctaBlock";

const aboutPage = {
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    {
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "heroBlock" },
        { type: "metaphorBlock" },
        { type: "approachBlock" },
        { type: "institutionsSectionBlock" },
        { type: "valuesBlock" },
        { type: "ctaBlock" },
      ],
    },
  ],
};

export default aboutPage;
