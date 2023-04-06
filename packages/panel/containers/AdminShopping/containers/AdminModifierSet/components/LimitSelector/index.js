import React, { useCallback, useState } from "react";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Input from "@saas/components/Input";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function LimitSelector({
  optionMaxNumber,
  onChange,
  inputValue,
  ...props
}) {
  const [editable, setEditable] = useState(false);

  const getOptionFromValue = useCallback(
    (value) => ({
      value,
      label:
        value === null || value === undefined
          ? "Unlimited"
          : englishNumberToPersianNumber(value),
    }),
    []
  );
  return (
    <Autocomplete
      id="combo-box-demo"
      disableClearable
      freeSolo
      openOnFocus={false}
      ListboxProps={{ className: "u-font-semi-small" }}
      size="medium"
      className="flex-1"
      value={getOptionFromValue(inputValue)}
      options={[
        { value: null, label: "Unlimited" },
        { value: "", label: "The desired number" },
        ...Array.from(Array(optionMaxNumber)).map((_, value) => ({
          value,
          label: englishNumberToPersianNumber(value),
        })),
      ]}
      onChange={(e, option) => {
        setEditable(option.value === "");
        if (option.value === "" || option.value === null)
          onChange(option.value);
        else onChange(parseInt(option.value));
      }}
      inputValue={
        inputValue || inputValue === 0
          ? englishNumberToPersianNumber(inputValue)
          : inputValue === null || inputValue === undefined
          ? "Unlimited"
          : ""
      }
      onInputChange={(event, newInputValue) => {
        if (
          event?.type === "change" &&
          persianToEnglishNumber(newInputValue).match(/^[+-]?[0-9]*$/)
        )
          onChange(parseInt(persianToEnglishNumber(newInputValue)));
      }}
      filterOptions={(a) => a}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <Input
          {...params}
          variant="outlined"
          size="medium"
          inputProps={{
            ...params.inputProps,
            className: editable
              ? "p-0"
              : "no-input-cursor u-cursor-pointer p-0",
          }}
        />
      )}
      {...props}
    />
  );
}
