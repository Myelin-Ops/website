const contactInfoBlock = {
  name: "contactInfoBlock",
  title: "Contact Info",
  type: "object",
  fields: [
    { name: "emailTitle", type: "localeString" },
    { name: "emailSubtitle", type: "localeString" },
    { name: "emailValue", title: "Email address", type: "string" },
    { name: "phoneTitle", type: "localeString" },
    { name: "phoneSubtitle", type: "localeString" },
    { name: "phoneValue", title: "Phone number", type: "string" },
    { name: "connectLabel", type: "localeString" },
    { name: "creditsLabel", type: "localeString" },
  ],
  preview: {
    prepare: () => ({ title: "Contact Info", subtitle: "Contact info block" }),
  },
};

export default contactInfoBlock;
