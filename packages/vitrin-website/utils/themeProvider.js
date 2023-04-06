import createTheme from "@material-ui/core/styles/createTheme";
import { jungleI, strawberryI } from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0050ff",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#00c897",
      contrastText: "#ffffff",
    },
    error: {
      main: strawberryI,
    },
    success: {
      main: jungleI,
    },
  },
  typography: {
    fontFamily: "dana",
  },
  props: {
    MuiUseMediaQuery: {
      options: { noSsr: true },
    },
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow: "0px 0px 20px rgba(204, 212, 215, 0.2)",
        borderRadius: "20px",
      },
      elevation2: {
        boxShadow: "0px 0px 12px rgba(102, 126, 138, 0.08)",
        borderRadius: "8px",
      },
    },
    MuiInputLabel: {
      outlined: {
        transformOrigin: "top right",
        fontSize: 14,
        transform: "translate(-12px, 20px) scale(1)",
        zIndex: 1,
        right: 0,
        pointerEvents: "none",
        "&.MuiInputLabel-shrink": {
          transform: "translate(-10px, -6px) scale(0.75)",
          right: 0,
          left: "unset",
        },
        "&.medium": {
          transform: "translate(-12px, 12px) scale(1)",
          "&.MuiInputLabel-shrink": {
            transform: "translate(-10px, -6px) scale(0.75)",
            right: 0,
            left: "unset",
          },
        },
        "&.small": {
          transform: "translate(-12px, 10px) scale(1)",
          "&.MuiInputLabel-shrink": {
            transform: "translate(-10px, -6px) scale(0.75)",
            right: 0,
            left: "unset",
          },
        },
      },
      formControl: {
        fontFamily: "inherit",
        left: "auto",
        fontSize: 16,
      },
    },
    MuiOutlinedInput: {
      multiline: {
        height: "auto",
      },
      root: {
        background: "#ffffff",
      },
    },
    MuiFormHelperText: {
      root: {
        textAlign: "right",
      },
    },
    MuiSnackbarContent: {
      root: {
        flexDirection: "row-reverse",
      },
    },
  },
});
export default theme;
