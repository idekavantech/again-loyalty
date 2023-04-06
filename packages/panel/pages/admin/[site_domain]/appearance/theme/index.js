import AdminLayout from "containers/AdminLayout";
import AdminSettingThemePageContainer from "containers/AdminTheme";

export default function AdminSettingThemePage() {
  return <AdminSettingThemePageContainer />;
}

AdminSettingThemePage.ShouldBeAdmin = true;
AdminSettingThemePage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Edit font and color",
};
