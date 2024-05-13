import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface EditableFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
}

const EditableField: React.FC<EditableFieldProps> = ({ label, name, type = "text", placeholder }) => {
  return (
    <div className="flex items-center justify-between p-3 px-4 bg-gray-100 rounded-3xl placeholder-gray-500 w-full">
      <label className="text-gray-500 font-semibold">{label}</label>
      <Field
        type={type}
        name={name}
        className="ml-4 bg-transparent outline-none text-right text-black"
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default EditableField;
