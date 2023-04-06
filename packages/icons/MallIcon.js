import React from "react";

export default function MallIcon({ color = "#000000",width,height }) {
  return (
    <svg
    width={width || "32"}
    height={height || "32"}
      viewBox="0 0 32 32"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.3333 8.00016H22.6667C22.6667 4.32016 19.68 1.3335 16 1.3335C12.32 1.3335 9.33333 4.32016 9.33333 8.00016H6.66667C5.2 8.00016 4.01333 9.20016 4.01333 10.6668L4 26.6668C4 28.1335 5.2 29.3335 6.66667 29.3335H25.3333C26.8 29.3335 28 28.1335 28 26.6668V10.6668C28 9.20016 26.8 8.00016 25.3333 8.00016ZM16 4.00016C18.2133 4.00016 20 5.78683 20 8.00016H12C12 5.78683 13.7867 4.00016 16 4.00016ZM16 17.3335C12.32 17.3335 9.33333 14.3468 9.33333 10.6668H12C12 12.8802 13.7867 14.6668 16 14.6668C18.2133 14.6668 20 12.8802 20 10.6668H22.6667C22.6667 14.3468 19.68 17.3335 16 17.3335Z"
        fill={color}
      />
    </svg>
  );
}
