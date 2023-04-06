import AdminLayout from "containers/AdminLayout";
import AdminSOWUsersTransactionsContainer from "containers/AdminFinance/SOW/UsersTransactions";
import { BRANCHES_PLUGIN } from "@saas/utils/constants/plugins";

export default function AdminSOWUsersTransactions() {
  return (
    <AdminSOWUsersTransactionsContainer plugin={BRANCHES_PLUGIN} isSuper />
  );
}
AdminSOWUsersTransactions.ShouldBeAdmin = true;
AdminSOWUsersTransactions.Wrapper = AdminLayout;
