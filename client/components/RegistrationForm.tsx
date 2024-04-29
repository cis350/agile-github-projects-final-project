import React, { useState } from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useRouter } from "next/router"; 
require('dotenv').config();
import { register } from '@/pages/api/api_auth_routes';




// Validation schema for the form fields
const RegistrationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords don't match")
    .required("Confirming password is required"),
});

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegistrationSchema,
    onSubmit: async (values) => {
      try {
        const response = await register(values.email, values.password);

        if (response.status === 201) {
          console.log("Registration successful", response.data);
          // Redirect to login or perform other success actions
          router.push('/login');
        }
      } catch (error: any) {
        console.error("Registration failed", error.response?.data?.message);
        setErrorMessages(error.response?.data?.message);
        // Handle the registration error
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-white">
      <div className="flex flex-col p-8 bg-gray-100 shadow-sm rounded-xl w-96">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Register</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Email Input */}
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
              className={`mt-1 px-4 py-2 block w-full ${
                formik.touched.email && formik.errors.email
                  ? "border-[1px] border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm text-sm text-gray-800`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-xs text-red-600">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-2 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...formik.getFieldProps("password")}
              className={`mt-1 px-4 py-2 block w-full ${
                formik.touched.password && formik.errors.password
                  ? "border-[1px] border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm text-sm text-gray-800`}
            />
            <div className="absolute inset-y-[42px] right-0 pr-3 flex items-center text-sm leading-5">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...formik.getFieldProps("confirmPassword")}
              className={`mt-1 px-4 py-2 block w-full ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-[1px] border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm text-sm text-gray-800`}
            />
            <div className="absolute inset-y-[42px] right-0 pr-3 flex items-center text-sm leading-5">
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeSlash size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="text-white bg-stone-900 hover:bg-stone-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Register
            </button>
          </div>
        </form>
        <div>
          <p className="text-left text-gray-800 mt-4 text-xs">
            Already have an account?
            <Link href="login">
              <span className="font-inter font-bold text-black"> Login</span>
            </Link>
          </p>
        </div>
        {errorMessages !== "" && (
          <div className="mt-4 p-2 bg-red-100 border-l-4 border-red-500">
              <p className="text-red-600 text-sm">{errorMessages}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;