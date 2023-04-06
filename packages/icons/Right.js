import React from "react";

export default function Right({
  color = process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
}) {
  return (
    <svg
      width="6"
      height="8"
      viewBox="0 0 6 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.2735 0.94L4.3335 0L0.333496 4L4.3335 8L5.2735 7.06L2.22016 4L5.2735 0.94Z"
        fill={color}
      />
    </svg>
  );
}
