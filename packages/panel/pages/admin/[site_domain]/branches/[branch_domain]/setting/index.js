import AdminLayout from "containers/AdminLayout";
import AdminSettingPageContainer from "containers/AdminSettings";

export default function AdminSettingPage() {
  return <AdminSettingPageContainer />;
}

AdminSettingPage.ShouldBeAdmin = true;
AdminSettingPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "اطلاعات اصلی",
};
