import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
  return (
    <div className="w-full h-full bg-white font-inter">
      <Header />
      <LoginForm />
    </div>
  );
}
