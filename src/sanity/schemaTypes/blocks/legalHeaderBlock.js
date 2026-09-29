const legalHeaderBlock = {
  name: "legalHeaderBlock",
  title: "Legal Page Header",
  type: "object",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "lastUpdated", title: "Last Updated", type: "string" },
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: title || "Legal Header", subtitle: "Page title + last updated" }),
  },
};

export default legalHeaderBlock;
