/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
import React, { memo } from "react";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import AdminBreadCrumb from "containers/AdminBreadCrumb";
import PopUp from "@saas/components/PopUp";
import Input from "@saas/components/Input";

import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import LimitSelector from "./components/LimitSelector";
import ModifierItem from "./components/ModifierItem";
import { useModifierSet } from "./useModifierSet";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function AdminModifierSet({ isSuper = false }) {
  const {
    theme,
    modifierSetId,
    error,
    choiceError,
    modifierErrors,
    isDeleteModifierSetConfirmationModalOpen,
    setDeleteModifierSetConfirmationModalOpen,
    _modifierSet,
    _setModifierSet,
    setSelectedBranchId,
    modifiersInventoryAdjustment,
    setModifierInventoryAdjustment,
    isLoading,
    ingredients,
    variationError,
    branches,
    indexOfModifierSetBranch,
    submit,
    onModifierSetTitleChange,
    onMinimumChoiceChange,
    onMaximumChoiceChange,
    addModifierItem,
    confirmDeleteModifierSet,
  } = useModifierSet({ isSuper });

  const { maxWidth768 } = useResponsive();
  const isDesktop = !maxWidth768;

  return (
    <div className="container pb-3">
      <AdminBreadCrumb />
      <Paper elevation={2} className="d-flex flex-wrap my-3 pb-3">
        <div className="col-12 col-lg-6 mt-4 px-4">
          <div className="flex-1 u-fontSemiLarge u-fontWeightHeavy mb-3">
            The title of the additive set
          </div>
          <Input
            label=""
            value={_modifierSet.title}
            onChange={onModifierSetTitleChange}
            size="medium"
            error={Boolean(error)}
            helperText={error}
          />
        </div>
        <div className="col-12 col-lg-6 mt-4 px-4">
          <div className="flex-1 u-fontSemiLarge u-fontWeightHeavy mb-3">
            Apply limits
          </div>
          <div className="d-flex">
            <div
              className={`flex-1 mx-1 w-100 ${
                isDesktop ? "d-flex flex-row align-items-center" : ""
              }`}
            >
              <div className={isDesktop ? "ml-2" : "mb-1"}>At least</div>
              <LimitSelector
                optionMaxNumber={
                  _modifierSet.modifiers
                    ? Object.keys(_modifierSet.modifiers).length + 1
                    : 0
                }
                onChange={onMinimumChoiceChange}
                inputValue={_modifierSet.minimum_choice}
              />
            </div>
            <div
              className={`flex-1 mx-1 w-100 ${
                isDesktop ? "d-flex flex-row align-items-center" : ""
              }`}
            >
              <div className={isDesktop ? "ml-2" : "mb-1"}>Maximum</div>

              <LimitSelector
                optionMaxNumber={
                  _modifierSet.modifiers
                    ? Object.keys(_modifierSet.modifiers).length + 1
                    : 0
                }
                onChange={onMaximumChoiceChange}
                inputValue={_modifierSet.maximum_choice}
              />
            </div>
          </div>
          <div
            className="mt-2 u-font-semi-small"
            style={{ color: theme.palette.error.main }}
          >
            {choiceError}
          </div>
        </div>
        <div className="px-4 mt-4 w-100">
          <div className="flex-1 u-fontSemiLarge u-fontWeightHeavy">
            Additives
          </div>
          {Object.values(_modifierSet.modifiers).map((modifier) => (
            <ModifierItem
              key={modifier.id}
              modifier={modifier}
              modifierSet={_modifierSet}
              setModifierSet={_setModifierSet}
              setAdjustment={setModifierInventoryAdjustment}
              adjustments={modifiersInventoryAdjustment}
              modifierError={modifierErrors[modifier.id]}
              ingredients={ingredients}
              branches={branches}
              isNewModifierSet={!modifierSetId}
              setSelectedBranchId={setSelectedBranchId}
              indexOfSelectedBranchModifierSet={indexOfModifierSetBranch}
              disableSettings={modifier.new}
              isSuper={isSuper}
            />
          ))}
          <Button
            style={{
              borderStyle: "dashed",
              ...(variationError && { borderColor: theme.palette.error.main }),
            }}
            variant="outlined"
            className="mt-4"
            size="large"
            fullWidth
            onClick={addModifierItem}
            color="primary"
          >
            <AddCircleOutlineRoundedIcon className="ml-2" color="primary" />
            Adding new row
          </Button>
          {variationError ? (
            <div className={"mt-1"} style={{ color: theme.palette.error.main }}>
              {variationError}
            </div>
          ) : null}
          <div className="px-2 py-3">
            {` To change the default mode of each of the additives of a product, to the screen
            The associated product gone and in the segment"Additives" Pick up the edit button and
            Add additive settings to your desire for each product editing
            Make it.`}
          </div>
        </div>
      </Paper>

      <PopUp
        open={isDeleteModifierSetConfirmationModalOpen}
        onClose={() => setDeleteModifierSetConfirmationModalOpen(false)}
        text="Would you like to remove the additive set?"
        submitText="Remove the additive set"
        closeText="Cancel"
        onSubmit={confirmDeleteModifierSet}
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
      {modifierSetId && (
        <Button
          color="primary"
          style={{ flex: 1 }}
          className="mr-2"
          disabled={isLoading}
          onClick={() => setDeleteModifierSetConfirmationModalOpen(true)}
        >
          Remove the additive set
        </Button>
      )}
    </div>
  );
}

export default memo(AdminModifierSet);
