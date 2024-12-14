import React from "react";

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, name, placeholder }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="w-full max-w-4xl rounded border bg-gray-100 px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    />
  );
};

export default InputField;
