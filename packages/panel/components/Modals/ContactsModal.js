import React, { useState, memo, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import { Collapse } from "react-collapse";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { ONLINE_SUPPORT_PLUGIN } from "@saas/utils/constants/plugins";
import {
  makeSelectCallRequest,
  makeSelectReportCallRequest,
} from "store/selectors";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { getCallRequests, getReportsCallRequests } from "store/actions";
import Modal from "@saas/components/Modal";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import LazyImage from "@saas/components/LazyImage";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import Link from "next/link";


const ContactsModal = ({
  isOpen,
  onClose,
  pluginData,
  callRequests,
  reportCallRequests,
  _getCallRequests,
  _getReportCallRequests,
  urlPrefix,
}) => {
  const desktopMatches = useMediaQuery("(min-width:768px)");
  const [collapses, setCollapses] = useState({});

  useEffect(() => {
    _getCallRequests();
    _getReportCallRequests();
  }, [isOpen]);

  const numberOfCalls = useMemo(() => {
    return reportCallRequests?.reduce(
      (sum, request) => sum + request?.count,
      0
    );
  }, [reportCallRequests]);

  if (!numberOfCalls) {
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
            onRightClick={onClose}
            style={{
              fontSize: 20,
              fontWeight: 500,
              lineHeight: "32px",
              color: "#202223",
              padding: "0 8px 0px 0",
            }}
            title="گزارش کلیک بر دکمه شناور تماس"
          />
        }
        body={
          <div
            className="p-4 text-right u-fontLarge"
            style={{ backgroundColor: "#F6F6F7" }}
          >
            <p>کلیک جدید (۰)</p>
            <p className="mt-3">
              کلیک جدیدی بر روی{" "}
              <Link href={`${urlPrefix}/fab/settings`}>
                <span style={{ color: "#0050FF", cursor: "pointer" }}>
                  {" "}
                  دکمه شناور تماس
                </span>
              </Link>{" "}
              شما ثبت نشده است.
            </p>
            <div className="w-100 d-flex justify-content-center mt-5 pt-2">
              <LazyImage width={200} src={`/images/no_call.svg`} />
            </div>
          </div>
        }
      />
    );
  }

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
          onRightClick={onClose}
          style={{
            fontSize: 20,
            fontWeight: 500,
            lineHeight: "32px",
            color: "#202223",
            padding: "0 8px 0px 0",
          }}
          title="گزارش کلیک بر دکمه شناور تماس"
        />
      }
      body={
        <div
          className=" text-right u-fontLarge"
          style={{
            backgroundColor: "#F6F6F7",
            padding: desktopMatches ? 20 : 16,
          }}
        >
          <p>کلیک جدید ({englishNumberToPersianNumber(numberOfCalls || 0)})</p>
          <p className="mt-3">
            {englishNumberToPersianNumber(numberOfCalls || 0)} کلیک بر روی دکمه
            شناور تماس شما ثبت شده است.
          </p>

          {pluginData?.data?.contact_channels?.map((channel) => {
            let clickedChannel = reportCallRequests?.find(
              (callRequest) => callRequest.type == channel.name
            );

            let contactDetails = callRequests?.filter(
              (callRequest) => callRequest.type == channel.name
            );
            return (
              <div
                key={channel.name}
                className="p-2 mt-3 "
                style={{
                  borderRadius: 8,
                  backgroundColor: "#fff",
                  fontSize: desktopMatches ? 14 : 15,
                }}
              >
                <div
                  className="d-flex justify-content-between align-items-center cursor-pointer"
                  style={{ color: clickedChannel ? "#0050FF" : "#CCCCCC" }}
                  onClick={() =>
                    setCollapses({
                      ...collapses,
                      [channel.name]: !collapses[channel.name],
                    })
                  }
                >
                  <img width={24} height={24} src={channel.icon} />
                  <span className="mr-5">
                    {englishNumberToPersianNumber(clickedChannel?.count || 0)}{" "}
                    کلیک
                  </span>
                  <div className="d-flex align-items-center">
                    <span>جزئیات</span>

                    <KeyboardArrowDownRoundedIcon
                      className="mr-1"
                      style={{ fontSize: 16 }}
                    />
                  </div>
                </div>

                {contactDetails?.length ? (
                  <Collapse isOpened={collapses[channel.name]}>
                    <div
                      className="mt-1 pt-2"
                      style={{ borderTop: "0.5px solid #CCCCCC", fontSize: 11 }}
                    >
                      {contactDetails?.map((request) => {
                        let requestDate = new Date(request?._created_at);
                        return (
                          <div
                            className="d-flex mt-1 justify-content-between align-items-center "
                            key={request?.type}
                          >
                            <div
                              style={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                border: "1px solid #8C9196",
                              }}
                            ></div>
                            <div className="d-flex align-items-center ">
                              <InsertInvitationIcon style={{ fontSize: 12 }} />
                              <span className="mr-1">
                                {requestDate.toLocaleDateString("fa-IR", {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                })}
                              </span>
                            </div>
                            <div className="d-flex align-items-center ">
                              <WatchLaterIcon style={{ fontSize: 12 }} />
                              <span className="mr-1">
                                {requestDate.toLocaleTimeString("fa-IR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Collapse>
                ) : null}
              </div>
            );
          })}
        </div>
      }
    />
  );
};

const mapStateToProps = createStructuredSelector({
  callRequests: makeSelectCallRequest(),
  reportCallRequests: makeSelectReportCallRequest(),
  pluginData: makeSelectPlugin(ONLINE_SUPPORT_PLUGIN),
  urlPrefix: makeSelectAdminUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getCallRequests: () => dispatch(getCallRequests()),
    _getReportCallRequests: () => dispatch(getReportsCallRequests()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(ContactsModal);
