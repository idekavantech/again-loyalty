import PaymentFailed from "containers/PaymentFailed";
import Head from "next/head";
export default function PaymentFailedPage() {
  return (
    <div>
      <Head>
        <title>تراکنش ناموفق</title>
        <meta name="robots" content="noindex" />
      </Head>
      <PaymentFailed />
    </div>
  );
}
PaymentFailedPage.NeedAuth = false;
