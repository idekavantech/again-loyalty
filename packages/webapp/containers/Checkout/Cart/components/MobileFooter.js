import React, { memo } from "react";

import LoadingIndicator from "@saas/components/LoadingIndicator";
import { night } from "@saas/utils/colors";
import IconComponent from "@saas/components/Icon";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { $ } from "@saas/icons";

import Button from "@material-ui/core/Button";
import ExpandLessRoundedIcon from "@material-ui/icons/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";

function MobileFooter({
  setSalesInvoiceDrawerOpen,
  isSalesInvoiceDrawerOpen,
  toggleDrawer,
  allItemsPrice,
  allItemsDiscounts,
  isSubmitButtonDisabled,
  submit,
  isLoading,
  callToActionConfig,
  themeColor,
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
        onClick={(event) => {
          const setStateFunction = () =>
            setSalesInvoiceDrawerOpen(!isSalesInvoiceDrawerOpen);
          toggleDrawer(setStateFunction)(event);
        }}
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
        <span style={{ color: night }} className="mt-1 u-fontNormal">
          {priceFormatter(allItemsPrice - allItemsDiscounts)}{" "}
          <IconComponent icon={$} width={21} height={21} color={night} />
        </span>
      </div>
      <Button
        size="large"
        variant="contained"
        color="secondary"
        className="w-100 mt-4 d-flex justify-content-between u-box-shadow-none u-fontMedium"
        disabled={isSubmitButtonDisabled}
        onClick={() => submit()}
      >
        {isLoading ? (
          <LoadingIndicator size={32} className="u-height-24" />
        ) : (
          <>
            <span>{callToActionConfig.label}</span>
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
