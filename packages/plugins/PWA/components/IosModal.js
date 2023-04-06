import React, { memo } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import Modal from "@saas/components/Modal";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import { IOS_ADD } from "@saas/icons";
import Icon from "@saas/components/Icon";
function IosDownloadModal({ onClose, isOpen }) {
  const theme = useTheme();
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={<ModalHeader elevation={0} onRightClick={onClose} title="" />}
      body={
        <div className="p-3 mt-2">
          <div className="text-right">
            <div className="my-2 u-fontWeightBold u-fontMedium">
              راهنمای نصب برای ios
            </div>
            <div className="my-3">
              برای نصب وی اپلیکیشن در سیستم عامل ios، باید آدرس این سایت را در
              مرورگر سافاری باز کرده و مطابق مراحل زیر عمل کنید.
            </div>
            <div className="my-2">
              ۱. دکمه
              <Icon icon={IOS_ADD} color={theme.palette.text.primary} /> را در
              نوار پایین انتخاب کنید.
            </div>
            <div className="my-2">
              ۲.گزینه Home screen to Add را انتخاب کنید.
            </div>
            <div className="my-2">
              ۳.در قسمت بالا بر روی گزینه Add کلیک کنید.
            </div>
          </div>
        </div>
      }
    />
  );
}

export default memo(IosDownloadModal);
