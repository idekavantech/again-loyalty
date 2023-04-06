import AdminFabSettingsPageContainer from "containers/AdminFab";
import AdminLayout from "containers/AdminLayout";

import {
  INCLUDED_WEBAPPS_ONLY_KEY,
  VITRIN_WEBAPP_CONSTANT,
} from "@saas/utils/constants";

export default function AdminFabSettingsPage() {
  return <AdminFabSettingsPageContainer />;
}
AdminFabSettingsPage.ShouldBeAdmin = true;
AdminFabSettingsPage.Wrapper = AdminLayout;
AdminFabSettingsPage[INCLUDED_WEBAPPS_ONLY_KEY] = [VITRIN_WEBAPP_CONSTANT];
export const breadcrumb = {
  title: "Settings of the Call Floating button",
};
