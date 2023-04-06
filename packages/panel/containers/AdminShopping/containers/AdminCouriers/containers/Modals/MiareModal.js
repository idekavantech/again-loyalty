import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { night, text } from "@saas/utils/colors";
import useTheme from "@material-ui/core/styles/useTheme";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";
import CloseIcon from "@material-ui/icons/Close";

function MiareModal({ isOpen, onClose }) {
  const theme = useTheme();
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="mb-2 position-relative">
        <div
          className="d-flex align-items-center"
          style={{ color: night, fontWeight: 500 }}
        >
          <HelpRoundedIcon style={{ color: theme.palette.primary.main }} />
          <span className="mr-2 " style={{ fontSize: 16, fontWeight: "bold" }}>
            {" "}
            The explanation of receiving token
          </span>
        </div>
        <div className="mt-5" style={{ color: "#202223", lineHeight: "24px" }}>
          {`To use the service"Come", Is required to first get a token
          do. To get token, you can support the number`}
          <a
            style={{
              color: theme.palette.primary.main,
              display: "inline-block",
            }}
            href="tel:+982191009282"
            className="mx-1"
          >
            ۰۲۱-۹۱۰۰۹۲۸۲
          </a>
          {` Call and make your request and get your token. So
          Of receiving token, it is in the part"The service comes" Copy.`}
        </div>
        <button
          onClick={onClose}
          style={{
            borderRadius: 8,
            position: "absolute",
            top: 24,
            left: 24,
            width: 24,
            height: 24,
          }}
        >
          <CloseIcon style={{ color: "#5C5F62", fontSize: 20 }} />
        </button>
      </DialogContent>
      <DialogActions className="d-flex align-items-center justify-content-end p-4">
        <Button
          onClick={onClose}
          variant="outlined"
          color="disabled"
          className="u-box-shadow-none u-fontMedium"
          size="medium"
          style={{
            color: text.disabled,
            maxWidth: 32.5,
            minWidth: 32.5,
            padding: "5.5px 20px",
          }}
        >
          Cancellation
        </Button>
        <Button
          variant="contained"
          color="primary"
          className="mr-3"
          style={{ fontWeight: 400 }}
          onClick={() => (window.location.href = "tel:+982191009282")}
        >
          Call with support
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(MiareModal);
