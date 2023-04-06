import React, { memo } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

function SocialInputs({
  socialPlaceholder,
  socialIcon: IconComponent,
  value,
  onChange,
  onBlur,
  error,
}) {
  return (
    <TextField
      className="w-100"
      id="input-with-icon-textfield"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={socialPlaceholder}
      variant="outlined"
      onBlur={onBlur}
      error={error}
      helperText={error}
      InputProps={{
        className: "medium",
        startAdornment: (
          <InputAdornment position="start">
            <IconComponent fontSize="medium" />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default memo(SocialInputs);
