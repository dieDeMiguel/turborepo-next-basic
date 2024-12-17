import * as React from "react";

interface InputFieldProps extends React.ComponentProps<"input"> {
  name: string;
  placeholder?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, type = "text", name, placeholder, ...props }, ref) => {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`w-full max-w-4xl rounded-md border bg-gray-100 px-4 py-2 text-gray-800 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
