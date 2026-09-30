const valuesBlock = {
  name: "valuesBlock",
  title: "Values",
  type: "object",
  fields: [
    { name: "title", type: "localeString" },
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "valueItem",
          fields: [
            { name: "key", title: "Key (e.g. protection, clarity)", type: "string" },
            { name: "title", type: "localeString" },
            { name: "description", type: "localeText" },
          ],
          preview: { select: { title: "key" } },
        },
      ],
    },
  ],
  preview: {
    select: { title: "title.en" },
    prepare: ({ title }) => ({ title: title || "Values", subtitle: "Values block" }),
  },
};

export default valuesBlock;
