import Head from "next/head";
import AdminContainer from "../../../../containers/Pages/Admin/AdminContainer";

function AdminPage() {
  return (
    <div>
      <Head>
        <title>ادمین پنل</title>
      </Head>
      <AdminContainer />
    </div>
  );
}
AdminPage.onlyClientWithBusiness = true;

export default AdminPage;
