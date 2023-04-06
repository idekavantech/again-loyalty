import AdminLayout from "containers/AdminLayout";
import AddExpense from "containers/AdminExpenses/containers/addExpense";
export default function DevicesPage() {
  return <AddExpense />;
}

DevicesPage.ShouldBeAdmin = true;
DevicesPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Register a new fee",
};
