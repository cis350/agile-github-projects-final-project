import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { MapPin } from "@phosphor-icons/react";

interface LocationFieldProps {
  id: string;
  name: string;
  placeholder: string;
}

const LocationField: React.FC<LocationFieldProps> = ({ id, name, placeholder }) => (
  <div className="relative">
    <MapPin
      weight="light"
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
      size={24}
    />
    <Field
      className="pl-11 p-3 bg-gray-100 rounded-3xl placeholder-gray-500 w-full"
      id={id}
      name={name}
      placeholder={placeholder}
    />
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm mt-2"
    />
  </div>
);

export default LocationField;
