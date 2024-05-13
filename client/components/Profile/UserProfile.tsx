import React, { useState } from "react";
import { PencilSimple } from "@phosphor-icons/react";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ProfilePic from "@/public/man1.jpeg";

const rideshareOptions = ["Curb", "Uber", "Lyft"];
const paymentOptions = ["Venmo", "Zelle", "PayPal"];

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
});

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [rideshareApps, setRideshareApps] = useState<string[]>([
    "Lyft",
    "Uber",
  ]);
  const [paymentMethod, setPaymentMethod] = useState("Venmo");

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = (values: any) => {
    setIsEditing(false);
    console.log("Saved values:", values);
  };

  const handleDiscardChanges = () => {
    setIsEditing(false);
  };

  const addRideshareApp = (app: string) => {
    setRideshareApps((prev) => [...prev, app]);
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-xl p-6 py-20">
        <Image
          src={ProfilePic}
          alt="Profile"
          className="rounded-full"
          width={140}
          height={140}
        />
      </div>
      <div className="max-w-xl min-w-[40vw] p-6 py-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="ml-4">
              <h2 className="text-2xl font-bold">Andrew Wu</h2>
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={handleEditClick}
              className="flex items-center text-gray-600 hover:text-gray-900 p-2 bg-gray-100 rounded-3xl"
            >
              <PencilSimple size={20} />
              <span className="ml-1">edit</span>
            </button>
          )}
        </div>

        {isEditing ? (
          <Formik
            initialValues={{
              email: "andrewwu@gmail.com",
              password: "",
              rideshareApp: "",
              paymentMethod,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSaveChanges}
          >
            {({ values, setFieldValue }) => (
              <Form className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-3 px-4 bg-gray-100 rounded-3xl placeholder-gray-500 w-full">
                  <label className="text-gray-500 font-semibold">
                    Change Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="ml-4 bg-transparent outline-none text-right"
                    placeholder="Enter New Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex items-center justify-between p-3 px-4 bg-gray-100 rounded-3xl placeholder-gray-500 w-full">
                  <label className="text-gray-500 font-semibold">
                    Change Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="ml-4 bg-transparent outline-none text-right"
                    placeholder="Enter New Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex items-center justify-between p-3 px-4 bg-gray-100 rounded-3xl placeholder-gray-500 w-full">
                  <label className="text-gray-500 font-semibold">
                    Change Preferred Rideshare Apps
                  </label>
                  <div className="ml-4 flex flex-wrap space-x-2">
                    {rideshareApps.map((app, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 px-2 py-1 rounded-full text-sm font-semibold text-gray-700 flex items-center space-x-1"
                      >
                        <span>{app}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setRideshareApps((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                          className="bg-gray-200 text-gray-500 hover:text-gray-700 rounded-full appearance-none"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    {rideshareApps && rideshareApps.length < 3 && (
                      <Field
                        as="select"
                        name="rideshareApp"
                        className="bg-gray-200 px-2 py-1 rounded-full text-sm font-semibold text-gray-700 appearance-none"
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          const selectedApp = e.target.value;
                          if (
                            selectedApp &&
                            !rideshareApps.includes(selectedApp)
                          ) {
                            addRideshareApp(selectedApp);
                            setFieldValue("rideshareApp", "");
                          }
                        }}
                        value=""
                      >
                        <option value="" disabled>
                          Add +
                        </option>
                        {rideshareOptions
                          .filter((app) => !rideshareApps.includes(app))
                          .map((app) => (
                            <option key={app} value={app}>
                              {app}
                            </option>
                          ))}
                      </Field>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 px-4 bg-gray-100 rounded-3xl placeholder-gray-500 w-full">
                  <label className="text-gray-500 font-semibold">
                    Change Preferred Payment
                  </label>
                  <Field
                    as="select"
                    name="paymentMethod"
                    className="flex justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full appearance-none"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setFieldValue("paymentMethod", e.target.value)
                    }
                    value={values.paymentMethod}
                  >
                    {paymentOptions.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="mt-6 flex space-x-4">
                  <button
                    type="submit"
                    className="bg-gray-800 text-white py-2 px-4 rounded-3xl flex items-center justify-center w-1/2"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleDiscardChanges}
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded-3xl w-1/2"
                  >
                    Discard Changes
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between p-3 px-4 bg-gray-100 rounded-3xl placeholder-gray-500 w-full">
              <span className="text-gray-500 w-32 font-semibold">Email</span>
              <span className="ml-4 text-right">andrewwu@gmail.com</span>
            </div>
            <div className="flex items-center justify-between p-3 px-4 bg-gray-100 rounded-3xl placeholder-gray-500 w-full">
              <span className="text-gray-500 w-32 font-semibold">Stars</span>
              <span className="ml-4 flex items-center">
                5.0
                <div className="flex ml-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966h4.175c.969 0 1.371 1.24.588 1.81l-3.373 2.448 1.287 3.966c.3.921-.755 1.688-1.54 1.116L10 13.011l-3.374 2.447c-.785.572-1.84-.195-1.54-1.116l1.287-3.966L3 8.703c-.783-.57-.38-1.81.588-1.81h4.175l1.286-3.966z" />
                    </svg>
                  ))}
                </div>
              </span>
            </div>
            <div className="flex items-center justify-between p-3 px-4 bg-gray-100 rounded-3xl placeholder-gray-500 w-full">
              <span className="text-gray-500 w-32 font-semibold">
                Rideshare Apps
              </span>
              <div className="ml-4 flex space-x-2">
                {rideshareApps.map((app, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-2 py-1 rounded-full text-sm font-semibold text-gray-700"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between p-3 px-4 bg-gray-100 rounded-3xl placeholder-gray-500 w-full">
              <span className="text-gray-500 font-semibold">
                Payment Method
              </span>
              <span className="ml-4 text-blue-500 font-semibold">
                {paymentMethod}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
