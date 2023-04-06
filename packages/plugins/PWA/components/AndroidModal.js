import React, { memo } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Modal from "@saas/components/Modal";
import ModalHeader from "@saas/components/Modal/ModalHeader";
function AndroidDownloadModal({ onClose, isOpen }) {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      body={
        <div className="flex-1 d-flex flex-column u-border-radius-4">
          <ModalHeader elevation={0} onRightClick={onClose} title="" />
          <div className="container c-modal-body mt-2">
            <div className="text-right">
              <div className="my-2 u-fontWeightBold u-fontMedium">
                راهنمای نصب برای اندروید
              </div>
              <div className="my-3">
                در صورتی که پیامی مبنی بر نصب به شما نشان داده نشد از بخش
                <MoreVertIcon
                  className="position-relative"
                  style={{ top: 5 }}
                  color="text.primary"
                />
                بالای صفحه، Add to homescreen یا همان افزودن به صفحه اصلی را
                انتخاب کرده و بر روی دکمه add یا افزودن کلیک کنید.
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

export default memo(AndroidDownloadModal);
