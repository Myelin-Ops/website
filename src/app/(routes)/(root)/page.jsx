import Header from "@/components/Header";
import HomeContent from "@/components/HomeContent";
import Partners from "@/components/Partners";
import WhyItMatters from "@/components/WhyItMatters";
import CTA from "@/components/CTA";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Home | Elevating Performance",
  description: "Myelin Ops is the protective layer for organizations. We help businesses thrive through operational excellence and strategic growth.",
};

export default function Page() {
  return (
    <>
      <Header />
      <HomeContent />
      <Testimonials />
      <Gallery />
      <Partners />
      <WhyItMatters />
      <CTA />
      <Footer />
    </>
  );
}
