/**
 *
 * PURCHASE BY PRODUCT REPORTS
 *
 */
import React, { Fragment, memo, useEffect, useMemo, useState } from "react";
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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Skeleton from "@material-ui/lab/Skeleton";
import {
  makeSelectBranches,
  makeSelectBusiness,
} from "@saas/stores/business/selector";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import Chip from "@material-ui/core/Chip";
import useTheme from "@material-ui/core/styles/useTheme";
import { makeSelectOrderTransactionFinancePaymentsType } from "store/selectors";
import { getOrderTransactionsFinancePaymentTypes } from "store/actions";
import { BASE_PLUGIN } from "@saas/utils/constants/plugins";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";

import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import CustomCalendar from "@saas/components/CustomCalendar";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import { formatDateObjectToNormal } from "../../../../../utils/helpers";
import { Divider } from "@material-ui/core";

jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const paymentTypes = [
  { id: "0", title: "Online" },
  { id: "1", title: "Cash" },
  { id: "2", title: "Card to card" },
  { id: "3", title: "wallet" },
  { id: "4", title: "card reader" },
  { id: "5", title: "wallet" },
  { id: "6", title: "Gift credit" },
  { id: "7", title: "Third person" },
];

const branchHeadCells = [
  {
    id: "id",
    name: "Row",
    label: "Row",
    align: "center",
  },
  {
    id: "id",
    name: "Payment Method",
    label: "Payment Method",
    align: "center",
  },
  {
    id: "id",
    name: "The number of payment",
    label: "The number of payment",
    align: "center",
  },
  {
    id: "id",
    name: "The amount of payment",
    label: (
      <div className="d-flex flex-column">
        <div>The amount of payment</div>
        <div className="u-font-semi-small u-fontWeightNormal">(Toman)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    name: "The number of return",
    label: "The number of return",
    align: "center",
  },
  {
    id: "id",
    name: "Return amount",
    label: (
      <div className="d-flex flex-column">
        <div>Return amount</div>
        <div className="u-font-semi-small u-fontWeightNormal">(Toman)</div>
      </div>
    ),
    align: "center",
  },
  {
    id: "id",
    name: "The final amount",
    label: (
      <div className="d-flex flex-column">
        <div>The final amount</div>
        <div className="u-font-semi-small u-fontWeightNormal">(Toman)</div>
      </div>
    ),
    align: "center",
  },
];

let timeoutId = null;

export function AdminComprehensiveSalesReportReport({
  isLoading,
  isSuper,
  branches,
  _getOrderTransactionsFinancePaymentTypes,
  orderTransactions,
}) {
  const theme = useTheme();

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });
  const [openModal, setOpenModal] = useState(false);
  const [selectedBranches, setSelectedBranches] = useState(
    branches.map((branch) => branch.id)
  );
  const [selectedPaymentType, setSelectedPaymentType] = useState(
    paymentTypes.map((saleChannel) => saleChannel.id)
  );

  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = openModal ? "simple-popover" : undefined;

  const submitDate = () => {
    if (isSuper) {
      if (selectedBranches.length !== 0) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          _getOrderTransactionsFinancePaymentTypes({
            payment_type: selectedPaymentType,
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
        _getOrderTransactionsFinancePaymentTypes({
          payment_type: selectedPaymentType,
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
          _getOrderTransactionsFinancePaymentTypes({
            payment_type: selectedPaymentType,
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
        _getOrderTransactionsFinancePaymentTypes({
          payment_type: selectedPaymentType,
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
  }, [isSuper, selectedBranches, selectedPaymentType]);

  const headCells = useMemo(() => {
    if (isSuper) {
      const mainBranchHeadCells = [...branchHeadCells];
      mainBranchHeadCells.splice(1, 0, {
        id: "id",
        label: "Branch",
        name: "Branch",
        align: "center",
      });
      return mainBranchHeadCells;
    } else {
      return branchHeadCells;
    }
  }, [isSuper]);

  const headRow = useMemo(
    () => headCells.map((headCell) => headCell.name),
    [headCells]
  );

  const rows = useMemo(() => {
    return orderTransactions?.businesses
      ?.map((businessTransactions, index) =>
        [1, ...businessTransactions.payment_types].map((payment, i) => {
          const num = index + 1;
          const brancheName = branches.find((branch) => {
            return branch.id === businessTransactions.business_id;
          })?.title;
          const paymentType =
            i === 0
              ? "All payment methods"
              : paymentTypes.find(
                  (paymentType) => paymentType.id == payment.payment_type
                )?.title;

          const paymentNum =
            i === 0
              ? businessTransactions.sales_total_count
              : payment?.sales?.count || 0;

          const refundNum =
            i === 0
              ? businessTransactions.refund_total_count || 0
              : payment?.refund?.count || 0;
          const paymentAmount =
            i === 0
              ? businessTransactions.sales_total_amount
              : payment?.sales?.amount || 0;
          const refundAmount =
            i === 0
              ? businessTransactions.refund_total_amount || 0
              : payment?.refund?.amount || 0;
          const totalPayment =
            i === 0
              ? businessTransactions?.sales_total_amount -
                businessTransactions?.refund_total_amount
              : payment?.total_amount || 0;
          if (isSuper) {
            return [
              num,
              brancheName,
              paymentType,
              paymentNum,
              refundNum,
              paymentAmount,
              refundAmount,
              totalPayment,
            ];
          }
          return [
            num,
            paymentType,
            paymentNum,
            refundNum,
            paymentAmount,
            refundAmount,
            totalPayment,
          ];
        })
      )
      .flat();
  }, [orderTransactions]);

  const summaryRow = useMemo(() => {
    const num = "total";
    const brancheName = "";
    const paymentType = "";
    const paymentNum = orderTransactions?.totals?.grand_sales_total_count || 0;
    const refundNum = orderTransactions?.totals?.grand_refund_total_count || 0;
    const paymentAmount =
      orderTransactions?.totals?.grand_sales_total_amount || 0;
    const refundAmount =
      orderTransactions?.totals?.grand_refund_total_amount || 0;
    const totalPayment =
      orderTransactions?.totals?.grand_sales_total_amount -
        orderTransactions?.totals?.grand_refund_total_amount || 0;

    if (isSuper) {
      return [
        num,
        brancheName,
        paymentType,
        paymentNum,
        refundNum,
        paymentAmount,
        refundAmount,
        totalPayment,
      ];
    }
    return [
      num,
      paymentType,
      paymentNum,
      refundNum,
      paymentAmount,
      refundAmount,
      totalPayment,
    ];
  });
  return (
    <div className="container">
      <Head>
        <title>
          {isSuper
            ? "Report of Financial Transactions of Branches Based on Payment Method"
            : "Report of Sales Financial Transaction"}
        </title>
      </Head>

      <AdminBreadCrumb
        submitButtonText="Output"
        submitAction={() =>
          generateCSVFile(
            headRow,
            rows,
            summaryRow,
            `Report of Financial Transactions of Branches Based on the Payment Method of${formatDateObjectToNormal(
              selectedDayRange.from
            )} until the${formatDateObjectToNormal(selectedDayRange.to)}`
          )
        }
      />

      <Paper elevation={2} className="d-flex flex-column mt-4">
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
                  if (selectedBranches.length === 0) return "Choose a branch";
                  if (selectedBranches.length === 1 && selectedBranches[0])
                    return branches.find(
                      (branch) => branch.id === selectedBranches[0]
                    )?.title;
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
                        primary={branch?.title}
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
              value={selectedPaymentType}
              multiple
              margin="dense"
              variant="outlined"
              displayEmpty
              size="large"
              // IconComponent={() => null}
              renderValue={() => {
                if (selectedPaymentType.length === 0)
                  return "Select the payment method";
                if (selectedPaymentType.length === 1 && selectedPaymentType[0])
                  return paymentTypes.find(
                    (branch) => branch.id === selectedPaymentType[0]
                  )?.title;
                if (selectedPaymentType.length === paymentTypes.length)
                  return "All payment methods";
                return `${englishNumberToPersianNumber(
                  selectedPaymentType.length
                )} Payment Method`;
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
                    selectedPaymentType.length !== paymentTypes.length &&
                    selectedPaymentType.length
                  }
                  onChange={(e) => {
                    e.preventDefault();
                  }}
                  onClick={() => {
                    if (selectedPaymentType.length) setSelectedPaymentType([]);
                    else setSelectedPaymentType(paymentTypes.map((b) => b.id));
                  }}
                  color="primary"
                  checked={selectedPaymentType.length === paymentTypes.length}
                />
                <ListItemText
                  primary="Select all payment methods"
                  className="text-right"
                />
              </MenuItem>
              {paymentTypes.map((branch) => {
                return (
                  <MenuItem
                    className="px-2"
                    key={`${branch.id}-${selectedPaymentType.includes(
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
                        if (!selectedPaymentType.includes(branch.id)) {
                          setSelectedPaymentType([
                            ...selectedPaymentType,
                            branch.id,
                          ]);
                        } else {
                          setSelectedPaymentType(
                            selectedPaymentType.filter((id) => id !== branch.id)
                          );
                        }
                      }}
                      color="primary"
                      checked={selectedPaymentType.includes(branch.id)}
                    />
                    <ListItemText
                      primary={branch?.title}
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
                      label={branch?.title}
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
          {selectedPaymentType?.length === paymentTypes?.length ? (
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
              onDelete={() => setSelectedPaymentType([])}
              label="All payment methods"
            />
          ) : selectedPaymentType?.length ? (
            paymentTypes
              ?.filter((item) => selectedPaymentType.includes(item.id))
              .map((paymentType, index) => {
                return (
                  <Chip
                    key={index}
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
                      setSelectedPaymentType(
                        selectedPaymentType.filter(
                          (item) => item !== paymentType.id
                        )
                      )
                    }
                    label={paymentType?.title}
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
                setCauseTypes(
                  paymentTypes?.map((paymentType) => paymentType.id)
                )
              }
              label="None of the payment methods"
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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <TableRow style={{ height: 53 }} key={item}>
                    {headCells.map((cell, index) => (
                      <TableCell
                        style={{ minWidth: index === 1 ? 150 : "unset" }}
                        key={cell.id}
                      >
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
                {orderTransactions?.businesses.map((report, index) => {
                  const havePaymentTypes = report.payment_types.length > 0;
                  return (
                    <Fragment key={report}>
                      <TableRow >
                        <TableCell>{index + 1}</TableCell>
                        {isSuper && (
                          <TableCell>
                            {
                              branches.find((branch) => {
                                return branch.id === report.business_id;
                              })?.title
                            }
                          </TableCell>
                        )}
                        <TableCell align="center" style={{ padding: 0 }}>
                          {report.payment_types.length === 0
                            ? "Without pay"
                            : report.payment_types.map((paymentType, index) => {
                                const paymentItem = paymentTypes.find(
                                  (item) => item.id === paymentType.payment_type
                                );
                                return (
                                  <>
                                    {" "}
                                    {index !== 0 && <Divider />}
                                    <div
                                      key={paymentType}
                                      style={{ padding: ".5rem 0 " }}
                                    >
                                      {paymentItem?.title}
                                    </div>
                                  </>
                                );
                             })}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            padding: 0,
                          }}
                        >
                          {!havePaymentTypes
                            ? report.sales_total_count
                            : report.payment_types.map((paymentType, index) => {
                                return (
                                  <>  {index !== 0 && <Divider />}
                                  <div key={paymentType} style={{padding:".5rem 0 "}} >
                                    {englishNumberToPersianNumber(paymentType?.sales?.count || 0)}
                                  </div></>
                                );
                              })}
                        </TableCell>
                        <TableCell align="center" style={{ padding: 0 }}>
                          {!havePaymentTypes
                            ? report.sales_total_amount
                            : report.payment_types.map((paymentType, index) => {
                                return (
                                  <>  {index !== 0 && <Divider />}
                                  <div key={paymentType} style={{padding:".5rem 0 "}} >

                                    {priceFormatter(paymentType?.sales?.amount || 0)}
                                  </div></>
                                );
                              })}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            padding: 0,
                          }}
                        >
                          {!havePaymentTypes
                            ? report.refund_total_count
                            : report.payment_types.map((paymentType, index) => {
                                return (
                                  <>  {index !== 0 && <Divider />}
                                  <div key={paymentType} style={{padding:".5rem 0 "}} >

                                    {englishNumberToPersianNumber(paymentType?.refund?.count || 0)}
                                  </div></>
                                );
                              })}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            padding: 0,
                          }}
                        >
                          {!havePaymentTypes
                            ? report.refund_total_amount
                            : report.payment_types.map((paymentType, index) => {
                                return (
                                  <>  {index !== 0 && <Divider />}
                                  <div key={paymentType} style={{padding:".5rem 0 "}} >

                                    {priceFormatter(paymentType?.refund?.amount || 0)}
                                  </div></>
                                );
                              })}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            padding: 0,
                          }}
                        >
                          {!havePaymentTypes
                            ? report?.sales_total_amount +
                              report?.refund_total_amount
                            : report.payment_types.map((paymentType, index) => {
                                return (
                                  <>  {index !== 0 && <Divider />}
                                  <div key={paymentType} style={{padding:".5rem 0 "}} >

                                    {priceFormatter(paymentType?.payment?.total_amount || 0)}
                                  </div></>
                                );
                              })}
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  );

                  return reportItem.map((payment, i) => (
                    <TableRow key={payment.id}>
                      {isSuper ? (
                        payment === 1 && (
                          <TableCell align="center">
                            {englishNumberToPersianNumber(index + 1)}
                          </TableCell>
                        )
                      ) : (
                        <TableCell align="center">
                          {englishNumberToPersianNumber(i + 1)}
                        </TableCell>
                      )}
                      {isSuper && payment === 1 && (
                        <TableCell align="center">
                          {
                            branches.find((branch) => {
                              return branch.id === report.business_id;
                            })?.title
                          }
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
                        {payment === 1
                          ? "All payment methods"
                          : paymentTypes.map((item) => {
                              if (item.id == payment.payment_type) {
                                return item?.title;
                              }
                            })}
                      </TableCell>
                      <TableCell
                        style={{
                          color:
                            i === 0
                              ? textTypes.text.default
                              : textTypes.text.subdued,
                        }}
                        align="center"
                      >
                        {englishNumberToPersianNumber(
                          i === 0
                            ? report.sales_total_count
                            : payment?.sales?.count || 0
                        )}
                      </TableCell>
                      <TableCell
                        style={{
                          color:
                            i === 0
                              ? textTypes.text.default
                              : textTypes.text.subdued,
                        }}
                        align="center"
                      >
                        {priceFormatter(
                          i === 0
                            ? report.sales_total_amount
                            : payment?.sales?.amount || 0
                        )}
                      </TableCell>
                      <TableCell
                        style={{
                          color:
                            i === 0
                              ? textTypes.text.default
                              : textTypes.text.subdued,
                        }}
                        align="center"
                      >
                        {englishNumberToPersianNumber(
                          i === 0
                            ? report.refund_total_count || 0
                            : payment?.refund?.count || 0
                        )}
                      </TableCell>
                      <TableCell
                        style={{
                          color:
                            i === 0
                              ? textTypes.text.default
                              : textTypes.text.subdued,
                        }}
                        align="center"
                      >
                        {priceFormatter(
                          i === 0
                            ? report.refund_total_amount || 0
                            : payment?.refund?.amount || 0
                        )}
                      </TableCell>
                      <TableCell
                        style={{
                          color:
                            i === 0
                              ? textTypes.text.default
                              : textTypes.text.subdued,
                        }}
                        align="center"
                      >
                        {priceFormatter(
                          i === 0
                            ? report?.sales_total_amount +
                                report?.refund_total_amount
                            : payment?.total_amount || 0
                        )}
                      </TableCell>
                    </TableRow>
                  ));
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
                    total
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
                        orderTransactions?.totals?.grand_sales_total_count || 0
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
                        orderTransactions?.totals?.grand_sales_total_amount || 0
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
                      {englishNumberToPersianNumber(
                        orderTransactions?.totals?.grand_refund_total_count || 0
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
                        orderTransactions?.totals?.grand_refund_total_amount ||
                          0
                      )}{" "}
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
                        orderTransactions?.totals?.grand_sales_total_amount -
                          orderTransactions?.totals
                            ?.grand_refund_total_amount || 0
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {/* <div
            style={{ backgroundColor: "#F1F2F3" }}
            className="d-flex align-items-center justify-content-between px-4 py-5"
          >
            <div>total:</div>
            <div
              style={{
                backgroundColor: surface.neutral.default,
                borderRadius: 4,
              }}
              className="px-4 py-3 u-fontWeightBold"
            >
              {priceFormatter(123123123)}
            </div>
          </div> */}
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  branches: makeSelectBranches(),
  orderTransactions: makeSelectOrderTransactionFinancePaymentsType(),
  BasePluginData: makeSelectPlugin(BASE_PLUGIN),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getOrderTransactionsFinancePaymentTypes: (data) =>
      dispatch(getOrderTransactionsFinancePaymentTypes(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminComprehensiveSalesReportReport);
