import React, { memo} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { night } from "@saas/utils/colors";
import useTheme from "@material-ui/core/styles/useTheme";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

export function CancelOrderModalVoid({
  isOpen,
  onClose,
  submit,
  loading,
}) {
  const theme = useTheme();

  return (
    <Dialog open={isOpen} onClose={onClose} PaperProps={{ className: "w-100" }}>
      <DialogContent className="p-0">
        <div className="px-4 pt-2">
          <div className="d-flex align-items-center justify-content-between">
            <div style={{ color: night, fontWeight: 500 }}>Cancellation of the order</div>
            <IconButton
              aria-label="close"
              onClick={onClose}
              style={{ marginLeft: -13 }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
      </DialogContent>
      <div className="px-4 py-2">
        Are you confident of canceling the order and return all things to the warehouse?
      </div>
      <DialogActions
        className="d-flex align-items-center justify-content-between p-4"
        style={{ borderTop: "1px solid #EDEDED" }}
      >
        <Button
          onClick={() => {
            submit();
          }}
          variant="contained"
          color="primary"
          className="u-box-shadow-none u-fontMedium"
          size="medium"
          disabled={loading}
          style={{ backgroundColor: theme.palette.error.main }}
        >
          Cancellation of the order
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          color="error"
          className="u-box-shadow-none u-fontMedium"
          size="medium"
          style={{
            borderColor: theme.palette.error.main,
            color: theme.palette.error.main,
            marginLeft: 0,
          }}
        >
          Keeping the order
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(CancelOrderModalVoid);
