const gallerySectionBlock = {
  name: "gallerySectionBlock",
  title: "Gallery Section",
  type: "object",
  fields: [{ name: "title", type: "localeString" }],
  preview: {
    select: { title: "title.en" },
    prepare: ({ title }) => ({ title: title || "Gallery", subtitle: "Shows all Gallery Image documents" }),
  },
};

export default gallerySectionBlock;
