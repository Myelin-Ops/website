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
  title: "Myelin Ops",
  description:
    "We are the protective layer that helps organizations and people thrive.",
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
