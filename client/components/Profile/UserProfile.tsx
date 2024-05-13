import React, { useState, useEffect } from "react";
import { PencilSimple } from "@phosphor-icons/react";
import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ProfilePic from "@/public/man1.jpeg";
import EditableField from "./EditableField";
import RideshareApps from "./RideshareApps";
import PaymentMethod from "./PaymentMethod";
import ProfileView from "./ProfileView";
import { editProfile, fetchProfile } from "@/pages/api/api_auth_routes";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  rideshareApp: Yup.array().min(1, "At least one ride share app must be chosen").required("Required"),
});

const convertArrayToString = (array: string[]): string => {
  return array.join(";");
};

const UserProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
    rideshareApps: ["Lyft", "Uber"],
    paymentMethod: "Venmo",
  });

  useEffect(() => {
    if (!rendered) {
      setRendered(true);
      fetchProfile(localStorage.getItem("SavedToken") ?? "")
        .then((response) => {
          if (response.status === 200) {
            console.log("Fetch Successful", response.data);
            const email = response.data.email ?? "";
            const rideshareApps = response.data.rideshareApp ?? "";
            const paymentMethod = response.data.paymentMethod ?? "Venmo";
            setInitialValues({
              email,
              password: "",
              rideshareApps: rideshareApps.length > 0 ? rideshareApps : ["Lyft", "Uber"],
              paymentMethod: paymentMethod.length > 0 ? paymentMethod : "Venmo",
            });
          }
        })
        .catch((error) => {
          console.error("Update failed", error.response?.data?.message);
        });
    }
  }, [rendered]);

  const handleEditClick = () => {
    console.log("Editing profile");
    setIsEditing(true);
  };

  const handleSaveChanges = async (values: any) => {
    const rideshareAppsString = convertArrayToString(values.rideshareApps);
    setIsEditing(false);
    console.log("Saved values:", values);
    try {
      const response = await editProfile(
        values.email,
        values.password,
        rideshareAppsString,
        values.paymentMethod,
        localStorage.getItem("SavedToken") ?? ""
      );
      if (response.status === 200) {
        console.log("Save success", response.data);
        setRendered(false);
      }
    } catch (error: any) {
      console.error("Save failed", error.response?.data?.message);
    }
  };

  const handleDiscardChanges = (resetForm: any) => {
    setIsEditing(false);
    resetForm();
  };

  const addRideshareApp = (app: string, setFieldValue: any, values: any) => {
    const updatedApps = [...(values.rideshareApp || []), app];
    setFieldValue('rideshareApps', updatedApps);
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
              <h2 className="text-2xl font-bold">My Profile</h2>
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={handleEditClick}
              className="flex items-center text-gray-600 hover:text-gray-900 p-2 bg-gray-100 rounded-3xl"
            >
              <PencilSimple size={20} />
              <span className="ml-1 text-black">edit</span>
            </button>
          )}
        </div>

        {isEditing ? (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSaveChanges}
          >
            {({ values, setFieldValue, resetForm }) => (
              <Form className="mt-6 space-y-4 min-w-[40vw]">
                <EditableField
                  label="Change Email"
                  name="email"
                  type="email"
                  placeholder="Enter New Email"
                />
                <EditableField
                  label="Change Password"
                  name="password"
                  type="password"
                  placeholder="Enter New Password"
                />
                <RideshareApps
                  rideshareApps={values.rideshareApps}
                  addRideshareApp={(app: string) => addRideshareApp(app, setFieldValue, values)}
                  setFieldValue={setFieldValue}
                />
                <PaymentMethod
                  paymentMethod={values.paymentMethod}
                  setFieldValue={setFieldValue}
                />
                <div className="mt-6 flex space-x-4">
                  <button
                    type="submit"
                    className="bg-gray-800 text-white py-2 px-4 rounded-3xl flex items-center justify-center w-1/2"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDiscardChanges(resetForm)}
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded-3xl w-1/2"
                  >
                    Discard Changes
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <ProfileView
            email={initialValues.email}
            rideshareApps={initialValues.rideshareApps}
            paymentMethod={initialValues.paymentMethod}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;

