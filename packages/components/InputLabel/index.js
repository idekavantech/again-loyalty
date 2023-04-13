/*
 *
 * A input component with filled label at side of it
 *
 */
import { memo, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
    flexBasis: 50,
    width: "100%",
  },
  label: {
    backgroundColor: "#C2C7CC",
    width: "100%",
    color: "black",
    fontSize: 18,
    border: "none",
    padding: 10,
  },
  inputContainer: {
    backgroundColor: "white",
    height: 45,
    width: "100%",
    fontSize: 18,
    border: "1px solid #DBDCDD",
    "&:focus": {
      border: "1px solid #006AFF",
    },
    "&:hover": {
      border: "1px solid #006AFF",
    },
  },
  input: {
    width: "100%",
    height: "100%",
    outline: "blue",
    padding: 10,
  },
}));

function InputLabel({
  placeholder = "Menu name",
  questionLabel = "Menu name",
  onChange,
  note,
  menuName = "",
}) {
  const classes = useStyles();

  useEffect(() => {
    // set the input value
    // to placeholder provider
    if (placeholder) {
      onChange({ target: { value: placeholder } });
    }
    // eslint-disable-next-line
  }, [placeholder]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.label}>
          <p>{questionLabel}</p>
        </div>
        <div className={classes.inputContainer}>
          <input
            className={classes.input}
            placeholder={placeholder}
            onChange={onChange}
            value={menuName}
          />
        </div>
      </div>
      {note && <p style={{ marginTop: 7, fontSize: 12 }}>{note}</p>}
    </>
  );
}

InputLabel.propTypes = {
  placeholder: PropTypes.string.isRequired,
  note: PropTypes.string,
  questionLabel: PropTypes.string,
  onChange: PropTypes.func,
  menuName: PropTypes.string,
};

export default memo(InputLabel);
