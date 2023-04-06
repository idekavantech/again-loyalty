import React from "react";

export default function Triangle({
  primaryColor,
  secondaryColor,
  left = "unset",
  right = "unset",
  top = "unset",
  bottom = "unset",
  index = 0,
  size = 24,
  className = "",
}) {
  return (
    <svg
      style={{ left, right, top, bottom }}
      width={size}
      height={size}
      className={`position-absolute ${className}`}
      version="1.1"
      id="Layer_1"
      x="0px"
      y="0px"
      viewBox="0 0 24 24"
    >
      <g>
        <linearGradient
          id={`SVGID${index}`}
          gradientUnits="userSpaceOnUse"
          x1="8.5712"
          y1="17.7434"
          x2="11.5188"
          y2="5.3121"
        >
          <stop offset="0" style={{ stopColor: primaryColor || "#8C91EC" }} />
          <stop offset="1" style={{ stopColor: secondaryColor || "#00DFC6" }} />
        </linearGradient>
        <path
          fill={`url(#SVGID${index})`}
          className="st0"
          d="M0,1.56l9.24,20.88L24,5.01L0,1.56z M4.4,4.9l14.42,2.07L9.97,17.45L4.4,4.9z"
        />
      </g>
    </svg>
  );
}
