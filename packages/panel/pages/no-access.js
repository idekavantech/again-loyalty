import NoAccess from "containers/Pages/NoAccess";
import AdminLayout from "containers/AdminLayout";

export default function NoAccessPage() {
  return <NoAccess />;
}
NoAccessPage.layoutConfig = { isSmall: true };
NoAccessPage.ShouldBeAdmin = true;
NoAccessPage.Wrapper = AdminLayout;
