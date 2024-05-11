import Header from "@/components/Header";
import HomePageForm from "@/components/Home/HomePageForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full h-full bg-white font-inter">
      <Header />
      <HomePageForm />
      <Footer />
    </div>
  );
}
