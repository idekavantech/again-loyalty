/**
 *
 * Categories
 *
 */
import React, { memo, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import jMoment from "moment-jalaali";
import moment from "moment-jalaali";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeColor,
} from "@saas/stores/business/selector";

import {
  getBusinessShoppingReportData,
  getProductsTopSellingReport,
  getReportData,
} from "store/actions";

import Paper from "@material-ui/core/Paper";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

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
  DEALS_REPORT_TYPE,
  ORDERS_REPORT_TYPE,
  TOP_SELLING_REPORT_TYPE,
  TRANSACTIONS_REPORT_TYPE,
} from "@saas/stores/global/constants";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import Chart from "../Chart";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import {
  MOST_SOLD_PRODUCT_API,
  NEW_SHOPPING_ORDERS,
  NEW_TRANSACTION_API,
} from "@saas/utils/api";
import { businessBranchesDataMerger } from "containers/helper";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import {
  TOTAL_ORDER,
  TOTAL_PAYMENTS,
} from "containers/AdminReportBuilder/constants";

import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import CustomCalendar from "@saas/components/CustomCalendar";
import { defaultFromDate, defaultToDate } from "@saas/utils/constants/date";
import { formatDateObjectToNormal } from "../../../../../utils/helpers";
import Card from "../../components/Card";

jMoment.locale("fa");
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import LoyaltyOutlinedIcon from "@material-ui/icons/LoyaltyOutlined";
import { SHOPPING_DATA } from "store/constants";

export function AdminReports({
  _getReportData,
  _getProductsTopSellingReport,
  _getBusinessShoppingData,
  reportsData = {},
  reportsLoadingState,
  business,
  urlPrefix,
  businessShoppingData,
  isLoading,
  isShoppingDataLoading
}) {
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: defaultFromDate,
    to: defaultToDate,
  });

  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);
  const handleOpen = () => setOpenModal(true);
  const id = openModal ? "simple-popover" : undefined;

  const [compareToPrevious, setCompareToPrevious] = useState(true);
  const selectedBranches = [business.id];

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
      DEALS_REPORT_TYPE,
      MOST_SOLD_PRODUCT_API,
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
    _getProductsTopSellingReport(
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
      2
    );

    handleClose();
  };
  useEffect(() => {
    setTimeout(() => {
      submitDate();
      _getBusinessShoppingData();
    }, 0);
  }, []);
  const { minWidth768 } = useResponsive();

  const {
    currentRange: mainTransactionsData,
    previousRange: comparedTransactionsData,
  } = reportsData?.[TRANSACTIONS_REPORT_TYPE] || [];
  const { currentRange: mainShoppingOrdersData } =
    reportsData?.[ORDERS_REPORT_TYPE] || [];
  const { currentRange: mainDealsData, previousRange: comparedDealsData } =
    reportsData?.[DEALS_REPORT_TYPE] ? reportsData?.[DEALS_REPORT_TYPE] : [];
  const isTransactionsReportLoading = useMemo(
    () => reportsLoadingState?.[TRANSACTIONS_REPORT_TYPE],
    [reportsLoadingState]
  );
  const isOrdersReportLoading = useMemo(
    () => reportsLoadingState?.[ORDERS_REPORT_TYPE],
    [reportsLoadingState]
  );
  const isDealsReportLoading = useMemo(
    () => reportsLoadingState?.[DEALS_REPORT_TYPE],
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

  const mergedMainDealsPerDay = useMemo(
    () =>
      reportsData?.[DEALS_REPORT_TYPE] &&
      mainDealsData &&
      businessBranchesDataMerger(mainDealsData, selectedBranches),
    [reportsData?.[DEALS_REPORT_TYPE], compareToPrevious, selectedBranches]
  );
  const mergedComparedDealsPerDay = useMemo(
    () =>
      reportsData?.[DEALS_REPORT_TYPE] &&
      comparedDealsData &&
      businessBranchesDataMerger(comparedDealsData, selectedBranches),
    [reportsData?.[DEALS_REPORT_TYPE], compareToPrevious, selectedBranches]
  );

  const totalSales = useMemo(
    () =>
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
      reportsData[TRANSACTIONS_REPORT_TYPE],
      totalSales,
      previousPeriodTotalSales,
    ]
  ); // totalSales and previousPeriodTotalSales diffrence in percent
  const totalSalesDiffColor = // COLOR OF TOTAL_SALES_DIFF
    totalSales > previousPeriodTotalSales ? "#42e25c" : "rgb(208 48 48)";

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
            const transactionJalaaliFormat = moment(
              `${transactionDate.getFullYear()}-${
                transactionDate.getMonth() + 1
              }-${transactionDate.getDate()}`,
              "YYYY-MM-DD"
            );
            const formattedDate =
              transactionJalaaliFormat.jYear() +
              "-" +
              (transactionJalaaliFormat.jMonth() + 1) +
              "-" +
              transactionJalaaliFormat.jDate();
            return englishNumberToPersianNumber(formattedDate);
          })
        : [],
    [mergedMainTransactionsPerDay]
  );
  const totalOrdersCount = useMemo(
    () =>
      mergedMainTransactionsPerDay
        ?.filter((ordersPerDay) => ordersPerDay.id)
        .map((order) => order[TOTAL_ORDER])
        .reduce((previousOrder, nextOrder) => previousOrder + nextOrder, 0),
    [mergedMainTransactionsPerDay]
  );

  const previousPeriodTotalOrderCount = useMemo(
    () =>
      mergedComparedTransactionsPerDay
        ?.filter((ordersPerDay) => ordersPerDay.id)
        .map((order) => order[TOTAL_ORDER])
        .reduce((previousOrder, nextOrder) => previousOrder + nextOrder, 0),
    [mergedComparedTransactionsPerDay]
  );

  const totalOrdersDiff = useMemo(
    () =>
      totalOrdersCount * previousPeriodTotalOrderCount
        ? (totalOrdersCount / previousPeriodTotalOrderCount) * 100 > 100
          ? (
              (totalOrdersCount / previousPeriodTotalOrderCount) * 100 -
              100
            ).toFixed(2)
          : (
              100 -
              (totalOrdersCount / previousPeriodTotalOrderCount) * 100
            ).toFixed(2)
        : null,
    [
      totalOrdersCount,
      previousPeriodTotalSales,
      reportsData[ORDERS_REPORT_TYPE],
    ]
  );

  const totalOrdersDiffColor =
    totalOrdersCount > previousPeriodTotalOrderCount
      ? "#42e25c"
      : "rgb(208 48 48)";

  const mainOrdersTotalCountPerDate = useMemo(
    () =>
      mergedMainTransactionsPerDay?.map((order) =>
        order[TOTAL_ORDER] ? order[TOTAL_ORDER] : 0
      ),
    [mergedMainTransactionsPerDay, compareToPrevious]
  );
  const comparedOrdersTotalCountPerDate = useMemo(
    () =>
      mergedComparedTransactionsPerDay?.map((order) =>
        order[TOTAL_ORDER] ? order[TOTAL_ORDER] : 0
      ),
    [mergedComparedTransactionsPerDay, compareToPrevious]
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
      reportsData[TRANSACTIONS_REPORT_TYPE],
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
    [mergedMainTransactionsPerDay, compareToPrevious]
  );

  const comparedDailyOrderAverageValues = useMemo(
    () =>
      mergedComparedTransactionsPerDay?.map((transaction) => {
        if (transaction.id) {
          return Math.round(
            transaction[TOTAL_PAYMENTS] / transaction.total_num_orders
          );
        } else return 0;
      }),
    [mergedComparedTransactionsPerDay, compareToPrevious]
  );
  const totalDealsCount = useMemo(
    () =>
      mergedMainDealsPerDay
        ?.filter((deals) => deals.business_id)
        .reduce(
          (previousDeals, nextDeals) =>
            previousDeals.total_count_variations_sold && previousDeals !== 0
              ? previousDeals.total_count_variations_sold
              : previousDeals + nextDeals.total_count_variations_sold,
          0
        ),
    [mergedMainDealsPerDay]
  );
  const previousPeriodTotalDealsCount = useMemo(
    () =>
      mergedComparedDealsPerDay
        ?.filter((deals) => deals.business_id)
        .reduce(
          (previousDeals, nextDeals) =>
            previousDeals.total_count_variations_sold && previousDeals !== 0
              ? previousDeals.total_count_variations_sold
              : previousDeals + nextDeals.total_count_variations_sold,
          0
        ),
    [comparedDealsData]
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
      reportsData[DEALS_REPORT_TYPE],
    ]
  ); // TOTALDEALS and previousPeriodDEALS diffrence in percent
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
  }, [mergedMainDealsPerDay, compareToPrevious]);

  const dailyComparedDealsData = useMemo(() => {
    return mergedComparedDealsPerDay?.map((deals) => {
      if (deals.business_id) {
        return deals.total_count_variations_sold;
      } else return 0;
    });
  }, [mergedComparedDealsPerDay, compareToPrevious]);

  if(isLoading || isShoppingDataLoading || isShoppingDataLoading === undefined){
    return <LoadingIndicator/>
  }


  const yesterdayDate = moment().subtract(1, "day");

  const todayMostSoldItemsSummary =
    businessShoppingData?.most_sold_items?.find((sumItem) =>
      moment().isSame(sumItem.date, "day")
    ) || {};
  const todayOrderSummary =
    businessShoppingData?.orders_summary?.find((sumItem) =>
      moment().isSame(sumItem._id, "day")
    ) || {};

  const yesterdayMostSoldItemsSummary =
    businessShoppingData?.most_sold_items?.find((sumItem) =>
      yesterdayDate.isSame(sumItem.date, "day")
    ) || {};
  const yesterdayOrderSummary =
    businessShoppingData?.orders_summary?.find((sumItem) =>
      yesterdayDate.isSame(sumItem._id, "day")
    ) || {};

  return (
    <div className="px-5 pb-5 container-fluid">
      <AdminBreadCrumb />

      <div>
        <h1
          style={{
            fontSize: 25,
          }}
        >
          اطلاعات فروش امروز و دیروز
        </h1>
         
        <div className="container my-5 w-100 text-right">
          <div className="row py-2 w-100 align-items-start">
            <div className=" my-2 col-sm-6 col-lg-4">
              <Card
                cardDetail={{
                  title: "فروش امروز",
                  isPrice: true,
                  data: priceFormatter(
                    todayOrderSummary?.orders_price ?? 0
                  ),
                  icon: <MonetizationOnOutlinedIcon style={{ fontSize: 35 }} />,
                }}
                isLoading={isLoading}
              />
            </div>
            <div className=" my-2 col-sm-6 col-lg-4">
              <Card
                cardDetail={{
                  title: "تعداد سفارش امروز",
                  isPrice: false,
                  data: englishNumberToPersianNumber(
                    todayOrderSummary?.orders_count ?? 0
                  ),
                  icon: <ShoppingCartOutlinedIcon style={{ fontSize: 35 }} />,
                }}
                isLoading={isLoading}
              />
            </div>
            <div className=" my-2 col-sm-6 col-lg-4">
              <Card
                cardDetail={{
                  title: "پرفروش‌ترینِ امروز",
                  isPrice: false,
                  data: (
                    <p style={{ fontSize: 18, fontWeight: 900 }}>
                      {
                        todayMostSoldItemsSummary?.product_title ?? "---"
                      }
                    </p>
                  ),
                  icon: <LoyaltyOutlinedIcon style={{ fontSize: 35 }} />,
                }}
                isLoading={isLoading}
              />
            </div>
          </div>
          <div className="row py-2 w-100 align-items-start">
            <div className=" my-2 col-sm-6 col-lg-4">
              <Card
                cardDetail={{
                  title: "فروش دیروز",
                  isPrice: true,
                  data: priceFormatter(
                    yesterdayOrderSummary?.orders_price ?? 0
                  ),
                  icon: <MonetizationOnOutlinedIcon style={{ fontSize: 35 }} />,
                }}
                isLoading={isLoading}
              />
            </div>
            <div className=" my-2 col-sm-6 col-lg-4">
              <Card
                cardDetail={{
                  title: "تعداد سفارش دیروز",
                  isPrice: false,
                  data: englishNumberToPersianNumber(
                    yesterdayOrderSummary?.orders_count ?? 0
                  ),
                  icon: <ShoppingCartOutlinedIcon style={{ fontSize: 35 }} />,
                }}
                isLoading={isLoading}
              />
            </div>
            <div className=" my-2 col-sm-6 col-lg-4">
              <Card
                cardDetail={{
                  title: "پرفروش‌ترینِ دیروز",
                  isPrice: false,
                  data: (
                    <p style={{ fontSize: 18, fontWeight: 900 }}>
                      {
                        yesterdayMostSoldItemsSummary?.product_title ?? "---"
                      }
                    </p>
                  ),
                  icon: <LoyaltyOutlinedIcon style={{ fontSize: 35 }} />,
                }}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap align-items-center ">
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
                setSelectedDayRange={setSelectedDayRange}
                selectedDayRange={selectedDayRange}
                submitDate={submitDate}
                compareToPrevious={compareToPrevious}
                setCompareToPrevious={setCompareToPrevious}
              />
            </div>
          </Popover>
        </div>
      </div>

      <div
        // className="mt-4 d-flex justify-content-center align-items-center flex-wrap"
        style={{
          display: "grid",
          gridGap: "20px",
          gridTemplateColumns: `${
            minWidth768 ? "repeat(2, minmax(0, 1fr))" : "1fr"
          }`,
          gridTemplateRows: "auto",
          gridAutoRows: "250px",
        }}
      >
        <Paper
          className="d-flex flex-column p-4 "
          style={{
            position: "relative",
            gridRow: "span 2",
            backgroundColor: "#fff",
            color: "#000",
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
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/total_sales`}
                >
                  مشاهده گزارش
                </Link>
              </div>
              <div>
                <h2 style={{ fontWeight: 700 }} className="mb-2">
                  مجموع فروش
                </h2>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div style={{ fontSize: 20, fontWeight: 700 }}>
                    {priceFormatter(totalSales)} تومان
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
                  xAxisNodeTitle="مجموع فروش"
                  yAxisNodeTitle="مجموع فروش"
                  hasToCompare={compareToPrevious}
                  xAxisLabel={transactionsXAxiosLabel}
                  mainLineData={dailyMainSalesData}
                  compareLineData={dailyComparedSalesData}
                  title="مجموع فروش‌ها"
                />
              </div>
            </>
          )}
        </Paper>

        <Paper
          className="d-flex flex-column p-4 "
          style={{
            gridRow: "span 2",
            position: "relative",
            backgroundColor: "#fff",
            color: "#000",
          }}
        >
          {isOrdersReportLoading ||
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
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/total_orders`}
                >
                  مشاهده گزارش
                </Link>
              </div>
              <div>
                <h2 style={{ fontWeight: 700 }} className="mb-2">
                  مجموع سفارش‌ها
                </h2>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div style={{ fontSize: 20, fontWeight: 700 }}>
                    {reportsData[ORDERS_REPORT_TYPE] &&
                      englishNumberToPersianNumber(totalOrdersCount)}{" "}
                    سفارش
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
                      {totalOrdersCount > previousPeriodTotalOrderCount ? (
                        <p style={{ fontSize: 22 }}>&#8593;</p> // UpArrowIcon
                      ) : (
                        <p style={{ fontSize: 22 }}>&#8595;</p> // DownArrowIcon
                      )}
                    </div>
                  </div>
                </div>
                {mainShoppingOrdersData?.length &&
                  !isOrdersReportLoading &&
                  !isTransactionsReportLoading &&
                  mergedMainShoppingOrdersPerDay?.length && (
                    <Chart
                      className="w-100"
                      xAxisNodeTitle="مجموع سفارش"
                      yAxisNodeTitle="مجموع سفارش"
                      hasToCompare={compareToPrevious}
                      xAxisLabel={transactionsXAxiosLabel}
                      mainLineData={mainOrdersTotalCountPerDate}
                      compareLineData={comparedOrdersTotalCountPerDate}
                      title="مجموع سفارش‌ها"
                    />
                  )}
              </div>
            </>
          )}
        </Paper>

        <Paper
          className="d-flex flex-column p-4"
          style={{
            // flex: `${minWidth768 ? "0 0 40% " : "0 0 70%"}`,
            position: "relative",
            gridRow: "span 2",
            backgroundColor: "#fff",
            color: "#000",
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
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/aov`}
                >
                  مشاهده گزارش
                </Link>
              </div>
              <div>
                <h2 style={{ fontWeight: 700 }} className="mb-2">
                  میانگین ارزش سفارش‌ها
                </h2>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <div style={{ fontSize: 20, fontWeight: 700 }}>
                    {reportsData[TRANSACTIONS_REPORT_TYPE] &&
                      priceFormatter(totalOrdersAverageValues)}{" "}
                    تومان
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
                <Chart
                  xAxisNodeTitle="میانگین ارزش سفارش"
                  yAxisNodeTitle="میانگین ارزش سفارش"
                  hasToCompare={compareToPrevious}
                  xAxisLabel={transactionsXAxiosLabel}
                  mainLineData={mainDailyOrderAverageValues}
                  compareLineData={comparedDailyOrderAverageValues}
                  title="میانگین ارزش سفارش‌ها"
                />
              </div>
            </>
          )}
        </Paper>

        {/* <Paper
          className="d-flex flex-column p-4"
          style={{
            // flex: `${minWidth768 ? "0 0 40% " : "0 0 70%"}`,
            position: "relative",
            gridRow: "span 1",
            backgroundColor: "#1f1f25",
            color: "#fff",
          }}
        >
          {isTopSellingReportLoading ? (
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
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/top_selling`}
                >
                  مشاهده گزارش
                </Link>
              </div>
              <div>
                <h2 style={{ fontWeight: 700 }} className="mb-2">
                  بهترین محصولات از نظر تعداد فروش
                </h2>
                {topSellingProducts &&
                topSellingProducts.data &&
                topSellingProducts.data.length > 0 ? (
                  topSellingProducts.data.map((deal) => (
                    <div
                      className="my-2 d-flex justify-content-between align-items-center mt-4 mb-2"
                      key={deal}
                    >
                      <div
                        className="w-50"
                        style={{ fontSize: 14, fontWeight: 400 }}
                      >
                        {deal && deal?.deal_title?.length > 25
                          ? deal.deal_title.slice(0, 25) + " ..."
                          : deal.deal_title}
                      </div>
                      <div>
                        {priceFormatter(deal.sum_discounted_price)}{" "}
                        <Icon
                          icon={$}
                          width={21}
                          height={21}
                          color={white}
                        />
                      </div>
                      <div style={{ fontSize: 15 }}>
                        {priceFormatter(deal.count_deal_sold)} عدد{" "}
                      </div>
                    </div>
                  ))
                ) : (
                  <div>در این بازه‌ی زمانی محصولی وجود ندارد</div>
                )}
              </div>
            </>
          )}
        </Paper> */}
        <Paper
          className="d-flex flex-column p-4 "
          style={{
            gridRow: "span 2",
            position: "relative",
            backgroundColor: "#fff",
            color: "#000",
          }}
        >
          {isDealsReportLoading ||
          (mainDealsData && mainDealsData.length === 0) ||
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
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/deals`}
                >
                  مشاهده گزارش
                </Link>
              </div>
              <div>
                <h2 style={{ fontWeight: 700 }} className="mb-2">
                  مجموع محصولات فروخته شده
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
                {mainDealsData?.length &&
                  !isDealsReportLoading &&
                  mergedMainDealsPerDay?.length && (
                    <Chart
                      xAxisNodeTitle="مجموع محصولات فروخته شده"
                      yAxisNodeTitle="مجموع محصولات فروخته شده"
                      hasToCompare={compareToPrevious}
                      xAxisLabel={transactionsXAxiosLabel}
                      mainLineData={dailyMainDealsData}
                      compareLineData={dailyComparedDealsData}
                      title="مجموع محصولات فروخته شده"
                    />
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
  themeColor: makeSelectBusinessThemeColor(),
  reportsData: makeSelectReportsData(),
  topSellingProducts: makeSelectBusinessTopSellingDeals(),
  reportsLoadingState: makeSelectReportsLoading(),
  isTopSellingReportLoading: makeSelectLoading(TOP_SELLING_REPORT_TYPE),
  urlPrefix: makeSelectAdminUrlPrefix(),
  business: makeSelectBusiness(),
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
    _getProductsTopSellingReport: (from, to, count) =>
      dispatch(getProductsTopSellingReport(from, to, count)),
    _getBusinessShoppingData: () => dispatch(getBusinessShoppingReportData()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminReports);
