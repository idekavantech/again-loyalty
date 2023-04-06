import PaymentSuccessPageContainer from "containers/Pages/Payment/PaymentSuccess";
import Head from "next/head";
import Router from "next/router";
import { setTransaction } from "@saas/stores/transaction/actions";
import { GET_ORDER_TRANSACTION_API } from "@saas/utils/api";
import request from "@saas/utils/request";

export default function PaymentPage() {
  return (
    <div>
      <Head>
        <title>پرداخت موفق</title>
        <meta name="robots" content="noindex" />
      </Head>
      <PaymentSuccessPageContainer />
    </div>
  );
}
PaymentPage.NeedAuth = true;
PaymentPage.getInitialProps = async ({
  res,
  query,
  store,
  urlPrefix,
  isServer,
}) => {
  let transaction = null;
  if (query.id) {
    const {
      response: { data },
    } = await request(GET_ORDER_TRANSACTION_API(query.id));
    transaction = data;
    store.dispatch(setTransaction(transaction));
  }
  if (transaction) {
    if (transaction.status !== 0) {
      if (isServer) {
        res
          .writeHead(302, {
            Location: `${urlPrefix}/payment/${query.id}/order/failed`,
          })
          .end();
      } else {
        Router.push(`${urlPrefix}/payment/${query.id}/order/failed`);
      }
    }
  } else {
    if (isServer) {
      res
        .writeHead(302, {
          Location: `${urlPrefix}/payment/failed`,
        })
        .end();
    } else {
      Router.push(`${urlPrefix}/payment/failed`);
    }
  }
  return {
    notFound: Boolean(!transaction),
  };
};
