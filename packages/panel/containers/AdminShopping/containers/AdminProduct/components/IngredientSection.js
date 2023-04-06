import React, { memo, useEffect, useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import useTheme from "@material-ui/core/styles/useTheme";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import Input from "@saas/components/Input";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import AdminProductInBoxWrapper from "./AdminProductInBoxWrapper";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function IngredientSection({ product = {}, setProduct, ingredients }) {
  const { ingredients: productIngredients = [] } = product?.variations?.[0];
  const [collapse, setCollapse] = useState(false);
  const theme = useTheme();
  const { minWidth768 } = useResponsive();

  useEffect(() => {
    if (!collapse && productIngredients.length) setCollapse(true);
  }, [productIngredients, collapse]);
  const validate = () => {
    let hasError = false;
    setProduct({
      ...product,
      variations: [
        {
          ...product?.variations?.[0],
          ingredients: productIngredients.map((productIngredient) => {
            if (
              !productIngredient.id ||
              !productIngredient.fraction ||
              !parseFloat(productIngredient.fraction)
            )
              hasError = true;
            return {
              ...productIngredient,
              ingredientError: !productIngredient.id
                ? "Enter the type of raw material."
                : "",
              fractionError:
                !productIngredient.fraction ||
                !parseFloat(productIngredient.fraction)
                  ? "Enter the raw material coefficient."
                  : "",
            };
          }),
        },
      ],
    });
    return !hasError;
  };
  let availableIngredients = ingredients.map((item) => ({
    value: item.id,
    label: item.title,
  }));
  availableIngredients = availableIngredients.filter(
    (ing) =>
      !productIngredients.find(
        (productIngredient) => productIngredient.id === ing.value
      )
  );
  return (
    <AdminProductInBoxWrapper smallPadding>
      <div className={"col-12"}>
        <div className="d-flex justify-content-between flex-1 py-2">
          <div>
            <div className="u-fontLarge u-fontWeightBold">The recipe</div>
            {minWidth768 ? (
              <div className="mt-2" style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                Define the raw materials and instructions for making this product here.
              </div>
            ) : null}
          </div>
          <div
            className={
              "w-100 d-flex justify-content-between align-items-center"
            }
            style={{ width: 80 }}
          >
            <FormControlLabel
              className="ml-0"
              control={
                <Switch
                  size="small"
                  checked={collapse}
                  onChange={(e) => {
                    setCollapse(e.target.checked);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  color="primary"
                />
              }
              labelPlacement="start"
              label=""
            />
            {collapse ? "active" : "Inactive"}
          </div>
        </div>
        <Collapse in={collapse}>
          <div className="pt-4 px-4 pb-2">
            {productIngredients.map((productIngredient, index) => {
              return (
                <div key={productIngredient.id} className="d-flex px-1 mb-2">
                  <Autocomplete
                    size="small"
                    className="mx-2 w-100"
                    noOptionsText="The result was not found.."
                    disableClearable
                    defaultValue={{
                      value: productIngredient.id,
                      label: productIngredient.title,
                    }}
                    style={{ height: 43 }}
                    options={availableIngredients}
                    getOptionLabel={(i) => i.label || ""}
                    onChange={(e, option) => {
                      const newProductIngredients = [...productIngredients];
                      newProductIngredients[index] = {
                        ...newProductIngredients[index],
                        id: option.value,
                        title: option.label,
                        ingredientError: "",
                      };

                      setProduct({
                        ...product,
                        variations: [
                          {
                            ...product?.variations?.[0],
                            ingredients: newProductIngredients,
                          },
                        ],
                      });
                    }}
                    renderInput={(params) => (
                      <Input
                        {...params}
                        error={Boolean(productIngredient.ingredientError)}
                        helperText={productIngredient.ingredientError}
                        inputProps={{
                          ...params.inputProps,
                          style: { paddingTop: 0 },
                        }}
                        InputProps={{
                          ...params.InputProps,
                          className: `${params.InputProps.className} pr-2 pl-5`,
                        }}
                        size="medium"
                        className="medium"
                        product="outlined"
                        themeColor={theme.palette.primary.main}
                      />
                    )}
                  />
                  <Input
                    size="medium"
                    className="medium mx-2 w-100"
                    error={Boolean(productIngredient.fractionError)}
                    helperText={productIngredient.fractionError}
                    label="The coefficient"
                    value={englishNumberToPersianNumber(
                      productIngredient.fraction,
                      ""
                    )}
                    isFloat
                    onChange={(fraction) => {
                      const newProductIngredients = [...productIngredients];
                      newProductIngredients[index] = {
                        ...newProductIngredients[index],
                        fraction: persianToEnglishNumber(fraction),
                        fractionError: "",
                      };
                      setProduct({
                        ...product,
                        variations: [
                          {
                            ...product?.variations?.[0],
                            ingredients: newProductIngredients,
                          },
                        ],
                      });
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => {
                      setProduct({
                        ...product,
                        variations: [
                          {
                            ...product?.variations?.[0],
                            ingredients: productIngredients.filter(
                              (ing, i) => i !== index
                            ),
                          },
                        ],
                      });
                    }}
                    className="align-self-start mr-4 mt-1"
                  >
                    <DeleteRoundedIcon color="primary" />
                  </IconButton>
                </div>
              );
            })}
            {availableIngredients?.length ? (
              <Button
                onClick={() => {
                  if (validate()) {
                    setProduct({
                      ...product,
                      variations: [
                        {
                          ...product?.variations?.[0],
                          ingredients: [...productIngredients, {}],
                        },
                      ],
                    });
                  }
                }}
                className="d-flex mb-2 align-items-center"
              >
                <IconButton size="small">
                  <AddCircleOutlineIcon color="primary" />
                </IconButton>

                <span
                  className="u-fontMedium u-cursor-pointer"
                  style={{ color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR }}
                >
                  Adding raw materials
                </span>
              </Button>
            ) : null}
          </div>
        </Collapse>
      </div>
    </AdminProductInBoxWrapper>
  );
}

export default memo(IngredientSection);
