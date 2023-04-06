import AdminLayout from "containers/AdminLayout";
import AdminSOWUsersTransactionsContainer from "containers/AdminFinance/SOW/UsersTransactions";

export default function AdminSOWUsersTransactions() {
  return <AdminSOWUsersTransactionsContainer />;
}
AdminSOWUsersTransactions.ShouldBeAdmin = true;
AdminSOWUsersTransactions.Wrapper = AdminLayout;
export const breadcrumb = {
  title: "User wallet reports",
};
