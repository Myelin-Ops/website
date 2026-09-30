const partnersSectionBlock = {
  name: "partnersSectionBlock",
  title: "Partners Section",
  type: "object",
  fields: [{ name: "title", type: "localeString" }],
  preview: {
    select: { title: "title.en" },
    prepare: ({ title }) => ({ title: title || "Partners", subtitle: "Shows all Partner documents" }),
  },
};

export default partnersSectionBlock;
