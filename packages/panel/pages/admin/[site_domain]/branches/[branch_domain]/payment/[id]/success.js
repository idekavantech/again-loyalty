import AdminLayout from "containers/AdminLayout";
import PaymentSuccessPageContainer from "containers/AdminPayment/components/SuccessPayment";
import Head from "next/head";
import { setTransaction } from "@saas/stores/transaction/actions";
import { GET_TRANSACTION_API } from "@saas/utils/api";
import request from "@saas/utils/request";

export default function PaymentPage() {
  return (
    <div>
      <Head>
        <title>Successful payment</title>
        <meta name="robots" content="noindex" />
      </Head>
      <PaymentSuccessPageContainer />
    </div>
  );
}
PaymentPage.NeedAuth = true;
PaymentPage.layoutConfig = { isSmall: true };
PaymentPage.getInitialProps = async ({ query, store }) => {
  let transaction = null;
  if (query.id) {
    const {
      response: { data },
    } = await request(GET_TRANSACTION_API(query.id));
    transaction = data;
    store.dispatch(setTransaction(transaction));
  }
  return {
    notFound: Boolean(!transaction),
  };
};
PaymentPage.Wrapper = AdminLayout;
