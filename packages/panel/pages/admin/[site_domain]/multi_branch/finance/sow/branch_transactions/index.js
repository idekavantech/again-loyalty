import AdminLayout from "containers/AdminLayout";
import AdminSOWBranchTransactionsContainer from "containers/AdminFinance/SOW/BranchTransactions";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminSOWBranchTransactions() {
  return (
    <AdminSOWBranchTransactionsContainer plugin={BRANCHES_PLUGIN} isSuper />
  );
}
AdminSOWBranchTransactions.ShouldBeAdmin = true;
AdminSOWBranchTransactions.Wrapper = AdminLayout;
