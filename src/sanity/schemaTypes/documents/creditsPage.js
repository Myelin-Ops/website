const creditsPage = {
  name: "creditsPage",
  title: "Credits Page",
  type: "document",
  fields: [
    {
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "heroBlock" },
        { type: "creditsBodyBlock" },
        { type: "ctaBlock" },
      ],
    },
  ],
};

export default creditsPage;
