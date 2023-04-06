/**
 *
 * PURCHASE BY INGREDIETNS REPORTS
 *
 */
import React, { memo, useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import moment from "moment-jalaali";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { generateCSVFile } from "@saas/utils/helpers/generateCSVFile";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

moment.locale("fa");
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
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
import useTheme from "@material-ui/core/styles/useTheme";
import {
  makeSelectBranches,
  makeSelectBusinessSlug,
  makeSelectBusiness,
} from "@saas/stores/business/selector";
import Chip from "@material-ui/core/Chip";
import EmptyStateForTableReports from "../components/EmptyStateForTableReports";
import {
  HIGHEST_PRICE,
  LOWEST_PRICE,
  HIGHEST_PROFIT,
  LOWEST_PROFIT,
} from "../constants";
import {
  makeSelectBusinessCategories,
  makeSelectWarehouseReportingCategories,
} from "store/selectors";
import {
  getBusinessCategories,
  getWarehouseReportingCategories,
} from "store/actions";

const sortingOptions = [
  { id: 0, text: "بیشترین مبلغ", keyword: HIGHEST_PRICE },
  { id: 1, text: "کمترین مبلغ", keyword: LOWEST_PRICE },
  { id: 2, text: "بیشترین سود", keyword: HIGHEST_PROFIT },
  { id: 3, text: "کمترین سود", keyword: LOWEST_PROFIT },
];

const sortingFunctions = {
  [HIGHEST_PRICE]: (warehouses) =>
    warehouses?.sort((a, b) => (a.expected_sales < b.expected_sales ? 1 : -1)),
  [LOWEST_PRICE]: (warehouses) =>
    warehouses?.sort((a, b) => (a.expected_sales > b.expected_sales ? 1 : -1)),
  [HIGHEST_PROFIT]: (warehouses) =>
    warehouses?.sort((a, b) =>
      a.expected_profit < b.expected_profit ? 1 : -1
    ),
  [LOWEST_PROFIT]: (warehouses) =>
    warehouses?.sort((a, b) =>
      a.expected_profit > b.expected_profit ? 1 : -1
    ),
};

const headCells = [
  {
    id: "id",
    name: "ردیف",
    label: "ردیف",
    align: "center",
    minWidth: 100,
  },
  {
    id: "id",
    name: "نام دسته‌بندی",
    label: "نام دسته‌بندی",
    align: "center",
    minWidth: 100,
  },
  {
    id: "id",
    name: "تعداد موجودی",
    label: "تعداد موجودی",
    align: "center",
    minWidth: 100,
  },
  {
    id: "id",
    name: "مجموع قیمت کل",
    label: (
      <div className="d-flex justify-content-between flex-column">
        <div>مجموع قیمت کل</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
    minWidth: 100,
  },
  {
    id: "id",
    name: "سود مورد انتطار",
    label: (
      <div className="d-flex justify-content-between flex-column">
        <div>سود مورد انتطار</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
    minWidth: 100,
  },
];

let timeoutId = null;

export function AdminCategoriesStorageReport({
  isLoading,
  isSuper,
  businessSlug,
  branches,
  warehouseReportingCategories,
  _getWarehouseReportingCategories,
  business,
  _getBusinessCategories,
  businessCategoreis,
}) {
  const categories = isSuper ? businessCategoreis : business?.resource_labels;

  const theme = useTheme();
  const [selectedBranch, setSelectedBranch] = useState(branches[0]?.slug);
  const [selectedCategories, setSelectedCategories] = useState(categories);
  useEffect(() => {
    if (isSuper) {
      setSelectedCategories(businessCategoreis?.map((category) => category.id));
    } else {
      setSelectedCategories(
        business?.resource_labels?.map((category) => category.id)
      );
    }
  }, [businessCategoreis]);

  const [selectedSortingType, selectSortingType] = useState(
    sortingOptions[0].keyword
  );

  const warehouseReports = useMemo(() => {
    if (warehouseReportingCategories) {
      return sortingFunctions[selectedSortingType](
        warehouseReportingCategories.labels_statistics
      );
    }
  }, [isSuper, warehouseReportingCategories, selectedSortingType]);

  const serilizedBrnaches = useMemo(
    () =>
      branches?.map((branch) => ({
        id: branch?.id,
        text: branch?.title,
        slug: branch?.slug,
      })),
    [branches]
  );

  useEffect(() => {
    if (isSuper) {
      if (selectedBranch && selectedCategories) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getWarehouseReportingCategories({
            business_slug: selectedBranch,
            label_id: selectedCategories,
          });
        }, 500);
      } else {
        clearTimeout(timeoutId);
      }
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        _getWarehouseReportingCategories({
          label_id: selectedCategories,
          business_slug: businessSlug,
        });
      }, 500);
    }
  }, [isSuper, selectedBranch, selectedCategories]);

  const headRow = headCells.map((headCell) => headCell.name);
  const rows = useMemo(
    () =>
      warehouseReportingCategories &&
      warehouseReports.map((report, index) => {
        const num = index + 1;
        const categoryName = report.name;
        const availableNum = report.inventory_count;
        const totalPrice = report.expected_sales;
        const expectedProfit = report.expected_profit;

        return [num, categoryName, availableNum, totalPrice, expectedProfit];
      }),
    [warehouseReportingCategories, warehouseReports]
  );
  const summaryRow = useMemo(
    () =>
      warehouseReportingCategories && [
        "جمع کل",
        "",
        warehouseReportingCategories?.totals.inventory_count,
        warehouseReportingCategories?.totals.expected_sales,
        warehouseReportingCategories?.totals.expected_profit,
      ],
    [warehouseReportingCategories]
  );

  useEffect(() => {
    if (isSuper) {
      if (selectedBranch.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getBusinessCategories({ business_slug: selectedBranch });
        }, 500);
      } else {
        clearTimeout(timeoutId);
      }
    }
  }, [selectedBranch]);

  return (
    <div className="container">
      <Head>
        <title>گزارش انبارگردانی محصولات</title>
      </Head>

      <AdminBreadCrumb
        submitButtonText="خروجی گرفتن"
        submitAction={() =>
          generateCSVFile(
            headRow,
            rows,
            summaryRow,
            "گزارش انبارگردانی محصولات"
          )
        }
      />

      <Paper
        elevation={2}
        className="d-flex flex-column mt-4"
        style={{ marginBottom: 50 }}
      >
        <div className="d-flex flex-wrap align-items-center justify-content-between p-4">
          <div className="d-flex flex-wrap align-items-center">
            {isSuper && (
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
                options={serilizedBrnaches}
                themeColor={process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}
                menuHeader={
                  <div
                    style={{ width: 200 }}
                    className="px-3 u-fontWeightBold u-fontNormal my-1"
                  >
                    انتخاب شعبه
                  </div>
                }
                selectOption={(text) => {
                  setSelectedBranch(
                    serilizedBrnaches.find((branch) => branch.text === text)
                      ?.slug
                  );
                }}
                inputData={{
                  defaultValue: "شعبه",
                }}
                selected={serilizedBrnaches.find(
                  (branch) => branch.slug === selectedBranch
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
            )}
            <Select
              className=" ml-3 mb-3"
              style={{ minWidth: 150, height: 36, flex: 1 }}
              value={selectedCategories}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              defaultValue={[]}
              // IconComponent={() => null}
              renderValue={() => {
                if (!selectedCategories?.length === 0)
                  return "دسته‌بندی انتخاب کنید";
                if (selectedCategories?.length === 1 && selectedCategories[0])
                  return categories?.find(
                    (category) => category.id === selectedCategories[0]
                  ).name;
                if (selectedCategories?.length === categories?.length)
                  return "همه دسته‌بندی‌ها";
                return `${englishNumberToPersianNumber(
                  selectedCategories?.length
                )} دسته‌بندی `;
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
                    selectedCategories?.length !== categories?.length &&
                    selectedCategories?.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => {
                    if (selectedCategories?.length) setSelectedCategories([]);
                    else setSelectedCategories(categories?.map((b) => b.id));
                  }}
                  color="primary"
                  checked={selectedCategories?.length === categories?.length}
                />
                <ListItemText
                  primary="انتخاب همه دسته‌بندی‌ها"
                  className="text-right"
                />
              </MenuItem>
              {categories?.map((category) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={`${category.id}-${selectedCategories?.includes(
                      category.id
                    )}`}
                    value={category.id}
                  >
                    <Checkbox
                      className="p-1"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!selectedCategories.includes(category.id)) {
                          setSelectedCategories([
                            ...selectedCategories,
                            category.id,
                          ]);
                        } else {
                          setSelectedCategories(
                            selectedCategories?.filter(
                              (id) => id !== category.id
                            )
                          );
                        }
                      }}
                      color="primary"
                      checked={selectedCategories?.includes(category.id)}
                    />
                    <ListItemText
                      primary={category.title}
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
            options={sortingOptions}
            themeColor={process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR}
            menuHeader={
              <div
                style={{ width: 200 }}
                className="px-3 u-fontWeightBold u-fontNormal my-1"
              >
                مرتب‌سازی بر اساس
              </div>
            }
            selectOption={(text) => {
              selectSortingType(
                sortingOptions.find((i) => i.text === text).keyword
              );
            }}
            inputData={{
              defaultValue: "مرتب‌سازی",
            }}
            selected={sortingOptions.find(
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

        <div className="d-flex align-items-center flex-wrap px-4">
          {selectedCategories?.length === categories?.length ? (
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
              onDelete={() => setselectedCategories([])}
              label="همه دسته‌بندی‌ها"
            />
          ) : selectedCategories?.length ? (
            categories
              ?.filter((item) => selectedCategories.includes(item.id))
              ?.map((category) => {
                return (
                  <Chip
                    key={category.id}
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
                      setselectedCategories(
                        selectedCategories.filter(
                          (item) => item !== category.id
                        )
                      )
                    }
                    label={category.title}
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
                setselectedCategories(
                  categories?.map((category) => category.id)
                )
              }
              label="‌هیچ‌کدام از دسته‌بندی‌ها"
            />
          )}
        </div>
        {true ? (
          <TableContainer
            className="mt-3 purchase-by-order-table"
            style={{ maxHeight: 500 }}
          >
            <Table
              aria-labelledby="tableTitle"
              size="small"
              aria-label="sticky table"
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
                      style={{ minWidth: headCell.minWidth }}
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
                  {warehouseReportingCategories &&
                    warehouseReports?.map((report, index) => {
                      return (
                        <TableRow key={report.id}>
                          <TableCell align="center">
                            {englishNumberToPersianNumber(index + 1)}
                          </TableCell>
                          <TableCell align="center">{report.title}</TableCell>
                          <TableCell align="center">
                            {englishNumberToPersianNumber(
                              report.inventory_count
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {priceFormatter(report.expected_sales)}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ direction: "ltr" }}
                          >
                            {priceFormatter(report.expected_profit)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  <TableRow
                    style={{
                      backgroundColor: "#F1F2F3",
                      height: 85,
                      position: "sticky",
                      bottom: 0,
                      direction: "ltr",
                    }}
                  >
                    <TableCell align="center" style={{ border: "none" }}>
                      جمع کل
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
                        {warehouseReportingCategories &&
                          englishNumberToPersianNumber(
                            warehouseReportingCategories.totals.inventory_count
                          )}
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
                        {warehouseReportingCategories &&
                          priceFormatter(
                            warehouseReportingCategories.totals.expected_sales
                          )}
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
                        {warehouseReportingCategories &&
                          priceFormatter(
                            warehouseReportingCategories.totals.expected_profit
                          )}
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        ) : (
          <EmptyStateForTableReports />
        )}
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  businessSlug: makeSelectBusinessSlug(),
  branches: makeSelectBranches(),
  warehouseReportingCategories: makeSelectWarehouseReportingCategories(),
  business: makeSelectBusiness(),
  businessCategoreis: makeSelectBusinessCategories(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getBusinessCategories: (data) => dispatch(getBusinessCategories(data)),
    _getWarehouseReportingCategories: (data) =>
      dispatch(getWarehouseReportingCategories(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminCategoriesStorageReport);
