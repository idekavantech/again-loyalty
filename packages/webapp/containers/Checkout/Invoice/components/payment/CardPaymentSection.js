import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import TomanIcon from "@saas/icons/TomanIcon";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import ReceiptUploader from "../ReceiptUploader";
import { useState } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import CopyToClipboard from "react-copy-to-clipboard";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const CardPaymentSection = ({
  payableAmount,
  uploadFile,
  removeFile,
  cardInfo,
  receiptImage,
  setReceiptImageError,
  setReceiptImage,
  receiptImageError,
}) => {
  const { minWidth768: isDesktop } = useResponsive();

  return (
    <div className={`px-${isDesktop ? "5" : "0"} py-3`}>
      <div className={"d-flex justify-content-between flex-wrap"}>
        <div className={`col-12 col-lg-6 d-flex flex-col`}>
          <p>مبلغ کل فاکتور</p>
          <div
            className={
              "d-flex w-100 justify-content-between p-2 mt-1 u-border-radius-4"
            }
            style={{ backgroundColor: "#F5F5F5" }}
          >
            <CopyBtn text={payableAmount} />
            <p className={"d-flex align-items-center"}>
              {priceFormatter(payableAmount)}
              <TomanIcon className="mr-1" color="#2f2b2b" />
            </p>
          </div>
        </div>
        <div
          className={`col-12 col-lg-6 d-flex flex-col ${
            isDesktop ? "" : "mt-3"
          }`}
        >
          <p>اطلاعات کارت</p>
          <div
            className={
              "d-flex w-100 justify-content-between p-2 mt-1 u-border-radius-4"
            }
            style={{ backgroundColor: "#F5F5F5" }}
          >
            <CopyBtn text={cardInfo?.card_number} />
            <p>
              {englishNumberToPersianNumber(
                cardInfo?.card_number
                  ?.replace(/\W/gi, "")
                  .replace(/(.{4})/g, "$1-")
                  .slice(0, -1)
              )}
            </p>
          </div>
          <p
            className={"w-100 text-left u-font-semi-small pl-2"}
            style={{ color: "rgba(0, 0, 0, 0.6)" }}
          >
            {cardInfo?.owner_name ? `به نام ${cardInfo?.owner_name}` : ""}
          </p>
        </div>
      </div>
      <div className={"col-12 mt-3"}>
        <p className={"d-flex"}>
          تصویر رسید<span style={{ color: "red" }}>*</span>
        </p>
        <ReceiptUploader
          removeFile={removeFile}
          uploadFile={uploadFile}
          img={receiptImage.img}
          setImage={(data) => {
            setReceiptImageError(null);
            setReceiptImage(data);
          }}
          errorMessage={receiptImageError}
        />
      </div>
    </div>
  );
};

const CopyBtn = ({ text }) => {
  const [isCoppied, setIsCoppied] = useState(false);
  const theme = useTheme();
  return (
    <CopyToClipboard
      text={text}
      onCopy={() => {
        setIsCoppied(true);
        setTimeout(() => {
          setIsCoppied(false);
        }, 5000);
      }}
    >
      <div className={"d-flex align-items-center u-cursor-pointer u-height-24"}>
        {isCoppied ? (
          <p style={{ color: theme.palette.secondary.main }}>کپی شد!</p>
        ) : (
          <>
            <FileCopyOutlinedIcon
              className={"ml-2"}
              style={{ color: theme.palette.secondary.main }}
            />
            <p style={{ color: theme.palette.secondary.main }}>کپی کردن</p>
          </>
        )}
      </div>
    </CopyToClipboard>
  );
};
export default CardPaymentSection;
