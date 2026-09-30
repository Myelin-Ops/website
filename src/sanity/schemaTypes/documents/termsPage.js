const termsPage = {
  name: "termsPage",
  title: "Terms Page",
  type: "document",
  fields: [
    {
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "legalHeaderBlock" },
        { type: "legalSectionBlock" },
      ],
    },
  ],
};

export default termsPage;
