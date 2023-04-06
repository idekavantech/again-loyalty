/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
import React, { memo, useState } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Modal from "@saas/components/Modal";
import ModalHeader from "@saas/components/Modal/ModalHeader";

import AdminBreadCrumb from "containers/AdminBreadCrumb";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import Paper from "@material-ui/core/Paper";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { pollution } from "@saas/utils/colors";
import LazyImage from "@saas/components/LazyImage";
import VariationInventory from "./components/VariationInventory";
import VariationIngredientSection from "./components/VariationIngredientSection";
import Input from "@saas/components/Input";
import ModifiersSection from "./components/ModifierSetsSection";
import { useProductVariation } from "./useProductVariation";
import VariationImagesSection from "./components/VariationImagesSection";
import AdminProductInBoxWrapper from "../AdminProduct/components/AdminProductInBoxWrapper";
import TextSwitch from "@saas/components/ModernSwitch";
import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";
import { reversePriceFormatter } from "@saas/utils/helpers/reversePriceFormatter";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import AdminProductBox from "../AdminProduct/components/AdminProductBox";
import VariationStoreAndDeliverySection from "./components/VariationStoreAndDeliverySection";

function AdminProductVariation({ isSuper = false, plugin = SHOPPING_PLUGIN }) {
  const {
    isLoading,
    urlPrefix,
    inventoryAdjustment,
    _product,
    variation,
    setVariation,
    variations,
    pluginUrl,
    router,

    main_image_url,
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
    imagesAlt,
    onChangeAltText,
    modifierSets,
    ingredients,
    emptyVariationModifierSets,
    selectModifierSetsForVariation,
    customizeVariationModifierSet,
    isVariationIdChangeConfirmationModalOpen,
    toggleVariationIdChangeConfirmationModalOpen,
    diffObject,
    imagesArray,
    onVariationImageDeleteClick,
    handleVariationImagesOnDragEnd,
    onVariationImagesChange,
  } = useProductVariation({ plugin });
  let variationAltImages = imagesAlt
    ? imagesAlt
    : variation.id
    ? `${_product?.title} ${variation?.title}`
    : "";

  const [isPercent, setIsPercent] = useState(true);
  const { initial_price: initialPrice, discounted_price: discountedPrice } =
    variation;

  const { maxWidth430: isMobile } = useResponsive();

  if (!_product || !variation) {
    return <LoadingIndicator />;
  }

  const truncate = (input, length) => {
    if (input.length > length) {
      return input.substring(0, length) + "...";
    }
    return input;
  };

  return (
    <div className="container pb-3">
      <AdminBreadCrumb
        submitAction={submit}
        isLoading={isLoading}
        submitButtonText="Save changes"
        buttonContainerClassName="d-flex flex-row-reverse"
      />

      <Modal
        isSmall
        noHeight
        isOpen={isVariationIdChangeConfirmationModalOpen}
        header={
          <ModalHeader
            onRightClick={() =>
              toggleVariationIdChangeConfirmationModalOpen(false)
            }
            title="Alert non -save changes"
          />
        }
        body={
          <>
            <div style={{ maxWidth: 580 }} className="mt-1 mx-auto">
              <div className="px-3 mt-2 p-3">
                Please save the changes before changing the variety. Otherwise
                Face, your changes will not save.
              </div>
            </div>
          </>
        }
        cta={
          <Button
            color="primary"
            variant="contained"
            className="w-100"
            onClick={() => {
              submit();
              toggleVariationIdChangeConfirmationModalOpen(false);
            }}
          >
            Store
          </Button>
        }
      />
      <div className="mt-3 d-flex flex-wrap">
        <div className="col-lg-4 px-0 col-12 mb-3">
          <Paper className="p-3">
            {_product ? (
              <div className="d-flex align-items-center">
                <LazyImage
                  width={60}
                  height={60}
                  src={main_image_url?.url || main_image_url}
                />
                <div className="p-2">
                  <div style={{ fontSize: 16 }}>{_product.title}</div>
                  <div className="mt-1" style={{ color: pollution }}>
                    {englishNumberToPersianNumber(_product.variations.length)}{" "}
                    variety
                  </div>
                  <div className="mt-1">
                    <Button
                      size="small"
                      variation="outlined"
                      color="primary"
                      onClick={() =>
                        router.push(
                          `${urlPrefix}${pluginUrl}/settings/products/${_product.id}`
                        )
                      }
                    >
                      Back to the product page
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <LoadingIndicator />
            )}
          </Paper>
          <Paper className="mt-3" style={{ overflow: "hidden" }}>
            {variations ? (
              <List dense>
                {variations.map((variation) => {
                  const { images: variationImages } = variation;
                  let { main_image_thumbnail_url: mainImageThumbnailUrl } =
                    variation;
                  if (!variationImages?.length) {
                    mainImageThumbnailUrl = _product.main_image_url;
                  }
                  return (
                    <ListItem
                      key={variation.id}
                      button
                      onClick={() => {
                        if (Object.keys(diffObject).length) {
                          toggleVariationIdChangeConfirmationModalOpen(true);
                        } else {
                          router.push(
                            `${urlPrefix}${pluginUrl}/settings/products/${_product.id}/variations/${variation.id}`
                          );
                        }
                      }}
                      className="p-3 d-flex align-items-center"
                      style={{
                        background:
                          variation.id === parseInt(router.query.variation_id)
                            ? "#eeeeee"
                            : "",
                        fontWeight: 700,
                      }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 4,
                          overflow: "hidden",
                        }}
                        className="position-relative"
                      >
                        <LazyImage src={mainImageThumbnailUrl} />
                      </div>
                      <div className="px-3">
                        {variation.title || "Default diversity"}
                      </div>
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <LoadingIndicator />
            )}
          </Paper>
        </div>

        <div className="col-lg-8 col-12 px-0 pr-lg-3">
          <AdminProductBox>
            <AdminProductInBoxWrapper padding={"32px 48px"}>
              <div className="u-fontLarge u-fontWeightBold mb-3 mr-1">
                {_product.title}
              </div>
              <div className="col-12 mb-3">
                <Input
                  labelPlacement="top"
                  placeholder="Your product name or product"
                  label="Various title"
                  value={variation.title}
                  onChange={(value) => {
                    setVariation({ ...variation, title: value });
                  }}
                  InputProps={{ className: "u-height-48 u-border-radius-8" }}
                  labelClassName={"u-fontMedium"}
                />
              </div>
              <div className="d-flex flex-wrap">
                <div className="col-12 col-lg-6">
                  <Input
                    labelPlacement="top"
                    label="price product($)"
                    placeholder="price product"
                    selectOnFocus
                    value={initialPrice}
                    className="u-fontNormal"
                    priceInput
                    onChange={onVariationInitialPriceChange}
                    InputProps={{ className: "u-height-48 u-border-radius-8" }}
                    labelClassName={"u-fontMedium"}
                  />
                </div>
                <div className={`col-12 col-lg-6 ${isMobile ? "mt-3" : ""}`}>
                  <div className="d-flex position-relative align-items-center">
                    <TextSwitch
                      width={120}
                      height={36}
                      style={{ top: 35, left: 4, boxShadow: "none" }}
                      className="position-absolute z-index-2"
                      isSwitchOn={isPercent}
                      toggleSwitch={setIsPercent}
                      texts={["$", "Percent"]}
                    />
                    <Input
                      selectOnFocus
                      value={
                        isPercent
                          ? englishNumberToPersianNumber(
                              calculateDiscountPercent(
                                reversePriceFormatter(initialPrice),
                                discountedPrice
                              ),
                              ""
                            )
                          : englishNumberToPersianNumber(
                              reversePriceFormatter(initialPrice) -
                                discountedPrice,
                              ""
                            )
                      }
                      className={`u-fontNormal ${
                        !isPercent ? "productDiscountToman" : ""
                      }`}
                      priceInput={!isPercent}
                      onChange={onVariationDiscountedPriceChange({
                        isPercent,
                        initialPrice,
                      })}
                      labelPlacement="top"
                      placeholder={`${isPercent ? "Percent" : "the amount of"} Discount`}
                      label={`Product discount(${isPercent ? "Percent" : "$"})`}
                      numberOnly
                      InputProps={{
                        className: "u-height-48 u-border-radius-8",
                      }}
                      labelClassName={"u-fontMedium"}
                    />
                  </div>
                  <div
                    className={
                      "d-flex w-100 justify-content-end mt-3 align-items-center"
                    }
                  >
                    <h2
                      className={"ml-2"}
                      style={{ fontSize: 15, fontWeight: 600 }}
                    >
                      {` Different final price${truncate(
                        variation.title,
                        14
                      )}: ${priceFormatter(Math.round(discountedPrice))}`}
                    </h2>
                    <span style={{ fontSize: 11 }}>$</span>
                  </div>
                </div>
              </div>
            </AdminProductInBoxWrapper>
          </AdminProductBox>
          <AdminProductBox className={"my-4"}>
            <VariationImagesSection
              isLoading={isLoading}
              imagesArray={imagesArray}
              onChangeAltText={onChangeAltText}
              imagesAlt={variationAltImages}
              onVariationImageDeleteClick={onVariationImageDeleteClick}
              handleVariationImagesOnDragEnd={handleVariationImagesOnDragEnd}
              onVariationImagesChange={onVariationImagesChange}
            />
          </AdminProductBox>
          <AdminProductBox className={"my-4"}>
            <VariationInventory
              isSuper={isSuper}
              variation={variation}
              onVariationIsActiveChange={onVariationIsActiveChange}
              onVariationOnlyOnDaysChange={onVariationOnlyOnDaysChange}
              toggleVariationAllDays={toggleVariationAllDays}
              onVariationKeepSellingChange={onVariationKeepSellingChange}
              onVariationThresholdChange={onVariationThresholdChange}
              onVariationAlertingChange={onVariationAlertingChange}
              variationAdjustment={inventoryAdjustment}
              onVariationInventoryAmountChange={
                onVariationInventoryAmountChange
              }
              onVariationInventoryReasonChange={
                onVariationInventoryReasonChange
              }
            />
          </AdminProductBox>
          <AdminProductBox className={"my-4"}>
            <VariationStoreAndDeliverySection
              variation={variation}
              onVariationSKUChange={onVariationSKUChange}
              onVariationPackagingPriceChange={onVariationPackagingPriceChange}
            />
          </AdminProductBox>
          <AdminProductBox className={"my-4"}>
            <ModifiersSection
              isSuper={isSuper}
              variation={variation}
              setVariation={setVariation}
              modifierSets={modifierSets}
              emptyVariationModifierSets={emptyVariationModifierSets}
              selectModifierSetsForVariation={selectModifierSetsForVariation}
              customizeVariationModifierSet={customizeVariationModifierSet}
            />
          </AdminProductBox>
          <AdminProductBox className={"my-4"}>
            <VariationIngredientSection
              isSuper={isSuper}
              variation={variation}
              setVariation={setVariation}
              ingredients={ingredients}
            />
          </AdminProductBox>
          {/* <VendorSection
            modelId={variationId}
            variationId={variationId}
            modelType={VENDOR_ITEM_TYPE_DEAL}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default memo(AdminProductVariation);
