const creditsBodyBlock = {
  name: "creditsBodyBlock",
  title: "Credits Body",
  type: "object",
  fields: [
    { name: "supervisorLabel", type: "localeString" },
    { name: "supervisorName", title: "Supervisor name", type: "string" },
    { name: "leadLabel", type: "localeString" },
    { name: "leadName", title: "Team lead name", type: "string" },
    { name: "developersLabel", type: "localeString" },
    { name: "developersNames", title: "Developer names (comma-separated)", type: "string" },
    { name: "outro", type: "localeText" },
  ],
  preview: {
    prepare: () => ({ title: "Credits Body", subtitle: "Credits body block" }),
  },
};

export default creditsBodyBlock;
