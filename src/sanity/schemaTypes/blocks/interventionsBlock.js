const interventionsBlock = {
  name: "interventionsBlock",
  title: "Interventions",
  type: "object",
  fields: [
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "intervention",
          fields: [
            { name: "key", title: "Key (e.g. groupDynamics)", type: "string" },
            { name: "title", type: "localeString" },
            { name: "description", type: "localeText" },
            { name: "items", title: "Bullet items", type: "localeStringList" },
          ],
          preview: { select: { title: "key" } },
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({ title: "Interventions", subtitle: "Interventions block" }),
  },
};

export default interventionsBlock;
