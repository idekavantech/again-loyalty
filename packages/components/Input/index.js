/* eslint-disable no-param-reassign */
/* eslint-disable react/no-danger */
/**
 *
 * Input
 *
 */

import React, { memo, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { noOp } from "@saas/utils/helpers/noOp";
import { reversePriceFormatter } from "@saas/utils/helpers/reversePriceFormatter";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import styled from "styled-components";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import withStyles from "@material-ui/core/styles/withStyles";
import { strawberryI, text } from "@saas/utils/colors";

const StyledTextField = styled(TextField)(({ formTheme }) => ({
  "& .MuiInput-underline:after": {
    borderBottomColor: formTheme || "",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: formTheme || "",
    },
    "&:hover fieldset": {
      borderColor: formTheme || "",
    },
    "&.Mui-focused fieldset": {
      borderColor: formTheme || "",
    },
  },
  "& .MuiFormLabel-root": {
    color: formTheme || "",
  },
  "& .Mui-focused.MuiFormLabel-root": {
    color: formTheme || "",
  },
  "& input": {
    color: formTheme || "",
  },
}));

function Input(componentProps) {
  const {
    className = "direction-rtl",
    classes,
    onChange = noOp,
    value,
    type,
    label,
    labelPlacement = "inline",
    numberOnly,
    tableInput = false,
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
    formTheme = {},
    selectOnFocus = false,
    containerProps,
    variant = "outlined",
    noHelperText,
    placeholder,
    labelClassName,
    required = false,
    ...props
  } = componentProps;
  const [tmpValue, setValue] = useState(
    priceInput ? priceFormatter(value) : value
  );
  const [assistiveText, setAssistiveText] = useState(assistive);
  useEffect(() => {
    setAssistiveText(assistive);
  }, [assistive]);

  if (tableInput)
    return (
      <OutlinedInput
        {...componentProps}
        classes={classes}
        onBlur={(e) => {
          setAssistiveText("");
          onBlur(e);
        }}
        onFocus={(e) => {
          if (selectOnFocus) e.target.select();
          (componentProps.onFocus || noOp)(e);
        }}
        error={Boolean(error || assistiveText)}
        onChange={(e) => {
          if (priceInput) {
            setValue(
              persianToEnglishNumber(
                e.target.value.replace(/[^0-9۰-۹/.-]/g, ""),
                ""
              )
            );
            onChange(
              persianToEnglishNumber(
                e.target.value.replace(/[^0-9۰-۹/.-]/g, ""),
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
      />
    );
  return (
    <>
      <div
        className={`${fullWidth ? "w-100" : ""} d-flex flex-column`}
        {...containerProps}
      >
        {labelPlacement === "top" ? (
          <div
            style={{
              color: props.disabled ? "rgba(0, 0, 0, 0.38)" : text.default,
            }}
            className={`mb-2 u-fontWeightHeavy u-font-semi-small ${
              labelClassName || ""
            }`}
          >
            {label} {required ? <span style={{ color: "red" }}>*</span> : ""}
          </div>
        ) : null}
        <StyledTextField
          multiline={multiline}
          formTheme={formTheme}
          variant={variant}
          placeholder={placeholder}
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
              if (
                persianToEnglishNumber(e.target.value).match(/^[+-]?[0-9]*$/)
              ) {
                setAssistiveText("");
                setValue(
                  persianToEnglishNumber(
                    e.target.value.replace(/[^0-9۰-۹/.-]/g, ""),
                    ""
                  )
                );
                onChange(
                  persianToEnglishNumber(
                    e.target.value.replace(/[^0-9۰-۹/.-]/g, ""),
                    ""
                  )
                );
              } else setAssistiveText("تنها مجاز به وارد کردن عدد هستید.");
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
      border: `1px solid ${process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}`,
      "&$error": {
        border: `1px solid ${strawberryI}`,
      },
    },
  },
  input: {
    padding: 0,
  },
  focused: {},
  error: {},
  notchedOutline: {},
});
export default memo(withStyles(styles)(Input));
