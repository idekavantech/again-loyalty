import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import useTheme from "@material-ui/core/styles/useTheme";
import Tooltip from "@material-ui/core/Tooltip";
import TomanIcon from "@saas/icons/TomanIcon";
import { textTypes } from "@saas/utils/colors";

export default function CheckboxModifier({
  modifier,
  modifierSet,
  modifiersAmounts,
  setModifiersAmounts,
  preventAdd,
  couldShop = true,
  isAvailable,
  loading
}) {
  const theme = useTheme();
  const themeColor = theme.palette.secondary.main;
  const checked =
    modifiersAmounts?.[modifierSet.id]?.some((ms) => ms.id === modifier.id) ||
    false;
  const modifierHasDiscount =
    modifier?.discounted_price &&
    modifier?.initial_price &&
    modifier?.discounted_price !== modifier?.initial_price;
  const discountPercent = calculateDiscountPercent(
    modifier?.initial_price,
    modifier?.discounted_price
  );
  return (
    <div className="d-flex w-100 justify-content-between">
      {couldShop ? (
        <div className="d-flex align-items-start">
          <Checkbox
            disabled={
              modifier.minimum_choice ||
              (preventAdd && !checked) ||
              (!isAvailable && !checked) ||
              loading
            }
            checked={checked}
            onChange={(e) => {
              const newModifiersCheckbox = {
                ...modifiersAmounts,
              };
              if (e.target.checked)
                newModifiersCheckbox[modifierSet.id].push({
                  ...modifier,
                  amount: 1,
                });
              else
                newModifiersCheckbox[modifierSet.id] = newModifiersCheckbox[
                  modifierSet.id
                ].filter((ms) => ms.id !== modifier.id);
              setModifiersAmounts(newModifiersCheckbox);
            }}
            color="secondary"
            style={{
              color:
                modifier.minimum_choice ||
                (preventAdd && !checked) ||
                (!isAvailable && !checked)
                  ? "#F1F1F1"
                  : checked
                  ? themeColor
                  : "#E4E6E7",
            }}
          />
          <div
            style={{
              maxWidth: "calc(100% - 40px)",
            }}
            className="pr-1 text-right pt-2"
          >
            {modifier.title}
          </div>
        </div>
      ) : (
        <Tooltip placement="top" title="سفارش نمی‌پذیریم.">
          <div className="d-flex align-items-start">
            <Checkbox
              disabled={
                modifier.minimum_choice || (preventAdd && !checked) || loading
              }
              checked={checked}
              onChange={(e) => {
                const newModifiersCheckbox = {
                  ...modifiersAmounts,
                };
                if (e.target.checked)
                  newModifiersCheckbox[modifierSet.id].push({
                    ...modifier,
                    amount: 1,
                  });
                else
                  newModifiersCheckbox[modifierSet.id] = newModifiersCheckbox[
                    modifierSet.id
                  ].filter((ms) => ms.id !== modifier.id);
                setModifiersAmounts(newModifiersCheckbox);
              }}
              color="secondary"
              style={{
                color:
                  modifier.minimum_choice || (preventAdd && !checked)
                    ? "#F1F1F1"
                    : checked
                    ? themeColor
                    : "#E4E6E7",
              }}
            />
            <div
              style={{
                maxWidth: "calc(100% - 40px)",
              }}
              className="pr-1 text-right pt-2"
            >
              {modifier.title}
            </div>
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
          "رایگان"
        )}
      </div>
    </div>
  );
}
