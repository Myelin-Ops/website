const metaphorBlock = {
  name: "metaphorBlock",
  title: "Metaphor",
  type: "object",
  fields: [
    { name: "title", type: "localeString" },
    { name: "subtitle", type: "localeString" },
    {
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "metaphorCard",
          fields: [
            { name: "key", title: "Key (e.g. brain, neurons, protective)", type: "string" },
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
    prepare: ({ title }) => ({ title: title || "Metaphor", subtitle: "Metaphor block" }),
  },
};

export default metaphorBlock;
