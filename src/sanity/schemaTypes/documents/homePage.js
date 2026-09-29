const homePage = {
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    {
      name: "sections",
      title: "Page Sections",
      type: "array",
      of: [
        { type: "heroBlock" },
        { type: "testimonialsSectionBlock" },
        { type: "gallerySectionBlock" },
        { type: "partnersSectionBlock" },
        { type: "whyItMattersBlock" },
        { type: "ctaBlock" },
      ],
    },
  ],
};

export default homePage;
