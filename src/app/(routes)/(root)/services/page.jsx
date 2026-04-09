import Header from "@/components/Header";
import ServicesContent from "@/components/ServicesContent";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Our Interventions | Myelin Ops",
  description: "Explore our specialized interventions in group dynamics, neuro-leadership, migration support, and organizational advancement.",
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
