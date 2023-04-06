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
import LocationSelector from "components/LocationSelector";
import Input from "@saas/components/Input";
import useTheme from "@material-ui/core/styles/useTheme";

function AdjustIngredientInventory({
  ingredient,
  branches,
  adjustment,
  setAdjustment,
  isSuper,
}) {
  const theme = useTheme();

  const {
    reason = "",
    amount,
    threshold,
    extra_data: { expected_value: expectedValue = "0.000" } = {},
    alerting,
    inventory_count,
  } = adjustment;
  return (
    <Paper className="my-4">
      <div
        className="d-flex justify-content-between flex-1 px-4 py-4"
        style={{ borderBottom: `1px solid ${borderColor}` }}
      >
        <div>
          <div className="u-fontLarge">Inventory Management</div>
          <div
            style={{ color: theme.palette.text.quaternary }}
            className="mt-2"
          >
            In this section you can warehouse your raw materials{" "}
            {isSuper ? "For each branch" : ""}Manage.
          </div>
        </div>
        <div></div>
      </div>
      {ingredient.ingredients && ingredient.ingredients.length ? (
        <LocationSelector
          value={adjustment.ingredientId}
          onChange={(value) => {
            const selectedIngredient = ingredient.ingredients.find(
              (ing) => ing.id === value
            );
            setAdjustment({
              ...selectedIngredient,
              ingredientId: value,
            });
          }}
          items={ingredient.ingredients.map((ing) => ({
            title: branches.find((branch) => branch.slug === ing.business_slug)
              .title,
            value: ing.id,
          }))}
        />
      ) : null}

      <div className="px-4 pb-4">
        <div style={{ border: `1px solid ${dust}`, borderBottom: 0 }}>
          <div>
            <div
              style={{ borderBottom: `1px solid ${dust}` }}
              className="d-flex col-12 px-0 align-items-center"
            >
              <div
                style={{
                  height: 40,
                  cursor: "default",
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
                  onChange={(value) => {
                    setAdjustment({
                      ...adjustment,
                      reason: parseInt(value),
                      amount: "",
                    });
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
                    cursor: "default",
                    backgroundColor: theme.palette.background.paper,
                  }}
                  className="text-center d-flex flex-1 px-0 col-4 justify-content-center align-items-center"
                >
                  {alterInventoryOptions[reason].actionText}
                </div>
                <Input
                  style={{ height: 40 }}
                  className="px-2 col-8"
                  tableInput
                  isFloat
                  margin="dense"
                  value={englishNumberToPersianNumber(amount, "")}
                  onChange={(amount) => {
                    setAdjustment({
                      ...adjustment,
                      amount,
                    });
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
                  cursor: "default",
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
                  cursor: "default",
                  backgroundImage: reason
                    ? "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)"
                    : "",
                  backgroundColor: reason ? dust : "",
                }}
                className="d-flex flex-1 px-0 col-8 align-items-center direction-ltr justify-content-end px-3"
              >
                {englishNumberToPersianNumber(inventory_count)}
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
                      parseFloat(inventory_count) + parseFloat(amount)
                    )
                  : ""}
                {reason &&
                amount &&
                alterInventoryOptions[reason].action === "minus"
                  ? englishNumberToPersianNumber(
                      parseFloat(inventory_count) - amount
                    )
                  : ""}
              </div>
            </div>
          </div>
          <div
            style={{ borderBottom: `1px solid ${dust}` }}
            className="d-flex col-12 px-0 align-items-center"
          >
            <div
              style={{
                height: 40,
                cursor: "default",
                backgroundColor: theme.palette.background.paper,
              }}
              className="text-center d-flex flex-1 px-0 col-4 justify-content-center align-items-center"
            >
              Normal inventory
            </div>
            <Input
              style={{ height: 40 }}
              selectOnFocus
              className="px-2 col-8"
              tableInput
              isFloat
              margin="dense"
              value={englishNumberToPersianNumber(expectedValue, "")}
              onChange={(value) => {
                setAdjustment({
                  ...adjustment,
                  extra_data: {
                    ...adjustment.extra_data,
                    expected_value: parseFloat(value),
                  },
                });
              }}
            />
          </div>
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
              onChange={(e) => {
                setAdjustment({
                  ...adjustment,
                  alerting: e.target.checked,
                });
              }}
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
                cursor: "default",
                backgroundColor: theme.palette.background.paper,
              }}
              className="text-center d-flex flex-1 px-0 col-4 justify-content-center align-items-center"
            >
              Alert Inventory
            </div>
            <Input
              style={{ height: 40 }}
              selectOnFocus
              className="px-2 col-8"
              tableInput
              isFloat
              margin="dense"
              value={englishNumberToPersianNumber(threshold, "")}
              onChange={(threshold) => {
                setAdjustment({
                  ...adjustment,
                  threshold,
                });
              }}
            />
          </div>
        </Collapse>
      </div>
    </Paper>
  );
}

export default AdjustIngredientInventory;
