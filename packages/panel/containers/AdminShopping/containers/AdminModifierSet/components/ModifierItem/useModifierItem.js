import { useState } from "react";
import { reversePriceFormatter } from "@saas/utils/helpers/reversePriceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

export function useModifierItem({
  modifier,
  modifierSet,
  setModifierSet,
  ingredients,
}) {
  const {minWidth768} = useResponsive()
  const [ingredientModal, setIngredientModal] = useState(false);
  const availableIngredients = ingredients?.filter((ing) =>
    (modifier.ingredients || []).find((pi) => pi.ingredient_id === ing.id)
  );
  const [isPercent, setIsPercent] = useState(false);
  const onModifierTitleChange = (title) => {
    setModifierSet({
      ...modifierSet,
      modifiers: {
        ...modifierSet.modifiers,
        [modifier.id]: {
          ...modifierSet.modifiers[modifier.id],
          title,
        },
      },
    });
  };
  const onModifierPriceChange = (price) => {
    setModifierSet({
      ...modifierSet,
      modifiers: {
        ...modifierSet.modifiers,
        [modifier.id]: {
          ...modifierSet.modifiers[modifier.id],
          discounted_price: reversePriceFormatter(price),
          initial_price: reversePriceFormatter(price),
        },
      },
    });
  };
  const discountValue = isPercent
    ? englishNumberToPersianNumber(
        calculateDiscountPercent(
          reversePriceFormatter(modifier.initial_price),
          modifier.discounted_price
        ),
        ""
      )
    : englishNumberToPersianNumber(
        reversePriceFormatter(modifier.initial_price) -
          modifier.discounted_price,
        ""
      );
  const onDiscountValueChange = (price) => {
    if (isPercent) {
      if (persianToEnglishNumber(price) <= 100)
        setModifierSet({
          ...modifierSet,
          modifiers: {
            ...modifierSet.modifiers,
            [modifier.id]: {
              ...modifierSet.modifiers[modifier.id],
              discounted_price: Math.floor(
                reversePriceFormatter(modifier.initial_price) *
                  (1 - persianToEnglishNumber(price) / 100)
              ),
            },
          },
        });
    } else {
      if (
        reversePriceFormatter(modifier.initial_price) -
          reversePriceFormatter(price) >
        0
      )
        setModifierSet({
          ...modifierSet,
          modifiers: {
            ...modifierSet.modifiers,
            [modifier.id]: {
              ...modifierSet.modifiers[modifier.id],
              discounted_price:
                reversePriceFormatter(modifier.initial_price) -
                reversePriceFormatter(price),
            },
          },
        });
    }
  };
  const onDeleteModifierClick = () => {
    const _modifiers = { ...modifierSet.modifiers };
    delete _modifiers[modifier.id];
    setModifierSet({
      ...modifierSet,
      modifiers: _modifiers,
      minimum_choice: null,
    });
  };
  return {
    minWidth768,
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
  };
}
