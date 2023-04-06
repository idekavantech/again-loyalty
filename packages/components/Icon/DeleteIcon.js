import React from "react";
import { cement } from "@saas/utils/colors";

export default function DeleteIcon() {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <circle cx="15.2578" cy="14.083" r="12" fill={cement} />
      </g>
      <path
        d="M20.2086 10.5475L16.6731 14.083L20.2086 17.6185C20.3962 17.8061 20.5015 18.0604 20.5015 18.3256C20.5015 18.5909 20.3962 18.8452 20.2086 19.0328C20.0211 19.2203 19.7667 19.3256 19.5015 19.3256C19.2363 19.3256 18.9819 19.2203 18.7944 19.0328L15.2589 15.4972L11.7233 19.0328C11.5358 19.2203 11.2814 19.3256 11.0162 19.3256C10.751 19.3256 10.4967 19.2203 10.3091 19.0328C10.1216 18.8452 10.0162 18.5909 10.0162 18.3256C10.0162 18.0604 10.1216 17.8061 10.3091 17.6185L13.8447 14.083L10.3091 10.5475C10.1216 10.3599 10.0162 10.1056 10.0162 9.84037C10.0162 9.57515 10.1216 9.3208 10.3091 9.13326C10.4967 8.94572 10.751 8.84037 11.0162 8.84037C11.2814 8.84037 11.5358 8.94572 11.7233 9.13326L15.2589 12.6688L18.7944 9.13326C18.9819 8.94572 19.2363 8.84037 19.5015 8.84037C19.7667 8.84037 20.0211 8.94572 20.2086 9.13326C20.3962 9.3208 20.5015 9.57515 20.5015 9.84037C20.5015 10.1056 20.3962 10.3599 20.2086 10.5475Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_d"
          x="0.257812"
          y="0.0830078"
          width="30"
          height="30"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
