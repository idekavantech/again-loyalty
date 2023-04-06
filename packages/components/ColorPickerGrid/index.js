/*
 *
 * Component to let user pick color from available color
 * Options and return the selected one at end
 *
 */
import { memo, useState } from "react";
import PropTypes from "prop-types";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  bgGrey: {
    backgroundColor: "#DBDCDD",
    marginTop: 10,
    padding: 10,
  },
  flexContainer: {
    display: "flex",
    flex: 1,
    width: "100%",
    marign: "auto",
    textAlign: "center",
    justifyContent: "center",
  },
  item: {
    width: "100%",
    backgroundColor: "#B8D4FE",
    width: 56,
    height: 56,
    margin: 5,
    cursor: "pointer",
    border: "0.5px solid #B2B3B5",
    "&:hover": {
      border: "1px solid #B2B3B5",
    },
  },
  icon: {
    width: "100%",
    height: "100%",
    color: "white",
  },
}));

function ColorPickerGrid({ onPickColor, menuColor }) {
  const classes = useStyles();
  const [pickedColor, setPickedColor] = useState(menuColor);

  // colors list
  const colors_1 = ["#878D91", "#30A432", "#F3512D", "#F5AB23", "#225EB1"];
  const colors_2 = ["#F14BFF", "#C11113", "#6F4412", "#0FB4A9", "#7F53D3"];

  const pick_color = (i) => {
    onPickColor(i);
    setPickedColor(i);
  };

  return (
    <>
      <div className={classes.bgGrey}>
        <div className={classes.flexContainer}>
          {colors_1.map((i) => (
            <div
              key={i}
              className={classes.item}
              onClick={() => pick_color(i)}
              style={{ backgroundColor: i }}
            >
              {pickedColor === i && <CheckIcon className={classes.icon} />}
            </div>
          ))}
        </div>
        <div className={classes.flexContainer}>
          {colors_2.map((i) => (
            <div
              key={i}
              className={classes.item}
              onClick={() => pick_color(i)}
              style={{ backgroundColor: i }}
            >
              {pickedColor === i && <CheckIcon className={classes.icon} />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

ColorPickerGrid.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.func.isRequired,
  onPickColor: PropTypes.func,
};

export default memo(ColorPickerGrid);
