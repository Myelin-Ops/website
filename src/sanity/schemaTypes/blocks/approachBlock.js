const approachBlock = {
  name: "approachBlock",
  title: "Approach",
  type: "object",
  fields: [
    { name: "title", type: "localeString" },
    { name: "description1", type: "localeText" },
    { name: "items", title: "Items", type: "localeStringList" },
    { name: "description2", type: "localeText" },
    { name: "imageOne", title: "First picture", type: "image", options: { hotspot: true } },
    { name: "imageTwo", title: "Second picture", type: "image", options: { hotspot: true } },
  ],
  preview: {
    select: { title: "title.en" },
    prepare: ({ title }) => ({ title: title || "Approach", subtitle: "Approach block" }),
  },
};

export default approachBlock;
