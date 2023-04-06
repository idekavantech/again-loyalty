/**
 *
 * Modal
 *
 */

import React, { memo } from "react";
import MaterialModal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Backdrop from "@material-ui/core/Backdrop";
import Paper from "@material-ui/core/Paper";
import ModalCTA from "./ModalCTA";
import ModalBody from "./ModalBody";
function Modal({
  isOpen,
  onClose,
  className = "d-flex align-items-center",
  isSmall,
  isBig,
  header,
  body,
  cta,
  noExtraUI,
  noHeight,
  style = {},
}) {
  return (
    <MaterialModal
      disableEnforceFocus
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      className={className}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={isOpen}>
        <Paper
          elevation={3}
          className={`mx-auto position-relative overflow-hidden c-modal-box d-flex flex-column ${
            isSmall ? "c-modal-box-small" : ""
          } ${isBig ? "shopping" : ""}`}
          style={{ height: noExtraUI || noHeight ? "unset" : "90vh", ...style }}
        >
          {!noExtraUI && header}
          {noExtraUI && <div style={{ height: "80vh" }}>{body}</div>}
          {body && !noExtraUI ? <ModalBody>{body}</ModalBody> : null}
          {cta && !noExtraUI ? <ModalCTA>{cta}</ModalCTA> : null}
        </Paper>
      </Fade>
    </MaterialModal>
  );
}

export default memo(Modal);
