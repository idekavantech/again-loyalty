import React from "react";
import Input from "@saas/components/Input";

import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import Button from "@material-ui/core/Button";
import { icon, surface } from "@saas/utils/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import IngredientAssignmentModal from "../IngredientAssignmentModal";
import IngredientsPreview from "../IngredientsPreview";
import TextSwitch from "@saas/components/ModernSwitch";
import { useModifierItem } from "./useModifierItem";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

export default function ModifierItem({
  modifier,
  modifierSet,
  setModifierSet,
  modifierError,
  ingredients,
  setAdjustment,
  adjustments,
  branches,
  indexOfSelectedBranchModifierSet,
  setSelectedBranchId,
  disableSettings,
  isSuper,
}) {
  const {
    ingredientModal,
    setIngredientModal,
    availableIngredients,
    isPercent,
    setIsPercent,
    onModifierTitleChange,
    onModifierPriceChange,
    discountValue,
    onDiscountValueChange,
    onDeleteModifierClick,
  } = useModifierItem({
    modifier,
    modifierSet,
    setModifierSet,
    ingredients,
  });

  const { maxWidth768 } = useResponsive();
  const isDesktop = !maxWidth768;

  return (
    <>
      <IngredientAssignmentModal
        ingredients={ingredients}
        isOpen={ingredientModal}
        modifier={modifier}
        onClose={() => setIngredientModal(false)}
        modifierSet={modifierSet}
        setModifierSet={setModifierSet}
        adjustments={adjustments}
        setAdjustment={setAdjustment}
        branches={branches}
        setSelectedBranchId={setSelectedBranchId}
        indexOfSelectedBranchModifierSet={indexOfSelectedBranchModifierSet}
        isSuper={isSuper}
      />
      <div className="d-flex flex-column flex-md-row align-items-start">
        <div className="mt-3 flex-1 w-100">
          <Input
            size="medium"
            value={modifier.title}
            label="Additive title"
            onChange={onModifierTitleChange}
            error={Boolean(modifierError?.titleError)}
            helperText={modifierError?.titleError || ""}
          />
        </div>
        <div className={`mt-3 flex-1 w-100 ${isDesktop ? "mr-4" : ""}`}>
          <Input
            size="medium"
            numberOnly
            value={englishNumberToPersianNumber(modifier.initial_price, "")}
            label="Additive price($)"
            onChange={onModifierPriceChange}
            error={Boolean(modifierError?.priceError)}
            helperText={modifierError?.priceError || ""}
          />
          <div className="mt-3 position-relative">
            <TextSwitch
              width={120}
              height={36}
              style={{ top: 3, left: 4, boxShadow: "none" }}
              className="position-absolute z-index-2"
              isSwitchOn={isPercent}
              toggleSwitch={setIsPercent}
              texts={["$", "Percent"]}
            />
            <Input
              size="medium"
              selectOnFocus
              value={discountValue}
              className="u-fontNormal"
              priceInput={!isPercent}
              onChange={onDiscountValueChange}
              label={`${isPercent ? "Percent" : "the amount of"} Discount`}
              numberOnly
            />
          </div>
          <div className="mt-3">
            <Input
              disabled
              size="medium"
              numberOnly
              value={priceFormatter(Math.round(modifier.discounted_price))}
              label="The final price($)"
              error={Boolean(modifierError?.priceError)}
              helperText={modifierError?.priceError || ""}
            />
          </div>
        </div>
        {availableIngredients?.length && !isDesktop ? (
          <IngredientsPreview
            ingredients={availableIngredients}
            modifier={modifier}
          />
        ) : null}
        <div
          className={`d-flex align-items-center w-100 mt-3 ${
            isDesktop ? "flex-0 mr-4" : "flex-1"
          }`}
        >
          <Button
            style={{
              height: isDesktop ? 40 : 32,
              backgroundColor: surface.primary.selected,
            }}
            fullWidth
            className="u-cursor-pointer d-flex align-items-center px-2 u-pre"
            color="primary"
            disabled={disableSettings}
            onClick={() => {
              setIngredientModal(true);
            }}
          >
            Additive settings
          </Button>
          <Button
            onClick={onDeleteModifierClick}
            style={{
              width: isDesktop ? 40 : 32,
              height: isDesktop ? 40 : 32,
            }}
            variant="outlined"
            className="min-width-0 mr-3"
          >
            <DeleteIcon style={{ color: icon.subdued }} />
          </Button>
        </div>
      </div>
      {availableIngredients?.length && isDesktop ? (
        <IngredientsPreview
          ingredients={availableIngredients}
          modifier={modifier}
        />
      ) : null}
    </>
  );
}
