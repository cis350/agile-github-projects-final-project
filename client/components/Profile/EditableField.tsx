import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { Eye, EyeSlash } from "@phosphor-icons/react";

interface EditableFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
}

const EditableField: React.FC<EditableFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="flex relative items-center justify-between p-3 px-4 bg-gray-100 rounded-3xl placeholder-gray-500 w-full">
        <label className="text-gray-500 font-semibold">{label}</label>
        <Field
          type={showPassword && name === "password" ? "text" : type}
          name={name}
          className={`ml-4 bg-transparent outline-none text-right text-stone-800 ${name=="password" ? "pr-6" : ""}`}
          placeholder={placeholder}
        />
        {name === "password" && (
          <div className="absolute inset-y-[12px] right-0 pr-3 flex items-center text-sm leading-5">
            <button
              type="button"
              className="text-stone-800"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
            </button>
          </div>
        )}
      </div>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </>
  );
};

export default EditableField;
