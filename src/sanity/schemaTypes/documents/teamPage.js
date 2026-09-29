const teamPage = {
  name: "teamPage",
  title: "Team Page",
  type: "document",
  fields: [
    {
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "heroBlock" },
        { type: "teamSectionBlock" },
        { type: "ctaBlock" },
      ],
    },
  ],
};

export default teamPage;
