const methodologyBlock = {
  name: "methodologyBlock",
  title: "Methodology",
  type: "object",
  fields: [
    { name: "title", type: "localeString" },
    { name: "subtitle", type: "localeText" },
    {
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        {
          type: "object",
          name: "step",
          fields: [
            { name: "key", title: "Key (e.g. diagnostic, strategy)", type: "string" },
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
    prepare: ({ title }) => ({ title: title || "Methodology", subtitle: "Methodology block" }),
  },
};

export default methodologyBlock;
