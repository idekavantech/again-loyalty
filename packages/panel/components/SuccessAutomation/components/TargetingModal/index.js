import React, { memo, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { updateBusiness } from "@saas/stores/business/actions";
import { makeSelectJourneyState } from "store/selectors";
import { getJourneyState, updateJourneyState } from "store/actions";
import { makeStyles } from "@material-ui/core/styles";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Input from "@saas/components/Input";
import DateRangePickerWrapper from "@saas/components/DateRangePickerWrapper";
import moment from "moment";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Progress from "components/Progress";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";

const useStyle = makeStyles(() => ({
  tooltip: {
    backgroundColor: "#0050FF",
    color: "#fff",
    maxWidth: 181,
    lineHeight: "20px",
    fontSize: 11,
    borderRadius: 8,
    margin: 0,
  },
  arrow: {
    color: "#0050FF",
  },
}));

const options = [
  { id: 0, title: "Number of order", type: "order_count" },
  { id: 1, title: "sales amount", type: "order_total" },
];
const TargetingModal = ({
  isOpen,
  onClose,
  journeyData,
  _getJourneyState,
  _updateJourneyState,
}) => {
  const target = journeyData?.vitrin_journey_state?.target || {};
  const datePickerRef = useRef();
  const classes = useStyle();
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const [fromDate, setFromDate] = useState(moment().add(-29, "day"));
  const [toDate, setToDate] = useState(moment());
  const anchorRef = useRef();
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [open, setOpen] = useState(false);
  const [targetSet, setTargetSet] = useState(false);
  const [currentTarget, setCurrentTarget] = useState();
  const [isDisable, setIsDisable] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };
  const desktopMatches = useMediaQuery("(min-width:768px)");

  useEffect(() => {
    _getJourneyState();
  }, []);

  useEffect(() => {
    if (Object.keys(target).length !== 0) {
      setSelectedIndex(
        options.find((option) => option.type == target.type)?.id
      );
      setIsDisable(true);
      setCurrentTarget(target.value);
      if (target.from_date_time != "Invalid date") {
        setFromDate(moment(target.from_date_time));
        setToDate(moment(target.to_date_time));
      }
    }
  }, [target, isOpen]);

  const submitTarget = (data, callback) => {
    _updateJourneyState(
      {
        target: data,
      },
      callback
    );
  };

  const targetStartDate = target?.from_date_time
    ? new Date(target.from_date_time).toLocaleDateString("fa-IR", {
        month: "long",
        day: "2-digit",
      })
    : "";
  const targetEndDate = target?.to_date_time
    ? new Date(target.to_date_time).toLocaleDateString("fa-IR", {
        month: "long",
        day: "2-digit",
      })
    : "";

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{ style: { width: desktopMatches ? 520 : 300 } }}
    >
      <DialogContent className="p-modals w-100">
        {targetSet ? (
          <>
            <div
              className="u-border-radius-8 p-4 d-flex align-items-center"
              style={{ backgroundColor: "rgba(46, 125, 50, 0.12)" }}
            >
              <CheckCircleOutlineIcon style={{ color: "#2E7D32" }} />
              <p className="mr-3" style={{ color: "#1B5E20", fontSize: 12 }}>
                Your goal was successfully set up.
              </p>
            </div>
            <div className="p-2 d-md-flex justify-content-between align-items-center">
              <div>
                <p
                  style={{
                    fontSize: desktopMatches ? 16 : 14,
                    lineHeight: desktopMatches ? "24px" : "20px",
                  }}
                >
                  <strong>Target:</strong>{" "}
                  <span>
                    {selectedIndex == 1
                      ? ` ${priceFormatter(target?.value || 0)} Toman`
                      : `${englishNumberToPersianNumber(
                          target?.value || 0
                        )}  number`}{" "}
                    {}
                  </span>
                </p>
                <p
                  className="mt-1"
                  style={{
                    fontSize: desktopMatches ? 16 : 14,
                    lineHeight: desktopMatches ? "24px" : "20px",
                  }}
                >
                  <strong>The status of your progress:</strong>
                  {selectedIndex == 1
                    ? ` ${priceFormatter(target?.current_value || 0)} Toman`
                    : `${englishNumberToPersianNumber(
                        target?.current_value || 0
                      )}  number`}
                </p>
              </div>

              <div className="d-flex flex-col  mt-4 mt-md-1 justify-content-center align-items-center">
                <Progress
                  percent={
                    target?.current_value > target?.value
                      ? 100
                      : ((target?.current_value || 0) * 100) / target?.value ||
                        0
                  }
                />
                <p
                  className="d-flex align-items-center mt-1"
                  style={{
                    fontSize: 12,
                    lineHeight: "24px",
                  }}
                >
                  <ChevronRightRoundedIcon style={{ fontSize: 20 }} />
                  {targetStartDate ? (
                    <span>
                      {targetStartDate} until the{targetEndDate}
                    </span>
                  ) : (
                    <span>
                      <strong>period:</strong> Not specified
                    </span>
                  )}{" "}
                  <KeyboardArrowLeftRoundedIcon style={{ fontSize: 20 }} />
                </p>
              </div>
            </div>

            <Button
              className="w-100 u-border-radius-8 mt-3"
              style={{ fontSize: 15, fontWeight: 500 }}
              color="primary"
              variant="contained"
              size="medium"
              onClick={() => {
                onClose();
                setTargetSet(false);
              }}
            >
              Confirm
            </Button>
            <Button
              className="w-100 u-border-radius-8 mt-1"
              style={{ fontSize: 15, fontWeight: 500 }}
              color="primary"
              variant="outlined"
              size="medium"
              onClick={() => setTargetSet(false)}
            >
              Re -edit the target
            </Button>
          </>
        ) : (
          <div
            style={{
              fontSize: desktopMatches ? 16 : 14,
              lineHeight: desktopMatches ? "24px" : "20px",
            }}
          >
            <div className="d-flex align-items-center">
              <h2 style={{ fontWeight: 400 }}>
                What is your targeting index?
              </h2>
              <ClickAwayListener onClickAway={() => setIsOpenTooltip(false)}>
                <Tooltip
                  placement="top"
                  PopperProps={{
                    disablePortal: true,
                  }}
                  classes={classes}
                  disableFocusListener
                  disableHoverListener
                  arrow
                  title={
                    <p className="my-2">
                      In this section you specify that you want your growth based on
                      Which index to measure, you can do on your number or
                      The amount of sales focus.
                    </p>
                  }
                  open={isOpenTooltip}
                >
                  <Button
                    style={{ minWidth: 30 }}
                    onClick={() => setIsOpenTooltip(!isOpenTooltip)}
                  >
                    <HelpOutlineRoundedIcon
                      data-tour="favIcon"
                      style={{ width: 20, height: 20, color: "#8C9196" }}
                    />
                  </Button>
                </Tooltip>
              </ClickAwayListener>
            </div>
            <div
              className="position-relative mt-1"
              style={{ direction: "ltr" }}
            >
              <ButtonGroup
                variant="outlined"
                color="primary"
                ref={anchorRef}
                aria-label="split button"
                className="w-100 u-border-radius-8"
                disabled={isDisable}
                size="medium"
              >
                <Button
                  className="flex-1 d-flex justify-content-end"
                  style={{
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {options[selectedIndex]?.title}
                </Button>
                <Button
                  color="primary"
                  size="small"
                  aria-controls={open ? "split-button-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-label="select merge strategy"
                  aria-haspopup="menu"
                  onClick={handleToggle}
                  style={{
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    padding: "5px 0",
                  }}
                >
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                style={{
                  position: "absolute",
                  zIndex: 10,
                  width: "100%",
                  transform: "translate3d(0px, 33px, 0px)",
                }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu">
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              disabled={index === 2}
                              selected={index === selectedIndex}
                              onClick={(event) =>
                                handleMenuItemClick(event, index)
                              }
                            >
                              {option.title}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
            <p className="mt-3">Choose the desired timeframe first:</p>
            <div
              className="crmReportsDatePicker d-flex justify-content-center align-items-center"
              style={{
                height: 36,
                border: isDisable
                  ? "1px solid #9f9f9f5c"
                  : "1px solid #0050FF50",
                borderRadius: 8,
              }}
            >
              <DateRangePickerWrapper
                keepOpenOnDateSelect
                disabled={isDisable}
                initialStartDate={fromDate}
                initialEndDate={toDate}
                stateDateWrapper={moment}
                startDatePlaceholderText="start date"
                endDatePlaceholderText="The end date"
                onFocusChange={(focusedInput) => setFocused({ focusedInput })}
                onDatesChange={({ startDate, endDate }) => {
                  if (startDate) setFromDate(startDate);
                  if (endDate) setToDate(endDate);
                }}
                ref={datePickerRef}
                renderMonthText={(month) => moment(month).format("MMMM YYYY")}
                renderDayContents={(day) => moment(day).format("jD")}
                hasSubmitButton
                onSubmit={() =>
                  datePickerRef.current.onFocusChange({ focused: false })
                }
              />
            </div>

            <p className="mt-3">
              Includes your target with this time interval.
            </p>
            <style
              dangerouslySetInnerHTML={{
                __html: `
            .MuiOutlinedInput-root{
              border-radius:8px;
            }
          `,
              }}
            />

            <Input
              onChange={(value) => {
                setCurrentTarget(persianToEnglishNumber(value));
              }}
              size="small"
              disabled={isDisable}
              className="c-input mt-2 u-border-radius-8"
              value={
                currentTarget ? englishNumberToPersianNumber(currentTarget) : ""
              }
              placeholder="For example"
              InputProps={{
                endAdornment: (
                  <div
                    className="ml-4"
                    style={{ color: "rgba(0, 0, 0, 0.54)" }}
                  >
                    {options[selectedIndex].title == "Number of order"
                      ? "Order"
                      : "Toman"}
                  </div>
                ),
              }}
              label="intended purpose"
              onKeyPress={(event) => {
                if (event.key === "Enter") send();
              }}
            />
            <p className="mt-3" style={{ fontSize: 12, lineHeight: "20px" }}>
              During the period you can change your target value if required.
              The progress in the target is displayed in the dashboard.
            </p>

            {isDisable ? (
              <>
                <Button
                  className="w-100 u-border-radius-8 mt-4"
                  style={{ fontSize: 15, fontWeight: 500 }}
                  color="primary"
                  variant="contained"
                  size={desktopMatches ? "large" : "medium"}
                  onClick={() => setIsDisable(false)}
                >
                  <EditRoundedIcon style={{ fontSize: 20 }} />
                  <span className="mr-2"> Target editing</span>
                </Button>
                <Button
                  className="w-100 u-border-radius-8 mt-2"
                  style={{ fontSize: 15, fontWeight: 500 }}
                  color="primary"
                  variant="outlined"
                  size={desktopMatches ? "large" : "medium"}
                  onClick={onClose}
                >
                  coming back
                </Button>
              </>
            ) : (
              <Button
                className="w-100 u-border-radius-8 mt-4"
                style={{ fontSize: 15, fontWeight: 500 }}
                color="primary"
                variant="contained"
                size={desktopMatches ? "large" : "medium"}
                onClick={() =>
                  submitTarget(
                    {
                      type: options[selectedIndex].type,
                      value: +persianToEnglishNumber(currentTarget),
                      from_date_time: persianToEnglishNumber(
                        fromDate.format("YYYY-MM-DD")
                      ),
                      to_date_time: persianToEnglishNumber(
                        toDate.format("YYYY-MM-DD")
                      ),
                    },
                    () => {
                      _getJourneyState();
                      setTargetSet(true);
                    }
                  )
                }
              >
                Target adjustment
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = createStructuredSelector({
  journeyData: makeSelectJourneyState(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getJourneyState: () => dispatch(getJourneyState()),
    _updateBusiness: (data, successMessage, failMessage, callback) =>
      dispatch(updateBusiness(data, successMessage, failMessage, callback)),
    _updateJourneyState: (data, callback) =>
      dispatch(updateJourneyState(data, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(TargetingModal);
