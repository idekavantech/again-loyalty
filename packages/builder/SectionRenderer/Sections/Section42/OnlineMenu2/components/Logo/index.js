import React from "react";

export default function Logo({ logo, isMobile, body_background_color }) {
  return (
    <div
      className={`online-menu__logo${
        isMobile ? "__mobile" : ""
      } position-absolute overflow-hidden`}
      style={{ backgroundColor: body_background_color || "#F6F6F7" }}
    >
      <img alt="" src={logo} className="online-menu__logo-img w-100 h-100 " />
    </div>
  );
}
