import { alterInventoryOptions } from "@saas/stores/plugins/constants";

export function useProductsVariationBulkInventoryRow({
  product,
  updatedProducts,
  setUpdatedProducts,
  adjustments,
  setAdjustments,
  variation,
}) {
  const variationId = variation.id;
  const variations = product?.variations || [];
  const updatedVariations =
    updatedProducts?.[product.id]?.variations || variations;
  const updatedVariation =
    (updatedProducts?.[product.id]?.variations && {
      ...variation,
      ...updatedProducts[product.id].variations?.find(
        (variation) => variation.id === variationId
      ),
    }) ||
    variation;
  const inventoryCount = updatedVariation.is_active
    ? updatedVariation.inventory_count
    : "—";
  const {
    id,
    title,
    main_image_thumbnail_url: mainImageThumbnailUrl,
  } = variation;
  const isMock = !id;
  const adjustment = (adjustments[product.id] || []).find(
    (adjustment) => adjustment.variation_id === variationId
  ) || { variation_id: variationId, reason: "2" };
  const { reason = "", amount } = adjustment;
  const onVariationIsActiveChange = (e) => {
    const _updatedProducts = {
      ...updatedProducts,
      [product.id]: {
        variations: [...updatedVariations],
      },
    };
    const newVariation = {
      ...updatedVariation,
      is_active: e.target.checked,
    };
    const variationIndex = _updatedProducts[product.id].variations.findIndex(
      (variation) => variation.id === newVariation.id
    );
    _updatedProducts[product.id].variations[variationIndex] = newVariation;
    setUpdatedProducts(_updatedProducts);
  };
  const onVariationIsHiddenChange = (e) => {
    const newVariation = {
      ...updatedVariation,
      extra_data: {
        ...updatedVariation?.extra_data,
        is_hidden: !e.target.checked,
      },
    };

    const _updatedProducts = {
      ...updatedProducts,
      [product.id]: {
        variations: [...updatedVariations],
      },
    };

    const variationIndex = _updatedProducts[product.id].variations.findIndex(
      (variation) => variation.id === newVariation.id
    );
    _updatedProducts[product.id].variations[variationIndex] = newVariation;
    setUpdatedProducts(_updatedProducts);
  };
  const onVariationKeepSellingChange = (e) => {
    const newVariation = {
      ...updatedVariation,
      keep_selling: !e.target.checked,
    };
    const _updatedProducts = {
      ...updatedProducts,
      [product.id]: {
        variations: [...updatedVariations],
      },
    };

    const variationIndex = _updatedProducts[product.id].variations.findIndex(
      (variation) => variation.id === newVariation.id
    );
    _updatedProducts[product.id].variations[variationIndex] = newVariation;
    setUpdatedProducts(_updatedProducts);
  };
  const onVariationInventoryReasonChange = (value) => {
    const newAdjustments = (adjustments[product.id] || []).filter(
      (adj) => adj.variation_id !== variationId
    );
    newAdjustments.push({
      variation_id: variationId,
      reason: parseInt(value),
      amount: "",
    });
    setAdjustments({
      ...adjustments,
      [product.id]: newAdjustments,
    });
  };
  const onVariationInventoryAmountChange = (amount) => {
    const newAdjustment = (adjustments[product.id] || []).filter(
      (adj) => adj.variation_id !== variationId
    );
    const previous =
      (adjustments[product.id] || []).find(
        (adj) => adj.variation_id === variationId
      ) || {};
    newAdjustment.push({
      ...previous,
      variation_id: variationId,
      amount,
    });

    setAdjustments({
      ...adjustments,
      [product.id]: newAdjustment,
    });
  };
  const onVariationThresholdChange = (threshold) => {
    const newVariation = {
      ...updatedVariation,
      threshold,
    };
    const _updatedProducts = {
      ...updatedProducts,
      [product.id]: {
        variations: [...updatedVariations],
      },
    };

    const variationIndex = _updatedProducts[product.id].variations.findIndex(
      (variation) => variation.id === newVariation.id
    );
    _updatedProducts[product.id].variations[variationIndex] = newVariation;
    setUpdatedProducts(_updatedProducts);
  };
  const isVariationAvailable = (variation) => {
    const newInventoryCount =
      (reason &&
        amount &&
        (alterInventoryOptions[reason]?.action === "plus"
          ? variation.inventory_count + parseInt(amount)
          : alterInventoryOptions[reason]?.action === "minus"
          ? variation.inventory_count - amount
          : alterInventoryOptions[reason]?.action === "set"
          ? amount
          : "")) ||
      variation.inventory_count;
    const isNotAvailable =
      !variation.is_active ||
      (!variation.keep_selling && newInventoryCount <= 0);

    return !isNotAvailable;
  };
  return {
    variations,
    updatedVariations,
    variation,
    updatedVariation,
    inventoryCount,
    id,
    title,
    mainImageThumbnailUrl,
    name,
    isMock,
    adjustment,
    reason,
    amount,
    onVariationIsActiveChange,
    onVariationIsHiddenChange,
    onVariationKeepSellingChange,
    onVariationInventoryReasonChange,
    onVariationInventoryAmountChange,
    onVariationThresholdChange,
    isVariationAvailable,
  };
}
