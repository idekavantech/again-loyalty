import AdminLayout from "containers/AdminLayout";
import AdminSOWContainer from "containers/AdminFinance/SOW";

export default function AdminSOW() {
  return <AdminSOWContainer />;
}
AdminSOW.ShouldBeAdmin = true;
AdminSOW.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Joint wallet",
};
