import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { API_BASE_URL } from '../../constants/apiConstants';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/auth/signin`, {
          username: values.email,
          password: values.password,
        });

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
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-white font-inter">
      <div className="p-8 bg-gray-100 shadow-sm rounded-xl w-96 h-96">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Log In</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps('email')}
              className={`mt-1 px-4 py-2 block w-full ${
                formik.touched.email && formik.errors.email ? 'border-[1px] border-red-500' : 'border-none'
              } rounded-md shadow-sm text-sm text-gray-800`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-2 text-xs text-red-600">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...formik.getFieldProps('password')}
              className={`mt-1 px-4 py-2 block w-full ${
                formik.touched.password && formik.errors.password ? 'border-[1px] border-red-500' : 'border-none'
              } rounded-md shadow-sm text-sm text-gray-800`}
            />
            <div className={`absolute inset-y-10 right-0 pr-3 flex items-center text-sm leading-5 ${formik.touched.password && formik.errors.password ? 'inset-y-0' : 'inset-y-[42px]'}`}>
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-2 text-xs text-red-600">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="text-white bg-stone-900 hover:bg-stone-950 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login
            </button>
          </div>
        </form>
        <div>
          <p className="text-left text-gray-800 mt-4 text-xs">
            Don&apos;t have an account?
            <Link href="register">
              <span className="font-inter font-black text-black"> Register</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
