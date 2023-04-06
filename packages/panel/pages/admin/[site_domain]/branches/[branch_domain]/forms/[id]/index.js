import AdminEditFormContainer from "containers/AdminForms/EditForm";
import AdminLayout from "containers/AdminLayout";

export default function AdminEditFormPage() {
  return <AdminEditFormContainer />;
}

AdminEditFormPage.ShouldBeAdmin = true;
AdminEditFormPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "ویرایش فرم",
};
