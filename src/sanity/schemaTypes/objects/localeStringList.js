const localeStringList = {
  name: "localeStringList",
  title: "Localized list of strings",
  type: "object",
  fields: [
    { name: "en", title: "English", type: "array", of: [{ type: "string" }] },
    { name: "sq", title: "Albanian", type: "array", of: [{ type: "string" }] },
  ],
};

export default localeStringList;
