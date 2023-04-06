/* eslint-disable no-param-reassign */
/* eslint-disable react/no-danger */
/**
 *
 * Input
 *
 */

import React, { memo, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";

import { reversePriceFormatter } from "utils/helpers/reversePriceFormatter";
import { priceFormatter } from "utils/helpers/priceFormatter";
import { noOp } from "utils/helpers/noOp";
import { persianToEnglishNumber } from "utils/helpers/persianToEnglishNumber";
import withStyles from "@material-ui/core/styles/withStyles";
import { oceanI, strawberryI, text } from "utils/colors";

function Input(componentProps) {
  const {
    className = "direction-rtl",
    onChange = noOp,
    value,
    type,
    label,
    labelPlacement = "inline",
    numberOnly,
    isFloat = false,
    multiline,
    onBlur = noOp,
    priceInput,
    size = "",
    InputLabelProps = { className: "" },
    InputProps = { className: "" },
    assistive = "",
    fullWidth = true,
    helperText,
    error,
    inputProps = {},
    selectOnFocus = false,
    containerProps,
    variant = "outlined",
    noHelperText,
    ...props
  } = componentProps;
  const [tmpValue, setValue] = useState(
    priceInput ? priceFormatter(value) : value
  );
  const [assistiveText, setAssistiveText] = useState(assistive);
  useEffect(() => {
    setAssistiveText(assistive);
  }, [assistive]);

  return (
    <>
      <div
        className={`${fullWidth ? "w-100" : ""} d-flex flex-column`}
        {...containerProps}
      >
        {labelPlacement === "top" ? (
          <div
            style={{ color: text.default }}
            className="mb-2 u-fontWeightHeavy u-font-semi-small"
          >
            {label}
          </div>
        ) : null}
        <TextField
          multiline={multiline}
          variant={variant}
          InputProps={{
            ...InputProps,
            className: `${size} ${InputProps.className}`,
          }}
          inputProps={{
            ...inputProps,
            className:
              inputProps.className ||
              (numberOnly || isFloat ? `direction-ltr text-right` : ""),
          }}
          error={Boolean(error || assistiveText)}
          helperText={noHelperText ? "" : assistiveText || helperText}
          InputLabelProps={{
            ...InputLabelProps,
            className: `${size} medium ${InputLabelProps.className}`,
          }}
          onFocus={(e) => {
            if (selectOnFocus) e.target.select();
            (componentProps.onFocus || noOp)(e);
          }}
          onBlur={(e) => {
            onBlur(e);
            if (priceInput) setValue(priceFormatter(value));
          }}
          type={type}
          fullWidth={fullWidth}
          className={`u-fontLarge ${className}`}
          value={
            priceInput
              ? reversePriceFormatter(tmpValue) === reversePriceFormatter(value)
                ? tmpValue
                : value
              : value
          }
          onChange={(e) => {
            if (priceInput) {
              setValue(
                persianToEnglishNumber(
                  e.target.value.replace(/[^0-9۰-۹/.]/g, ""),
                  ""
                )
              );
              onChange(
                persianToEnglishNumber(
                  e.target.value.replace(/[^0-9۰-۹/.]/g, ""),
                  ""
                )
              );
            } else {
              setValue(e.target.value);
              if (numberOnly) {
                if (
                  persianToEnglishNumber(e.target.value).match(/^[+-]?[0-9]*$/)
                ) {
                  setAssistiveText("");
                  onChange(persianToEnglishNumber(e.target.value));
                } else setAssistiveText("تنها مجاز به وارد کردن عدد هستید.");
              } else if (isFloat) {
                if (e.target.value?.[0] === "-") {
                  setAssistiveText("عدد بزرگتر از صفر وارد کنید.");
                  return;
                }
                if (
                  persianToEnglishNumber(e.target.value).match(
                    /^[+-]?([0-9]*[.])?[0-9]*$/
                  )
                ) {
                  setAssistiveText("");
                  onChange(persianToEnglishNumber(e.target.value));
                } else setAssistiveText("عدد اعشاری وارد کنید.");
              } else onChange(e.target.value);
            }
          }}
          label={labelPlacement === "inline" ? label : ""}
          {...props}
        />
      </div>
    </>
  );
}

Input.defaultProps = {
  className: "direction-rtl",
  type: "text",
};
const styles = () => ({
  root: {
    borderRadius: 0,

    "& $notchedOutline": {
      border: "none",
    },
    "&:hover $notchedOutline": {
      border: "none",
    },
    "&$focused": {
      border: `1px solid ${oceanI}`,
      "&$error": {
        border: `1px solid ${strawberryI}`,
      },
    },
  },
  error: {},
});
export default memo(withStyles(styles)(Input));
