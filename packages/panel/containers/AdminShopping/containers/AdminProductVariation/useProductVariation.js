import { deleteImageFromVariation } from "@saas/stores/business/actions";
import { makeSelectBranches } from "@saas/stores/business/selector";
import {
  clearUploadedFiles,
  removeFile,
  uploadFile,
} from "@saas/stores/global/actions";
import {
  makeSelectLoading,
  makeSelectUploadedFiles,
} from "@saas/stores/global/selectors";
import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugins,
} from "@saas/stores/plugins/selector";
import { getChangedObjectValues } from "@saas/utils/helpers/getChangedObjectValues";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { reversePriceFormatter } from "@saas/utils/helpers/reversePriceFormatter";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProduct,
  getIngredients,
  getModifierSets,
  updateProductVariation,
  uploadImageAndUpdateVariation,
} from "store/actions";
import { availableOnDayOptions } from "store/constants";
import {
  makeSelectAdminProduct,
  makeSelectIngredients,
  makeSelectModifierSets,
} from "store/selectors";
const DefaultInventoryAdjustment = { reason: "2" };
export function useProductVariation({ plugin }) {
  const dispatch = useDispatch();
  const uploadedFiles = useSelector(makeSelectUploadedFiles());
  const isLoading = useSelector(makeSelectLoading());
  const product = useSelector(makeSelectAdminProduct());
  const urlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const branches = useSelector(makeSelectBranches());
  const pluginsData = useSelector(makeSelectPlugins());
  const cleanUploads = () => dispatch(clearUploadedFiles());
  const modifierSets = useSelector(makeSelectModifierSets());
  const ingredients = useSelector(makeSelectIngredients());
  const _uploadFile = (files, folderName, callback) =>
    dispatch(uploadFile({ files, folderName }, callback));
  const _removeFile = (index) => dispatch(removeFile(index));
  const _getProduct = (id) => dispatch(getAdminProduct(id));
  const _updateVariation = ({
    variation,
    uploadedFiles,
    variationInventoryAdjustment,
    callback,
  }) =>
    dispatch(
      updateProductVariation({
        variation,
        uploadedFiles,
        variationInventoryAdjustment,
        callback,
      })
    );

  const _getIngredients = (data) => dispatch(getIngredients(data));
  const _getAdminModifiers = (data) => dispatch(getModifierSets(data));

  const [error, setError] = useState("");
  const pluginUrl = pluginsData[plugin].plugin_url;
  const router = useRouter();
  const productId = parseInt(router.query.id);
  const variationId = parseInt(router.query.variation_id);
  const [inventoryAdjustment, setInventoryAdjustment] = useState(
    DefaultInventoryAdjustment
  );
  const [_product, _setProduct] = useState(null);
  const [variation, setVariation] = useState({});
  const [imagesArray, setImagesArray] = useState([]);
  const [imagesAlt, setImagesAlt] = useState("");
  const _deleteVariationImage = (
    imageId,
    variationId,
    resourceId,
    callback
  ) => {
    dispatch(
      deleteImageFromVariation(imageId, variationId, resourceId, callback)
    );
  };

  const _uploadImageAndUpdateVariation = (variationId, resourceId, product) =>
    dispatch(uploadImageAndUpdateVariation(variationId, resourceId, product));
  const [
    isVariationIdChangeConfirmationModalOpen,
    toggleVariationIdChangeConfirmationModalOpen,
  ] = useState(false);
  const [isProductDefaultImageShowing, toggleProductDefaultImageShowing] =
    useState(true);
  const [variations, setVariations] = useState(null);
  const myFiles = useRef(null);
  const originalVariation =
    variationId &&
    product?.variations.find((variation) => variation.id === variationId);
  const variationImages = originalVariation?.images || [];
  useEffect(() => {
    const uploadedImagesArray = [];
    uploadedFiles.map((file) =>
      uploadedImagesArray.push({
        initialIndex: uploadedFiles.indexOf(file),
        ...file,
      })
    );
    setImagesArray(uploadedImagesArray);
  }, [uploadedFiles]);
  useEffect(() => {
    setImagesArray([...variationImages]);
  }, [variationImages]);
  const validate = () => {
    let hasError = false;

    setVariation({
      ...variation,
      ingredients: (variation.ingredients || []).map((pi) => {
        if (!pi.id || !pi.fraction || !parseFloat(pi.fraction)) hasError = true;
        return {
          ...pi,
          ingredientError: !pi.id ? "Enter the type of raw material." : "",
          fractionError:
            !pi.fraction || !parseFloat(pi.fraction)
              ? "Enter the raw material coefficient."
              : "",
        };
      }),
    });
    return !hasError;
  };

  useEffect(() => {
    if (product) {
      _setProduct(product);
      if (product?.variations.length) {
        setVariation(
          product?.variations.find((variation) => variation.id == variationId)
        );
        setVariations(product.variations);
      }
    }
  }, [product]);
  useEffect(() => {
    _setProduct(null);
    setVariation({});
    if (productId) {
      setTimeout(() => {
        _getProduct(productId);
        _getAdminModifiers({ paginated: false });

        _getIngredients({ page_size: 200 });
      }, 0);
    }
  }, [productId]);
  useEffect(() => {
    if (variations) {
      const customizedVariation = variations.find(
        (variation) => variation.id === variationId
      );

      setVariation({
        ...customizedVariation,
        keep_selling: originalVariation.keep_selling,
        alerting: originalVariation.alerting,
        threshold: originalVariation.threshold,
      });
      setInventoryAdjustment({});
    }
  }, [variationId]);

  useEffect(() => {
    if (variation.extra_data) {
      variation.extra_data.images_alt &&
        setImagesAlt(variation.extra_data.images_alt);
    }
  }, [variation]);

  useEffect(() => {
    if (variation.extra_data) {
      setVariation((tempVariation) => ({
        ...tempVariation,
        extra_data: {
          ...tempVariation.extra_data,
          ...((tempVariation.extra_data.images_alt || imagesAlt) && {
            images_alt: imagesAlt,
          }),
        },
      }));
    }
  }, [imagesAlt]);

  const { initial_price: price, discounted_price: finalPrice } = variation;
  const diffObject = getChangedObjectValues(
    originalVariation || {},
    variation || {}
  );
  const submit = () => {
    if (validate()) {
      let isInventoryChanged = false;
      if (inventoryAdjustment.amount) {
        isInventoryChanged =
          variation.inventory_count != inventoryAdjustment.amount;
      } else if (
        inventoryAdjustment.reason != DefaultInventoryAdjustment.reason
      )
        isInventoryChanged = true;

      const _originalVariation = {
        ...originalVariation,
      };
      delete _originalVariation.id;
      _updateVariation({
        variation,
        ...(isInventoryChanged && {
          variationInventoryAdjustment: inventoryAdjustment,
        }),
        uploadedFiles,
        callback: () => {
          setInventoryAdjustment(DefaultInventoryAdjustment);
        },
      });
    }
  };
  const onChangeAltText = (value) => {
    const defaultValue = `${_product.title} ${variation.title}`;
    setImagesAlt(() => {
      if (!variation.extra_data.images_alt && value == defaultValue) return "";
      return value;
    });
  };
  const onVariationIsActiveChange = (e) =>
    setVariation({
      ...variation,
      is_active: e.target.checked,
    });
  const toggleVariationAllDays = (e) => {
    if (e.target.checked)
      setVariation({
        ...variation,
        extra_data: {
          ...variation.extra_data,
          only_on_day: [],
        },
      });
    else
      setVariation({
        ...variation,
        extra_data: {
          ...variation.extra_data,
          only_on_day: availableOnDayOptions,
        },
      });
  };
  const onVariationOnlyOnDaysChange = (e, newValue) => {
    if (newValue.length > 0)
      setVariation({
        ...variation,
        extra_data: {
          ...variation.extra_data,
          only_on_day: newValue,
        },
      });
  };
  const onVariationSKUChange = (sku) => setVariation({ ...variation, sku });

  const onVariationInitialPriceChange = (value) => {
    setVariation({
      ...variation,
      initial_price: reversePriceFormatter(value),
      discounted_price: reversePriceFormatter(value),
    });
  };
  const onVariationDiscountedPriceChange =
    ({ isPercent, initialPrice }) =>
    (value) => {
      if (isPercent) {
        if (persianToEnglishNumber(value) <= 100) {
          setVariation({
            ...variation,
            discounted_price: Math.floor(
              reversePriceFormatter(initialPrice) *
                (1 - persianToEnglishNumber(value) / 100)
            ),
          });
        }
      } else {
        if (
          reversePriceFormatter(initialPrice) - reversePriceFormatter(value) >
          0
        ) {
          setVariation({
            ...variation,
            discounted_price:
              reversePriceFormatter(initialPrice) -
              reversePriceFormatter(value),
          });
        }
      }
    };
  const onVariationFinalUnitCostChange = (value) => {
    setVariation({
      ...variation,
      final_unit_cost: reversePriceFormatter(value),
    });
  };
  const onVariationPackagingPriceChange = (value) =>
    setVariation({
      ...variation,
      packaging_price: value === "" ? 0 : +value,
    });
  const onVariationInventoryReasonChange = (reason) => {
    setInventoryAdjustment({
      ...inventoryAdjustment,
      reason,
      amount: "",
    });
  };
  const onVariationInventoryAmountChange = (amount) => {
    setInventoryAdjustment({
      ...inventoryAdjustment,
      amount,
    });
  };
  const onVariationKeepSellingChange = (e) => {
    setVariation({
      ...variation,
      keep_selling: !e.target.checked,
    });
  };
  const onVariationAlertingChange = (e) => {
    setVariation({
      ...variation,
      alerting: e.target.checked,
    });
  };
  const onVariationThresholdChange = (threshold) => {
    setVariation({
      ...variation,
      threshold,
    });
  };

  const emptyVariationModifierSets = () => {
    setVariation({
      ...variation,
      modifier_sets: [],
    });
  };
  const selectModifierSetsForVariation = (_modifierSet) => (event) => {
    if (event.target.checked) {
      const _modifierSets = [...variation?.modifier_sets];
      const selectedModifierSet = modifierSets.find(
        (modifierSet) => modifierSet.id === _modifierSet.id
      );
      _modifierSets.push(selectedModifierSet);
      setVariation({
        ...variation,
        modifier_sets: _modifierSets,
      });
    } else {
      const _modifierSets = [...variation?.modifier_sets];
      const selectedModifierSetIndex = _modifierSets.findIndex(
        (modifierSet) => modifierSet.id === _modifierSet.id
      );
      if (selectedModifierSetIndex > -1) {
        _modifierSets.splice(selectedModifierSetIndex, 1);
        setVariation({
          ...variation,
          modifier_sets: _modifierSets,
        });
      }
    }
  };
  const customizeVariationModifierSet = (selectedModifierSet) => (data) => {
    setVariation({
      ...variation,
      modifier_sets: [...variation?.modifier_sets].map((modifier_set) =>
        modifier_set.id === selectedModifierSet.id
          ? { ...modifier_set, ...data }
          : modifier_set
      ),
    });
  };

  const onVariationImageDeleteClick = (item) => (e) => {
    e.stopPropagation();
    if (_product.id) {
      deleteProductImage(item);
    } else {
      _removeFile(item.initialIndex);
    }
  };
  const deleteProductImage = (_image) => {
    _deleteVariationImage(_image.id, variation.id, variation.resource, () => {
      setImagesArray((images) =>
        images.filter((item) => item.id !== _image.id)
      );
    });
    const selectedImage = variationImages.findIndex(
      (variationImage) => variationImage.id === _image.id
    );
    const newVariationImages = [...variationImages];
    newVariationImages.splice(selectedImage, 1);
    if (selectedImage > -1) {
      setVariation({ ...variation, images: newVariationImages });
    }
  };
  const handleVariationImagesOnDragEnd = (
    sourceId,
    sourceIndex,
    destinationIndex
  ) => {
    const items = Array.from(imagesArray);
    if (destinationIndex === items?.length || sourceIndex === items?.length)
      return;
    const [reorderedItem] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, reorderedItem);
    setImagesArray(items);
  };
  const onVariationImagesChange = (files) => {
    _uploadFile(files, "business_products_images", () =>
      _uploadImageAndUpdateVariation(variation.id, variation.resource, product)
    );
  };
  return {
    uploadedFiles,
    isLoading,
    product,
    urlPrefix,
    branches,
    pluginsData,
    cleanUploads,
    _uploadFile,
    _removeFile,
    error,
    setError,
    inventoryAdjustment,
    setInventoryAdjustment,
    _product,
    _setProduct,
    variation,
    setVariation,
    isProductDefaultImageShowing,
    toggleProductDefaultImageShowing,
    variations,
    setVariations,
    pluginUrl,
    router,
    productId,
    variationId,
    myFiles,
    validate,
    price,
    finalPrice,
    submit,
    onVariationIsActiveChange,
    onVariationOnlyOnDaysChange,
    toggleVariationAllDays,
    onVariationSKUChange,

    onVariationInitialPriceChange,
    onVariationDiscountedPriceChange,
    onVariationFinalUnitCostChange,
    onVariationPackagingPriceChange,

    onVariationInventoryReasonChange,
    onVariationInventoryAmountChange,
    onVariationKeepSellingChange,
    onVariationAlertingChange,
    onVariationThresholdChange,

    modifierSets,
    ingredients,

    emptyVariationModifierSets,
    selectModifierSetsForVariation,
    customizeVariationModifierSet,
    isVariationIdChangeConfirmationModalOpen,
    toggleVariationIdChangeConfirmationModalOpen,
    originalVariation,
    diffObject,
    imagesAlt,
    onChangeAltText,
    onVariationImageDeleteClick,
    handleVariationImagesOnDragEnd,
    onVariationImagesChange,
    imagesArray,
  };
}
