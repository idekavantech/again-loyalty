import AdminLayout from "containers/AdminLayout";
import Router from "next/router";
import { setTransaction } from "@saas/stores/transaction/actions";
import { GET_TRANSACTION_API } from "@saas/utils/api";
import request from "@saas/utils/request";
const PaymentPage = () => null;
export default PaymentPage;
PaymentPage.NeedAuth = true;
PaymentPage.layoutConfig = { isSmall: true };
PaymentPage.getInitialProps = async ({
  query,
  store,
  adminUrlPrefix,
  isServer,
  res,
}) => {
  const transaction_id = query.t_id || null;
  const {
    response: { data },
  } = await request(GET_TRANSACTION_API(transaction_id));
  const transaction = data;
  store.dispatch(setTransaction(transaction));
  if (transaction) {
    if (transaction.status === 0) {
      if (isServer) {
        res
          .writeHead(302, {
            Location: `${adminUrlPrefix}payment/${transaction_id}/success`,
          })
          .end();
      } else {
        Router.push(`${adminUrlPrefix}payment/${transaction_id}/success`);
      }
    } else if (transaction.status !== 0) {
      if (isServer) {
        res
          .writeHead(302, {
            Location: `${adminUrlPrefix}payment/${transaction_id}/failed`,
          })
          .end();
      } else {
        Router.push(`${adminUrlPrefix}payment/${transaction_id}/failed`);
      }
    }
  }
};
PaymentPage.Wrapper = AdminLayout;
