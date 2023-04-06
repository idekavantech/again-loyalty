import AdminLayout from "containers/AdminLayout";
import AdminSOWBranchTransactionsContainer from "containers/AdminFinance/SOW/AllBranchTransactions";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminSOWAllBranchTransactions() {
  return (
    <AdminSOWBranchTransactionsContainer plugin={BRANCHES_PLUGIN} isSuper />
  );
}
AdminSOWAllBranchTransactions.ShouldBeAdmin = true;
AdminSOWAllBranchTransactions.Wrapper = AdminLayout;
