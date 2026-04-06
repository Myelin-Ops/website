import Header from "@/components/Header";
import HomeContent from "@/components/HomeContent";
import Partners from "@/components/Partners";
import WhyItMatters from "@/components/WhyItMatters";
import CTA from "@/components/CTA";
import ScrollableInsights from "@/components/ScrollableInsights";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <HomeContent />
      <Testimonials />
      <Gallery />
      <Partners />
      <WhyItMatters />
      <ScrollableInsights />
      <CTA />
      <Footer />
    </>
  );
}
