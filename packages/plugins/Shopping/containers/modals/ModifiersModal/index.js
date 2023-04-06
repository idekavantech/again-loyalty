/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import Button from "@material-ui/core/Button";

import Modal from "@saas/components/Modal";
import {
  makeSelectBusinessThemeColor,
  makeSelectDeal,
} from "@saas/stores/business/selector";
import LoadingIndicator from "@saas/components/LoadingIndicator";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { getProduct } from "@saas/stores/business/actions";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import { useRouter } from "next/router";
import useTheme from "@material-ui/core/styles/useTheme";
import RadioModifier from "../ModifiersModal/RadioModifier";
import CheckboxModifier from "../ModifiersModal/CheckboxModifier";
import NumberedModifier from "../ModifiersModal/NumberedModifier";
import { addOrderItemToCart } from "../../../actions";
import { makeSelectLoading } from "@saas/stores/global/selectors";

function ModifiersModal({
  isOpen,
  _addToCart,
  _getProduct,
  product,
  loading,
  onClose,
  productId,
  variationId,
}) {
  const router = useRouter();
  const theme = useTheme();
  const id = productId || router?.query.product;
  const variation_id = +variationId || +router?.query.variation_id;
  const [modifiersAmounts, setModifiersAmounts] = useState({});
  const [errors, setErrors] = useState({});
  const handleClose = useCallback(() => {
    onClose();
  }, []);
  useEffect(() => {
    if (id && isOpen) {
      _getProduct(id);
    }
  }, [isOpen]);
  const modifierSets = useMemo(() => {
    if (variation_id)
      return product?.variations?.find((variant) => variant.id === variation_id)
        ?.modifier_sets;
    return product?.variations[0]?.modifier_sets;
  }, [product, variation_id]);
  useEffect(() => {
    if (id && product) {
      const {
        extra_data: { modifier_sets: customModifierSets = {} },
      } = product;
      setModifiersAmounts(
        Object.fromEntries(
          modifierSets.map((ms) => [
            ms.id,
            Object.values(ms.modifiers)
              .filter(
                (modifier) =>
                  customModifierSets?.[ms.id]?.modifiers?.[modifier.id]
                    ?.default_selected ||
                  modifier?.customized_minimum_choice ||
                  modifier?.minimum_choice
              )
              .map((modifier) => ({
                ...modifier,
                amount:
                  modifier?.customized_minimum_choice ||
                  modifier?.minimum_choice ||
                  1,
              })),
          ])
        )
      );
      setErrors(Object.fromEntries(modifierSets.map((ms) => [ms.id, ""])));
    }
  }, [id, product]);
  if (id) {
    if (product) {
      const submit = () => {
        let hasError = false;
        if (modifierSets)
          modifierSets.map((modifierSet) => {
            const selectedNumber =
              modifiersAmounts[modifierSet.id]?.reduce(
                (modifierSetSum, modifierItem) =>
                  modifierSetSum + modifierItem.amount,
                0
              ) || 0;
            const modifierSetMinimumChoice =
              modifierSet.customized_minimum_choice ||
              modifierSet.minimum_choice;
            const ModifierSetMaximumChoice =
              modifierSet.customized_maximum_choice ||
              modifierSet.maximum_choice;

            if (
              ModifierSetMaximumChoice &&
              selectedNumber > ModifierSetMaximumChoice
            ) {
              hasError = true;
              setErrors({
                ...errors,
                [modifierSet.id]: `شما قادر به انتخاب حداکثر ${englishNumberToPersianNumber(
                  ModifierSetMaximumChoice
                )} آیتم هستید.`,
              });
            }
            if (
              modifierSetMinimumChoice &&
              selectedNumber < modifierSetMinimumChoice
            ) {
              hasError = true;
              setErrors({
                ...errors,
                [modifierSet.id]: `باید حداقل ${englishNumberToPersianNumber(
                  modifierSetMinimumChoice
                )} آیتم را انتخاب کنید.`,
              });
            }
          });
        if (!hasError) {
          setTimeout(() => {
            _addToCart(
              product,
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
              variation_id
            );
          }, 100);
          handleClose();
        }
      };

      return (
        <Modal
          onClose={handleClose}
          isOpen={isOpen}
          header={<ModalHeader onRightClick={handleClose} title="افزودنی‌ها" />}
          body={
            <div className="p-3">
              <div className="text-center">
                {modifierSets?.map((modifierSet) => {
                  // const modifierSet = {
                  //   ...modifierSet,
                  //   ...customModifierSets[modifierSet.id],
                  // };
                  const modifierSetMinimumChoice =
                    modifierSet.customized_minimum_choice ||
                    modifierSet.minimum_choice;
                  const ModifierSetMaximumChoice =
                    modifierSet.customized_maximum_choice ||
                    modifierSet.maximum_choice;

                  return (
                    <div key={modifierSet.id} className="mb-3 mt-2">
                      <div className="d-flex mb-2 justify-content-between align-items-center">
                        <span>
                          <span className="u-fontWeightBold">
                            {modifierSet.title}
                          </span>{" "}
                          ({modifierSetMinimumChoice > 0 ? "اجباری" : "اختیاری"}
                          )
                        </span>
                        {modifierSetMinimumChoice ||
                        ModifierSetMaximumChoice ? (
                          <div
                            style={{ color: theme.palette.text.disabled }}
                            className="d-flex justify-content-end u-font-semi-small"
                          >
                            (
                            {ModifierSetMaximumChoice
                              ? `حداکثر ${englishNumberToPersianNumber(
                                  ModifierSetMaximumChoice
                                )}`
                              : null}
                            {ModifierSetMaximumChoice &&
                            modifierSetMinimumChoice
                              ? "، "
                              : ""}
                            {modifierSetMinimumChoice
                              ? `حداقل ${englishNumberToPersianNumber(
                                  modifierSetMinimumChoice
                                )}`
                              : null}
                            )
                          </div>
                        ) : null}
                      </div>
                      {Object.values(modifierSet.modifiers).map((modifier) => {
                        const amount =
                          modifiersAmounts?.[modifierSet.id]?.find(
                            (modifierItem) => modifierItem.id === modifier.id
                          )?.amount || 0;
                        const isModifierAvailable = (() => {
                          if (modifier.available) return true;
                          if (modifier?.inventory_count > amount) return true;
                          return !!modifier?.keep_selling;
                        })();
                        const selectedNumber =
                          modifiersAmounts[modifierSet.id]?.reduce(
                            (modifierSetSum, modifierItem) =>
                              modifierSetSum + modifierItem.amount,
                            0
                          ) || 0;
                        const modifierSetMaximumChoice =
                          modifierSet.customized_maximum_choice ||
                          modifierSet.maximum_choice;
                        if (
                          modifierSetMaximumChoice === 1 &&
                          modifierSetMinimumChoice === 1
                        )
                          return (
                            <RadioModifier
                              key={modifier.id}
                              modifier={modifier}
                              modifierSet={modifierSet}
                              modifiersAmounts={modifiersAmounts}
                              setModifiersAmounts={setModifiersAmounts}
                              isAvailable={isModifierAvailable}
                            />
                          );
                        if (
                          modifierSetMaximumChoice > 1 ||
                          modifierSetMaximumChoice === null
                        )
                          return (
                            <NumberedModifier
                              key={modifier.id}
                              preventAdd={
                                modifierSetMaximumChoice &&
                                selectedNumber >= modifierSetMaximumChoice
                              }
                              modifier={modifier}
                              modifierSet={modifierSet}
                              modifiersAmounts={modifiersAmounts}
                              setModifiersAmounts={setModifiersAmounts}
                              isAvailable={isModifierAvailable}
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
                              modifierSetMaximumChoice &&
                              selectedNumber >= modifierSetMaximumChoice
                            }
                            isAvailable={isModifierAvailable}
                            loading={loading}
                          />
                        );
                      })}
                      <div style={{ color: theme.palette.error.main }}>
                        {errors[modifierSet.id]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          }
          cta={
            <Button
              id="SubmitPhoneNumber"
              onClick={submit}
              color="secondary"
              variant="contained"
              className="w-100"
            >
              تایید و افزودن به سبد خرید
            </Button>
          }
        />
      );
    }
  }
  return (
    <Modal
      onClose={handleClose}
      isOpen={isOpen}
      header={<ModalHeader onRightClick={handleClose} />}
      body={
        <div style={{ height: 400 }}>
          <LoadingIndicator />
        </div>
      }
    />
  );
}

const mapStateToProps = createStructuredSelector({
  themeColor: makeSelectBusinessThemeColor(),
  product: makeSelectDeal(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getProduct: (id) => dispatch(getProduct(id)),
    _addToCart: (product, modifiers, variation_id) =>
      dispatch(addOrderItemToCart(product, modifiers, variation_id)),
    dispatch,
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(ModifiersModal);
