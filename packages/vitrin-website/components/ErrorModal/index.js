import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@mui/material/Slide";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Image from "next/image";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      alignItems: "flex-end",
      // push the dialog to bottom
    },
  },
  paper: {
    width: 500,
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

const ErrorModal = ({ isOpen, onClose }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      scroll="paper"
      maxWidth="lg"
      TransitionComponent={Transition}
      className="w-100"
      classes={{ container: classes.root, paper: classes.paper }}
    >
      <DialogContent className="w-100 d-flex flex-column align-items-center pt-5 pb-md-5">
        <Image
          alt=""
          width={200}
          height={160}
          src="/images/undraw_warning_re_eoyh 1.svg"
        />
        <p className="text-center" style={{ marginTop: 32 }}>
          شما به تازگی با این شماره سایت ساخته‌اید.
        </p>
        <div className="w-100 d-flex justify-content-center mt-4">
          <Link passHref href="/profile">
            <Button
              color="primary"
              size="medium"
              variant="contained"
              className="  u-border-radius-8"
            >
              وارد پنل مدیریت شوید
            </Button>
          </Link>

          <Button
            color="primary"
            size="medium"
            variant="outlined"
            className="mr-3  u-border-radius-8"
            onClick={onClose}
          >
            بازگشت
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

ErrorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorModal;
