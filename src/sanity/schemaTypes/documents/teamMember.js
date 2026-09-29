const teamMember = {
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "role", type: "localeString" },
    { name: "bio", type: "localeText" },
    { name: "photo", title: "Photo", type: "image", options: { hotspot: true } },
    { name: "linkedin", title: "LinkedIn URL", type: "url" },
    {
      name: "section",
      title: "Section",
      type: "string",
      options: {
        list: [
          { title: "Visionary", value: "visionary" },
          { title: "Research", value: "research" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    { name: "order", title: "Order", type: "number" },
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "section", media: "photo" },
  },
};

export default teamMember;
