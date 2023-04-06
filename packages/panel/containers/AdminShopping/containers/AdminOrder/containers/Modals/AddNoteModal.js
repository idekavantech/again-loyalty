import React, { memo, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Input from "@saas/components/Input";
import { night } from "@saas/utils/colors";

export function AddNoteModal({  isOpen, onClose, submit, isLoading }) {
  const [description, setDescription] = useState("");
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="w-100"
      PaperProps={{ className: "w-100" }}
    >
      <DialogContent className="p-4 w-100">
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ fontWeight: "bold", fontSize: 16, color: night }}>
            Note
          </div>
        </div>
        <div className="mt-3">
          <Input
            placeholder="Note"
            value={description}
            onChange={(value) => setDescription(value)}
            size="medium"
            className="w-100"
          />
        </div>
      </DialogContent>
      <DialogActions
        className="d-flex align-items-center justify-content-between p-4"
        style={{ borderTop: "1px solid #EDEDED" }}
      >
        <Button
          onClick={() => {
            submit(description);
            onClose();
          }}
          variant="contained"
          color="primary"
          className="u-box-shadow-none u-fontMedium"
          size="large"
          disabled={isLoading}
        >
          Confirm
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          color="primary"
          className="mr-2 ml-0 u-box-shadow-none u-fontMedium"
          size="large"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(AddNoteModal);
