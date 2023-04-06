import { memo } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import { textTypes } from "@saas/utils/colors";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import AddIcon from "@material-ui/icons/Add";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const ProductAmountController = ({
  amount,
  disabled,
  increment,
  decrement,
}) => {
  const {maxWidth768} = useResponsive()

  const theme = useTheme();
  const themeColor = theme.palette.secondary.main;
  return amount > 0 ? (
    <div className="d-flex align-items-center">
      <div
        disabled={disabled}
        className="h-100  d-flex align-items-center justify-content-center"
        style={{
          padding: maxWidth768 ? 14 : 17,
          color: !disabled ? "white" : textTypes.text.disabled,
          backgroundColor: !disabled ? themeColor : "inherit",
          maxWidth: 10.5,
          minWidth: 10.5,
          minHeight: 10.5,
          maxHeight: 10.5,
          border: !disabled
            ? `1px solid ${themeColor}`
            : `1px solid ${textTypes.text.disabled}`,
          borderRadius: 8,
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) {
            increment();
          }
        }}
      >
        <AddIcon style={{ fontSize: 18 }} className="w-100 h-100" />
      </div>
      <div
        style={{
          fontSize: 14,
          width: 12,
          fontWeight: 600,
          color: textTypes.text.default,
        }}
        className={`${
          maxWidth768 ? "mx-1" : "mx-2"
        } d-flex align-items-center justify-content-center`}
      >
        {englishNumberToPersianNumber(amount)}
      </div>
      <div
        className="h-100  d-flex align-items-center justify-content-center"
        style={{
          padding: maxWidth768 ? 14 : 17,
          color: "white",
          backgroundColor: themeColor,
          maxWidth: 10.5,
          minWidth: 10.5,
          minHeight: 10.5,
          maxHeight: 10.5,
          border: `1px solid ${themeColor}`,
          borderRadius: 8,
          cursor: "pointer",
        }}
        onClick={(e) => {
          e.stopPropagation();
          decrement();
        }}
      >
        {amount === 1 ? (
          <DeleteOutlineIcon style={{ fontSize: 18 }} className="w-100 h-100" />
        ) : (
          <RemoveRoundedIcon style={{ fontSize: 18 }} className="w-100 h-100" />
        )}
      </div>
    </div>
  ) : (
    <div
      disabled={disabled}
      className="h-100 d-flex align-items-center justify-content-center"
      style={{
        padding: maxWidth768 ? 14 : 17,
        color: !disabled ? themeColor : "#ccc",
        maxWidth: 10.5,
        minWidth: 10.5,
        minHeight: 10.5,
        maxHeight: 10.5,
        border: !disabled ? `1px solid ${themeColor}` : "1px solid #ccc",
        borderRadius: 8,
        cursor: disabled ? "" : "pointer",
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!disabled) {
          increment();
        }
      }}
    >
      <AddIcon style={{ fontSize: 18 }} className="w-100 h-100" />
    </div>
  );
};

export default memo(ProductAmountController);
