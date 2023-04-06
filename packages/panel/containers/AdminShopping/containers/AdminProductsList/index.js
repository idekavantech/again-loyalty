import React, { memo } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import AdminBreadCrumb from "containers/AdminBreadCrumb";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { dust, surface, coal } from "@saas/utils/colors";
import Chip from "@material-ui/core/Chip";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";

import PopUp from "@saas/components/PopUp";
import Link from "next/link";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import Skeleton from "@material-ui/lab/Skeleton";
import ProductListFilters from "@saas/components/ProductListFilters";
import ImportModal from "./components/importModal";
import { useProductsList } from "./useProductsList";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import TableNoResultMessage from "../../../../components/TableNoResultMessage";

const headCells = [
  {
    id: "image",
    align: "right",
    label: "",
    width: "76px",
    minWidth: "76px",
  },
  {
    id: "name",
    align: "right",
    label: "Product Name",
    width: "99%",
    minWidth: "unset",
  },
  {
    id: "status",
    align: "center",
    label: "Condition",
    super: false,
  },
  {
    id: "variants",
    align: "center",
    label: "Different numbers",
    responsive: true,
  },
  {
    id: "resource_labels",
    align: "center",
    label: "Labels",
    responsive: true,
  },
];

function AdminProductsList({ plugin = SHOPPING_PLUGIN, isSuper = false }) {
  const {
    _uploadFile,
    _getHasError,
    urlPrefix,
    isLoading,
    hasError,
    pluginUrl,
    resourceLabels,
    pagination,
    _products,
    router,
    page,
    pageSize,
    isAllProductsSelected,
    selectedProducts,
    isBulkDeleteConfirmationPopupOpen,
    setIsBulkDeleteConfirmationPopupOpen,
    theme,

    onSelectAllClick,
    isProductSelected,
    handleChangePage,
    handleChangeRowsPerPage,
    onProductRowClick,
    handleClose,
    isImportModalOpen,
    onIsAvailableChange,
    selectAllProducts,
    unselectAllProducts,

    confirmDeleteProducts,
  } = useProductsList({
    plugin,
    isSuper,
  });
  const { maxWidth768 } = useResponsive();
  const hasQueryParamInURL = !!window.location.search;

  return (
    <div className="container pb-3">
      <AdminBreadCrumb
        responsive={false}
        submitAction={() =>
          router.push({
            pathname: `${urlPrefix}/${pluginUrl}/settings/products/new`,
            query: router.query.category
              ? { category: router.query.category }
              : {},
          })
        }
        submitButtonHasPlus
        // buttons={
        //   <Button
        //     className="mr-3"
        //     variant="contained"
        //     color="primary"
        //     style={{ direction: "ltr" }}
        //     endIcon={<AddRoundedIcon />}
        //     disabled={isLoading}
        //     onClick={() => setIsImportModalOpen(true)}
        //   >
        //     Entering products
        //   </Button>
        // }
        submitButtonText="new product"
      />

      <ImportModal
        open={isImportModalOpen}
        onClose={handleClose}
        _uploadFile={_uploadFile}
        _getHasError={_getHasError}
        hasError={hasError}
      />
      <Paper elevation={1} className="pb-3">
        {!isSuper ? (
          <Tabs
            style={{ borderBottom: `1px solid ${dust}` }}
            indicatorColor="primary"
            textColor="primary"
            className="px-3"
            value={
              router.query.available === "true"
                ? 1
                : router.query.available === "false"
                ? 2
                : 0
            }
            onChange={onIsAvailableChange}
          >
            <Tab
              className="mx-1 px-3"
              style={{ minWidth: "unset" }}
              label="All"
            />
            <Tab
              className="mx-2 px-3"
              style={{ minWidth: "unset" }}
              label="active"
            />
            <Tab
              className="mx-2 px-3"
              style={{ minWidth: "unset" }}
              label="Inactive"
            />
          </Tabs>
        ) : null}
        <ProductListFilters
          isSuper={isSuper}
          editAllProductsLink={`${urlPrefix}${pluginUrl}/settings/bulk/products_edit`}
          categories={resourceLabels}
        />
        {!_products || _products?.length ? (
          <>
            {selectedProducts.length > 0 ? (
              <div
                style={{ marginRight: 50, zIndex: 2 }}
                className="position-relative text-nowrap d-flex flex-wrap u-font-semi-small my-1"
              >
                <Link
                  href={{
                    pathname: `${urlPrefix}${pluginUrl}/settings/bulk/products_edit`,
                    query: isAllProductsSelected
                      ? {}
                      : {
                          ...router.query,
                          id: selectedProducts,
                        },
                  }}
                  passHref
                >
                  <Button variant="outlined" size="small" color="primary">
                    Editing Products
                  </Button>
                </Link>
                <Link
                  href={{
                    pathname: `${urlPrefix}${pluginUrl}/settings/bulk/products_inventory`,
                    query: isAllProductsSelected
                      ? {}
                      : {
                          ...router.query,
                          ids: selectedProducts,
                        },
                  }}
                  passHref
                >
                  <Button
                    variant="outlined"
                    className="mr-2"
                    size="small"
                    color="primary"
                  >
                    Inventory adjustment
                  </Button>
                </Link>
                <Button
                  className="mr-2"
                  variant="outlined"
                  size="small"
                  style={{
                    color: theme.palette.error.main,
                    borderColor: theme.palette.error.main,
                  }}
                  onClick={() => setIsBulkDeleteConfirmationPopupOpen(true)}
                >
                  Remove items
                </Button>
                {!isAllProductsSelected ? (
                  <Button
                    className="mr-2"
                    variant="text"
                    size="small"
                    color="primary"
                    onClick={selectAllProducts}
                  >
                    Select all products
                  </Button>
                ) : (
                  <div className="d-inline-block mr-2">
                    All products were selected.
                    <Button
                      color="primary"
                      variant="text"
                      size="small"
                      className="ml-1"
                      onClick={unselectAllProducts}
                    >
                      coming back
                    </Button>
                  </div>
                )}
              </div>
            ) : null}
            <TableContainer
              style={selectedProducts.length > 0 ? { marginTop: -38 } : {}}
            >
              <Table
                aria-labelledby="tableTitle"
                size="small"
                aria-label="enhanced table"
              >
                <TableHead>
                  <TableRow
                    className={isLoading ? "u-pointer-events-none" : ""}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        indeterminate={
                          selectedProducts.length > 0 &&
                          selectedProducts.length < _products?.length
                        }
                        checked={
                          _products?.length > 0 &&
                          selectedProducts.length === _products?.length
                        }
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "select all" }}
                      />
                    </TableCell>

                    {headCells
                      .filter(
                        (headCell) =>
                          (!isSuper || headCell.super !== false) &&
                          (!maxWidth768 || !headCell.responsive)
                      )
                      .map((headCell) => {
                        return (
                          <TableCell
                            style={{
                              minWidth: headCell.minWidth,
                              width: headCell.width,
                              visibility:
                                selectedProducts.length > 0
                                  ? "hidden"
                                  : "visible",
                            }}
                            className="text-nowrap u-fontWeightBold p-2"
                            key={headCell.id}
                            align={headCell.align}
                            color="text.primary"
                          >
                            {headCell.label}
                          </TableCell>
                        );
                      })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading
                    ? _products?.map((deal, index) => {
                        return (
                          <TableRow
                            className={"u-pointer-events-none"}
                            hover
                            key={deal.id || index}
                          >
                            <TableCell padding="checkbox">
                              <Skeleton style={{ width: 150 }} />
                            </TableCell>

                            <TableCell component="a" align="center">
                              <Skeleton
                                style={{
                                  width: 36,
                                  height: 36,
                                  transform: "none",
                                }}
                              />
                            </TableCell>
                            <TableCell
                              style={{ width: "99%" }}
                              component="a"
                              scope="row"
                              className="px-2"
                              align="right"
                            >
                              <Skeleton style={{ width: 150 }} />
                            </TableCell>
                            {!isSuper ? (
                              <TableCell
                                component="a"
                                className="text-nowrap px-2"
                                align="center"
                                style={{ padding: 18 }}
                              >
                                <Skeleton
                                  style={{
                                    width: 50,
                                  }}
                                />
                              </TableCell>
                            ) : null}
                            {!maxWidth768 && (
                              <TableCell
                                component="a"
                                className="text-nowrap"
                                align="center"
                              >
                                <Skeleton
                                  style={{
                                    width: 70,
                                  }}
                                />
                              </TableCell>
                            )}
                            {!maxWidth768 && (
                              <TableCell
                                component="a"
                                className="text-nowrap"
                                align="center"
                                style={{ width: 160 }}
                              >
                                <Skeleton />
                              </TableCell>
                            )}
                          </TableRow>
                        );
                      })
                    : _products?.map((deal, index) => {
                        if (!deal.default_variation) {
                          return null;
                        }
                        const {
                          id,
                          title,
                          available,
                          labels,
                          variations,
                          variants_data,
                          has_image,
                          default_variation,
                        } = deal;
                        let {
                          main_image_thumbnail_url: mainImageThumbnailUrl,
                        } = default_variation;
                        if (has_image)
                          mainImageThumbnailUrl = deal.main_image_thumbnail_url;

                        const isItemSelected = isProductSelected(id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            className={isLoading ? "u-pointer-events-none" : ""}
                            hover
                            aria-checked={isItemSelected}
                            key={id}
                            selected={isItemSelected}
                            style={
                              !available && !isItemSelected
                                ? {
                                    backgroundColor:
                                      theme.palette.background.paper,
                                  }
                                : {}
                            }
                          >
                            <TableCell
                              padding="checkbox"
                              onClick={(event) => onProductRowClick(event, id)}
                            >
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                            </TableCell>

                            <TableCell
                              component={Link}
                              href={`${urlPrefix}${pluginUrl}/settings/products/${id}`}
                              align="center"
                            >
                              {isLoading ? (
                                <Skeleton
                                  style={{
                                    width: 36,
                                    height: 36,
                                    transform: "none",
                                  }}
                                />
                              ) : (
                                <img
                                  className="u-border-radius-4"
                                  style={{ width: 36, height: 36 }}
                                  src={mainImageThumbnailUrl}
                                  alt={title}
                                />
                              )}
                            </TableCell>
                            <TableCell
                              style={{ width: "99%" }}
                              component={Link}
                              scope="row"
                              className="px-2"
                              align="right"
                              href={`${urlPrefix}${pluginUrl}/settings/products/${id}`}
                            >
                              {isLoading ? (
                                <Skeleton style={{ width: 150 }} />
                              ) : (
                                title
                              )}
                            </TableCell>
                            {!isSuper ? (
                              <TableCell
                                component={Link}
                                className="text-nowrap px-2"
                                align="center"
                                style={{ padding: 18 }}
                                href={`${urlPrefix}${pluginUrl}/settings/products/${id}`}
                              >
                                {isLoading ? (
                                  <Skeleton
                                    style={{
                                      width: 50,
                                    }}
                                  />
                                ) : available ? (
                                  <Chip
                                    style={{
                                      color: coal,
                                      backgroundColor: surface.success.default,
                                      direction: "ltr",
                                      cursor: "pointer",
                                    }}
                                    label="active"
                                    variant="default"
                                    className="m-1 px-1 u-text-ellipse"
                                  />
                                ) : (
                                  <Chip
                                    style={{
                                      color: coal,
                                      backgroundColor: surface.neutral.default,
                                      maxWidth: "100%",
                                      direction: "ltr",
                                      cursor: "pointer",
                                    }}
                                    label="Inactive"
                                    variant="default"
                                    className="m-1 px-1 u-text-ellipse"
                                  />
                                )}
                              </TableCell>
                            ) : null}
                            {!maxWidth768 && (
                              <TableCell
                                component={Link}
                                className="text-nowrap"
                                align="center"
                                href={`${urlPrefix}${pluginUrl}/settings/products/${id}`}
                              >
                                {variants_data?.length
                                  ? `With${englishNumberToPersianNumber(
                                      variations?.length
                                    )} variety`
                                  : "does not have"}
                              </TableCell>
                            )}
                            {!maxWidth768 && (
                              <TableCell
                                component={Link}
                                className="text-nowrap"
                                align="center"
                                style={{ width: 160 }}
                                href={`${urlPrefix}${pluginUrl}/settings/products/${id}`}
                              >
                                <>
                                  {labels.slice(0, 1).map((label) => {
                                    const resourceLabel = resourceLabels.find(
                                      (_resourceLabel) =>
                                        _resourceLabel.id === label
                                    );
                                    if (resourceLabel)
                                      return (
                                        <Chip
                                          itemProp={{
                                            className: "u-text-ellipse",
                                          }}
                                          size="small"
                                          style={{
                                            direction: "rtl",
                                            cursor: "pointer",
                                            maxWidth: `${
                                              labels.length > 1 ? 130 : 160
                                            }px`,
                                          }}
                                          label={resourceLabel.title}
                                          variant="outlined"
                                          className="m-1"
                                        />
                                      );
                                    return null;
                                  })}
                                  {labels.length > 1
                                    ? `And${englishNumberToPersianNumber(
                                        labels.length - 1
                                      )} Another label`
                                    : ""}
                                </>
                              </TableCell>
                            )}
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              labelRowsPerPage={!maxWidth768 ? "The number of rows per page" : ""}
              labelDisplayedRows={({ from, to, count }) =>
                `${englishNumberToPersianNumber(
                  from
                )} - ${englishNumberToPersianNumber(to)} From${
                  count !== -1
                    ? englishNumberToPersianNumber(count)
                    : `more than${englishNumberToPersianNumber(to)}`
                }`
              }
              rowsPerPageOptions={[5, 10, 25]}
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
              ActionsComponent={({
                count,
                page,
                rowsPerPage,
                onChangePage,
              }) => (
                <div className="">
                  <IconButton
                    onClick={(event) => {
                      onChangePage(event, page - 1);
                    }}
                    disabled={page === 0}
                    aria-label="previous page"
                  >
                    <KeyboardArrowRight />
                  </IconButton>
                  <IconButton
                    onClick={(event) => {
                      onChangePage(event, page + 1);
                    }}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                </div>
              )}
            />
          </>
        ) : hasQueryParamInURL ? (
          <TableNoResultMessage
            title={"Product was not found to be found in your search!"}
          />
        ) : (
          <TableNoResultMessage
            title={"You have no product"}
            description={"Use the new product button to make the product"}
          />
        )}
      </Paper>
      <PopUp
        closeText="Cancel"
        open={isBulkDeleteConfirmationPopupOpen}
        submitText={
          selectedProducts.length === 1 ? "Clear the product" : "Clear products"
        }
        text="Are you sure you want to remove the selected products?"
        onClose={() => setIsBulkDeleteConfirmationPopupOpen(false)}
        onSubmit={confirmDeleteProducts}
      />
    </div>
  );
}

export default memo(AdminProductsList);
