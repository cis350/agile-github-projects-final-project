import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full h-full bg-sky-200">
      <Header />
      <LoginForm />
    </div>
  );
}
