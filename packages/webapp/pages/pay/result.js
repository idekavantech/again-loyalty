import Head from "next/head";
import OnlinePaymentResultContainer from "containers/Pages/PayContainers/OnlinePaymentResultContainer";
import { CASH_BACK_PLUGIN } from "@saas/utils/constants/plugins";

export default function Page() {
  return (
    <>
      <Head>
        <title>نتیجه پرداخت</title>
      </Head>
      <OnlinePaymentResultContainer />
    </>
  );
}
Page.onlyClientWithBusiness = true;
Page[CASH_BACK_PLUGIN] = true;
