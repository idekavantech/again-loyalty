import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";

export const useFactor = (order) => {
  const modifiers_price = order?.modifiers
    ? order.modifiers.reduce(
        (a, modifier) =>
          a + +modifier.discounted_price * (modifier.amount || 1),
        0
      )
    : 0;

  const variationId = order.variation_id;
  const selectedVariation = order.product.variations.find(
    (variation) => variation.id === variationId
  );
  const hasImageInVariation = selectedVariation.has_image;
  const variation_name = selectedVariation.title;
  const variation_initial_price = selectedVariation.initial_price;
  const variation_discounted_price = selectedVariation.discounted_price;
  const variation_keep_selling = selectedVariation.keep_selling;
  const variation_available = selectedVariation.available;
  const variation_inventory_count = selectedVariation.inventory_count;
  const variation_image = hasImageInVariation
    ? selectedVariation.main_image_thumbnail_url
    : order.product.main_image_thumbnail_url;
  const variation_discount =
    (variation_initial_price - variation_discounted_price) *
    (100 / variation_initial_price);
  const variation_has_discount_percent =
    variation_initial_price > variation_discounted_price;

  const variation_discount_percent = variation_has_discount_percent
    ? calculateDiscountPercent(
        variation_initial_price,
        variation_discounted_price
      )
    : null;

  let isPlusDisabled = false;
  if (variation_inventory_count != undefined) {
    if (variation_available) {
      if (!variation_keep_selling) {
        const diff = variation_inventory_count - order.count;
        if (diff == 0) isPlusDisabled = true;
        else isPlusDisabled = false;
      }
    } else isPlusDisabled = true;
  }
  return {
    modifiers_price,
    selectedVariation,
    variation_name,
    variation_initial_price,
    variation_discounted_price,
    variation_keep_selling,
    variation_available,
    variation_image,
    variation_discount,
    variation_has_discount_percent,
    variation_discount_percent,
    isPlusDisabled,
  };
};
