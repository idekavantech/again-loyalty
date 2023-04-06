import AdminLayout from "containers/AdminLayout";
import AdminPagesContainer from "containers/AdminPages";

export default function AdminPages() {
  return <AdminPagesContainer is_blog />;
}
AdminPages.ShouldBeAdmin = true;
AdminPages.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "posts",
};
