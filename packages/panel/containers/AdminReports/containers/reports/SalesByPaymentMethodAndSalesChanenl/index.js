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
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import jMoment from "moment-jalaali";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Skeleton from "@material-ui/lab/Skeleton";
import useTheme from "@material-ui/core/styles/useTheme";
import {
  makeSelectBranches,
  makeSelectBusiness,
  makeSelectBusinessId,
} from "@saas/stores/business/selector";
import Chip from "@material-ui/core/Chip";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { surface } from "@saas/utils/colors";
import { getOrderTransactionsPerPaymentTypePerSalesChannel } from "store/actions";
import { makeSelectOrderTransactionPerPaymentsTypePerSaleChannel } from "store/selectors";
import { BASE_PLUGIN } from "@saas/utils/constants/plugins";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import CustomCalendar from "@saas/components/CustomCalendar";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import { formatDateObjectToNormal } from "../../../../../utils/helpers";

jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
const headCells = [
  {
    id: "id",
    name: "کانال فروش",
    label: "کانال فروش",
    align: "center",
    style: {
      position: "sticky",
      top: 0,
      right: 0,
      background: "#F1F2F3",
      width: 130,
    },
  },
  {
    id: "id",
    name: "ویترین",
    label: "ویترین",
    align: "center",
    collSpan: 5,
  },
  {
    id: "id",
    name: "حضوری",
    label: "حضوری",
    align: "center",
    collSpan: 5,
  },
  {
    id: "id",
    name: "تلفنی",
    label: "تلفنی",
    align: "center",
    collSpan: 5,
  },
  {
    id: "id",
    name: "اسنپ‌فود",
    label: "اسنپ‌فود",
    align: "center",
    collSpan: 5,
  },
  {
    id: "id",
    name: "جمع کل",
    label: "جمع کل",
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

const paymentTypes = [
  { id: 0, title: "آنلاین" },
  { id: 1, title: "نقدی" },
  { id: 2, title: "کارت به کارت" },
  { id: 3, title: "کیف پول" },
  { id: 4, title: "کارت خوان" },
];

const salesChannel = [
  {
    id: 0,
    name: "ویترین",
    label: "ویترین",
    align: "center",
    collSpan: 5,
  },
  {
    id: 1,
    name: "حضوری",
    label: "حضوری",
    align: "center",
    collSpan: 5,
  },
  {
    id: 2,
    name: "تلفنی",
    label: "تلفنی",
    align: "center",
    collSpan: 5,
  },
  {
    id: 3,
    name: "اسنپ‌فود",
    label: "اسنپ‌فود",
    align: "center",
    collSpan: 5,
  },
];

let timeoutId = null;
export function AdminSalesByPaymentMethodAndSalesChannelReport({
  isLoading,
  isSuper,
  branches,
  orderTransactionsPerPaymentPerChannel,
  _getOrderTransactionsPerPaymentTypePerSalesChannel,
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
  const [selectedBranches, setSelectedBranches] = useState(
    branches.map((branch) => branch.id)
  );
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = open ? "simple-popover" : undefined;

  const submitDate = () => {
    if (isSuper) {
      if (selectedBranches.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getOrderTransactionsPerPaymentTypePerSalesChannel({
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
        _getOrderTransactionsPerPaymentTypePerSalesChannel({
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

  useEffect(() => {
    if (isSuper) {
      if (selectedBranches.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getOrderTransactionsPerPaymentTypePerSalesChannel({
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
        _getOrderTransactionsPerPaymentTypePerSalesChannel({
          sales_channel: selectedSalesChannel,
          from_date: persianToEnglishNumber(fromDate.format("YYYY-MM-DD")),
          to_date: persianToEnglishNumber(toDate.format("YYYY-MM-DD")),
        });
      }, 500);
    }
  }, [isSuper, selectedBranches, selectedSalesChannel]);

  return (
    <div className="container mb-5">
      <Head>
        <title>گزارش تعدادی فاکتور براساس روش پرداخت و کانال فروش</title>
      </Head>

      <AdminBreadCrumb />

      <Paper elevation={2} className="d-flex flex-column mt-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between p-4">
          <div className="d-flex flex-wrap align-items-center">
            <div className="d-flex flex-wrap align-items-center ml-3 mb-3">
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
                // IconComponent={() => null}
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
              // IconComponent={() => null}
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
        <TableContainer
          className="mt-3 purchase-by-order-table"
          style={{ maxHeight: 500 }}
        >
          <Table
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            {!isLoading && (
              <TableHead>
                <TableRow
                  style={{
                    backgroundColor: "#F1F2F3",
                    height: 50,
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  {headCells.map((headCell) => (
                    <TableCell
                      padding={headCell.padding || "unset"}
                      width={headCell.width || ""}
                      className="text-nowrap u-fontWeightBold"
                      key={headCell.id}
                      align={headCell.align}
                      style={headCell.style}
                      colSpan={headCell.collSpan}
                      rowSpan={headCell.rowSpan}
                    >
                      {headCell.label}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{
                      position: "sticky",
                      top: 0,
                      right: 0,
                      background: "#F1F2F3",
                      width: 130,
                    }}
                  >
                    روش پرداخت
                  </TableCell>
                  {[0, 1, 2, 3].map(() =>
                    paymentTypes.map((pay) => (
                      <TableCell key={pay.id} align="center">
                        {" "}
                        {pay.title}{" "}
                      </TableCell>
                    ))
                  )}

                  <TableCell
                    align="center"
                    style={{
                      position: "sticky",
                      left: 0,
                      background: "#F1F2F3",
                      width: 130,
                      border: "none",
                    }}
                  ></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{
                      position: "sticky",
                      top: 0,
                      right: 0,
                      background: "#F1F2F3",
                      width: 130,
                    }}
                  >
                    تعداد پرداخت
                  </TableCell>
                  {salesChannel.map(
                    (channels) =>
                      orderTransactionsPerPaymentPerChannel?.sales_channels
                        .find(
                          (sale_item) => sale_item.sales_channel == channels.id
                        )
                        ?.per_transaction_id.map((payment) =>
                          payment.transaction_type === "sales"
                            ? paymentTypes.map((item) => (
                                <TableCell key={item.id} align="center">
                                  {englishNumberToPersianNumber(
                                    payment.items.find(
                                      (pay) => pay.payment_type == item.id
                                    )?.total_count || 0
                                  )}{" "}
                                </TableCell>
                              ))
                            : ""
                        ) ||
                      paymentTypes.map((item) => (
                        <TableCell key={item.id} align="center">
                          {englishNumberToPersianNumber(0)}{" "}
                        </TableCell>
                      ))
                  )}
                  <TableCell
                    align="center"
                    style={{
                      position: "sticky",
                      left: 0,
                      background: "#F1F2F3",
                      width: 130,
                      border: "none",
                    }}
                  >
                    {" "}
                    <div
                      style={{
                        backgroundColor: surface.neutral.default,
                        borderRadius: 4,
                      }}
                      className="px-4 py-3 u-fontWeightBold"
                    >
                      {englishNumberToPersianNumber(
                        orderTransactionsPerPaymentPerChannel?.totals.find(
                          (report) => report.transaction_type === "sales"
                        )?.total_count
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{
                      position: "sticky",
                      top: 0,
                      right: 0,
                      background: "#F1F2F3",
                      width: 130,
                    }}
                  >
                    درصد پرداخت
                  </TableCell>
                  {salesChannel.map(
                    (channels) =>
                      orderTransactionsPerPaymentPerChannel?.sales_channels
                        .find(
                          (sale_item) => sale_item.sales_channel == channels.id
                        )
                        ?.per_transaction_id.map((payment) =>
                          payment.transaction_type === "sales"
                            ? paymentTypes.map((item) => (
                                <TableCell key={item.id} align="center">
                                  {englishNumberToPersianNumber(
                                    payment.items
                                      .find(
                                        (pay) => pay.payment_type == item.id
                                      )
                                      ?.total_count_percent.toFixed(0) || 0
                                  )}
                                  %
                                </TableCell>
                              ))
                            : ""
                        ) ||
                      paymentTypes.map((item) => (
                        <TableCell key={item.id} align="center">
                          {englishNumberToPersianNumber(0)}%
                        </TableCell>
                      ))
                  )}
                  <TableCell
                    align="center"
                    style={{
                      position: "sticky",
                      left: 0,
                      background: "#F1F2F3",
                      width: 130,
                      border: "none",
                    }}
                  ></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{
                      position: "sticky",
                      top: 0,
                      right: 0,
                      background: "#F1F2F3",
                      width: 130,
                    }}
                  >
                    تعداد بازگشت
                  </TableCell>
                  {salesChannel.map((channels) => {
                    let per_channel =
                      orderTransactionsPerPaymentPerChannel?.sales_channels.find(
                        (sale_item) => sale_item.sales_channel == channels.id
                      );
                    return per_channel?.per_transaction_id.some(
                      (item) => item.transaction_type == "refund"
                    )
                      ? per_channel?.per_transaction_id.map((payment) =>
                          payment.transaction_type === "refund"
                            ? paymentTypes.map((paymentType) => (
                                <TableCell key={paymentType.id} align="center">
                                  {englishNumberToPersianNumber(
                                    payment.items.find(
                                      (pay) =>
                                        pay.payment_type == paymentType.id
                                    )?.total_count || 0
                                  )}{" "}
                                </TableCell>
                              ))
                            : ""
                        )
                      : paymentTypes.map((item) => (
                          <TableCell key={item.id} align="center">
                            {englishNumberToPersianNumber(0)}
                          </TableCell>
                        ));
                  })}
                  <TableCell
                    align="center"
                    style={{
                      position: "sticky",
                      left: 0,
                      background: "#F1F2F3",
                      width: 130,
                      border: "none",
                    }}
                  >
                    {" "}
                    <div
                      style={{
                        backgroundColor: surface.neutral.default,
                        borderRadius: 4,
                      }}
                      className="px-4 py-3 u-fontWeightBold"
                    >
                      {englishNumberToPersianNumber(
                        orderTransactionsPerPaymentPerChannel?.totals.find(
                          (report) => report.transaction_type === "refund"
                        )?.total_count
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{
                      position: "sticky",
                      top: 0,
                      right: 0,
                      background: "#F1F2F3",
                      width: 130,
                    }}
                  >
                    درصد بازگشت
                  </TableCell>
                  {salesChannel.map((channels) => {
                    let per_channel =
                      orderTransactionsPerPaymentPerChannel?.sales_channels.find(
                        (sale_item) => sale_item.sales_channel == channels.id
                      );
                    return per_channel?.per_transaction_id.some(
                      (item) => item.transaction_type == "refund"
                    )
                      ? per_channel?.per_transaction_id.map((payment) =>
                          payment.transaction_type === "refund"
                            ? paymentTypes.map((paymentType) => (
                                <TableCell key={paymentType.id} align="center">
                                  {englishNumberToPersianNumber(
                                    payment.items
                                      .find(
                                        (pay) =>
                                          pay.payment_type == paymentType.id
                                      )
                                      ?.total_count_percent.toFixed(0) || 0
                                  )}
                                  %
                                </TableCell>
                              ))
                            : ""
                        )
                      : paymentTypes.map((item) => (
                          <TableCell key={item.id} align="center">
                            {englishNumberToPersianNumber(0)}%
                          </TableCell>
                        ));
                  })}
                  <TableCell
                    align="center"
                    style={{
                      position: "sticky",
                      left: 0,
                      background: "#F1F2F3",
                      width: 130,
                      border: "none",
                    }}
                  ></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{
                      position: "sticky",
                      top: 0,
                      right: 0,
                      background: "#F1F2F3",
                      width: 130,
                    }}
                  >
                    تعداد سهم از فروش
                  </TableCell>

                  {salesChannel.map((channels) => (
                    <TableCell key={channels.id} align="center" colSpan={5}>
                      {" "}
                      {englishNumberToPersianNumber(
                        orderTransactionsPerPaymentPerChannel?.sales_channels.find(
                          (sale_item) => sale_item.sales_channel == channels.id
                        )?.total_grand_total_count || 0
                      )}{" "}
                    </TableCell>
                  ))}

                  <TableCell
                    align="center"
                    style={{
                      position: "sticky",
                      left: 0,
                      background: "#F1F2F3",
                      width: 130,
                      border: "none",
                    }}
                  ></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{
                      position: "sticky",
                      top: 0,
                      right: 0,
                      background: "#F1F2F3",
                      width: 130,
                    }}
                  >
                    درصد سهم از فروش
                  </TableCell>
                  {salesChannel.map((channels) => (
                    <TableCell key={channels.id} align="center" colSpan={5}>
                      {englishNumberToPersianNumber(
                        orderTransactionsPerPaymentPerChannel?.sales_channels
                          .find(
                            (sale_item) =>
                              sale_item.sales_channel == channels.id
                          )
                          ?.total_grand_total_count_percent.toFixed(0) || 0
                      )}
                      %
                    </TableCell>
                  ))}
                  <TableCell
                    align="center"
                    style={{
                      position: "sticky",
                      left: 0,
                      background: "#F1F2F3",
                      width: 130,
                      border: "none",
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
            )}
            {isLoading && (
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
  business_id: makeSelectBusinessId(),
  orderTransactionsPerPaymentPerChannel:
    makeSelectOrderTransactionPerPaymentsTypePerSaleChannel(),
  BasePluginData: makeSelectPlugin(BASE_PLUGIN),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getOrderTransactionsPerPaymentTypePerSalesChannel: (data) =>
      dispatch(getOrderTransactionsPerPaymentTypePerSalesChannel(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo
)(AdminSalesByPaymentMethodAndSalesChannelReport);
