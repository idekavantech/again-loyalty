import React, { memo } from "react";
import Drawer from "@material-ui/core/Drawer";

function CustomDrawer({
  children,
  isOpen,
  anchor = "left",
  customClassName,
  onClose,
  style = {},
  variant = "temporary",
}) {
  return (
    <Drawer
      anchor={anchor}
      transitionDuration={300}
      open={isOpen}
      onClose={onClose}
      variant={variant}
      elevation={0}
      PaperProps={{ style: { borderRadius: 0 } }}
    >
      <div className={`drawer--content ${customClassName}`} style={style}>
        {children}
      </div>
    </Drawer>
  );
}

export default memo(CustomDrawer);
