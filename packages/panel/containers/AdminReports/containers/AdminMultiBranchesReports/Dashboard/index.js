/**
 *
 * DASHBOARD REPORT
 *
 */
import React, { memo, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import jMoment from "moment";
import { makeSelectBranches } from "@saas/stores/business/selector";

import { getBusinessShoppingReportData, getReportData } from "store/actions";

import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "next/link";
import {
  makeSelectBusinessShoppingData,
  makeSelectBusinessTopSellingDeals,
  makeSelectReportsData,
} from "store/selectors";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import {
  makeSelectLoading,
  makeSelectReportsLoading,
} from "@saas/stores/global/selectors";
import {
  BRANCHES_DEALS_REPORT_TYPE,
  BRANCHES_ORDERS_REPORT_TYPE,
  BRANCHES_TRANSACTIONS_REPORT_TYPE,
} from "@saas/stores/global/constants";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { businessBranchesDataMerger } from "containers/helper";
import Chart from "../Chart";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";
import {
  MOST_SOLD_PRODUCT_API,
  NEW_SHOPPING_ORDERS,
  NEW_TRANSACTION_API,
} from "@saas/utils/api";
import Select from "@material-ui/core/Select";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import {
  TOTAL_ORDER,
  TOTAL_PAYMENTS,
} from "containers/AdminReportBuilder/constants";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import CustomCalendar from "@saas/components/CustomCalendar";
import { formatDateObjectToNormal } from "../../../../../utils/helpers";

import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import LoyaltyOutlinedIcon from "@material-ui/icons/LoyaltyOutlined";
import Card from "../../components/Card";
import { SHOPPING_DATA } from "store/constants";

 
 

export function AdminReports({
  _getReportData,
  reportsData,
  reportsLoadingState,
  branches,
  urlPrefix,
  businessShoppingData,
  isLoading,
  _getBusinessShoppingData,
  isShoppingDataLoading,
}) {
  const { minWidth1200 } = useResponsive();

  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });
  const [openModal, setOpenModal] = useState(false);

  const [selectedBranches, setSelectedBranches] = useState(
    branches.map((branche) => branche.id)
  );
  const [compareToPrevious, setCompareToPrevious] = useState(true);

  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = openModal ? "simple-popover" : undefined;

  const submitDate = () => {
    _getReportData(
      persianToEnglishNumber(
        jMoment(
          formatDateObjectToNormal(selectedDayRange.from),
          "YYYY-jM-jD"
        ).format("YYYY-M-D")
      ),
      persianToEnglishNumber(
        jMoment(
          formatDateObjectToNormal(selectedDayRange.to),
          "YYYY-jM-jD"
        ).format("YYYY-M-D")
      ),
      BRANCHES_DEALS_REPORT_TYPE,
      MOST_SOLD_PRODUCT_API,
      true,
      compareToPrevious
    );
    _getReportData(
      persianToEnglishNumber(
        jMoment(
          formatDateObjectToNormal(selectedDayRange.from),
          "YYYY-jM-jD"
        ).format("YYYY-M-D")
      ),
      persianToEnglishNumber(
        jMoment(
          formatDateObjectToNormal(selectedDayRange.to),
          "YYYY-jM-jD"
        ).format("YYYY-M-D")
      ),
      BRANCHES_TRANSACTIONS_REPORT_TYPE,
      NEW_TRANSACTION_API,
      true,
      compareToPrevious
    );
    _getReportData(
      persianToEnglishNumber(
        jMoment(
          formatDateObjectToNormal(selectedDayRange.from),
          "YYYY-jM-jD"
        ).format("YYYY-M-D")
      ),
      persianToEnglishNumber(
        jMoment(
          formatDateObjectToNormal(selectedDayRange.to),
          "YYYY-jM-jD"
        ).format("YYYY-M-D")
      ),
      BRANCHES_ORDERS_REPORT_TYPE,
      NEW_SHOPPING_ORDERS,
      true,
      compareToPrevious
    );

    handleClose();
  };
  useEffect(() => {
    setTimeout(() => {
      submitDate();
      _getBusinessShoppingData();
    }, 0);
  }, []);

  const isTransactionsReportLoading = useMemo(
    () => reportsLoadingState?.[BRANCHES_TRANSACTIONS_REPORT_TYPE],
    [reportsLoadingState]
  );
  const isDealsReportLoading = useMemo(
    () => reportsLoadingState?.[BRANCHES_DEALS_REPORT_TYPE],
    [reportsLoadingState]
  );
  const isOrdersReportLoading = useMemo(
    () => reportsLoadingState?.[BRANCHES_ORDERS_REPORT_TYPE],
    [reportsLoadingState]
  );

  const {
    currentRange: mainTransactionsData,
    previousRange: comparedTransactionsData,
  } = reportsData?.[BRANCHES_TRANSACTIONS_REPORT_TYPE] || [];
  const {
    currentRange: mainShoppingOrdersData,
    previousRange: comparedShoppingOrdersData,
  } = reportsData?.[BRANCHES_ORDERS_REPORT_TYPE] || [];
  const { currentRange: mainDealsData, previousRange: comparedDealsData } =
    reportsData?.[BRANCHES_DEALS_REPORT_TYPE] || [];
  const mergedMainTransactionsPerDay = useMemo(
    () =>
      reportsData?.[BRANCHES_TRANSACTIONS_REPORT_TYPE] &&
      mainTransactionsData &&
      businessBranchesDataMerger(mainTransactionsData, selectedBranches),
    [
      reportsData?.[BRANCHES_TRANSACTIONS_REPORT_TYPE],
      compareToPrevious,
      selectedBranches,
    ]
  );
  const mergedComparedTransactionsPerDay = useMemo(
    () =>
      reportsData?.[BRANCHES_TRANSACTIONS_REPORT_TYPE] &&
      comparedTransactionsData &&
      businessBranchesDataMerger(comparedTransactionsData, selectedBranches),
    [
      reportsData?.[BRANCHES_TRANSACTIONS_REPORT_TYPE],
      compareToPrevious,
      selectedBranches,
    ]
  );

  const mergedMainShoppingOrdersPerDay = useMemo(
    () =>
      reportsData?.[BRANCHES_ORDERS_REPORT_TYPE] &&
      mainShoppingOrdersData &&
      businessBranchesDataMerger(mainShoppingOrdersData, selectedBranches),
    [
      reportsData?.[BRANCHES_ORDERS_REPORT_TYPE],
      compareToPrevious,
      selectedBranches,
    ]
  );

  const mergedComparedShoppingOrdersPerDay = useMemo(
    () =>
      reportsData?.[BRANCHES_ORDERS_REPORT_TYPE] &&
      comparedShoppingOrdersData &&
      businessBranchesDataMerger(comparedShoppingOrdersData, selectedBranches),
    [
      reportsData?.[BRANCHES_ORDERS_REPORT_TYPE],
      compareToPrevious,
      selectedBranches,
    ]
  );

  const mergedMainDealsPerDay = useMemo(
    () =>
      reportsData?.[BRANCHES_DEALS_REPORT_TYPE] &&
      mainDealsData &&
      businessBranchesDataMerger(mainDealsData, selectedBranches),
    [
      reportsData?.[BRANCHES_DEALS_REPORT_TYPE],
      compareToPrevious,
      selectedBranches,
    ]
  );
  const mergedComparedDealsPerDay = useMemo(
    () =>
      reportsData?.[BRANCHES_DEALS_REPORT_TYPE] &&
      comparedDealsData &&
      businessBranchesDataMerger(comparedDealsData, selectedBranches),
    [
      reportsData?.[BRANCHES_DEALS_REPORT_TYPE],
      compareToPrevious,
      selectedBranches,
    ]
  );

  const dailyMainSalesData = useMemo(() => {
    return mergedMainTransactionsPerDay?.map((transaction) => {
      if (transaction.id) {
        return transaction[TOTAL_PAYMENTS];
      } else return 0;
    });
  }, [mergedMainTransactionsPerDay, compareToPrevious]);

  const dailyComparedSalesData = useMemo(() => {
    return mergedComparedTransactionsPerDay?.map((transaction) => {
      if (transaction.id) {
        return transaction[TOTAL_PAYMENTS];
      } else return 0;
    });
  }, [mergedComparedTransactionsPerDay, compareToPrevious]);

  const transactionsXAxiosLabel = useMemo(
    () =>
      mergedMainTransactionsPerDay
        ? mergedMainTransactionsPerDay.map((transaction) => {
            const transactionDate = new Date(transaction.timestamp);
            const transactionJalaaliFormat = jMoment(
              `${transactionDate.getFullYear()}-${
                transactionDate.getMonth() + 1
              }-${transactionDate.getDate()}`,
              "YYYY-MM-DD"
            );
            const formattedDate =
              transactionJalaaliFormat.year() +
              "-" +
              (transactionJalaaliFormat.month() + 1) +
              "-" +
              transactionJalaaliFormat.date();
            return englishNumberToPersianNumber(formattedDate);
          })
        : [],
    [mergedMainTransactionsPerDay]
  );

  const totalSales = useMemo(
    () =>
      mergedMainTransactionsPerDay
        ?.filter((transaction) => transaction.id)
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

  const totalSalesDiff = useMemo(
    () =>
      totalSales * previousPeriodTotalSales
        ? (totalSales / previousPeriodTotalSales) * 100 > 100
          ? ((totalSales / previousPeriodTotalSales) * 100 - 100).toFixed(2)
          : (100 - (totalSales / previousPeriodTotalSales) * 100).toFixed(2)
        : null,
    [
      reportsData[BRANCHES_TRANSACTIONS_REPORT_TYPE],
      totalSales,
      previousPeriodTotalSales,
    ]
  ); // totalSales and previousPeriodTotalSales diffrence in percent
  const totalSalesDiffColor = // COLOR OF TOTAL_SALES_DIFF
    totalSales > previousPeriodTotalSales ? "#42e25c" : "rgb(208 48 48)";

  const totalOrdersCount = useMemo(
    () =>
      mergedMainTransactionsPerDay
        ?.filter((transaction) => transaction.id)
        .reduce(
          (previousTransaction, nextTransaction) =>
            previousTransaction.id && previousTransaction !== 0
              ? previousTransaction[TOTAL_ORDER]
              : previousTransaction + nextTransaction[TOTAL_ORDER],
          0
        ),
    [mergedMainTransactionsPerDay]
  );

  const previousTotalOrderCount = useMemo(
    () =>
      mergedComparedTransactionsPerDay
        ?.filter((transaction) => transaction.id)
        .reduce(
          (previousTransaction, nextTransaction) =>
            previousTransaction.id && previousTransaction !== 0
              ? previousTransaction[TOTAL_ORDER]
              : previousTransaction + nextTransaction[TOTAL_ORDER],
          0
        ),
    [mergedComparedTransactionsPerDay]
  );
  const totalOrdersDiff = useMemo(
    () =>
      totalOrdersCount * previousTotalOrderCount
        ? (totalOrdersCount / previousTotalOrderCount) * 100 > 100
          ? ((totalOrdersCount / previousTotalOrderCount) * 100 - 100).toFixed(
              2
            )
          : (100 - (totalOrdersCount / previousTotalOrderCount) * 100).toFixed(
              2
            )
        : null,
    [
      totalOrdersCount,
      previousPeriodTotalSales,
      reportsData[BRANCHES_ORDERS_REPORT_TYPE],
    ]
  );

  const totalOrdersDiffColor =
    totalOrdersCount > previousTotalOrderCount ? "#42e25c" : "rgb(208 48 48)";

  const mainOrdersTotalCountPerDate = useMemo(
    () =>
      mergedMainShoppingOrdersPerDay?.map((order) =>
        order.total_count ? order.total_count : 0
      ),
    [, mergedMainShoppingOrdersPerDay]
  );
  const comparedOrdersTotalCountPerDate = useMemo(
    () =>
      mergedComparedShoppingOrdersPerDay?.map((order) =>
        order.total_count ? order.total_count : 0
      ),
    [, mergedComparedShoppingOrdersPerDay]
  );

  const totalOrdersAverageValues = useMemo(
    () =>
      totalSales * totalOrdersCount === 0 ? 0 : totalSales / totalOrdersCount,
    [totalSales, totalOrdersCount]
  );

  const previousPeriodTotalOrdersAverageValues = useMemo(
    () =>
      previousPeriodTotalSales * previousTotalOrderCount === 0
        ? 0
        : previousPeriodTotalSales / previousTotalOrderCount,
    [previousPeriodTotalSales, previousTotalOrderCount]
  );

  const totalOrderAverageDiff = useMemo(
    () =>
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
        : null,
    [
      totalOrdersAverageValues,
      previousPeriodTotalOrdersAverageValues,
      reportsData[BRANCHES_TRANSACTIONS_REPORT_TYPE],
    ]
  );
  const totalOrderAverageDiffColor =
    totalOrdersAverageValues > previousPeriodTotalOrdersAverageValues
      ? "#42e25c"
      : "rgb(208 48 48)";

  const mainDailyOrderAverageValues = useMemo(
    () =>
      mergedMainTransactionsPerDay?.map((transaction) => {
        if (transaction.id) {
          return Math.round(
            transaction[TOTAL_PAYMENTS] / transaction.total_num_orders
          );
        } else return 0;
      }),
    [mergedMainTransactionsPerDay]
  );

  const comparedDailyOrderAverageValues = useMemo(
    () =>
      mergedComparedTransactionsPerDay?.map((transaction) => {
        if (transaction.id) {
          return transaction[TOTAL_PAYMENTS]
            ? Math.round(
                transaction[TOTAL_PAYMENTS] / +transaction.total_num_orders
              )
            : 0;
        } else return 0;
      }),
    [mergedComparedTransactionsPerDay]
  );
  const totalDealsCount = useMemo(
    () =>
      mergedMainDealsPerDay
        ?.filter((deals) => deals.business_id)
        .map((deals) => deals.total_count_variations_sold)
        .reduce((previousDeals, nextDeals) => previousDeals + nextDeals, 0),
    [mergedMainDealsPerDay]
  );

  const previousPeriodTotalDealsCount = useMemo(
    () =>
      mergedComparedDealsPerDay
        ?.filter((deals) => deals.id)
        .map((deals) => deals.total_count_variations_sold)
        .reduce((previousDeals, nextDeals) => previousDeals + nextDeals, 0),
    [mergedComparedDealsPerDay]
  );
  const totalDealsCountDiff = useMemo(
    () =>
      totalDealsCount * previousPeriodTotalDealsCount
        ? (totalDealsCount / previousPeriodTotalDealsCount) * 100 > 100
          ? (
              (totalDealsCount / previousPeriodTotalDealsCount) * 100 -
              100
            ).toFixed(2)
          : (
              100 -
              (totalDealsCount / previousPeriodTotalDealsCount) * 100
            ).toFixed(2)
        : null,
    [
      totalDealsCount,
      previousPeriodTotalDealsCount,
      reportsData[BRANCHES_DEALS_REPORT_TYPE],
    ]
  );
  const totalDealsCountDiffColor = // COLOR OF TOTAL_SALES_DIFF
    totalDealsCount > previousPeriodTotalDealsCount
      ? "#42e25c"
      : "rgb(208 48 48)";

  const dailyMainDealsData = useMemo(() => {
    return mergedMainDealsPerDay?.map((deals) => {
      if (deals.business_id) {
        return deals.total_count_variations_sold;
      } else return 0;
    });
  }, [mergedMainDealsPerDay]);

  const dailyComparedDealsData = useMemo(() => {
    return mergedComparedDealsPerDay?.map((deals) => {
      if (deals.business_id) {
        return deals.total_count_variations_sold;
      } else return 0;
    });
  }, [mergedComparedDealsPerDay]);

  if(isLoading || isShoppingDataLoading || isShoppingDataLoading === undefined){
    return <LoadingIndicator/>
  }

  return (
    <div className="px-5 pb-5 container-fluid">
      <AdminBreadCrumb />
      <div>
        <h1
          style={{
            fontSize: 25,
          }}
        >
          Sales information today and yesterday
        </h1>
        {businessShoppingData && Array.isArray(businessShoppingData.orders_summary) &&
          <div className="container my-5 w-100 text-right">
          <div className="mx-auto row py-2 w-100 align-items-start">
            <div className=" my-2 col-sm-6 col-lg-4">
              <Card
                cardDetail={{
                  title: "Today's sale",
                  isPrice: true,
                  data: priceFormatter( businessShoppingData?.orders_summary[0]?.orders_price ?? 0),
                  icon: <MonetizationOnOutlinedIcon style={{ fontSize: 35 }} />,
                }}
                isLoading={isLoading}
              />
            </div>
            <div className=" my-2 col-sm-6 col-lg-4">
              <Card
                cardDetail={{
                  title: "The number of order today",
                  isPrice: false,
                  data: englishNumberToPersianNumber(
                    businessShoppingData?.orders_summary[0]?.orders_count ?? 0
                  ),
                  icon: <ShoppingCartOutlinedIcon style={{ fontSize: 35 }} />,
                }}
                isLoading={isLoading}
              />
            </div>
            <div className=" my-2 col-sm-6 col-lg-4">
              <Card
                cardDetail={{
                  title: "The best -selling today",
                  isPrice: false,
                  data: (
                    <p style={{ fontSize: 18, fontWeight: 900 }}>
                      {
                        businessShoppingData?.most_sold_items?.[0]
                          ?.product_title ?? "---"
                      }
                    </p>
                  ),
                  icon: <LoyaltyOutlinedIcon style={{ fontSize: 35 }} />,
                }}
                isLoading={isLoading}
              />
            </div>
          </div>
          <div className="mx-auto row py-2 w-100 align-items-start">
            <div className=" my-2 col-sm-6 col-lg-4">
              <Card
                cardDetail={{
                  title: "Yesterday's sale",
                  isPrice: true,
                  data: priceFormatter(
                    businessShoppingData?.orders_summary[1]?.orders_price ?? 0
                  ),
                  icon: <MonetizationOnOutlinedIcon style={{ fontSize: 35 }} />,
                }}
                isLoading={isLoading}
              />
            </div>
            <div className=" my-2 col-sm-6 col-lg-4">
              <Card
                cardDetail={{
                  title: "The number of order yesterday",
                  isPrice: false,
                  data: englishNumberToPersianNumber(
                    businessShoppingData?.orders_summary[1]?.orders_count ?? 0
                  ),
                  icon: <ShoppingCartOutlinedIcon style={{ fontSize: 35 }} />,
                }}
                isLoading={isLoading}
              />
            </div>
            <div className=" my-2 col-sm-6 col-lg-4">
              <Card
                cardDetail={{
                  title: "The best -selling yesterday",
                  isPrice: false,
                  data: (
                    <p style={{ fontSize: 18, fontWeight: 900 }}>
                      {
                        businessShoppingData?.most_sold_items?.[1]
                          ?.product_title ?? "---"
                      }
                    </p>
                  ),
                  icon: <LoyaltyOutlinedIcon style={{ fontSize: 35 }} />,
                }}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>}
      </div>

      <div className="d-flex flex-wrap align-items-center my-4">
        <Select
          className=" ml-2"
          style={{ minWidth: 150, height: 36 }}
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
            if (selectedBranches.length === branches.length) return "All branches";
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
            <ListItemText primary="Choosing all branches" className="text-right" />
          </MenuItem>
          {branches.map((branch) => {
            return (
              <MenuItem
                className="px-2"
                key={`${branch.id}-${selectedBranches.includes(branch.id)}`}
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
                      setSelectedBranches([...selectedBranches, branch.id]);
                    } else {
                      setSelectedBranches(
                        selectedBranches.filter((id) => id !== branch.id)
                      );
                    }
                  }}
                  color="primary"
                  checked={selectedBranches.includes(branch.id)}
                />
                <ListItemText primary={branch.title} className="text-right" />
              </MenuItem>
            );
          })}
        </Select>
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

      <div
        style={{
          display: "grid",
          gridGap: "20px",
          gridTemplateColumns: `${
            minWidth1200 ? "repeat(2, minmax(0, 1fr))" : "1fr"
          }`,
          gridTemplateRows: "auto",
          gridAutoRows: "auto",
        }}
      >
        <Paper
          className="d-flex flex-column p-4 "
          style={{
            // flex: `${minWidth768 ? "0 0 40% " : "0 0 70%"}`,
            position: "relative",
            gridRow: "span 2",
            backgroundColor: "#fff",
            color: "#fff",
            // minHeight: "550px !important",
          }}
        >
          {isTransactionsReportLoading ||
          (mergedMainTransactionsPerDay &&
            mergedMainTransactionsPerDay.length === 0) ||
          transactionsXAxiosLabel.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <LoadingIndicator />
            </div>
          ) : (
            <>
              <div
                style={{
                  position: "absolute",
                  color: "#6996f7",
                  fontSize: 13,
                  left: 15,
                }}
              >
                <Link
                  href={`${urlPrefix}${BRANCHES_PLUGIN}/analytics/reports/total_sales`}
                >
                  View Report
                </Link>
              </div>
              <div style={{ color: "#000" }}>
                <h2 style={{ fontWeight: 700 }} className="mb-2">
                  Total sales
                </h2>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div style={{ fontSize: 20, fontWeight: 700 }}>
                    {priceFormatter(totalSales)} Toman
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ fontSize: 20, color: totalSalesDiffColor }}
                  >
                    {typeof totalSalesDiff === "string" ? (
                      <div>
                        {"%" + englishNumberToPersianNumber(totalSalesDiff)}{" "}
                      </div>
                    ) : null}
                    <div className="mr-2">
                      {totalSales > previousPeriodTotalSales ? (
                        <p style={{ fontSize: 22 }}>&#8593;</p> // UpArrowIcon
                      ) : (
                        <p style={{ fontSize: 22 }}>&#8595;</p> // DownArrowIcon
                      )}
                    </div>
                  </div>
                </div>
                <Chart
                  xAxisNodeTitle="Total sales"
                  yAxisNodeTitle="Total sales"
                  hasToCompare={compareToPrevious}
                  xAxisLabel={transactionsXAxiosLabel}
                  mainLineData={dailyMainSalesData}
                  compareLineData={dailyComparedSalesData}
                  title="Total sales"
                />
              </div>
            </>
          )}
        </Paper>

        <Paper
          className="d-flex flex-column p-4 "
          style={{
            gridRow: "span 2",
            backgroundColor: "#fff",
            color: "#fff",
            position: "relative",
          }}
        >
          {isOrdersReportLoading ||
          (mergedMainShoppingOrdersPerDay &&
            mergedMainShoppingOrdersPerDay.length === 0) ||
          transactionsXAxiosLabel.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <LoadingIndicator />
            </div>
          ) : (
            <>
              <div
                style={{
                  position: "absolute",
                  color: "#6996f7",
                  fontSize: 13,
                  left: 15,
                }}
              >
                <Link
                  href={`${urlPrefix}${BRANCHES_PLUGIN}/analytics/reports/total_orders`}
                >
                  View Report
                </Link>
              </div>
              <div style={{ color: "#000" }}>
                <h2 style={{ fontWeight: 700 }} className="mb-2">
                  Total orders
                </h2>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div style={{ fontSize: 20, fontWeight: 700 }}>
                    {reportsData?.[BRANCHES_ORDERS_REPORT_TYPE] &&
                      englishNumberToPersianNumber(totalOrdersCount)}{" "}
                    Order
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ fontSize: 20, color: totalOrdersDiffColor }}
                  >
                    {typeof totalOrdersDiff === "string" ? (
                      <div>
                        % {englishNumberToPersianNumber(totalOrdersDiff)}{" "}
                      </div>
                    ) : null}
                    <div className="mr-2">
                      {totalOrdersCount > previousTotalOrderCount ? (
                        <p style={{ fontSize: 22 }}>&#8593;</p> // UpArrowIcon
                      ) : (
                        <p style={{ fontSize: 22 }}>&#8595;</p> // DownArrowIcon
                      )}
                    </div>
                  </div>
                </div>
                {selectedBranches.length &&
                mainTransactionsData?.length &&
                !isTransactionsReportLoading &&
                mergedMainTransactionsPerDay?.length ? (
                  <Chart
                    xAxisNodeTitle="The sum of the order"
                    yAxisNodeTitle="The sum of the order"
                    hasToCompare={compareToPrevious}
                    xAxisLabel={transactionsXAxiosLabel}
                    mainLineData={mainOrdersTotalCountPerDate}
                    compareLineData={comparedOrdersTotalCountPerDate}
                    selectedBranches
                    title="Total orders"
                  />
                ) : selectedBranches.length ? (
                  <div
                    style={{ fontWeight: 700, fontSize: 18 }}
                    className="mb-2 mx-auto text-bold text-center"
                  >
                    No branch is selected
                  </div>
                ) : null}
              </div>
            </>
          )}
        </Paper>

        <Paper
          className="d-flex flex-column p-4"
          style={{
            gridRow: "span 2",
            backgroundColor: "#fff",
            color: "#fff",
            minHeight: "550px !important",
            position: "relative",
          }}
        >
          {isOrdersReportLoading ||
          (mergedMainDealsPerDay && mergedMainDealsPerDay.length === 0) ||
          transactionsXAxiosLabel.length === 0 ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <LoadingIndicator />
            </div>
          ) : (
            <>
              <div
                style={{
                  position: "absolute",
                  color: "#6996f7",
                  fontSize: 13,
                  left: 15,
                }}
              >
                <Link
                  href={`${urlPrefix}${BRANCHES_PLUGIN}/analytics/reports/deals`}
                >
                  View Report
                </Link>
              </div>
              <div style={{ color: "#000" }}>
                <h2 style={{ fontWeight: 700 }} className="mb-2">
                  The sum of the products sold
                </h2>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div style={{ fontSize: 20, fontWeight: 700 }}>
                    {priceFormatter(totalDealsCount)}
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ fontSize: 20, color: totalDealsCountDiffColor }}
                  >
                    {typeof totalDealsCountDiff === "string" ? (
                      <div>
                        % {englishNumberToPersianNumber(totalDealsCountDiff)}{" "}
                      </div>
                    ) : null}
                    <div className="mr-2">
                      {totalDealsCount > previousPeriodTotalDealsCount ? (
                        <p style={{ fontSize: 22 }}>&#8593;</p> // UpArrowIcon
                      ) : (
                        <p style={{ fontSize: 22 }}>&#8595;</p> // DownArrowIcon
                      )}
                    </div>
                  </div>
                </div>
                {selectedBranches.length &&
                mainDealsData?.length &&
                !isDealsReportLoading &&
                mergedMainDealsPerDay?.length ? (
                  <Chart
                    xAxisNodeTitle="The sum of the products sold"
                    yAxisNodeTitle="The sum of the products sold"
                    hasToCompare={compareToPrevious}
                    xAxisLabel={transactionsXAxiosLabel}
                    mainLineData={dailyMainDealsData}
                    compareLineData={dailyComparedDealsData}
                    selectedBranches
                    title="The sum of the products sold"
                  />
                ) : selectedBranches.length ? (
                  <div
                    style={{ fontWeight: 700, fontSize: 18 }}
                    className="mb-2 mx-auto text-bold text-center"
                  >
                    No branch is selected
                  </div>
                ) : null}
              </div>
            </>
          )}
        </Paper>

        <Paper
          className="d-flex flex-column p-4"
          style={{
            gridRow: "span 2",
            backgroundColor: "#fff",
            color: "#fff",
            minHeight: "550px !important",
            position: "relative",
          }}
        >
          {isTransactionsReportLoading || isOrdersReportLoading ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <LoadingIndicator />
            </div>
          ) : (
            <>
              <div
                style={{
                  position: "absolute",
                  color: "#6996f7",
                  fontSize: 13,
                  left: 15,
                }}
              >
                <Link
                  href={`${urlPrefix}${BRANCHES_PLUGIN}/analytics/reports/aov`}
                >
                  View Report
                </Link>
              </div>
              <div style={{ color: "#000" }}>
                <h2 style={{ fontWeight: 700 }} className="mb-2">
                  The average value of orders
                </h2>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div style={{ fontSize: 20, fontWeight: 700 }}>
                    {reportsData?.[BRANCHES_TRANSACTIONS_REPORT_TYPE] &&
                      priceFormatter(totalOrdersAverageValues)}{" "}
                    Toman
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      fontSize: 20,
                      color: totalOrderAverageDiffColor,
                    }}
                  >
                    {typeof totalOrderAverageDiff === "string" ? (
                      <div>
                        % {englishNumberToPersianNumber(totalOrderAverageDiff)}{" "}
                      </div>
                    ) : null}
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
                {selectedBranches.length ? (
                  <Chart
                    xAxisNodeTitle="Average order value"
                    yAxisNodeTitle="Average order value"
                    hasToCompare={compareToPrevious}
                    xAxisLabel={transactionsXAxiosLabel}
                    mainLineData={mainDailyOrderAverageValues}
                    compareLineData={comparedDailyOrderAverageValues}
                    selectedBranches
                    title="The average value of orders"
                  />
                ) : (
                  <div
                    style={{ fontWeight: 700, fontSize: 18 }}
                    className="mb-2 mx-auto text-bold text-center"
                  >
                    No branch is selected
                  </div>
                )}
              </div>
            </>
          )}
        </Paper>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  reportsData: makeSelectReportsData(),
  businessTopSellingDeals: makeSelectBusinessTopSellingDeals(),
  reportsLoadingState: makeSelectReportsLoading(),
  branches: makeSelectBranches(),
  urlPrefix: makeSelectAdminUrlPrefix(),
  businessShoppingData: makeSelectBusinessShoppingData(),
  isLoading: makeSelectLoading(),
  isShoppingDataLoading : makeSelectLoading(SHOPPING_DATA)
});
function mapDispatchToProps(dispatch) {
  return {
    _getReportData: (
      from,
      to,
      reportName,
      url,
      isMultiBranch = true,
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
    _getBusinessShoppingData: () => dispatch(getBusinessShoppingReportData()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminReports);
