import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { bookRide } from "@/pages/api/api_auth_routes";
import LocationField from "./LocationField";
import TimeSelection from "./TimeSelection";
import PassengerSelection from "./PassengerSelection";
import SuitcaseSelection from "./SuitcaseSelection";
import SubmitButton from "./SubmitButton";

const BookRideSchema = Yup.object().shape({
  pickupLocation: Yup.string()
    .required("Pickup location is required"),
  dropoffLocation: Yup.string()
    .required("Dropoff location is required"),
  passengers: Yup.number()
    .required("Number of passengers is required")
    .min(1, "Number of suitcases is required"),
  suitcases: Yup.number()
    .required("Number of suitcases is required")
    .min(0, "Number of suitcases is required"),
  pickupTime: Yup.string().when("pickupOption", {
    is: (val: string) => val === "Later",
    then: (schema) => schema.required("Please select a time").nullable(),
    otherwise: (schema) => schema.nullable(),
  }),
});

const BookRide: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Now");
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");

  return (
    <div className="w-[35vw] p-6">
      <h2 className="text-2xl font-semibold mb-4">Book a Ride</h2>
      <Formik
        initialValues={{
          pickupLocation: "",
          dropoffLocation: "",
          passengers: 0,
          suitcases: -1,
          pickupTime: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }}
        validationSchema={BookRideSchema}
        onSubmit={async (values) => {
          try {
            const response = await bookRide(
              values.pickupLocation,
              values.dropoffLocation,
              values.pickupTime,
              values.passengers,
              values.suitcases,
              localStorage.getItem("SavedToken") ?? ""
            );
            if (response.status === 200) {
              console.log("Ride book success!", response.data);
              // Redirect to dashboard or perform other success actions
            }
          } catch (error: any) {
            console.error("Ride booking failed", error.response?.data?.message);
            // Handle error messages if needed
          }
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4">
            <LocationField id="pickupLocation" name="pickupLocation" placeholder="Pickup location" />
            <LocationField id="dropoffLocation" name="dropoffLocation" placeholder="Dropoff location" />
            <TimeSelection
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              timeOptions={timeOptions}
              setTimeOptions={setTimeOptions}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              setFieldValue={setFieldValue}
            />
            <PassengerSelection />
            <SuitcaseSelection />
            <SubmitButton />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookRide;
