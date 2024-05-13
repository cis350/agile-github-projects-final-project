import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  MapPin,
  Users,
  SuitcaseRolling,
  CaretDown,
  Clock,
} from "@phosphor-icons/react";
import { bookRide } from "@/pages/api/api_auth_routes";

const addressRegex =
  /^(.+\s+)+(Street|St\.|Avenue|Ave\.|Boulevard|Blvd\.|Road|Rd\.|Lane|Ln\.|Drive|Dr\.|Court|Ct\.|Plaza|Plz\.|Square|Sq\.)/i;

const BookRideSchema = Yup.object().shape({
  pickupLocation: Yup.string()
    .matches(addressRegex, "Please enter a valid address")
    .required("Pickup location is required"),
  dropoffLocation: Yup.string()
    .matches(addressRegex, "Please enter a valid address")
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
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const [selectedOption, setSelectedOption] = useState<string>("Now");
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("");

  useEffect(() => {
    if (selectedOption === "Later") {
      generateTimeOptions();
    }
  }, [selectedOption]);

  const generateTimeOptions = () => {
    const options: string[] = [];
    const now = new Date();
    const thirtyMinutesLater = new Date(now.getTime() + 30 * 60 * 1000);
    const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    for (
      let time = thirtyMinutesLater;
      time <= twentyFourHoursLater;
      time.setMinutes(time.getMinutes() + 15)
    ) {
      options.push(
        time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }

    setTimeOptions(options);
  };

  const handleOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (value === "Now") {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setFieldValue("pickupTime", currentTime);
      setSelectedTime("");
    } else {
      setFieldValue("pickupTime", "");
    }
  };

  const handleTimeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const value = event.target.value;
    setSelectedTime(value);
    setFieldValue("pickupTime", value);
  };

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
              values.suitcases
            );
            if (response.status === 201) {
              console.log("Ride booked successfully", response.data);
              // Redirect to dashboard or perform other success actions
              // router.push("/");
            }
          } catch (error: any) {
            console.error("Ride booking failed", error.response?.data?.message);
            // Handle error messages if needed
          }
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

            <div>
              <div className="relative mt-1">
                <Clock
                  weight="light"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
                  size={24}
                />
                <Field
                  as="select"
                  id="pickupTime"
                  name="pickupTime"
                  value={selectedOption}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleOptionChange(e, setFieldValue)
                  }
                  className="pl-11 p-3 bg-gray-100 rounded-3xl placeholder-gray-500 w-full appearance-none"
                >
                  <option value="Now">Now</option>
                  <option value="Later">Later</option>
                </Field>
              </div>
              {selectedOption === "Later" && (
                <div className="pl-11 relative mt-4">
                  <Field
                    as="select"
                    id="selectTime"
                    name="selectTime"
                    value={selectedTime}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleTimeChange(e, setFieldValue)
                    }
                    className="p-3 px-4 bg-gray-100 rounded-3xl placeholder-gray-500 w-full appearance-none"
                  >
                    <option value="" disabled>
                      Select a time
                    </option>
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </Field>
                  <CaretDown
                    weight="light"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black"
                    size={24}
                  />
                </div>
              )}
              <ErrorMessage
                name="pickupTime"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            <div className="relative">
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
                  <option value="0" disabled>
                    # of Passengers
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Field>
              </div>
              <ErrorMessage
                name="passengers"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            <div className="relative">
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
                  <option value="-1" disabled>
                    # of Suitcases
                  </option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Field>
              </div>
              <ErrorMessage
                name="suitcases"
                component="div"
                className="text-red-500 text-sm mt-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 px-4 rounded-3xl shadow hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Request a Ride
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookRide;
