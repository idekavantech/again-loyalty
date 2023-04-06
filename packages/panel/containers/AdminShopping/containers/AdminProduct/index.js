/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
import React, { memo, useState } from "react";

import Button from "@material-ui/core/Button";
import Link from "next/link";

import InfoTable from "./components/InfoTable";
import GeneralInfo from "./components/GeneralInfo";
import PopularitySection from "./components/PopularitySection";

import LoadingIndicator from "@saas/components/LoadingIndicator";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import PopUp from "@saas/components/PopUp";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import {
  SHOPPING_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";
import SeoSettingsSection from "./components/SeoSettingsSection";
import SeoAnalysisSection from "./components/SeoAnalysisSection";
import VariationSection from "containers/AdminShopping/containers/AdminProduct/components/VariationSection";
import SimilarProductsSection from "containers/AdminShopping/containers/AdminProduct/components/SimilarProductsSection";
import LabelsSection from "containers/AdminShopping/containers/AdminProduct/components/LabelsSection";
import { slugify } from "@saas/utils/helpers/slugify";
import { useProduct } from "./useProduct";
import ProductImagesSection from "./components/ProductImagesSection";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@material-ui/icons/ArrowDropUpOutlined";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import ModifiersSection from "./components/ModifierSetsSection";
import IngredientSection from "./components/IngredientSection";
import SuccessMessageModal from "components/Modals/SuccessMessageModal";
import Inventory from "containers/AdminShopping/containers/AdminProduct/components/Inventory";
import { useRouter } from "next/router";
import AddIcon from "@material-ui/icons/Add";
import { ADMIN_HELP_VIDEOS } from "../../../AdminBreadCrumb/constants";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import AdminProductBox from "./components/AdminProductBox";
import { Collapse } from "react-collapse";
import StoreAndDeliverySection from "./components/StoreAndDeliverySection";

const WALK_THROUGH = "walkThrough"; // query param

function AdminProduct({ isSuper = false, plugin = SHOPPING_PLUGIN }) {
  const {
    AdminUrlPrefix,
    business,
    isLoading,
    _isLoading,
    labels,
    pluginUrl,
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
    onProductInventoryReasonChange,
    onProductInventoryAmountChange,
    onProductKeepSellingChange,
    onProductAlertingChange,
    onProductThresholdChange,
    modifierSets,
    emptyProductModifierSets,
    selectModifierSetsForProduct,
    customizeProductModifierSet,
    ingredients,
    isOpenSuccessModal,
    setIsOpenSuccessModal,
  } = useProduct({ isSuper, plugin });
  let productAltImages = imagesAlt
    ? imagesAlt
    : _product?.id
    ? _product.title
    : "";

  const [isMoreFeaturesCollapseOpen, setIsMoreFeaturesCollapseOpen] =
    useState(false);
  const router = useRouter();
  const iframe_from_pos =
    router.query.iframe_from_pos || typeof sessionStorage !== "undefined"
      ? sessionStorage.getItem("iframe_from_pos")
      : false;
  const isComingFromWalkThrough = router.query.source === WALK_THROUGH;

  const seoValues = {
    seo_title: seo.seo_title
      ? seo.seo_title
      : _product?.title
      ? `${_product?.title} | Online shopping with the highest% Discounts from${business.revised_title}`
      : "",
    meta_description: seo.meta_description
      ? seo.meta_description
      : _product?.title
      ? `online shopping${_product?.title} View details and discounts and send fast. ${
          productCategoriesName?.length
            ? "Buy the types," + productCategoriesName.join(" And")
            : ""
        } With the best price of${business.revised_title}`
      : "",
    keyphrase: seo.keyphrase
      ? seo.keyphrase
      : _product?.title
      ? _product?.title
      : "",
    slug: seo.slug ? seo.slug : _product?.title ? slugify(_product?.title) : "",
    ...seo,
  };

  return (
    <div className="container pb-4 w-100">
      <AdminBreadCrumb
        disableBreadcrumb={!!iframe_from_pos}
        submitAction={submit}
        isLoading={isLoading}
        helpVideo={{
          url: ADMIN_HELP_VIDEOS.product.url,
          title: "the product",
          id: "productHelpVideoBtn",
        }}
        buttons={
          (!isSuper && !iframe_from_pos && productId) || productId ? (
            <>
              {!isSuper && !iframe_from_pos && productId ? (
                <>
                  <Link
                    passHref
                    href={`${
                      business.get_vitrin_absolute_url
                    }/${SHOPPING_PLUGIN_URL}/products/${productId}-${slugify(
                      _product?.title || ""
                    )}`}
                    target="blank"
                  >
                    <Button
                      className="ml-2 breadcrumb_tuturial_btn"
                      color={"primary"}
                    >
                      <OpenInNewIcon
                        fontSize={"small"}
                        style={{ color: "#222633b3" }}
                      />
                      <span className="mr-1" style={{ color: "#222633b3" }}>
                        Preview
                      </span>
                    </Button>
                  </Link>
                </>
              ) : null}
              {productId ? (
                <Link
                  passHref
                  href={`${AdminUrlPrefix}s/settings/products/new`}
                  target="blank"
                >
                  <Button
                    className="breadcrumb_tuturial_btn"
                    color={"primary"}
                    id={"productAddProductBtn"}
                  >
                    <AddIcon
                      fontSize={"small"}
                      style={{ color: "#222633b3" }}
                    />
                    <span className="mr-1" style={{ color: "#222633b3" }}>
                      new product
                    </span>
                  </Button>
                </Link>
              ) : null}
              <div className="d-md-none">
                {!iframe_from_pos && productId && !isComingFromWalkThrough && (
                  <Button
                    className="ml-3"
                    disabled={isLoading}
                    onClick={() => setDialogBox(true)}
                    style={{ color: "#222633b3" }}
                  >
                    <DeleteOutlineOutlinedIcon
                      fontSize={"small"}
                      style={{ color: "#222633b3", marginLeft: "3px" }}
                    />
                    Remove Product
                  </Button>
                )}
              </div>
            </>
          ) : undefined
        }
        buttonContainerClassName="d-flex flex-1 justify-content-start"
      />
      <div className="d-flex justify-content-between my-3 align-items-center">
        <h1 style={{ fontSize: 20 }}>
          {productId && _product
            ? `Product details${_product?.title}`
            : "Add new product"}
        </h1>
        <div className="d-flex">
          <div className="d-none d-md-flex">
            <Button
              color="primary"
              variant="outlined"
              className={"u-border-radius-8 ml-2"}
              onClick={() =>
                router.push(`${AdminUrlPrefix}/s/settings/products`)
              }
              style={{ width: 100 }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              className={"u-border-radius-8"}
              onClick={() => submit(true)}
              style={{ width: 160 }}
              disabled={isLoading}
            >
              <SaveOutlinedIcon className={"ml-2"} />
              Store
            </Button>
          </div>
        </div>
      </div>
      {_product && !_isLoading ? (
        <div className="d-flex flex-wrap">
          <div style={{ marginBottom: -16 }} className="w-100">
            <AdminProductBox>
              <GeneralInfo
                error={titleError}
                product={_product}
                productHasVariations={productHasVariations}
                onProductTitleChange={onProductTitleChange}
                onProductEnglishTitleChange={onProductEnglishTitleChange}
                onProductInitialPriceChange={onProductInitialPriceChange}
                onProductDiscountedPriceChange={onProductDiscountedPriceChange}
                onProductFinalUnitCostChange={onProductFinalUnitCostChange}
              />
              <LabelsSection
                error={labelsError}
                labels={labels}
                product={_product}
                onProductLabelsChange={onProductLabelsChange}
                setProduct={_setProduct}
              />
            </AdminProductBox>
            <AdminProductBox className={"my-4"}>
              <ProductImagesSection
                hasVariations={productHasVariations}
                onChangeAltText={onChangeAltText}
                imagesAlt={productAltImages}
                isLoading={isLoading}
                imagesArray={imagesArray}
                product={_product}
                onProductDescriptionChange={onProductDescriptionChange}
                onProductImageDeleteClick={onProductImageDeleteClick}
                handleProductImagesOnDragEnd={handleProductImagesOnDragEnd}
                onProductImagesChange={onProductImagesChange}
              />
            </AdminProductBox>
            {_product ? (
              <AdminProductBox className={"my-4"}>
                <InfoTable
                  product={_product}
                  infoTable={infoTable}
                  setInfoTable={setInfoTable}
                  onProductInfoTableRowKeyChange={
                    onProductInfoTableRowKeyChange
                  }
                  onProductInfoTableRowValueChange={
                    onProductInfoTableRowValueChange
                  }
                  deleteProductInfoTableRow={deleteProductInfoTableRow}
                  createProductInfoTableRow={createProductInfoTableRow}
                  onProductComplementaryChange={onProductComplementaryChange}
                  emptyProductComplementaryChange={
                    emptyProductComplementaryChange
                  }
                />
              </AdminProductBox>
            ) : null}
            <AdminProductBox className={"my-4"}>
              <VariationSection
                product={_product}
                variationsTable={variationsTable}
                AdminUrlPrefix={AdminUrlPrefix}
                pluginUrl={pluginUrl}
                isSuper={isSuper}
                addVariantObjectToVariantsData={addVariantObjectToVariantsData}
                deleteVariant={deleteVariant}
                onVariantKeyChange={onVariantKeyChange}
                onVariantValuesChange={onVariantValuesChange}
                productHasVariations={productHasVariations}
                variationsValuesError={variationsValuesError}
                variationNameError={variationNameError}
              />
            </AdminProductBox>
            <div
              className={
                "w-100 my-5 u-fontLarge d-flex justify-content-center align-items-center"
              }
              style={{ color: "#00000099" }}
            >
              <span
                className={
                  "u-cursor-pointer d-flex justify-content-center align-items-center "
                }
                onClick={() =>
                  setIsMoreFeaturesCollapseOpen((prevState) => !prevState)
                }
              >
                {`${isMoreFeaturesCollapseOpen ? "to close" : ""} more facilities`}
                {isMoreFeaturesCollapseOpen ? (
                  <ArrowDropUpOutlinedIcon className={"mr-1"} size={"large"} />
                ) : (
                  <ArrowDropDownOutlinedIcon
                    className={"mr-1"}
                    size={"large"}
                  />
                )}
              </span>
            </div>
            <Collapse isOpened={isMoreFeaturesCollapseOpen} className={"my-4"}>
              {!productHasVariations ? (
                <AdminProductBox>
                  <Inventory
                    branches={branches}
                    product={{ superProductId: _product.id, ..._product }}
                    setProduct={_setProduct}
                    isSuper={isSuper}
                    adjustment={productInventoryAdjustment}
                    onProductInventoryReasonChange={
                      onProductInventoryReasonChange
                    }
                    onProductInventoryAmountChange={
                      onProductInventoryAmountChange
                    }
                    onProductKeepSellingChange={onProductKeepSellingChange}
                    onProductAlertingChange={onProductAlertingChange}
                    onProductThresholdChange={onProductThresholdChange}
                  />
                </AdminProductBox>
              ) : null}
              {!productHasVariations ? (
                <AdminProductBox className={"my-4"}>
                  <StoreAndDeliverySection
                    product={_product}
                    setProduct={_setProduct}
                    onProductPackagingPriceChange={
                      onProductPackagingPriceChange
                    }
                    onProductFinalUnitCostChange={onProductFinalUnitCostChange}
                  />
                </AdminProductBox>
              ) : null}
              <AdminProductBox className={"my-4"}>
                <SimilarProductsSection
                  selectedSimilarProductsLabels={selectedSimilarProductsLabels}
                  labels={labels}
                  onSimilarProductsLabelsChange={onSimilarProductsLabelsChange}
                />
              </AdminProductBox>
              {!productHasVariations && productId && (
                <>
                  <AdminProductBox className={"my-4"}>
                    <ModifiersSection
                      isSuper={isSuper}
                      product={_product}
                      setProduct={_setProduct}
                      modifierSets={modifierSets}
                      emptyProductModifierSets={emptyProductModifierSets}
                      selectModifierSetsForProduct={
                        selectModifierSetsForProduct
                      }
                      customizeProductModifierSet={customizeProductModifierSet}
                    />
                  </AdminProductBox>
                  <AdminProductBox className={"my-4"}>
                    <IngredientSection
                      isSuper={isSuper}
                      product={_product}
                      setProduct={_setProduct}
                      ingredients={ingredients}
                    />
                  </AdminProductBox>
                  {/* <VendorSection
                  modelId={_product.id}
                  modelType={VENDOR_ITEM_TYPE_DEAL}
                /> */}
                </>
              )}

              <AdminProductBox className={"my-4"}>
                <PopularitySection
                  product={_product}
                  setProduct={_setProduct}
                  onProductPopularityChange={onProductPopularityChange}
                />
              </AdminProductBox>
              <AdminProductBox className={"my-4"}>
                <SeoSettingsSection
                  product={_product}
                  seo={seoValues}
                  setSeo={setSeo}
                  business={business}
                  productCategoriesName={productCategoriesName}
                />
              </AdminProductBox>
              <AdminProductBox className={"my-4"}>
                <SeoAnalysisSection
                  seo={seoValues}
                  product={_product}
                  business={business}
                  productCategoriesName={productCategoriesName}
                />
              </AdminProductBox>
            </Collapse>
          </div>

          <PopUp
            open={isDialogBoxOpen}
            onClose={() => setDialogBox(false)}
            text="Are you willing to remove the product?"
            submitText="Remove Product"
            closeText="Cancel"
            onSubmit={confirmDeleteProduct}
          />
          <SuccessMessageModal
            isOpen={isOpenSuccessModal}
            title="congratulations!  Your first product
Successfully registered."
            content=" Selecting a label and category for each product increases users' access to product and the possibility of successful shopping, as well as helping your site be seen on Google higher.."
            next={() => {
              router.push(`${AdminUrlPrefix}`);
            }}
            onClose={() => setIsOpenSuccessModal(false)}
            image="/images/success-add-product.svg"
          />
          <div className="col-12 px-0 my-5 d-flex w-100 justify-content-end">
            <div className="d-none d-md-flex">
              {!iframe_from_pos && productId && !isComingFromWalkThrough && (
                <Button
                  color="primary"
                  className="ml-3"
                  disabled={isLoading}
                  onClick={() => setDialogBox(true)}
                >
                  Remove Product
                </Button>
              )}
              <Button
                color="primary"
                variant="outlined"
                className={"u-border-radius-8 ml-2"}
                onClick={() =>
                  router.push(`${AdminUrlPrefix}/s/settings/products`)
                }
                style={{ width: 100 }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="contained"
                className={"u-border-radius-8"}
                onClick={() => submit(true)}
                style={{ width: 160 }}
                disabled={isLoading}
              >
                <SaveOutlinedIcon className={"ml-2"} />
                Store
              </Button>
            </div>
          </div>
          <div
            style={{ boxShadow: "0px 0px 20px rgba(0, 40, 60, 0.16)" }}
            className="fixed-bottom p-3 bg-white d-flex align-items-center w-100 d-md-none justify-content-center px-5"
          >
            <Button
              color="primary"
              variant="outlined"
              className={"u-border-radius-8 ml-3 w-25"}
              onClick={() =>
                router.push(`${AdminUrlPrefix}/s/settings/products`)
              }
              // style={{ minWidth: 110 }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              className={"u-border-radius-8 w-75"}
              onClick={() => submit(true)}
              // style={{ minWidth: 170 }}
              disabled={isLoading}
            >
              <SaveOutlinedIcon className={"ml-2"} />
              Store
            </Button>
          </div>
        </div>
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
}

export default memo(AdminProduct);
