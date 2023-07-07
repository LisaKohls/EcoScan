import React from 'react';

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}) => (
  <div className="pt-4 text-white">
    <label>
      {label}
      <div className="relative flex items-center rounded-md bg-white border border-gray-300 m-margin-elements">
        <input
          className="w-full py-2 pr-4 pl-4 text-black rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-secondary-color"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </label>
  </div>
);

export default InputField;
