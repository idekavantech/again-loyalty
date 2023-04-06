import AdminLayout from "containers/AdminLayout";
import AdminGateWay from "containers/AdminGateAway";
export default function AdminGateAwayPage() {
  return <AdminGateWay />;
}
AdminGateAwayPage.ShouldBeAdmin = true;
AdminGateAwayPage.Wrapper = AdminLayout;

export const breadcrumb = {
  title: "Connecting the payment gateway",
};
