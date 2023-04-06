/**
 *
 * Modal
 *
 */

import React, { memo } from "react";
import Paper from "@material-ui/core/Paper";
function ModalCTA({ column, children }) {
  return (
    <Paper
      elevation={2}
      style={{ borderRadius: "0 0 8px 8px" }}
      className={`sticky-bottom d-flex ${column ? "flex-column" : ""}`}
    >
      {children}
    </Paper>
  );
}

export default memo(ModalCTA);
