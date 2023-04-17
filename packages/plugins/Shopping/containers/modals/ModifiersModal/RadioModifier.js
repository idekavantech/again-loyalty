import React from "react";
import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Radio from "@material-ui/core/Radio";
import useTheme from "@material-ui/core/styles/useTheme";
import Tooltip from "@material-ui/core/Tooltip";
import { textTypes } from "@saas/utils/colors";
import TomanIcon from "@saas/icons/TomanIcon";

export default function RadioModifier({
  modifier,
  modifierSet,
  modifiersAmounts,
  setModifiersAmounts,
  couldShop = true,
  isAvailable,
}) {
  const checked =
    modifiersAmounts?.[modifierSet.id]?.some((ms) => ms.id === modifier.id) ||
    false;
  const theme = useTheme();
  const themeColor = theme.palette.secondary.main;
  const modifierHasDiscount =
    modifier?.discounted_price &&
    modifier?.initial_price &&
    modifier?.discounted_price !== modifier?.initial_price;
  const discountPercent = calculateDiscountPercent(
    modifier?.initial_price,
    modifier?.discounted_price
  );
  const onClick = () => {
    const newModifiersCheckbox = {
      ...modifiersAmounts,
    };
    newModifiersCheckbox[modifierSet.id] = [
      {
        ...modifier,
        amount: 1,
      },
    ];
    setModifiersAmounts(newModifiersCheckbox);
  };
  return (
    <div className="d-flex w-100 justify-content-between">
      {couldShop ? (
        <div className="d-flex align-items-start">
          <Radio
            checked={checked}
            disabled={!isAvailable}
            onClick={onClick}
            style={{ color: checked ? themeColor : "#E4E6E7" }}
          />
          <Title modifier={modifier} />
        </div>
      ) : (
        <Tooltip placement="top" title="We do not accept the order.">
          <div className="d-flex align-items-start">
            <Radio
              checked={checked}
              onClick={() => {
                if (couldShop) onClick();
              }}
              style={{ color: checked ? themeColor : "#E4E6E7" }}
            />
            <Title modifier={modifier} />
          </div>
        </Tooltip>
      )}

      <div className="flex-1 justify-content-end align-items-center d-flex">
        {modifierHasDiscount ? (
          <div className="d-flex flex-column justify-content-center align-items-start">
            <div className="d-flex align-items-center justify-content-start">
              <div
                className="ml-2"
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: textTypes.text.disabled,
                  textDecoration: "line-through",
                }}
              >
                {priceFormatter(modifier?.initial_price)}
              </div>
              <div
                className="p-1"
                style={{
                  color: themeColor,
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
              className="d-flex align-items-center justify-content-center"
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: textTypes.text.default,
              }}
            >
              {priceFormatter(modifier?.discounted_price)}{" "}
              <TomanIcon
                className="mr-1"
                width={21}
                height={21}
                color="#202223"
              />{" "}
            </div>
          </div>
        ) : modifier.discounted_price ? (
          <div className="justify-content-center align-items-center d-flex">
            {priceFormatter(modifier.discounted_price)}{" "}
            <TomanIcon
              className="mr-1"
              width={21}
              height={21}
              color="#202223"
            />{" "}
          </div>
        ) : (
          "Free"
        )}
      </div>
    </div>
  );
}

const Title = ({ modifier }) => {
  return (
    <div
      style={{
        maxWidth: "calc(100% - 40px)",
      }}
      className="pr-3 text-right pt-2"
    >
      {modifier.title}
    </div>
  );
};
