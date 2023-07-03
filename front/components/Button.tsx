import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: any;
  disabled?: boolean;
}

export default function Button({ children, type, className, onClick, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={`flex items-center justify-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white  ${className}`} {...props}>
      {children}
    </button>
  );
}