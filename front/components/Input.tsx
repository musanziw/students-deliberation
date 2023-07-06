import React from "react";

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  label: string;
  id?: string;
}

export default function Input({
                                type,
                                name,
                                placeholder,
                                onChange,
                                value,
                                className,
                                required,
                                disabled,
                                label,
                                id,
                              }: InputProps) {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={id} className="text-md text-gray-900">{label}</label>
      <input type={type} name={name} id={id} placeholder={placeholder} onChange={onChange} value={value}
             className={`text-gray-500 rounded-sm border focus:ring-2 ring-blue-200 ring-offset-1 h-9 p-2 focus:outline-none focus:sh focus:inset-1 placeholder:text-sm ${className}`}
             required={required} disabled={disabled} autoComplete={'off'} />
    </div>
  );
}