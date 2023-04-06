import AdminLayout from "containers/AdminLayout";
import AdminAnalyticsCategoriesSalesReportContainer from "containers/AdminReports/containers/reports/CategoriesSalesReport";

export default function AdminAnalyticsCategoriesSalesReport() {
  return <AdminAnalyticsCategoriesSalesReportContainer />;
}
AdminAnalyticsCategoriesSalesReport.ShouldBeAdmin = true;
AdminAnalyticsCategoriesSalesReport.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Category Financial Report",
};
