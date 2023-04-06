import { alterInventoryOptions } from "@saas/stores/plugins/constants";
import { useMemo } from "react";

export function useProductsBulkInventoryRow({
  product,
  updatedProducts,
  setUpdatedProducts,
  adjustments,
  setAdjustments,
}) {
  const {
    id,
    title,
    main_image_thumbnail_url: mainImageThumbnailUrl,
    name,
  } = product;
  const updatedProduct = useMemo(
    () => ({ ...product, ...updatedProducts[id] }),
    [id, updatedProducts, product]
  );
  const isMock = !id;
  const adjustment = (adjustments[id] || [{ reason: "2" }])[0];
  const { reason = "", amount } = adjustment;
  const inventoryCount = updatedProduct?.variations?.[0]?.is_active
    ? parseFloat(updatedProduct?.variations?.[0]?.inventory_count)
    : "—";

  const onProductIsActiveChange = (e) => {
    setUpdatedProducts({
      ...updatedProducts,
      [id]: {
        ...updatedProduct,
        variations: [
          {
            ...updatedProduct?.variations?.[0],
            is_active: e.target.checked,
          },
        ],
      },
    });
  };
  const onProductAlertingChange = (e) => {
    setUpdatedProducts({
      ...updatedProducts,
      [id]: {
        ...updatedProduct,
        variations: [
          {
            ...updatedProduct?.variations?.[0],
            alerting: e.target.checked,
          },
        ],
      },
    });
  };
  const onProductKeepSellingChange = (e) => {
    setUpdatedProducts({
      ...updatedProducts,
      [id]: {
        ...updatedProduct,
        variations: [
          {
            ...updatedProduct?.variations?.[0],
            keep_selling: !e.target.checked,
          },
        ],
      },
    });
  };
  const onProductIsHiddenChange = (e) => {
    const _updatedProduct = {
      ...updatedProducts[id],
      variations: [
        {
          ...updatedProduct?.variations?.[0],
          extra_data: {
            ...updatedProducts[id]?.variations?.[0]?.extra_data,
            is_hidden: !e.target.checked,
          },
        },
      ],
    };

    setUpdatedProducts({
      ...updatedProducts,
      [id]: {
        ..._updatedProduct,
      },
    });
  };
  const onProductInventoryReasonChange = (value) => {
    setAdjustments({
      ...adjustments,
      [id]: [
        {
          variation_id: product?.default_variation?.id,
          reason: parseInt(value),
          amount: "",
        },
      ],
    });
  };
  const onProductInventoryAmountChange = (amount) => {
    setAdjustments({
      ...adjustments,
      [id]: [
        {
          ...adjustment,
          variation_id: product?.default_variation?.id,
          amount,
        },
      ],
    });
  };
  const onProductThresholdChange = (threshold) => {
    setUpdatedProducts({
      ...updatedProducts,
      [id]: {
        ...updatedProduct,
        variations: [
          {
            ...updatedProduct?.variations?.[0],
            threshold,
          },
        ],
      },
    });
  };
  const isProductAvailable = (_product) => {
    const newInventoryCount =
      (reason &&
        amount &&
        (alterInventoryOptions[reason]?.action === "plus"
          ? inventoryCount + parseInt(amount)
          : alterInventoryOptions[reason]?.action === "minus"
          ? inventoryCount - amount
          : alterInventoryOptions[reason]?.action === "set"
          ? amount
          : "")) ||
      inventoryCount;
    const isNotAvailable =
      !_product?.variations?.[0].is_active ||
      (!_product?.variations?.[0].keep_selling && newInventoryCount <= 0);

    return !isNotAvailable;
  };
  return {
    id,
    title,
    mainImageThumbnailUrl,
    name,
    isMock,
    reason,
    amount,
    inventoryCount,
    updatedProduct,
    onProductIsActiveChange,
    onProductAlertingChange,
    onProductKeepSellingChange,
    onProductIsHiddenChange,
    onProductInventoryReasonChange,
    onProductInventoryAmountChange,
    onProductThresholdChange,
    isProductAvailable,
  };
}
