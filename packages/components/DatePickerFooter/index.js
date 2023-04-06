import React from "react";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { dust } from "@saas/utils/colors";

import jMoment from "moment-jalaali";
jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

function DatePickerFooter({
  submitDate,
  handleCompare,
  compareToPrevious,
  handleSelectedRangeDayChange,
  hasCompareSwitch = true,
}) {
  return (
    <div>
      <div
        style={{
          maxWidth: "100%",
          borderBottom: `1px solid ${dust}`,
          borderTop: `1px solid ${dust}`,
        }}
        className="d-flex flex-wrap py-1 px-1 justify-content-center align-items-center"
      >
        <div className="p-1 col-3">
          <Button
            className="w-100 px-0"
            variant="contained"
            style={{ boxShadow: "none" }}
            onClick={() => {
              const startDate = {
                year: jMoment().jYear(),
                month: jMoment().jMonth() + 1,
                day: jMoment().jDate(),
              };
              handleSelectedRangeDayChange(startDate, startDate);
            }}
          >
            امروز
          </Button>
        </div>
        <div className="p-1 col-3">
          <Button
            className="w-100 px-0"
            variant="contained"
            style={{ boxShadow: "none" }}
            onClick={() => {
              const momentStartDate = jMoment().startOf("week");
              const startDate = {
                year: momentStartDate.jYear(),
                month: momentStartDate.jMonth() + 1,
                day: momentStartDate.jDate(),
              };
              const momentEndDate = jMoment().endOf("week");
              const endDate = {
                year: momentEndDate.jYear(),
                month: momentEndDate.jMonth() + 1,
                day: momentEndDate.jDate(),
              };
              handleSelectedRangeDayChange(startDate, endDate);
            }}
          >
            هفته جاری
          </Button>
        </div>
        <div className="p-1 col-3">
          <Button
            className="w-100 px-0"
            variant="contained"
            style={{ boxShadow: "none" }}
            onClick={() => {
              const momentStartDate = jMoment().startOf("jMonth");
              const startDate = {
                year: momentStartDate.jYear(),
                month: momentStartDate.jMonth() + 1,
                day: momentStartDate.jDate(),
              };
              const momentEndDate = jMoment().endOf("jMonth");
              const endDate = {
                year: momentEndDate.jYear(),
                month: momentEndDate.jMonth() + 1,
                day: momentEndDate.jDate(),
              };
              handleSelectedRangeDayChange(startDate, endDate);
            }}
          >
            ماه جاری
          </Button>
        </div>
        <div className="p-1 col-3">
          <Button
            className="w-100 px-0"
            variant="contained"
            style={{ boxShadow: "none" }}
            onClick={() => {
              const startDate = {
                year: jMoment().add(-7, "day").jYear(),
                month: jMoment().add(-7, "day").jMonth() + 1,
                day: jMoment().add(-7, "day").jDate(),
              };
              const endDate = {
                year: jMoment().jYear(),
                month: jMoment().jMonth() + 1,
                day: jMoment().jDate(),
              };
              handleSelectedRangeDayChange(startDate, endDate);
            }}
          >
            ۷ روز قبل
          </Button>
        </div>
        <div className="p-1 col-3">
          <Button
            className="w-100 px-0"
            variant="contained"
            style={{ boxShadow: "none" }}
            onClick={() => {
              const startDate = {
                year: jMoment().add(-1, "day").jYear(),
                month: jMoment().add(-1, "day").jMonth() + 1,
                day: jMoment().add(-1, "day").jDate(),
              };
              handleSelectedRangeDayChange(startDate, startDate);
            }}
          >
            دیروز
          </Button>
        </div>
        <div className="p-1 col-3">
          <Button
            className="w-100 px-0"
            variant="contained"
            style={{ boxShadow: "none" }}
            onClick={() => {
              const momentStartDate = jMoment().add(-7, "day").startOf("week");
              const startDate = {
                year: momentStartDate.jYear(),
                month: momentStartDate.jMonth() + 1,
                day: momentStartDate.jDate(),
              };
              const momentEndDate = jMoment().add(-7, "day").endOf("week");
              const endDate = {
                year: momentEndDate.jYear(),
                month: momentEndDate.jMonth() + 1,
                day: momentEndDate.jDate(),
              };
              handleSelectedRangeDayChange(startDate, endDate);
            }}
          >
            هفته قبل
          </Button>
        </div>
        <div className="p-1 col-3">
          <Button
            className="w-100 px-0"
            variant="contained"
            style={{ boxShadow: "none" }}
            onClick={() => {
              const lastDayOfPreviousMonth = jMoment()
                .startOf("jMonth")
                .add(-1, "day");

              const momentStartDate = lastDayOfPreviousMonth
                .clone()
                .startOf("jMonth");
              const startDate = {
                year: momentStartDate.jYear(),
                month: momentStartDate.jMonth() + 1,
                day: momentStartDate.jDate(),
              };
              const momentEndDate = lastDayOfPreviousMonth
                .clone()
                .endOf("jMonth");
              const endDate = {
                year: momentEndDate.jYear(),
                month: momentEndDate.jMonth() + 1,
                day: momentEndDate.jDate(),
              };
              handleSelectedRangeDayChange(startDate, endDate);
            }}
          >
            ماه قبل
          </Button>
        </div>
        <div className="p-1 col-3">
          <Button
            className="w-100 px-0"
            variant="contained"
            style={{ boxShadow: "none" }}
            onClick={() => {
              const _startDate = jMoment().add(-30, "day");
              const startDate = {
                year: _startDate.jYear(),
                month: _startDate.jMonth() + 1,
                day: _startDate.jDate(),
              };
              const endDate = {
                year: jMoment().jYear(),
                month: jMoment().jMonth() + 1,
                day: jMoment().jDate(),
              };
              handleSelectedRangeDayChange(startDate, endDate);
            }}
          >
            ۳۰ روز قبل
          </Button>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-start">
        {hasCompareSwitch ? (
          <FormControlLabel
            style={{ padding: 0, margin: 0 }}
            control={
              <Checkbox
                style={{ fontFamily: "IranSans" }}
                checked={compareToPrevious}
                onChange={handleCompare}
                name="compareToPrevious"
                color="primary"
                // size="large"
              />
            }
            label="مقایسه با بازه زمانی قبلی"
          />
        ) : null}
        <div className="mr-auto mt-2">
          <Button
            size="large"
            color="primary"
            className="mb-2 w-25"
            variant="contained"
            onClick={submitDate}
          >
            اعمال
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DatePickerFooter;
