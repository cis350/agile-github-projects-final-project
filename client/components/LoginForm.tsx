import React from "react";
import { Eye, EyeSlash } from "phosphor-react";


const Login: React.FC = () => {
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle email input change
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle password input change
  };

  const handleEmailLogin = () => {
    // Handle email login
  };

  const handleGoogleLogin = () => {
    // Handle Google login
  };

  const handleAppleLogin = () => {
    // Handle Apple login
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-sm rounded-xl w-96">
        <h2 className="text-2xl font-semibold mb-4">Log In</h2>
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
            className="mt-1 px-4 py-2 block w-full border-gray-300 rounded-md shadow-sm text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            id="password"
            type="password"
            onChange={handlePasswordChange}
            className="mt-1 px-4 py-2 block w-full border-gray-300 rounded-md shadow-sm text-sm"
          />
          <a className="text-xs flex justify-end mt-2">Forgot password?</a>
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleEmailLogin}
            className="text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login with Email
          </button>
          <div className="flex justify-center text-sm mt-4 mb-4">or continue with</div>
          <div className="flex flex-row gap-2 justify-evenly w-full">
            <button
              onClick={handleGoogleLogin}
              className="text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-16 h-16"
            >
              G
            </button>
            <button
              onClick={handleAppleLogin}
              className="text-white bg-black hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-16 h-16"
            >
              Apple
            </button>
            <button
              onClick={handleFacebookLogin}
              className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-16 h-16"
            >
              Fb
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
