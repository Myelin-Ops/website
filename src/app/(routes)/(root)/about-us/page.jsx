import Header from "@/components/Header";
import AboutUsContent from "@/components/AboutUsContent";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us | Myelin Ops",
  description: "Learn more about Myelin Ops, our approach, mission, and how we strengthen organizations from the inside out.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutUsContent />
      </main>
      <Footer />
    </>
  );
}
