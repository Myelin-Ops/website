import Header from "@/components/Header";
import ServicesContent from "@/components/ServicesContent";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Interventions & Services",
  description: "Discover our organizational interventions, neuro-leadership training, and strategic growth services designed for excellence.",
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesContent />
      </main>
      <Footer />
    </>
  );
}
