import moment from "moment";
import {
  ALO_PEYK,
  FULFILLMENT_CARRY_OUT,
  FULFILLMENT_ON_BUSINESS_SITE,
  FULFILLMENT_ON_CAR,
  FULFILLMENT_ON_USER_SITE,
  FULFILLMENT_ON_WEBSITE,
  MIARE,
  NEW_ORDER_STATUS_ACCEPTED,
  NEW_ORDER_STATUS_CART,
  NEW_ORDER_STATUS_COMP,
  NEW_ORDER_STATUS_COMPLETED,
  NEW_ORDER_STATUS_COURIER_ASSIGNED,
  NEW_ORDER_STATUS_COURIER_PICKED_UP,
  NEW_ORDER_STATUS_DELIVERED,
  NEW_ORDER_STATUS_NEW,
  NEW_ORDER_STATUS_OPEN_TAB,
  NEW_ORDER_STATUS_READY_TO_DELIVER,
  NEW_ORDER_STATUS_VOID,
  PERSONAL_PEYK,
} from "@saas/plugins/Shopping/constants";
import { jungleI, oceanII, strawberryII } from "@saas/utils/colors";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";


 
 

export const IS_EDITED_ORDER_QUERY_KEY = "is_edited";
export const PAGE_QUERY_KEY = "page";
export const PAGE_SIZE_QUERY_KEY = "page_size";
export const PAYMENT_TYPE_QUERY_KEY = "payment_type";
export const PAYMENT_STATE_QUERY_KEY = "payment_status";
export const REMINDING_QUERY_KEY = "reminding";
export const DESCRIPTION_QUERY_KEY = "description";
export const SALES_CHANNEL_QUERY_KEY = "sales_channel";
export const FROM_DATE_QUERY_KEY = "from_date";
export const TO_DATE_QUERY_KEY = "to_date";
export const SEARCH_QUERY_KEY = "search";
export const BRANCH_QUERY_KEY = "branch";
export const DELIVERY_COMPANY_QUERY_KEY = "delivery_company";
export const FROM_DELIVERY_QUERY_KEY = "from_delivery_date_time";
export const TO_DELIVERY_QUERY_KEY = "to_delivery_date_time";
export const ORDERING_QUERY_KEY = "ordering";
export const ORDER_STATUS_QUERY_KEY = "status";
export const COLUMNS_QUERY_KEY = "columns";
export const START_TIME = "start_time";
export const END_TIME = "end_time";
export const DELIVERY_TYPE = "delivery_timing_id";
export const SITE_DOMAIN_QUERY_KEY = "site_domain";
export const DOMAIN_QUERY_KEY = "domain";
export const HAS_PAGINATE_QUERY_KEY = "has_paginate";
export const SUBMITTER_DEVICE = "submitter_device"

export const orderStatus = [
  // {
  //   id: 0,
  //   title: "Pending",
  //   status: NEW_ORDER_STATUS_CART,
  // },
  // {
  //   id: 1,
  //   title: "Open",
  //   status: NEW_ORDER_STATUS_OPEN_TAB,
  // },
  {
    id: 2,
    title: "Cancelled by returning to Anbar",
    status: NEW_ORDER_STATUS_VOID,
  },
  {
    id: 3,
    title: "Cancellation without returning to the warehouse",
    status: NEW_ORDER_STATUS_COMP,
  },
  {
    id: 4,
    title: "New",
    status: NEW_ORDER_STATUS_NEW,
  },
  {
    id: 5,
    title: "Accepted",
    status: NEW_ORDER_STATUS_ACCEPTED,
  },
  {
    id: 6,
    title: "Ready to send",
    status: NEW_ORDER_STATUS_READY_TO_DELIVER,
  },
  {
    id: 7,
    title: "Packaged",
    status: NEW_ORDER_STATUS_COURIER_ASSIGNED,
  },
  {
    id: 8,
    title: "Courier delivery",
    status: NEW_ORDER_STATUS_COURIER_PICKED_UP,
  },
  {
    id: 9,
    title: "Posted",
    status: NEW_ORDER_STATUS_DELIVERED,
  },
  {
    id: 10,
    title: "Completed",
    status: NEW_ORDER_STATUS_COMPLETED,
  },
];
export const paymentStatusOptions = [
  { id: 0, text: "unpaid", value: 0 },
  { id: 1, text: "incompleted", value: 1 },
  { id: 2, text: "Paid", value: 2 },
  { id: 4, text: "Canceled", value: 4 },
];

export const TIME_HEAD_CELL = "time";
export const NAME_HEAD_CELL = "name";
export const SALES_CHANNEL_HEAD_CELL = "sales_channel";
export const DESCRIPTION_HEAD_CELL = "description";
export const COMMENT_HEAD_CELL = "comment";
export const COST_HEAD_CELL = "cost";
export const PAYMENT_STATUS_HEAD_CELL = "payment_status";
export const DELIVERY_TYPE_HEAD_CELL = "delivery_type";
export const ADDRESS_HEAD_CELL = "address";
export const DELIVERY_COMPANIES_SELECTED_HEAD_CELL =
  "delivery_companies_selected";
export const DELIVERY_COMPANIES_TYPE_HEAD_CELL = "delivery_companies_type";
export const PRINT_HEAD_CELL = "print";
export const HISTORY_HEAD_CELL = "history";
export const COL_1_HEAD_CELL = "col_1";
export const COL_2_HEAD_CELL = "col_2";
export const COL_3_HEAD_CELL = "col_3";

export const headCells = [
  {
    id: TIME_HEAD_CELL,
    label: "Date of Registration",
    align: "right",
    defaultVisibility: true,
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: NAME_HEAD_CELL,
    align: "left",
    label: "Customer",
    defaultVisibility: true,
    minWidth: 50,
    width: 50,
    maxWidth: 50,
  },
  {
    id: DESCRIPTION_HEAD_CELL,
    align: "center",
    label: "Description",
    minWidth: 70,
    width: 70,
    maxWidth: 70,
    defaultVisibility: true,
  },
  {
    id: COMMENT_HEAD_CELL,
    align: "center",
    label: "Internal note",
    minWidth: 120,
    width: 130,
    maxWidth: 140,
    defaultVisibility: false,
  },
  {
    id: PAYMENT_STATUS_HEAD_CELL,
    align: "center",
    label: "payment",
    defaultVisibility: true,
    minWidth: 100,
    width: 100,
    maxWidth: 100,
  },
  {
    id: DELIVERY_TYPE_HEAD_CELL,
    align: "left",
    label: "Type and time of delivery",
    defaultVisibility: true,
    minWidth: 150,
    width: 160,
    maxWidth: 170,
  },
  {
    id: COST_HEAD_CELL,
    align: "left",
    label: "total",
    defaultVisibility: true,
    minWidth: 100,
    width: 100,
    maxWidth: 100,
  },
  {
    id: ADDRESS_HEAD_CELL,
    align: "right",
    label: "Address",
    minWidth: 250,
    width: 250,
    maxWidth: 250,
    defaultVisibility: true,
  },
  {
    id: SALES_CHANNEL_HEAD_CELL,
    align: "right",
    label: "Order channel",
    defaultVisibility: false,
    minWidth: 100,
    width: 100,
    maxWidth: 100,
  },
  {
    id: DELIVERY_COMPANIES_SELECTED_HEAD_CELL,
    align: "right",
    label: "Courier Selection",
    defaultVisibility: false,
    minWidth: 80,
    width: 80,
    maxWidth: 80,
  },
  {
    id: DELIVERY_COMPANIES_TYPE_HEAD_CELL,
    align: "right",
    label: "Selected courier",
    defaultVisibility: false,
    minWidth: 130,
    width: 130,
    maxWidth: 130,
  },
  {
    id: PRINT_HEAD_CELL,
    align: "right",
    label: "print",
    defaultVisibility: false,
    minWidth: 50,
    width: 50,
    maxWidth: 50,
  },
  {
    id: HISTORY_HEAD_CELL,
    align: "center",
    label: "History",
    minWidth: 350,
    width: 350,
    maxWidth: 350,
    defaultVisibility: false,
  },
  {
    id: COL_1_HEAD_CELL,
    align: "right",
    label: "Extra column",
    defaultVisibility: false,
    minWidth: 100,
    width: 100,
    maxWidth: 100,
  },
  {
    id: COL_2_HEAD_CELL,
    align: "right",
    label: "Extra column",
    defaultVisibility: false,
    minWidth: 100,
    width: 100,
    maxWidth: 100,
  },
  {
    id: COL_3_HEAD_CELL,
    align: "right",
    label: "Extra column",
    defaultVisibility: false,
    minWidth: 100,
    width: 100,
    maxWidth: 100,
  },
];

export const LAST_SUBMITTED_AT_ORDER = "-_submitted_at";
export const FIRST_SUBMITTED_AT_ORDER = "_submitted_at";
export const FIRST_UPDATED_AT_ORDER = "_updated_at";
export const LAST_UPDATED_AT_ORDER = "-_updated_at";

export const sortingOptions = [
  { id: 0, text: "Last registered order", keyword: LAST_SUBMITTED_AT_ORDER },
  { id: 1, text: "The first registered order", keyword: FIRST_SUBMITTED_AT_ORDER },
  { id: 2, text: "The first edited order", keyword: FIRST_UPDATED_AT_ORDER },
  { id: 3, text: "Last edited order", keyword: LAST_UPDATED_AT_ORDER },
];

export const deliverer_companies_dict = {
  alopeyk_api_token: { label: "Alopic", value: ALO_PEYK },
  miare_api_token: { label: "Come", value: MIARE },
  personal_api_token: { label: "Personal Peak", value: PERSONAL_PEYK },
};

export const deliveryTypes = {
  [FULFILLMENT_CARRY_OUT]: {
    label: "delivery",
    icon: `/images/bike.svg`,
  },
  [FULFILLMENT_ON_USER_SITE]: {
    label: "In-person delivery",
    icon: `/images/man.svg`,
  },
  [FULFILLMENT_ON_BUSINESS_SITE]: {
    label: "Cedar in place",
    icon: `/images/serve.svg`,
  },
  [FULFILLMENT_ON_CAR]: {
    label: "Delivery in the car",
    icon: `/images/man.svg`,
  },
  [FULFILLMENT_ON_WEBSITE]: {
    label: "Virtual receipt",
    icon: `/images/phonelink.svg`,
  },
};
export const orderStatuses = {
  [NEW_ORDER_STATUS_CART]: {
    label: "Pending",
    iconProgress: "0%",
    color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
    backgroundColor:
      "linear-gradient(0deg, rgba(0, 80, 255, 0.16), rgba(0, 80, 255, 0.16)), #FFFFFF",
  },
  [NEW_ORDER_STATUS_OPEN_TAB]: {
    label: "Open",
    iconProgress: "0%",
    color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
    backgroundColor:
      "linear-gradient(0deg, rgba(0, 80, 255, 0.16), rgba(0, 80, 255, 0.16)), #FFFFFF",
  },
  [NEW_ORDER_STATUS_VOID]: {
    label: "Cancelled by returning to Anbar",
    iconProgress: "50%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_COMP]: {
    label: "Cancellation without returning to the warehouse",
    iconProgress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_NEW]: {
    label: "New",
    iconProgress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_ACCEPTED]: {
    label: "Accepted",
    iconProgress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_READY_TO_DELIVER]: {
    label: "Ready to send",
    iconProgress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_COURIER_ASSIGNED]: {
    label: "Packaged",
    iconProgress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_COURIER_PICKED_UP]: {
    label: "Courier delivery",
    iconProgress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_DELIVERED]: {
    label: "Posted",
    iconProgress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  [NEW_ORDER_STATUS_COMPLETED]: {
    label: "Closed",
    iconProgress: "100%",
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
};
export const orderStatusesBorderRightColor = {
  [NEW_ORDER_STATUS_CART]: oceanII,
  [NEW_ORDER_STATUS_OPEN_TAB]: "#FFAA00",
  [NEW_ORDER_STATUS_VOID]: strawberryII,
  [NEW_ORDER_STATUS_COMP]: strawberryII,
  [NEW_ORDER_STATUS_NEW]: oceanII,
  [NEW_ORDER_STATUS_ACCEPTED]: jungleI,
  [NEW_ORDER_STATUS_READY_TO_DELIVER]: jungleI,
  [NEW_ORDER_STATUS_COURIER_ASSIGNED]: jungleI,
  [NEW_ORDER_STATUS_COURIER_PICKED_UP]: jungleI,
  [NEW_ORDER_STATUS_DELIVERED]: jungleI,
  [NEW_ORDER_STATUS_COMPLETED]: jungleI,
};
export const deliveryCompaniesType = {
  [MIARE]: { label: "Come" },
  [ALO_PEYK]: { label: "Alopic" },
  [PERSONAL_PEYK]: { label: "Personal Peak" },
};

export const customerListConstant = [
  {
    id: 1,
    label: "Customer Name",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 2,
    label: "Phone Number",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 3,
    label: "Rating",
    align: "center",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 4,
    label: "Gift Credit",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 5,
    label: "Wallet inventory",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 6,
    label: "NPS",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 7,
    label: "Labels",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 9,
    label: "Source",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 11,
    label: "First order date",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 12,
    label: "Last order date",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 13,
    label: "Number of orders",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 14,
    label: "purchase Average",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
  {
    id: 15,
    label: "Purchase sums",
    align: "right",
    minWidth: 100,
    width: 160,
    maxWidth: 170,
  },
];

export const pdf = ({ business, branches, from_date, to_date }) => {
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
            from{from_date?.format("YYYY/MM/DD")} - Up to date{" "}
            {to_date?.format("YYYY/MM/DD")}
          </div>
          <div
            style={{
              width: 300,
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            «Report»
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
      .pdf-display-none{
        display: none
      }
      .pdf-no-style{
        background: none !important;
        color: none !important;
        border: none !important;
        padding: 0px !important
      }
    `,
  };
};
