import React from "react";
import { MapPin } from "@phosphor-icons/react";
import Image from "next/image";
import HowItWorksGraphic from "@/public/HowItWorksGraphic.svg";
import WhiteCarImage from "./WhiteCarImage";
import PebbleCar from "./PebbleCar";


const HomePageForm = () => {
  return (
    <div className="w-full h-full bg-white font-inter p-16">
      <WhiteCarImage />
      {/* Header Section */}
      <div className="text-left space-y-4 py-10 w-1/2">
        <h1 className="text-4xl font-bold text-gray-800">Share a Ride</h1>
        <p className="text-gray-600">
          Returning from the airport? Schedule a ride with another Penn student
          and save! Request a ride now!
        </p>

        {/* Ride Booking Form */}
        <form className="flex justify-left items-center space-x-4 mt-4 w-fit">
          <div className="relative">
            <MapPin
              weight="light"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={24}
            />

            <input
              type="text"
              placeholder="Enter pick up location"
              className="pl-10 p-4 bg-gray-100 rounded-3xl text-stone-800 placeholder:text-gray-500"
              autoComplete="address-line1"
            />
          </div>
          <div className="relative flex">
            <MapPin
              weight="light"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              size={24}
            />
            <input
              type="text"
              placeholder="Enter drop off location"
              className="pl-10 p-4 bg-gray-100 rounded-3xl text-stone-800 placeholder:text-gray-500"
              autoComplete="address-line1"
            />
          </div>
        </form>

        {/* Book Ride Button */}
        <button className="mt-6 bg-[#C7E6FC] text-stone-800 font-bold py-4 px-8 rounded-3xl hover:bg-[#AADAFD] active:bg-[#6BACDA] active:text-white">
          Book a Ride
        </button>
      </div>
      {/* How It Works Section */}
      <div className="my-20 mt-56">
        <h2 className="text-3xl text-center font-semibold mb-10 text-stone-800">
          How It Works
        </h2>
        <div className="h-[100vh]">
          <Image
            src={HowItWorksGraphic}
            alt="How It Works"
            className="absolute left-0"
          />
        </div>

        <div className="flex flex-row items-start justify-evenly">
          <div className="flex flex-col items-center space-y-2 w-40 justify-center">
            <div className="text-3xl font-semibold text-center text-stone-800">50%</div>
            <p className="text-xl text-center text-stone-800 ">savings on all rides</p>
          </div>
          <div className="flex flex-col items-center space-y-2 w-40 justify-center">
            <div className="text-3xl font-semibold text-center text-stone-800 ">50%</div>
            <p className="text-xl text-center text-stone-800 ">
              wait time decreased on all rides
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 justify-center w-40">
            <div className="text-3xl font-semibold text-center text-stone-800 ">100%</div>
            <p className="text-xl text-center text-stone-800 ">friendship guaranteed</p>
          </div>
        </div>
        <div className="h-[80vh] mt-20 flex flex-row">
          <PebbleCar />
          <div className="w-1/2"></div>
          <div className="w-1/2 mt-20">
            <div className="text-4xl text-stone-800 font-bold">
              Save Money. 
            </div>
            <div className="text-4xl text-stone-800 font-bold mt-2">
              Make Friends.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageForm;
