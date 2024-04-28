import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { GoogleLogo, AppleLogo, FacebookLogo } from "@phosphor-icons/react";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
import { error } from "console";
const axios = require("axios");

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [visibleInvalidFields, setVisibleInvalidFields] = useState(false);
  const [errorMessage, setErrorMessage] = useState("your mother");
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailLogin = async () => {
    // Handle email login
    console.log(password);
    console.log(confirmPassword);
    if (password !== confirmPassword) {
      setErrorMessage("Your Passwords do not match!");
      setVisibleInvalidFields(true);
      console.log("balls");
      
      return;
    } else {
      axios
      .post(API_BASE_URL + "/api/auth/signup", {
        username: email,
        email: email,
        password: password,
      })
      .then((response: any) => {
        console.log(response);
        if (response.status != 201) {

        } else {
          setVisibleInvalidFields(false);
        }
      })
      .catch((error: any) => {
        console.log(error.response.data.message);
        setVisibleInvalidFields(true);
        setErrorMessage(error.response.data.message);
      });
    }
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-white">
      <div className="flex flex-col p-8 bg-gray-100 shadow-sm rounded-xl w-96">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Register</h2>
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
            onChange={handleEmailChange}
            className="mt-1 px-4 py-2 block w-full border-gray-300 rounded-md shadow-sm text-sm text-gray-800"
          />
        </div>
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
            value={password}
            onChange={handlePasswordChange}
            className="mt-1 px-4 py-2 block w-full border-gray-300 rounded-md shadow-sm text-sm text-gray-800"
          />
          <div className="absolute inset-y-10 right-0 pr-3 flex items-center text-sm leading-5">
            <button onClick={togglePasswordVisibility}>
              {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <div className="mb-4 relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="mt-1 px-4 py-2 block w-full border-gray-300 rounded-md shadow-sm text-sm text-gray-800"
          />
          <div className="absolute inset-y-10 right-0 pr-3 flex items-center text-sm leading-5">
            <button onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleEmailLogin}
            className="text-white bg-stone-900 hover:bg-stone-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Register
          </button>
        </div>
        <div>
          <p className="text-left text-gray-800 mt-4 text-xs">
            Already have an account?
            <Link href="login">
              <b> Login</b>
            </Link>
          </p>
        </div>
        {visibleInvalidFields && (
          <label
            htmlFor="invalidfields"
            className="block text-sm font-medium text-gray-700"
          >
            {errorMessage}
          </label>
        )}
      </div>
    </div>
  );
};

export default Login;
