/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
import React, { memo, useState, useEffect, useCallback } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

import Modal from "@saas/components/Modal";
import {
  makeSelectBusinessThemeColor,
  makeSelectDeal,
} from "@saas/stores/business/selector";
import LoadingIndicator from "@saas/components/LoadingIndicator";

import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { removeParamsFromUrl } from "@saas/utils/helpers/removeParamsFromUrl";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { getProduct } from "@saas/stores/business/actions";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import { useRouter } from "next/router";
import { addOrderItemToCart } from "../../../actions";
import useTheme from "@material-ui/core/styles/useTheme";

function ExtraItemsModal({
  isOpen,
  _addOrderItemToCart,
  _getProduct,
  product,
}) {
  const router = useRouter();
  const theme = useTheme();
  const id = router && router.query.product;
  const variation_id = router && router.query.variation_id;
  const [modifiersCheckbox, check] = useState({});
  const [errors, setErrors] = useState({});
  const onClose = useCallback(() => {
    removeParamsFromUrl();
  }, []);
  useEffect(() => {
    if (id && isOpen) {
      _getProduct(id);
    }
  }, [isOpen]);
  useEffect(() => {
    if (id && product) {
      const {
        modifier_sets,
        extra_data: { modifier_sets: customModifierSets = {} },
      } = product;

      check(
        Object.fromEntries(
          modifier_sets.map((ms) => [
            ms.id,
            Object.values(ms.modifiers).filter((modifier) => {
              const item = {
                ...modifier,
                ...(customModifierSets[ms.id] || { modifiers: {} }).modifiers[
                  modifier.id
                ],
              };
              return item.default_selected;
            }),
          ])
        )
      );
      setErrors(Object.fromEntries(modifier_sets.map((ms) => [ms.id, ""])));
    }
  }, [id, product]);
  if (id) {
    if (product) {
      const {
        modifier_sets,
        extra_data: { modifier_sets: customModifierSets = {} },
      } = product;

      const submit = () => {
        let hasError = false;
        if (modifier_sets)
          modifier_sets.map((item) => {
            const modifierSet = {
              ...item,
              ...customModifierSets[item.id],
            };
            if (
              modifierSet.maximum_choice &&
              modifiersCheckbox[modifierSet.id].length >
                modifierSet.maximum_choice
            ) {
              hasError = true;
              setErrors({
                ...errors,
                [modifierSet.id]: `You are able to choose${englishNumberToPersianNumber(
                  modifierSet.maximum_choice
                )} You are.`,
              });
            }
            if (
              modifierSet.minimum_choice &&
              modifiersCheckbox[modifierSet.id].length <
                modifierSet.minimum_choice
            ) {
              hasError = true;
              setErrors({
                ...errors,
                [modifierSet.id]: `Should be at least${englishNumberToPersianNumber(
                  modifierSet.minimum_choice
                )} Select the item.`,
              });
            }
          });
        if (!hasError) {
          setTimeout(() => {
            _addOrderItemToCart(
              product,
              Object.entries(modifiersCheckbox).reduce(
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
          onClose();
        }
      };
      return (
        <Modal
          onClose={onClose}
          isOpen={isOpen}
          header={<ModalHeader onRightClick={onClose} title="Additives" />}
          body={
            <div className="p-3">
              <div className="text-center">
                {modifier_sets &&
                  modifier_sets.map((item) => {
                    const modifierSet = {
                      ...item,
                      ...customModifierSets[item.id],
                    };
                    return (
                      <div className="mb-3 mt-2" key={item?.id}>
                        <div className="d-flex mb-2 justify-content-between align-items-center">
                          <span>
                            <span className="u-fontWeightBold">
                              {modifierSet.title}
                            </span>{" "}
                            (
                            {modifierSet.minimum_choice > 0
                              ? "Mandatory"
                              : "Optional"}
                            )
                          </span>
                          {modifierSet.minimum_choice ||
                          modifierSet.maximum_choice ? (
                            <div
                              style={{ color: theme.palette.text.disabled }}
                              className="d-flex justify-content-end u-font-semi-small"
                            >
                              (
                              {modifierSet.maximum_choice
                                ? `Maximum${englishNumberToPersianNumber(
                                    modifierSet.maximum_choice
                                  )}`
                                : null}
                              {modifierSet.maximum_choice &&
                              modifierSet.minimum_choice
                                ? "،"
                                : ""}
                              {modifierSet.minimum_choice
                                ? `At least${englishNumberToPersianNumber(
                                    modifierSet.minimum_choice
                                  )}`
                                : null}
                              )
                            </div>
                          ) : null}
                        </div>
                        {Object.values(modifierSet.modifiers).map(
                          (modifier) => {
                            return (
                              <div
                                className="d-flex w-100 justify-content-between"
                                key={modifier.id}
                              >
                                <div className="d-flex align-items-start">
                                  <Checkbox
                                    checked={
                                      modifiersCheckbox &&
                                      modifiersCheckbox[modifierSet.id]
                                        ? modifiersCheckbox[
                                            modifierSet.id
                                          ].some((ms) => ms.id === modifier.id)
                                        : false
                                    }
                                    onChange={(e) => {
                                      const newModifiersCheckbox = {
                                        ...modifiersCheckbox,
                                      };
                                      if (e.target.checked)
                                        newModifiersCheckbox[
                                          modifierSet.id
                                        ].push(modifier);
                                      else
                                        newModifiersCheckbox[modifierSet.id] =
                                          newModifiersCheckbox[
                                            modifierSet.id
                                          ].filter(
                                            (ms) => ms.id !== modifier.id
                                          );
                                      check(newModifiersCheckbox);
                                    }}
                                    color="secondary"
                                  />
                                  <div
                                    style={{
                                      maxWidth: "calc(100% - 40px)",
                                    }}
                                    className="pr-3 text-right pt-2"
                                  >
                                    {modifier.title}
                                  </div>
                                </div>
                                <div className="flex-1 justify-content-end align-items-center d-flex">
                                  {modifier.price
                                    ? `${priceFormatter(modifier.price)} Toman`
                                    : "Free"}
                                </div>
                              </div>
                            );
                          }
                        )}
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
              Confirm and add to the shopping cart
            </Button>
          }
        />
      );
    }
  }
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={<ModalHeader onRightClick={onClose} />}
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
});

function mapDispatchToProps(dispatch) {
  return {
    _getProduct: (id) => dispatch(getProduct(id)),
    _addOrderItemToCart: (product, modifiers, variation_id) =>
      dispatch(addOrderItemToCart(product, modifiers, variation_id)),
    dispatch,
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(ExtraItemsModal);
