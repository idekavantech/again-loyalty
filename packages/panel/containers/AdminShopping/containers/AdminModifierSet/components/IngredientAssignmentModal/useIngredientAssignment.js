import { useEffect, useState } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import { reversePriceFormatter } from "@saas/utils/helpers/reversePriceFormatter";

export function useIngredientAssignment({
  isOpen,
  modifier,
  ingredients,
  setModifierSet,
  modifierSet,
  onClose,
}) {
  const [modifierIngredients, setModifierIngredients] = useState([]);
  const [minimum, setMinimum] = useState("");
  const [maximum, setMaximum] = useState("");
  const [choiceError, setChoiceError] = useState("");
  const [finalUnitCost, setFinalUnitCost] = useState("");
  const theme = useTheme();
  useEffect(() => {
    if (isOpen) {
      setModifierIngredients(modifier.ingredients || []);
      setMinimum(modifier.minimum_choice);
      setMaximum(modifier.maximum_choice);
      setFinalUnitCost(modifier.final_unit_cost || "");
    }
  }, [isOpen]);

  const validate = () => {
    let hasError = false;
    if (minimum > maximum && (minimum || maximum === 0)) {
      setChoiceError("The minimum selection must be less than the maximum.");
      hasError = true;
    }
    setModifierIngredients(
      modifierIngredients.map((modifierIngredient) => {
        if (
          !modifierIngredient.id ||
          !modifierIngredient.fraction ||
          !parseFloat(modifierIngredient.fraction)
        )
          hasError = true;
        return {
          ...modifierIngredient,
          ingredientError: !modifierIngredient.id
            ? "Enter the type of raw material."
            : "",
          fractionError:
            !modifierIngredient.fraction ||
            !parseFloat(modifierIngredient.fraction)
              ? "Enter the coefficient."
              : "",
        };
      })
    );
    return !hasError;
  };
  const handleMinimumChoiceChange = (min) => {
    setChoiceError("");
    setMinimum(min);
  };
  const handleMaximumChoiceChange = (max) => {
    setChoiceError("");
    setMaximum(max);
  };
  const submit = () => {
    if (validate()) {
      const _modifiers = { ...modifierSet.modifiers };
      _modifiers[modifier.id].ingredients = modifierIngredients.map(
        (ingredient) => ({
          id: ingredient.id,
          fraction: parseFloat(ingredient.fraction),
        })
      );
      delete _modifiers[modifier.id].maximum_choice;
      delete _modifiers[modifier.id].minimum_choice;
      delete _modifiers[modifier.id].final_unit_cost;
      if (finalUnitCost)
        _modifiers[modifier.id].final_unit_cost = finalUnitCost;
      if (maximum) _modifiers[modifier.id].maximum_choice = parseInt(maximum);
      if (minimum || parseInt(minimum) === 0)
        _modifiers[modifier.id].minimum_choice = parseInt(minimum);
      setModifierSet({ ...modifierSet, modifiers: _modifiers });
      onClose();
    }
  };
  const onModifierFinalUnitCostChange = (value) => {
    setFinalUnitCost(reversePriceFormatter(value));
  };
  const addNewIngredientRowToModifier = () => {
    if (validate()) setModifierIngredients([...modifierIngredients, {}]);
  };
  const onModifierIngredientFractionChange = (fraction, index) => {
    const _modifierIngredients = [...modifierIngredients];
    _modifierIngredients[index] = {
      ..._modifierIngredients[index],
      fraction,
      fractionError: "",
    };

    setModifierIngredients(_modifierIngredients);
  };
  const deleteIngredientFromModifier = (index) => {
    setModifierIngredients(modifierIngredients.filter((ing, i) => i !== index));
  };
  const selectIngredientForModifier = (e, option, index) => {
    const _modifierIngredients = [...modifierIngredients];
    _modifierIngredients[index] = {
      ..._modifierIngredients[index],
      id: option.id,
      ingredientError: "",
    };
    setModifierIngredients(_modifierIngredients);
  };
  const availableIngredients = ingredients.filter(
    (ingredient) =>
      !modifierIngredients.find(
        (modifierIngredient) => modifierIngredient.id === ingredient.id
      )
  );
  return {
    modifierIngredients,
    setModifierIngredients,
    minimum,
    setMinimum,
    maximum,
    setMaximum,
    choiceError,
    setChoiceError,
    finalUnitCost,
    setFinalUnitCost,
    theme,
    validate,
    availableIngredients,
    handleMinimumChoiceChange,
    handleMaximumChoiceChange,
    submit,
    onModifierFinalUnitCostChange,
    addNewIngredientRowToModifier,
    deleteIngredientFromModifier,
    onModifierIngredientFractionChange,
    selectIngredientForModifier,
  };
}
