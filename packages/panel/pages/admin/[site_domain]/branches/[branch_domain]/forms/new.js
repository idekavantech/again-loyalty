import AdminFormsContainer from "containers/AdminForms/CreateForm";
import AdminLayout from "containers/AdminLayout";

export default function AdminFormsPage() {
  return <AdminFormsContainer />;
}

AdminFormsPage.ShouldBeAdmin = true;
AdminFormsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "ساخت فرم جدید",
};
