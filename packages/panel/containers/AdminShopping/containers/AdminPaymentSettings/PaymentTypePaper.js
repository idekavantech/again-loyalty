/**
 *
 * Settings
 *
 */

import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { night, pollution, smoke } from "@saas/utils/colors";
import Checkbox from "@material-ui/core/Checkbox";
import Collapse from "@material-ui/core/Collapse";

import LazyImage from "@saas/components/LazyImage";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import Input from "@saas/components/Input";
import { CARD_PAYMENT } from "@saas/stores/plugins/constants";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { isCardNumberValid } from "../../../../utils/helpers";
function PaymentTypepaper({
  paymentOption,
  onClickHandler,
  selectedPaymentMethods,
  isDisabled,
  setErrorMessage,
  cardInfo,
  setCardInfo,
  cardInfoErrors,
  removeErrorMessage,
}) {
  const { maxWidth600: isMobile } = useResponsive();
  const [isCollapse, setCollapse] = useState(
    selectedPaymentMethods?.includes(CARD_PAYMENT)
  );

  const onCardNumberBlur = () => {
    if (
      cardInfo.card_number &&
      !isCardNumberValid(
        persianToEnglishNumber(cardInfo.card_number).replace(/-/g, "")
      )
    )
      setErrorMessage("number", "The card number entered is unstoppable");
    else removeErrorMessage("number");
  };
  useEffect(() => {
    if (selectedPaymentMethods?.includes(CARD_PAYMENT))
      !isCollapse && setCollapse(true);
    else isCollapse && setCollapse(false);
  }, [selectedPaymentMethods]);
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .hover:hover {
              background: rgba(0, 80, 255, 0.05);
              border :  1px solid rgba(0, 80, 255, 0.2) !important;
            }
    `,
        }}
      />
      <div>
        <div
          className={`py-3 px-2 d-flex align-items-${
            isMobile ? "start" : "center"
          } mt-5 ${!isDisabled && "u-cursor-pointer hover"}`}
          style={{
            border: "1px solid #EDEDED",
            borderRadius:
              paymentOption.value === CARD_PAYMENT ? "4px 4px 0 0" : 4,
            backgroundColor: isDisabled && "#FAFBFB",
            opacity: isDisabled && 0.7,
          }}
          onClick={() => {
            !isDisabled && onClickHandler(paymentOption.value);
          }}
        >
          <Checkbox
            className="p-2 ml-3"
            size="small"
            onChange={(e) => {
              e.preventDefault();
            }}
            color="primary"
            checked={selectedPaymentMethods?.includes(paymentOption.value)}
          />
          {isMobile ? null : (
            <div
              style={{
                backgroundColor: "rgba(0, 80, 255, 0.1)",
                width: 32,
                height: 32,
                minWidth: 32,
                minHeight: 32,
                borderRadius: "50%",
              }}
              className="d-flex justify-content-center align-items-center ml-2"
            >
              <LazyImage src={paymentOption.icon} width={22} height={22} />
            </div>
          )}

          <div className="d-flex align-items-center justify-content-between w-100">
            <div>
              <div
                className="u-fontMedium u-fontWeightMedium"
                style={{ color: isDisabled ? pollution : night }}
              >
                {paymentOption.title}
              </div>
              <div
                style={{ color: isDisabled ? pollution : smoke }}
                className="u-font-semi-small mt-3 text-justify"
              >
                {paymentOption.description}
              </div>
            </div>
          </div>
        </div>
        {paymentOption.value === CARD_PAYMENT ? (
          <Collapse in={isCollapse}>
            <div
              className={`d-flex flex-col align-items-center px-${
                isMobile ? "0" : "5"
              } py-4`}
              style={{
                border: "1px solid rgb(237, 237, 237)",
                borderTop: "none",
                borderRadius: "0px 0px 4px 4px",
              }}
            >
              <div className={"col-12 col-lg-11"}>
                <Input
                  labelPlacement="top"
                  placeholder="Name of account holder"
                  label="Name of account holder"
                  value={cardInfo.owner_name}
                  onChange={(value) => {
                    setCardInfo((prevState) => ({
                      ...prevState,
                      owner_name: value,
                    }));
                    removeErrorMessage("name");
                  }}
                  assistive={
                    cardInfoErrors.find((err) => err.field === "name")
                      ?.message || ""
                  }
                  error={Boolean(
                    cardInfoErrors.some((err) => err.field === "name")
                  )}
                  InputProps={{ className: "u-height-48 u-border-radius-8" }}
                  labelClassName={"u-fontMedium"}
                  required
                />
              </div>
              <div className={"col-12 col-lg-11 mt-2"}>
                <Input
                  labelPlacement="top"
                  placeholder="card number"
                  label="card number"
                  value={cardInfo.card_number}
                  className="direction-ltr"
                  onChange={(value) => {
                    let newVal = value.split("-").join(""); // remove hyphens
                    if (newVal.length > 16) return;
                    if (newVal.length > 0) {
                      newVal = newVal
                        .match(new RegExp(".{1,4}", "g"))
                        .join("-");
                    }
                    setCardInfo((prevState) => ({
                      ...prevState,
                      card_number: newVal
                        ? englishNumberToPersianNumber(newVal)
                        : "",
                    }));
                    removeErrorMessage("number");
                  }}
                  assistive={
                    cardInfoErrors.find((err) => err.field === "number")
                      ?.message || ""
                  }
                  error={Boolean(
                    cardInfoErrors.some((err) => err.field === "number")
                  )}
                  InputProps={{ className: "u-height-48 u-border-radius-8" }}
                  labelClassName={"u-fontMedium"}
                  onBlur={onCardNumberBlur}
                  required
                />
              </div>
            </div>
          </Collapse>
        ) : null}
      </div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
});

const withConnect = connect(mapStateToProps);

export default compose(memo, withConnect)(PaymentTypepaper);
