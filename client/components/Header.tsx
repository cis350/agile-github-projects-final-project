import React from 'react';
import Link from "next/link";
import { UserCircle } from "@phosphor-icons/react";

const Header = () => {
  return (
    <header className="flex items-center justify-between w-full p-8 bg-white">
      <Link href="/">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">Pebble</h1>
        </div>
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="/about">
          About
        </Link>
        <Link className="bg-sky-200 px-4 py-1 rounded-full" href="/bookride" >
          Book a Ride
        </Link>
        <Link href="/profile">
        </Link>
        <UserCircle size={32} />
      </nav>
    </header>
  );
};

export default Header; 