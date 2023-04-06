import AdminLayout from "containers/AdminLayout";
import AdminReportBuilder from "containers/AdminReportBuilder";
import { TOTAL_PRODUCT_SOLD } from "containers/AdminReportBuilder/constants";
import { BRANCHES_DEALS_REPORT_TYPE } from "@saas/stores/global/constants";
import { SOLD_PRODUCT_API } from "@saas/utils/api";

const reportConfig = {
  is_multibranch: true,
  has_date_picker: true,
  initial_requests: [
    {
      url: SOLD_PRODUCT_API,
      type: BRANCHES_DEALS_REPORT_TYPE,
    },
  ],
  fields_data: {
    type: BRANCHES_DEALS_REPORT_TYPE,
    name: TOTAL_PRODUCT_SOLD,
  },
  title: "The sum of the products sold",
  x_axis_node_title: "The sum of the products sold",
  has_branches_selector: true,
  has_export_button: true,
  has_table: false,
  has_csv: false,
};
export default function AdminGrossSales() {
  return <AdminReportBuilder config={reportConfig} />;
}
AdminGrossSales.ShouldBeAdmin = true;
AdminGrossSales.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Report a sum of products sold",
};
