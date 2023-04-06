import OnlinePaymentContainer from "containers/Pages/PayContainers/OnlinePaymentContainer";
import { CASH_BACK_PLUGIN } from "@saas/utils/constants/plugins";
import { NextSeo } from "next-seo";

export default function Page() {
  return (
    <>
      <NextSeo
        title={"پرداخت"}
        openGraph={{
          title: "پرداخت",
        }}
      />
      <OnlinePaymentContainer />
    </>
  );
}
Page.onlyClientWithBusiness = true;
Page[CASH_BACK_PLUGIN] = true;
