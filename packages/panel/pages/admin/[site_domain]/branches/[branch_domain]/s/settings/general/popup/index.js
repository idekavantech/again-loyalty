import AdminLayout from "containers/AdminLayout";
import AdminShoppingPopupPageContainer from "containers/AdminShopping/containers/AdminPopup";

export default function AdminShoppingPopupPage() {
  return <AdminShoppingPopupPageContainer />;
}
AdminShoppingPopupPage.ShouldBeAdmin = true;
AdminShoppingPopupPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Popper Settings",
};
