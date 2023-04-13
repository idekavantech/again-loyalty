import React from "react";
import jMoment from "moment";
 
 
import omit from "lodash/omit";
import { DateRangePicker } from "react-dates";

import {
  START_DATE,
  END_DATE,
  HORIZONTAL_ORIENTATION,
  ANCHOR_LEFT,
  NAV_POSITION_TOP,
  OPEN_DOWN,
} from "./constants";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import TimeField from "react-simple-timefield";
import { dust } from "@saas/utils/colors";

const defaultProps = {
  // example props for the demo
  autoFocus: false,
  autoFocusEndDate: false,
  initialStartDate: null,
  initialEndDate: null,
  hideKeyboardShortcutsPanel: true,
  // input related props
  startDateId: START_DATE,
  startDatePlaceholderText: "Start Date",
  endDateId: END_DATE,
  endDatePlaceholderText: "End Date",
  disabled: false,
  required: false,
  screenReaderInputMessage: "",
  showClearDates: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,
  block: false,
  small: false,
  regular: false,

  // calendar presentation and interaction related props
  renderMonthText: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 1,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  isRTL: true,
  openDirection: OPEN_DOWN,

  // navigation related props
  navPosition: NAV_POSITION_TOP,
  navPrev: null,
  navNext: null,
  onPrevMonthClick() {},
  onNextMonthClick() {},
  onClose() {},

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  minimumNights: 0,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: () => false,
  isDayHighlighted: () => false,

  // internationalization
  displayFormat: () => jMoment.localeData().longDateFormat("L"),
  monthFormat: "MMMM YYYY",
  phrases: {},

  stateDateWrapper: (date) => date,
};

class DateRangePickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    let focusedInput = null;
    if (props.autoFocus) {
      focusedInput = START_DATE;
    } else if (props.autoFocusEndDate) {
      focusedInput = END_DATE;
    }

    this.state = {
      focusedInput,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    const { stateDateWrapper } = this.props;
    this.setState({
      startDate: startDate && stateDateWrapper(startDate),
      endDate: endDate && stateDateWrapper(endDate),
    });
    this.props.onDatesChange({ startDate, endDate });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    const { focusedInput, startDate, endDate } = this.state;
    // autoFocus, autoFocusEndDate, initialStartDate and initialEndDate are helper props for the
    // example wrapper but are not props on the SingleDatePicker itself and
    // thus, have to be omitted.
    const props = omit(this.props, [
      "autoFocus",
      "autoFocusEndDate",
      "initialStartDate",
      "initialEndDate",
      "stateDateWrapper",
    ]);

    return (
      <>
        <DateRangePicker
          renderCalendarInfo={() => (
            <>
              {this.props.hasTime ? (
                <div className="d-flex justify-content-between align-items-center col-12 mb-3">
                  <div className="col-6 " style={{ paddingRight: 2 }}>
                    <div
                      style={{
                        border: "1px solid #e4e7e7",
                        borderRadius: 4,
                        textAlign: "center",
                        padding: "6px 0",
                        width: 120,
                      }}
                    >
                      <span style={{ color: "#d4d6d7" }} className="ml-2">
                        start time
                      </span>
                      <TimeField
                        style={{ color: "#484848" }}
                        value={this.props.startTime || "00:00"}
                        onChange={(e) => {
                          this.props.passStartTimeToparent(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-6" style={{ paddingRight: 13 }}>
                    <div
                      style={{
                        border: "1px solid #e4e7e7",
                        borderRadius: 4,
                        textAlign: "center",
                        padding: "6px 0",
                        width: 120,
                      }}
                    >
                      <span style={{ color: "#d4d6d7" }} className="ml-2">
                        The end time
                      </span>
                      <TimeField
                        style={{ color: "#484848" }}
                        value={this.props.endTime || "00:00"}
                        onChange={(e) => {
                          this.props.passEndTimeToparent(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
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
                      this.onDatesChange({
                        startDate: jMoment(),
                        endDate: jMoment(),
                      });
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
                      const startDate = jMoment().startOf("week");
                      const endDate = jMoment().endOf("week");
                      this.onDatesChange({ startDate, endDate });
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
                      const startDate = jMoment().startOf("month");
                      const endDate = jMoment().endOf("month");
                      this.onDatesChange({ startDate, endDate });
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
                      const startDate = jMoment().startOf("year");
                      const endDate = jMoment().endOf("year");
                      this.onDatesChange({ startDate, endDate });
                    }}
                  >
                    Current year
                  </Button>
                </div>
                <div className="p-1 col-3">
                  <Button
                    className="w-100 px-0"
                    variant="contained"
                    style={{ boxShadow: "none" }}
                    onClick={() => {
                      this.onDatesChange({
                        startDate: jMoment().add(-1, "day"),
                        endDate: jMoment().add(-1, "day"),
                      });
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
                      const startDate = jMoment()
                        .add(-7, "day")
                        .startOf("week");
                      const endDate = jMoment().add(-7, "day").endOf("week");
                      this.onDatesChange({ startDate, endDate });
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
                      const startDate = lastDayOfPreviousMonth
                        .clone()
                        .startOf("month");
                      const endDate = lastDayOfPreviousMonth
                        .clone()
                        .endOf("month");
                      this.onDatesChange({ startDate, endDate });
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
                      const lastDayOfPreviousYear = jMoment()
                        .startOf("year")
                        .add(-1, "day");
                      const startDate = lastDayOfPreviousYear
                        .clone()
                        .startOf("year");
                      const endDate = lastDayOfPreviousYear
                        .clone()
                        .endOf("year");
                      this.onDatesChange({ startDate, endDate });
                    }}
                  >
                    The previous year
                  </Button>
                </div>
              </div>
              {this.props.hasComparingCheckBox ? (
                <div
                  style={{ borderBottom: `1px solid ${dust}` }}
                  className="d-flex align-items-center justify-content-start my-1 mb-2"
                >
                  <FormControlLabel
                    style={{ padding: 0, margin: 0 }}
                    control={
                      <Checkbox
                        style={{ fontFamily: "IranSans" }}
                        checked={this.props.isCompared}
                        onChange={this.props.onCompare}
                        name="compareToPrevious"
                        color="primary"
                        // size="large"
                      />
                    }
                    label="Comparison with the previous time interval"
                  />
                </div>
              ) : null}
              {this.props.hasSubmitButton ? (
                <div className="d-flex align-items-center justify-content-end  my-2 px-2">
                  <Button
                    size="large"
                    color="primary"
                    className="mb-2 w-25"
                    variant="contained"
                    onClick={this.props.onSubmit}
                  >
                    actions
                  </Button>
                </div>
              ) : null}
            </>
          )}
          {...props}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
        />
      </>
    );
  }
}

DateRangePickerWrapper.defaultProps = defaultProps;

export default DateRangePickerWrapper;
