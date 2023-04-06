import React from "react";
import { dust } from "@saas/utils/colors";
import TableCell from "@material-ui/core/TableCell";
import Skeleton from "@material-ui/lab/Skeleton";
import TableRow from "@material-ui/core/TableRow";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import BulkEditorTableCell from "containers/AdminShopping/containers/AdminProductsBulkEditor/components/ProductsBulkEditorTableCell";
import { useProductsVariationsBulkEditorRow } from "./useProductsVariationsBulkEditorRow";

function ProductVariationBulkEditorRow({
  deal,
  updatedProducts,
  setUpdatedProducts,
  isLoading,
  variation_id: variationId,
  disabled,
}) {
  const {
    updatedVariation,
    id,
    title,
    mainImageThumbnailUrl,
    isMock,
    onVariationSKUChange,
    onVariationPriceChange,
    onVariationDiscountAmountChange,
    onVariationFinalUnitCostChange,
  } = useProductsVariationsBulkEditorRow({
    deal,
    updatedProducts,
    setUpdatedProducts,
    isLoading,
    variationId,
    disabled,
  });
  return (
    <TableRow
      className={isLoading ? "u-pointer-events-none" : ""}
      hover
      key={id}
      style={{ borderBottom: `1px solid ${dust}` }}
    >
      <TableCell
        style={
          mainImageThumbnailUrl || isMock
            ? {
                width: "99%",
                maxWidth: 200,
                borderLeft: `1px solid ${dust}`,
              }
            : {
                width: "99%",
                borderLeft: `1px solid ${dust}`,
                maxWidth: 200,
                paddingRight: 70,
              }
        }
        align="right"
        className="text-nowrap u-text-ellipse"
      >
        {isMock ? (
          <div className="d-flex align-items-center">
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
          <>
            {mainImageThumbnailUrl ? (
              <img
                className="u-border-radius-4 ml-2"
                style={{ width: 36, height: 36 }}
                src={mainImageThumbnailUrl}
                alt={title}
              />
            ) : null}
            {title}
          </>
        )}
      </TableCell>
      <BulkEditorTableCell
        isMock={isMock}
        numberOnly={false}
        value={englishNumberToPersianNumber(updatedVariation.sku, "")}
        onChange={onVariationSKUChange}
        disabled={disabled}
      />
      <BulkEditorTableCell
        isMock={isMock}
        value={englishNumberToPersianNumber(updatedVariation.initial_price, "")}
        onChange={onVariationPriceChange}
        disabled={disabled}
      />
      <BulkEditorTableCell
        isMock={isMock}
        value={englishNumberToPersianNumber(
          updatedVariation.initial_price - updatedVariation.discounted_price,
          ""
        )}
        onChange={onVariationDiscountAmountChange}
        disabled={disabled}
      />
      <BulkEditorTableCell
        isMock={isMock}
        value={englishNumberToPersianNumber(
          updatedVariation.discounted_price,
          ""
        )}
        disabled
      />
      <BulkEditorTableCell
        isMock={isMock}
        value={englishNumberToPersianNumber(
          updatedVariation.final_unit_cost,
          ""
        )}
        onChange={onVariationFinalUnitCostChange}
        disabled={disabled}
      />
      <TableCell
        style={{
          borderLeft: `1px solid ${dust}`,
          verticalAlign: isMock ? "middle" : "top",
        }}
      />
    </TableRow>
  );
}

export default ProductVariationBulkEditorRow;
