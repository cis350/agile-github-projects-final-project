import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MapPin, Users, SuitcaseRolling } from "@phosphor-icons/react";
import WhiteCarImage from "../Home/WhiteCarImage";

const BookRideSchema = Yup.object().shape({
  pickupLocation: Yup.string().required("Pickup location is required"),
  dropoffLocation: Yup.string().required("Dropoff location is required"),
  passengers: Yup.number()
    .required("Number of passengers is required")
    .min(1, "At least one passenger"),
  suitcases: Yup.number()
    .required("Number of suitcases is required")
    .min(0, "Cannot be negative"),
});

const BookRide: React.FC = () => {
  return (
    <div className="max-w-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Book a Ride</h2>
      <WhiteCarImage />
      <Formik
        initialValues={{
          pickupLocation: "",
          pickupTime: "",
          passengers: 1,
          suitcases: 0,
        }}
        validationSchema={BookRideSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="space-y-4">
            <div>
              <div className="relative">
                <MapPin
                  weight="light"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
                  size={24}
                />
                <Field
                  className="pl-11 p-3 bg-gray-100 rounded-3xl placeholder-gray-500 w-full"
                  id="pickupLocation"
                  name="pickupLocation"
                  placeholder="Pickup location"
                />
              </div>
              <ErrorMessage
                name="pickupLocation"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>
            <div>
              <div className="relative">
                <MapPin
                  weight="light"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
                  size={24}
                />
                <Field
                  className="pl-11 p-3 bg-gray-100 rounded-3xl placeholder-gray-500 w-full"
                  id="dropoffLocation"
                  name="dropoffLocation"
                  placeholder="Dropoff location"
                />
              </div>
              <ErrorMessage
                name="dropoffLocation"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            <div className="relative">
              <Users
                weight="light"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
                size={24}
              />
              <Field
                as="select"
                className="pl-11 p-3 bg-gray-100 rounded-3xl placeholder-gray-500 w-full appearance-none"
                id="passengers"
                name="passengers"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Field>
              <ErrorMessage
                name="passengers"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="relative">
              <SuitcaseRolling
                weight="light"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
                size={24}
              />
              <Field
                as="select"
                className="pl-11 p-3 bg-gray-100 rounded-3xl placeholder-gray-500 w-full appearance-none"
                id="suitcases"
                name="suitcases"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Field>
              <ErrorMessage
                name="suitcases"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-4 rounded-3xl shadow hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Request a Rider
            </button>
            
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookRide;
