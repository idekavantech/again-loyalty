import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import useTheme from "@material-ui/core/styles/useTheme";

import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Input from "../Input";

function FreeSelect({ options, value, onChange }) {
  const theme = useTheme();
  return (
    <Autocomplete
      id="combo-box-demo"
      disableClearable
      disableCloseOnSelect
      freeSolo
      style={{ height: 43 }}
      options={options}
      inputValue={value ? englishNumberToPersianNumber(value) : ""}
      onInputChange={(event, newInputValue) => {
        if (event)
          onChange(
            persianToEnglishNumber(newInputValue.replace(/[^0-9۰-۹:]/g, ""))
          );
      }}
      filterOptions={(a) => a}
      getOptionLabel={(time) => time.label}
      renderInput={(params) => (
        <Input
          {...params}
          variant="outlined"
          themeColor={theme.palette.primary.main}
        />
      )}
    />
  );
}

export default FreeSelect;
