import React, { memo } from "react";

import LazyImage from "@saas/components/LazyImage";
import { coal, pollution } from "@saas/utils/colors";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import useTheme from "@material-ui/core/styles/useTheme";
import { CARD_PAYMENT } from "@saas/stores/plugins/constants";
import CardPaymentSection from "./CardPaymentSection";

function Payment({
  paymentTypes,
  setPaymentDropDownOpen,
  isPaymentDropDownOpen,
  setPaymentMethodsDrawerOpen,
  isPaymentMethodsDrawerOpen,
  selectedPaymentMethod,
  _uploadFile,
  _removeFile,
  receiptImage,
  setReceiptImage,
  receiptImageError,
  setReceiptImageError,
  payableAmount,
  cardInfo,
}) {
  const theme = useTheme();
  const { minWidth768 } = useResponsive();
  return (
    <div>
      <div
        className={`px-4 py-3 d-flex align-items-center justify-content-between u-cursor-pointer ${
          paymentTypes.length > 1 ? "" : ""
        }`}
        onClick={
          paymentTypes.length > 1
            ? minWidth768
              ? () => setPaymentDropDownOpen(!isPaymentDropDownOpen)
              : () => setPaymentMethodsDrawerOpen(!isPaymentMethodsDrawerOpen)
            : null
        }
      >
        <div className="d-flex align-items-center">
          <LazyImage
            src={selectedPaymentMethod.Icon}
            width={24}
            height={24}
            className="ml-2"
          />
          <div>
            <div
              className="u-fontMedium u-fontWeightBold mb-1"
              style={{ color: coal }}
            >
              {selectedPaymentMethod.title}
            </div>
            <div className="u-font-semi-small" style={{ color: pollution }}>
              {selectedPaymentMethod.description}
            </div>
          </div>
        </div>
        {paymentTypes.length > 1 && (
          <div className="d-flex align-items-center">
            <div
              className="u-fontMedium ml-1"
              style={{ color: theme.palette.secondary.main }}
            >
              تغییر
            </div>
            {minWidth768 ? (
              isPaymentDropDownOpen ? (
                <ExpandLessRoundedIcon color="secondary" />
              ) : (
                <ExpandMoreRoundedIcon color="secondary" />
              )
            ) : (
              <ChevronLeftRoundedIcon color="secondary" />
            )}
          </div>
        )}
      </div>
      {selectedPaymentMethod.name === CARD_PAYMENT && !minWidth768 ? (
        <CardPaymentSection
          receiptImageError={receiptImageError}
          removeFile={_removeFile}
          uploadFile={_uploadFile}
          setReceiptImageError={setReceiptImageError}
          payableAmount={payableAmount}
          receiptImage={receiptImage}
          cardInfo={cardInfo}
          setReceiptImage={setReceiptImage}
        />
      ) : null}
    </div>
  );
}

export default memo(Payment);
