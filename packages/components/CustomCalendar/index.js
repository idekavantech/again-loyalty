import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { formatDateObjectToNormal, formatDateToObject } from "../../panel/utils/helpers";
import dayJs from "dayjs";
import moment from "moment";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";

const CustomCalendar = ({
  selectedDayRange,
  setSelectedDayRange,
  submitDate,
  renderFooter = true,
  setCompareToPrevious: setCompareToPreviousprop = null,
  compareToPrevious: compareToPreviousprop = null,
  children = null,
  ...props
}) => {
  const handleSelectedRangeDayChange = ([from, to]) => {
    const formattedFrom = formatDateToObject(from) ?? null;
    const formattedTo = formatDateToObject(to) ?? null;

    setSelectedDayRange({
      from: formattedFrom,
      to: formattedTo,
    });
  };

  const handleSubmit = () => {
    const { from, to } = selectedDayRange;

    const formattedFrom = persianToEnglishNumber(moment(formatDateObjectToNormal(from)).format("YYYY-MM-DD")) ?? null;
    const formattedTo = persianToEnglishNumber(moment(formatDateObjectToNormal(to)).format("YYYY-MM-DD")) ?? null;

    submitDate(formattedFrom, formattedTo);
  };

  const value = useMemo(() => {
    const { from, to } = selectedDayRange;
    const formattedFrom = dayJs(formatDateObjectToNormal(from)) ?? null;
    const formattedTo = dayJs(formatDateObjectToNormal(to)) ?? null;
    return [formattedFrom, formattedTo];
  }, [selectedDayRange]);


  //  MuiDateRangePickerDay-rangeIntervalDayHighlight css-1gbl7yn-MuiDateRangePickerDay-root
  //  css-917ab1-MuiDateRangePickerDay-root




  // css-1o490ea-MuiDateRangePickerDay-rangeIntervalPreview

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDateRangePicker
          sx={{
            [".css-1e6y48t-MuiButtonBase-root-MuiButton-root"]: {
              color: "green",
            },

            [".css-1saecey-MuiButtonBase-root-MuiPickersDay-root-MuiDateRangePickerDay-day"]: {
              background: "green !important",
            },
          }}
          onAccept={handleSubmit}
          onChange={handleSelectedRangeDayChange}
          value={value}
          autoFocus={true}
          calendars={1}
          {...props}
        />
      </LocalizationProvider>
    </>
  );
};

CustomCalendar.PropTypes = {
  setSelectedDayRange: PropTypes.func.isRequired,
  submitDate: PropTypes.func,
  selectedDayRange: PropTypes.object.isRequired,
  setCompareToPrevious: PropTypes.func,
  compareToPrevious: PropTypes.bool,
};

export default CustomCalendar;
