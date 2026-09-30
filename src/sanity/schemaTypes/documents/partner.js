const partner = {
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
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
    select: { title: "name", media: "logo" },
  },
};

export default partner;
