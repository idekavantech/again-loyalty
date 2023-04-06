import AdminSalesChannelLayout from "containers/AdminSalesChannel";
import AdminLayout from "containers/AdminLayout";
import {
  INCLUDED_WEBAPPS_ONLY_KEY,
  VITRIN_WEBAPP_CONSTANT,
} from "@saas/utils/constants";

export default function SalesChannelsPage() {
  return <AdminSalesChannelLayout />;
}

SalesChannelsPage.ShouldBeAdmin = true;
SalesChannelsPage.Wrapper = AdminLayout;
SalesChannelsPage[INCLUDED_WEBAPPS_ONLY_KEY] = [VITRIN_WEBAPP_CONSTANT];
export const breadcrumb = {
  title: "Marketing and increasing visits",
};
