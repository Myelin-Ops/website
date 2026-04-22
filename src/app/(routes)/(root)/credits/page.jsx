import Header from "@/components/Header";
import CreditsContent from "@/components/CreditsContent";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Credits",
  description: "Acknowledge the team and partners who contributed to the development of the Myelin Ops digital experience.",
};

export default function CreditsPage() {
  return (
    <>
      <Header />
      <main>
        <CreditsContent />
      </main>
      <Footer />
    </>
  );
}
