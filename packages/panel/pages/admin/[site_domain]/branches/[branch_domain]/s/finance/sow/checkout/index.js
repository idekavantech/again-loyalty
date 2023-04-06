import AdminLayout from "containers/AdminLayout";
import AdminSOWCheckoutContainer from "containers/AdminFinance/SOW/Checkout";

export default function AdminSOWCheckout() {
  return <AdminSOWCheckoutContainer />;
}
AdminSOWCheckout.ShouldBeAdmin = true;
AdminSOWCheckout.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Checkout",
};
