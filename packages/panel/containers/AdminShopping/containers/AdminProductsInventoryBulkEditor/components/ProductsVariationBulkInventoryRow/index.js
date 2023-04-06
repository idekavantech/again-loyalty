import React from "react";
import { cement, dust, jungleII, strawberryII } from "@saas/utils/colors";
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
import { useProductsVariationBulkInventoryRow } from "./useProductsVariationBulkInventoryRow";

function ProductVariationBulkInventoryRow({
  product,
  updatedProducts,
  setUpdatedProducts,
  isLoading,
  adjustments,
  setAdjustments,
  variation,
}) {
  const {
    updatedVariation,
    inventoryCount,
    title,
    mainImageThumbnailUrl,
    isMock,
    reason,
    amount,
    onVariationIsActiveChange,
    onVariationIsHiddenChange,
    onVariationKeepSellingChange,
    onVariationInventoryReasonChange,
    onVariationInventoryAmountChange,
    onVariationThresholdChange,
    isVariationAvailable,
  } = useProductsVariationBulkInventoryRow({
    product,
    updatedProducts,
    setUpdatedProducts,
    isLoading,
    adjustments,
    setAdjustments,
    variation,
  });

  return (
    <TableRow
      className={isLoading ? "u-pointer-events-none h-100" : "h-100"}
      hover
      style={{ borderTop: `1px solid ${cement}` }}
    >
      <TableCell
        style={{
          width: "99%",
          maxWidth: 280,
          borderLeft: `1px solid ${dust}`,
        }}
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
                  alt={title}
                />
              ) : null}
              {title}
            </div>
            <div>
              <div
                style={{ borderBottom: `1px solid ${dust}` }}
                className="d-flex align-items-center"
              >
                <div
                  className="d-flex flex-1 align-items-center p-2"
                  style={{ borderLeft: `1px solid ${dust}` }}
                >
                  <Switch
                    color="primary"
                    size="small"
                    onChange={onVariationIsActiveChange}
                    checked={updatedVariation.is_active}
                  />
                  <div className="mr-2">
                    {updatedVariation.is_active ? "active" : "Inactive"}
                  </div>
                </div>

                <div className="p-2 d-flex flex-1 align-items-center">
                  <Switch
                    color="primary"
                    size="small"
                    onChange={onVariationIsHiddenChange}
                    checked={
                      typeof updatedVariation?.extra_data?.is_hidden ===
                      "boolean"
                        ? !updatedVariation?.extra_data?.is_hidden
                        : true
                    }
                  />
                  <div className="mr-2">Diverse display to the customer</div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="d-flex flex-1 align-items-center p-2">
                  <Switch
                    color="primary"
                    size="small"
                    onChange={onVariationKeepSellingChange}
                    checked={!updatedVariation.keep_selling}
                  />
                  <div className="mr-2">
                    Selling products based on the inventory defined in the system
                  </div>
                </div>
              </div>
            </div>
            {isMock ? (
              <div className="d-flex align-items-center p-2">
                <Skeleton className="w-100" />
              </div>
            ) : (
              <div
                className="2-100 u-text-ellipse px-3 py-2"
                style={{ borderTop: `1px solid ${dust}` }}
              >
                {variation.available ? (
                  <span style={{ color: jungleII }}>Available</span>
                ) : (
                  <span style={{ color: strawberryII }}>unavailable</span>
                )}{" "}
                {variation.available !==
                isVariationAvailable(updatedVariation) ? (
                  <span>
                    (After storing changes,
                    <span className="mx-1">
                      {isVariationAvailable(updatedVariation) ? (
                        <span style={{ color: jungleII }}>Available</span>
                      ) : (
                        <span
                          style={{
                            color: strawberryII,
                          }}
                        >
                          unavailable
                        </span>
                      )}
                    </span>
                    It becomes.)
                  </span>
                ) : (
                  ""
                )}
              </div>
            )}
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
                onChange={onVariationInventoryReasonChange}
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
          <div
            style={
              reason
                ? {}
                : {
                    backgroundImage:
                      "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)",
                    backgroundColor: dust,
                  }
            }
            className="h-100 u-text-ellipse d-inline-block"
          >
            <Input
              tableInput
              selectOnFocus
              numberOnly
              margin="dense"
              disabled={!reason}
              className="h-100 px-3"
              inputProps={{ className: "px-0" }}
              value={englishNumberToPersianNumber(amount, "")}
              onChange={onVariationInventoryAmountChange}
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
              numberOnly
              tableInput
              selectOnFocus
              margin="dense"
              className="h-100 px-3"
              inputProps={{ className: "px-0" }}
              value={englishNumberToPersianNumber(
                updatedVariation.threshold,
                ""
              )}
              onChange={onVariationThresholdChange}
            />
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
export default ProductVariationBulkInventoryRow;
