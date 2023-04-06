/**
 *
 * PURCHASE BY PRODUCT REPORTS
 *
 */
import React, { memo, useMemo, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import jMoment from "moment-jalaali";
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
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {
  HIGHEST_PRICE,
  HIGHEST_SALES_AMOUNT,
  LOWEST_PRICE,
  LOWEST_SALES_AMOUNT,
} from "../constants";
import { makeSelectBranches } from "@saas/stores/business/selector";
import Chip from "@material-ui/core/Chip";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import useTheme from "@material-ui/core/styles/useTheme";

import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import CustomCalendar from "@saas/components/CustomCalendar";

jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const categories = [
  { id: 1, title: "نان‌ها" },
  { id: 2, title: "سس‌ها" },
  { id: 3, title: "نوشیدنی‌ها" },
  { id: 4, title: "ساندویچ‌ها" },
];

const sortingOptions = [
  { id: 0, text: "بیشترین تعداد فروش", keyword: HIGHEST_SALES_AMOUNT },
  { id: 1, text: "کمترین تعداد فروش", keyword: LOWEST_SALES_AMOUNT },
  { id: 2, text: "بیشترین مبلغ فروش", keyword: HIGHEST_PRICE },
  { id: 3, text: "کمترین مبلغ فروش", keyword: LOWEST_PRICE },
];

const headCells = [
  {
    id: "id",
    label: "ردیف",
    align: "center",
  },
  {
    id: "id",
    label: "دسته‌بندی",
    align: "center",
  },
  {
    id: "id",
    label: "تعداد فروش",
    align: "center",
  },
  {
    id: "id",
    label: "تعداد بازگشت",
    align: "center",
  },
  {
    id: "id",
    label: (
      <div className="d-flex flex-column">
        <div>مبلغ بازگشت</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    label: (
      <div className="d-flex flex-column">
        <div>مبلغ تخفیف</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    label: (
      <div className="d-flex flex-column">
        <div>مالیات</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    label: (
      <div className="d-flex flex-column">
        <div>مبلغ فروش ناخالص</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
    style: {
      position: "sticky",
      top: 0,
      left: 126,
      background: "#F1F2F3",
      borderRight: "none",
      borderBottom: "none",
      width: 130,
    },
  },
  {
    id: "id",
    label: (
      <div className="d-flex flex-column">
        <div>مبلغ فروش خالص</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
    style: {
      position: "sticky",
      top: 0,
      left: 0,
      background: "#F1F2F3",
      borderRight: "none",
      borderBottom: "none",
      width: 130,
    },
  },
];

export function AdminCategoriesSalesReport({ isLoading, isSuper, branches }) {
  const theme = useTheme();

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });
  const [selectedBranches, setSelectedBranches] = useState(
    branches.map((branch) => branch.id)
  );
  const [selectedCategories, setSelectedCategories] = useState(
    categories.map((category) => category.id)
  );
  const [selectedSortingType, selectSortingType] = useState(
    sortingOptions[0].keyword
  );

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = openModal ? "simple-popover" : undefined;

  const submitDate = () => {};

  const chartOption = useMemo(
    () => ({
      yAxis: {
        title: {
          text: "مبلغ خرید به تومان",
          style: {
            fontSize: "14px",
            fontFamily: "IranSans",
          },
        },
        labels: {
          formatter: function () {
            return priceFormatter(this.value);
          },
          style: {
            color: "#636363",
            fontFamily: "IranSans",
            fontSize: "12px",
          },
        },
      },
      colors: [process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR],
      legend: {
        rtl: true,
        itemStyle: {
          font: "12px IranSans",
          color: "#c9c8c8",
        },
        itemHoverStyle: {
          color: "#fff",
        },
        itemHiddenStyle: {
          color: "red",
        },
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: [
          "مترو آزادی",
          "شادمان",
          "ولیعصر",
          "انقلاب",
          "سیدخندان",
          "ولنجک",
          "کامرانیه",
          "سعادت‌آباد",
          "فرمانیه",
          "شهرک‌غرب",
        ],
      },
      series: [
        {
          type: "column",
          data: [
            1000000, 5000000, 3200000, 857000, 555000, 987000, 7500000, 8700000,
            3800000, 285000,
          ],
        },
      ],
      tooltip: {
        useHTML: true,
        style: {
          fontSize: "10px",
          textAlign: "right",
          fontFamily: "inherit",
          color: "rgba(218, 217, 217, 0.994)",
          direction: "rtl",
        },
        formatter: function () {
          const labelText =
            "<p>" + this.x + ": " + priceFormatter(this.y) + "</p>";
          return labelText;
        },
      },
    }),
    [isSuper]
  );
  return (
    <div className="container">
      <Head>
        <title>گزارش مالی فروش دسته‌بندی‌ها</title>
      </Head>

      <AdminBreadCrumb />
      <style
        dangerouslySetInnerHTML={{
          __html: `
       .highcharts-background {
         fill : #FFFFFF;
       }
       `,
        }}
      />

      <Paper
        elevation={2}
        className="d-flex flex-column mt-4"
        style={{ marginBottom: 50 }}
      >
        <div className="d-flex flex-wrap align-items-center justify-content-between p-4">
          <div className="d-flex flex-wrap align-items-center">
            <div className="d-flex flex-wrap align-items-center mb-3 ml-3">
              <Button
                style={{
                  direction: "rtl",
                }}
                aria-describedby={id}
                onClick={handleOpen}
                variant="outlined"
              >
                از{" "}
                <span className="px-2">
                  {englishNumberToPersianNumber(
                    formatDateObjectToNormal(selectedDayRange.from)
                  )}
                </span>
                تا{" "}
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
                <div style={{ backgroundColor: "#fff", position: "relative" }}>
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
                    submitDate={submitDate}
                  />
                </div>
              </Popover>
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
                  if (selectedBranches.length === 0) return "شعبه انتخاب کنید";
                  if (selectedBranches.length === 1 && selectedBranches[0])
                    return branches.find(
                      (branch) => branch.id === selectedBranches[0]
                    ).title;
                  if (selectedBranches.length === branches.length)
                    return "همه شعب";
                  return `${englishNumberToPersianNumber(
                    selectedBranches.length
                  )} شعبه `;
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
                    primary="انتخاب همه شعب"
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
              value={selectedCategories}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              // IconComponent={() => null}
              renderValue={() => {
                if (selectedCategories.length === 0)
                  return "دسته‌بندی انتخاب کنید";
                if (selectedCategories.length === 1 && selectedCategories[0])
                  return categories.find(
                    (category) => category.id === selectedCategories[0]
                  ).title;
                if (selectedCategories.length === categories.length)
                  return "همه دسته‌بندی‌ها";
                return `${englishNumberToPersianNumber(
                  selectedCategories.length
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
                    selectedCategories.length !== categories.length &&
                    selectedCategories.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => {
                    if (selectedCategories.length) setSelectedCategories([]);
                    else setSelectedCategories(categories.map((b) => b.id));
                  }}
                  color="primary"
                  checked={selectedCategories.length === categories.length}
                />
                <ListItemText
                  primary="انتخاب همه دسته‌بندی‌ها"
                  className="text-right"
                />
              </MenuItem>
              {categories.map((category) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={`${category.id}-${selectedCategories.includes(
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
                            selectedCategories.filter(
                              (id) => id !== category.id
                            )
                          );
                        }
                      }}
                      color="primary"
                      checked={selectedCategories.includes(category.id)}
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
            selectOption={(text) =>
              selectSortingType(
                sortingOptions.find((i) => i.text === text).keyword
              )
            }
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
        {isSuper && (
          <div className="d-flex align-items-center flex-wrap px-4 mt-2 ">
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
                label="همه شعب"
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
                label="هیچ‌کدام از شعب"
              />
            )}
          </div>
        )}
        <div className="d-flex align-items-center flex-wrap px-4 mt-2 mb-5">
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
              onDelete={() => setSelectedCategories([])}
              label="همه دسته‌بندی‌ها"
            />
          ) : selectedCategories?.length ? (
            categories
              ?.filter((item) => selectedCategories.includes(item.id))
              .map((category) => {
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
                      setSelectedCategories(
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
                setSelectedCategories(
                  categories?.map((category) => category.id)
                )
              }
              label="‌هیچ‌کدام از دسته‌بندی‌ها"
            />
          )}
        </div>
        <HighchartsReact
          className="mt-auto"
          highcharts={Highcharts}
          options={chartOption}
        />
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
                zIndex: 1,
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
                    style={headCell.style}
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
                {[
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                  19,
                ].map((report, index) => {
                  return (
                    <TableRow key={report.id}>
                      <TableCell align="center">
                        {englishNumberToPersianNumber(index + 1)}
                      </TableCell>
                      {isSuper && <TableCell align="center">123123</TableCell>}
                      <TableCell align="center">123123</TableCell>
                      <TableCell align="center">123123</TableCell>
                      <TableCell align="center">123123</TableCell>
                      <TableCell align="center">123123</TableCell>
                      <TableCell align="center">123123</TableCell>
                      <TableCell
                        align="center"
                        style={{
                          position: "sticky",
                          left: 126,
                          background: "#F1F2F3",
                          width: 130,
                        }}
                      >
                        123123
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          position: "sticky",
                          left: 0,
                          background: "#F1F2F3",
                          width: 130,
                        }}
                      >
                        123123
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
                  }}
                >
                  <TableCell
                    align="center"
                    style={{ border: "none", position: "sticky", right: 0 }}
                  >
                    جمع کل
                  </TableCell>
                  {isSuper && (
                    <TableCell
                      align="center"
                      style={{ border: "none" }}
                    ></TableCell>
                  )}
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
                  <TableCell
                    align="center"
                    style={{
                      border: "none",
                      position: "sticky",
                      left: 126,
                      background: "#F1F2F3",
                      width: 130,
                    }}
                  >
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
                  <TableCell
                    align="center"
                    style={{
                      border: "none",
                      position: "sticky",
                      left: 0,
                      background: "#F1F2F3",
                      width: 130,
                    }}
                  >
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
  branches: makeSelectBranches(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminCategoriesSalesReport);
