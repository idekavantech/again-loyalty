import AdminLayout from "containers/AdminLayout";
import AdminTagsContainer from "containers/AdminTags";

export default function AdminTags() {
  return <AdminTagsContainer />;
}
AdminTags.ShouldBeAdmin = true;
AdminTags.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Edit site tags",
};
