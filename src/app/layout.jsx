import { Analytics } from "@vercel/analytics/next"
import { Montserrat } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/components/I18nProvider";
import i18n from "@/i18n";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata = {
  metadataBase: new URL("https://myelinops.com"),
  title: {
    default: "Myelin Ops | Elevating Human & Organizational Performance",
    template: "%s | Myelin Ops",
  },
  description:
    "Myelin Ops is the protective layer that helps organizations and people thrive. We specialize in operational excellence, strategic growth, and performance optimization.",
  keywords: [
    "Myelin Ops",
    "Operational Excellence",
    "Business Optimization",
    "Strategic Growth",
    "Performance Management",
    "Organizational Thrive",
    "Consulting Services",
  ],
  authors: [{ name: "Myelin Ops Team" }],
  creator: "Myelin Ops",
  publisher: "Myelin Ops",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Myelin Ops | Elevating Human & Organizational Performance",
    description: "The protective layer that helps organizations and people thrive.",
    url: "https://myelinops.com",
    siteName: "Myelin Ops",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Myelin Ops | Elevating Human & Organizational Performance",
    description: "The protective layer that helps organizations and people thrive.",
    creator: "@myelinops",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <I18nProvider i18n={i18n}>{children}</I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}
