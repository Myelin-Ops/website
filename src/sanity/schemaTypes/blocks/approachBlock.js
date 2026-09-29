const approachBlock = {
  name: "approachBlock",
  title: "Approach",
  type: "object",
  fields: [
    { name: "title", type: "localeString" },
    { name: "description1", type: "localeText" },
    { name: "items", title: "Items", type: "localeStringList" },
    { name: "description2", type: "localeText" },
  ],
  preview: {
    select: { title: "title.en" },
    prepare: ({ title }) => ({ title: title || "Approach", subtitle: "Approach block" }),
  },
};

export default approachBlock;
