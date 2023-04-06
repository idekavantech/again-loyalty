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

import AdminProductInBoxWrapper from "../../AdminProduct/components/AdminProductInBoxWrapper";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function VariationIngredientSection({
  variation = {},
  setVariation,
  ingredients,
}) {
  const { ingredients: variationIngredients = [] } = variation;
  const [collapse, setCollapse] = useState(false);
  const theme = useTheme();
  const { minWidth768 } = useResponsive();

  useEffect(() => {
    if (!collapse && variationIngredients.length) setCollapse(true);
  }, [variationIngredients, collapse]);

  const validate = () => {
    let hasError = false;
    setVariation({
      ...variation,
      ingredients: variationIngredients.map((variationIngredient) => {
        if (
          !variationIngredient.id ||
          !variationIngredient.fraction ||
          !parseFloat(variationIngredient.fraction)
        )
          hasError = true;
        return {
          ...variationIngredient,
          ingredientError: !variationIngredient.id
            ? "Enter the type of raw material."
            : "",
          fractionError:
            !variationIngredient.fraction ||
            !parseFloat(variationIngredient.fraction)
              ? "Enter the raw material coefficient."
              : "",
        };
      }),
    });
    return !hasError;
  };
  const availableIngredients = ingredients.filter(
    (ing) =>
      !variationIngredients.find(
        (variationIngredient) => variationIngredient.id === ing.id
      )
  );
  return (
    <AdminProductInBoxWrapper smallPadding id="variation-ingredients-section">
      <div className="d-flex justify-content-between flex-1 px-4 py-2 align-items-center">
        <div>
          <div className="u-fontLarge u-fontWeightBold">The recipe</div>
          {minWidth768 ? (
            <div className="mt-2" style={{ color: "rgba(0, 0, 0, 0.6)" }}>
              Define the raw materials and instructions for making this product here.
            </div>
          ) : null}
        </div>
        <div>
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
        </div>
      </div>

      <Collapse in={collapse}>
        <div className="pt-4 px-4 pb-2">
          {variationIngredients.map((variationIngredient, index) => (
            <div key={variationIngredient.id} className="d-flex px-1 mb-2">
              <Autocomplete
                size="small"
                className="mx-2 w-100"
                noOptionsText="The result was not found.."
                disableClearable
                value={
                  ingredients.find(
                    (ing) => ing.id === variationIngredient.id
                  ) || ""
                }
                style={{ height: 43 }}
                options={availableIngredients}
                getOptionLabel={(i) => i.title || ""}
                onChange={(e, option) => {
                  const newVariationIngredients = [...variationIngredients];
                  newVariationIngredients[index] = {
                    ...newVariationIngredients[index],
                    item: option.id,
                    id: option.id,
                    ingredientError: "",
                  };

                  setVariation({
                    ...variation,
                    ingredients: newVariationIngredients,
                  });
                }}
                renderInput={(params) => (
                  <Input
                    {...params}
                    error={Boolean(variationIngredient.ingredientError)}
                    helperText={variationIngredient.ingredientError}
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
                    variation="outlined"
                    themeColor={theme.palette.primary.main}
                  />
                )}
              />
              <Input
                size="medium"
                className="medium mx-2 w-100"
                error={Boolean(variationIngredient.fractionError)}
                helperText={variationIngredient.fractionError}
                label="The coefficient"
                value={englishNumberToPersianNumber(
                  variationIngredient.fraction,
                  ""
                )}
                isFloat
                onChange={(fraction) => {
                  const newVariationIngredients = [...variationIngredients];
                  newVariationIngredients[index] = {
                    ...newVariationIngredients[index],
                    fraction: persianToEnglishNumber(fraction),
                    fractionError: "",
                  };
                  setVariation({
                    ...variation,
                    ingredients: newVariationIngredients,
                  });
                }}
              />
              <IconButton
                size="small"
                onClick={() => {
                  setVariation({
                    ...variation,
                    ingredients: variationIngredients.filter(
                      (ing, i) => i !== index
                    ),
                  });
                }}
                className="align-self-start mr-4 mt-1"
              >
                <DeleteRoundedIcon color="primary" />
              </IconButton>
            </div>
          ))}
          {availableIngredients?.length ? (
            <Button
              onClick={() => {
                if (validate()) {
                  setVariation({
                    ...variation,
                    ingredients: [...variationIngredients, {}],
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
    </AdminProductInBoxWrapper>
  );
}

export default memo(VariationIngredientSection);
