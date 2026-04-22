import Header from "@/components/Header";
import ContactContent from "@/components/ContactContent";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Myelin Ops. Connect with us for consultations, partnerships, or professional inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}
