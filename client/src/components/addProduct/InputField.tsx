import React from 'react';

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  onBlur?: () => void;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  onBlur,
}) => (
  <div className="pt-2 text-white">
    <label className="ml-2">
      {label}
      <div
        className={`relative w-60 flex items-center rounded-md bg-white border  ${
          error ? 'border-red-500 m-2' : 'border-gray-300 m-4'
        } `}
      >
        <input
          className="w-60 py-2 pr-4 pl-4 text-black rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-secondary-color"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          onBlur={onBlur}
        />
      </div>
      {error && <div className="text-red-500 text-sm mt-1 ml-2">{error}</div>}
    </label>
  </div>
);

export default InputField;
