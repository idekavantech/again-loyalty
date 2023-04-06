/**
 *
 * PURCHASE BY PRODUCT REPORTS
 *
 */
import React, { memo, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Head from "next/head";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Paper from "@material-ui/core/Paper";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { generateCSVFile } from "@saas/utils/helpers/generateCSVFile";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import jMoment from "moment-jalaali";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import { surface, textTypes } from "@saas/utils/colors";
import MaterialSelect from "@saas/components/Select/MaterialSelect";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Skeleton from "@material-ui/lab/Skeleton";
import { getDiscountCodeReports } from "store/actions";
import { makeSelectDiscountCodeReports } from "store/selectors";
import {
  makeSelectBranches,
  makeSelectBusiness,
} from "@saas/stores/business/selector";
import {
  HIGHEST_DISCOUNTS,
  HIGHEST_PAYMENT_COUNT,
  LOWSET_DISCOUNTS,
  LOWSET_PAYMENT_COUNT,
} from "../constants";
import { BASE_PLUGIN } from "@saas/utils/constants/plugins";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import Chip from "@material-ui/core/Chip";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import useTheme from "@material-ui/core/styles/useTheme";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import CustomCalendar from "@saas/components/CustomCalendar";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import { formatDateObjectToNormal } from "../../../../../utils/helpers";

jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const sortingOptions = [
  { id: 0, text: "بیشترین مبلغ تخفیف", keyword: HIGHEST_DISCOUNTS },
  { id: 1, text: "کمترین مبلغ تخفیف", keyword: LOWSET_DISCOUNTS },
  { id: 2, text: "بیشترین مبلغ سفارش", keyword: HIGHEST_PAYMENT_COUNT },
  { id: 3, text: "کمترین مبلغ سفارش", keyword: LOWSET_PAYMENT_COUNT },
];

const sortingFunctions = {
  [HIGHEST_PAYMENT_COUNT]: (order) =>
    order?.businesses?.sort((a, b) =>
      a.total_discounts_given < b.total_discounts_given ? 1 : -1
    ),
  [LOWSET_PAYMENT_COUNT]: (order) =>
    order?.businesses?.sort((a, b) =>
      a.total_discounts_given > b.total_discounts_given ? 1 : -1
    ),
  [HIGHEST_DISCOUNTS]: (order) =>
    order?.businesses?.sort((a, b) =>
      a.total_discounts_given < b.total_payments ? 1 : -1
    ),
  [LOWSET_DISCOUNTS]: (order) =>
    order?.businesses?.sort((a, b) =>
      a.total_discounts_given > b.total_payments ? 1 : -1
    ),
};

const branchHeadCells = [
  {
    id: "id",
    name: "ردیف",
    label: "ردیف",
    align: "center",
  },
  {
    id: "id",
    name: "کدتخفیف",
    label: "کدتخفیف",
    align: "center",
  },
  {
    id: "id",
    name: "مبلغ سفارش",
    label: (
      <div className="d-flex flex-column">
        <div>مبلغ سفارش</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    name: "مبلغ تخفیف",
    label: (
      <div className="d-flex flex-column">
        <div>مبلغ تخفیف</div>
        <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
      </div>
    ),
    align: "center",
  },
  // {
  //   id: "id",
  //   label: (
  //     <div className="d-flex flex-column">
  //       <div>مبلغ نهایی خرید</div>
  //       <div className="u-font-semi-small u-fontWeightNormal">(تومان)</div>
  //     </div>
  //   ),
  //   align: "center",
  // },
];

let timeoutId = null;

export function AdminDiscountCodeReport({
  isLoading,
  isSuper,
  branches,
  discountCodeReports,
  _getDiscountCodeReports,
  BasePluginData,
  business,
}) {
  const salesChannels =
    business?.super_business?.plugins_config[BASE_PLUGIN]?.sales_channels ||
    BasePluginData?.salesChannels;

  const salesChannelsOptions = useMemo(() => {
    if (salesChannels) {
      return Object.entries(salesChannels).map(([key, value]) => ({
        id: key,
        keyword: key,
        title: value?.name,
      }));
    } else {
      return [];
    }
  }, [salesChannels]);
  const [selectedSalesChannel, setSelectedSalesChannel] = useState(
    salesChannelsOptions.map((salesChannel) => salesChannel.id)
  );
  const theme = useTheme();

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });
  const [openModal, setOpenModal] = useState(false);

  const [selectedBranches, setSelectedBranches] = useState(
    branches.map((branch) => branch.id)
  );
  const [selectedSortingType, selectSortingType] = useState(
    sortingOptions[0].keyword
  );

  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = openModal ? "simple-popover" : undefined;

  const submitDate = () => {
    if (isSuper) {
      if (selectedBranches.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getDiscountCodeReports({
            sales_channel: selectedSalesChannel,
            business_id: selectedBranches,
            from_date: persianToEnglishNumber(
              jMoment(
                formatDateObjectToNormal(selectedDayRange.from),
                "jYYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
            to_date: persianToEnglishNumber(
              jMoment(
                formatDateObjectToNormal(selectedDayRange.to),
                "jYYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
          });
        }, 500);
      } else {
        clearTimeout(timeoutId);
      }
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        _getDiscountCodeReports({
          sales_channel: selectedSalesChannel,
          from_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.from),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
          to_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.to),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
        });
      }, 500);
    }
    handleClose();
  };

  const headCells = useMemo(() => {
    if (isSuper) {
      const mainBranchHeadCells = [...branchHeadCells];
      mainBranchHeadCells.splice(1, 0, {
        id: "id",
        label: "شعبه",
        name: "شعبه",
        align: "center",
      });
      return mainBranchHeadCells;
    } else {
      return branchHeadCells;
    }
  }, [isSuper]);

  useEffect(() => {
    if (isSuper) {
      if (selectedBranches.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getDiscountCodeReports({
            sales_channel: selectedSalesChannel,
            business_id: selectedBranches,
            from_date: persianToEnglishNumber(
              jMoment(
                formatDateObjectToNormal(selectedDayRange.from),
                "jYYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
            to_date: persianToEnglishNumber(
              jMoment(
                formatDateObjectToNormal(selectedDayRange.to),
                "jYYYY-jM-jD"
              ).format("YYYY-M-D")
            ),
          });
        }, 500);
      } else {
        clearTimeout(timeoutId);
      }
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        _getDiscountCodeReports({
          sales_channel: selectedSalesChannel,
          from_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.from),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
          to_date: persianToEnglishNumber(
            jMoment(
              formatDateObjectToNormal(selectedDayRange.to),
              "jYYYY-jM-jD"
            ).format("YYYY-M-D")
          ),
        });
      }, 500);
    }
  }, [isSuper, selectedBranches, selectedSalesChannel]);

  const sortedDiscountCodes = useMemo(() => {
    if (isSuper) {
      return {
        ...discountCodeReports,
        items: sortingFunctions[selectedSortingType](discountCodeReports),
      };
    } else {
      return {
        ...discountCodeReports,
        items: sortingFunctions[selectedSortingType](discountCodeReports),
      };
    }
  }, [isSuper, selectedSortingType, discountCodeReports]);

  const headRow = useMemo(
    () => headCells.map((headCell) => headCell.name),
    [headCells]
  );

  const rows = useMemo(
    () =>
      sortedDiscountCodes?.businesses
        ?.map((report, index) =>
          [1, ...report?.codes].map((code, i) => {
            const num = index + 1;
            const branchName = report?.business_title;
            const discountCode =
              i === 0 ? "همه کدهای تخفیف" : code?.discount_code_name;
            const orderPrice =
              i == 0 ? report?.total_payments : code?.total_payments;
            const discountAmount =
              i == 0
                ? report?.total_discounts_given
                : code?.total_discounts_given;
            if (isSuper) {
              return [
                num,
                branchName,
                discountCode,
                orderPrice,
                discountAmount,
              ];
            }
            return [num, discountCode, orderPrice, discountAmount];
          })
        )
        .flat(),
    [sortedDiscountCodes]
  );
  const summaryRow = useMemo(
    () =>
      discountCodeReports && isSuper
        ? [
            "جمع کل",
            "",
            "",
            discountCodeReports?.totals?.[0]?.total_payments,
            discountCodeReports?.totals?.[0]?.total_discounts_given,
          ]
        : [
            "جمع کل",
            "",
            discountCodeReports?.totals?.[0]?.total_payments,
            discountCodeReports?.totals?.[0]?.total_discounts_given,
          ],
    [discountCodeReports]
  );
  return (
    <div className="container">
      <Head>
        <title>گزارش کدهای تخفیف</title>
      </Head>

      <AdminBreadCrumb
        submitButtonText="خروجی گرفتن"
        submitAction={() =>
          generateCSVFile(
            headRow,
            rows,
            summaryRow,
            `گزارش کدهای تخفیف از ${formatDateObjectToNormal(
              selectedDayRange.from
            )} تا  ${formatDateObjectToNormal(selectedDayRange.to)}`
          )
        }
      />
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
        <div className="d-flex flex-wrap align-items-center justify-content-between p-4 mb-5">
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
              value={selectedSalesChannel}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              renderValue={() => {
                if (selectedSalesChannel.length === 0)
                  return "کانال فروش انتخاب کنید";
                if (
                  selectedSalesChannel.length === 1 &&
                  selectedSalesChannel[0]
                )
                  return salesChannelsOptions.find(
                    (saleChannel) => saleChannel.id === selectedSalesChannel[0]
                  ).title;
                if (selectedSalesChannel.length === salesChannelsOptions.length)
                  return "همه کانال‌های فروش";
                return `${englishNumberToPersianNumber(
                  selectedSalesChannel.length
                )} کانال فروش `;
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
                    selectedSalesChannel.length !==
                      salesChannelsOptions.length && selectedSalesChannel.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => {
                    if (selectedSalesChannel.length)
                      setSelectedSalesChannel([]);
                    else
                      setSelectedSalesChannel(
                        salesChannelsOptions.map(
                          (saleChannel) => saleChannel.id
                        )
                      );
                  }}
                  color="primary"
                  checked={
                    selectedSalesChannel.length === salesChannelsOptions.length
                  }
                />
                <ListItemText
                  primary="انتخاب همه کانال‌های فروش"
                  className="text-right"
                />
              </MenuItem>
              {salesChannelsOptions.map((saleChannel) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={`${saleChannel.id}-${selectedSalesChannel.includes(
                      saleChannel.id
                    )}`}
                    value={saleChannel.id}
                  >
                    <Checkbox
                      className="p-1"
                      size="small"
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (!selectedSalesChannel.includes(saleChannel.id)) {
                          setSelectedSalesChannel([
                            ...selectedSalesChannel,
                            saleChannel.id,
                          ]);
                        } else {
                          setSelectedSalesChannel(
                            selectedSalesChannel.filter(
                              (id) => id !== saleChannel.id
                            )
                          );
                        }
                      }}
                      color="primary"
                      checked={selectedSalesChannel.includes(saleChannel.id)}
                    />
                    <ListItemText
                      primary={saleChannel.title}
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
        <div className="d-flex align-items-center flex-wrap px-4">
          {selectedSalesChannel?.length === salesChannelsOptions?.length ? (
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
              onDelete={() => setSelectedSalesChannel([])}
              label="همه کانال‌های فروش"
            />
          ) : selectedSalesChannel?.length ? (
            salesChannelsOptions
              ?.filter((item) => selectedSalesChannel.includes(item.id))
              .map((ingredient) => {
                return (
                  <Chip
                    key={ingredient.id}
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
                      setSelectedSalesChannel(
                        selectedSalesChannel.filter(
                          (item) => item !== ingredient.id
                        )
                      )
                    }
                    label={ingredient.title}
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
                setSelectedSalesChannel(
                  salesChannelsOptions?.map((ingredient) => ingredient.id)
                )
              }
              label="هیچ‌کدام از کانال‌های فروش"
            />
          )}
        </div>
        {/* <HighchartsReact
          className="mt-auto"
          highcharts={Highcharts}
          options={chartOption}
        /> */}
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
                {sortedDiscountCodes?.businesses?.map((report, index) => {
                  return [1, ...report?.codes].map((code, i) => {
                    return (
                      <TableRow key={code.id}>
                        {i == 0 && (
                          <TableCell
                            align="center"
                            rowSpan={report?.codes?.length + 1}
                          >
                            {englishNumberToPersianNumber(index + 1)}
                          </TableCell>
                        )}
                        {isSuper && i == 0 && (
                          <TableCell
                            rowSpan={report?.codes?.length + 1}
                            align="center"
                          >
                            {report?.business_title}
                          </TableCell>
                        )}

                        <TableCell
                          style={{
                            color:
                              i === 0
                                ? textTypes.text.default
                                : textTypes.text.subdued,
                          }}
                          align="right"
                        >
                          {i === 0 ? "همه کدهای تخفیف" : code?.discount_code}
                        </TableCell>

                        <TableCell align="center">
                          {i == 0
                            ? priceFormatter(report?.total_payments)
                            : priceFormatter(code?.total_payments)}
                        </TableCell>
                        <TableCell align="center">
                          {i == 0
                            ? priceFormatter(report?.total_discounts_given)
                            : priceFormatter(code?.total_discounts_given)}
                        </TableCell>
                        {/* <TableCell align="center">
                          {i == 0
                            ? priceFormatter(report?.total_net_sales)
                            : priceFormatter(code?.total_net_sales)}
                        </TableCell> */}
                      </TableRow>
                    );
                  });
                })}
                <TableRow
                  style={{
                    backgroundColor: "#F1F2F3",
                    height: 85,
                    position: "sticky",
                    bottom: 0,
                  }}
                >
                  <TableCell align="center" style={{ border: "none" }}>
                    جمع کل
                  </TableCell>
                  {isSuper && (
                    <TableCell
                      align="center"
                      style={{ border: "none" }}
                    ></TableCell>
                  )}
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
                      {priceFormatter(
                        discountCodeReports?.totals?.[0]?.total_payments
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
                      {priceFormatter(
                        discountCodeReports?.totals?.[0]?.total_discounts_given
                      )}
                    </div>
                  </TableCell>
                  {/* <TableCell align="center" style={{ border: "none" }}>
                    <div
                      style={{
                        backgroundColor: surface.neutral.default,
                        borderRadius: 4,
                      }}
                      className="px-4 py-3 u-fontWeightBold"
                    >
                      {priceFormatter(
                        discountCodeReports?.totals?.[0]?.total_net_sales
                      )}
                    </div>
                  </TableCell> */}
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
  discountCodeReports: makeSelectDiscountCodeReports(),
  BasePluginData: makeSelectPlugin(BASE_PLUGIN),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getDiscountCodeReports: (data) => dispatch(getDiscountCodeReports(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminDiscountCodeReport);
