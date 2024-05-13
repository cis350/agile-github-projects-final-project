import React, { useState, useEffect } from "react";
import { PencilSimple, SignOut } from "@phosphor-icons/react";
import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ProfilePic from "@/public/man1.jpeg";
import EditableField from "./EditableField";
import RideshareApps from "./RideshareApps";
import PaymentMethod from "./PaymentMethod";
import ProfileView from "./ProfileView";
import { useRouter } from "next/router";
import { editProfile, fetchProfile } from "@/pages/api/api_auth_routes";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
});

const convertArrayToString = (array: string[]): string => {
  return array.join("; ");
};

const UserProfile: React.FC = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [email, setEmail] = useState("");
  const [rideshareApps, setRideshareApps] = useState<string[]>([
    "Lyft",
    "Uber",
  ]);
  const [paymentMethod, setPaymentMethod] = useState("Venmo");

  useEffect(() => {
    if (!rendered) {
      setRendered(true);
      fetchProfile(localStorage.getItem("SavedToken") ?? "")
        .then((response) => {
          if (response.status === 200) {
            console.log("Fetch Successful", response.data);
            if (response.data.email === null || response.data.email === "") {
              router.push("/login");
            } else {
              setEmail(response.data.email ?? "");
              setRideshareApps(response.data.rideshareApp ?? "");
              setPaymentMethod(response.data.paymentMethod ?? "");
            }
          }
        })
        .catch((error) => {
          router.push("/login");
          console.error("Update failed", error.response?.data?.message);
        });
    }
  }, [rendered]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async (values: any) => {
    const rideshareAppsString = convertArrayToString(rideshareApps);
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
              <span className="ml-1 text-black">edit</span>
            </button>
          )}
        </div>

        {isEditing ? (
          <Formik
            initialValues={{
              email: email,
              password: "",
              rideshareApp: rideshareApps,
              paymentMethod: paymentMethod,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSaveChanges}
          >
            {({ values, setFieldValue, resetForm }) => (
              <Form className="mt-6 space-y-4">
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
                  rideshareApps={rideshareApps}
                  addRideshareApp={addRideshareApp}
                  setFieldValue={setFieldValue}
                />
                <PaymentMethod
                  paymentMethod={paymentMethod}
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
            email={email}
            rideshareApps={rideshareApps}
            paymentMethod={paymentMethod}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
