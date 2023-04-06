import CRMMembershipsListContainer from "containers/AdminCRM/containers/CRMMembershipsList";
import AdminLayout from "containers/AdminLayout";
export default function AdminCRMMembershipsListPage() {
  return <CRMMembershipsListContainer />;
}
AdminCRMMembershipsListPage.ShouldBeAdmin = true;
AdminCRMMembershipsListPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Club customer list",
};
