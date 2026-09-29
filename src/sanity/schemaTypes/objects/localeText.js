const localeText = {
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: [
    { name: "en", title: "English", type: "text", rows: 4 },
    { name: "sq", title: "Albanian", type: "text", rows: 4 },
  ],
  preview: {
    select: { title: "en" },
  },
};

export default localeText;
