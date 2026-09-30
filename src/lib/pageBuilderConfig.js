// Client-side mirror of each page schema's `sections[].of` list
// (src/sanity/schemaTypes/documents/*.js is the source of truth) - used by
// the "Manage Sections" on-page panel to know which block types can be
// added to which page.
export const PAGE_BLOCK_TYPES = {
  homePage: [
    { type: "heroBlock", label: "Hero" },
    { type: "testimonialsSectionBlock", label: "Testimonials" },
    { type: "gallerySectionBlock", label: "Gallery" },
    { type: "partnersSectionBlock", label: "Partners" },
    { type: "whyItMattersBlock", label: "Why It Matters" },
    { type: "ctaBlock", label: "Call to Action" },
  ],
};
