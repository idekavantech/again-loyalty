import React from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import AddIcon from "@saas/icons/addIcon";

export default function FullWidthButton({ color, title, action }) {
  const theme = useTheme();
  const _color = color ? color : theme.palette.primary.main;
  return (
    <button
      className="w-100 cursor-pointer d-flex justify-content-center align-items-center"
      style={{
        margin: "24px 0 0",
        height: 40,
        border: `1px dashed ${_color}`,
        borderRadius: 4,
        color: _color,
      }}
      onClick={action}
    >
      <AddIcon color={_color} />
      <span className="mr-1" style={{ fontWeight: 400 }}>
        {title}
      </span>
    </button>
  );
}
