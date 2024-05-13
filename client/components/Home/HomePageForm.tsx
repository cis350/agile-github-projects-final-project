import React from "react";
import WhiteCarImage from "./WhiteCarImage";
import HeaderSection from "./HomeHeader/HeaderSection";
import RideBookingForm from "./MiniBookRide/RideBookingForm";
import HowItWorksSection from "./HowItWorks/HowItWorksSection";

const HomePageForm: React.FC = () => {
  return (
    <div className="w-full h-full bg-white font-inter p-16">
      <WhiteCarImage />
      <HeaderSection />
      <RideBookingForm />
      <HowItWorksSection />
    </div>
  );
};

export default HomePageForm;
