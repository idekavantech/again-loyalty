import Head from "next/head";
import UpgradePage from "containers/UpgradePage";
export default function Upgrade() {
  return (
    <div>
      <Head>
        <title>ارتقای سایت و فروشگاه اینترنتی | Vitrin</title>
        <meta name="robots" content="noindex" />
        <meta
          name="description"
          content="بسته‌های سایت‌ساز ویترین را بررسی کنید و با ارتقا به ‌مناسب‌ترین بسته، امکانات حرفه‌ای ویترین را برای سایت یا فروشگاه اینترنتی خود فعال کنید."
        />
        <meta
          property="og:title"
          content="ارتقای سایت و فروشگاه اینترنتی | Vitrin"
        />
        <meta
          property="og:description"
          content="بسته‌های سایت‌ساز ویترین را بررسی کنید و با ارتقا به ‌مناسب‌ترین بسته، امکانات حرفه‌ای ویترین را برای سایت یا فروشگاه اینترنتی خود فعال کنید."
        />
        <meta
          name="twitter:title"
          content="ارتقای سایت و فروشگاه اینترنتی | Vitrin"
        />
        <meta
          property="twitter:description"
          content="بسته‌های سایت‌ساز ویترین را بررسی کنید و با ارتقا به ‌مناسب‌ترین بسته، امکانات حرفه‌ای ویترین را برای سایت یا فروشگاه اینترنتی خود فعال کنید."
        />
      </Head>
      <UpgradePage />
    </div>
  );
}

Upgrade.NeedAuth = true;
