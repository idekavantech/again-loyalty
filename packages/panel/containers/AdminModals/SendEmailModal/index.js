import React, { memo, useEffect, useState } from "react";
import MaterialModal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import Input from "@saas/components/Input";
import Button from "@material-ui/core/Button";
import { dust } from "@saas/utils/colors";
import useTheme from "@material-ui/core/styles/useTheme";
import { sendLocalEmail } from "@saas/stores/global/actions";
import { connect } from "react-redux";
import { compose } from "redux";

function SendEmailModal({
  open,
  onClose,
  content = {},
  title = "",
  _sendEmail,
}) {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (!open) {
      setEmail("");
      setError("");
    }
  }, [open]);
  return (
    <MaterialModal
      disableEnforceFocus
      open={open}
      onClose={onClose}
      closeAfterTransition
      className={`d-flex align-items-center justify-content-center`}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={open}>
        <Paper
          elevation={3}
          className="d-flex flex-column overflow-hidden"
          style={{ height: 250, width: "100%", maxWidth: 600 }}
        >
          <ModalHeader onRightClick={onClose} title={title} />
          <Paper className="d-flex flex-column justify-content-center flex-1 p-5">
            <div style={{ border: `1px solid ${dust}`, borderBottom: 0 }}>
              <div
                style={{ borderBottom: `1px solid ${dust}` }}
                className="d-flex col-12 px-0 align-items-center"
              >
                <div
                  style={{
                    height: 40,
                    backgroundColor: theme.palette.background.paper,
                  }}
                  className="d-flex align-items-center u-text-ellipse px-3 col-5"
                >
                  receiver
                </div>
                <div
                  style={
                    error
                      ? {
                          height: 40,
                          border: `1px solid ${theme.palette.error.main}`,
                        }
                      : {
                          borderRight: `1px solid ${dust}`,
                          height: 40,
                        }
                  }
                  className="u-text-ellipse col-7 p-0"
                >
                  <Input
                    margin="dense"
                    tableInput
                    className="h-100 px-3 w-100 direction-ltr"
                    inputProps={{ className: "px-0" }}
                    onFocus={() => {
                      setError("");
                    }}
                    value={email}
                    onChange={setEmail}
                  />
                </div>
              </div>
            </div>
            <div className="mt-2" style={{ color: theme.palette.error.main }}>
              {error}
            </div>
          </Paper>
          <Paper
            elevation={2}
            style={{ borderRadius: 0 }}
            className="sticky-bottom p-3 d-flex flex-row-reverse"
          >
            <Button
              disabled={!email}
              onClick={() => {
                onClose();
                _sendEmail({
                  to: email,
                  html: content.body,
                  subject: content.title,
                });
              }}
              color="primary"
              variant="contained"
            >
              submit
            </Button>
          </Paper>
        </Paper>
      </Fade>
    </MaterialModal>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    _sendEmail: (data) => dispatch(sendLocalEmail(data)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect, memo)(SendEmailModal);
