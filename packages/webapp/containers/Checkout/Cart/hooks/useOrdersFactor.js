import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";

const reducer = (accumulator, currentValue) => accumulator + currentValue;

export const useOrdersFactor = (orders, business) => {
  const allItemsCount = orders
    ?.map((order) => order?.count)
    ?.reduce(reducer, 0);
  const allItemsPrice = orders
    ?.map((order) => {
      const variationId = order?.variation_id;
      const initial_price = order.product.variations?.find(
        (variation) => variation.id === variationId
      )?.initial_price;
      return (
        order?.count *
        (initial_price +
          (order.modifiers?.reduce(
            (pre, modifier) =>
              pre + modifier?.discounted_price * (modifier?.amount || 1),
            0
          ) || 0))
      );
    })
    .reduce(reducer, 0);

  const allItemsDiscounts = orders
    ?.map((order) => {
      const variationId = order.variation_id;
      const initial_price = order.product.variations?.find(
        (variation) => variation.id === variationId
      )?.initial_price;
      const discounted_price = order.product.variations?.find(
        (variation) => variation.id === variationId
      )?.discounted_price;
      return order.count * (initial_price - discounted_price);
    })
    .reduce(reducer, 0);

  const taxingPercent =
    business?.plugins_config[SHOPPING_PLUGIN]?.data?.taxing?.percent;

  const amountOfTax =
    allItemsPrice && taxingPercent
      ? ((allItemsPrice - (allItemsDiscounts || 0)) * taxingPercent) / 100
      : null;

  return {
    allItemsCount,
    allItemsPrice,
    allItemsDiscounts,
    amountOfTax,
  };
};
