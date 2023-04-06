import React, { memo, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import { coal, night } from "@saas/utils/colors";

import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import DialogTitle from "@material-ui/core/DialogTitle";
import { $ } from "@saas/icons";
import { graphite, pollution } from "@saas/utils/colors";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import Icon from "@saas/components/Icon";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
const SELECT_MODIFIERS = "select_modifiers";
export function ModifiersModal({
  isOpen,
  onClose,
  isLoading,
  submit,
  orderItems,
  selectedProduct,
  selectedVariant,
  selectedIndex,
}) {
  const [selectedModifiers, selectModifiers] = useState([]);
  const variation_id = selectedVariant.id;
  const product_key = selectedProduct.id;
  let product = selectedProduct;
  const dealHasVariation = Boolean(product?.variants_data?.length);
  let productImage = product.main_image_thumbnail_url;
  let productTitle = product.title;
  const variation = dealHasVariation
    ? product.variations.find((variation) => (variation.id = variation_id))
    : product?.variations?.[0];
  let modifiers = variation?.modifier_sets;
  if (dealHasVariation) {
    product = value.variations.find(
      (variation) => (variation.id = variation_id)
    );
    productImage =
      variations.find((variation) => (variation.id = variation_id)).image_url ||
      productImage;
    productTitle = variations.find(
      (variation) => (variation.id = variation_id)
    ).title;
  }
  useEffect(() => {
    if (isOpen) {
      selectModifiers(
        orderItems?.find(
          (item, _index) =>
            item.product_id === product_key &&
            item.variation_id === variation_id &&
            _index === selectedIndex
        )?.modifiers
      );
    }
  }, [isOpen, orderItems]);
  const increaseModifier = (modifier, modifier_set_id) => {
    const _selectedModifiers = [...selectedModifiers];
    const hasThisModifier = _selectedModifiers.find(
      (_modifier) => _modifier.modifier_id === modifier.id
    );
    if (hasThisModifier) {
      _selectedModifiers.find(
        (_modifier) => _modifier.modifier_id === modifier.id
      ).amount += 1;
    } else {
      const newModifier = {
        amount: 1,
        modifier_id: modifier.id,
        modifier_set_id,
        ...modifier,
      };
      _selectedModifiers.push(newModifier);
    }

    selectModifiers(_selectedModifiers);
  };
  const descreaseModifier = (modifier) => {
    const _selectedModifiers = [...selectedModifiers];
    const foundIndex = _selectedModifiers.findIndex(
      (_modifier) => _modifier.modifier_id === modifier.id
    );
    if (_selectedModifiers[foundIndex].amount === 1) {
      _selectedModifiers.splice(foundIndex, 1);
    } else {
      _selectedModifiers.find(
        (_modifier) => _modifier.modifier_id === modifier.id
      ).amount -= 1;
    }

    selectModifiers(_selectedModifiers);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{ className: "w-100 m-2" }}
    >
      <DialogTitle>
        <div
          className="d-flex justify-content-between align-items-center p-4"
          style={{ borderBottom: "1px solid #EDEDED" }}
        >
          <div style={{ color: night, fontWeight: "bold", fontSize: 16 }}>
            Additive selection
          </div>
          <div>
            <IconButton
              className="p-0"
              onClick={onClose}
              style={{ color: night }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </div>
        </div>
      </DialogTitle>
      <DialogContent className="p-0 w-100">
        <TabContext value={SELECT_MODIFIERS}>
          <TabPanel className="p-0" value={SELECT_MODIFIERS}>
            <div
              className="p-4"
              style={{
                borderTop: "1px solid #EDEDED",
              }}
            >
              <div className="d-flex align-items-center">
                <div>
                  <img
                    width="48px"
                    height="48px"
                    style={{ borderRadius: 8 }}
                    src={productImage}
                    alt=""
                  />
                </div>
                <div className="mr-4">{productTitle}</div>
              </div>
              <div>
                {modifiers?.map((modifier_set) => {
                  const hasMinimumChoice = Boolean(modifier_set.minimum_choice);
                  return (
                    <div className="my-3 pt-4" key={modifier_set.id}>
                      <div
                        style={{ color: coal, fontSize: 14, fontWeight: 500 }}
                      >
                        {modifier_set.title}
                      </div>
                      <div className="d-flex align-items-center">
                        {hasMinimumChoice && (
                          <div className="ml-1">Mandatory-</div>
                        )}
                        {modifier_set.minimum_choice && (
                          <div className="ml-1">
                            At least:‌
                            {englishNumberToPersianNumber(
                              modifier_set.minimum_choice
                            )}{" "}
                            -
                          </div>
                        )}
                        {modifier_set.maximum_choicce && (
                          <div className="ml-1">
                            Maximum:‌
                            {englishNumberToPersianNumber(
                              modifier_set.maximum_choicce
                            )}
                          </div>
                        )}
                      </div>
                      {Object.entries(modifier_set.modifiers).map(
                        ([, modifier]) => {
                          const inventoryCount = modifier.inventory_count;
                          const selectedModifierInOrderItem =
                            selectedModifiers?.find(
                              (_modifier) =>
                                _modifier.modifier_id === modifier.id
                            );
                          return (
                            <div
                              key={modifier.id}
                              className="d-flex justify-content-between align-items-center"
                            >
                              <div className="d-flex align-items-center my-3">
                                <div
                                  className="d-flex align-items-center p-1 ml-2"
                                  style={{
                                    border: "1px solid #EDEDED",
                                    borderRadius: 8,
                                    maxWidth: "fit-content",
                                  }}
                                >
                                  <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={() => {
                                      increaseModifier(
                                        modifier,
                                        modifier_set.id
                                      );
                                    }}
                                    disabled={
                                      modifier?.maximum_choice ===
                                      selectedModifierInOrderItem?.amount
                                    }
                                  >
                                    <AddRoundedIcon fontSize="small" />
                                  </IconButton>
                                  <span className="mx-3">
                                    {englishNumberToPersianNumber(
                                      selectedModifierInOrderItem?.amount || 0
                                    )}
                                  </span>
                                  <IconButton
                                    size="small"
                                    style={{
                                      color: pollution,
                                    }}
                                    color="primary"
                                    onClick={() => descreaseModifier(modifier)}
                                    disabled={
                                      !selectedModifierInOrderItem ||
                                      modifier?.minimum_choice ===
                                        selectedModifierInOrderItem?.amount
                                    }
                                  >
                                    <RemoveRoundedIcon
                                      fontSize="small"
                                      color="primary"
                                    />
                                  </IconButton>
                                </div>
                                <div>{modifier.title}</div>
                              </div>
                              <div
                                className="d-flex align-items-center justify-content-between"
                                style={{ minWidth: 150 }}
                              >
                                <div>
                                  {englishNumberToPersianNumber(inventoryCount)}{" "}
                                  in stock
                                </div>
                                <div className="d-flex align-items-center">
                                  <div>
                                    {priceFormatter(modifier.discounted_price)}
                                  </div>
                                  <Icon
                                    icon={$}
                                    width={21}
                                    height={21}
                                    color={graphite}
                                    className="mr-1"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </TabPanel>
        </TabContext>
      </DialogContent>
      <DialogActions
        className="d-flex align-items-center justify-content-between p-4"
        style={{ borderTop: "1px solid #EDEDED" }}
      >
        <div>
          {englishNumberToPersianNumber(selectedModifiers?.length)} Additive
          chosen
        </div>
        <div>
          <Button
            onClick={() => {
              submit(selectedModifiers, product_key, variation_id);
            }}
            variant="contained"
            color="primary"
            className="u-box-shadow-none u-fontMedium"
            size="medium"
            disabled={isLoading}
          >
            Confirm
          </Button>
          <Button
            onClick={onClose}
            variant="outlined"
            color="primary"
            className="u-box-shadow-none u-fontMedium mr-3"
            size="medium"
          >
            Cancel
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default memo(ModifiersModal);
