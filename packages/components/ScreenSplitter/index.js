import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

function ScreenSplitter({ left, right, sizes = [6, 6] }) {
  return (
    <Grid container spacing={2} style={{ padding: 10 }}>
      <Grid item sm={sizes[0]} xs={12}>
        {right()}
      </Grid>
      <Grid item sm={sizes[1]} xs={12}>
        {left()}
      </Grid>
    </Grid>
  );
}

ScreenSplitter.PropTypes = {
  left: PropTypes.object.isRequired,
  right: PropTypes.object.isRequired,
  sizes: PropTypes.array,
};

export default ScreenSplitter;
