import Header from "@/components/Header";
import AboutUsContent from "@/components/AboutUsContent";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us",
  description: "Learn about Myelin Ops' mission to strengthen organizations. We specialize in psychological safety, operational resilience, and human performance.",
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
