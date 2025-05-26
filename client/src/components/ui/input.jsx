import React from 'react';

const Input = ({ label, type = 'text', className = '', ...props }) => {
  return (
    <div>
      {label && <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>}
      <input
        type={type}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
        {...props} // This is the crucial part! It spreads all other props (like value, onChange, name, placeholder) to the native input element
      />
    </div>
  );
};

export default Input;