import React, { useEffect, useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import Input from "@saas/components/Input";
import Button from "@material-ui/core/Button";
import MaterialModal from "@material-ui/core/Modal";

export default function ItemNoteModal({
  defaultNote,
  modal,
  setModal,
  onChange,
  disabled,
}) {
  const [note, setNote] = useState("");
  useEffect(() => {
    setNote(defaultNote);
  }, [modal]);
  return (
    <MaterialModal
      disableEnforceFocus
      open={modal !== null}
      onClose={() => setModal(null)}
      closeAfterTransition
      className={`d-flex align-items-center justify-content-center`}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={modal !== null}>
        <Paper
          elevation={3}
          className="d-flex flex-column overflow-hidden"
          style={{ height: 350, width: "100%", maxWidth: 600 }}
        >
          <ModalHeader
            onRightClick={() => setModal(null)}
            title={disabled ? "Note" : "Add note"}
          />
          <Paper className="flex-1 p-5">
            <div className="u-fontWeightBold">{modal?.title}</div>
            <Input
              disabled={disabled}
              margin="dense"
              multiline
              inputProps={{ style: { minHeight: 100 } }}
              className="h-100 mt-4 w-100"
              value={note}
              onChange={setNote}
            />
          </Paper>
          <Paper
            elevation={2}
            style={{ borderRadius: 0 }}
            className="sticky-bottom p-3 d-flex flex-row-reverse"
          >
            <Button
              onClick={() => {
                if (!disabled) onChange(modal.id, note);
                setModal(null);
              }}
              color="primary"
              variant="contained"
            >
              {disabled ? "to close" : "Store"}
            </Button>
          </Paper>
        </Paper>
      </Fade>
    </MaterialModal>
  );
}
