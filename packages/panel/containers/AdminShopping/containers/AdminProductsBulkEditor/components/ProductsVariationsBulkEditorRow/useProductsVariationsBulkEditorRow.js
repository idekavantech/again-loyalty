import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";

export function useProductsVariationsBulkEditorRow({
  deal,
  updatedProducts,
  variationId,
  setUpdatedProducts,
}) {
  const variations = deal.variations || [];
  const updatedVariations =
    updatedProducts?.[deal?.id]?.variations || variations;
  const variation =
    variations?.find((variation) => variation.id === variationId) || {};
  const updatedVariation =
    (updatedProducts?.[deal?.id]?.variations && {
      ...variation,
      ...updatedProducts?.[deal?.id]?.variations?.find(
        (variant) => variant.id === variationId
      ),
    }) ||
    variation;
  const {
    id,
    title,
    main_image_thumbnail_url: mainImageThumbnailUrl,
  } = variation;
  const isMock = !id;

  const onVariationSKUChange = (value) => {
    if (
      !!value &&
      !new RegExp("^[a-zA-Z0-9 ]+$").test(value.slice(-1)) &&
      !new RegExp("^[\u06F0-\u06F90-9]+$").test(value.slice(-1))
    )
      return;

    const _variations = JSON.parse(JSON.stringify(updatedVariations));
    const _selectedVariationIndex = _variations.findIndex(
      (_variation) => _variation.id === updatedVariation.id
    );
    _variations[_selectedVariationIndex] = {
      ..._variations[_selectedVariationIndex],
      sku: persianToEnglishNumber(value),
    };
    setUpdatedProducts({
      ...updatedProducts,
      [deal.id]: {
        ...updatedProducts[deal.id],
        variations: _variations,
      },
    });
  };
  const onVariationPriceChange = (value) => {
    const _variations = JSON.parse(JSON.stringify(updatedVariations));
    const _selectedVariationIndex = _variations.findIndex(
      (_variation) => _variation.id === updatedVariation.id
    );
    _variations[_selectedVariationIndex] = {
      ..._variations[_selectedVariationIndex],
      initial_price: persianToEnglishNumber(value),
      discounted_price: persianToEnglishNumber(value),
    };
    setUpdatedProducts({
      ...updatedProducts,
      [deal.id]: {
        ...updatedProducts[deal.id],
        variations: _variations,
      },
    });
  };
  const onVariationDiscountAmountChange = (value) => {
    if (updatedVariation.initial_price - value > 0) {
      const _variations = JSON.parse(JSON.stringify(updatedVariations));
      const _selectedVariationIndex = _variations.findIndex(
        (_variation) => _variation.id === updatedVariation.id
      );
      _variations[_selectedVariationIndex] = {
        ..._variations[_selectedVariationIndex],
        discounted_price:
          updatedVariation.initial_price - persianToEnglishNumber(value),
      };
      setUpdatedProducts({
        ...updatedProducts,
        [deal.id]: {
          ...updatedProducts[deal.id],
          variations: _variations,
        },
      });
    }
  };
  const onVariationFinalUnitCostChange = (value) => {
    const _variations = JSON.parse(JSON.stringify(updatedVariations));
    const _selectedVariationIndex = _variations.findIndex(
      (_variation) => _variation.id === updatedVariation.id
    );
    _variations[_selectedVariationIndex] = {
      ..._variations[_selectedVariationIndex],
      final_unit_cost: persianToEnglishNumber(value),
    };
    setUpdatedProducts({
      ...updatedProducts,
      [deal.id]: {
        ...updatedProducts[deal.id],
        variations: _variations,
      },
    });
  };
  return {
    updatedVariations,
    updatedVariation,
    id,
    title,
    mainImageThumbnailUrl,
    isMock,
    onVariationSKUChange,
    onVariationPriceChange,
    onVariationDiscountAmountChange,
    onVariationFinalUnitCostChange,
  };
}
