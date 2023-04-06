import React, { memo } from "react";

import { useResponsive } from "@saas/utils/hooks/useResponsive";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { getDifferenceBetweenTwoTimes } from "@saas/utils/helpers/getDifferenceBetweenTwoTimes";
import { coal, night } from "@saas/utils/colors";

import moment from "moment-jalaali";
import Paper from "@material-ui/core/Paper";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";

function PreorderTimeSelectDrawer({
  isOpen,
  onClose,
  selectedDayForDeliveryPreOrder,
  setDayForDeliveryPreOrder,
  selectedTimeForDeliveryPreOrder,
  selectTimeForDeliveryPreOrder,
  todayPreOrder,
  tomorrowPreOrder,
  timesRange,
  submit,
  isLoading,
  isTimeSelected,
  setIsTimeSelect,
  isDateAndHourSelected,
  isAddressDetailsInvalid,
  availableTimeRangeForTodayDeliveryPreOrder,
  availableTimeRangeForTomorrowDeliveryPreOrder,
  themeColor,
}) {
  const { minWidth768 } = useResponsive();
  return (
    <Drawer
      style={{ zIndex: 10000 }}
      anchor="bottom"
      open={isOpen && !minWidth768}
      onClose={onClose}
      classes={{ paperAnchorBottom: "drawer-border-radius" }}
    >
      <Paper elevation={1} style={{ padding: "15px 15px 140px 15px" }}>
        <div className="d-flex justify-content-between align-items-center mb-5 w-100">
          <IconButton
            className="p-0"
            onClick={onClose}
            style={{ color: night }}
          >
            <CancelRoundedIcon />
          </IconButton>
          <span
            style={{ color: coal }}
            className="u-fontLarge  u-fontWeightBold"
          >
            انتخاب روز و بازه ارسال
          </span>
          <IconButton
            className="p-0"
            onClick={onClose}
            style={{ color: night, visibility: "hidden" }}
          >
            <CancelRoundedIcon />
          </IconButton>
        </div>
        <Divider className="mb-3" />
        <div className="d-flex align-items-center" style={{ minHeight: 110 }}>
          <div className="w-50 mx-2 time-carousel" style={{ maxHeight: 150 }}>
            {Boolean(availableTimeRangeForTodayDeliveryPreOrder.length) && (
              <div
                className="text-center u-fontMedium u-fontWeightBold py-2 mb-2"
                onClick={() => {
                  setDayForDeliveryPreOrder(todayPreOrder);
                  setIsTimeSelect({ time: false, date: true });
                }}
                style={{
                  color:
                    selectedDayForDeliveryPreOrder === todayPreOrder &&
                    isTimeSelected.date
                      ? themeColor
                      : coal,
                  border: `1px solid ${
                    selectedDayForDeliveryPreOrder === todayPreOrder &&
                    isTimeSelected.date
                      ? themeColor
                      : coal
                  }`,
                  borderRadius: 8,
                }}
              >
                امروز
              </div>
            )}
            {Boolean(availableTimeRangeForTomorrowDeliveryPreOrder.length) && (
              <div
                className="text-center u-fontMedium u-fontWeightBold py-2"
                onClick={() => {
                  setDayForDeliveryPreOrder(tomorrowPreOrder);
                  setIsTimeSelect({ time: false, day: true });
                }}
                style={{
                  color:
                    selectedDayForDeliveryPreOrder === tomorrowPreOrder &&
                    isTimeSelected.day
                      ? themeColor
                      : coal,
                  border: `1px solid ${
                    selectedDayForDeliveryPreOrder === tomorrowPreOrder &&
                    isTimeSelected.day
                      ? themeColor
                      : coal
                  }`,
                  borderRadius: 8,
                }}
              >
                فردا
              </div>
            )}
          </div>
          <div className="w-50 mx-2 time-carousel" style={{ maxHeight: 150 }}>
            {timesRange.map((timeRange, index) => {
              if (index <= timesRange.length - 2) {
                const nextTimeRange = timesRange[index + 1];
                if (
                  getDifferenceBetweenTwoTimes(
                    timeRange.value,
                    nextTimeRange.value
                  ) > 30
                ) {
                  return;
                }
                if (
                  Date.parse(moment().format("jYYYY/jM/jD HH:mm")) >
                    Date.parse(`${todayPreOrder} ${timeRange.value}`) &&
                  selectedDayForDeliveryPreOrder === todayPreOrder
                ) {
                  return;
                }
                return (
                  <div
                    onClick={() => {
                      selectTimeForDeliveryPreOrder(timeRange.value);
                      setIsTimeSelect({ ...isTimeSelected, time: true });
                    }}
                    className="text-center u-fontMedium u-fontWeightBold py-2 my-2"
                    style={{
                      color:
                        selectedTimeForDeliveryPreOrder === timeRange.value &&
                        isTimeSelected.time
                          ? themeColor
                          : coal,
                      border: `1px solid ${
                        selectedTimeForDeliveryPreOrder === timeRange.value &&
                        isTimeSelected.time
                          ? themeColor
                          : coal
                      }`,
                      borderRadius: 8,
                    }}
                  >
                    {`از ${timeRange.label} تا ${nextTimeRange.label}`}
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <Divider className="mt-3" />
        <div
          style={{
            zIndex: 10000,
          }}
          className="fixed-bottom p-3 d-flex bg-white"
        >
          <div className="d-flex flex-column w-100">
            <Button
              variant="contained"
              color="secondary"
              className="w-100 mb-2 u-box-shadow-none u-fontMedium"
              size="large"
              onClick={submit}
              disabled={
                isLoading || !isDateAndHourSelected || isAddressDetailsInvalid
              }
              style={{ height: 48 }}
            >
              {isLoading ? <LoadingIndicator /> : "تایید و ثبت سفارش"}
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
              color="secondary"
              className="w-100 ml-0 u-box-shadow-none u-fontMedium"
              size="large"
              style={{ height: 48 }}
            >
              انصراف
            </Button>
          </div>
        </div>
      </Paper>
    </Drawer>
  );
}

export default memo(PreorderTimeSelectDrawer);
