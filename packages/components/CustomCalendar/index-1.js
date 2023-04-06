import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import DatePickerFooter from "../DatePickerFooter";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import PropTypes from "prop-types";
import { useState } from "react";

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
  const [compareToPrevious, setCompareToPrevious] = useState(true);

  const handleCompare = (event) => {
    setCompareToPreviousprop
      ? setCompareToPreviousprop(event.target.checked)
      : setCompareToPrevious(event.target.checked);
  };
  const handleSelectedRangeDayChange = (from, to) => {
    setSelectedDayRange({
      from,
      to,
    });
  };
  return (
    <Calendar
      colorPrimary={process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}
      colorPrimaryLight={hexToRGBA(process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR, "0.2")}
      value={selectedDayRange}
      onChange={setSelectedDayRange}
      shouldHighlightWeekends
      locale="fa"
      {...(renderFooter
        ? {
            renderFooter: () => (
              <>
                <DatePickerFooter
                  submitDate={submitDate}
                  setSelectedDayRange={setSelectedDayRange}
                  handleCompare={handleCompare}
                  compareToPrevious={compareToPreviousprop ?? compareToPrevious}
                  handleSelectedRangeDayChange={handleSelectedRangeDayChange}
                />
                {children}
              </>
            ),
          }
        : {
            renderFooter: () => <>{children}</>,
          })}
      {...props}
    />
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

