import React from "react";
import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Button from "@material-ui/core/Button";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import Tooltip from "@material-ui/core/Tooltip";
import useTheme from "@material-ui/core/styles/useTheme";
import TomanIcon from "@saas/icons/TomanIcon";
import { textTypes } from "@saas/utils/colors";

export default function NumberedModifier({
  modifier,
  modifierSet,
  modifiersAmounts,
  setModifiersAmounts,
  preventAdd,
  couldShop = true,
  isAvailable,
}) {
  const theme = useTheme();
  const themeColor = theme.palette.secondary.main;
  const modifierAmountItemIndex = modifiersAmounts?.[modifierSet.id]?.findIndex(
    (modifierItem) => modifierItem.id === modifier.id
  );
  const amount =
    modifiersAmounts?.[modifierSet.id]?.find(
      (modifierItem) => modifierItem.id === modifier.id
    )?.amount || 0;

  const modifierHasDiscount =
    modifier?.discounted_price &&
    modifier?.initial_price &&
    modifier?.discounted_price !== modifier?.initial_price;
  const discountPercent = calculateDiscountPercent(
    modifier?.initial_price,
    modifier?.discounted_price
  );
  return (
    <div className="d-flex w-100 justify-content-between py-1">
      {couldShop ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex align-items-center p-2">
            <Button
              disabled={
                (modifier.maximum_choice &&
                  amount >= (modifier.maximum_choice || 0)) ||
                !isAvailable ||
                preventAdd
              }
              style={{ minWidth: 24, height: 24, boxShadow: "none" }}
              size="small"
              className="px-0"
              color="secondary"
              variant={amount ? "contained" : "outlined"}
              onClick={() => {
                const newModifiersCheckbox = {
                  ...modifiersAmounts,
                };
                if (!amount)
                  newModifiersCheckbox[modifierSet.id].push({
                    ...modifier,
                    amount: 1,
                  });
                else
                  newModifiersCheckbox[modifierSet.id][
                    modifierAmountItemIndex
                  ].amount += 1;
                setModifiersAmounts(newModifiersCheckbox);
              }}
            >
              <AddRoundedIcon fontSize="small" />
            </Button>
            {amount ? (
              <>
                <span style={{ width: 30 }} className="text-center px-1">
                  {englishNumberToPersianNumber(amount)}
                </span>
                <Button
                  disabled={
                    modifier.minimum_choice && amount <= modifier.minimum_choice
                  }
                  style={{ minWidth: 24, height: 24, boxShadow: "none" }}
                  size="small"
                  className="px-0"
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    const newModifiersCheckbox = {
                      ...modifiersAmounts,
                    };
                    if (amount === 1)
                      newModifiersCheckbox[modifierSet.id] =
                        newModifiersCheckbox[modifierSet.id].filter(
                          (ms) => ms.id !== modifier.id
                        );
                    else
                      newModifiersCheckbox[modifierSet.id][
                        modifierAmountItemIndex
                      ].amount -= 1;
                    setModifiersAmounts(newModifiersCheckbox);
                  }}
                >
                  {amount > 1 ? (
                    <RemoveRoundedIcon style={{ fontSize: 18 }} />
                  ) : (
                    <DeleteRoundedIcon style={{ fontSize: 18 }} />
                  )}
                </Button>
              </>
            ) : null}
          </div>
          <div
            style={{
              maxWidth: "calc(100% - 40px)",
            }}
            className="mr-1 text-right"
          >
            {modifier.title}
          </div>
        </div>
      ) : (
        <Tooltip placement="top" title="سفارش نمی‌پذیریم.">
          <div className="d-flex">
            <div className="d-flex align-items-center p-2">
              <Button
                disabled={
                  (modifier.maximum_choice &&
                    amount >= (modifier.maximum_choice || 0)) ||
                  preventAdd
                }
                style={{ minWidth: 24, height: 24, boxShadow: "none" }}
                size="small"
                className="px-0"
                color="secondary"
                variant={amount ? "contained" : "outlined"}
                onClick={() => {
                  const newModifiersCheckbox = {
                    ...modifiersAmounts,
                  };
                  if (!amount)
                    newModifiersCheckbox[modifierSet.id].push({
                      ...modifier,
                      amount: 1,
                    });
                  else
                    newModifiersCheckbox[modifierSet.id][
                      modifierAmountItemIndex
                    ].amount += 1;
                  setModifiersAmounts(newModifiersCheckbox);
                }}
              >
                <AddRoundedIcon fontSize="small" />
              </Button>
              {amount ? (
                <>
                  <span style={{ width: 30 }} className="text-center px-1">
                    {englishNumberToPersianNumber(amount)}
                  </span>
                  <Button
                    disabled={
                      modifier.minimum_choice &&
                      amount <= modifier.minimum_choice
                    }
                    style={{ minWidth: 24, height: 24, boxShadow: "none" }}
                    size="small"
                    className="px-0"
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                      const newModifiersCheckbox = {
                        ...modifiersAmounts,
                      };
                      if (amount === 1)
                        newModifiersCheckbox[modifierSet.id] =
                          newModifiersCheckbox[modifierSet.id].filter(
                            (ms) => ms.id !== modifier.id
                          );
                      else
                        newModifiersCheckbox[modifierSet.id][
                          modifierAmountItemIndex
                        ].amount -= 1;
                      setModifiersAmounts(newModifiersCheckbox);
                    }}
                  >
                    {amount > 1 ? (
                      <RemoveRoundedIcon style={{ fontSize: 18 }} />
                    ) : (
                      <DeleteRoundedIcon style={{ fontSize: 18 }} />
                    )}
                  </Button>
                </>
              ) : null}
            </div>
            <div
              style={{
                maxWidth: "calc(100% - 40px)",
              }}
              className="pr-1 pt-2 text-right"
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
