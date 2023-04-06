import React, { useState } from "react";
import { SketchPicker } from "react-color";
import TextField from "@material-ui/core/TextField";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

export default function ColorPicker({
  color,
  setColor,
  label,
  className = "w-100",
  withoutTextField,
}) {
  const [open, setOpen] = useState(false);
  if (withoutTextField) {
    return (
      <div
        style={{
          position: "absolute",
          zIndex: 10000,
          direction: "ltr",
          bottom: 0,
        }}
      >
        <SketchPicker color={color} onChange={(obj) => setColor(obj.hex)} />
      </div>
    );
  }
  return (
    <div className={`position-relative ${className}`}>
      <div
        className="w-100 position-relative"
        onClick={() => {
          setOpen(true);
        }}
      >
        <TextField
          inputProps={{ style: { color: "transparent", cursor: "pointer" } }}
          InputLabelProps={{ shrink: true }}
          readOnly
          label={label}
          variant="filled"
          fullWidth
        />
        <div
          className="w-100 px-3 u-pointer-events-none"
          style={{
            position: "absolute",
            height: 10,
            bottom: 15,
          }}
        >
          <div className="h-100 w-100" style={{ backgroundColor: color }} />
        </div>
      </div>
      {open ? (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <div
            style={{
              position: "absolute",
              zIndex: 10000,
              direction: "ltr",
              bottom: 0,
            }}
          >
            <SketchPicker color={color} onChange={(obj) => setColor(obj.hex)} />
          </div>
        </ClickAwayListener>
      ) : null}
    </div>
  );
}
