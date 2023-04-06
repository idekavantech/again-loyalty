import AdminFormResponsesContainer from "containers/AdminForms/Responses";
import AdminLayout from "containers/AdminLayout";

export default function AdminFormResponsesPage() {
  return <AdminFormResponsesContainer />;
}

AdminFormResponsesPage.ShouldBeAdmin = true;
AdminFormResponsesPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Form Answers",
};
