import AdminLayout from "containers/AdminLayout";
import AdminPagesContainer from "containers/AdminPages";

export default function AdminPages() {
  return <AdminPagesContainer />;
}
AdminPages.ShouldBeAdmin = true;
AdminPages.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "ویرایش صفحات",
};
