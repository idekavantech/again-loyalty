import React from "react";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import useTheme from "@material-ui/core/styles/useTheme";

export default function EmptyResults() {
  const theme = useTheme();
  return (
    <div className="d-flex flex-1 justify-content-center align-items-center flex-column">
      <SearchRoundedIcon className="u-fontExtreme" color="disabled" />
      <div
        style={{ color: theme.palette.text.disabled }}
        className="u-fontWeightBold mt-4"
      >
        There was no result
      </div>
    </div>
  );
}
