import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import Input from "@saas/components/Input";
import useTheme from "@material-ui/core/styles/useTheme";
function LocationSelector({ items = [], value, onChange, ...props }) {
  const theme = useTheme();
  return (
    <div
      style={{ backgroundColor: theme.palette.background.paper }}
      className="w-100 px-4 py-2 d-flex align-items-center justify-content-between"
    >
      <IconButton size="small">
        <ArrowForwardIosRoundedIcon
          onClick={() => {
            const currentIndex = items.findIndex(
              (item) => item.value === value
            );
            if (currentIndex >= 0) {
              const nextIndex =
                (currentIndex + items.length - 1) % items.length;
              onChange(items[nextIndex].value);
            }
          }}
          fontSize="small"
          color="primary"
        />
      </IconButton>
      <Select
        {...props}
        variant="outlined"
        style={{ minWidth: 100, border: "none" }}
        className="medium"
        value={value}
        onChange={onChange}
        inputProps={{
          className: "u-fontWeightBold mt-1 u-fontMedium",
        }}
        IconComponent={() => (
          <ArrowDropDownRoundedIcon
            style={{ marginRight: -16 }}
            color="primary"
            className="u-pointer-events-none"
            size="small"
          />
        )}
        input={<Input tableInput />}
      >
        {items.map((item) => (
          <MenuItem value={item.value} key={item.value}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
      <IconButton
        size="small"
        onClick={() => {
          const currentIndex = items.findIndex((item) => item.value === value);
          if (currentIndex >= 0) {
            const nextIndex = (currentIndex + 1) % items.length;
            onChange(items[nextIndex].value);
          }
        }}
      >
        <ArrowForwardIosRoundedIcon
          fontSize="small"
          color="primary"
          style={{ transform: "rotate(180deg)" }}
        />
      </IconButton>
    </div>
  );
}

export default LocationSelector;
