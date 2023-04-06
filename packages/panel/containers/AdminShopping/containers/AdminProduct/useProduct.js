import {
  deleteImageFromProduct,
  getBusinessLabels,
  updateImageFromProduct,
} from "@saas/stores/business/actions";
import {
  makeSelectBranches,
  makeSelectBusiness,
  makeSelectBusinessLabels,
} from "@saas/stores/business/selector";
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
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  getAdminProduct,
  getIngredients,
  getJourneyState,
  getModifierSets,
  updateJourneyState,
  updateProduct,
  uploadImageAndUpdateProduct,
} from "store/actions";
import {
  makeSelectAdminProduct,
  makeSelectAdminProductImages,
  makeSelectIngredients,
  makeSelectJourneyState,
  makeSelectModifierSets,
} from "store/selectors";

import { getChangedObjectValues } from "@saas/utils/helpers/getChangedObjectValues";
import cloneDeep from "lodash/cloneDeep";
import { uniqueid } from "@saas/utils/helpers/uniqueid";
import { convertVariantToTable } from "@saas/utils/helpers/convertVariantToTable";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { reversePriceFormatter } from "@saas/utils/helpers/reversePriceFormatter";

const DefaultProductInventoryAdjustment = { reason: "2" };
export function useProduct({ isSuper, plugin }) {
  const dispatch = useDispatch();
  const product = useSelector(makeSelectAdminProduct());
  const AdminUrlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const business = useSelector(makeSelectBusiness());
  const uploadedFiles = useSelector(makeSelectUploadedFiles());
  const isLoading = useSelector(makeSelectLoading());
  const pluginsData = useSelector(makeSelectPlugins());
  const productImages = useSelector(makeSelectAdminProductImages());
  const labels = useSelector(makeSelectBusinessLabels());
  const modifierSets = useSelector(makeSelectModifierSets());
  const ingredients = useSelector(makeSelectIngredients());
  const journeyData = useSelector(makeSelectJourneyState());
  const branches = useSelector(makeSelectBranches());

  const _getProduct = (id) => dispatch(getAdminProduct(id));
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState();
  const _createProduct = (
    { product, images, productInventoryAdjustment, hasVariations },
    callback
  ) =>
    dispatch(
      createProduct(
        {
          product,
          images,
          productInventoryAdjustment,
          hasVariations,
        },
        callback
      )
    );

  const _deleteProduct = (productId, callback = null) =>
    dispatch(deleteProduct(productId, callback));

  const _updateProduct = ({
    product,
    uploadedFiles,
    productInventoryAdjustment,
    hasVariations = false,
    callback,
  }) =>
    dispatch(
      updateProduct({
        product,
        uploadedFiles,
        productInventoryAdjustment,
        hasVariations,
        callback,
      })
    );
  const _getIngredients = (data) => dispatch(getIngredients(data));
  const _getAdminModifiers = () => dispatch(getModifierSets());
  const cleanUploads = () => dispatch(clearUploadedFiles());
  const _getBusinessLabels = () => dispatch(getBusinessLabels());
  const _deleteProductImage = (imageId, variationId, resourceId, callback) =>
    dispatch(
      deleteImageFromProduct(imageId, variationId, resourceId, callback)
    );
  const _updateProductImage = (imageId, order, resourceId, callback) =>
    dispatch(updateImageFromProduct(imageId, order, resourceId, callback));
  const _uploadImageAndUpdateProduct = (variationId, resourceId, product) =>
    dispatch(uploadImageAndUpdateProduct(variationId, resourceId, product));
  const _uploadFile = (files, folderName, callback) =>
    dispatch(uploadFile({ files, folderName }, callback));
  const _removeFile = (index) => dispatch(removeFile(index));
  const _getJourneyState = () => dispatch(getJourneyState());
  const _updateJourneyState = (data, callback) =>
    dispatch(updateJourneyState(data, callback));
  const pluginUrl = pluginsData[plugin].plugin_url;
  const router = useRouter();
  const [conjoined, setConjoined] = useState(true);

  const productId = router.query.id === "new" ? null : router.query.id;
  const isCreatingNewProduct = !productId;
  const [labelsError, setLabelsError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [infoTable, setInfoTable] = useState([]);
  const [isDialogBoxOpen, setDialogBox] = useState(false);
  const [selectedSimilarProductsLabels, selectSimilarProductsLabels] = useState(
    []
  );
  const [variationsValuesError, setVariationsValuesError] = useState("");
  const [variationNameError, setVariationNameError] = useState("");
  const [variationsTable, setVariationsTable] = useState({});
  const [_product, _setProduct] = useState(null);
  const [seo, setSeo] = useState({});
  const [imagesArray, setImagesArray] = useState([]);
  const [bulkModifierSettingProducts, setBulkModifierSettingProducts] =
    useState({});
  const [_isLoading, _setIsloading] = useState(true);
  const [productInventoryAdjustment, setProductInventoryAdjustment] = useState(
    DefaultProductInventoryAdjustment
  );
  const [imagesAlt, setImagesAlt] = useState("");
  const editContinuedPage = useRef(null);
  const productIdRef = useRef();
  const productCategoriesName =
    product &&
    labels
      ?.filter((label) => product?.labels.includes(label.id))
      ?.map((label) => label.title);

  const productHasVariations = useMemo(
    () =>
      Boolean(
        _product?.variants_data?.reduce(
          (vars, variant) => [...vars, ...variant.values],
          []
        )?.length
      ),
    [_product?.variants_data]
  );
  const dashboardState = journeyData?.vitrin_journey_state?.dashboard_state;
  useEffect(() => {
    _getBusinessLabels();
    _getAdminModifiers();
    _getIngredients({ page_size: 200 });
    _getJourneyState();
    setImagesArray([]);
    if (productId) {
      setTimeout(() => {
        _setIsloading(true);
        _getProduct(productId);
        _setIsloading(false);
      }, 0);
    } else {
      _setIsloading(true);
      const initialCategory = labels?.find(
        (label) => label.id === +router.query.category
      );
      _setProduct({
        extra_data: { isSuper: Boolean(isSuper) },
        modifier_sets: [],
        labels: initialCategory ? [initialCategory.id] : [],
        seo: {},
        priority: 100,
        description: "",
        ingredients: [],
        variants_data: [],
        variations: [
          {
            title: null,
            available: true,
            initial_price: 0,
            discounted_price: 0,
            extra_data: { isSuper: Boolean(isSuper) },
            is_active: true,
            keep_selling: true,
          },
        ],
      });
      setVariationsTable({});
      setSeo({});
      selectSimilarProductsLabels([]);
      setInfoTable([]);
      _setIsloading(false);
    }
  }, [router.query.id]);
  useEffect(() => {
    if (!_product && product && productId && !isLoading) {
      _setIsloading(true);

      _setProduct(product);
      product.extra_data.images_alt &&
        setImagesAlt(product.extra_data.images_alt);
      setVariationsTable(
        Object.fromEntries(
          product.variations.map((variation, i) => [
            `${i}-${variation.id}`,
            variation,
          ])
        )
      );
      setImagesArray(productImages);
      if (Object.keys(product?.extra_data?.similar_products || {})?.length) {
        selectSimilarProductsLabels(
          product?.extra_data?.similar_products?.categories
        );
      } else {
        selectSimilarProductsLabels([]);
      }
      const _infoTable = cloneDeep(
        product?.extra_data?.info_table
          ? [...product?.extra_data?.info_table]
          : []
      );
      setInfoTable(_infoTable);
      setSeo(Object.keys(product?.seo)?.length ? product?.seo : {});
      _setIsloading(false);
    }
  }, [product, labels, productId]);

  useEffect(() => {
    if (productId !== null) {
      setImagesArray([...imagesArray, ...uploadedFiles]);
    } else {
      const uploadedImagesArray = [];
      uploadedFiles.map((file) =>
        uploadedImagesArray.push({
          initialIndex: uploadedFiles.indexOf(file),
          ...file,
        })
      );
      setImagesArray(uploadedImagesArray);
    }
  }, [uploadedFiles]);
  useEffect(() => {
    if (productImages && productId !== null) setImagesArray([...productImages]);
  }, [productImages]);
  useEffect(() => {
    if (isOpenSuccessModal === false) {
      _setProduct(null);
      editContinuedPage.current &&
        router.push(router.asPath.replace("new", productIdRef.current));
      !editContinuedPage.current &&
        router.push(router.asPath.replace("new", ""));
    }
  }, [isOpenSuccessModal]);

  const validate = () => {
    let hasError = false;
    if (!_product.title) {
      setTitleError("Please enter the product name.");

      if (!hasError && document.getElementById("product-general-section"))
        document.getElementById("product-general-section").scrollIntoView();
      hasError = true;
    }

    if (
      _product?.variants_data?.find(
        (variationSet) => variationSet.name.length === 0
      )
    ) {
      setVariationNameError("Please enter a variety of names. ");
      if (!hasError && document.getElementById("product-variation-section"))
        document.getElementById("product-variation-section").scrollIntoView();
      hasError = true;
    }
    if (
      _product?.variants_data?.find(
        (variationSet) => variationSet.values.length === 0
      )
    ) {
      setVariationsValuesError("Please enter various items.. ");
      if (!hasError && document.getElementById("product-variation-section"))
        document.getElementById("product-variation-section").scrollIntoView();
      hasError = true;
    }

    _setProduct({
      ..._product,
    });
    return !hasError;
  };

  const submit = (editContinued) => {
    editContinuedPage.current = editContinued;
    if (productHasVariations) {
      const isVariationNew = (variation) => typeof variation.id === "string";
      if (validate()) {
        setLabelsError("");
        const _variations = Object.values(variationsTable).map((variation) => ({
          ...variation,
          ...(isVariationNew(variation) && {
            keep_selling: true,
          }), // If variation is new, 'keep_selling' would be true by default
          new: false,
        }));
        if (_product?.extra_data?.complementary === "")
          delete _product?.extra_data?.complementary;
        const updatedProduct = {
          ..._product,
          modifier_sets: _product?.modifier_sets?.map((modifierSet) => ({
            modifier_set: modifierSet.id,
            ...(_product.extra_data?.modifier_sets?.[modifierSet.id] || {}),
          })),
          seo,
          variants_data: _product?.variants_data || [],
          variations: _variations?.map((variation) => ({
            ...variation,
            id: _product?.variations?.find((_variation) => {
              return _variation.id === variation.id;
            })
              ? variation.id
              : null,
          })) || [..._product.variations],
          extra_data: {
            ..._product.extra_data,
            ...(!productId && imagesAlt && { images_alt: imagesAlt }),
            ...(productId &&
              (_product.extra_data.images_alt || imagesAlt) && {
                images_alt: imagesAlt,
              }),
            similar_products: {
              conjoined,
              categories: selectedSimilarProductsLabels,
            },
            config: {
              is_saleable: true,
            },
            info_table: [...infoTable],
          },
        };
        /*
        comment these lines(incompleted ingerediant data)
        */

        // if (!_variations)
        //   defaultVariation.ingredients = _product.ingredients.map((productImage) => ({
        //     ingredient_id: productImage.ingredient_id,
        //     fraction: parseFloat(productImage.fupdatedProductraction),
        //   }));

        delete updatedProduct.deals;
        if (productId) {
          if (_variations) delete updatedProduct.ingredients;
          const originalProduct = {
            ...product,
          };
          delete originalProduct.id;
          delete originalProduct.variations;
          delete originalProduct.variants_data;
          delete originalProduct.modifier_sets;

          _updateProduct({
            product: getChangedObjectValues(originalProduct, updatedProduct),
            uploadedFiles: imagesArray,
            hasVariations: true,
            callback: () => {
              _setProduct(null);
              editContinued && window.scrollTo(0, 0);
              !editContinued &&
                router.push(router.asPath.replace(productId, ""));
              setProductInventoryAdjustment(DefaultProductInventoryAdjustment);
            },
            // ...(isInventoryChanged && productInventoryAdjustment),
          });
        } else {
          _createProduct(
            {
              product: updatedProduct,
              images: imagesArray,
              hasVariations: true,
            },
            (id) => {
              if (!dashboardState?.deal_step) {
                _updateJourneyState(
                  {
                    dashboard_state: {
                      ...dashboardState,
                      deal_step: 1,
                    },
                  },
                  () => {
                    productIdRef.current = id;
                    setIsOpenSuccessModal(true);
                  }
                );
              } else {
                _setProduct(null);
                editContinued && router.push(router.asPath.replace("new", id));
                !editContinued && router.push(router.asPath.replace("new", ""));
              }
            }
          );
        }
        cleanUploads();
      }
    } else {
      const defaultVariation = isCreatingNewProduct
        ? _product.variations[0]
        : _product.variations.find(
            (variation) => variation.id === _product.default_variation.id
          );
      if (validate()) {
        setLabelsError("");
        if (_product?.extra_data?.complementary === "")
          delete _product?.extra_data?.complementary;
        const updatedProduct = {
          ..._product,
          seo,
          variants_data: [],
          extra_data: {
            ..._product.extra_data,
            similar_products: {
              conjoined,
              categories: selectedSimilarProductsLabels,
            },
            config: {
              is_saleable: true,
            },
            info_table: [...infoTable],
            ...(!productId && imagesAlt && { images_alt: imagesAlt }),
            ...(productId &&
              (_product.extra_data.images_alt || imagesAlt) && {
                images_alt: imagesAlt,
              }),
          },
          variations: [
            {
              ...defaultVariation,
              title: _product.title,
              ...(!productId && {
                inventory_count: productInventoryAdjustment.amount,
              }),
              modifier_sets: defaultVariation?.modifier_sets?.map(
                (modifier_set) => ({
                  minimum_choice: modifier_set?.minimum_choice,
                  maximum_choice: modifier_set?.maximum_choice,
                  modifier_set: modifier_set?.id,
                  default_selected: modifier_set?.default_selected || [],
                })
              ),
            },
          ],
        };
        if (productId) {
          let isInventoryChanged = false;
          if (productInventoryAdjustment.amount) {
            isInventoryChanged =
              product.default_variation.inventory_count !=
              productInventoryAdjustment.amount;
          } else if (
            productInventoryAdjustment.reason !=
            DefaultProductInventoryAdjustment.reason
          )
            isInventoryChanged = true;

          const originalProduct = {
            ...product,
          };
          delete updatedProduct.deals;
          delete originalProduct.id;
          delete originalProduct.variations;
          delete originalProduct.variants_data;
          _updateProduct({
            product: getChangedObjectValues(originalProduct, updatedProduct),
            uploadedFiles: imagesArray,
            hasVariations: false,
            callback: () => {
              _setProduct(null);
              editContinued && window.scrollTo(0, 0);
              !editContinued &&
                router.push(router.asPath.replace(productId, ""));
              setProductInventoryAdjustment(DefaultProductInventoryAdjustment);
            },
            ...(isInventoryChanged && {
              productInventoryAdjustment,
            }),
          });
        } else {
          _createProduct(
            {
              product: updatedProduct,
              images: imagesArray,
              hasVariations: false,
            },
            (id) => {
              if (!dashboardState?.deal_step) {
                _updateJourneyState(
                  {
                    dashboard_state: {
                      ...dashboardState,
                      deal_step: 1,
                    },
                  },
                  () => {
                    productIdRef.current = id;
                    setIsOpenSuccessModal(true);
                  }
                );
              } else {
                _setProduct(null);
                editContinued && router.push(router.asPath.replace("new", id));
                !editContinued && router.push(router.asPath.replace("new", ""));
              }
            }
          );
        }
        cleanUploads();
      }
    }
  };

  const onChangeAltText = (value) => {
    const defaultValue = _product.title;
    setImagesAlt(() => {
      if (!_product.extra_data.images_alt && value == defaultValue) return "";
      return value;
    });
  };

  const confirmDeleteProduct = () => {
    setDialogBox(false);
    _deleteProduct(productId, () => {
      router.push(`${AdminUrlPrefix}s/settings/products`);
    });
  };
  const onProductTitleChange = (title) => {
    setTitleError("");
    _setProduct({ ..._product, title });
  };
  const onProductEnglishTitleChange = (title) => {
    setTitleError("");
    _setProduct({
      ..._product,
      multi_lang_data: { titles: { en: title } },
    });
  };
  const onProductDescriptionChange = (value) => {
    _setProduct({ ..._product, description: value });
  };
  const onProductComplementaryChange = (complementary) => {
    _setProduct({
      ..._product,
      extra_data: { ..._product.extra_data, complementary },
    });
  };
  const emptyProductComplementaryChange = () => {
    const __product = {
      ..._product,
    };
    delete __product.extra_data.complementary;
    _setProduct(__product);
  };
  const onProductInfoTableRowKeyChange = (index) => (value) => {
    const newProductInfoTable = [...infoTable];
    newProductInfoTable[index].key = value;
    setInfoTable([...newProductInfoTable]);
  };
  const onProductInfoTableRowValueChange = (index) => (value) => {
    const newProductInfoTable = [...infoTable];
    newProductInfoTable[index].value = value;
    setInfoTable([...newProductInfoTable]);
  };
  const deleteProductInfoTableRow = (index) =>
    setInfoTable([
      ...infoTable.filter((infoTableRow, _index) => _index !== index),
    ]);
  const createProductInfoTableRow = () =>
    setInfoTable([...infoTable, { key: "", value: "" }]);

  const addVariantObjectToVariantsData = () => {
    const __product = {
      ..._product,
      variants_data: [
        ..._product.variants_data,
        {
          id: uniqueid(),
          name: "",
          values: [],
        },
      ],
    };
    setVariationsTable(
      convertVariantToTable(
        __product.variants_data,
        false,
        variationsTable,
        _product
      )
    );

    _setProduct(__product);
  };

  const deleteVariant = (index) => () => {
    const __product = JSON.parse(JSON.stringify(_product));
    __product.variants_data.splice(index, 1);
    setVariationsTable(
      convertVariantToTable(
        __product.variants_data,
        false,
        variationsTable,
        _product
      )
    );
    _setProduct(__product);
  };
  const onVariantKeyChange = (index) => (name) => {
    const __product = JSON.parse(JSON.stringify(_product));
    __product.variants_data[index].name = name;
    setVariationsTable(
      convertVariantToTable(
        __product.variants_data,
        true,
        variationsTable,
        _product
      )
    );

    _setProduct(__product);
  };
  const onVariantValuesChange = (index) => (e, chips) => {
    try {
      const __product = JSON.parse(JSON.stringify(_product));
      __product.variants_data[index].values = chips.map((chip) => {
        const chipFound = __product.variants_data[index].values.find(
          (item) => item.value === chip
        );
        return {
          id: chipFound ? chipFound.id : uniqueid(),
          value: chip,
        };
      });

      setVariationsTable(
        convertVariantToTable(
          __product.variants_data,
          true,
          variationsTable,
          _product
        )
      );
      _setProduct(__product);
    } catch (e) {
      console.log(e);
    }
  };
  const onProductLabelsChange = (e, newLabels) => {
    setLabelsError("");
    _setProduct({
      ..._product,
      labels: newLabels?.map((label) => label.id),
    });
  };
  const onSimilarProductsLabelsChange = (e, _labels) => {
    selectSimilarProductsLabels(_labels.map((label) => label.id));
  };
  const onProductPopularityChange = (value) => {
    _setProduct({
      ..._product,
      priority: persianToEnglishNumber(value) || 0,
    });
  };

  const onProductImageDeleteClick = (item) => (e) => {
    e.stopPropagation();
    if (_product.id) {
      deleteProductImage(item);
    } else {
      _removeFile(item.initialIndex);
    }
  };
  const deleteProductImage = (_image) => {
    _deleteProductImage(
      _image.id,
      _product?.variations?.[0]?.id,
      _product.id,
      () => {
        setImagesArray((images) =>
          images.filter((item) => item.id !== _image.id)
        );
      }
    );
    const selectedImage = productImages.findIndex(
      (productImage) => productImage.id === _image.id
    );
    const newProductImages = [...productImages];
    newProductImages.splice(selectedImage, 1);
    if (selectedImage > -1) {
      _setProduct({ ..._product, images: newProductImages });
    }
  };
  const handleProductImagesOnDragEnd = (
    sourceId,
    sourceIndex,
    destinationIndex
  ) => {
    const items = Array.from(imagesArray);
    if (destinationIndex === items?.length || sourceIndex === items?.length)
      return;
    const [reorderedItem] = items.splice(sourceIndex, 1);

    items.splice(destinationIndex, 0, reorderedItem);
    _updateProductImage(
      reorderedItem.id,
      { order: destinationIndex },
      sourceId,
      () => {
        setImagesArray(items);
      }
    );
  };
  const onProductImagesChange = (files) => {
    if (!productId) {
      _uploadFile(files, "business_products_images");
    } else {
      _uploadFile(files, "business_products_images", () =>
        _uploadImageAndUpdateProduct(
          _product.default_variation.id,
          _product.id,
          _product
        )
      );
    }
  };

  const onProductInitialPriceChange = (value) => {
    _setProduct({
      ..._product,
      variations: [
        {
          ...(_product.variations?.[0] || {}),
          initial_price: reversePriceFormatter(value),
          discounted_price: reversePriceFormatter(value),
        },
      ],
    });
  };
  const onProductDiscountedPriceChange =
    ({ isPercent, initialPrice }) =>
    (value) => {
      if (isPercent) {
        if (persianToEnglishNumber(value) <= 100) {
          _setProduct({
            ..._product,
            variations: [
              {
                ...(_product.variations?.[0] || {}),
                discounted_price: Math.floor(
                  reversePriceFormatter(initialPrice) *
                    (1 - persianToEnglishNumber(value) / 100)
                ),
              },
            ],
          });
        }
      } else {
        if (
          reversePriceFormatter(initialPrice) - reversePriceFormatter(value) >
          0
        ) {
          _setProduct({
            ..._product,
            variations: [
              {
                ...(_product.variations?.[0] || {}),
                discounted_price:
                  reversePriceFormatter(initialPrice) -
                  reversePriceFormatter(value),
              },
            ],
          });
        }
      }
    };
  const onProductFinalUnitCostChange = (value) => {
    _setProduct({
      ..._product,
      variations: [
        {
          ...(_product.variations?.[0] || {}),
          final_unit_cost: reversePriceFormatter(value),
        },
      ],
    });
  };
  const onProductPackagingPriceChange = (value) =>
    _setProduct({
      ..._product,
      variations: [
        {
          ...(_product.variations?.[0] || {}),
          packaging_price: value === "" ? 0 : +value,
        },
      ],
    });
  const onProductInventoryReasonChange = (reason) => {
    setProductInventoryAdjustment({
      ...productInventoryAdjustment,
      reason,
      amount: "",
    });
  };
  const onProductInventoryAmountChange = (amount) => {
    setProductInventoryAdjustment({
      ...productInventoryAdjustment,
      amount,
    });
  };
  const onProductKeepSellingChange = (e) => {
    _setProduct((p) => ({
      ...p,
      variations: [
        {
          ...(p.variations?.[0] || {}),
          keep_selling: !e.target.checked,
        },
      ],
    }));
  };
  const onProductAlertingChange = (e) => {
    _setProduct({
      ..._product,
      variations: [
        {
          ...(_product.variations?.[0] || {}),
          alerting: e.target.checked,
        },
      ],
    });
  };
  const onProductThresholdChange = (threshold) => {
    _setProduct({
      ..._product,
      variations: [
        {
          ...(_product.variations?.[0] || {}),
          threshold,
        },
      ],
    });
  };
  const emptyProductModifierSets = () => {
    _setProduct({
      ..._product,
      variations: [
        {
          ..._product?.variations?.[0],
          modifier_sets: [],
        },
      ],
    });
  };
  const selectModifierSetsForProduct = (_modifierSet) => (event) => {
    if (event.target.checked) {
      const _modifierSets = [..._product.variations?.[0].modifier_sets];
      const selectedModifierSet = modifierSets.find(
        (modifierSet) => modifierSet.id === _modifierSet.id
      );
      _modifierSets.push(selectedModifierSet);
      _setProduct({
        ..._product,
        variations: [
          {
            ..._product?.variations?.[0],
            modifier_sets: _modifierSets,
          },
        ],
      });
    } else {
      const _modifierSets = [..._product.variations?.[0].modifier_sets];
      const selectedModifierSetIndex = _modifierSets.findIndex(
        (modifierSet) => modifierSet.id === _modifierSet.id
      );
      if (selectedModifierSetIndex > -1) {
        _modifierSets.splice(selectedModifierSetIndex, 1);
        _setProduct({
          ..._product,
          variations: [
            {
              ..._product?.variations?.[0],
              modifier_sets: _modifierSets,
            },
          ],
        });
      }
    }
  };
  const customizeProductModifierSet = (selectedModifierSet) => (data) => {
    _setProduct({
      ..._product,
      variations: [
        {
          ..._product?.variations?.[0],
          modifier_sets: [..._product?.variations?.[0].modifier_sets].map(
            (modifier_set) =>
              modifier_set.id === selectedModifierSet.id
                ? { ...modifier_set, ...data }
                : modifier_set
          ),
        },
      ],
    });
  };
  return {
    AdminUrlPrefix,
    business,
    isLoading,
    _isLoading,
    labels,
    pluginUrl,
    conjoined,
    setConjoined,
    labelsError,
    titleError,
    variationsValuesError,
    variationNameError,
    infoTable,
    setInfoTable,
    isDialogBoxOpen,
    setDialogBox,
    selectedSimilarProductsLabels,
    variationsTable,
    _product,
    imagesAlt,
    _setProduct,
    seo,
    setSeo,
    productId,
    productCategoriesName,
    branches,
    submit,
    confirmDeleteProduct,
    onProductTitleChange,
    onProductEnglishTitleChange,
    onProductDescriptionChange,
    onProductComplementaryChange,
    emptyProductComplementaryChange,
    onProductInfoTableRowKeyChange,
    onProductInfoTableRowValueChange,
    deleteProductInfoTableRow,
    createProductInfoTableRow,
    addVariantObjectToVariantsData,
    deleteVariant,
    onVariantKeyChange,
    onVariantValuesChange,
    onProductLabelsChange,
    onSimilarProductsLabelsChange,
    onProductPopularityChange,
    onProductImageDeleteClick,
    deleteProductImage,
    handleProductImagesOnDragEnd,
    onProductImagesChange,
    onChangeAltText,
    imagesArray,
    productHasVariations,
    onProductInitialPriceChange,
    onProductDiscountedPriceChange,
    onProductFinalUnitCostChange,
    onProductPackagingPriceChange,
    productInventoryAdjustment,
    setProductInventoryAdjustment,
    onProductInventoryReasonChange,
    onProductInventoryAmountChange,
    onProductKeepSellingChange,
    onProductAlertingChange,
    onProductThresholdChange,
    bulkModifierSettingProducts,
    setBulkModifierSettingProducts,
    modifierSets,
    emptyProductModifierSets,
    selectModifierSetsForProduct,
    customizeProductModifierSet,
    ingredients,
    isOpenSuccessModal,
    setIsOpenSuccessModal,
  };
}
