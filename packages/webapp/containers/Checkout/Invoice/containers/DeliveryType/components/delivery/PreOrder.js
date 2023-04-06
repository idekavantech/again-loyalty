import React, { memo } from "react";

import { coal, smoke } from "@saas/utils/colors";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";
import {
  PRE_ORDER_DELAYED,
  PRE_ORDER_NORMAL,
} from "@saas/plugins/Shopping/constants";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { FAST_PREORDER_TIME_RANGE_SELECT_DRAWER } from "containers/Checkout/Invoice/containers/DeliveryType/constants";

import FlashOnIcon from "@material-ui/icons/FlashOn";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";

function PreOrder({
  workingHours,
  selectedPreOrderTimingMethod,
  selectPreOrderTimingMethod,
  isAddressDetailsInvalid,
  toggleDrawer,
}) {
  const { minWidth768 } = useResponsive();

  return (
    <>
      {isBusinessOpenNow(workingHours) && (
        <div
          style={{
            border: "1px solid #EDEDED",
            borderRadius: 8,
            maxWidth: "fit-content",
            color:
              selectedPreOrderTimingMethod === PRE_ORDER_NORMAL ? coal : smoke,
            minHeight: 34,
          }}
          className="d-flex align-items-center pr-1 pl-3 py-1 ml-2 u-cursor-pointer pickup-option"
          onClick={() => selectPreOrderTimingMethod(PRE_ORDER_NORMAL)}
        >
          <FlashOnIcon fontSize="small" />
          <div className="u-font-semi-small mr-1 u-fontWeightBold">الان</div>
        </div>
      )}
      <div
        style={{
          border: "1px solid #EDEDED",
          borderRadius: 8,
          maxWidth: "fit-content",
          color:
            selectedPreOrderTimingMethod === PRE_ORDER_DELAYED ? coal : smoke,
          minHeight: 34,
        }}
        className="d-flex align-items-center pl-3 pr-2 py-1 u-cursor-pointer pickup-option"
        onClick={() => {
          selectPreOrderTimingMethod(PRE_ORDER_DELAYED);
          if (!minWidth768 && !isAddressDetailsInvalid)
            toggleDrawer(FAST_PREORDER_TIME_RANGE_SELECT_DRAWER, true);
        }}
      >
        <AccessAlarmsIcon fontSize="small" />
        <div className="u-font-semi-small mr-1 u-fontWeightBold">
          سفارش زمان‌دار
        </div>
      </div>
    </>
  );
}

export default memo(PreOrder);
