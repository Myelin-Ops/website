import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { projectId, dataset, apiVersion } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

// Maps each singleton page document to the fixed URL it renders at, so the
// Presentation tool's live preview knows which page to load for each one.
const PAGE_LOCATIONS = {
  homePage: [{ title: "Home", href: "/" }],
  aboutPage: [{ title: "About Us", href: "/about-us" }],
  servicesPage: [{ title: "Services", href: "/services" }],
  teamPage: [{ title: "Team", href: "/team" }],
  contactPage: [{ title: "Contact", href: "/contact" }],
  creditsPage: [{ title: "Credits", href: "/credits" }],
  privacyPage: [{ title: "Privacy Policy", href: "/privacy" }],
  termsPage: [{ title: "Terms of Service", href: "/terms" }],
};

export default defineConfig({
  basePath: "/studio",
  name: "myelinops",
  title: "Myelin Ops",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        locations: Object.fromEntries(
          Object.entries(PAGE_LOCATIONS).map(([type, locations]) => [
            type,
            { locations },
          ])
        ),
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
  },
});
