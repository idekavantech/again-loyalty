import AdminFeedbacksPageContainer from "containers/AdminFeedbacks";
import AdminLayout from "containers/AdminLayout";

export default function AdminFeedbacksPage() {
  return <AdminFeedbacksPageContainer />;
}
AdminFeedbacksPage.ShouldBeAdmin = true;
AdminFeedbacksPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Customer Comments",
};
