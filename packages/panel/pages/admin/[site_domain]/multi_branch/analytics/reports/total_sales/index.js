import AdminLayout from "containers/AdminLayout";
import AdminReportBuilder from "containers/AdminReportBuilder";
import {
  DATE,
  TOTAL_CREDIT_USED,
  TOTAL_DISCOUNT,
  TOTAL_ORDER,
  TOTAL_PAYMENTS,
  TOTAL_COUPON_DISCOUNT_AMOUNT,
  TOTAL_CUSTOM_DISCOUNT_AMOUNT,
  TOTAL_SHIPPING,
  TOTAL_TAX,
} from "containers/AdminReportBuilder/constants";
import { BRANCHES_TRANSACTIONS_REPORT_TYPE } from "@saas/stores/global/constants";
import { NEW_TRANSACTION_API } from "@saas/utils/api";

import moment from "moment-jalaali";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
moment.locale("fa");
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });
const reportConfig = {
  is_multibranch: true,
  has_date_picker: true,
  initial_requests: [
    {
      url: NEW_TRANSACTION_API,
      type: BRANCHES_TRANSACTIONS_REPORT_TYPE,
    },
  ],
  fields_data: {
    type: BRANCHES_TRANSACTIONS_REPORT_TYPE,
    name: TOTAL_PAYMENTS,
  },
  title: "مجموع فروش",
  x_axis_node_title: "مجموع فروش",
  has_branches_selector: true,
  has_export_button: true,
  has_table: true,
  table_type: BRANCHES_TRANSACTIONS_REPORT_TYPE,
  pdf: ({ business, branches, from_date, to_date }) => {
    const createdAtFormattedDate = moment(
      `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`,
      "YYYY-MM-DD"
    );
    const jalaaliDate = createdAtFormattedDate.format("jYYYY/jMM/jDD");
    return {
      headerTemplate: (
        <div
          className="d-none"
          style={{
            border: "1px solid #00000033",
            borderRadius: 8,
            color: "#202223",
            padding: 12,
            marginBottom: 8,
            marginTop: -5,
            fontSize: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "spacee-between",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1 }}>تاریخ دریافت: {jalaaliDate}</div>
            <div
              style={{
                width: 300,
                fontSize: 15,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {business.revised_title}
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "left",
              }}
            >
              ش. گزارش:{" "}
              {englishNumberToPersianNumber(
                Math.floor(100000 + Math.random() * 900000)
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "spacee-between",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <div
              style={{
                flex: 1,
              }}
            >
              از تاریخ {from_date.format("jYYYY/jMM/jDD")} - تا تاریخ{" "}
              {to_date.format("jYYYY/jMM/jDD")}
            </div>
            <div
              style={{
                width: 300,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              «گزارش مجموع فروش شعب»
            </div>
            {branches ? (
              <div
                style={{
                  flex: 1,
                  textAlign: "left",
                }}
              >
                شعبه‌ها: {branches.join(", ")}
              </div>
            ) : (
              <div
                style={{
                  flex: 1,
                  textAlign: "left",
                }}
              ></div>
            )}
          </div>
        </div>
      ),
      footerTemplate: `<footer style="width: max-content;font-size: 10px;margin:0px auto 0px; border: 0.5px solid #c4c4c4;border-radius: 4px; padding: 4px 12px;font-family: 'dana'">
        صفحه <span class="pageNumber"></span> / <span class="totalPages"></span>
        </footer>`,
      main_styles: `
      *{
        box-sizing: border-box;
      }
      thead{
        background: #333333e6;
        border-radius:8px 8px 0 0;

      }
      img{
        display:none
      }
      th{
        padding:16px 8px;
text-align: right;
        background: #333333e6;
        border: 0.5px solid #00000033;
        color: white;
        font-size:12px;
      }
      td{
        padding:4px;
        border: 0.5px solid #c4c4c4;
      }
      table{
        width: 100%;
        border-collapse: separate;
        border-spacing: 0px;
      }
      .summary{
        font-size:12px !important;
      }
      table th:first-child{
        border-radius:0 8px 0 0;
      }
      
      table th:last-child{
        border-radius:8px 0 0 0;
      }
      table tr:last-child td:first-child{
        border-radius:0 0 4px 0;
      }
      table tr:last-child td:last-child{
        border-radius:0 0 0 4px;
      }
    `,
    };
  },
  columns: [
    {
      name: "تاریخ",
      uniqe_name: DATE,
      has_to_shown: true,
      is_price: false,
    },
    {
      name: "تعداد سفارش",
      uniqe_name: TOTAL_ORDER,
      has_to_shown: true,
      is_price: false,
    },
    // {
    //   name: "فروش ناخالص",
    //   uniqe_name: TOTAL_GROSS,
    //   has_to_shown: true,
    //   is_price: true,
    // },
    {
      name: "تخفیف‌ها",
      uniqe_name: [TOTAL_DISCOUNT , TOTAL_COUPON_DISCOUNT_AMOUNT , TOTAL_CUSTOM_DISCOUNT_AMOUNT],
      has_to_shown: true,
      is_price: true,
    },
    {
      name: "استفاده از اعتبار هدیه",
      uniqe_name: TOTAL_CREDIT_USED,
      has_to_shown: true,
      is_price: true,
    },
    // {
    //   name: "فروش خالص",
    //   uniqe_name: TOTAL_NET,
    //   has_to_shown: true,
    //   is_price: true,
    // },
    {
      name: "هزینه ارسال",
      uniqe_name: TOTAL_SHIPPING,
      has_to_shown: true,
      is_price: true,
    },
    {
      name: "مالیات",
      uniqe_name: TOTAL_TAX,
      has_to_shown: true,
      is_price: true,
    },
    {
      name: "مجموع فروش",
      uniqe_name: TOTAL_PAYMENTS,
      has_to_shown: true,
      is_price: true,
    },
  ],
};
export default function AdminTotalSales() {
  return <AdminReportBuilder config={reportConfig} />;
}
AdminTotalSales.ShouldBeAdmin = true;
AdminTotalSales.Wrapper = AdminLayout;

export const breadcrumb = {
  title: "گزارش مجموع فروش",
};
