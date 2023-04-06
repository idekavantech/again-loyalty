import React, { memo } from "react";

import { coal, night } from "@saas/utils/colors";
import { formatDate } from "@saas/utils/helpers/formatDate";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { getWeekDay } from "@saas/utils/helpers/getWeekDay";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

import Paper from "@material-ui/core/Paper";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";

function ScheduledTimeSelectDrawer({
  isOpen,
  onClose,
  selectedDayForDeliveryScheduled,
  setDayForDeliveryScheduled,
  selectedTimeForDeliveryScheduled,
  setTimeForDeliveryScheduled,
  availableDeliveryTimes,
  today,
  submit,
  isLoading,
  isTimeSelected,
  setIsTimeSelect,
  isDateAndHourSelected,
  isAddressDetailsInvalid,
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
            {availableDeliveryTimes?.map((date) => {
              if (date.shifts.length)
                return (
                  <div
                    onClick={() => {
                      setDayForDeliveryScheduled(date.date);
                      setIsTimeSelect({ time: false, day: true });
                    }}
                    className="text-center u-fontMedium u-fontWeightBold py-2 my-2"
                    style={{
                      color:
                        selectedDayForDeliveryScheduled === date.date &&
                        isTimeSelected.day
                          ? themeColor
                          : coal,
                      border: `1px solid ${
                        selectedDayForDeliveryScheduled === date.date &&
                        isTimeSelected.day
                          ? themeColor
                          : coal
                      }`,
                      borderRadius: 8,
                    }}
                  >
                    {date.date === today?.format("jYYYY/jM/jD")
                      ? "امروز"
                      : getWeekDay(date.weekDay)}
                    ،{"  "}
                    {formatDate(date.date)}
                  </div>
                );
            })}
          </div>
          <div className="w-50 mx-2 time-carousel" style={{ maxHeight: 150 }}>
            {availableDeliveryTimes &&
              selectedDayForDeliveryScheduled &&
              availableDeliveryTimes.map(
                (date) =>
                  date.date === selectedDayForDeliveryScheduled &&
                  date.shifts.map((shift) => {
                    const text = `${englishNumberToPersianNumber(
                      shift.from.substr(0, 5)
                    )} تا ${englishNumberToPersianNumber(
                      shift.to.substr(0, 5)
                    )}`;
                    return (
                      <div
                        key={text}
                        onClick={() => {
                          setTimeForDeliveryScheduled(shift);
                          setIsTimeSelect({ ...isTimeSelected, time: true });
                        }}
                        className="text-center u-fontMedium u-fontWeightBold py-2 my-2"
                        style={{
                          color:
                            selectedTimeForDeliveryScheduled === shift &&
                            isTimeSelected.time
                              ? themeColor
                              : coal,
                          border: `1px solid ${
                            selectedTimeForDeliveryScheduled === shift &&
                            isTimeSelected.time
                              ? themeColor
                              : coal
                          }`,
                          borderRadius: 8,
                        }}
                      >
                        {text}
                      </div>
                    );
                  })
              )}
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

export default memo(ScheduledTimeSelectDrawer);
