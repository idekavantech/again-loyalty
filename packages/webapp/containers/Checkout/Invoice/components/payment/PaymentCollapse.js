import React, { memo, useEffect } from "react";

import { CARD_PAYMENT } from "@saas/stores/plugins/constants";
import LazyImage from "@saas/components/LazyImage";
import { coal, pollution } from "@saas/utils/colors";
import { paymentMethods } from "containers/Checkout/Invoice/constants";

import { Collapse } from "react-collapse";
import Divider from "@material-ui/core/Divider";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import CardPaymentSection from "./CardPaymentSection";

function PaymentCollapse({
  setPaymentDropDownOpen,
  isPaymentDropDownOpen,
  selectedPaymentMethod,
  setPaymentMethod,
  cardInfo,
  paymentTypes,
  _uploadFile,
  _removeFile,
  receiptImage,
  setReceiptImage,
  receiptImageError,
  setReceiptImageError,
  payableAmount,
}) {
  useEffect(() => {
    if (receiptImageError && !isPaymentDropDownOpen)
      setPaymentDropDownOpen(true);
  }, [receiptImageError]);

  useEffect(() => {
    if (selectedPaymentMethod.name === CARD_PAYMENT && !isPaymentDropDownOpen)
      setPaymentDropDownOpen(true);
  }, [receiptImageError]);

  return (
    <Collapse isOpened={isPaymentDropDownOpen}>
      {paymentTypes.map((paymentType) => {
        const value = paymentMethods[paymentType];
        if (!value) return null;
        return (
          <>
            <Divider />
            <div
              className="px-4 py-3 d-flex align-items-center justify-content-between u-cursor-pointer checkout-collapse"
              onClick={() => {
                setPaymentMethod(value);
                if (value.name !== CARD_PAYMENT)
                  setPaymentDropDownOpen(!isPaymentDropDownOpen);
              }}
            >
              <div className="d-flex align-items-center">
                <LazyImage
                  src={value.Icon}
                  width={24}
                  height={24}
                  className="ml-2"
                />
                <div>
                  <div
                    className="u-fontMedium u-fontWeightBold"
                    style={{ color: coal }}
                  >
                    {value.title}
                  </div>
                  <div
                    className="u-font-semi-small"
                    style={{ color: pollution }}
                  >
                    {value.description}
                  </div>
                </div>
              </div>
              {selectedPaymentMethod.name === paymentType && (
                <CheckRoundedIcon color="secondary" />
              )}
            </div>
            {value.name === CARD_PAYMENT &&
            selectedPaymentMethod.name === CARD_PAYMENT ? (
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
          </>
        );
      })}
    </Collapse>
  );
}

export default memo(PaymentCollapse);
