import React from "react";

export default function TickIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="40"
        height="40"
        rx="4"
        fill={process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}
      />
      <path
        d="M16.9999 24.1996L12.7999 19.9996L11.3999 21.3996L16.9999 26.9996L28.9999 14.9996L27.5999 13.5996L16.9999 24.1996Z"
        fill="white"
      />
    </svg>
  );
}
