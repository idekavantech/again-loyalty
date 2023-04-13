/* eslint-disable no-param-reassign */
import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";

const MaterialSelect = ({
  options,
  selectOption,
  inputData,
  menuHeader = null,
  selected,
  FormControlProps,
  defaultValueClassName = "",
  ...props
}) => {
  const { label, value = "", defaultValue } = inputData;
  return (
    <>
      <FormControl {...FormControlProps} className="w-100">
        <InputLabel className="select-label" id="select-label">
          {label}
        </InputLabel>
        <Select
          labelId="select-label"
          className="w-100"
          value={defaultValue || value}
          onChange={(e) => selectOption(e.target.value)}
          variant="outlined"
          {...props}
        >
          {menuHeader}
          {defaultValue && (
            <MenuItem className="d-none" value={defaultValue}>
              <div className={defaultValueClassName}>{defaultValue}</div>
            </MenuItem>
          )}
          {options &&
            options.map((o) => (
              <MenuItem className="u-fontNormal d-flex justify-content-between px-2" key={o.id} value={o.text}>
                  {o.text}
                {selected !== undefined && (
                  <Radio
                    className="p-1"
                    size="small"
                    color="primary"
                    checked={selected && selected.id === o.id}
                  />
                )}
              
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
};

export default MaterialSelect;
