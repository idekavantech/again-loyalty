import React, { memo } from "react";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Link from "next/link";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import {
  BRANCHES_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";
import { makeSelectBusiness } from "@saas/stores/business/selector";

export function SalesReports({ urlPrefix, business }) {
  const hasSOW =
    business?.super_business?.plugins_config?.multi_branch?.data
      ?.has_shared_wallet;
  return (
    <div className="container">
      <Head>
        <title>reports</title>
      </Head>
      <AdminBreadCrumb />
      <div className="d-flex flex-wrap mt-4">
        <div className="col-12 col-lg-6">
          <Paper className="d-flex flex-column py-3 px-4 mb-4 ">
            <h1 style={{ fontSize: 18 }} className="my-2">
              Comprehensive reports
            </h1>
            <div
              style={{
                fontWeight: 400,
                fontSize: 14,
                fontFamily: "IranSans",
              }}
              className="mb-5"
            >
              Providing public information on sales status, selling values of each channel
              Sale, start and end hours of work etc..
            </div>
            <div
              style={{
                color: "rgba(32, 34, 35, 1)",
                fontSize: 15,
                fontWeight: 600,
              }}
              className="mb-2"
            >
              reports
            </div>
            <div
              className="d-flex flex-column"
              style={{ color: "rgb(44 110 203)", fontSize: 13 }}
            >
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/comprehensive`}
                  target="_blank"
                >
                  Comprehensive Branch Performance Report
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  target="_blank"
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/first_and_last_report`}
                >
                  Report of the first and last branch purchase
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/settings/records`}
                  target="_blank"
                >
                  Report of peak records
                </Link>
              </div>
            </div>
          </Paper>
          <Paper className="d-flex flex-column py-3 px-4 mb-4 ">
            <h1 style={{ fontSize: 18 }} className="my-2">
              Sales reports(Factors)
            </h1>
            <div
              style={{
                fontWeight: 400,
                fontSize: 14,
                fontFamily: "IranSans",
              }}
              className="mb-5"
            >
              Access to information such as selling products, categories, additives and
              Check sales from sales channels
            </div>
            <div
              style={{
                color: "rgba(32, 34, 35, 1)",
                fontSize: 15,
                fontWeight: 600,
              }}
              className="mb-2"
            >
              reports
            </div>
            <div
              className="d-flex flex-column"
              style={{ color: "rgb(44 110 203)", fontSize: 13 }}
            >
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/total_sales`}
                  target="_blank"
                >
                  Total sales report
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/deals`}
                  target="_blank"
                >
                  Report a number of sales of products
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/gross_sales`}
                  target="_blank"
                >
                  Report of gross profit
                </Link>
              </div>
              {/* <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/comprehensive_sales`}
                >
                  Financial Financial Report Branch Based on Sales Channel
                </Link>
              </div> */}

              {/* <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/sales_by_payment_method_and_sales_channel`}
                >
                  Report a number of factors based on payment method and sales channel
                </Link>
              </div> */}
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/product_sales`}
                  target="_blank"
                >
                  Receive the output of the details of the product sold
                </Link>
              </div>
            </div>
          </Paper>
          <Paper className="d-flex flex-column py-3 px-4 mb-4">
            <h1 style={{ fontSize: 18 }} className="my-2">
              Transaction reports
            </h1>
            <div
              style={{
                fontWeight: 400,
                fontSize: 14,
                fontFamily: "IranSans",
              }}
              className="mb-5"
            >
              Receive a financial report including taxes, payment, shipping costs and as
              The overall price of the products
            </div>
            <div
              style={{
                color: "rgba(32, 34, 35, 1)",
                fontSize: 15,
                fontWeight: 600,
              }}
              className="mb-2"
            >
              reports
            </div>
            <div
              className="d-flex flex-column"
              style={{ color: "rgb(44 110 203)", fontSize: 13 }}
            >
              {/* <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/shipping`}
                >
                  Report the sum of the cost of submission received from the customer
                </Link>
              </div> */}
              {/* <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/taxes`}
                >
                  Tax report based on order
                </Link>
              </div> */}
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/finance_sales_by_payment_types`}
                  target="_blank"
                >
                  Report of branch sales financial transactions based on payment method
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/settings/transactions`}
                  target="_blank"
                >
                  Transaction Report
                </Link>
              </div>
            </div>
          </Paper>
        </div>
        <div className="col-12 col-lg-6">
          <Paper className="d-flex flex-column py-3 px-4 mb-4 ">
            <h1 style={{ fontSize: 18 }} className="my-2">
              Order reports
            </h1>
            <div
              style={{
                fontWeight: 400,
                fontSize: 14,
                fontFamily: "IranSans",
              }}
              className="mb-5"
            >
              Check the status of the order by receiving reports of number and value
              Orders
            </div>
            <div
              style={{
                color: "rgba(32, 34, 35, 1)",
                fontSize: 15,
                fontWeight: 600,
              }}
              className="mb-2"
            >
              reports
            </div>
            <div
              className="d-flex flex-column"
              style={{ color: "rgb(44 110 203)", fontSize: 13 }}
            >
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/total_orders`}
                  target="_blank"
                >
                  Report the total number of orders
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/aov`}
                  target="_blank"
                >
                  Report of the average value of orders
                </Link>
              </div>
            </div>
          </Paper>
          <Paper className="d-flex flex-column py-3 px-4 mb-4">
            <h1 style={{ fontSize: 18 }} className="my-2">
              Discount reports
            </h1>
            <div
              style={{
                fontWeight: 400,
                fontSize: 14,
                fontFamily: "IranSans",
              }}
              className="mb-5"
            >
              View discount information, including sales rates with discount code, values
              Discount Products and...
            </div>
            <div
              style={{
                color: "rgba(32, 34, 35, 1)",
                fontSize: 15,
                fontWeight: 600,
              }}
              className="mb-2"
            >
              reports
            </div>
            <div
              className="d-flex flex-column"
              style={{ color: "rgb(44 110 203)", fontSize: 13 }}
            >
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/discount_code`}
                  target="_blank"
                >
                  Report discount codes
                </Link>
              </div>
            </div>
          </Paper>
          <Paper className="d-flex flex-column py-3 px-4 mb-4">
            <h1 style={{ fontSize: 18 }} className="my-2">
              Warehouse reports
            </h1>
            <div
              style={{
                fontWeight: 400,
                fontSize: 14,
                fontFamily: "IranSans",
              }}
              className="mb-5"
            >
              Reports of Warehouse Operations, Status Status and...
            </div>
            <div
              style={{
                color: "rgba(32, 34, 35, 1)",
                fontSize: 15,
                fontWeight: 600,
              }}
              className="mb-2"
            >
              reports
            </div>
            <div
              className="d-flex flex-column"
              style={{ color: "rgb(44 110 203)", fontSize: 13 }}
            >
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/inventory_history`}
                  target="_blank"
                >
                  Complete report of the warehouse of the branch raw materials
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/categories_storage`}
                  target="_blank"
                >
                  Product warehousing report
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/ingredients_storage`}
                  target="_blank"
                >
                  View the warehousing results of the branch raw materials
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/products_deactivation`}
                  target="_blank"
                >
                  Report of Disabled Products
                </Link>
              </div>
            </div>
          </Paper>
          {/* <Paper className="d-flex flex-column py-3 px-4 mb-4">
            <h1 style={{ fontSize: 18 }} className="my-2">
              Customer Comments Reports
            </h1>
            <div
              style={{
                fontWeight: 400,
                fontSize: 14,
                fontFamily: "IranSans",
              }}
              className="mb-5"
            >
              View customer tips after ordering, checking the cause of dissatisfaction and...
            </div>
            <div
              style={{
                color: "rgba(32, 34, 35, 1)",
                fontSize: 15,
                fontWeight: 600,
              }}
              className="mb-2"
            >
              reports
            </div>
            <div
              className="d-flex flex-column"
              style={{ color: "rgb(44 110 203)", fontSize: 13 }}
            >
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/customers_satisfaction`}
                >
                  Report the amount of customer satisfaction
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/customers_dissatisfaction`}
                >
                  Report of Customer Disability Analysis
                </Link>
              </div>
            </div>
          </Paper> */}
          {hasSOW && (
            <Paper className="d-flex flex-column py-3 px-4 mb-4">
              <h1 style={{ fontSize: 18 }} className="my-2">
                Joint wallet reports
              </h1>
              <div
                style={{
                  fontWeight: 400,
                  fontSize: 14,
                  fontFamily: "IranSans",
                }}
                className="mb-5"
              >
                View all wallets related transactions
              </div>
              <div
                style={{
                  color: "rgba(32, 34, 35, 1)",
                  fontSize: 15,
                  fontWeight: 600,
                }}
                className="mb-2"
              >
                reports
              </div>
              <div
                className="d-flex flex-column"
                style={{ color: "rgb(44 110 203)", fontSize: 13 }}
              >
                <div className="d-flex justify-content-start align-items-center my-1">
                  <AssessmentIcon className="ml-1" />
                  <Link
                    href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/finance/sow/branch_transactions`}
                    target="_blank"
                  >
                    Report of Branch Transactions with Central Branch
                  </Link>
                </div>
              </div>
            </Paper>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  urlPrefix: makeSelectAdminUrlPrefix(),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(SalesReports);
