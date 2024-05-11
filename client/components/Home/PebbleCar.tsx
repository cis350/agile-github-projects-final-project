import React from "react";
import Image from "next/image";
import AppCar from "@/public/App+Car.png";

const PebbleCar = () => {
  return (
    <Image
      src={AppCar}
      alt="Pebble App and Car Illustration"
      width={700}
      className="absolute left-0"
    />
  );
};

export default PebbleCar;
