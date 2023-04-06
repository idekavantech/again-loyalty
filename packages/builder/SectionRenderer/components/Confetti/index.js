import React from "react";
import Triangle from "./Triangle";
import Plus from "./Plus";

const itemTypes = {
  star: { component: Plus },
  triangle: {
    component: Triangle,
  },
};
export default function Confetti({ items = [] }) {
  return (
    <div className="position-absolute u-top-0 u-pointer-events-none w-100 h-100 z-index-2">
      {items.map((item, index) => {
        const IconComponent = itemTypes[item.type].component;
        return <IconComponent key={item.id} {...item.props} index={index} />;
      })}
    </div>
  );
}
