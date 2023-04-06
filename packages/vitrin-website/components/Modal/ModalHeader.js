/**
 *
 * Modal
 *
 */

import React, { memo } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Close from "@material-ui/icons/Close";

function ModalHeader({
  onRightClick,
  title,
  RightIcon = Close,
  elevation = 0,
  style = {},
  classNameIcon,
}) {
  return (
    <AppBar
      position="relative"
      color="text.disabled"
      elevation={elevation}
      style={{ borderRadius: 0, ...style }}
    >
      <Toolbar variant="dense" className="d-flex p-2 justify-content-between">
        <IconButton
          className={`p-0 ${classNameIcon}`}
          edge="start"
          aria-label="menu"
          onClick={onRightClick}
        >
          <RightIcon />
        </IconButton>
        <h2
          style={{
            color: "#202223",
            fontSize: 20,
            fontWeight: 500,
            right: -10,
            position: "relative",
          }}
          className="flex-1 text-center"
        >
          {title}
        </h2>
      </Toolbar>
    </AppBar>
  );
}

export default memo(ModalHeader);
