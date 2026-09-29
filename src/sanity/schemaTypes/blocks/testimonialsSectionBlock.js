const testimonialsSectionBlock = {
  name: "testimonialsSectionBlock",
  title: "Testimonials Section",
  type: "object",
  fields: [
    { name: "label", type: "localeString" },
    { name: "viewMore", title: "\"View more\" label", type: "localeString" },
  ],
  preview: {
    prepare: () => ({ title: "Testimonials", subtitle: "Shows all Testimonial documents" }),
  },
};

export default testimonialsSectionBlock;
