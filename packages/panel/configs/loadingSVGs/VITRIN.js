import React from "react";
const SVG = ({ style = {} }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 120 40"
    style={style}
  >
    <g fill="#0050FF" clipPath="url(#clip0)">
      <path d="M34.077-.16l-17.06 39.856-.198.464h-5.777L-.482 11.351h6.214l8.29 20.732L27.797-.16h6.28zM88.8-.16H83.03v5.747H88.8V-.16zM88.8 11.351H83.03v28.803H88.8V11.351zM80.14 11.347a14.405 14.405 0 0 0-14.406 14.405v14.405h5.761l-.009-14.405a8.66 8.66 0 0 1 8.65-8.655V11.35l.004-.003zM106.081 11.347a14.406 14.406 0 0 0-14.405 14.405v14.405h5.755V25.752a8.654 8.654 0 1 1 17.305 0l-.013 14.405h5.759V25.752a14.404 14.404 0 0 0-14.401-14.405zM42.682-.16h-5.768v5.747h5.768V-.16zM42.682 11.351h-5.768v28.803h5.768V11.351zM59.966 34.413a8.66 8.66 0 0 1-8.65-8.655v-8.65H62.81V11.36H51.316V-.156h-5.748V25.757a14.405 14.405 0 0 0 14.398 14.406h2.89v-5.748l-2.89-.002z" />
    </g>
    <defs>
      <clipPath id="clip0">
        <path fill="#fff" d="M0 0h120v40H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SVG;
