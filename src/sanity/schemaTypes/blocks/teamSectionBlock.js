const teamSectionBlock = {
  name: "teamSectionBlock",
  title: "Team Section",
  type: "object",
  fields: [
    { name: "visionaryLabel", title: "Visionary section label", type: "localeString" },
    { name: "researchLabel", title: "Research section label", type: "localeString" },
    { name: "researchSubtitle", title: "Research section subtitle", type: "localeString" },
  ],
  preview: {
    prepare: () => ({ title: "Team", subtitle: "Shows all Team Member documents" }),
  },
};

export default teamSectionBlock;
