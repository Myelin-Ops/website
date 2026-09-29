const ctaBlock = {
  name: "ctaBlock",
  title: "Call to Action",
  type: "object",
  fields: [
    { name: "title", type: "localeString" },
    { name: "description", title: "Description (optional)", type: "localeText" },
    { name: "subtitle", title: "Subtitle (optional)", type: "localeText" },
    { name: "primaryButton", title: "Primary button (optional)", type: "localeString" },
    { name: "secondaryButton", title: "Secondary button (optional)", type: "localeString" },
    { name: "button", title: "Single button (optional)", type: "localeString" },
    { name: "frameworks", title: "Frameworks tag line (optional)", type: "localeString" },
    { name: "alignment", title: "Alignment tag line (optional)", type: "localeString" },
  ],
  preview: {
    select: { title: "title.en" },
    prepare: ({ title }) => ({ title: title || "CTA", subtitle: "Call to action block" }),
  },
};

export default ctaBlock;
