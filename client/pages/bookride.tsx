import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookRideForm from "@/components/Book/BookRide";
import WhiteCarImage from "@/components/Home/WhiteCarImage";

export default function BookRide() {
  return (
    <div className="w-full h-full bg-white font-inter">
      <Header />
      <div className="flex flex-row p-16 min-h-[80vh]">
        <BookRideForm />
        <WhiteCarImage />
      </div>

      <Footer />
    </div>
  );
}
