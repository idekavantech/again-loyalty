import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { graphite, night } from "@saas/utils/colors";
import useTheme from "@material-ui/core/styles/useTheme";
function DeleteCourierModal({ isOpen, onClose, submit, loading }) {
  const theme = useTheme();
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent style={{ width: 560 }} className="mb-2">
        <div style={{ color: night, fontWeight: 500 }}>Remove the courier</div>
        <div className="mt-4" style={{ color: graphite }}>
          Are you sure you want to delete this courier?{" "}
        </div>
      </DialogContent>
      <DialogActions
        className="d-flex align-items-center justify-content-between p-4"
        style={{ borderTop: "1px solid #EDEDED" }}
      >
        <Button
          onClick={() => {
            submit();
            onClose();
          }}
          variant="contained"
          className="u-box-shadow-none u-fontMedium"
          size="medium"
          disabled={loading}
          style={{
            height: 48,
            backgroundColor: theme.palette.error.main,
            color: "white",
          }}
        >
          Remove the courier
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
          className="u-box-shadow-none u-fontMedium"
          size="medium"
          style={{
            height: 48,
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(DeleteCourierModal);
