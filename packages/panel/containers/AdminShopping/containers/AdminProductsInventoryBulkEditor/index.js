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
import LocationSelector from "components/LocationSelector";
import ProductBulkInventoryRow from "containers/AdminShopping/containers/AdminProductsInventoryBulkEditor/components/ProductsBulkInventoryRow";
import ProductVariationBulkInventoryRow from "containers/AdminShopping/containers/AdminProductsInventoryBulkEditor/components/ProductsVariationBulkInventoryRow";
import ProductListFilters from "@saas/components/ProductListFilters";
import { useProductsInventoryBulkEditor } from "./useProductsInventoryBulkEditor";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { ADMIN_HELP_VIDEOS } from "containers/AdminBreadCrumb/constants";
const headCells = [
  {
    id: "name",
    align: "right",
    label: "Product Name",
  },
  {
    id: "previous",
    align: "right",
    label: "Inventory",
  },
  {
    id: "reason",
    align: "right",
    label: "the reason",
  },

  {
    id: "change",
    align: "right",
    label: "Change",
  },
  {
    id: "previous",
    align: "right",
    label: "New creature",
  },
  {
    id: "threshold",
    align: "right",
    label: "Completed alert",
  },
];

function ProductsBulkEditor({ isSuper }) {
  const {
    pagination,
    isLoading,
    branches,
    categories,
    loading,
    page,
    pageSize,
    updatedProducts,
    setUpdatedProducts,
    adjustments,
    setAdjustments,
    selectedBranch,
    setSelectedBranch,
    matches,
    filteredIds,
    _products,
    submit,
    handleChangeRowsPerPage,
    handleChangePage,
    toggleAllFilters,
    setPage,
  } = useProductsInventoryBulkEditor({
    isSuper,
  });

  return (
    <div className="container pb-3">
      <AdminBreadCrumb
        submitAction={submit}
        isLoading={loading || isLoading}
        submitButtonText="Save changes"
        helpVideo={{
          url: ADMIN_HELP_VIDEOS.productInventory.url,
        }}
      />
      <Paper elevation={1} className="pb-4 mt-4 overflow-hidden">
        {branches?.length ? (
          <LocationSelector
            value={selectedBranch}
            onChange={setSelectedBranch}
            items={branches.map((branch) => ({
              title: branch.title,
              value: branch.slug,
            }))}
          />
        ) : null}
        <ProductListFilters
          categories={categories}
          isSuper={isSuper}
          toggleAll={toggleAllFilters}
          setPage={setPage}
        />
        {!_products?.length ? (
          <div
            className={
              "u-fontMedium u-fontWeightBold w-100 d-flex justify-content-center align-items-center mt-3"
            }
          >
            The product was not found
            <ErrorOutlineIcon className={"mr-1"} />
          </div>
        ) : (
          <TableContainer className="mt-4 u-overflow-y-hidden">
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
                {_products?.map((product) => {
                  const { variations } = product;
                  const hasVariations = product?.variants_data?.length;
                  return (
                    <>
                      <ProductBulkInventoryRow
                        isLoading={isLoading}
                        product={product}
                        hasVariations={hasVariations}
                        updatedProducts={updatedProducts}
                        setUpdatedProducts={setUpdatedProducts}
                        adjustments={adjustments}
                        setAdjustments={setAdjustments}
                      />
                      {hasVariations
                        ? variations.map((variation, index) => (
                            <ProductVariationBulkInventoryRow
                              noBorder={index === 0}
                              key={variation.id}
                              isLoading={isLoading}
                              product={product}
                              variation={variation}
                              updatedProducts={updatedProducts}
                              setUpdatedProducts={setUpdatedProducts}
                              adjustments={adjustments}
                              setAdjustments={setAdjustments}
                            />
                          ))
                        : null}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {!filteredIds ? (
          <TablePagination
            labelRowsPerPage={!matches ? "Rows count per page" : ""}
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
