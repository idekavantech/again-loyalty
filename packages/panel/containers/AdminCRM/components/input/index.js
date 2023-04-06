import { TextField, TextFieldProps } from "@material-ui/core";
import PropTypes from "prop-types";

function CustomInput({ InputProps }) {
  return (
    <div>
      <TextField
        // error={true}
        style={{borderRadius:8}}
        inputProps={{ style: { borderRadius:8 } }}
        variant="outlined"
        {...InputProps}
      />
    </div>
  );
}

export default CustomInput;
CustomInput.propTypes = {
  InputProps: TextFieldProps,
  onchange: PropTypes.func,
  value: PropTypes.any,
};
