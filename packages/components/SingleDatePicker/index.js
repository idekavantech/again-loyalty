import React from "react";
import momentUtils from "@date-io/moment";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";


function SingleDatePicker({
  inputProps,
  InputLabelProps,
  selectedDate,
  handleDateChange,
  placeholder,
  isDisabled,
  disableFuture = true,
  label,
  error,
}) {
  return (
    <MuiPickersUtilsProvider utils={momentUtils} locale="en">
      <DatePicker
        clearable
        okLabel="submit"
        cancelLabel="cancel"
        clearLabel="clear"
        // label={label}
        inputVariant="outlined"
        className="w-100"
        inputProps={inputProps}
        InputLabelProps={InputLabelProps}
        // labelFunc={(date) => (date ? date.format("YYYY/MM/DD") : "")}
        value={selectedDate || null}
        disableFuture={disableFuture}
        autoOk
        onChange={handleDateChange}
        placeholder={placeholder}
        disabled={isDisabled}
        error={error}
        helperText={error}
      />
    </MuiPickersUtilsProvider>
  );
}
export default SingleDatePicker;
