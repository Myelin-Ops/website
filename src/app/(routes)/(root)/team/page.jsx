import Header from "@/components/Header";
import TeamContent from "@/components/TeamContent";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Our Team | Myelin Ops",
  description: "Meet the experts behind Myelin Ops. A team of psychologists and consultants dedicated to organizational development and workplace wellbeing.",
};

export default function TeamPage() {
  return (
    <>
      <Header />
      <main>
        <TeamContent />
      </main>
      <Footer />
    </>
  );
}
