import AdminModifierSetList from "containers/AdminShopping/containers/AdminModifierSetList";
import AdminLayout from "containers/AdminLayout";

export default function AdminModifierSetListPage() {
  return <AdminModifierSetList />;
}
AdminModifierSetListPage.ShouldBeAdmin = true;
AdminModifierSetListPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "مجموعه‌های افزودنی",
};
