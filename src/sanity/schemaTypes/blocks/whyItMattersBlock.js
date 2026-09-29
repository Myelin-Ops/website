const whyItMattersBlock = {
  name: "whyItMattersBlock",
  title: "Why It Matters",
  type: "object",
  fields: [
    { name: "label", type: "localeString" },
    { name: "title", type: "localeString" },
    { name: "description", type: "localeText" },
    {
      name: "insights",
      title: "Insights (scroll-through cards)",
      type: "array",
      of: [
        {
          type: "object",
          name: "insight",
          fields: [
            { name: "title", type: "localeString" },
            { name: "description", type: "localeText" },
          ],
        },
      ],
    },
  ],
  preview: {
    select: { title: "title.en" },
    prepare: ({ title }) => ({ title: title || "Why It Matters", subtitle: "Why It Matters block" }),
  },
};

export default whyItMattersBlock;
