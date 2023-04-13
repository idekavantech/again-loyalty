import React from "react";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { dust } from "@saas/utils/colors";

import jMoment from "moment";
 
 

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
                year: jMoment().year(),
                month: jMoment().month() + 1,
                day: jMoment().date(),
              };
              handleSelectedRangeDayChange(startDate, startDate);
            }}
          >
            Today
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
                year: momentStartDate.year(),
                month: momentStartDate.month() + 1,
                day: momentStartDate.date(),
              };
              const momentEndDate = jMoment().endOf("week");
              const endDate = {
                year: momentEndDate.year(),
                month: momentEndDate.month() + 1,
                day: momentEndDate.date(),
              };
              handleSelectedRangeDayChange(startDate, endDate);
            }}
          >
            current week
          </Button>
        </div>
        <div className="p-1 col-3">
          <Button
            className="w-100 px-0"
            variant="contained"
            style={{ boxShadow: "none" }}
            onClick={() => {
              const momentStartDate = jMoment().startOf("month");
              const startDate = {
                year: momentStartDate.year(),
                month: momentStartDate.month() + 1,
                day: momentStartDate.date(),
              };
              const momentEndDate = jMoment().endOf("month");
              const endDate = {
                year: momentEndDate.year(),
                month: momentEndDate.month() + 1,
                day: momentEndDate.date(),
              };
              handleSelectedRangeDayChange(startDate, endDate);
            }}
          >
            current month
          </Button>
        </div>
        <div className="p-1 col-3">
          <Button
            className="w-100 px-0"
            variant="contained"
            style={{ boxShadow: "none" }}
            onClick={() => {
              const startDate = {
                year: jMoment().add(-7, "day").year(),
                month: jMoment().add(-7, "day").month() + 1,
                day: jMoment().add(-7, "day").date(),
              };
              const endDate = {
                year: jMoment().year(),
                month: jMoment().month() + 1,
                day: jMoment().date(),
              };
              handleSelectedRangeDayChange(startDate, endDate);
            }}
          >
            7 days ago
          </Button>
        </div>
        <div className="p-1 col-3">
          <Button
            className="w-100 px-0"
            variant="contained"
            style={{ boxShadow: "none" }}
            onClick={() => {
              const startDate = {
                year: jMoment().add(-1, "day").year(),
                month: jMoment().add(-1, "day").month() + 1,
                day: jMoment().add(-1, "day").date(),
              };
              handleSelectedRangeDayChange(startDate, startDate);
            }}
          >
            Yesterday
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
                year: momentStartDate.year(),
                month: momentStartDate.month() + 1,
                day: momentStartDate.date(),
              };
              const momentEndDate = jMoment().add(-7, "day").endOf("week");
              const endDate = {
                year: momentEndDate.year(),
                month: momentEndDate.month() + 1,
                day: momentEndDate.date(),
              };
              handleSelectedRangeDayChange(startDate, endDate);
            }}
          >
            last week
          </Button>
        </div>
        <div className="p-1 col-3">
          <Button
            className="w-100 px-0"
            variant="contained"
            style={{ boxShadow: "none" }}
            onClick={() => {
              const lastDayOfPreviousMonth = jMoment()
                .startOf("month")
                .add(-1, "day");

              const momentStartDate = lastDayOfPreviousMonth
                .clone()
                .startOf("month");
              const startDate = {
                year: momentStartDate.year(),
                month: momentStartDate.month() + 1,
                day: momentStartDate.date(),
              };
              const momentEndDate = lastDayOfPreviousMonth
                .clone()
                .endOf("month");
              const endDate = {
                year: momentEndDate.year(),
                month: momentEndDate.month() + 1,
                day: momentEndDate.date(),
              };
              handleSelectedRangeDayChange(startDate, endDate);
            }}
          >
            last month
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
                year: _startDate.year(),
                month: _startDate.month() + 1,
                day: _startDate.date(),
              };
              const endDate = {
                year: jMoment().year(),
                month: jMoment().month() + 1,
                day: jMoment().date(),
              };
              handleSelectedRangeDayChange(startDate, endDate);
            }}
          >
            7 days ago
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
            label="Comparison with the previous time interval"
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
            actions
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DatePickerFooter;
