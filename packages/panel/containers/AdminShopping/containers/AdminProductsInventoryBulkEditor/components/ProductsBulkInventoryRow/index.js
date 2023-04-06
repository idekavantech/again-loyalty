import React from "react";
import { dust, jungleII, pollution, strawberryII } from "@saas/utils/colors";
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
import { useProductsBulkInventoryRow } from "./useProductBulkInventoryRow";

function ProductBulkInventoryRow({
  product,
  updatedProducts,
  setUpdatedProducts,
  isLoading,
  hasVariations,
  adjustments,
  setAdjustments,
}) {
  const {
    title,
    mainImageThumbnailUrl,
    name,
    isMock,
    reason,
    amount,
    inventoryCount,
    updatedProduct,
    onProductAlertingChange,
    onProductIsActiveChange,
    onProductKeepSellingChange,
    onProductIsHiddenChange,
    onProductInventoryReasonChange,
    onProductInventoryAmountChange,
    onProductThresholdChange,
    isProductAvailable,
  } = useProductsBulkInventoryRow({
    product,
    updatedProducts,
    setUpdatedProducts,
    isLoading,
    hasVariations,
    adjustments,
    setAdjustments,
  });
  return (
    <TableRow
      className={isLoading ? "u-pointer-events-none h-100" : "h-100"}
      hover
      style={{ borderTop: `1px solid ${pollution}` }}
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
            {!hasVariations ? (
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
                      onChange={onProductIsActiveChange}
                      checked={updatedProduct?.variations?.[0]?.is_active}
                    />
                    <div className="mr-2">
                      {updatedProduct?.variations?.[0]?.is_active
                        ? "active"
                        : "Inactive"}
                    </div>
                  </div>
                  <div className="d-flex flex-1  align-items-center p-2">
                    <Switch
                      color="primary"
                      size="small"
                      onChange={onProductAlertingChange}
                      checked={updatedProduct?.variations?.[0]?.alerting}
                    />
                    <div className="mr-2">Completed alert</div>
                  </div>
                </div>
                <div
                  style={{ borderBottom: `1px solid ${dust}` }}
                  className="d-flex align-items-center"
                >
                  <div className="d-flex flex-1 align-items-center p-2">
                    <Switch
                      color="primary"
                      size="small"
                      onChange={onProductKeepSellingChange}
                      checked={!updatedProduct?.variations?.[0]?.keep_selling}
                    />
                    <div className="mr-2">
                      Selling products based on the inventory defined in the system
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-1 align-items-center p-2">
                  <Switch
                    color="primary"
                    size="small"
                    onChange={onProductIsHiddenChange}
                    checked={
                      typeof updatedProduct?.variations?.[0]?.extra_data
                        ?.is_hidden === "boolean"
                        ? !updatedProduct?.variations?.[0]?.extra_data
                            ?.is_hidden
                        : true
                    }
                  />
                  <div className="mr-2">View product to the customer</div>
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
                    {product.default_variation?.available ? (
                      <span style={{ color: jungleII }}>Available</span>
                    ) : (
                      <span style={{ color: strawberryII }}>unavailable</span>
                    )}{" "}
                    {product.default_variation?.available !==
                    isProductAvailable(updatedProduct) ? (
                      <span>
                        (After storing changes,
                        <span className="mx-1">
                          {isProductAvailable(updatedProduct) ? (
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
            ) : null}
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
        ) : hasVariations ? (
          <div
            className="p-2 text-right w-100"
            style={{ cursor: "not-allowed" }}
          >
            —
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
        ) : hasVariations ? (
          <div
            className="p-2 text-right"
            style={{ width: 120, cursor: "not-allowed" }}
          >
            —
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
                onChange={onProductInventoryReasonChange}
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
          verticalAlign: isMock || hasVariations ? "middle" : "top",
          borderLeft: `1px solid ${dust}`,
        }}
      >
        {isMock ? (
          <div className="d-flex align-items-center p-2">
            <Skeleton className="w-100" />
          </div>
        ) : hasVariations ? (
          <div
            className="text-right w-100 p-2"
            style={{ cursor: "not-allowed" }}
          >
            —
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
              onChange={onProductInventoryAmountChange}
            />
          </div>
        )}
      </TableCell>
      <TableCell className="p-0" style={{ borderLeft: `1px solid ${dust}` }}>
        {isMock ? (
          <div className="d-flex align-items-center p-2">
            <Skeleton className="w-100" />
          </div>
        ) : hasVariations ? (
          <div
            className="p-2 text-right w-100"
            style={{ cursor: "not-allowed" }}
          >
            —
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
          verticalAlign: isMock || hasVariations ? "middle" : "top",
          borderLeft: `1px solid ${dust}`,
        }}
      >
        {isMock ? (
          <div className="d-flex align-items-center p-2">
            <Skeleton className="w-100" />
          </div>
        ) : hasVariations ? (
          <div
            className="text-right w-100 p-2"
            style={{ cursor: "not-allowed" }}
          >
            —
          </div>
        ) : (
          <div className="h-100 u-text-ellipse d-inline-block ">
            {updatedProduct?.variations?.[0].alerting ? (
              <Input
                margin="dense"
                className="h-100 px-3"
                inputProps={{ className: "px-0" }}
                value={englishNumberToPersianNumber(
                  updatedProduct?.variations?.[0].threshold,
                  ""
                )}
                tableInput
                selectOnFocus
                isFloat
                onChange={onProductThresholdChange}
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

export default ProductBulkInventoryRow;
