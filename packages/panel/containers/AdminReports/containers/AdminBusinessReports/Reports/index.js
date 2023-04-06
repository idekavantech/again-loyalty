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
        <title>گزارش‌ها</title>
      </Head>
      <AdminBreadCrumb />
      <div className="d-flex flex-wrap mt-4">
        <div className="col-12 col-lg-6">
          <Paper className="d-flex flex-column py-3 px-4 mb-4 ">
            <h1 style={{ fontSize: 18 }} className="my-2">
              گزارش‌های جامع
            </h1>
            <div
              style={{
                fontWeight: 400,
                fontSize: 14,
                fontFamily: "IranSans",
              }}
              className="mb-5"
            >
              ارایه اطلاعات عمومی از وضعیت فروش، مقادیر فروش هر یک از کانال‌های
              فروش، ساعات شروع و پایان کار و غیره.
            </div>
            <div
              style={{
                color: "rgba(32, 34, 35, 1)",
                fontSize: 15,
                fontWeight: 600,
              }}
              className="mb-2"
            >
              گزارش‌ها
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
                  گزارش جامع عملکرد شعبه
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  target="_blank"
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/first_and_last_report`}
                >
                  گزارش اولین و آخرین خرید شعبه
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/settings/records`}
                  target="_blank"
                >
                  گزارش سوابق پیک‌ها
                </Link>
              </div>
            </div>
          </Paper>
          <Paper className="d-flex flex-column py-3 px-4 mb-4 ">
            <h1 style={{ fontSize: 18 }} className="my-2">
              گزارش‌های فروش(فاکتورها)
            </h1>
            <div
              style={{
                fontWeight: 400,
                fontSize: 14,
                fontFamily: "IranSans",
              }}
              className="mb-5"
            >
              دسترسی به اطلاعاتی چون فروش محصولات، دسته‌بندی‌ها، افزودنی‌ها و
              بررسی میزان فروش از کانال‌های فروش
            </div>
            <div
              style={{
                color: "rgba(32, 34, 35, 1)",
                fontSize: 15,
                fontWeight: 600,
              }}
              className="mb-2"
            >
              گزارش‌ها
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
                  گزارش مجموع فروش
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/deals`}
                  target="_blank"
                >
                  گزارش تعدادی فروش محصولات
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/gross_sales`}
                  target="_blank"
                >
                  گزارش سود ناخالص
                </Link>
              </div>
              {/* <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/comprehensive_sales`}
                >
                  گزارش مالی فروش شعبه براساس کانال فروش
                </Link>
              </div> */}

              {/* <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/sales_by_payment_method_and_sales_channel`}
                >
                  گزارش تعدادی فاکتور براساس روش پرداخت و کانال فروش
                </Link>
              </div> */}
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/product_sales`}
                  target="_blank"
                >
                  دریافت خروجی جزییات محصولات فروخته شده
                </Link>
              </div>
            </div>
          </Paper>
          <Paper className="d-flex flex-column py-3 px-4 mb-4">
            <h1 style={{ fontSize: 18 }} className="my-2">
              گزارش‌های تراکنش‌ها
            </h1>
            <div
              style={{
                fontWeight: 400,
                fontSize: 14,
                fontFamily: "IranSans",
              }}
              className="mb-5"
            >
              دریافت گزارش مالی شامل مالیات، پرداخت، هزینه حمل‌ و نقل و به طور
              کلی بهای تمام شده محصولات
            </div>
            <div
              style={{
                color: "rgba(32, 34, 35, 1)",
                fontSize: 15,
                fontWeight: 600,
              }}
              className="mb-2"
            >
              گزارش‌ها
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
                  گزارش مجموع هزینه ارسال های دریافتی از مشتری
                </Link>
              </div> */}
              {/* <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/taxes`}
                >
                  گزارش مالیات‌ها براساس سفارش
                </Link>
              </div> */}
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/finance_sales_by_payment_types`}
                  target="_blank"
                >
                  گزارش تراکنش‌های مالی فروش شعبه براساس روش پرداخت
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/settings/transactions`}
                  target="_blank"
                >
                  گزارش تراکنش‌ها
                </Link>
              </div>
            </div>
          </Paper>
        </div>
        <div className="col-12 col-lg-6">
          <Paper className="d-flex flex-column py-3 px-4 mb-4 ">
            <h1 style={{ fontSize: 18 }} className="my-2">
              گزارش‌های سفارش‌ها
            </h1>
            <div
              style={{
                fontWeight: 400,
                fontSize: 14,
                fontFamily: "IranSans",
              }}
              className="mb-5"
            >
              بررسی وضعیت سفارش با دریافت گزارش‌های مربوط به تعداد و ارزش
              سفارش‌ها
            </div>
            <div
              style={{
                color: "rgba(32, 34, 35, 1)",
                fontSize: 15,
                fontWeight: 600,
              }}
              className="mb-2"
            >
              گزارش‌ها
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
                  گزارش مجموع تعداد سفارش‌ها
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/aov`}
                  target="_blank"
                >
                  گزارش میانگین ارزش سفارش‌ها
                </Link>
              </div>
            </div>
          </Paper>
          <Paper className="d-flex flex-column py-3 px-4 mb-4">
            <h1 style={{ fontSize: 18 }} className="my-2">
              گزارش‌های تخفیف
            </h1>
            <div
              style={{
                fontWeight: 400,
                fontSize: 14,
                fontFamily: "IranSans",
              }}
              className="mb-5"
            >
              مشاهده اطلاعات مربوط به تخفیف، شامل میزان فروش با کد تخفیف، مقادیر
              تخفیف محصولات و ...
            </div>
            <div
              style={{
                color: "rgba(32, 34, 35, 1)",
                fontSize: 15,
                fontWeight: 600,
              }}
              className="mb-2"
            >
              گزارش‌ها
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
                  گزارش کدهای تخفیف
                </Link>
              </div>
            </div>
          </Paper>
          <Paper className="d-flex flex-column py-3 px-4 mb-4">
            <h1 style={{ fontSize: 18 }} className="my-2">
              گزارش‌های انبارگردانی
            </h1>
            <div
              style={{
                fontWeight: 400,
                fontSize: 14,
                fontFamily: "IranSans",
              }}
              className="mb-5"
            >
              گزارش‌های مربوط به عملیات‌ انبار، وضعیت موجودی و ...
            </div>
            <div
              style={{
                color: "rgba(32, 34, 35, 1)",
                fontSize: 15,
                fontWeight: 600,
              }}
              className="mb-2"
            >
              گزارش‌ها
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
                  گزارش کامل انبار مواد اولیه شعبه
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/categories_storage`}
                  target="_blank"
                >
                  گزارش انبارگردانی محصولات
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/ingredients_storage`}
                  target="_blank"
                >
                  مشاهده نتایج انبارگردانی مواد اولیه شعبه
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/products_deactivation`}
                  target="_blank"
                >
                  گزارش غیرفعال کردن محصولات
                </Link>
              </div>
            </div>
          </Paper>
          {/* <Paper className="d-flex flex-column py-3 px-4 mb-4">
            <h1 style={{ fontSize: 18 }} className="my-2">
              گزارش‌های نظرات مشتریان
            </h1>
            <div
              style={{
                fontWeight: 400,
                fontSize: 14,
                fontFamily: "IranSans",
              }}
              className="mb-5"
            >
              مشاهده نطریات مشتریان پس از ثبت سفارش، بررسی علت نارضایتی و ...
            </div>
            <div
              style={{
                color: "rgba(32, 34, 35, 1)",
                fontSize: 15,
                fontWeight: 600,
              }}
              className="mb-2"
            >
              گزارش‌ها
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
                  گزارش میزان رضایت مشتریان
                </Link>
              </div>
              <div className="d-flex justify-content-start align-items-center my-1">
                <AssessmentIcon className="ml-1" />
                <Link
                  href={`${urlPrefix}${SHOPPING_PLUGIN_URL}/analytics/reports/customers_dissatisfaction`}
                >
                  گزارش تحلیل نارضایتی مشتریان
                </Link>
              </div>
            </div>
          </Paper> */}
          {hasSOW && (
            <Paper className="d-flex flex-column py-3 px-4 mb-4">
              <h1 style={{ fontSize: 18 }} className="my-2">
                گزارش‌های کیف پول مشترک
              </h1>
              <div
                style={{
                  fontWeight: 400,
                  fontSize: 14,
                  fontFamily: "IranSans",
                }}
                className="mb-5"
              >
                مشاهده کلیه تراکنش‌های مربوط به کیف پول
              </div>
              <div
                style={{
                  color: "rgba(32, 34, 35, 1)",
                  fontSize: 15,
                  fontWeight: 600,
                }}
                className="mb-2"
              >
                گزارش‌ها
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
                    گزارش تراکنش‌های شعبه با شعبه مرکزی
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
