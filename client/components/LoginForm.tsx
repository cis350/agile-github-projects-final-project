import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { GoogleLogo, AppleLogo, FacebookLogo } from "@phosphor-icons/react";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from "../../constants/apiConstants";
import { error } from "console";
const axios = require("axios");
const { login, register } = require("../../api/auth_calls");

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [visibleInvalidFields, setVisibleInvalidFields] = useState(false);
  const [errorMessage, setErrorMessage] = useState("your mother");
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailLogin = async () => {
    // Handle email login
    console.log(email, password);

    let res = login(email, password);
    if (res.status != 201) {
      setVisibleInvalidFields(true);
      setErrorMessage(res.message);
    } else {
      setVisibleInvalidFields(false);
      setErrorMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-white">
      <div className="p-8 bg-gray-100 shadow-sm rounded-xl w-96 h-96">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Log In</h2>
        <div className="mb-4">
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
        <div className="mb-4 relative">
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
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
            <button onClick={togglePasswordVisibility}>
              {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <a href="#" className="text-xs flex justify-end mt-2 text-gray-800">
            Forgot password?
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleEmailLogin}
            className="text-white bg-stone-900 hover:bg-stone-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
        </div>
        <div>
          <p className="text-left text-gray-800 mt-4 text-xs">
            Don&apos;t have an account? 
            <Link href='register'><b> Register</b></Link>
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
