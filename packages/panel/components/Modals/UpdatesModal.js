import React, { memo } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Modal from "@saas/components/Modal";
import ModalHeader from "@saas/components/Modal/ModalHeader";

const UpdatesModal = ({ isOpen, onClose }) => {
  const desktopMatches = useMediaQuery("(min-width:768px)");

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
          title="آپدیت جدید"
        />
      }
      body={
        <div
          className="text-right u-fontLarge"
          style={{
            backgroundColor: "#F6F6F7",
            padding: desktopMatches ? 20 : 16,
          }}
        >
          <div className={"w-100 d-flex justify-content-between mb-3"}>
            <p>پرداخت از طریق کارت‌به‌کارت</p>
            <div className={"d-flex align-items-center"}>
              <InsertInvitationIcon
                style={{ fontSize: desktopMatches ? 17 : 14, marginLeft: 3 }}
              />
              <p>{englishNumberToPersianNumber("1401/12/15")}</p>
            </div>
          </div>
          <video autoPlay className="w-100 d-flex" controls>
            <source
              src={
                "https://hs3-cdn-saas.behtarino.com/static/panel/helpvideos/card-to-card-tutorial.mov"
              }
            />
            Your browser does not support the video tag.
          </video>
        </div>
      }
    />
  );
};

export default memo(UpdatesModal);
