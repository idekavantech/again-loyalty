import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles(() => ({
  inputContainer: {
    width: "100% !important",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: "15px !important",
  },
}));

export default function SearchFilter({ onChange }) {
  const classes = useStyles();

  return (
    <TextField
      id="outlined-basic"
      className={classes.inputContainer}
      placeholder="Search product name"
      variant="outlined"
      onChange={onChange}
      InputProps={{
        autoComplete: "off",
        startAdornment: (
          <InputAdornment style={{ marginRight: 10 }}>
            <SearchIcon style={{ color: "#B5B9BC" }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
