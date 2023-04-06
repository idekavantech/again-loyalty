import React from "react";

export default function ProfileAccepted({
  color = "#000000",
  width = "64",
  height = "64",
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 15.3333C14 8.33772 19.6711 2.66666 26.6667 2.66666C33.6623 2.66666 39.3333 8.33772 39.3333 15.3333C39.3333 22.3289 33.6623 28 26.6667 28C19.6711 28 14 22.3289 14 15.3333Z"
        fill={color}
      />
      <path
        d="M6 44.6667C6 37.671 11.6711 32 18.6667 32H34.6667C40.0992 32 44.7329 35.4199 46.5324 40.2242L45.7087 41.1443C43.8568 43.2128 42.8167 44.3561 42 45.0526C41.1833 44.3561 40.1432 43.2128 38.2913 41.1443L35.9735 38.5555C34.0088 36.361 30.637 36.1747 28.4425 38.1394C26.248 40.1042 26.0618 43.4759 28.0265 45.6704L30.5511 48.4904C32.1507 50.2778 33.7062 52.0159 35.1842 53.2582C36.5698 54.4227 38.3255 55.5377 40.549 55.8875C38.7913 56.8109 36.79 57.3333 34.6667 57.3333H18.6667C11.6711 57.3333 6 51.6623 6 44.6667Z"
        fill={color}
      />
      <path
        d="M60.1567 36.0007C60.8935 35.1778 60.8237 33.9134 60.0007 33.1766C59.1778 32.4398 57.9134 32.5097 57.1766 33.3326L48.1921 43.3677C46.3716 45.4012 45.1456 46.7634 44.0974 47.6444C43.0988 48.4837 42.5123 48.6667 42 48.6667C41.4877 48.6667 40.9012 48.4837 39.9026 47.6444C38.8544 46.7634 37.6284 45.4012 35.8079 43.3677L33.4901 40.7789C32.7533 39.956 31.4889 39.8861 30.6659 40.6229C29.843 41.3597 29.7732 42.6241 30.5099 43.447L32.9267 46.1465C34.6223 48.0405 36.0366 49.6203 37.3289 50.7065C38.696 51.8555 40.1705 52.6667 42 52.6667C43.8295 52.6667 45.304 51.8555 46.6711 50.7065C47.9634 49.6203 49.3776 48.0405 51.0732 46.1465L60.1567 36.0007Z"
        fill={color}
      />
    </svg>
  );
}
