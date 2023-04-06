import React from "react";
import { dust, pollution } from "@saas/utils/colors";
import TableCell from "@material-ui/core/TableCell";
import Skeleton from "@material-ui/lab/Skeleton";
import TableRow from "@material-ui/core/TableRow";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import BulkEditorTableCell from "containers/AdminShopping/containers/AdminProductsBulkEditor/components/ProductsBulkEditorTableCell";
import Input from "@saas/components/Input";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useProductsBulkEditorTableRow } from "./useProductsBulkEditorTableRow";

function ProductBulkEditorRow({
  deal,
  updatedProducts,
  setUpdatedProducts,
  isLoading,
  hasVariations,
  isItemSelected,
  titleError,
  setTitleError,
  categoriesError,
  setCategoriesError,
  labels,
  hasNoBorder,
}) {
  const {
    isMock,
    mainImageThumbnailUrl,
    updatedProduct,
    onProductTitleChange,
    onProductSKUChange,
    onProductInitialPriceChange,
    onProductDiscountAmountChange,
    onProductFinalUnitCostChange,
    onProductLabelsChange,
  } = useProductsBulkEditorTableRow({
    deal,
    updatedProducts,
    setUpdatedProducts,
    isLoading,
    hasVariations,
    isItemSelected,
    titleError,
    setTitleError,
    categoriesError,
    setCategoriesError,
    labels,
  });

  return (
    <TableRow
      className={isLoading ? "u-pointer-events-none" : ""}
      hover
      style={!hasNoBorder ? { borderTop: `1.2px solid ${pollution}` } : {}}
    >
      <TableCell
        style={
          mainImageThumbnailUrl || isMock
            ? {
                width: "99%",
                maxWidth: 200,
                borderLeft: `1px solid ${dust}`,
                verticalAlign: isMock ? "middle" : "top",
              }
            : {
                width: "99%",
                borderLeft: `1px solid ${dust}`,
                maxWidth: 200,
                paddingRight: 70,
                verticalAlign: isMock ? "middle" : "top",
              }
        }
        scope="row"
        align="right"
        className="tableInput text-nowrap p-0"
      >
        {isMock ? (
          <div className="d-flex align-items-center">
            <Skeleton
              style={{
                width: 36,
                height: 36,
                transform: "none",
              }}
              className="m-2"
            />
            <Skeleton className="ml-2" style={{ width: 115 }} />
          </div>
        ) : (
          <>
            {mainImageThumbnailUrl ? (
              <img
                className="u-border-radius-4 m-2"
                style={{ width: 36, height: 36 }}
                src={mainImageThumbnailUrl}
                alt={updatedProduct?.variations?.[0]?.title}
              />
            ) : null}

            {isMock ? (
              <div className="d-flex align-items-center p-2">
                <Skeleton style={{ width: 50 }} />
              </div>
            ) : (
              <Input
                tableInput
                selectOnFocus
                margin="dense"
                className="h-100 px-3"
                style={
                  isItemSelected
                    ? {
                        width: "calc(100% - 52px)",
                        border: "none",
                        backgroundImage:
                          "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)",
                        backgroundColor: dust,
                      }
                    : { width: "calc(100% - 52px)", border: "none" }
                }
                error={titleError}
                inputProps={{
                  className: "px-0",
                  style: { height: 50 },
                }}
                disabled={isItemSelected}
                value={
                  hasVariations
                    ? updatedProduct.title
                    : englishNumberToPersianNumber(
                        updatedProduct.variations?.[0]?.title,
                        ""
                      )
                }
                onChange={onProductTitleChange}
              />
            )}
          </>
        )}
      </TableCell>
      <BulkEditorTableCell
        numberOnly={false}
        isMock={isMock}
        hasVariations={hasVariations}
        value={englishNumberToPersianNumber(
          updatedProduct.variations?.[0]?.sku,
          ""
        )}
        onChange={onProductSKUChange}
        disabled={isItemSelected}
      />
      <BulkEditorTableCell
        isMock={isMock}
        hasVariations={hasVariations}
        value={englishNumberToPersianNumber(
          updatedProduct.variations?.[0]?.initial_price,
          ""
        )}
        onChange={onProductInitialPriceChange}
        disabled={isItemSelected}
      />
      <BulkEditorTableCell
        isMock={isMock}
        hasVariations={hasVariations}
        value={englishNumberToPersianNumber(
          updatedProduct.variations?.[0]?.initial_price -
            updatedProduct.variations?.[0]?.discounted_price,
          ""
        )}
        onChange={onProductDiscountAmountChange}
        disabled={isItemSelected}
      />
      <BulkEditorTableCell
        isMock={isMock}
        hasVariations={hasVariations}
        value={englishNumberToPersianNumber(
          updatedProduct.variations?.[0]?.discounted_price,
          ""
        )}
        disabled
      />
      <BulkEditorTableCell
        isMock={isMock}
        hasVariations={hasVariations}
        value={englishNumberToPersianNumber(
          updatedProduct.variations?.[0]?.final_unit_cost,
          ""
        )}
        onChange={onProductFinalUnitCostChange}
        disabled={isItemSelected}
      />

      <TableCell
        style={{
          borderLeft: `1px solid ${dust}`,
          verticalAlign: isMock ? "middle" : "top",
          height: "calc(100% - 2px)",
          paddingTop: 1,
        }}
        scope="row"
        className="px-0 pb-0 tableInput"
        align="right"
      >
        {isMock ? (
          <div className="d-flex align-items-center p-2">
            <Skeleton style={{ width: 50 }} />
          </div>
        ) : (
          <Autocomplete
            multiple
            className="h-100"
            options={labels}
            getOptionLabel={(option) => option.title}
            disabled={isItemSelected}
            onChange={onProductLabelsChange}
            defaultValue={labels.filter((cat) =>
              updatedProduct.labels.includes(cat.id)
            )}
            filterSelectedOptions
            size="small"
            disableClearable
            ChipProps={{ size: "small", variant: "outlined" }}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                size="small"
                variant="outlined"
                className="m-0 h-100"
                error={categoriesError}
                InputProps={{
                  ...params.InputProps,
                  className: `${params.InputProps.className} pr-2 pl-3 h-100`,
                  style: {
                    ...params.InputProps.style,
                    borderRadius: 0,
                  },
                  endAdornment: null,
                }}
                style={
                  isItemSelected
                    ? {
                        ...params.style,
                        backgroundImage:
                          "repeating-linear-gradient(45deg,transparent,transparent 1px,#fff 1px,#fff 5px,transparent 5px,transparent 6px,#fff 6px,#fff 10px)",
                        backgroundColor: dust,
                      }
                    : params.style
                }
              />
            )}
          />
        )}
      </TableCell>
    </TableRow>
  );
}

export default ProductBulkEditorRow;
