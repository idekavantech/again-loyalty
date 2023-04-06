import AdminTopSellingContainer from "containers/AdminReports/containers/AdminBusinessReports/Reports/TopSelling";
import AdminLayout from "containers/AdminLayout";

export default function AdminTopSelling() {
  return <AdminTopSellingContainer />;
}
AdminTopSelling.ShouldBeAdmin = true;
AdminTopSelling.Wrapper = AdminLayout;

export const breadcrumb = {
  title: "Report the best -selling products",
};
