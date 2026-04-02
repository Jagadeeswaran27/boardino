import { ReactNode } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  errors: { [key: string]: string };
  suffix?: ReactNode;
}

const InputField = (props: InputFieldProps) => {
  const { label, name, type, placeholder, errors, suffix } = props;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          {label}
        </label>
        {suffix}
      </div>
      <input
        id={name}
        type={type}
        name={name}
        className="w-full px-4 py-3 border border-neutral-200 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
      )}
    </div>
  );
};

export default InputField;
