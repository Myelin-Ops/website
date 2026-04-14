import Header from "@/components/Header";
import ContactContent from "@/components/ContactContent";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us | Myelin Ops",
  description: "Get in touch with Myelin Ops for general inquiries, institutional partnerships, or to schedule a consultation.",
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
