/**
 *
 * PURCHASE BY PRODUCT REPORTS
 *
 */
import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { surface } from "@saas/utils/colors";
import MaterialSelect from "@saas/components/Select/MaterialSelect";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Skeleton from "@material-ui/lab/Skeleton";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import Chip from "@material-ui/core/Chip";
import useTheme from "@material-ui/core/styles/useTheme";
import { formatDateObjectToNormal } from "../../../../../utils/helpers";
import CustomCalendar from "@saas/components/CustomCalendar";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";

 
 

const branches = [
  { id: 1, title: "Branch 1" },
  { id: 2, title: "Branch 1" },
  { id: 3, title: "Branch 1" },
  { id: 4, title: "Branch 1" },
];

const products = [
  { id: 1, title: "Chicken" },
  { id: 2, title: "chicken sandwich" },
  { id: 3, title: "Alvi sausage" },
  { id: 4, title: "Saying Sandwich" },
];

const sortOptions = [
  { id: 0, text: "the newest", keyword: "newest" },
  { id: 1, text: "The oldest", keyword: "oldest" },
  { id: 2, text: "The highest amount of item", keyword: "highest_item_amount" },
  { id: 3, text: "the product", keyword: "products" },
];

const headCells = [
  {
    id: "id",
    label: "Row",
    align: "center",
  },
  {
    id: "id",
    label: "Product Name",
    align: "center",
  },
  {
    id: "id",
    label: (
      <div className="d-flex flex-column">
        <div>The price of the finished unit</div>
        <div className="u-font-semi-small u-fontWeightNormal">(Toman)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    label: "Sales number",
    align: "center",
  },
  {
    id: "id",
    label: (
      <div className="d-flex flex-column">
        <div>Price of Sold Products</div>
        <div className="u-font-semi-small u-fontWeightNormal">(Toman)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    label: (
      <div className="d-flex flex-column">
        <div>selling price</div>
        <div className="u-font-semi-small u-fontWeightNormal">(Toman)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    label: (
      <div className="d-flex flex-column">
        <div>Gross Sales Profit</div>
        <div className="u-font-semi-small u-fontWeightNormal">(Toman)</div>
      </div>
    ),
    align: "center",
  },
];

export function AdminCostOfGoodsSoldReport({ isLoading, isSuper }) {
  const theme = useTheme();
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });
  const [selectedBranches, setSelectedBranches] = useState(
    branches.map((branch) => branch.id)
  );
  const [selectedProducts, setSelectedProducts] = useState(
    products.map((product) => product.id)
  );
  const [selectedSortingType, selectSortingType] = useState(
    sortOptions[0].keyword
  );

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="container">
      <Head>
        <title>Report of cost -sold products</title>
      </Head>

      <AdminBreadCrumb />

      <Paper elevation={2} className="d-flex flex-column mt-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between p-4">
          <div className="d-flex flex-wrap align-items-center">
            <div className="d-flex align-items-center  ml-3 mb-3">
              <div className="d-flex flex-wrap align-items-center ml-5 mb-4 mb-lg-0">
                <Button
                  style={{
                    direction: "rtl",
                  }}
                  aria-describedby={id}
                  onClick={handleOpen}
                  variant="outlined"
                >
                  From{" "}
                  <span className="px-2">
                    {englishNumberToPersianNumber(
                      formatDateObjectToNormal(selectedDayRange.from)
                    )}
                  </span>
                  until the{" "}
                  <span className="px-2">
                    {englishNumberToPersianNumber(
                      formatDateObjectToNormal(selectedDayRange.to)
                    )}
                  </span>
                </Button>
                <Popover
                  id={id}
                  anchorOrigin={{
                    vertical: 195,
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={openModal}
                  onClose={handleClose}
                >
                  <div
                    style={{ backgroundColor: "#fff", position: "relative" }}
                  >
                    <CloseIcon
                      onClick={handleClose}
                      className="u-cursor-pointer"
                      style={{
                        fontSize: 24,
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 10000,
                        color: "#555555",
                      }}
                    />
                    <CustomCalendar
                      selectedDayRange={selectedDayRange}
                      setSelectedDayRange={setSelectedDayRange}
                      submitDate={() => {}}
                    />
                  </div>
                </Popover>
              </div>
            </div>
            {isSuper && (
              <Select
                className=" ml-3 mb-3"
                style={{ minWidth: 150, height: 36, flex: 1 }}
                value={selectedBranches}
                multiple
                margin="dense"
                variant="outlined"
                displayEmpty
                size="large"
                renderValue={() => {
                  if (selectedBranches.length === 0) return "Choose a branch";
                  if (selectedBranches.length === 1 && selectedBranches[0])
                    return branches.find(
                      (branch) => branch.id === selectedBranches[0]
                    ).title;
                  if (selectedBranches.length === branches.length)
                    return "All branches";
                  return `${englishNumberToPersianNumber(
                    selectedBranches.length
                  )} Branch`;
                }}
                MenuProps={{
                  getContentAnchorEl: null,
                  style: { maxHeight: 500 },
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "center",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                  variant: "menu",
                }}
              >
                <MenuItem className="px-2">
                  <Checkbox
                    className="p-1"
                    size="small"
                    indeterminate={
                      selectedBranches.length !== branches.length &&
                      selectedBranches.length
                    }
                    onChange={(e) => {
                      e.preventDefault();
                    }}
                    onClick={() => {
                      if (selectedBranches.length) setSelectedBranches([]);
                      else setSelectedBranches(branches.map((b) => b.id));
                    }}
                    color="primary"
                    checked={selectedBranches.length === branches.length}
                  />
                  <ListItemText
                    primary="Choosing all branches"
                    className="text-right"
                  />
                </MenuItem>
                {branches.map((branch) => {
                  return (
                    <MenuItem
                      className="px-2"
                      key={`${branch.id}-${selectedBranches.includes(
                        branch.id
                      )}`}
                      value={branch.id}
                    >
                      <Checkbox
                        className="p-1"
                        size="small"
                        onChange={(e) => {
                          e.preventDefault();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          if (!selectedBranches.includes(branch.id)) {
                            setSelectedBranches([
                              ...selectedBranches,
                              branch.id,
                            ]);
                          } else {
                            setSelectedBranches(
                              selectedBranches.filter((id) => id !== branch.id)
                            );
                          }
                        }}
                        color="primary"
                        checked={selectedBranches.includes(branch.id)}
                      />
                      <ListItemText
                        primary={branch.title}
                        className="text-right"
                      />
                    </MenuItem>
                  );
                })}
              </Select>
            )}
            <Select
              className=" ml-3 mb-3"
              style={{ minWidth: 150, height: 36, flex: 1 }}
              value={selectedProducts}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              // IconComponent={() => null}
              renderValue={() => {
                if (selectedProducts.length === 0) return "Select the product";
                if (selectedProducts.length === 1 && selectedProducts[0])
                  return products.find(
                    (product) => product.id === selectedProducts[0]
                  ).title;
                if (selectedProducts.length === products.length)
                  return "All products";
                return `${englishNumberToPersianNumber(
                  selectedProducts.length
                )} the product`;
              }}
              MenuProps={{
                getContentAnchorEl: null,
                style: { maxHeight: 500 },
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
                variant: "menu",
              }}
            >
              <MenuItem className="px-2">
                <Checkbox
                  className="p-1"
                  size="small"
                  indeterminate={
                    selectedProducts.length !== products.length &&
                    selectedProducts.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => {
                    if (selectedProducts.length) setSelectedProducts([]);
                    else setSelectedProducts(products.map((b) => b.id));
                  }}
                  color="primary"
                  checked={selectedProducts.length === products.length}
                />
                <ListItemText
                  primary="Select all products"
                  className="text-right"
                />
              </MenuItem>
              {products.map((product) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={`${product.id}-${selectedProducts.includes(
                      product.id
                    )}`}
                    value={product.id}
                  >
                    <Checkbox
                      className="p-1"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!selectedProducts.includes(product.id)) {
                          setSelectedProducts([
                            ...selectedProducts,
                            product.id,
                          ]);
                        } else {
                          setSelectedProducts(
                            selectedProducts.filter((id) => id !== product.id)
                          );
                        }
                      }}
                      color="primary"
                      checked={selectedProducts.includes(product.id)}
                    />
                    <ListItemText
                      primary={product.title}
                      className="text-right"
                    />
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <MaterialSelect
            FormControlProps={{
              style: {
                width: 80,
                flexShrink: 0,
              },
            }}
            className="small ml-2 pr-0 direction-ltr mb-3"
            inputProps={{
              className: "text-center ml-minus-2",
            }}
            IconComponent={() => null}
            options={sortOptions}
            themeColor={process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}
            menuHeader={
              <div
                style={{ width: 200 }}
                className="px-3 u-fontWeightBold u-fontNormal my-1"
              >
                order by
              </div>
            }
            selectOption={(text) =>
              selectSortingType(
                sortOptions.find((i) => i.text === text).keyword
              )
            }
            inputData={{
              defaultValue: "Ordering",
            }}
            selected={sortOptions.find(
              (i) => i.keyword === selectedSortingType
            )}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "right",
              },
              elevation: 3,
              getContentAnchorEl: null,
            }}
          />
        </div>
        {isSuper && (
          <div className="d-flex align-items-center flex-wrap px-4">
            {selectedBranches?.length === branches?.length ? (
              <Chip
                deleteIcon={
                  <ClearRoundedIcon
                    style={{ color: theme.palette.text.disabled }}
                  />
                }
                style={{
                  borderRadius: 4,
                  background: theme.palette.background.secondary,
                  maxWidth: "fit-content",
                }}
                className="ml-2 mb-2"
                onDelete={() => setSelectedBranches([])}
                label="All branches"
              />
            ) : selectedBranches?.length ? (
              branches
                ?.filter((item) => selectedBranches.includes(item.id))
                .map((branch) => {
                  return (
                    <Chip
                      key={branch.id}
                      deleteIcon={
                        <ClearRoundedIcon
                          style={{ color: theme.palette.text.disabled }}
                        />
                      }
                      style={{
                        borderRadius: 4,
                        background: theme.palette.background.secondary,
                        maxWidth: "fit-content",
                      }}
                      className="ml-2 mb-2"
                      onDelete={() =>
                        setSelectedBranches(
                          selectedBranches.filter((item) => item !== branch.id)
                        )
                      }
                      label={branch.title}
                    />
                  );
                })
            ) : (
              <Chip
                deleteIcon={
                  <ClearRoundedIcon
                    style={{ color: theme.palette.text.disabled }}
                  />
                }
                style={{
                  borderRadius: 4,
                  background: theme.palette.background.secondary,
                  maxWidth: "fit-content",
                }}
                className="ml-2 mb-2"
                onDelete={() =>
                  setSelectedBranches(branches.map((branch) => branch.id))
                }
                label="None of the branches"
              />
            )}
          </div>
        )}
        <div className="d-flex align-items-center flex-wrap px-4">
          {selectedProducts?.length === products?.length ? (
            <Chip
              deleteIcon={
                <ClearRoundedIcon
                  style={{ color: theme.palette.text.disabled }}
                />
              }
              style={{
                borderRadius: 4,
                background: theme.palette.background.secondary,
                maxWidth: "fit-content",
              }}
              className="ml-2 mb-2"
              onDelete={() => setselectedProducts([])}
              label="All categories"
            />
          ) : selectedProducts?.length ? (
            products
              ?.filter((item) => selectedProducts.includes(item.id))
              .map((product) => {
                return (
                  <Chip
                    key={product.id}
                    deleteIcon={
                      <ClearRoundedIcon
                        style={{ color: theme.palette.text.disabled }}
                      />
                    }
                    style={{
                      borderRadius: 4,
                      background: theme.palette.background.secondary,
                      maxWidth: "fit-content",
                    }}
                    className="ml-2 mb-2"
                    onDelete={() =>
                      setselectedProducts(
                        selectedProducts.filter((item) => item !== product.id)
                      )
                    }
                    label={product.title}
                  />
                );
              })
          ) : (
            <Chip
              deleteIcon={
                <ClearRoundedIcon
                  style={{ color: theme.palette.text.disabled }}
                />
              }
              style={{
                borderRadius: 4,
                background: theme.palette.background.secondary,
                maxWidth: "fit-content",
              }}
              className="ml-2 mb-2"
              onDelete={() =>
                setselectedProducts(products?.map((product) => product.id))
              }
              label="‌None of the categories"
            />
          )}
        </div>
        <TableContainer
          className="mt-3 purchase-by-order-table"
          style={{ maxHeight: 500 }}
        >
          <Table
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <TableHead
              style={{
                backgroundColor: "#F1F2F3",
                height: 50,
                position: "sticky",
                top: 0,
              }}
            >
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    padding={headCell.padding || "unset"}
                    width={headCell.width || ""}
                    className="text-nowrap u-fontWeightBold"
                    key={headCell.id}
                    align={headCell.align}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {isLoading ? (
              <TableBody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <TableRow style={{ height: 53 }} key={item}>
                    {headCells.map((cell) => (
                      <TableCell key={cell.id}>
                        <Skeleton
                          style={{
                            transform: "scale(1)",
                            width: "100%",
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
                  (report, index) => {
                    return (
                      <TableRow key={report.id}>
                        {(index % 4 === 0 || index === 0) && (
                          <TableCell align="center" rowSpan={4}>
                            {englishNumberToPersianNumber(
                              index === 0 ? index + 1 : index / 4 + 1
                            )}
                          </TableCell>
                        )}
                        <TableCell
                          align="center"
                          className={
                            (index % 4 === 0 || index === 0) &&
                            "u-fontWeightBold"
                          }
                        >
                          {index % 4 === 0 || index === 0
                            ? "Chicken"
                            : "club"}
                        </TableCell>
                        <TableCell align="center">123</TableCell>
                        <TableCell align="center">1234</TableCell>
                        <TableCell align="center">12345</TableCell>
                        <TableCell align="center">123456</TableCell>
                        <TableCell align="center">1234567</TableCell>
                      </TableRow>
                    );
                  }
                )}
                <TableRow
                  style={{
                    backgroundColor: "#F1F2F3",
                    height: 85,
                    position: "sticky",
                    bottom: 0,
                  }}
                >
                  <TableCell align="center" style={{ border: "none" }}>
                    total
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ border: "none" }}
                  ></TableCell>
                  <TableCell align="center" style={{ border: "none" }}>
                    <div
                      style={{
                        backgroundColor: surface.neutral.default,
                        borderRadius: 4,
                      }}
                      className="px-4 py-3 u-fontWeightBold"
                    >
                      {priceFormatter(123123)}
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ border: "none" }}>
                    <div
                      style={{
                        backgroundColor: surface.neutral.default,
                        borderRadius: 4,
                      }}
                      className="px-4 py-3 u-fontWeightBold"
                    >
                      {priceFormatter(123123)}
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ border: "none" }}>
                    <div
                      style={{
                        backgroundColor: surface.neutral.default,
                        borderRadius: 4,
                      }}
                      className="px-4 py-3 u-fontWeightBold"
                    >
                      {priceFormatter(123123)}
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ border: "none" }}>
                    <div
                      style={{
                        backgroundColor: surface.neutral.default,
                        borderRadius: 4,
                      }}
                      className="px-4 py-3 u-fontWeightBold"
                    >
                      {priceFormatter(123123)}
                    </div>
                  </TableCell>
                  <TableCell align="center" style={{ border: "none" }}>
                    <div
                      style={{
                        backgroundColor: surface.neutral.default,
                        borderRadius: 4,
                      }}
                      className="px-4 py-3 u-fontWeightBold"
                    >
                      {priceFormatter(123123)}
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminCostOfGoodsSoldReport);
