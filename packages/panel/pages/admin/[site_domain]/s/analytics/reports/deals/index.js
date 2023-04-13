import AdminLayout from "containers/AdminLayout";
import AdminReportBuilder from "containers/AdminReportBuilder";
import { TOTAL_PRODUCT_SOLD } from "containers/AdminReportBuilder/constants";
import { DEALS_REPORT_TYPE } from "@saas/stores/global/constants";
import { SOLD_PRODUCT_API } from "@saas/utils/api";
import moment from "moment";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";


import {
  DATE,
  TOTOAL_SUM_INITIAL_PRICE,
  TOTOAL_COUNT_VARIATIONS_SOLD,
  TOTOAL_SUM_DISCOUNTED_PRICE,
  TOTOAL_SUM_FINAL_UNIT_COST,
  TOTOAL_SUM_MODIFIERS_SOLD,
} from "containers/AdminReportBuilder/constants";

const reportConfig = {
  is_multibranch: false,
  has_date_picker: true,
  initial_requests: [
    {
      url: SOLD_PRODUCT_API,
      type: DEALS_REPORT_TYPE,
    },
  ],
  fields_data: {
    type: DEALS_REPORT_TYPE,
    name: TOTAL_PRODUCT_SOLD,
  },
  title: "The sum of the products sold",
  x_axis_node_title: "The sum of the products sold",
  has_branches_selector: false,
  has_export_button: true,
  has_table: false,
  pdf: ({ business, branches, from_date, to_date }) => {
    const createdAtFormattedDate = moment(
      `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
      }-${new Date().getDate()}`,
      "YYYY-MM-DD"
    );
    const jalaaliDate = createdAtFormattedDate.format("YYYY/MM/DD");
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
            <div style={{ flex: 1 }}>Date Received: {jalaaliDate}</div>
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
              She. Report:{" "}
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
              from{from_date.format("YYYY/MM/DD")} - Up to date{" "}
              {to_date.format("YYYY/MM/DD")}
            </div>
            <div
              style={{
                width: 300,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              «Report of the sum of the cost of submitting branches»
            </div>
            {branches ? (
              <div
                style={{
                  flex: 1,
                  textAlign: "left",
                }}
              >
                branches: {branches.join(", ")}
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
        Page<span class="pageNumber"></span> / <span class="totalPages"></span>
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
  table_type: DEALS_REPORT_TYPE,
  columns: [
    {
      name: "Date",
      uniqe_name: DATE,
      has_to_shown: true,
      is_price: false,
    },
    {
      name: "Total initial price",
      uniqe_name: TOTOAL_SUM_INITIAL_PRICE,
      has_to_shown: true,
      is_price: false,
    },
    {
      name: "The sum of items sold",
      uniqe_name: TOTOAL_COUNT_VARIATIONS_SOLD,
      has_to_shown: false,
      is_price: true,
    },
    {
      name: "Total price after discount",
      uniqe_name: TOTOAL_SUM_DISCOUNTED_PRICE,
      has_to_shown: false,
      is_price: true,
    },
    {
      name: "The sum of the final price of the product",
      uniqe_name: TOTOAL_SUM_FINAL_UNIT_COST,
      has_to_shown: false,
      is_price: true,
    },
    {
      name: "The sum of the sale of additives",
      uniqe_name: TOTOAL_SUM_MODIFIERS_SOLD,
      has_to_shown: false,
      is_price: true,
    },
  ],
};
export default function AdminProductsReport() {
  return <AdminReportBuilder config={reportConfig} />;
}
AdminProductsReport.ShouldBeAdmin = true;
AdminProductsReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Report a sum of products sold",
};
