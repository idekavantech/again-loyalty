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
import useTheme from "@material-ui/core/styles/useTheme";

function ModalHeader({
  onRightClick,
  title,
  RightIcon = Close,
  elevation = 0,
  style = {},
  classNameIcon,
}) {
  const theme = useTheme();
  return (
    <AppBar
      position="relative"
      color="text.disabled"
      elevation={elevation}
      style={{ borderRadius: 0, ...style }}
    >
      <Toolbar variant="dense" className="d-flex px-2 justify-content-between">
        <IconButton
          className={`p-0 ${classNameIcon}`}
          edge="start"
          aria-label="menu"
          onClick={onRightClick}
        >
          <RightIcon />
        </IconButton>
        <div style={{ color: "#202223" }} className="flex-1 text-center">
          {title}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default memo(ModalHeader);
