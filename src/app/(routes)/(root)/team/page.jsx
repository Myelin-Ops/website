import Header from "@/components/Header";
import TeamContent from "@/components/TeamContent";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Meet the Team",
  description: "Meet the experts at Myelin Ops. Our psychologists and consultants work at the intersection of human behavior and business performance.",
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
