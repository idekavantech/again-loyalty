/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
import React, { memo, useEffect, useMemo, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import { makeSelectBusinessThemeColor } from "@saas/stores/business/selector";
import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { getMobileOperatingSystem } from "@saas/utils/helpers/getMobileOperatingSystem";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import useTheme from "@material-ui/core/styles/useTheme";
import Modal from "@material-ui/core/Modal";
import { textTypes, vanilla } from "@saas/utils/colors";
import AddIcon from "@material-ui/icons/Add";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CloseIcon from "@material-ui/icons/Close";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Slide from "@material-ui/core/Slide";
import RadioModifier from "../../containers/modals/ModifiersModal/RadioModifier";
import NumberedModifier from "../../containers/modals/ModifiersModal/NumberedModifier";
import CheckboxModifier from "../../containers/modals/ModifiersModal/CheckboxModifier";

import DiscountedPriceView from "../ProductCard2/DiscountPriceView";

import TomanIcon from "@saas/icons/TomanIcon";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from "@material-ui/core/Chip";
import ShareIcon from "@material-ui/icons/Share";
import CopyToClipboard from "react-copy-to-clipboard";
import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import Image from "next/image";

const alert = `/images/alert.svg`;

function ModifiersModal({
  isOpen,
  closeModalHandler,
  addOrderItemToCart,
  deal,
  updateOrderItemByOrderId,
  customizedOrderItems,
  selectedVariant = null,
  backModalHandler,
  selectedCustomizedOrderItem,
  deleteOrderItem,
  remainingDealCount,
  couldShop,
  urlPrefix,
  categoryId,
}) {
  const theme = useTheme();
  const themeColor = theme.palette.secondary.main;
  const title = selectedVariant
    ? selectedVariant.title
    : deal.default_variation?.title;
  const hasVariation = deal?.variants_data?.length;
  const description = deal.description;
  let _description = description.replace("nan", " ");
  const modifierSets = useMemo(() => {
    if (selectedVariant)
      return deal.variations?.find(
        (variant) => variant?.id === selectedVariant?.id
      )?.modifier_sets;
    return deal?.variations?.[0]?.modifier_sets;
  }, [deal, selectedVariant]);
  const hasModifier = modifierSets?.length;
  const price = deal.default_variation?.initial_price;
  const discountedPrice = deal.default_variation?.discounted_price;
  const hasDiscountedPercent = price > discountedPrice;
  const discountPercent = calculateDiscountPercent(price, discountedPrice);

  const hasImage = deal?.images?.length;
  const images = deal?.images?.map((image) => image?.image_url);

  const phoneSliderSetting = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [modifiersAmounts, setModifiersAmounts] = useState({});
  const [errors, setErrors] = useState({});
  const { maxWidth768 } = useResponsive();

  const [accordionsState, setAccordionsState] = useState([]);

  useEffect(() => {
    const newAccordionsState = modifierSets.map(() => ({
      state: true,
    }));
    setAccordionsState([...newAccordionsState]);
  }, [modifierSets]);

  const selectedModifiersPrice = useMemo(() => {
    return Object.values(modifiersAmounts)
      .map((modifierSet) =>
        modifierSet.map((modifiers) => modifiers.discounted_price)
      )
      .map((selectedModifiersInModifierSetsPrice) => {
        if (selectedModifiersInModifierSetsPrice?.length) {
          return selectedModifiersInModifierSetsPrice?.reduce(
            (accumulator, curr) => accumulator + curr
          );
        }
      })
      .reduce((a, b) => (a ? a : 0) + (b ? b : 0), 0);
  }, [modifiersAmounts]);

  const [dealCount, setProductCount] = useState(1);
  useEffect(() => {
    if (selectedCustomizedOrderItem) {
      setProductCount(selectedCustomizedOrderItem.count);
    } else setProductCount(1);
  }, [selectedCustomizedOrderItem, isOpen]);

  const finalPrice = useMemo(
    () =>
      dealCount *
      (selectedVariant
        ? selectedVariant.discounted_price + selectedModifiersPrice
        : selectedCustomizedOrderItem
        ? selectedCustomizedOrderItem?.product?.variants_data?.[
            selectedCustomizedOrderItem?.variation_id
          ]?.discounted_price + selectedModifiersPrice
        : discountedPrice + selectedModifiersPrice),
    [
      dealCount,
      selectedVariant,
      discountedPrice,
      selectedModifiersPrice,
      selectedCustomizedOrderItem,
    ]
  );

  const deviceType = getMobileOperatingSystem();
  useEffect(() => {
    if (hasModifier) {
      // const {
      //   modifier_sets,
      //   extra_data: { modifier_sets: customModifierSets = {} },
      // } = deal;
      // const modifier_sets = deal.variations?.[0]?.modifier_sets;
      const _modifierSets = modifierSets;
      setModifiersAmounts(
        Object.fromEntries(
          _modifierSets.map((ms) => [
            ms.id,
            Object.values(ms.modifiers)
              .filter((modifier) => {
                const orderItemModifierAmount = Boolean(
                  selectedCustomizedOrderItem?.modifiers.find(
                    (_modifier) => _modifier.id === modifier.id
                  )
                );
                return orderItemModifierAmount || modifier?.minimum_choice;
              })
              .map((modifier) => ({
                ...modifier,
                amount: modifier?.minimum_choice || 1,
              })),
            ,
          ])
        )
      );
      setErrors(Object.fromEntries(_modifierSets.map((ms) => [ms.id, ""])));
    }
  }, [deal, selectedCustomizedOrderItem, hasModifier, isOpen]);
  const [errorId, setErrorId] = useState(null);

  useEffect(() => {
    const errorId = +Object.entries(errors)?.find((value) => {
      return value?.[1].length > 0;
    })?.[0];

    if (errorId) {
      setErrorId(errorId);
      const errorElementId = document.getElementById(
        `modifierset_error-${errorId}`
      );
      errorElementId.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [errors]);

  const checkIsAvailableWithoutRemainingAmount = useMemo(() => {
    if (selectedVariant) {
      return (
        selectedVariant.available &&
        (selectedVariant.keep_selling || selectedVariant.inventory_count > 0)
      );
    } else {
      return (
        deal.default_variation?.available &&
        (deal.default_variation?.keep_selling ||
          deal.default_variation?.inventory_count > 0)
      );
    }
  }, [deal, selectedVariant]);

  const isAvailableWithoutInventoryCount = useMemo(() => {
    if (selectedCustomizedOrderItem) {
      if (selectedCustomizedOrderItem?.variation_id) {
        return selectedCustomizedOrderItem?.product?.variants_data?.[
          selectedCustomizedOrderItem?.variation_id
        ]?.keep_selling;
      }
      return selectedCustomizedOrderItem?.product?.keep_selling;
    } else if (selectedVariant) {
      return selectedVariant?.keep_selling;
    }
    return deal.default_variation?.keep_selling;
  }, [selectedCustomizedOrderItem, selectedVariant, deal]);

  const isAvailable = useMemo(() => {
    if (
      selectedCustomizedOrderItem?.count > 0 &&
      (dealCount < remainingDealCount + selectedCustomizedOrderItem?.count ||
        isAvailableWithoutInventoryCount)
    ) {
      return true;
    } else if (
      checkIsAvailableWithoutRemainingAmount &&
      selectedVariant &&
      (dealCount < remainingDealCount || isAvailableWithoutInventoryCount)
    ) {
      return true;
    } else if (
      !selectedVariant &&
      (dealCount < remainingDealCount || isAvailableWithoutInventoryCount)
    ) {
      return true;
    } else return false;
  }, [
    selectedCustomizedOrderItem,
    dealCount,
    remainingDealCount,
    checkIsAvailableWithoutRemainingAmount,
    isAvailableWithoutInventoryCount,
    selectedVariant,
  ]);
  const [productModalLinkCopied, setProductModalLinkCopied] = useState(false);
  useEffect(() => {
    if (productModalLinkCopied === true) {
      setTimeout(() => {
        setProductModalLinkCopied(false);
      }, 2000);
    }
  }, [productModalLinkCopied === true]);

  if (hasModifier) {
    // const {
    //   modifier_sets,
    //   extra_data: { modifier_sets: customModifierSets = {} },
    // } = deal;

    let hasError = false;
    const submit = () => {
      if (modifierSets)
        modifierSets.map((modifierSet) => {
          // const modifierSet = {
          //   ...item,
          //   ...customModifierSets[item.id],
          // };
          const selectedNumber =
            modifiersAmounts[modifierSet.id]?.reduce(
              (modifierSetSum, modifierItem) =>
                modifierSetSum + modifierItem.amount,
              0
            ) || 0;
          if (
            modifierSet.maximum_choice &&
            selectedNumber > modifierSet.maximum_choice
          ) {
            hasError = true;
            setErrors({
              ...errors,
              [modifierSet.id]: `شما قادر به انتخاب حداکثر ${englishNumberToPersianNumber(
                modifierSet.maximum_choice
              )} آیتم هستید.`,
            });
          }
          if (
            modifierSet.minimum_choice &&
            selectedNumber < modifierSet.minimum_choice
          ) {
            hasError = true;
            setErrors({
              ...errors,
              [modifierSet.id]: `باید حداقل ${englishNumberToPersianNumber(
                modifierSet.minimum_choice
              )} آیتم را انتخاب کنید.`,
            });
          }
        });

      if (!hasError) {
        setTimeout(() => {
          if (selectedCustomizedOrderItem) {
            updateOrderItemByOrderId(selectedCustomizedOrderItem.id, {
              product: selectedCustomizedOrderItem.product,
              modifiers: Object.entries(modifiersAmounts).reduce(
                (arr, [key, value]) => [
                  ...arr,
                  ...value.map((modifier) => ({
                    modifier_set_id: key,
                    modifier_id: modifier.id,
                    ...modifier,
                  })),
                ],
                []
              ),
              count: dealCount,
              variation_id: selectedCustomizedOrderItem?.variation_id,
            });
          } else {
            addOrderItemToCart(
              deal,
              Object.entries(modifiersAmounts).reduce(
                (arr, [key, value]) => [
                  ...arr,
                  ...value.map((modifier) => ({
                    modifier_set_id: key,
                    modifier_id: modifier.id,
                    ...modifier,
                  })),
                ],
                []
              ),
              selectedVariant?.id || deal?.default_variation?.id,
              dealCount
            );
          }
        }, 100);
      }
    };
    if (maxWidth768) {
      return (
        <Modal onClose={closeModalHandler} open={isOpen} className="w-100">
          <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
            <div
              style={{
                backgroundColor: "#F6F6F7",
                height: " 100vh",
                overflowY: "auto",
              }}
              className="position-relative w-100"
            >
              {hasImage ? (
                <div className="w-100 " style={{ height: "35vh" }}>
                  <Slider
                    className="mobile-product-modal-slider h-100 w-100"
                    {...phoneSliderSetting}
                  >
                    {images?.map((image, index) => (
                      <img
                        key={`mobile-slider-image-${index}`}
                        className="h-100 w-100  object-fit-cover"
                        src={image}
                      />
                    ))}
                  </Slider>
                </div>
              ) : null}
              <div
                className="position-relative"
                style={{ paddingTop: hasImage ? "unset" : 64 }}
              >
                <div
                  className="my-4 px-3 d-flex justify-content-between"
                  style={{ position: "sticky" }}
                >
                  <div>
                    <div
                      className=" mb-2"
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: textTypes.text.default,
                      }}
                    >
                      {title} {selectedVariant?.name}
                    </div>
                    {description ? (
                      <div
                        className=""
                        style={{
                          fontSize: 14,
                          fontWeight: 400,
                          color: textTypes.text.subdued,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: _description,
                        }}
                      ></div>
                    ) : null}
                  </div>
                  {hasDiscountedPercent ? (
                    <DiscountedPriceView
                      price={price}
                      discountPercent={discountPercent}
                      discountedPrice={discountedPrice}
                    />
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: textTypes.text.default,
                      }}
                    >
                      {priceFormatter(price)}{" "}
                      <TomanIcon
                        className="mr-1"
                        width={21}
                        height={21}
                        color="#202223"
                      />{" "}
                    </div>
                  )}
                </div>
                <div
                  className="px-3"
                  style={{ marginBottom: deviceType === "iOS" ? 240 : 130 }}
                >
                  {modifierSets?.map((modifierSet, index) => {
                    // const customModifierSetsWithoutModifiers = {
                    //   ...customModifierSets[_modifierSet.id],
                    // };
                    // delete customModifierSetsWithoutModifiers.modifiers;
                    // const modifierSet = {
                    //   ..._modifierSet,
                    //   ...customModifierSetsWithoutModifiers,
                    // };
                    return (
                      <div key={modifierSet.id}>
                        <Accordion
                          square={false}
                          style={{ backgroundColor: vanilla }}
                          expanded={accordionsState[index]?.state}
                          onChange={() => {
                            const newAccordionsState = [...accordionsState];
                            newAccordionsState[index] = {
                              state: !newAccordionsState[index].state,
                            };
                            setAccordionsState([...newAccordionsState]);
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            style={{ height: 77 }}
                            className="w-100"
                          >
                            <div className="w-100 d-flex align-items-center justify-content-between">
                              <div>
                                <div
                                  className="mb-1"
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: textTypes.text.default,
                                  }}
                                >
                                  {modifierSet.minimum_choice > 0 ? (
                                    <FiberManualRecordIcon
                                      style={{ color: themeColor, fontSize: 6 }}
                                      className="ml-3"
                                    />
                                  ) : null}
                                  {modifierSet.title}
                                </div>
                                <div
                                  style={{
                                    fontSize: 13,
                                    fontWeight: 300,
                                    color:
                                      errorId === modifierSet.id
                                        ? "#D82C0D"
                                        : textTypes.text.subdued,
                                  }}
                                >
                                  {modifierSet.minimum_choice > 0
                                    ? "انتخاب اجباری -"
                                    : "انتخاب اختیاری -"}{" "}
                                  {modifierSet.minimum_choice
                                    ? `حداقل ${englishNumberToPersianNumber(
                                        modifierSet.minimum_choice
                                      )}`
                                    : null}
                                  {modifierSet.maximum_choice &&
                                  modifierSet.minimum_choice
                                    ? " - "
                                    : ""}
                                  {modifierSet.maximum_choice
                                    ? `حداکثر ${englishNumberToPersianNumber(
                                        modifierSet.maximum_choice
                                      )}`
                                    : null}
                                </div>
                              </div>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails
                            className="w-100 d-block"
                            style={{ backgroundColor: "#fff" }}
                          >
                            {Object.values(modifierSet.modifiers).map(
                              (modifier) => {
                                // const modifier = {
                                //   ..._modifier,
                                //   ...customModifierSets[_modifier.id],
                                // };
                                const amount =
                                  modifiersAmounts?.[modifierSet.id]?.find(
                                    (modifierItem) =>
                                      modifierItem.id === modifier.id
                                  )?.amount || 0;
                                const isModifierAvaiable =
                                  modifier?.available &&
                                  (modifier?.keep_selling ||
                                    modifier?.inventory_count > amount);
                                const selectedNumber =
                                  modifiersAmounts[modifierSet.id]?.reduce(
                                    (modifierSetSum, modifierItem) =>
                                      modifierSetSum + modifierItem.amount,
                                    0
                                  ) || 0;
                                if (
                                  modifierSet.maximum_choice === 1 &&
                                  modifierSet.minimum_choice === 1
                                )
                                  return (
                                    <RadioModifier
                                      key={modifier.id}
                                      modifier={modifier}
                                      modifierSet={modifierSet}
                                      modifiersAmounts={modifiersAmounts}
                                      setModifiersAmounts={setModifiersAmounts}
                                      isAvailable={isModifierAvaiable}
                                      couldShop={couldShop}
                                    />
                                  );
                                if (modifier.maximum_choice > 1)
                                  return (
                                    <NumberedModifier
                                      key={modifier.id}
                                      preventAdd={
                                        modifierSet.maximum_choice &&
                                        selectedNumber >=
                                          modifierSet.maximum_choice
                                      }
                                      modifier={modifier}
                                      modifierSet={modifierSet}
                                      modifiersAmounts={modifiersAmounts}
                                      setModifiersAmounts={setModifiersAmounts}
                                      isAvailable={isModifierAvaiable}
                                      couldShop={couldShop}
                                    />
                                  );
                                return (
                                  <CheckboxModifier
                                    key={modifier.id}
                                    modifier={modifier}
                                    modifierSet={modifierSet}
                                    modifiersAmounts={modifiersAmounts}
                                    setModifiersAmounts={setModifiersAmounts}
                                    preventAdd={
                                      modifierSet.maximum_choice &&
                                      selectedNumber >=
                                        modifierSet.maximum_choice
                                    }
                                    isAvailable={isModifierAvaiable}
                                    couldShop={couldShop}
                                  />
                                );
                              }
                            )}
                            {errors[modifierSet.id] ? (
                              <div
                                id={`modifierset_error-${modifierSet.id}`}
                                className="mt-2"
                                style={{
                                  color: "#D82C0D",
                                  fontSize: 12,
                                  fontWeight: 400,
                                }}
                              >
                                <img src={alert} className="mr-3 ml-2" />
                                {errors[modifierSet.id]}
                              </div>
                            ) : null}
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    );
                  })}
                </div>
                <div
                  className="mt-auto"
                  style={{
                    position: "fixed",
                    bottom: 0,
                    width: "100%",
                    backgroundColor: vanilla,
                    borderBottomLeftRadius: 8,
                    zIndex: 1000,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#F0F0F0",
                      color: textTypes.text.default,
                      fontSize: 13,
                      fontWeight: 500,
                      textAlign: "center",
                      height: 36,
                    }}
                    className="py-2 d-flex align-items-center justify-content-center"
                  >
                    مجموع انتخاب شما: {priceFormatter(finalPrice)}{" "}
                    <TomanIcon
                      className="mr-1"
                      width={21}
                      height={21}
                      color="#202223"
                    />{" "}
                  </div>
                  <div
                    style={{ height: 73, backgroundColor: "#fff" }}
                    className="mx-4 d-flex align-items-center justify-content-center"
                  >
                    <div
                      style={{ height: 45 }}
                      className="w-100 d-flex align-items-center justify-content-center"
                    >
                      <div className="h-100 d-flex align-items-center ml-auto">
                        <div
                          className="h-100  d-flex align-items-center justify-content-center"
                          style={{
                            padding: 16,
                            color: isAvailable ? themeColor : "#F1F1F1",
                            maxWidth: 10.5,
                            minWidth: 10.5,
                            minHeight: 10.5,
                            maxHeight: 10.5,
                            border: `1px solid ${
                              isAvailable ? themeColor : "#F1F1F1"
                            }`,
                            borderRadius: 8,
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isAvailable) {
                              setProductCount(dealCount + 1);
                            }
                          }}
                        >
                          <AddIcon
                            style={{ fontSize: 18 }}
                            className="w-100 h-100"
                          />
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: textTypes.text.default,
                          }}
                          className="mx-3"
                        >
                          {englishNumberToPersianNumber(dealCount)}
                        </div>
                        <div
                          disabled={dealCount < 2}
                          className="h-100  d-flex align-items-center justify-content-center"
                          style={{
                            padding: 16,
                            color: dealCount === 1 ? "#F1F1F1" : themeColor,
                            maxWidth: 10.5,
                            minWidth: 10.5,
                            minHeight: 10.5,
                            maxHeight: 10.5,
                            border: `1px solid ${
                              dealCount === 1 ? "#F1F1F1" : themeColor
                            }`,
                            borderRadius: 8,
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            dealCount > 1
                              ? setProductCount(dealCount - 1)
                              : null;
                          }}
                        >
                          <RemoveRoundedIcon
                            style={{ fontSize: 18 }}
                            className="w-100 h-100"
                          />
                        </div>
                      </div>
                      {selectedCustomizedOrderItem?.count > 0 ? (
                        <Button
                          className="h-100 ml-2 px-2"
                          variant="contained"
                          style={{
                            backgroundColor: "transparent",
                            color: "#D72C0D",
                            border: "1px solid #D72C0D",
                            fontSize: 14,
                            fontWeight: 400,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteOrderItem(selectedCustomizedOrderItem.id);
                            setErrors({});
                            setModifiersAmounts({});
                            closeModalHandler();
                          }}
                        >
                          حذف
                        </Button>
                      ) : null}
                      <Button
                        className="h-100"
                        variant="contained"
                        disabled={!checkIsAvailableWithoutRemainingAmount}
                        style={{
                          backgroundColor:
                            checkIsAvailableWithoutRemainingAmount
                              ? themeColor
                              : "#E4E5E7",
                          color: checkIsAvailableWithoutRemainingAmount
                            ? "#fff"
                            : "#6D7175",
                          fontSize: 14,
                          fontWeight: 400,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          submit();
                          if (!hasError) {
                            closeModalHandler();
                          }
                        }}
                      >
                        {selectedCustomizedOrderItem
                          ? "اعمال تغییر"
                          : "افزودن به سبد خرید"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={closeModalHandler}
                style={{
                  backgroundColor: hasImage ? "#fff" : "transparent",
                  borderRadius: 8,
                  position: "absolute",
                  top: 16,
                  right: 16,
                  width: 24,
                  height: 24,
                }}
              >
                <CloseIcon style={{ color: "#5C5F62", fontSize: 24 }} />
              </button>
              <div
                className="mr-auto d-flex "
                style={{
                  backgroundColor: hasImage ? "#fff" : "transparent",
                  borderRadius: 8,
                  position: "absolute",
                  top: 16,
                  left: 16,
                  width: 24,
                  height: 24,
                }}
              >
                <CopyToClipboard
                  style={{
                    cursor: "pointer",
                    width: 24,
                    height: 24,
                  }}
                  text={`${window.location.host}${urlPrefix}/${SHOPPING_PLUGIN_URL}?p=${deal.default_variation?.id}&c=${categoryId}`}
                  onCopy={() => setProductModalLinkCopied(true)}
                >
                  <ShareIcon style={{ color: "#5C5F62" }} />
                </CopyToClipboard>
                {productModalLinkCopied ? (
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 2000,
                    }}
                  >
                    <Chip
                      className="mr-auto ml-1"
                      size="small"
                      label="کپی شد"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </Slide>
        </Modal>
      );
    }
    return (
      <div>
        <Modal
          className="d-flex align-items-center justify-content-center"
          open={isOpen}
          onClose={closeModalHandler}
          style={{ borderRadius: 8 }}
        >
          <Slide direction="right" in={isOpen} mountOnEnter unmountOnExit>
            <div
              style={{
                borderRadius: 8,
                overflow: "hidden",
                backgroundColor: hasImage ? "#F6F6F7" : "#fff",
                width: hasImage ? "" : 604,
                height: hasImage ? "" : 604,
                paddingTop: hasImage ? "unset" : 64,
              }}
              className="modifier-modal d-flex align-items-stretch justify-content-center position-relative"
            >
              {hasImage ? (
                <div className="w-50">
                  <Slider
                    className="product-modal-slider h-100 w-100"
                    {...phoneSliderSetting}
                  >
                    {images?.map((image, index) => (
                      <Image
                        key={`image-${index}`}
                        layout="fill"
                        className={`object-fit-cover`}
                        src={image}
                        alt={`محصول ${deal?.title}`}
                      />
                    ))}
                  </Slider>
                </div>
              ) : null}

              <div
                className={`${hasImage ? "w-50" : "w-100"} d-flex flex-column`}
                style={{
                  backgroundColor: "#fff",
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
              >
                <div style={{ overflowY: "auto" }} className="p-5 h-100">
                  <div className="mb-4">
                    {/* MODAL HEADER(MAIN NAME OF PRODUCT) */}

                    <div className="d-flex flex-column w-100 align-items-start justify-content-between">
                      <div
                        className="d-flex w-100 align-items-start justify-content-between"
                        style={{
                          backgroundColor: "#fff",
                        }}
                      >
                        {hasVariation || customizedOrderItems?.length ? (
                          <button
                            className="modal-close-btn d-flex align-items-center justify-content-center"
                            onClick={backModalHandler}
                            fulllWidth
                            style={{
                              borderRadius: 8,
                              backgroundColor: "#fff",
                              // top: 24,
                              // right: 24,
                              marginLeft: 28,
                            }}
                          >
                            <ArrowForwardIcon
                              style={{ color: "#5C5F62", fontSize: 25 }}
                            />
                          </button>
                        ) : null}
                        <div className="d-flex align-items-center justify-content-between w-100">
                          <div className="d-flex flex-column">
                            <div
                              className=" mb-2"
                              style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: textTypes.text.default,
                              }}
                            >
                              {title} {selectedVariant?.name}
                            </div>
                            <div
                              className=""
                              style={{
                                fontSize: 14,
                                fontWeight: 400,
                                color: textTypes.text.subdued,
                              }}
                              dangerouslySetInnerHTML={{
                                __html: _description,
                              }}
                            ></div>
                          </div>
                          {discountedPrice !== price ? (
                            <div className="d-flex flex-column justify-content-center align-items-start mr-4">
                              <div className="d-flex align-items-center justify-content-start">
                                <div
                                  className="ml-2"
                                  style={{
                                    fontSize: 16,
                                    fontWeight: 600,
                                    color: textTypes.text.disabled,
                                    textDecoration: "line-through",
                                  }}
                                >
                                  {priceFormatter(price)}
                                </div>
                                <div
                                  className="p-1"
                                  style={{
                                    color: themeColor,
                                    backgroundColor: "rgba(0, 80, 255, 0.08)",
                                    fontSize: 16,
                                    fontWeight: 700,
                                    borderRadius: 4,
                                  }}
                                >
                                  {englishNumberToPersianNumber(
                                    discountPercent
                                  )}
                                  %
                                </div>
                              </div>
                              <div
                                className=""
                                style={{
                                  fontSize: 16,
                                  fontWeight: 600,
                                  color: textTypes.text.default,
                                }}
                              >
                                <div className=" d-inline-block">
                                  {priceFormatter(discountedPrice)}
                                </div>
                                <TomanIcon
                                  className="mr-1"
                                  width={21}
                                  height={21}
                                  color="#202223"
                                />{" "}
                              </div>
                            </div>
                          ) : (
                            <div
                              className="d-flex align-items-center justify-content-center mr-4"
                              style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: textTypes.text.default,
                              }}
                            >
                              <div className=" d-inline-block">
                                {priceFormatter(price)}
                              </div>
                              <TomanIcon
                                className="mr-1"
                                width={21}
                                height={21}
                                color="#202223"
                              />{" "}
                            </div>
                          )}
                        </div>
                        <div
                          className="mr-auto d-flex pr-4"
                          style={{
                            padding: hasImage ? 10 : 2,
                          }}
                        >
                          {productModalLinkCopied ? (
                            <Chip
                              className="mr-auto ml-1"
                              size="small"
                              label="کپی شد"
                            />
                          ) : null}
                          <CopyToClipboard
                            style={{
                              cursor: "pointer",
                              width: 24,
                              height: 24,
                            }}
                            text={`${window.location.host}${urlPrefix}/${SHOPPING_PLUGIN_URL}?p=${deal.default_variation?.id}&c=${categoryId}`}
                            onCopy={() => setProductModalLinkCopied(true)}
                          >
                            <ShareIcon style={{ color: "#5C5F62" }} />
                          </CopyToClipboard>
                        </div>
                      </div>

                      <div className="mt-4 w-100">
                        {modifierSets?.map((modifierSet, index) => {
                          // const customModifierSetsWithoutModifiers = {
                          //   ...customModifierSets[_modifierSet.id],
                          // };
                          // delete customModifierSetsWithoutModifiers.modifiers;
                          // const modifierSet = {
                          //   ..._modifierSet,
                          //   ...customModifierSetsWithoutModifiers,
                          // };
                          return (
                            <div key={modifierSet.id} className="mb-4">
                              <Accordion
                                square={false}
                                style={{ backgroundColor: vanilla }}
                                expanded={accordionsState[index]?.state}
                                onChange={() => {
                                  const newAccordionsState = [
                                    ...accordionsState,
                                  ];
                                  newAccordionsState[index] = {
                                    state: !newAccordionsState[index]?.state,
                                  };
                                  setAccordionsState([...newAccordionsState]);
                                }}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  style={{ height: 77 }}
                                  className="w-100"
                                >
                                  <div className="w-100 d-flex align-items-center justify-content-between">
                                    <div>
                                      <div
                                        className="mb-1"
                                        style={{
                                          fontSize: 14,
                                          fontWeight: 700,
                                          color: textTypes.text.default,
                                        }}
                                      >
                                        {modifierSet.minimum_choice > 0 ? (
                                          <FiberManualRecordIcon
                                            style={{
                                              color: themeColor,
                                              fontSize: 6,
                                            }}
                                            className="ml-3"
                                          />
                                        ) : null}
                                        {modifierSet.title}
                                      </div>
                                      <div
                                        style={{
                                          fontSize: 13,
                                          fontWeight: 300,
                                          color:
                                            errorId === modifierSet.id
                                              ? "#D82C0D"
                                              : textTypes.text.subdued,
                                        }}
                                      >
                                        {modifierSet.minimum_choice > 0
                                          ? "انتخاب اجباری -"
                                          : "انتخاب اختیاری -"}{" "}
                                        {modifierSet.minimum_choice
                                          ? `حداقل ${englishNumberToPersianNumber(
                                              modifierSet.minimum_choice
                                            )}`
                                          : null}
                                        {modifierSet.maximum_choice &&
                                        modifierSet.minimum_choice
                                          ? " - "
                                          : ""}
                                        {modifierSet.maximum_choice
                                          ? `حداکثر ${englishNumberToPersianNumber(
                                              modifierSet.maximum_choice
                                            )}`
                                          : null}
                                      </div>
                                    </div>
                                  </div>
                                </AccordionSummary>
                                <AccordionDetails
                                  className="w-100 d-block"
                                  style={{ backgroundColor: "#fff" }}
                                >
                                  {Object.values(modifierSet.modifiers).map(
                                    (modifier) => {
                                      const amount =
                                        modifiersAmounts?.[
                                          modifierSet.id
                                        ]?.find(
                                          (modifierItem) =>
                                            modifierItem.id === modifier.id
                                        )?.amount || 0;
                                      const isModifierAvaiable =
                                        modifier?.available &&
                                        (modifier?.keep_selling ||
                                          modifier?.inventory_count > amount);
                                      const selectedNumber =
                                        modifiersAmounts[
                                          modifierSet.id
                                        ]?.reduce(
                                          (modifierSetSum, modifierItem) =>
                                            modifierSetSum +
                                            modifierItem.amount,
                                          0
                                        ) || 0;
                                      if (
                                        modifierSet.maximum_choice === 1 &&
                                        modifierSet.minimum_choice === 1
                                      )
                                        return (
                                          <RadioModifier
                                            key={modifier.id}
                                            modifier={modifier}
                                            modifierSet={modifierSet}
                                            modifiersAmounts={modifiersAmounts}
                                            setModifiersAmounts={
                                              setModifiersAmounts
                                            }
                                            isAvailable={isModifierAvaiable}
                                            couldShop={couldShop}
                                          />
                                        );
                                      if (modifier.maximum_choice > 1)
                                        return (
                                          <NumberedModifier
                                            key={modifier.id}
                                            preventAdd={
                                              modifierSet.maximum_choice &&
                                              selectedNumber >=
                                                modifierSet.maximum_choice
                                            }
                                            modifier={modifier}
                                            modifierSet={modifierSet}
                                            modifiersAmounts={modifiersAmounts}
                                            setModifiersAmounts={
                                              setModifiersAmounts
                                            }
                                            isAvailable={isModifierAvaiable}
                                            couldShop={couldShop}
                                          />
                                        );
                                      return (
                                        <CheckboxModifier
                                          key={modifier.id}
                                          modifier={modifier}
                                          modifierSet={modifierSet}
                                          modifiersAmounts={modifiersAmounts}
                                          setModifiersAmounts={
                                            setModifiersAmounts
                                          }
                                          preventAdd={
                                            modifierSet.maximum_choice &&
                                            selectedNumber >=
                                              modifierSet.maximum_choice
                                          }
                                          isAvailable={isModifierAvaiable}
                                          couldShop={couldShop}
                                        />
                                      );
                                    }
                                  )}
                                  {errors[modifierSet.id] ? (
                                    <div
                                      id={`modifierset_error-${modifierSet.id}`}
                                      className="mt-2"
                                      style={{
                                        color: "#D82C0D",
                                        fontSize: 12,
                                        fontWeight: 400,
                                      }}
                                    >
                                      <img src={alert} className="mr-3 ml-2" />
                                      {errors[modifierSet.id]}
                                    </div>
                                  ) : null}
                                </AccordionDetails>
                              </Accordion>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="mt-auto"
                  style={{
                    position: "sticky",
                    bottom: 0,
                    width: "100%",
                    backgroundColor: vanilla,
                    borderBottomLeftRadius: 8,
                  }}
                >
                  {couldShop ? (
                    <>
                      <div
                        style={{
                          backgroundColor: "#F0F0F0",
                          color: textTypes.text.default,
                          fontSize: 13,
                          fontWeight: 500,
                          textAlign: "center",
                          height: 36,
                        }}
                        className="py-2 d-flex align-items-center justify-content-center"
                      >
                        مجموع انتخاب شما: {priceFormatter(finalPrice)}{" "}
                        <TomanIcon
                          className="mr-1"
                          width={21}
                          height={21}
                          color="#202223"
                        />{" "}
                      </div>
                      <div
                        style={{ height: 73, backgroundColor: "#fff" }}
                        className="mx-4 d-flex align-items-center justify-content-center"
                      >
                        <div
                          style={{ height: 45 }}
                          className="w-100 d-flex align-items-center justify-content-center"
                        >
                          <div className="h-100 d-flex align-items-center ml-auto">
                            <div
                              className="h-100  d-flex align-items-center justify-content-center"
                              style={{
                                padding: 16,
                                color: isAvailable ? themeColor : "#F1F1F1",
                                maxWidth: 10.5,
                                minWidth: 10.5,
                                minHeight: 10.5,
                                maxHeight: 10.5,
                                border: `1px solid ${
                                  isAvailable ? themeColor : "#F1F1F1"
                                }`,
                                borderRadius: 8,
                                cursor: "pointer",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (isAvailable) {
                                  setProductCount(dealCount + 1);
                                }
                              }}
                            >
                              <Tooltip
                                placement="top"
                                title={!isAvailable ? "اتمام موجودی" : ""}
                              >
                                <AddIcon
                                  style={{ fontSize: 18 }}
                                  className="w-100 h-100"
                                />
                              </Tooltip>
                            </div>
                            <div
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                color: textTypes.text.default,
                              }}
                              className="mx-3"
                            >
                              {englishNumberToPersianNumber(dealCount)}
                            </div>
                            <div
                              disabled={dealCount < 2}
                              className="h-100  d-flex align-items-center justify-content-center"
                              style={{
                                padding: 16,
                                color: dealCount === 1 ? "#F1F1F1" : themeColor,
                                maxWidth: 10.5,
                                minWidth: 10.5,
                                minHeight: 10.5,
                                maxHeight: 10.5,
                                border: `1px solid ${
                                  dealCount === 1 ? "#F1F1F1" : themeColor
                                }`,
                                borderRadius: 8,
                                cursor: "pointer",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                dealCount > 1
                                  ? setProductCount(dealCount - 1)
                                  : null;
                              }}
                            >
                              <RemoveRoundedIcon
                                style={{ fontSize: 18 }}
                                className="w-100 h-100"
                              />
                            </div>
                          </div>
                          {selectedCustomizedOrderItem?.count > 0 ? (
                            <Button
                              className="h-100 ml-2 px-2"
                              variant="contained"
                              style={{
                                backgroundColor: "transparent",
                                color: "#D72C0D",
                                border: "1px solid #D72C0D",
                                fontSize: 14,
                                fontWeight: 400,
                              }}
                              onClick={() => {
                                deleteOrderItem(selectedCustomizedOrderItem.id);
                                setErrors({});
                                setModifiersAmounts({});
                                closeModalHandler();
                              }}
                            >
                              حذف
                            </Button>
                          ) : null}
                          <Button
                            className="h-100"
                            variant="contained"
                            disabled={!checkIsAvailableWithoutRemainingAmount}
                            style={{
                              backgroundColor:
                                checkIsAvailableWithoutRemainingAmount
                                  ? themeColor
                                  : "#E4E5E7",
                              color: checkIsAvailableWithoutRemainingAmount
                                ? "#fff"
                                : "#6D7175",
                              fontSize: 14,
                              fontWeight: 400,
                            }}
                            onClick={() => {
                              submit();
                              if (!hasError) {
                                closeModalHandler();
                              }
                            }}
                          >
                            {selectedCustomizedOrderItem
                              ? "اعمال تغییر"
                              : "افزودن به سبد خرید"}
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Button
                      className=" w-100"
                      variant="contained"
                      disabled
                      fullWidth
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      موقتا قادر به سفارش‌گیری نیستیم.
                    </Button>
                  )}
                </div>
              </div>
              <button
                className="modal-close-btn d-flex align-items-center justify-content-center"
                onClick={closeModalHandler}
                style={{
                  borderRadius: 8,
                  position: "absolute",
                  backgroundColor: "#fff",
                  top: 24,
                  right: 24,
                  padding: hasImage ? 10 : 2,
                }}
              >
                <CloseIcon style={{ fontSize: 25 }} />
              </button>
            </div>
          </Slide>
        </Modal>
      </div>
    );
  }
  return null;
}

const mapStateToProps = createStructuredSelector({
  themeColor: makeSelectBusinessThemeColor(),
  urlPrefix: makeSelectUrlPrefix(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(ModifiersModal);
