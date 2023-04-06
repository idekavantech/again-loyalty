import AdminFeedbackPageContainer from "containers/AdminFeedback";
import AdminLayout from "containers/AdminLayout";

export default function AdminFeedbackPage() {
  return <AdminFeedbackPageContainer />;
}
AdminFeedbackPage.ShouldBeAdmin = true;
AdminFeedbackPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "نظر مشتری",
};
