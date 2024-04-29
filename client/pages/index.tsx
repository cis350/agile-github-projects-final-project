import Header from "@/components/Header";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full h-full bg-white font-inter">
      <Header />
      <BookingForm />
      <Footer />
    </div>
  );
}
