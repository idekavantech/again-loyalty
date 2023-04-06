import AdminLayout from "containers/AdminLayout";
import AdminSOWBranchTransactionsContainer from "containers/AdminFinance/SOW/BranchTransactions";

export default function AdminSOWBranchTransactions() {
  return <AdminSOWBranchTransactionsContainer />;
}
AdminSOWBranchTransactions.ShouldBeAdmin = true;
AdminSOWBranchTransactions.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "Branch wallet reports",
};
