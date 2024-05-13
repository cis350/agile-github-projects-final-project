import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { SuitcaseRolling } from "@phosphor-icons/react";

const SuitcaseSelection: React.FC = () => (
  <div className="relative">
    <SuitcaseRolling
      weight="light"
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
      size={24}
    />
    <Field
      as="select"
      className="pl-11 p-3 bg-gray-100 rounded-3xl placeholder-gray-500 w-full appearance-none"
      id="suitcases"
      name="suitcases"
    >
      <option value="-1" disabled>
        # of Suitcases
      </option>
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </Field>
    <ErrorMessage
      name="suitcases"
      component="div"
      className="text-red-500 text-sm mt-2"
    />
  </div>
);

export default SuitcaseSelection;
