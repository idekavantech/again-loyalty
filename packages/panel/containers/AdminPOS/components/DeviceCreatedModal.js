import React from "react";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import Modal from "@saas/components/Modal";
import { CDN_BASE_URL } from "@saas/utils/api";
import Button from "@material-ui/core/Button";
import { dust } from "@saas/utils/colors";
import LockOpenRoundedIcon from "@material-ui/icons/LockOpenRounded";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useTheme from "@material-ui/core/styles/useTheme";


export default function DeviceCreatedModal({
  isOpen,
  onClose,
  device,
  _setSnackBarMessage,
  branches,
}) {
  const theme = useTheme();
  const { licence_code: licenceCode = "" } = device;
  const branch =
    device && branches && branches.length
      ? branches.find((branch) => branch.id === device.business)
        ? branches.find((branch) => branch.id === device.business).title
        : ""
      : "";
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isBig
      header={
        <ModalHeader
          onRightClick={onClose}
          title={
            branch
              ? `لیسانس نرم‌افزاری جدید برای ${branch}`
              : "لیسانس نرم‌افزاری جدید"
          }
        />
      }
      body={
        <div className="p-5">
          <div
            className="d-flex flex-column flex-1"
            style={{ border: `1px solid ${dust}` }}
          >
            <div
              className="d-flex flex-wrap p-4"
              style={{ borderBottom: `1px solid ${dust}` }}
            >
              <img
                alt=""
                className="col-12 col-lg-6"
                src={`${CDN_BASE_URL}device-code.png`}
              />
              <div className="col-12 col-lg-6 mt-4 mt-lg-0 d-flex flex-column justify-content-end">
                <div className="u-fontExteraLarge u-fontWeightBold">
                  دستگاه ساخته شد.
                </div>
                <div
                  color="text.disabled"
                  style={{ color: theme.palette.text.disabled }}
                  className="u-fontExteraLarge u-fontWeightBold"
                >
                  با کد دستگاه وارد شوید.
                </div>
              </div>
            </div>
            <div className="py-3 flex-wrap d-flex">
              <div className="col-12 col-lg-6 d-flex flex-column">
                <div className="d-flex">
                  <img
                    style={{ border: `1px solid ${dust}` }}
                    width={50}
                    className="u-border-radius-8"
                    src={`/images/${process.env.NEXT_PUBLIC_APP_NAME}-LOGO.svg`}
                    alt="درآمد"
                  />
                  <div className="mr-2 py-1">
                    <div className="u-fontWeightBold">
                      ۱. نرم افزار دسکتاپ را نصب کنید
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginRight: 25,
                    height: 32,
                    borderRight: `1px solid ${dust}`,
                  }}
                />
                <div className="d-flex">
                  <div
                    className="d-flex justify-content-center align-items-center u-border-radius-8"
                    style={{
                      border: `1px solid ${dust}`,
                      width: 50,
                      height: 50,
                    }}
                  >
                    <LockOpenRoundedIcon fontSize="large" />
                  </div>
                  <div className="mr-2 py-1">
                    <div className="u-fontWeightBold">۲. وارد شوید</div>
                    <div>
                      از این کد برای وارد شدن به نرم افزار استفاده کنید.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 mt-4 mt-lg-0 d-flex flex-column justify-content-end">
                <div
                  style={{ backgroundColor: "#f2f2f2" }}
                  className="u-fontExteraLarge u-fontWeightBold d-flex flex-wrap align-items-center justify-content-center p-3 u-border-radius-4"
                >
                  <div className="flex-1">{licenceCode.toUpperCase()}</div>
                  <CopyToClipboard
                    text={licenceCode.toUpperCase()}
                    onCopy={() => _setSnackBarMessage("کپی شد.", "default")}
                  >
                    <Button color="primary">کپی کردن</Button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
