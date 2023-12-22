"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  fullWidth?: boolean;
  loading?: boolean;
  size: "small" | "medium" | "large";
}

export const Button = ({
  children,
  fullWidth,
  loading,
  size,
  ...rest
}: IButtonProps) => {
  const buttonSize = {
    small: "py-1 px-1",
    medium: "py-2 px-3",
    large: "py-4 px-5",
  };

  return (
    <button
      {...rest}
      className={`flex items-center justify-center bg-primary text-surfaces disabled:bg-disabled font-bold rounded-md hover:bg-copy-primary  ${
        fullWidth ? "w-full" : ""
      } ${buttonSize[size]}`}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};
