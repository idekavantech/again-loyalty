import createTheme from "@material-ui/core/styles/createTheme";
import {
  jungleI,
  peachI,
  skyI,
  white,
  strawberryI,
  coal,
  graphite,
  pollution,
  dust,
  tiramisoo,
  vanilla,
  night,
  smoke,
  surface,
  skyIII,
} from "./colors";
import { hexToRGBA } from "./helpers/hexToRGBA";
const baseTheme = (business, isAdminPanel) => ({
  typography: {
    button: {
      fontSize: "14px",
      fontWeight: 700,
    },
    htmlFontSize: 16,
  },
});

const lightTheme = (business, isAdminPanel) =>
  createTheme({
    ...baseTheme(business, isAdminPanel),
    palette: {
      type: "light",
      primary: {
        main: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
        contrastText: white,
      },
      secondary: {
        main: business?.theme_config?.theme_color || process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
        contrastText: white,
      },
      success: {
        main: jungleI,
      },
      error: {
        main: strawberryI,
      },
      warning: {
        main: peachI,
      },
      info: {
        main: skyI,
        dark: skyIII,
      },
      text: {
        primary: coal,
        secondary: graphite,
        disabled: pollution,
        tertiary: night,
        quaternary: smoke,
      },
      background: {
        default: white,
        paper: vanilla,
        secondary: dust,
      },
      divider: tiramisoo,
    },
    overrides: {
      MuiTableBody: {
        root: {
          direction: "ltr",
          textAlign:"left"
        },
      },
      MuiTableHead: {
        root: {
          direction: "ltr",
          textAlign:"left"
        },
      },
      MuiTablePagination: {
        root: {
          direction: "rtl",
          textAlign:"left"
        },
      },
      MuiTableRow: {
        root: {
          direction: "ltr",
          "&.Mui-selected": {
            backgroundColor: hexToRGBA(process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR, 0.08),
          },
        },
        hover: {
          "&.MuiTableRow-root:hover": {
            backgroundColor: hexToRGBA(process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR, 0.04),
          },
        },
      },
      MuiPaper: {
        root: {
          direction: "ltr",
        },
        elevation0: {
          boxShadow: "0px 0px 20px rgba(204, 212, 215, 0.2)",
          borderRadius: 8,
          background: "white",
        },
        elevation1: {
          boxShadow: "unset",
          borderRadius: 8,
          border: "1px solid #EDEDED",
          background: "white",
        },
        elevation2: {
          boxShadow: "unset",
          borderRadius: 8,
          border: "1px solid #EDEDED",
          background: "white",
        },
        elevation3: {
          boxShadow: "0 0px 4px 0px rgb(0 0 0 / 10%)",
          borderRadius: 8,
          background: "white",
        },
      },
      MuiMenuItem: {
        root: {
          fontSize: "unset",
          direction:"ltr",
          textAlign:"left"
        },
      },
      MuiInputBase: {
        root: {
          direction: "ltr",
          transformOrigin: "top right",
          fontSize: 16,

          "&.medium": {
            height: 40,
            fontSize: 14,
          },
          "&.small": {
            height: 36,
            fontSize: 13,
          },
          "&.multiline": {
            height: "auto",
            fontSize: 14,
            padding: "-10px 0px",
          },
        },
        input: {
          ".placeholder-error&::placeholder": {
            opacity: 1,
            color: strawberryI,
          },
          "&.placeholder-active&::placeholder": {
            color: night,
            opacity: 1,
          },
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
      },
      MuiTableCell: {
        root: {
          borderBottom: "unset",
          color: night,
          direction:"ltr",
          textAlign:"left"
        },
        sizeSmall: {
          padding: "6px 16px 6px 24px",
        },
      },
      MuiSelect: {
        icon: {
          left: "calc(100% - 30px)",
        },
        root: {
          direction: "ltr",
          textAlign: "left",
        },
        outlined: {
          paddingRight: 10,
          paddingLeft: 24,
        },
      },
      MuiFormHelperText: {
        root: {
          textAlign: "left",
        },
      },
      MuiChip: {
        deleteIcon: {
          margin: "0 -6px 0 5px",
        },
        deleteIconSmall: {
          marginLeft: 4,
          marginRight: -4,
        },
      },
      MuiLinearProgress: {
        bar: {
          left: "100%",
        },
        barColorPrimary: {
          backgroundColor: surface.highlight.default,
          borderRadius: 4,
        },
      },
    },
    props: {
      MuiUseMediaQuery: {
        options: { noSsr: true },
      },
    },
  });
export const themeCreator = (business, isAdminPanel, ssrMatchMedia, isServer) =>
  lightTheme(business, isAdminPanel, ssrMatchMedia, isServer);
