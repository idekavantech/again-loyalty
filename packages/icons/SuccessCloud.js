import React from "react";

export default function SuccessCloud({ color = "#007F5F" }) {
  return (
    <svg
      width="24"
      height="16"
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.35 6.04C18.67 2.59 15.64 0 12 0C9.11 0 6.6 1.64 5.35 4.04C2.34 4.36 0 6.91 0 10C0 13.31 2.69 16 6 16H19C21.76 16 24 13.76 24 11C24 8.36 21.95 6.22 19.35 6.04ZM10 13L6.5 9.5L7.91 8.09L10 10.17L15.18 5L16.59 6.41L10 13Z"
        fill={color}
      />
    </svg>
  );
}
