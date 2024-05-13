import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Users } from "@phosphor-icons/react";

const PassengerSelection: React.FC = () => (
  <div className="relative">
    <Users
      weight="light"
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-800"
      size={24}
    />
    <Field
      as="select"
      className="pl-11 p-3 bg-gray-100 rounded-3xl text-stone-800 placeholder-stone-800 w-full appearance-none"
      id="passengers"
      name="passengers"
    >
      <option value="0" disabled>
        # of Passengers
      </option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </Field>
    <ErrorMessage
      name="passengers"
      component="div"
      className="text-red-500 text-sm mt-2"
    />
  </div>
);

export default PassengerSelection;
