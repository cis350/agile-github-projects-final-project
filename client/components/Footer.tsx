import React from "react";
import Link from "next/link";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-between items-start">
        <div className="flex flex-col items-start">
          <h1 className="text-[48px] mt-[-18px] ml-[-4px] mb-2 font-light font-major-mono-display text-stone-800">
            Pebble
          </h1>
          <p className="text-stone-700">Save money, Make friends.</p>
          <div className="flex mt-4">
            <Link
              href="https://www.facebook.com"
              target="https://www.facebook.com"
              className="text-gray-400 hover:text-gray-500 mr-4"
            >
              <FacebookLogo size={24} weight={"fill"} />
            </Link>
            <Link
              href="https://www.instagram.com"
              target="https://www.instagram.com"
              className="text-gray-400 hover:text-gray-500 mr-4"
            >
              <InstagramLogo size={24} weight={"fill"} />
            </Link>
            <Link
              href="https://twitter.com"
              target="https://twitter.com"
              className="text-gray-400 hover:text-gray-500 mr-4"
            >
              <TwitterLogo size={24} weight={"fill"} />
            </Link>
            <Link
              href="https://www.youtube.com"
              target="https://www.youtube.com"
              className="text-gray-400 hover:text-gray-500"
            >
              <YoutubeLogo size={24} weight={"fill"} />
            </Link>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-bold mb-2 text-xl">About</h3>
          <ul>
            <li className="mb-1">
              <Link href="meet-us" className="hover:underline">
                Meet us
              </Link>
            </li>
            <li className="mb-1">
              <Link href="contact" className="hover:underline">
                Contact us
              </Link>
            </li>
            <li className="mb-1">
              <Link href="faqs" className="hover:underline">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="font-bold mb-2 text-xl">Join</h3>
          <ul>
            <li className="mb-1">
              <Link href="register" className="hover:underline">
                Register
              </Link>
            </li>
            <li className="mb-1">
              <Link href="login" className="hover:underline">
                Login
              </Link>
            </li>
            <li className="mb-1">
              <Link href="book-a-ride" className="hover:underline">
                Book a ride
              </Link>
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="font-bold mb-2 text-xl">Legal</h3>
          <ul>
            <li className="mb-1">
              <Link href="terms-of-use" className="hover:underline">
                Terms of use
              </Link>
            </li>
            <li className="mb-1">
              <Link href="privacy-policy" className="hover:underline">
                Privacy policy
              </Link>
            </li>
            <li className="mb-1">
              <Link href="cookie-policy" className="hover:underline">
                Cookie Policy
              </Link>
            </li>
            <li className="mb-1">
              <Link href="safety" className="hover:underline">
                Safety
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full pt-4 mt-4 border-t border-gray-700 text-gray-700 text-center text-xs">
          © 2024 - All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
