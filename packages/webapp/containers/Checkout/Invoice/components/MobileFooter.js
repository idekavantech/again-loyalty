import React, { memo } from "react";

import { night } from "@saas/utils/colors";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { $ } from "@saas/icons";
import Icon from "@saas/components/Icon";
import LoadingIndicator from "@saas/components/LoadingIndicator";

import Button from "@material-ui/core/Button";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";

function MobileFooter({
  toggleSalesInvoiceDrawer,
  isSalesInvoiceDrawerOpen,
  themeColor,
  orderInfo,
  isLoading,
  callToActionConfig,
  finalSubmit,
  isSubmitButtonDisabled,
}) {
  return (
    <div
      style={{
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        zIndex: 10000,
      }}
      className="fixed-bottom p-3 d-flex bg-white justify-content-between"
    >
      <div
        className="d-flex flex-column"
        onClick={toggleSalesInvoiceDrawer(!isSalesInvoiceDrawerOpen)}
      >
        <div className="d-flex align-items-center">
          <span style={{ color: themeColor }} className="u-font-semi-small">
            جزییات قیمت
          </span>
          {isSalesInvoiceDrawerOpen ? (
            <ExpandMoreRoundedIcon color="secondary" />
          ) : (
            <ExpandLessRoundedIcon color="secondary" />
          )}
        </div>
        <span style={{ color: night }} className="mt-1 u-fontSemiLarge">
          {priceFormatter(
            typeof orderInfo?.total_price === "number"
              ? orderInfo?.total_price
              : orderInfo?.final_items_price || 0
          )}{" "}
          <Icon icon={$} width={21} height={21} color={night} />
        </span>
      </div>
      <Button
        variant="contained"
        color="secondary"
        className="flex-grow-1 flex-grow-0 w-50 d-flex justify-content-between u-fontMedium align-items-center u-box-shadow-none"
        id="btn-verification-6"
        disabled={isSubmitButtonDisabled}
        onClick={(e) => {
          if (callToActionConfig.onClick) callToActionConfig.onClick(e);
          else finalSubmit();
        }}
      >
        {isLoading ? (
          <LoadingIndicator size={32} className="u-height-24" />
        ) : (
          <>
            {callToActionConfig.label}
            <ArrowBackIosRoundedIcon
              fontSize="small"
              style={{ width: 15, height: 15 }}
            />
          </>
        )}
      </Button>
    </div>
  );
}
export default memo(MobileFooter);
