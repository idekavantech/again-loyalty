/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-danger */
/* eslint-disable indent */

import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Input from "@saas/components/Input";
import Autocomplete from "@material-ui/lab/Autocomplete";

import Modal from "@saas/components/Modal";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Paper from "@material-ui/core/Paper";
import LimitSelector from "../LimitSelector";
import DeleteIcon from "@material-ui/icons/Delete";
import { border, icon, text } from "@saas/utils/colors";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import ErrorOutlineRoundedIcon from "@material-ui/icons/ErrorOutlineRounded";
import AdjustInventory from "../AdjustModifierInventory";
import { useIngredientAssignment } from "./useIngredientAssignment";

function IngredientAssignmentModal({
  isOpen,
  onClose,
  modifier,
  modifierSet,
  setModifierSet,
  ingredients,
  adjustments,
  setAdjustment,
  branches,
  setSelectedBranchId,
  indexOfSelectedBranchModifierSet,
  isSuper,
}) {
  const {
    modifierIngredients,
    minimum,
    maximum,
    choiceError,
    finalUnitCost,
    theme,
    handleMinimumChoiceChange,
    handleMaximumChoiceChange,
    availableIngredients,
    addNewIngredientRowToModifier,
    submit,
    onModifierFinalUnitCostChange,
    onModifierIngredientFractionChange,
    deleteIngredientFromModifier,
    selectIngredientForModifier,
  } = useIngredientAssignment({
    isOpen,
    modifier,
    ingredients,
    setModifierSet,
    modifierSet,
    onClose,
  });

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={
        <div>
          <div className="u-fontWeightBold p-3 text-center">
            Additive settings for{modifier?.title || ""}
          </div>
        </div>
      }
      body={
        <div
          style={{ background: theme.palette.background.paper }}
          className="h-100 overflow-auto p-3"
        >
          <Paper className="p-3 mb-3">
            <div className="u-fontSemiLarge u-fontWeightHeavy">
              Apply limits
            </div>
            <div className="d-flex">
              <div className={`flex-1 mx-1 w-100`}>
                <div className="mb-1">At least</div>
                <LimitSelector
                  optionMaxNumber={
                    modifierSet.modifiers
                      ? Object.keys(modifierSet.modifiers)?.length + 1
                      : 0
                  }
                  onChange={handleMinimumChoiceChange}
                  inputValue={minimum}
                />
              </div>
              <div className={`flex-1 mx-1 w-100`}>
                <div className="mb-1">Maximum</div>

                <LimitSelector
                  optionMaxNumber={
                    modifierSet.modifiers
                      ? Object.keys(modifierSet.modifiers)?.length + 1
                      : 0
                  }
                  onChange={handleMaximumChoiceChange}
                  inputValue={maximum}
                />
              </div>
            </div>
            <div
              className="mt-2 u-font-semi-small"
              style={{ color: theme.palette.error.main }}
            >
              {choiceError}
            </div>
          </Paper>
          {isSuper ? null : (
            <AdjustInventory
              setAdjustment={setAdjustment}
              modifierSet={modifierSet}
              modifier={modifier}
              adjustments={adjustments}
              branches={branches}
              setSelectedBranchId={setSelectedBranchId}
              indexOfSelectedBranchModifierSet={
                indexOfSelectedBranchModifierSet
              }
            />
          )}
          <Paper className="p-3">
            <div className="u-fontSemiLarge u-fontWeightHeavy">
              Selection of raw materials
            </div>
            {modifierIngredients.map((modifierIngredient, index) => {
              const _ingredient = ingredients.find(
                (ing) => ing.id === modifierIngredient.id
              );
              return (
                <div
                  key={modifierIngredient.id}
                  className="py-4"
                  style={
                    index !== 0
                      ? { borderTop: `1px solid ${border.subdued}` }
                      : {}
                  }
                >
                  <div className="d-flex mt-2">
                    <Autocomplete
                      size="small"
                      className="w-100"
                      noOptionsText="The result was not found.."
                      disableClearable
                      style={{ minHeight: 40 }}
                      options={availableIngredients}
                      getOptionLabel={(i) => i.title}
                      value={_ingredient || ""}
                      onChange={(e, option) =>
                        selectIngredientForModifier(e, option, index)
                      }
                      renderInput={(params) => (
                        <Input
                          {...params}
                          error={Boolean(modifierIngredient.ingredientError)}
                          helperText={modifierIngredient.ingredientError}
                          inputProps={{
                            ...params.inputProps,
                            style: { paddingTop: 0 },
                          }}
                          InputProps={{
                            ...params.InputProps,
                            className: `${params.InputProps.className} pr-2`,
                          }}
                          size="medium"
                          className="medium"
                          variant="outlined"
                        />
                      )}
                    />

                    <Button
                      onClick={() => deleteIngredientFromModifier(index)}
                      style={{
                        width: 40,
                        height: 40,
                      }}
                      variant="outlined"
                      className="min-width-0 mr-3"
                    >
                      <DeleteIcon style={{ color: icon.subdued }} />
                    </Button>
                  </div>

                  <div className="mt-4">
                    <Input
                      size="medium"
                      className="medium w-100"
                      error={Boolean(modifierIngredient.fractionError)}
                      helperText={modifierIngredient.fractionError}
                      label="The coefficient"
                      step="0.01"
                      isFloat
                      positive
                      value={englishNumberToPersianNumber(
                        modifierIngredient.fraction,
                        ""
                      )}
                      onChange={(fraction) =>
                        onModifierIngredientFractionChange(fraction, index)
                      }
                    />
                  </div>
                </div>
              );
            })}
            {availableIngredients?.length ? (
              <Button
                onClick={addNewIngredientRowToModifier}
                style={{ borderStyle: "dashed" }}
                variant="outlined"
                fullWidth
                color="primary"
                className="d-flex align-items-center mt-5"
              >
                <AddCircleOutlineIcon color="primary" />

                <div
                  style={{ color: theme.palette.primary.main }}
                  className="u-fontMedium u-cursor-pointer mr-1"
                >
                  Adding new row
                </div>
              </Button>
            ) : null}
            <div
              style={{ borderTop: `1px solid ${border.subdued}` }}
              className="pt-4 mt-4 mb-1 u-fontSemiLarge u-fontWeightHeavy"
            >
              Purchase price
            </div>

            <Input
              selectOnFocus
              placeholder="Purchase price"
              value={finalUnitCost}
              size="medium"
              className="u-fontNormal"
              priceInput
              onChange={onModifierFinalUnitCostChange}
            />
            <div className="d-flex mt-2 align-items-center">
              <ErrorOutlineRoundedIcon
                style={{ fontSize: 16, color: icon.subdued }}
              />

              <div
                style={{ color: text.subdued }}
                className="u-font-semi-small mr-1"
              >
                Purchase price is never displayed to the customer
              </div>
            </div>
          </Paper>
        </div>
      }
      cta={
        <>
          <Button color="primary" className="w-100" onClick={onClose}>
            Cancellation
          </Button>
          <Button
            className="w-100"
            color="primary"
            variant="contained"
            onClick={submit}
          >
            actions
          </Button>
        </>
      }
    />
  );
}

export default memo(IngredientAssignmentModal);
