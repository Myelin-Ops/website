const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    {
      name: "navigation",
      title: "Navigation",
      type: "object",
      fields: [
        { name: "home", type: "localeString" },
        { name: "aboutUs", type: "localeString" },
        { name: "services", type: "localeString" },
        { name: "team", type: "localeString" },
        { name: "contact", type: "localeString" },
      ],
    },
    {
      name: "footer",
      title: "Footer",
      type: "object",
      fields: [
        { name: "brandDescription", type: "localeText" },
        { name: "contactTitle", type: "localeString" },
        { name: "email", title: "Email address", type: "string" },
        { name: "phone", title: "Phone number", type: "string" },
        { name: "legalTitle", type: "localeString" },
        { name: "privacyLabel", type: "localeString" },
        { name: "termsLabel", type: "localeString" },
        { name: "socialTitle", type: "localeString" },
        { name: "companyTitle", type: "localeString" },
        { name: "companyAbout", type: "localeString" },
        { name: "companyServices", type: "localeString" },
        { name: "companyCases", type: "localeString" },
        { name: "languageEnglish", type: "localeString" },
        { name: "languageAlbanian", type: "localeString" },
        {
          name: "copyright",
          title: "Copyright (use {{year}} as a placeholder for the current year)",
          type: "localeString",
        },
      ],
    },
    {
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        { name: "instagram", type: "url" },
        { name: "facebook", type: "url" },
        { name: "linkedin", type: "url" },
        { name: "twitter", type: "url" },
      ],
    },
  ],
};

export default siteSettings;
