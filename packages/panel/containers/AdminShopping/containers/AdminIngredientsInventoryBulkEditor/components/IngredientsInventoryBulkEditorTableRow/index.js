import React from "react";
import { dust } from "@saas/utils/colors";
import TableCell from "@material-ui/core/TableCell";
import Skeleton from "@material-ui/lab/Skeleton";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import TableRow from "@material-ui/core/TableRow";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { alterInventoryOptions } from "@saas/stores/plugins/constants";
import Input from "@saas/components/Input";
import { useIngredientsInventoryBulkEditorTableRow } from "./useIngredientsInventoryBulkEditorTableRow";

function IngredientsBulkEditorTableRow({
  ingredient,
  updatedIngredients,
  setUpdatedIngredients,
  isLoading,
  adjustments,
  setAdjustments,
}) {
  const {
    reason,
    amount,
    inventoryCount,
    isMock,
    title,
    mainImageThumbnailUrl,
    name,
    updatedIngredient,
    selectReason,
    updateAlerting,
    onAmountChange,
    onThresholdChange,
  } = useIngredientsInventoryBulkEditorTableRow({
    updatedIngredients,
    ingredient,
    adjustments,
    setUpdatedIngredients,
    setAdjustments,
  });

  return (
    <TableRow
      className={isLoading ? "u-pointer-events-none h-100" : "h-100"}
      hover
      style={{ borderBottom: `1px solid ${dust}` }}
    >
      <TableCell
        style={
          mainImageThumbnailUrl || isMock
            ? {
                width: "99%",
                maxWidth: 280,
                borderLeft: `1px solid ${dust}`,
              }
            : {
                width: "99%",
                borderLeft: `1px solid ${dust}`,
                maxWidth: 280,
                paddingRight: 70,
              }
        }
        align="right"
        className="text-nowrap u-text-ellipse p-0"
      >
        {isMock ? (
          <div className="d-flex align-items-center p-2">
            <Skeleton
              style={{
                width: 36,
                height: 36,
                transform: "none",
              }}
              className="ml-2"
            />
            <Skeleton style={{ width: 115 }} />
          </div>
        ) : (
          <div>
            <div
              className="d-flex align-items-center p-2"
              style={{ borderBottom: `1px solid ${dust}` }}
            >
              {mainImageThumbnailUrl ? (
                <img
                  className="u-border-radius-4 ml-2"
                  style={{ width: 36, height: 36 }}
                  src={mainImageThumbnailUrl}
                  alt={title || name}
                />
              ) : null}
              {title || name}
            </div>
            <div>
              <div
                style={{ borderBottom: `1px solid ${dust}` }}
                className="d-flex align-items-center"
              >
                <div className="d-flex flex-1  align-items-center p-2">
                  <Switch
                    color="primary"
                    size="small"
                    onChange={updateAlerting}
                    checked={updatedIngredient?.alerting}
                  />
                  <div className="mr-2">Completed alert</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </TableCell>
      <TableCell
        style={{
          borderLeft: `1px solid ${dust}`,
          backgroundImage:
            "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)",
          backgroundColor: dust,
        }}
      >
        {isMock ? (
          <div className="d-flex align-items-center p-2">
            <Skeleton className="w-100" />
          </div>
        ) : (
          <div className="u-text-ellipse d-flex align-items-center direction-ltr justify-content-end">
            {englishNumberToPersianNumber(inventoryCount)}
          </div>
        )}
      </TableCell>
      <TableCell className="p-0" style={{ borderLeft: `1px solid ${dust}` }}>
        {isMock ? (
          <div className="d-flex align-items-center p-2">
            <Skeleton style={{ width: 120 }} />
          </div>
        ) : (
          <div className="u-text-ellipse">
            <FormControl
              className="my-0 d-flex flex-1 px-0"
              margin="dense"
              variant="outlined"
              size="small"
              outline="none"
            >
              <Select
                style={{ border: "none" }}
                value={reason}
                onChange={selectReason}
                inputProps={{ style: { border: "none" }, outline: "none" }}
                displayEmpty
                input={<Input tableInput className="pl-2 pr-0 text-right" />}
              >
                <MenuItem value="" disabled>
                  Choose the reason
                </MenuItem>
                {Object.entries(alterInventoryOptions).map(([key, option]) => (
                  <MenuItem key={key} value={key}>
                    {option.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
      </TableCell>
      <TableCell
        className="h-100 p-0"
        style={{
          verticalAlign: isMock ? "middle" : "top",
          borderLeft: `1px solid ${dust}`,
        }}
      >
        {isMock ? (
          <div className="d-flex align-items-center p-2">
            <Skeleton className="w-100" />
          </div>
        ) : (
          <div className="h-100 u-text-ellipse d-inline-block">
            <Input
              margin="dense"
              className="h-100 px-3"
              style={
                reason
                  ? {}
                  : {
                      backgroundImage:
                        "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)",
                      backgroundColor: dust,
                    }
              }
              inputProps={{ className: "px-0" }}
              value={englishNumberToPersianNumber(amount, "")}
              tableInput
              selectOnFocus
              disabled={!reason}
              isFloat
              onChange={onAmountChange}
            />
          </div>
        )}
      </TableCell>
      <TableCell className="p-0" style={{ borderLeft: `1px solid ${dust}` }}>
        {isMock ? (
          <div className="d-flex align-items-center p-2">
            <Skeleton className="w-100" />
          </div>
        ) : (
          <div className="u-text-ellipse">
            <div className="d-flex flex-1 align-items-center direction-ltr justify-content-end px-3">
              {!reason ||
              !amount ||
              (reason &&
                amount &&
                alterInventoryOptions[reason].action !== "set")
                ? englishNumberToPersianNumber(inventoryCount)
                : ""}
              {reason &&
              amount &&
              alterInventoryOptions[reason].action === "set"
                ? englishNumberToPersianNumber(amount)
                : ""}
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
                    (+inventoryCount + +amount).toFixed(4)
                  )
                : ""}
              {reason &&
              amount &&
              alterInventoryOptions[reason].action === "minus"
                ? englishNumberToPersianNumber(
                    (+inventoryCount - +amount).toFixed(4)
                  )
                : ""}
            </div>
          </div>
        )}
      </TableCell>
      <TableCell
        className="h-100 p-0"
        style={{
          verticalAlign: isMock ? "middle" : "top",
          borderLeft: `1px solid ${dust}`,
        }}
      >
        {isMock ? (
          <div className="d-flex align-items-center p-2">
            <Skeleton className="w-100" />
          </div>
        ) : (
          <div className="h-100 u-text-ellipse d-inline-block ">
            {updatedIngredient.alerting ? (
              <Input
                margin="dense"
                className="h-100 px-3"
                inputProps={{ className: "px-0" }}
                value={englishNumberToPersianNumber(
                  updatedIngredient.threshold,
                  ""
                )}
                tableInput
                selectOnFocus
                isFloat
                onChange={onThresholdChange}
              />
            ) : (
              <div
                className="p-2 text-right d-flex align-items-center"
                style={{ width: 120, cursor: "not-allowed", height: "100%" }}
              >
                —
              </div>
            )}
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}

export default IngredientsBulkEditorTableRow;
