import React, { memo } from "react";
import TomanIcon from "@saas/icons/TomanIcon";
import { textTypes } from "@saas/utils/colors";
import useTheme from "@material-ui/core/styles/useTheme";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

const DiscountedPriceView = ({ price, discountedPrice, discountPercent }) => {
  const theme = useTheme();
  const themeColor = theme.palette.secondary.main;

  return (
    <div className="d-flex flex-column justify-content-center align-items-start">
      <div className="d-flex align-items-center justify-content-start">
        <div
          className="ml-1"
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: textTypes.text.disabled,
            textDecoration: "line-through",
          }}
        >
          {priceFormatter(price)}
        </div>
        <div
          className="p-1"
          style={{
            color: themeColor || process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
            backgroundColor: "rgba(0, 80, 255, 0.08)",
            fontSize: 12,
            fontWeight: 700,
            borderRadius: 4,
          }}
        >
          {englishNumberToPersianNumber(discountPercent)}%
        </div>
      </div>
      <div
        className="new-product-card__price"
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: textTypes.text.default,
        }}
      >
        <div className="d-flex align-items-center justify-content-center">
          {priceFormatter(discountedPrice)}{" "}
          <TomanIcon className="mr-1" width={21} height={21} color="#202223" />{" "}
        </div>
      </div>
    </div>
  );
};

export default memo(DiscountedPriceView);
