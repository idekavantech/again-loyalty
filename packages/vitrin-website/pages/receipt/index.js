import Head from "next/head";
import ReceiptPage from "containers/ReceiptPage";
export default function Receipt() {
  return (
    <div>
      <Head>
        <title>رسید پرداخت</title>
      </Head>
      <ReceiptPage />
    </div>
  );
}
