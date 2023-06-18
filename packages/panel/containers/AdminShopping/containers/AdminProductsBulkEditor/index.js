import React, { memo } from "react";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import { dust } from "@saas/utils/colors";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import TablePagination from "@material-ui/core/TablePagination";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";

import Button from "@material-ui/core/Button";
import ProductBulkEditorRow from "containers/AdminShopping/containers/AdminProductsBulkEditor/components/ProductsBulkEditorTableRow";
import ProductVariationBulkEditorRow from "containers/AdminShopping/containers/AdminProductsBulkEditor/components/ProductsVariationsBulkEditorRow";
import ProductListFilters from "@saas/components/ProductListFilters";

import { headCells, useProductsBulkEditor } from "./useProductsBulkEditor";

function ProductsBulkEditor({ isSuper = false }) {
  const {
    labels,
    pagination,
    isLoading,
    theme,
    loading,
    page,
    pageSize,
    updatedProducts,
    setUpdatedProducts,
    labelsError,
    setLabelsError,
    titleError,
    setTitleError,
    maxWidth768,
    filteredIds,
    isSelected,
    handleClick,
    handleChangePage,
    handleChangeRowsPerPage,
    submit,
    productsRows,
  } = useProductsBulkEditor();

  return (
    <div className="container pb-3">
      <style
        dangerouslySetInnerHTML={{
          __html: `
              .tableInput .MuiOutlinedInput-notchedOutline {
                border-width: 0;
              }
              .tableInput .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
                border-width: 0;
              }
              .tableInput .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
                border: 1px solid ${theme.palette.primary.main};
              }
              .tableInput .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline {
                border: 1px solid ${theme.palette.error.main};
              }
            `,
        }}
      />
      <AdminBreadCrumb
        submitAction={submit}
        isLoading={loading || isLoading}
        submitButtonText="Save changes"
      />
      <Paper elevation={1} className="py-3 mt-3">
        <ProductListFilters isSuper={isSuper} categories={labels} />

        <TableContainer>
          <Table
            className="h-100"
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <TableHead>
              <TableRow
                style={{ borderBottom: `1px solid ${dust}` }}
                className={isLoading ? "u-pointer-events-none" : ""}
              >
                {headCells.map((headCell) => (
                  <TableCell
                    style={{
                      minWidth: headCell.minWidth,
                      maxWidth: headCell.maxWidth,
                      width: headCell.width,
                    }}
                    className="text-nowrap u-fontWeightBold"
                    key={headCell.id}
                    align={headCell.align}
                    color="text.primary"
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {productsRows
                ?.filter(
                  (product) =>
                    !product.id ||
                    !filteredIds ||
                    filteredIds.some((id) => parseInt(id) === product.id)
                )
                .map((product, index) => {
                  const { variations, id } = product;
                  const hasVariations = product?.variants_data?.length;
                  const isItemSelected = isSelected(id);

                  return (
                    <>
                      <ProductBulkEditorRow
                        isLoading={isLoading}
                        deal={product}
                        hasVariations={hasVariations}
                        updatedProducts={updatedProducts}
                        setUpdatedProducts={setUpdatedProducts}
                        isItemSelected={isItemSelected}
                        handleClick={handleClick}
                        labels={labels}
                        categoriesError={labelsError[id]}
                        setCategoriesError={(err) =>
                          setLabelsError({
                            ...labelsError,
                            [id]: err,
                          })
                        }
                        hasNoBorder={index === 0}
                        titleError={titleError[id]}
                        setTitleError={(err) =>
                          setTitleError({
                            ...titleError,
                            [id]: err,
                          })
                        }
                      />
                      {hasVariations
                        ? Object.values(variations).map((variation) => (
                            <ProductVariationBulkEditorRow
                              key={variation.id}
                              isLoading={isLoading}
                              deal={product}
                              variation_id={variation.id}
                              updatedProducts={updatedProducts}
                              setUpdatedProducts={setUpdatedProducts}
                              disabled={isItemSelected}
                            />
                          ))
                        : null}
                    </>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        {!filteredIds ? (
          <TablePagination
            labelRowsPerPage={!maxWidth768 ? "Rows count per page" : ""}
            labelDisplayedRows={({ from, to, count }) =>
              `${englishNumberToPersianNumber(
                from
              )} - ${englishNumberToPersianNumber(to)} From${
                count !== -1
                  ? englishNumberToPersianNumber(count)
                  : `more than${englishNumberToPersianNumber(to)}`
              }`
            }
            rowsPerPageOptions={[5, 10, 25, 50, 100, 200, 500]}
            component="div"
            count={pagination.count}
            rowsPerPage={pageSize}
            page={page - 1}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            SelectProps={{
              renderValue: () => englishNumberToPersianNumber(pageSize),
              IconComponent: ArrowDropDownRoundedIcon,
            }}
            ActionsComponent={({ count, page, rowsPerPage, onChangePage }) => (
              <div className="">
                <IconButton
                  onClick={(event) => {
                    onChangePage(event, page);
                  }}
                  disabled={page === 0}
                  aria-label="previous page"
                >
                  <KeyboardArrowRight />
                </IconButton>
                <IconButton
                  onClick={(event) => {
                    onChangePage(event, page + 2);
                  }}
                  disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  aria-label="next page"
                >
                  <KeyboardArrowLeft />
                </IconButton>
              </div>
            )}
          />
        ) : null}
      </Paper>
      <Button
        color="primary"
        className="mt-3"
        variant="contained"
        disabled={loading || isLoading}
        onClick={submit}
      >
        Save changes
      </Button>
    </div>
  );
}

export default memo(ProductsBulkEditor);
