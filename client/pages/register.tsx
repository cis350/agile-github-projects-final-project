import Image from "next/image";
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";
import RegistrationForm from "@/components/RegistrationForm";

export default function Register() {
  return (
    <div className="w-full h-full bg-white font-inter">
      <Header />
      <RegistrationForm />
    </div>
  );
}
