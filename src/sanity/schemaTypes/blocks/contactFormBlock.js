const contactFormBlock = {
  name: "contactFormBlock",
  title: "Contact Form",
  type: "object",
  fields: [
    { name: "title", type: "localeString" },
    { name: "nameLabel", type: "localeString" },
    { name: "namePlaceholder", type: "localeString" },
    { name: "emailLabel", type: "localeString" },
    { name: "emailPlaceholder", type: "localeString" },
    { name: "messageLabel", type: "localeString" },
    { name: "messagePlaceholder", type: "localeString" },
    { name: "submit", type: "localeString" },
    { name: "agreement", type: "localeText" },
    { name: "privacyLink", type: "localeString" },
  ],
  preview: {
    prepare: () => ({ title: "Contact Form", subtitle: "The interactive contact form" }),
  },
};

export default contactFormBlock;
