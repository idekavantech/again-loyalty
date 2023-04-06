import Router from "next/router";
import { setTransaction } from "@saas/stores/transaction/actions";
import { GET_ORDER_TRANSACTION_API } from "@saas/utils/api";
import request from "@saas/utils/request";
import { useEffect } from "react";
import LoadingIndicator from "@saas/components/LoadingIndicator";
const PaymentPage = ({ shouldReload }) => {
  useEffect(() => {
    if (shouldReload) {
      setTimeout(() => location.reload(), 5000);
    }
  }, []);
  if (shouldReload) {
    return <LoadingIndicator size={30} />;
  }
  return null;
};
export default PaymentPage;
PaymentPage.NeedAuth = true;
PaymentPage.layoutConfig = { isSmall: true };
const checkPaymentStatus = async ({
  transaction_id,
  store,
  urlPrefix,
  isServer,
  res,
}) => {
  const {
    response: { data },
  } = await request(GET_ORDER_TRANSACTION_API(transaction_id));
  const transaction = data;
  store.dispatch(setTransaction(transaction));
  if (transaction) {
    if (transaction.action_status === false) {
      return {
        shouldReload: true,
      };
    } else if (transaction.status === 0) {
      if (isServer) {
        res
          .writeHead(302, {
            Location: `${urlPrefix}/payment/${transaction_id}/order/success`,
          })
          .end();
      } else {
        Router.push(`${urlPrefix}/payment/${transaction_id}/order/success`);
      }
    } else if (transaction.status !== 0) {
      if (isServer) {
        res
          .writeHead(302, {
            Location: `${urlPrefix}/payment/${transaction_id}/order/failed`,
          })
          .end();
      } else {
        Router.push(`${urlPrefix}/payment/${transaction_id}/order/failed`);
      }
    }
  }
};
PaymentPage.getInitialProps = async ({
  query,
  store,
  urlPrefix,
  isServer,
  res,
}) => {
  const transaction_id = query.t_id || null;
  return await checkPaymentStatus({
    transaction_id,
    store,
    urlPrefix,
    isServer,
    res,
  });
};
