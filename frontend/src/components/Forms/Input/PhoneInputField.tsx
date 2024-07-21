import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PhoneInputFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  id,
  name,
  label,
  value,
  onChange,
}) => {
  return (
    <div className="form-group">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
      >
        {label}
      </label>
      <PhoneInput
        country={'us'}
        value={value}
        onChange={onChange}
        inputStyle={{
          width: '100%',
          borderRadius: '0.375rem',
          borderColor: '#d1d5db',
          padding: '0.625rem',
          paddingLeft: '50px',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          marginTop: '0.25rem !important',
        }}
        buttonStyle={{
          borderRadius: '0.375rem 0 0 0.375rem',
          borderColor: '#d1d5db',
        }}
      />
    </div>
  );
};

export default PhoneInputField;
