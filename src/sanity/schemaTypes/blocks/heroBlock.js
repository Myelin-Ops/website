const heroBlock = {
  name: "heroBlock",
  title: "Hero",
  type: "object",
  fields: [
    { name: "title", type: "localeString" },
    { name: "highlight", title: "Highlight word (optional)", type: "localeString" },
    { name: "subtitle", type: "localeString" },
    { name: "description", title: "Description (optional)", type: "localeText" },
  ],
  preview: {
    select: { title: "title.en" },
    prepare: ({ title }) => ({ title: title || "Hero", subtitle: "Hero block" }),
  },
};

export default heroBlock;
