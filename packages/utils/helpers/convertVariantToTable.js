import isEqual from "lodash/isEqual";

export const convertVariantToTable = (variants, isEditMode, table, product) => {
  let variations = variants.length ? [{ id: "", values: "" }] : [];
  variants.forEach((variant, i) => {
    if (variant.values.length) {
      variations = ((i > 0 && variants[i - 1].value) || variations).flatMap(
        (d) =>
          variant.values.map((v) => ({
            id: d.id ? `${d.id + "-" + v.id}` : v.id,
            config: { ...(d.config || {}), [variant.id]: v.id },
            value: `${d.value || ""} ${v.value || ""}`,
          }))
      );
    }
  });

  const newVariations = variations.map((variation) => ({
    ...variation,
    id:
      getVarationIdFromVariants(product.variations, variation.config) ??
      variation.id,
  }));

  const obj = {};
  if (isEditMode) {
    newVariations.forEach((variation) => {
      const discountedPrice = product?.variations[0]?.discounted_price;
      const initialPrice = product?.variations[0]?.initial_price;
      if (!variation.id) return;
      const item = product.variations.find(
        (productVar) => productVar.id === variation.id
      );
      const isBackendProduct = product.id;
      const productDiscountedAmount =
        product?.initial_price - product?.discounted_price ?? 0;
      const productInitialPrice = product?.default_variation?.initial_price ?? 0;
      if (item) {
        obj[variation.id] = { ...item };
      } else {
        obj[variation.id] = {
          discounted_price: isBackendProduct
            ? product.default_variation.discounted_price
            : discountedPrice || 0,
          title: variation.value,
          id: variation.id,
          extra_data: {
            variants: variation.config,
          },
          discount_percent: isBackendProduct
            ? (
                ((product.initial_price - product.discounted_price) /
                  product.initial_price) *
                100
              ).toFixed(1)
            : (((initialPrice - discountedPrice) / initialPrice) * 100).toFixed(
                1
              ) || 0,
          discount_amount: isBackendProduct
            ? productDiscountedAmount
            : initialPrice - discountedPrice || 0,
          initial_price: isBackendProduct
            ? productInitialPrice
            : initialPrice || 0,
          inventory_count: 0,
          available: true,
          new: true,
        };
      }
    });
  } else {
    newVariations.forEach((variation) => {
      const item = product.variations.find((fang) => fang.id === variation.id);
      if (item) {
        obj[variation.id] = { ...item };
      } else {
        if (!variation.id) {
          return;
        }
        obj[variation.id] = {
          discounted_price: product.id
            ? product.default_variation.discounted_price
            : 0,
          title: variation.value,
          id: variation.id,
          discount_amount: product.id
            ? product.initial_price - product.discounted_price
            : 0,
          discount_percent: product.id
            ? (
                ((product.initial_price - product.discounted_price) /
                  product.initial_price) *
                100
              ).toFixed(1)
            : 0,
          initial_price: product.id
            ? product.default_variation.initial_price
            : 0,
          inventory_count: 0,
          available: true,
          new: true,
        };
      }
    });
  }
  return obj;
};

const getVarationIdFromVariants = (variations, varaintConfig) => {
  const foundVariant = variations.find((variant) =>
    isEqual(variant.extra_data.variants, varaintConfig)
  );

  if (foundVariant) return foundVariant.id;
  return null;
};
