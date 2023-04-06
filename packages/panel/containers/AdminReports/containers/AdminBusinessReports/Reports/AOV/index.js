/**
 *
 * Categories
 *
 */
import React, { memo, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { makeSelectBusiness } from "@saas/stores/business/selector";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { getReportData } from "store/actions";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { makeSelectReportsData } from "store/selectors";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import jMoment from "moment-jalaali";
import moment from "moment-jalaali";
import { makeSelectReportsLoading } from "@saas/stores/global/selectors";
import {
  ORDERS_REPORT_TYPE,
  TRANSACTIONS_REPORT_TYPE,
} from "@saas/stores/global/constants";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import Chart from "../../Chart";
import { NEW_SHOPPING_ORDERS, NEW_TRANSACTION_API } from "@saas/utils/api";
import { businessBranchesDataMerger } from "containers/helper";
import jsPDF from "jspdf";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import {
  TOTAL_ORDER,
  TOTAL_PAYMENTS,
} from "containers/AdminReportBuilder/constants";

import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import CustomCalendar from "@saas/components/CustomCalendar";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import { formatDateObjectToNormal } from "../../../../../../utils/helpers";


jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const $ = `/images/$.svg`;

const columns = ["تاریخ", "مجموع فروش", "تعداد سفارش", "میانگین ارزش سفارش"];

export function AdminReports({
  _getReportData,
  reportsData = {},
  reportsLoadingState,
  business,
}) {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });
  const [rows, setRows] = useState([]);
  const [compareToPrevious, setCompareToPrevious] = useState(true);
  const selectedBranches = [business?.id];

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = open ? "simple-popover" : undefined;

  const submitDate = () => {
    _getReportData(
      persianToEnglishNumber(
        jMoment(
          formatDateObjectToNormal(selectedDayRange.from),
          "jYYYY-jM-jD"
        ).format("YYYY-M-D")
      ),
      persianToEnglishNumber(
        jMoment(
          formatDateObjectToNormal(selectedDayRange.to),
          "jYYYY-jM-jD"
        ).format("YYYY-M-D")
      ),
      TRANSACTIONS_REPORT_TYPE,
      NEW_TRANSACTION_API,
      false,
      compareToPrevious
    );
    _getReportData(
      persianToEnglishNumber(
        jMoment(
          formatDateObjectToNormal(selectedDayRange.from),
          "jYYYY-jM-jD"
        ).format("YYYY-M-D")
      ),
      persianToEnglishNumber(
        jMoment(
          formatDateObjectToNormal(selectedDayRange.to),
          "jYYYY-jM-jD"
        ).format("YYYY-M-D")
      ),
      ORDERS_REPORT_TYPE,
      NEW_SHOPPING_ORDERS,
      false,
      compareToPrevious
    );
    handleClose();
  };
  useEffect(() => {
    setTimeout(() => {
      submitDate();
    }, 0);
  }, []);

  const {
    currentRange: mainTransactionsData,
    previousRange: comparedTransactionsData,
  } = reportsData?.[TRANSACTIONS_REPORT_TYPE] || [];
  const {
    currentRange: mainShoppingOrdersData,
    previousRange: comparedShoppingOrdersData,
  } = reportsData?.[ORDERS_REPORT_TYPE] || [];

  const isTransactionsReportLoading = useMemo(
    () => reportsLoadingState?.[TRANSACTIONS_REPORT_TYPE],
    [reportsLoadingState]
  );
  const isOrdersReportLoading = useMemo(
    () => reportsLoadingState?.[ORDERS_REPORT_TYPE],
    [reportsLoadingState]
  );

  const mergedMainTransactionsPerDay = useMemo(
    () =>
      reportsData?.[TRANSACTIONS_REPORT_TYPE] &&
      mainTransactionsData &&
      businessBranchesDataMerger(mainTransactionsData, selectedBranches),
    [
      reportsData?.[TRANSACTIONS_REPORT_TYPE],
      compareToPrevious,
      selectedBranches,
    ]
  );
  const mergedComparedTransactionsPerDay = useMemo(
    () =>
      reportsData?.[TRANSACTIONS_REPORT_TYPE] &&
      comparedTransactionsData &&
      businessBranchesDataMerger(comparedTransactionsData, selectedBranches),
    [
      reportsData?.[TRANSACTIONS_REPORT_TYPE],
      compareToPrevious,
      selectedBranches,
    ]
  );

  const mergedMainShoppingOrdersPerDay = useMemo(
    () =>
      reportsData?.[ORDERS_REPORT_TYPE] &&
      mainShoppingOrdersData &&
      businessBranchesDataMerger(mainShoppingOrdersData, selectedBranches),
    [reportsData?.[ORDERS_REPORT_TYPE], compareToPrevious, selectedBranches]
  );

  const mergedComparedShoppingOrdersPerDay = useMemo(
    () =>
      reportsData?.[ORDERS_REPORT_TYPE] &&
      comparedShoppingOrdersData &&
      businessBranchesDataMerger(comparedShoppingOrdersData, selectedBranches),
    [reportsData?.[ORDERS_REPORT_TYPE], compareToPrevious, selectedBranches]
  );

  useEffect(() => {
    if (mergedMainTransactionsPerDay) {
      const _rows = mergedMainTransactionsPerDay?.map((transaction) => {
        const currentDate = new Date(transaction.timestamp);
        const currentFormattedDate = moment(
          `${currentDate.getFullYear()}-${
            currentDate.getMonth() + 1
          }-${currentDate.getDate()}`,
          "YYYY-MM-DD"
        );
        const jalaaliDate =
          currentFormattedDate.jYear() +
          "-" +
          (currentFormattedDate.jMonth() + 1) +
          "-" +
          currentFormattedDate.jDate();
        if (transaction[TOTAL_PAYMENTS]) {
          const newRow = [
            {
              data: jalaaliDate,
              is_price: false,
            },
            {
              data: transaction[TOTAL_PAYMENTS],
              is_price: true,
            },
            {
              data: transaction[TOTAL_ORDER],
              is_price: false,
            },
            {
              data: transaction[TOTAL_PAYMENTS] / transaction[TOTAL_ORDER],
              is_price: true,
            },
          ];
          return newRow;
        } else {
          const newRow = [
            {
              data: jalaaliDate,
              is_price: false,
            },
            {
              data: "0",
              is_price: true,
            },
            {
              data: "0",
              is_price: false,
            },
            {
              data: "0",
              is_price: true,
            },
          ];
          return newRow;
        }
      });
      setRows(_rows);
    }
  }, [reportsData]);
  const totalSales = useMemo(
    () =>
      mergedMainTransactionsPerDay?.length &&
      mergedMainTransactionsPerDay
        ?.filter((_transaction) => _transaction.id)
        .reduce(
          (previousTransaction, nextTransaction) =>
            previousTransaction.id && previousTransaction !== 0
              ? previousTransaction[TOTAL_PAYMENTS]
              : previousTransaction + nextTransaction[TOTAL_PAYMENTS],
          0
        ),
    [mergedMainTransactionsPerDay]
  );

  const previousPeriodTotalSales = useMemo(
    () =>
      mergedComparedTransactionsPerDay?.length &&
      mergedComparedTransactionsPerDay
        ?.filter((transaction) => transaction.id)
        .reduce(
          (previousTransaction, nextTransaction) =>
            previousTransaction.id && previousTransaction !== 0
              ? previousTransaction[TOTAL_PAYMENTS]
              : previousTransaction + nextTransaction[TOTAL_PAYMENTS],
          0
        ),
    [mergedComparedTransactionsPerDay]
  );

  const totalOrdersCount = useMemo(
    () =>
      mergedMainTransactionsPerDay
        ?.filter((ordersPerDay) => ordersPerDay.id)
        .reduce((a, b) => a + b[TOTAL_ORDER], 0),
    [mergedMainTransactionsPerDay]
  );
  const previousPeriodTotalOrderCount = useMemo(
    () =>
      mergedComparedTransactionsPerDay
        ?.filter((ordersPerDay) => ordersPerDay.id)
        .reduce(
          (previousOrder, nextOrder) => previousOrder + nextOrder[TOTAL_ORDER],
          0
        ),
    [mergedComparedTransactionsPerDay]
  );

  const totalOrdersAverageValues = useMemo(
    () =>
      totalSales * totalOrdersCount === 0 ? 0 : totalSales / totalOrdersCount,
    [totalSales, totalOrdersCount]
  );

  const previousPeriodTotalOrdersAverageValues = useMemo(
    () =>
      previousPeriodTotalSales * previousPeriodTotalOrderCount === 0
        ? 0
        : previousPeriodTotalSales / previousPeriodTotalOrderCount,
    [previousPeriodTotalSales, previousPeriodTotalOrderCount]
  );

  const totalOrderAverageCompare =
    totalOrdersAverageValues * previousPeriodTotalOrdersAverageValues
      ? (totalOrdersAverageValues / previousPeriodTotalOrdersAverageValues) *
          100 >
        100
        ? (
            (totalOrdersAverageValues /
              previousPeriodTotalOrdersAverageValues) *
              100 -
            100
          ).toFixed(2)
        : (
            100 -
            (totalOrdersAverageValues /
              previousPeriodTotalOrdersAverageValues) *
              100
          ).toFixed(2)
      : totalOrdersAverageValues === 0 &&
        previousPeriodTotalOrdersAverageValues > 0
      ? (100 - (1 / previousPeriodTotalOrdersAverageValues) * 100).toFixed(2)
      : previousPeriodTotalOrdersAverageValues === 0 &&
        totalOrdersAverageValues > 0
      ? ((totalOrdersAverageValues / 1) * 100 - 100).toFixed(2)
      : 0;
  const totalOrderAverageCompareColor =
    totalOrdersAverageValues > previousPeriodTotalOrdersAverageValues
      ? "#42e25c"
      : "rgb(208 48 48)";

  const mainDailyOrderAverageValues = useMemo(
    () =>
      mergedMainTransactionsPerDay?.length &&
      mergedMainTransactionsPerDay?.map((transaction) => {
        if (transaction.id) {
          return Math.round(
            transaction[TOTAL_PAYMENTS] / transaction[TOTAL_ORDER]
          );
        } else return 0;
      }),
    [mergedMainTransactionsPerDay, compareToPrevious]
  );

  const comparedDailyOrderAverageValues = useMemo(
    () =>
      mergedComparedTransactionsPerDay?.length &&
      mergedComparedTransactionsPerDay?.map((transaction) => {
        if (transaction.id) {
          return Math.round(
            transaction[TOTAL_PAYMENTS] / transaction[TOTAL_ORDER]
          );
        } else return 0;
      }),
    [mergedComparedTransactionsPerDay, compareToPrevious]
  );

  const summary = useMemo(() => {
    if (reportsData?.[TRANSACTIONS_REPORT_TYPE]) {
      return [
        {
          data: totalSales,
          is_price: true,
        },
        {
          data: totalOrdersCount,
          is_price: false,
        },
        {
          data: totalOrdersAverageValues,
          is_price: true,
        },
      ];
    }
    return [];
  }, [
    reportsData?.[TRANSACTIONS_REPORT_TYPE],
    reportsData,
    mergedMainShoppingOrdersPerDay,
    mergedComparedShoppingOrdersPerDay,
  ]);

  const transactionsXAxiosLabel = useMemo(
    () =>
      mergedMainTransactionsPerDay
        ? mergedMainTransactionsPerDay?.map((transaction) => {
            const transactionDate = new Date(transaction.timestamp);
            const newDate = moment(
              `${transactionDate.getFullYear()}-${
                transactionDate.getMonth() + 1
              }-${transactionDate.getDate()}`,
              "YYYY-MM-DD"
            );
            const formattedDate =
              newDate.jYear() +
              "-" +
              (newDate.jMonth() + 1) +
              "-" +
              newDate.jDate();
            return englishNumberToPersianNumber(formattedDate);
          })
        : [],
    [mergedMainTransactionsPerDay]
  );

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#1f1f25",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  return (
    <div className="px-5 pb-5 container-fluid">
      <AdminBreadCrumb />

      <div className="d-flex flex-wrap align-items-center">
        <div className="d-flex flex-wrap align-items-center my-4">
          <div className="d-flex flex-wrap align-items-center">
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
                  compareToPrevious={compareToPrevious}
                  setCompareToPrevious={setCompareToPrevious}
                  selectedDayRange={selectedDayRange}
                  setSelectedDayRange={setSelectedDayRange}
                  submitDate={submitDate}
                />
              </div>
            </Popover>
          </div>
        </div>
        <Button
          className="mr-auto"
          size="large"
          color="primary"
          variant="contained"
          onClick={() => {
            const doc = new jsPDF({
              orientation: "portrait",
              format: "a4",
            });
            doc.html("<div style='color: red;'>سلام و علیک</div>", {
              callback: function (doc) {
                doc.save();
              },
              x: 100,
              y: 100,
              html2canvas: "html2canvas",
            });
          }}
        >
          خروجی
        </Button>
      </div>
      <div>
        <div>
          <Paper
            className="d-flex flex-column py-3 px-4 mb-4"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              minHeight: "550px !important",
            }}
          >
            {isTransactionsReportLoading && isOrdersReportLoading ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <LoadingIndicator />
              </div>
            ) : (
              <div>
                <h2 style={{ fontWeight: 700 }} className="mb-2">
                  میانگین ارزش سفارش‌ها
                </h2>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div style={{ fontSize: 20, fontWeight: 700 }}>
                    {reportsData?.[TRANSACTIONS_REPORT_TYPE] &&
                      priceFormatter(totalOrdersAverageValues)}{" "}
                    تومان
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      fontSize: 20,
                      color: totalOrderAverageCompareColor,
                    }}
                  >
                    <div>
                      % {englishNumberToPersianNumber(totalOrderAverageCompare)}{" "}
                    </div>
                    <div className="mr-2">
                      {totalOrdersAverageValues >
                      previousPeriodTotalOrdersAverageValues ? (
                        <p style={{ fontSize: 22 }}>&#8593;</p> // UpArrowIcon
                      ) : (
                        <p style={{ fontSize: 22 }}>&#8595;</p> // DownArrowIcon
                      )}
                    </div>
                  </div>
                </div>
                {reportsData?.[TRANSACTIONS_REPORT_TYPE] &&
                  reportsData?.[ORDERS_REPORT_TYPE] &&
                  transactionsXAxiosLabel.length && (
                    <Chart
                      xAxisNodeTitle="میانگین ارزش سفارش"
                      hasToCompare={compareToPrevious}
                      xAxisLabel={transactionsXAxiosLabel}
                      mainLineData={mainDailyOrderAverageValues}
                      compareLineData={comparedDailyOrderAverageValues}
                      selectedBranches
                      title="میانگین ارزش سفارش‌ها"
                    />
                  )}
              </div>
            )}
          </Paper>
        </div>
        {!isTransactionsReportLoading && !isOrdersReportLoading && (
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label="customized table">
              <TableHead style={{ backgroundColor: "#1f1f25" }}>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell key={column.id} align="center">
                      {column}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {summary ? (
                  <StyledTableRow>
                    <StyledTableCell
                      align="center"
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                      }}
                    >
                      خلاصه
                    </StyledTableCell>
                    {summary.map((summaryCell) => (
                      <StyledTableCell
                        key={summaryCell.id}
                        align="center"
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                        }}
                      >
                        {summaryCell.is_price
                          ? priceFormatter(summaryCell.data)
                          : englishNumberToPersianNumber(summaryCell.data)}{" "}
                        {summaryCell.is_price && <img alt="" src={$} />}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ) : null}
                {rows &&
                  rows.map((row) => (
                    <StyledTableRow key={row.id}>
                      {row.map((rowCell) => (
                        <StyledTableCell key={rowCell.id} align="center">
                          {rowCell.is_price
                            ? priceFormatter(rowCell.data)
                            : englishNumberToPersianNumber(rowCell.data)}{" "}
                          {rowCell.is_price && <img alt="" src={$} />}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  ))}
                {summary ? (
                  <StyledTableRow>
                    <StyledTableCell
                      align="center"
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                      }}
                    >
                      خلاصه
                    </StyledTableCell>
                    {summary.map((summaryCell) => (
                      <StyledTableCell
                        key={summaryCell.id}
                        align="center"
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                        }}
                      >
                        {summaryCell.is_price
                          ? priceFormatter(summaryCell.data)
                          : englishNumberToPersianNumber(summaryCell.data)}{" "}
                        {summaryCell.is_price && <img alt="" src={$} />}
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ) : null}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  reportsData: makeSelectReportsData(),
  reportsLoadingState: makeSelectReportsLoading(),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getReportData: (
      from,
      to,
      reportName,
      url,
      isMultiBranch = false,
      compareToPrevious
    ) =>
      dispatch(
        getReportData(
          from,
          to,
          reportName,
          url,
          isMultiBranch,
          compareToPrevious
        )
      ),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminReports);
