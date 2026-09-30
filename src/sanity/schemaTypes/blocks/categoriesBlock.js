const categoriesBlock = {
  name: "categoriesBlock",
  title: "Categories Intro",
  type: "object",
  fields: [
    { name: "title", type: "localeString" },
    { name: "subtitle", type: "localeText" },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "object",
          name: "category",
          fields: [
            { name: "key", title: "Key (e.g. dynamics, assessments)", type: "string" },
            { name: "label", type: "localeString" },
          ],
          preview: { select: { title: "key" } },
        },
      ],
    },
  ],
  preview: {
    select: { title: "title.en" },
    prepare: ({ title }) => ({ title: title || "Categories", subtitle: "Categories intro block" }),
  },
};

export default categoriesBlock;
