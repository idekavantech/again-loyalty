import AdminLayout from "containers/AdminLayout";
import ExpenseList from "containers/AdminExpenses/containers/expensesList";
export default function DevicesPage() {
  return <ExpenseList />;
}

DevicesPage.ShouldBeAdmin = true;
DevicesPage.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Costs",
};
