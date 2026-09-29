const institution = {
  name: "institution",
  title: "Institution",
  type: "document",
  fields: [
    { name: "name", type: "localeString" },
    { name: "logo", title: "Logo", type: "image", options: { hotspot: true } },
    { name: "scale", title: "Scale (optional CSS scale hint)", type: "string" },
    { name: "order", title: "Order", type: "number" },
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name.en", media: "logo" },
  },
};

export default institution;
