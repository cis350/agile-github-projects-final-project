import React from "react";
import Link from "next/link";
import { User } from "@phosphor-icons/react";

const Header = () => {
  return (
    <header className="flex items-center justify-between w-full p-8 bg-[#C7E6FC] font-inter">
      <Link href="/">
        <div className="flex items-center gap-4">
          <h1 className="absolute text-[48px] mt-[-16px] font-light font-major-mono-display text-stone-800 hover:text-stone-600 active:text-stone-500">
            Pebble
          </h1>
        </div>
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="about" className="text-stone-800 hover:text-stone-600 active:text-stone-500">About</Link>
        <Link href="login" className="text-stone-800 hover:text-stone-600 active:text-stone-500">Login</Link>
        <Link className="bg-white px-4 py-1 rounded-full text-stone-800 hover:bg-gray-100 active:bg-gray-200" href="/bookride">
          Book a Ride
        </Link>
        <Link href="profile" className="bg-white rounded-full h-8 w-8 flex justify-center items-center hover:bg-gray-100 active:bg-gray-200" >
          <User size={18} weight='fill' color="gray" />    
        </Link>
      </nav>
    </header>
  );
};

export default Header;
