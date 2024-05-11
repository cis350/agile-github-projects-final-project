import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingForm from "@/components/Book/BookRide";

export default function Login() {
  const [pickupLocation, setPickupLocation] = useState(
    "4035 S 40th St, Philadelphia, PA"
  );
  const [dropOffLocation, setDropOffLocation] = useState(
    "Central Park, New York, NY"
  );
  return (
    <div className="w-full h-full bg-white font-inter">
      <Header />
      <BookingForm />
      <Footer />
    </div>
  );
}
