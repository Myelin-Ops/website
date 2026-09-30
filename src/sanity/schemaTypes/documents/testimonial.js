const testimonial = {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    { name: "quote", type: "localeText" },
    { name: "author", type: "localeString" },
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
    select: { title: "author.en", subtitle: "quote.en" },
  },
};

export default testimonial;
