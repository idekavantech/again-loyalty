import InvoicePage from "containers/InvoicePage";
import Head from "next/head";
export default function Invoice() {
  return (
    <div>
      <Head>
        <meta name="robots" content="noindex" />
        <title>فاکتور</title>
      </Head>
      <InvoicePage />
    </div>
  );
}

Invoice.NeedAuth = true;
