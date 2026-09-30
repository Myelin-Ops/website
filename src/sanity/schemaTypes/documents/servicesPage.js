const servicesPage = {
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  fields: [
    {
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "heroBlock" },
        { type: "categoriesBlock" },
        { type: "methodologyBlock" },
        { type: "interventionsBlock" },
        { type: "ctaBlock" },
      ],
    },
  ],
};

export default servicesPage;
