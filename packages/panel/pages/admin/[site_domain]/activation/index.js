import AdminActivation from "containers/AdminActivation";
export default function AdminActivationPage() {
  return <AdminActivation />;
}
AdminActivationPage.ShouldBeAdmin = true;

export const breadcrumb = {
  title: "Setting up",
};
