import AdminGrossSales from "containers/AdminReports/containers/reports/GrossSalesReport";
import AdminLayout from "containers/AdminLayout";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminGrossSalesReport() {
  return <AdminGrossSales isSuper plugin={BRANCHES_PLUGIN} />;
}
AdminGrossSalesReport.ShouldBeAdmin = true;
AdminGrossSalesReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "GDP Sale Report",
};
