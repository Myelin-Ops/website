import { Montserrat } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/components/I18nProvider";
import i18n from '@/i18n'; 

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: "Myelin",
  description:
    "We are the protective layer that helps organizations and people thrive.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <I18nProvider i18n={i18n}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
