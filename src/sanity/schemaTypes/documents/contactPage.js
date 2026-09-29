const contactPage = {
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    {
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "heroBlock" },
        { type: "contactInfoBlock" },
        { type: "contactFormBlock" },
        { type: "ctaBlock" },
      ],
    },
  ],
};

export default contactPage;
