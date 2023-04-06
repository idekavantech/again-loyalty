import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { alterInventoryOptions } from "@saas/stores/plugins/constants";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { borderColor, dust } from "@saas/utils/colors";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import Input from "@saas/components/Input";
import { useAdjustModifierInventory } from "./useAdjustModifierInventory";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

function AdjustModifierInventory({
  modifier,
  modifierSet: _modifierSet,
  branches,
  adjustments,
  setAdjustment,
  setSelectedBranchId,
  indexOfSelectedBranchModifierSet,
}) {
  const {
    reason,
    amount,
    modifier_id,
    _modifier,
    selectedModifierSet,
    setSelectedModifierSet,
    indexOfModifier,
    theme,
  } = useAdjustModifierInventory({
    indexOfSelectedBranchModifierSet,
    adjustments,
    modifier,
    _modifierSet,
  });

  const [isKeepSellingOn, setIsKeepSellingOn] = useState(false);

  useEffect(() => {
    if (_modifier) {
      setIsKeepSellingOn(_modifier.keep_selling);
    }
  }, [_modifier]);

  return (
    <Paper className="my-4">
      <div
        className="d-flex justify-content-between flex-1 px-4 py-4"
        style={{ borderBottom: `1px solid ${borderColor}` }}
      >
        <div>
          <div className="u-fontLarge u-fontWeightBold">Inventory Management</div>
          <div className="mt-2">
            In this section you can manage your additive warehouse.
          </div>
        </div>
      </div>
      <div className="p-4 pt-0">
        <FormControlLabel
          className="d-block"
          control={
            <Switch
              className="ml-2"
              size="small"
              checked={!isKeepSellingOn}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={() => {
                const newAdjustment = { ...adjustments };
                newAdjustment[selectedModifierSet][indexOfModifier] = {
                  ...newAdjustment[selectedModifierSet][indexOfModifier],
                  keep_selling: !isKeepSellingOn,
                };
                setAdjustment(newAdjustment);
                setIsKeepSellingOn((prevState) => !prevState);
              }}
              color="primary"
            />
          }
          labelPlacement="start"
          label="Sale of additives based on the inventory defined in the system"
        />
      </div>
      {!isKeepSellingOn && (
        <div className="p-4">
          <div style={{ border: `1px solid ${dust}`, borderBottom: 0 }}>
            <>
              <div
                style={{ borderBottom: `1px solid ${dust}` }}
                className="d-flex col-12 px-0 align-items-center"
              >
                <div
                  style={{
                    height: 40,
                    backgroundColor: theme.palette.background.paper,
                  }}
                  className="text-center d-flex flex-1 px-0 col-4 justify-content-center align-items-center"
                >
                  the reason
                </div>
                <FormControl
                  className="col-8 my-0 px-0"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                  size="small"
                  outline="none"
                >
                  <Select
                    style={{ border: "none" }}
                    value={reason}
                    onChange={(reason) => {
                      const newAdjustment = { ...adjustments };
                      newAdjustment[selectedModifierSet][indexOfModifier] = {
                        ...newAdjustment[selectedModifierSet][indexOfModifier],
                        reason: +reason,
                        amount: "",
                      };
                      setAdjustment(newAdjustment);
                    }}
                    inputProps={{ style: { border: "none" }, outline: "none" }}
                    displayEmpty
                    input={<Input tableInput />}
                  >
                    <MenuItem value="" disabled>
                      Choose the reason
                    </MenuItem>
                    {Object.entries(alterInventoryOptions).map(
                      ([key, option]) => (
                        <MenuItem value={key} key={key}>
                          {option.text}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </div>
              {reason ? (
                <div
                  style={{ borderBottom: `1px solid ${dust}` }}
                  className="d-flex col-12 px-0 align-items-center"
                >
                  <div
                    style={{
                      height: 40,
                      backgroundColor: theme.palette.background.paper,
                    }}
                    className="text-center d-flex flex-1 px-0 col-4 justify-content-center align-items-center"
                  >
                    {alterInventoryOptions[reason].actionText}
                  </div>
                  <Input
                    className="col-8"
                    style={{ height: 40 }}
                    margin="dense"
                    value={englishNumberToPersianNumber(amount, "")}
                    numberOnly
                    tableInput
                    onChange={(amount) => {
                      const newAdjustment = { ...adjustments };
                      newAdjustment[selectedModifierSet][indexOfModifier] = {
                        ...newAdjustment[selectedModifierSet][indexOfModifier],
                        amount: +amount,
                      };
                      setAdjustment(newAdjustment);
                    }}
                  />
                </div>
              ) : null}
              <div
                style={{ borderBottom: `1px solid ${dust}` }}
                className="d-flex col-12 px-0 align-items-center"
              >
                <div
                  style={{
                    height: 40,
                    backgroundColor: theme.palette.background.paper,
                  }}
                  className="text-center d-flex flex-1 px-0 col-4 justify-content-center align-items-center"
                >
                  {reason
                    ? alterInventoryOptions[reason].countText
                    : "Available in the system"}
                </div>
                <div
                  style={{
                    height: 40,
                    backgroundImage: reason
                      ? "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)"
                      : "",
                    backgroundColor: reason ? dust : "",
                  }}
                  className="d-flex flex-1 px-0 col-8 align-items-center direction-ltr justify-content-end px-3"
                >
                  {englishNumberToPersianNumber(_modifier?.inventory_count)}
                  {reason &&
                    amount &&
                    alterInventoryOptions[reason].action === "plus" &&
                    " + "}
                  {reason &&
                    amount &&
                    alterInventoryOptions[reason].action === "minus" &&
                    " - "}

                  {reason &&
                  amount &&
                  (alterInventoryOptions[reason].action === "plus" ||
                    alterInventoryOptions[reason].action === "minus")
                    ? englishNumberToPersianNumber(amount)
                    : ""}

                  {reason &&
                  amount &&
                  (alterInventoryOptions[reason].action === "plus" ||
                    alterInventoryOptions[reason].action === "minus")
                    ? " = "
                    : ""}

                  {reason &&
                  amount &&
                  alterInventoryOptions[reason].action === "plus"
                    ? englishNumberToPersianNumber(
                        _modifier?.inventory_count + parseInt(amount)
                      )
                    : ""}
                  {reason &&
                  amount &&
                  alterInventoryOptions[reason].action === "minus"
                    ? englishNumberToPersianNumber(
                        _modifier?.inventory_count - amount
                      )
                    : ""}
                </div>
              </div>
            </>
          </div>
        </div>
      )}
    </Paper>
  );
}

export default AdjustModifierInventory;
