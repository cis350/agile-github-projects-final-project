import React from "react";
import Image from "next/image";
import WhiteCar from "@/public/WhiteCar.png";

const WhiteCarImage = () => {
  return (
    <div className="absolute right-0">
      <Image src={WhiteCar} width={500} alt="Ride Illustration" />
    </div>
  );
};

export default WhiteCarImage;
