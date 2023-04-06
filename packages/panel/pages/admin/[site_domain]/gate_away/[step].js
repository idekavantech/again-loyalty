import CreateGateAway from "containers/AdminGateAway/container/AdminCreateGateAway";
import AdminLayout from "containers/AdminLayout";

export default function AdminGateAwayPage() {
  return <CreateGateAway />;
}
AdminGateAwayPage.ShouldBeAdmin = true;
AdminGateAwayPage.Wrapper = AdminLayout;

export const breadcrumb = {
  title: "اتصال درگاه پرداخت",
};
