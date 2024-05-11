import Header from "@/components/Header";
import LoginForm from "@/components/LoginRegister/LoginForm";
import Footer from "@/components/Footer";

export default function Login() {
  return (
    <div className="w-full h-full bg-white font-inter">
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
}
