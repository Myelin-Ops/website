import Header from "@/components/Header";
import CreditsContent from "@/components/CreditsContent";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Development Credits | Myelin Ops",
  description: "Recognizing the student development team behind the Myelin Ops digital presence.",
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
