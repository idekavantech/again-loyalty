import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import InputAdornment from "@material-ui/core/InputAdornment";
import useTheme from "@material-ui/core/styles/useTheme";
import { memo } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from "@material-ui/core/Paper";
import Input from "@saas/components/Input";
import { makeSelectResourceLabels } from "@saas/stores/business/selector";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

const FieldCategorySelect = ({ setValue, categories, label, value }) => {
  const theme = useTheme();

  return (
    <Autocomplete
      options={categories}
      autoHighlight
      onChange={(event, newValue) => {
        setValue(newValue.id);
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
      getOptionLabel={(option) => option.title}
      renderOption={(option) => <span>{option.title}</span>}
      ListboxProps={{ style: { fontSize: 13 } }}
      value={categories.find((dc) => dc.id === value) || ""}
      renderInput={(params) => (
        <Input
          {...params}
          size="medium"
          label={label || "products categorization"}
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

const mapStateToProps = createStructuredSelector({
  categories: makeSelectResourceLabels(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, memo)(FieldCategorySelect);
