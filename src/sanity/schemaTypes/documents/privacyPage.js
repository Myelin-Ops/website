const privacyPage = {
  name: "privacyPage",
  title: "Privacy Page",
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

export default privacyPage;
