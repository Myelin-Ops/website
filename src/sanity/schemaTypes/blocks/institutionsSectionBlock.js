const institutionsSectionBlock = {
  name: "institutionsSectionBlock",
  title: "Institutions Section",
  type: "object",
  fields: [{ name: "title", type: "localeString" }],
  preview: {
    select: { title: "title.en" },
    prepare: ({ title }) => ({ title: title || "Institutions", subtitle: "Shows all Institution documents" }),
  },
};

export default institutionsSectionBlock;
