import React, { memo } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";
import Image from "next/image";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import Modal from "@saas/components/Modal";
import ModalHeader from "@saas/components/Modal/ModalHeader";


const EventsModal = ({ isOpen, onClose }) => {
  const desktopMatches = useMediaQuery("(min-width:768px)");
  const is_event = localStorage.getItem("ticket");
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      style={{
        borderRadius: 8,
        margin: 0,
        maxWidth: desktopMatches ? 520 : 320,
        height: "fit-content",
      }}
      header={
        <ModalHeader
          style={{
            fontSize: 20,
            fontWeight: 500,
            lineHeight: "32px",
            color: "#202223",
          }}
          onRightClick={onClose}
          title="رویدادهای جدید"
        />
      }
      body={
        <div className="u-fontLarge p-4" style={{ backgroundColor: "#F6F6F7" }}>
          {is_event ? (
            <div
              className=" p-4"
              style={{
                borderRadius: 8,
                backgroundColor: "#fff",
                fontSize: desktopMatches ? 20 : 15,
                fontWeight: 500,
                lineHeight: "32px",
              }}
            >
              <p className="text-center">وبینار</p>
              <p className="text-center">
                راهکارهایی برای افزایش فروش رستوران و کافه
              </p>
              <div
                className=" d-flex align-items-center justify-content-between"
                style={{
                  fontSize: desktopMatches ? 14 : 13,
                  fontWeight: 500,
                  marginTop: 24,
                  color: "rgba(0, 0, 0, 0.87)",
                }}
              >
                <div className="d-flex align-items-center">
                  <InsertInvitationIcon
                    style={{
                      fontSize: desktopMatches ? 20 : 16,
                      color: "#6D7175",
                    }}
                  />{" "}
                  <span className="mr-1 ">سه شنبه ۲۹ شهریور</span>
                </div>
                <div className="d-flex align-items-center">
                  <WatchLaterIcon
                    style={{
                      fontSize: desktopMatches ? 20 : 16,
                      color: "#6D7175",
                    }}
                  />{" "}
                  <span className="mr-1">۱۸:۳۰</span>
                </div>
              </div>
              <Link
                passHref
                href="https://www.instagram.com/vitrin.me?upcoming_event_id=17996836438501783"
              >
                <Button
                  size={desktopMatches ? "large" : "medium"}
                  variant="contained"
                  color="primary"
                  className="w-100 mt-5 dashboard_buttons"
                >
                  شروع وبینار را به من یادآوری کن
                </Button>
              </Link>
            </div>
          ) : (
            <p style={{ fontSize: 16, lineHeight: "24px" }}>
              رویداد جدیدی ثبت نشده است.
            </p>
          )}

          <div
            className="d-flex flex-column align-items-center mt-4 p-4"
            style={{
              borderRadius: 8,
              backgroundColor: "#fff",
              fontSize: desktopMatches ? 16 : 14,
              lineHeight: desktopMatches ? "24px" : "20px",
            }}
          >
            <div className="d-flex align-items-center justify-content-center">
              <span
                className="mr-1 mt-1"
                style={{ fontWeight: 600, fontSize: 15 }}
              >
                vitrin.me
              </span>
              <Image
                width={24}
                height={24}
                src={`/images/instagram-1.svg`}
              />
            </div>
            <p className="my-2">
              برای شرکت در رویداد اینستاگرام ویترین را دنبال کنید و با امکانات و
              سایت های موفق ویترین نیز بیشتر آشنا شوید.
            </p>
            <p
              className="text-center font-weight-bold direction-ltr"
              style={{ fontweight: 14, lineHeight: "22px" }}
            >
              <a
                href="https://www.instagram.com/vitrin.me/"
                style={{ color: "#0050FF" }}
              >
                https://www.instagram.com/vitrin.me/
              </a>
            </p>
          </div>
        </div>
      }
    />
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

export default compose(withConnect, memo)(EventsModal);
