import React from "react";

export default function UnSuccessCloud({ color = "#D72C0D" }) {
  return (
    <svg
      width="24"
      height="18"
      viewBox="0 0 24 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.35 6.04C18.67 2.59 15.64 0 12 0C10.52 0 9.15 0.43 7.99 1.17L9.45 2.63C10.21 2.23 11.08 2 12 2C15.04 2 17.5 4.46 17.5 7.5V8H19C20.66 8 22 9.34 22 11C22 12.13 21.36 13.11 20.44 13.62L21.89 15.07C23.16 14.16 24 12.68 24 11C24 8.36 21.95 6.22 19.35 6.04ZM3 1.27L5.75 4.01C2.56 4.15 0 6.77 0 10C0 13.31 2.69 16 6 16H17.73L19.73 18L21 16.73L4.27 0L3 1.27ZM7.73 6L15.73 14H6C3.79 14 2 12.21 2 10C2 7.79 3.79 6 6 6H7.73Z"
        fill={color}
      />
    </svg>
  );
}
