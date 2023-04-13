import React, { memo } from "react";

import { getDifferenceBetweenTwoTimes } from "@saas/utils/helpers/getDifferenceBetweenTwoTimes";

import moment from "moment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

function PreOrderForm({
  isAddressDetailsInvalid,
  deliveryTimingElementRef,
  isTimeSelected,
  selectedDayForDeliveryPreOrder,
  setDayForDeliveryPreOrder,
  setIsTimeSelect,
  availableTimeRangeForTodayDeliveryPreOrder,
  availableTimeRangeForTomorrowDeliveryPreOrder,
  selectedTimeForDeliveryPreOrder,
  selectTimeForDeliveryPreOrder,
  timesRange,
  today,
  tomorrow,
}) {
  return (
    <div className="mr-5" ref={deliveryTimingElementRef}>
      <FormControl
        variant="outlined"
        style={{ minWidth: 120, height: 34 }}
        className={`${
          !isAddressDetailsInvalid &&
          !isTimeSelected.day &&
          "error-preorder-time-animation"
        }`}
      >
        <InputLabel id="demo-simple-select-outlined-label">روز</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selectedDayForDeliveryPreOrder}
          onChange={(event) => setDayForDeliveryPreOrder(event.target.value)}
          label="روز"
          style={{ minWidth: 120, height: 34 }}
          onFocus={() =>
            setIsTimeSelect({
              time: false,
              day: true,
            })
          }
          color="secondary"
        >
          {Boolean(availableTimeRangeForTodayDeliveryPreOrder.length) && (
            <MenuItem value={today}>امروز</MenuItem>
          )}
          {Boolean(availableTimeRangeForTomorrowDeliveryPreOrder.length) && (
            <MenuItem value={tomorrow}>فردا</MenuItem>
          )}
        </Select>
      </FormControl>
      <FormControl
        variant="outlined"
        style={{ minWidth: 120, height: 34 }}
        className={`mr-3 ${
          !isAddressDetailsInvalid &&
          isTimeSelected.day &&
          !isTimeSelected.time &&
          "error-preorder-time-animation"
        }`}
      >
        <InputLabel id="demo-simple-select-outlined-label">زمان</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={selectedTimeForDeliveryPreOrder}
          onChange={(event) =>
            selectTimeForDeliveryPreOrder(event.target.value)
          }
          onFocus={() =>
            setIsTimeSelect({
              ...isTimeSelected,
              time: true,
            })
          }
          label="زمان"
          style={{ minWidth: 120, height: 34 }}
          color="secondary"
        >
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
                Date.parse(moment().format("YYYY/jM/jD HH:mm")) >
                  Date.parse(`${today} ${timeRange.value}`) &&
                selectedDayForDeliveryPreOrder === today
              ) {
                return;
              }
              return (
                <MenuItem value={timeRange.value}>
                  {`از ${timeRange.label} تا ${nextTimeRange.label}`}
                </MenuItem>
              );
            }
            return null;
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default memo(PreOrderForm);
