import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";

export function useProductsBulkEditorTableRow({
  deal,
  updatedProducts,
  setUpdatedProducts,
  hasVariations,
  setTitleError,
  setCategoriesError,
}) {
  const { id, default_variation: { images } = {} } = deal;
  const mainImageThumbnailUrl =
    images?.[0]?.image_url || deal.main_image_thumbnail_url;
  const updatedProduct = { ...deal, ...updatedProducts[id] };
  const isMock = !id;

  const onProductTitleChange = (value) => {
    setTitleError("");
    if (hasVariations) {
      setUpdatedProducts({
        ...updatedProducts,
        [id]: {
          ...updatedProduct,
          title: value,
        },
      });
    } else {
      setUpdatedProducts({
        ...updatedProducts,
        [id]: {
          ...updatedProduct,
          title: value,
          variations: [
            {
              ...(updatedProduct.variations?.[0] || {}),
              title: value,
            },
          ],
        },
      });
    }
  };
  const onProductSKUChange = (value) => {
    if (
      !!value &&
      !new RegExp("^[a-zA-Z0-9 ]+$").test(value.slice(-1)) &&
      !new RegExp("^[\u06F0-\u06F90-9]+$").test(value.slice(-1))
    )
      return;
    setUpdatedProducts({
      ...updatedProducts,
      [id]: {
        ...updatedProduct,
        variations: [
          {
            ...(updatedProduct.variations?.[0] || {}),
            sku: value ? persianToEnglishNumber(value) : null,
          },
        ],
      },
    });
  };
  const onProductInitialPriceChange = (value) => {
    setUpdatedProducts({
      ...updatedProducts,
      [id]: {
        ...updatedProduct,
        variations: [
          {
            ...(updatedProduct.variations?.[0] || {}),
            initial_price: value,
            discounted_price: value,
          },
        ],
      },
    });
  };
  const onProductDiscountAmountChange = (value) => {
    if (updatedProduct.variations?.[0]?.initial_price - value > 0)
      setUpdatedProducts({
        ...updatedProducts,
        [id]: {
          ...updatedProduct,
          variations: [
            {
              ...(updatedProduct.variations?.[0] || {}),
              discounted_price:
                updatedProduct.variations?.[0]?.initial_price - value,
            },
          ],
        },
      });
  };
  const onProductFinalUnitCostChange = (value) => {
    setUpdatedProducts({
      ...updatedProducts,
      [id]: {
        ...updatedProduct,
        variations: [
          {
            ...(updatedProduct.variations?.[0] || {}),
            final_unit_cost: value,
          },
        ],
      },
    });
  };
  const onProductLabelsChange = (e, _labels) => {
    setCategoriesError("");
    setUpdatedProducts({
      ...updatedProducts,
      [id]: {
        ...updatedProduct,
        labels: _labels.map((label) => label.id),
      },
    });
  };
  return {
    id,
    isMock,
    mainImageThumbnailUrl,
    updatedProduct,
    onProductTitleChange,
    onProductSKUChange,
    onProductInitialPriceChange,
    onProductDiscountAmountChange,
    onProductFinalUnitCostChange,
    onProductLabelsChange,
  };
}
