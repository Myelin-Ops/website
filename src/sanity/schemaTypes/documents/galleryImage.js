const galleryImage = {
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    { name: "image", title: "Image", type: "image", options: { hotspot: true } },
    { name: "alt", title: "Alt text", type: "string" },
    {
      name: "span",
      title: "Grid span (layout hint, e.g. col-span-1, col-span-2)",
      type: "string",
    },
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
    select: { title: "alt", media: "image" },
  },
};

export default galleryImage;
