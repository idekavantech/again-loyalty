import { useMemo } from "react";

export function useIngredientsInventoryBulkEditorTableRow({
  ingredient,
  updatedIngredients,
  setUpdatedIngredients,
  adjustments,
  setAdjustments,
}) {
  const {
    id,
    title,
    main_image_thumbnail_url: mainImageThumbnailUrl,
    name,
  } = ingredient;
  const updatedIngredient = useMemo(
    () => ({ ...ingredient, ...updatedIngredients[id] }),
    [id, updatedIngredients, ingredient]
  );
  const isMock = !id;
  const adjustment = (adjustments[id] || [{ reason: "2" }])[0];
  const { reason = "", amount } = adjustment;
  const inventoryCount = parseFloat(updatedIngredient.inventory_count);
  const updateAlerting = (e) => {
    setUpdatedIngredients({
      ...updatedIngredients,
      [id]: {
        ...updatedIngredient,
        alerting: e.target.checked,
      },
    });
  };
  const selectReason = (value) => {
    setAdjustments({
      ...adjustments,
      [id]: [
        {
          reason: parseInt(value),
          amount: "",
        },
      ],
    });
  };
  const onAmountChange = (amount) => {
    setAdjustments({
      ...adjustments,
      [id]: [
        {
          ...adjustment,
          amount,
        },
      ],
    });
  };
  const onThresholdChange = (threshold) => {
    setUpdatedIngredients({
      ...updatedIngredients,
      [id]: {
        ...updatedIngredient,
        threshold,
      },
    });
  };
  return {
    reason,
    amount,
    inventoryCount,
    isMock,
    id,
    title,
    mainImageThumbnailUrl,
    name,
    updatedIngredient,
    adjustment,
    updateAlerting,
    selectReason,
    onAmountChange,
    onThresholdChange,
  };
}
