import React from "react";

export default function ClockIcon({ color = "#fff" }) {
  return (
    <svg
      width="13"
      height="14"
      viewBox="0 0 10 11"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className="ml-1"
    >
      <path
        d="M3.5 0V1H6.5V0H3.5ZM8.47949 0.896484L7.83301 1.65918L9.30762 2.90918L9.9541 2.14648L8.47949 0.896484ZM5 1.5C2.519 1.5 0.5 3.519 0.5 6C0.5 8.481 2.519 10.5 5 10.5C7.481 10.5 9.5 8.481 9.5 6C9.5 3.519 7.481 1.5 5 1.5ZM4.5 3H5.5V6.5H4.5V3Z"
        fill={color}
      />
    </svg>
  );
}
