import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserProfile from "@/components/Profile/UserProfile";

export default function Profile() {
  return (
    <div className="w-full h-full bg-white font-inter">
      <Header />
      <UserProfile />
      <Footer />
    </div>
  );
}
