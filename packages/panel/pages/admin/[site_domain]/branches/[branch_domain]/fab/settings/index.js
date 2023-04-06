import AdminFabSettingsPageContainer from "containers/AdminFab";
import AdminLayout from "containers/AdminLayout";

export default function AdminFabSettingsPage() {
  return <AdminFabSettingsPageContainer />;
}
AdminFabSettingsPage.ShouldBeAdmin = true;
AdminFabSettingsPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Settings of the Call Floating button",
};
