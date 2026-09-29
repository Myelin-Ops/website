const SINGLETONS = [
  "homePage",
  "aboutPage",
  "servicesPage",
  "teamPage",
  "contactPage",
  "siteSettings",
  "creditsPage",
  "privacyPage",
  "termsPage",
];

// Locks each singleton to exactly one document (fixed documentId == the type name),
// matching the fixed `_id == "<type>"` queries in src/lib/sanityQueries.js.
export const structure = (S) =>
  S.list()
    .title("Content")
    .items([
      ...SINGLETONS.map((type) =>
        S.listItem()
          .title(type)
          .id(type)
          .child(S.document().schemaType(type).documentId(type))
      ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId())
      ),
    ]);
