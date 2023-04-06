/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
import React, { memo } from "react";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import AdminBreadCrumb from "containers/AdminBreadCrumb";
import PopUp from "@saas/components/PopUp";
import Input from "@saas/components/Input";

import { units, VENDOR_ITEM_TYPE_INGREDIENT } from "store/constants";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AdjustIngredientInventory from "./components/AdjustIngredientInventory";

import { borderColor } from "@saas/utils/colors";
import IngredientInventoryHistory from "containers/AdminShopping/containers/AdminIngredient/containers/IngredientInventoryHistory";

import { useIngredient } from "./useIngredient";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import VendorSection from "../AdminProduct/components/VendorSection";

function AdminIngredient({ isSuper = false }) {
  const {
    theme,
    ingredientId,
    titleError,
    skuError,
    unitError,
    isDialogBoxOpen,
    setDialogBox,
    ingredient,
    isLoading,
    branches,
    historyModal,
    setHistoryModal,
    submit,
    confirmDeleteIngredient,
    onSKUChange,
    onTitleChange,
    onUnitChange,
    onInventoryChange,
    approvedPrice,
    setApprovedPrice,
  } = useIngredient({ isSuper });

  return (
    <div className="container pb-3">
      <IngredientInventoryHistory
        ingredient={ingredient}
        isOpen={historyModal}
        onClose={() => setHistoryModal(false)}
        isSuper={isSuper}
      />
      <AdminBreadCrumb />
      <Paper elevation={2} className="d-flex flex-wrap my-3 px-2 py-3">
        <div
          className="d-flex col-12 justify-content-between px-4 py-4"
          style={{ borderBottom: `1px solid ${borderColor}` }}
        >
          <div>
            <div className="u-fontLarge u-fontWeightBold">
              Raw material information
            </div>
            <div className="mt-2"></div>
          </div>
        </div>
        <div className="mt-4 col-12 col-lg-6 px-2">
          <Input
            labelPlacement="top"
            label="The title of the raw material"
            value={ingredient.variations[0].title || ""}
            onChange={onTitleChange}
            assistive={titleError}
            error={Boolean(titleError)}
            size="medium"
          />
        </div>

        <div className="mt-4 col-12 col-lg-6 px-2">
          <Input
            labelPlacement="top"
            label="ID of the raw material"
            numberOnly
            value={ingredient?.variations?.[0]?.sku}
            onChange={onSKUChange}
            error={Boolean(skuError)}
            assistive={skuError}
            size="medium"
          />
        </div>

        <div className="mt-4 col-12 col-lg-3 px-2">
          <Autocomplete
            size="small"
            fullWidth
            noOptionsText="The result was not found.."
            disableClearable
            value={units.find((unit) => unit.english === ingredient.unit) || {}}
            options={units}
            getOptionLabel={(i) => i.persian}
            onChange={onUnitChange}
            renderInput={(params) => (
              <Input
                {...params}
                labelPlacement="top"
                inputProps={{
                  ...params.inputProps,
                  style: { paddingTop: 0 },
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: null,
                  className: `${params.InputProps.className} pr-2`,
                }}
                assistive={unitError}
                error={Boolean(unitError)}
                label="One"
                placeholder="One"
                size="medium"
                className="medium"
                variant="outlined"
                themeColor={theme.palette.primary.main}
              />
            )}
          />
        </div>
        {isSuper && (
          <div className="mt-4 col-12 col-lg-6 px-2">
            <Input
              labelPlacement="top"
              label="Approved Price"
              value={englishNumberToPersianNumber(
                approvedPrice,
                "" || ingredient?.default_variation?.extra_data?.approved_price
              )}
              numberOnly
              onChange={(price) => {
                setApprovedPrice(price);
              }}
              size="medium"
            />
          </div>
        )}
      </Paper>
      {ingredientId ? (
        <>
          {isSuper ? null : (
            <AdjustIngredientInventory
              branches={branches}
              ingredient={ingredient}
              adjustment={ingredient.variations[0]}
              setAdjustment={onInventoryChange}
              isSuper={isSuper}
            />
          )}
          <VendorSection
            modelId={ingredient.variations[0].id}
            modelType={VENDOR_ITEM_TYPE_INGREDIENT}
          />
        </>
      ) : null}
      <PopUp
        open={isDialogBoxOpen}
        onClose={() => setDialogBox(false)}
        text="Do you want to remove the raw material?"
        submitText="Remove the raw material"
        closeText="Cancel"
        onSubmit={confirmDeleteIngredient}
      />
      <Button
        color="primary"
        variant="contained"
        style={{ flex: 2 }}
        disabled={isLoading}
        onClick={submit}
        isLoading={isLoading}
      >
        Save changes
      </Button>
      {ingredientId && (
        <Button
          color="primary"
          style={{ flex: 1 }}
          className="mr-2"
          disabled={isLoading}
          onClick={() => setDialogBox(true)}
        >
          Remove the raw material
        </Button>
      )}
    </div>
  );
}

export default memo(AdminIngredient);
