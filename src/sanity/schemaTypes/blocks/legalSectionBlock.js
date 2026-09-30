const legalSectionBlock = {
  name: "legalSectionBlock",
  title: "Legal Section",
  type: "object",
  fields: [
    { name: "title", type: "localeString" },
    { name: "content", type: "localeText" },
  ],
  preview: {
    select: { title: "title.en" },
    prepare: ({ title }) => ({ title: title || "Legal Section", subtitle: "One clause/section" }),
  },
};

export default legalSectionBlock;
