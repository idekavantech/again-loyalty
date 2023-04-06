import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@mui/material/Slide";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { makeStyles } from "@material-ui/core/styles";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      alignItems: "flex-end", // push the dialog to bottom
    },
  },
  paper: {
    // make the content full width
    [theme.breakpoints.down("xs")]: {
      margin: 0,
      maxWidth: "100%",
      width: "100%",
      borderRadius: "8px 8px  0 0",
      padding: "0px 0px 16px 0",
    },
  },
}));
const SignUpModal = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const {maxWidth768} = useResponsive()

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      scroll="paper"
      TransitionComponent={Transition}
      classes={{ container: classes.root, paper: classes.paper }}
    >
      <DialogContent
        style={{
          padding: maxWidth768 ? "24px 16px 8px" : 32,
          width: maxWidth768 ? "100%" : 392,
        }}
        onClick={onClose}
      >
        <p
          className="text-center"
          style={{ fontSize: maxWidth768 ? 14 : 17, color: "#000000" }}
        >
          تنها دو مرحله تا راه‌اندازی خودکار سایت خود فاصله دارید.
        </p>
        <div className="d-flex align-items-center justify-content-center">
          <button
            style={{
              height: 32,
              borderRadius: 6,
              color: "#0050FF",
              backgroundColor: "#fff",
              padding: "0px 10px",
              minWidth: 136,
              fontWeight: "bold",
              fontSize: maxWidth768 ? 14 : 16,
              fontWeight: 700,
              marginTop: maxWidth768 ? 12 : 24,
            }}
            onClick={onClose}
          >
            متوجه شدم!
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
