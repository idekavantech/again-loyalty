import React from "react";

export default function Cloud({ color = "black" }) {
  return (
    <svg
      width="65"
      height="44"
      viewBox="0 0 65 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M52.1 16.7733C50.2867 7.57329 42.2067 0.666626 32.5 0.666626C24.7933 0.666626 18.1 5.03996 14.7667 11.44C6.74 12.2933 0.5 19.0933 0.5 27.3333C0.5 36.16 7.67333 43.3333 16.5 43.3333H51.1667C58.5267 43.3333 64.5 37.36 64.5 30C64.5 22.96 59.0333 17.2533 52.1 16.7733ZM37.8333 24.6666V35.3333H27.1667V24.6666H19.1667L32.5 11.3333L45.8333 24.6666H37.8333Z"
        fillOpacity="0.54"
        fill={color}
      />
    </svg>
  );
}
