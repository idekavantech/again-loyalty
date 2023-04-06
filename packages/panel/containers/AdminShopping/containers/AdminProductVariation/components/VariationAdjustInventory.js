import React from "react";
import Paper from "@material-ui/core/Paper";
import { alterInventoryOptions } from "@saas/stores/plugins/constants";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { borderColor, dust } from "@saas/utils/colors";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Collapse from "@material-ui/core/Collapse";
import Input from "@saas/components/Input";
import useTheme from "@material-ui/core/styles/useTheme";
function VariationAdjustInventory({
  variation,
  variationAdjustment,
  onVariationInventoryReasonChange,
  onVariationInventoryAmountChange,
  onVariationKeepSellingChange,
  onVariationAlertingChange,
  onVariationThresholdChange,
}) {
  const { reason = "", amount } = variationAdjustment;
  const {
    threshold,
    keep_selling: keepSelling,
    alerting,
    inventory_count: inventoryCount,
  } = variation;

  const theme = useTheme();

  return (
    <Paper className="my-4">
      <div
        className="d-flex justify-content-between flex-1 px-4 py-4"
        style={{ borderBottom: `1px solid ${borderColor}` }}
      >
        <div>
          <div className="u-fontLarge u-fontWeightBold">Inventory Management</div>
          <div className="mt-2">
            In this section you can manage your product warehouse.
          </div>
        </div>
      </div>
      <div className="p-4">
        <FormControlLabel
          className="d-block mt-4"
          control={
            <Switch
              key={`switch-${Boolean(keepSelling)}`}
              className="ml-2"
              size="small"
              checked={!keepSelling}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={onVariationKeepSellingChange}
              color="primary"
            />
          }
          labelPlacement="start"
          label="Selling products based on the inventory defined in the system"
        />
      </div>
      {!keepSelling && <div className="p-4">
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
                  onChange={onVariationInventoryReasonChange}
                  inputProps={{ style: { border: "none" }, outline: "none" }}
                  displayEmpty
                  input={<Input tableInput />}
                >
                  <MenuItem value="" disabled>
                    Choose the reason
                  </MenuItem>
                  {Object.entries(alterInventoryOptions).map(
                    ([key, option]) => (
                      <MenuItem key={key} value={key}>
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
                  onChange={onVariationInventoryAmountChange}
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
                {englishNumberToPersianNumber(inventoryCount)}
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
                    inventoryCount + parseInt(amount)
                  )
                  : ""}
                {reason &&
                  amount &&
                  alterInventoryOptions[reason].action === "minus"
                  ? englishNumberToPersianNumber(inventoryCount - amount)
                  : ""}
              </div>
            </div>
          </>
        </div>
        <FormControlLabel
          className="d-block mt-4"
          control={
            <Switch
              key={`switch-${alerting}`}
              className="ml-2"
              size="small"
              checked={alerting}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={onVariationAlertingChange}
              color="primary"
            />
          }
          labelPlacement="start"
          label="Completed alert"
        />
        <Collapse in={alerting}>
          <div
            style={{ border: `1px solid ${dust}` }}
            className="d-flex mt-4 col-12 px-0 align-items-center"
          >
            <div
              style={{
                height: 40,
                backgroundColor: theme.palette.background.paper,
              }}
              className="text-center d-flex flex-1 px-0 col-4 justify-content-center align-items-center"
            >
              Alert Inventory
            </div>
            <Input
              numberOnly
              tableInput
              margin="dense"
              style={{ height: 40 }}
              className="col-8"
              value={englishNumberToPersianNumber(threshold, "")}
              onChange={onVariationThresholdChange}
            />
          </div>
        </Collapse>
      </div>}
    </Paper>
  );
}

export default VariationAdjustInventory;
