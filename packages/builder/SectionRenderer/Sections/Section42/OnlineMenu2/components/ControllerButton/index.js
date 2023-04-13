import { memo } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import AddIcon from "@material-ui/icons/Add";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";

const ProductAmountController = ({
  amount,
  disabled,
  increment,
  decrement,
  customization,
  isMobile,
}) => {
  const theme = useTheme();
  const themeColor = theme.palette.secondary.main;
  const { colors: { use_theme_color, card_theme_color } = {} } = customization;
  return amount > 0 ? (
    <div
      className="w-100"
      style={{
        boxSizing: "border-box",
        padding: isMobile ? "0 12px 0 0" : "0px 12px",
        ...(isMobile && { width: "40%" }),
      }}
    >
      <div
        style={{
          border: `1px solid ${
            use_theme_color ? themeColor : card_theme_color
          }`,
          borderRadius: 8,
          color: use_theme_color ? themeColor : card_theme_color,
          width: "100%",
          height: 33,
          fontSize: 13,
          fontWeight: 400,
        }}
        className={`w-100 h-100 px-2 d-flex align-items-center justify-content-between online-menu-card${
          isMobile ? "" : "-desktop"
        }__button`}
      >
        <div
          style={{ lineHeight: 0.5, cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) {
              increment();
            }
          }}
        >
          <AddIcon style={{ fontSize: 18 }} className="w-100 h-100" />
        </div>
        <div>{englishNumberToPersianNumber(amount)}</div>
        <div
          style={{ lineHeight: 0.5, cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            decrement();
          }}
        >
          <RemoveRoundedIcon style={{ fontSize: 18 }} className="w-100 h-100" />
        </div>
      </div>
    </div>
  ) : (
    <div
      className=" w-100"
      style={{
        boxSizing: "border-box",
        padding: isMobile ? "0 12px 0 0" : "0px 12px",
        ...(isMobile && { width: "40%" }),
      }}
    >
      <div
        disabled={disabled}
        className={`w-100 h-100 d-flex align-items-center justify-content-center w-100 online-menu-card${
          isMobile ? "" : "-desktop"
        }__button`}
        style={{
          height: 32,
          width: "100%",
          fontSize: 12,
          fontWeight: 400,
          backgroundColor: use_theme_color ? themeColor : card_theme_color,
          color: "white",
          borderRadius: 8,
          boxSizing: "border-box",
          cursor: disabled ? "" : "pointer",
          lineHeight: "16px",
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) {
            increment();
          }
        }}
      >
        <AddIcon style={{ fontSize: 16 }} className="w-100 h-100 ml-1" /> Add
      </div>
    </div>
  );
};

export default memo(ProductAmountController);
