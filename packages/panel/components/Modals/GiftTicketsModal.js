import React, { memo } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CloseIcon from "@material-ui/icons/Close";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";
import Image from "next/image";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import CopyToClipboard from "react-copy-to-clipboard";
import Button from "@material-ui/core/Button";
import Link from "next/link";


const GiftTicketsModal = ({ isOpen, onClose }) => {
  const desktopMatches = useMediaQuery("(min-width:768px)");

  return (
    <Dialog
      open={isOpen}
      scroll="paper"
      onClose={onClose}
      onClick={onClose}
      PaperProps={{
        style: { borderRadius: 8, margin: 0 },
      }}
    >
      <DialogTitle className="p-0">
        <div
          className="  d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#fff", padding: desktopMatches ? 16 : 16 }}
        >
          <div
            className="position-absolute"
            style={{
              right: desktopMatches ? 16 : 17,
              width: desktopMatches ? 32 : 24,
              height: desktopMatches ? 32 : 24,
            }}
          >
            <CloseIcon
              className="u-cursor-pointer"
              style={{ fontSize: desktopMatches ? 32 : 24 }}
            />
          </div>

          <span className="w-100 text-center">Gift ticket</span>
        </div>
      </DialogTitle>
      <DialogContent
        className="m-0 d-flex flex-column justify-content-center"
        style={{
          overflowY: "hidden",
          width: desktopMatches ? 459 : 331,
          borderRadius: 8,
          padding: 20,
          backgroundColor: "#F6F6F7",
          color: "#8C9196",
          fontSize: desktopMatches ? 14 : 15,
        }}
        onClick={onClose}
      >
        <div className="d-flex flex-column">
          <div
            className=" p-4"
            style={{
              borderRadius: 8,
              backgroundColor: "#fff",
              fontSize: desktopMatches ? 14 : 15,
            }}
          >
            <p className="mt-4 text-center">Webinar</p>
            <p
              className="text-center mt-2"
              style={{ fontWeight: 500, fontSize: desktopMatches ? 16 : 15 }}
            >
              How to sell more than competitors by creating a competitive advantage?
            </p>
            <div
              className="mr-4 mr-md-2 d-flex align-items-center justify-content-between"
              style={{
                fontSize: desktopMatches ? 14 : 13,
                fontWeight: 500,
                padding: 2,
                marginTop: 24,
              }}
            >
              <div className="d-flex align-items-center mt-1">
                <InsertInvitationIcon
                  style={{ fontSize: desktopMatches ? 20 : 16 }}
                />{" "}
                <span className="mr-1 mt-1">Tuesday, September 5</span>
              </div>
              <div className="d-flex align-items-center">
                <WatchLaterIcon
                  style={{ fontSize: desktopMatches ? 20 : 16 }}
                />{" "}
                <span className="mr-1 mt-1">۱۸:۳۰</span>
              </div>
            </div>
            <Link
              passHref
              href="https://www.instagram.com/vitrin.me/?upcoming_event_id=17973614296672746"
            >
              <Button
                size="large"
                variant="contained"
                color="primary"
                className="w-100 mt-5 u-border-radius-8"
              >
                Remind me a webinar start
              </Button>
            </Link>
          </div>
          <div
            className="d-flex flex-column align-items-center mt-4 p-4"
            style={{
              borderRadius: 8,
              backgroundColor: "#fff",
              fontSize: desktopMatches ? 14 : 15,
            }}
          >
            <div style={{ fontSize: 15 }}>
              <p className="text-center" style={{ fontWeight: 600 }}>
                Your code{" "}
              </p>
              <div className="mt-2">
                <Image
                  alt=""
                  width={desktopMatches ? 16 : 12}
                  height={desktopMatches ? 16 : 12}
                  src={`/images/price-1.svg`}
                />
                <span style={{ fontWeight: 400 }}>vitrinevents</span>
              </div>
            </div>

            <CopyToClipboard
              text="m4525"
              onCopy={() => _setSnackBarMessage("Copied.", "success")}
            />
            <div className="d-flex align-items-center justify-content-center">
              <span
                className="mr-1 mt-1"
                style={{ fontWeight: 600, fontSize: 15 }}
              >
                vitrin.me
              </span>
              <Image
                alt=""
                width={24}
                height={24}
                src={`/images/instagram-1.svg`}
              />
            </div>
            <p className="my-2" style={{ maxWidth: 250 }}>
              Follow the showcase to participate in the Instagram event and with features and features
              Successful showcase sites also learn more about.
            </p>
            <p className="text-center font-weight-bold direction-ltr">
              <a
                href="https://www.instagram.com/vitrin.me/"
                style={{ color: "#0050FF" }}
              >
                https://www.instagram.com/vitrin.me/
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(GiftTicketsModal);
