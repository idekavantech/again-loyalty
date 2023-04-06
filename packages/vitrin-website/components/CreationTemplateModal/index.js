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
    [theme.breakpoints.down("xs")]: {
      margin: 0,
      maxWidth: "100%",
      width: "100%",
      borderRadius: "8px 8px  0 0",
      padding: "0px 0px 16px 0",
    },
  },
}));
const CreationTemplateModal = ({
  isOpen,
  onClose,
  confirmButton,
  returnToTemplates,
}) => {
  const classes = useStyles();
  const {maxWidth768} = useResponsive()

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      scroll="paper"
      maxWidth="sm"
      TransitionComponent={Transition}
      classes={{ container: classes.root, paper: classes.paper }}
    >
      <DialogContent
        style={{
          padding: maxWidth768 ? "24px 16px 8px" : 32,
          width: maxWidth768 ? "100%" : 392,
        }}
      >
        <p className="text-center" style={{ fontSize: maxWidth768 ? 14 : 17 }}>
          آیا از ساخت سایت با این قالب مطمئن هستید؟
        </p>
        <div className="d-flex align-items-center justify-content-between mt-4 mx-md-3">
          <button
            className="flex-1"
            style={{
              height: maxWidth768 ? 38 : 48,
              borderRadius: 6,
              color: "#fff",
              backgroundColor: "#0050FF",
              padding: "0px 10px",
              fontWeight: "bold",
            }}
            onClick={confirmButton}
          >
            بله
          </button>
          <button
            className="flex-1 mr-4"
            style={{
              height: maxWidth768 ? 38 : 48,
              borderRadius: 6,
              color: "#0050FF",
              backgroundColor: "#fff",
              padding: "0px 10px",
              border: "1px solid #0050FF",
              fontWeight: "bold",
            }}
            onClick={returnToTemplates}
          >
            بازگشت به قالب ها
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreationTemplateModal;
