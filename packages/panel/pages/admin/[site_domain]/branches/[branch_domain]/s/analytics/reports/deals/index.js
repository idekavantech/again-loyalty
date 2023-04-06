import AdminLayout from "containers/AdminLayout";
import AdminReportBuilder from "containers/AdminReportBuilder";
import { TOTAL_PRODUCT_SOLD } from "containers/AdminReportBuilder/constants";
import { DEALS_REPORT_TYPE } from "@saas/stores/global/constants";
import { SOLD_PRODUCT_API } from "@saas/utils/api";

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
  title: "مجموع محصولات فروخته شده",
  x_axis_node_title: "مجموع محصولات فروخته شده",
  has_branches_selector: false,
  has_export_button: true,
  has_table: false,
};
export default function AdminProductsReport() {
  return <AdminReportBuilder config={reportConfig} />;
}
AdminProductsReport.ShouldBeAdmin = true;
AdminProductsReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "گزارش مجموع محصولات فروخته شده",
};
