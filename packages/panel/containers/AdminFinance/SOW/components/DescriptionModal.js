import React, { memo } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Input from "@saas/components/Input";
import NoteRoundedIcon from "@material-ui/icons/NoteRounded";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { night } from "@saas/utils/colors";
function DescriptionModal({ isOpen, onClose, description }) {
  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ className: "w-100" }}>
      <DialogContent>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <NoteRoundedIcon
              style={{ color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR }}
              className="ml-2"
              fontSize="small"
            />
            <div
              style={{ lineHeight: "initial" }}
              className="u-fontWeightBold u-fontLarge"
            >
              Description
            </div>
          </div>
          <IconButton
            className="p-0"
            onClick={onClose}
            style={{ color: night }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </div>
        <div className="mt-5">Description</div>
        <Input
          className="mt-2 pb-2 bg-white"
          color="primary"
          value={description}
          placeholder="Text of Description"
          multiline
          disabled
        />
      </DialogContent>
    </Dialog>
  );
}

export default memo(DescriptionModal);
