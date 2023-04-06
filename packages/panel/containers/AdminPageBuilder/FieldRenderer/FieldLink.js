import Input from "@saas/components/Input";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import useTheme from "@material-ui/core/styles/useTheme";
import { memo } from "react";

const FieldLink = ({ links, _setValue, label, value }) => {
  const theme = useTheme();
  return (
    <Autocomplete
      options={links}
      autoHighlight
      onChange={(event, newValue) => {
        _setValue(newValue?.value || "");
      }}
      PaperComponent={(props) => (
        <Paper
          {...props}
          style={{
            ...props.style,
            marginTop: 4,
            borderRadius: "0 0 4px 4px",
          }}
          elevation={3}
        />
      )}
      style={{ marginTop: 20 }}
      value={
        links && links.find((link) => link.value === value)
          ? links.find((link) => link.value === value)
          : { label: "" }
      }
      getOptionLabel={(option) => option.label}
      renderOption={(option) => (
        <div>
          <div>{option.label}</div>
          <div style={{ color: "#70767c", fontSize: 12, direction: "ltr" }}>
            {option.value}
          </div>
        </div>
      )}
      ListboxProps={{ style: { fontSize: 13 } }}
      renderInput={(params) => (
        <Input
          {...params}
          size="medium"
          label={label}
          InputProps={{
            ...params.InputProps,
            className: "pr-2 pl-5",

            endAdornment: (
              <InputAdornment
                style={{ position: "absolute", left: 3 }}
                className="u-pointer-events-none"
                position="start"
              >
                <SearchRoundedIcon
                  className="ml-1"
                  style={{ color: theme.palette.text.disabled }}
                  fontSize="small"
                />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default memo(FieldLink);
