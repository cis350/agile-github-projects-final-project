import React from 'react';
import { MapPin } from "@phosphor-icons/react";

interface InputFieldProps {
  placeholder: string;
  iconColor: string;
  autoComplete: string;
}

const InputField: React.FC<InputFieldProps> = ({ placeholder, iconColor, autoComplete }) => (
  <div className="relative">
    <MapPin
      weight="light"
      className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${iconColor}`}
      size={24}
    />
    <input
      type="text"
      placeholder={placeholder}
      className="pl-10 p-4 bg-gray-100 rounded-3xl text-stone-800 placeholder:text-gray-500"
      autoComplete={autoComplete}
    />
  </div>
);

export default InputField;
