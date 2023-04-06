import Head from "next/head";
import ExampleBusinessesPage from "containers/ExampleBusinessesPage";

export default function Examplebusinesses() {
  return (
    <div>
      <Head>
        <title>نمونه سایت | بهترین نمونه طراحی سایت‌ با ویترین | Vitrin</title>
        <meta
          name="description"
          content="برترین نمونه کار طراحی سایت 1400 | تجربهٔ طراحی سایت و فروشگاه اینترنتی بیش از 600 کسب‌وکار مختلف با ویترین در اختیار شماست. از موفق‌ها ایده بگیرید!"
        />
        <meta
          property="og:title"
          content="نمونه سایت | بهترین نمونه طراحی سایت‌ با ویترین | Vitrin"
        />
        <meta
          property="og:description"
          content="برترین نمونه کار طراحی سایت 1400 | تجربهٔ طراحی سایت و فروشگاه اینترنتی بیش از 600 کسب‌وکار مختلف با ویترین در اختیار شماست. از موفق‌ها ایده بگیرید!"
        />
        <meta
          name="twitter:title"
          content="نمونه سایت | بهترین نمونه طراحی سایت‌ با ویترین | Vitrin"
        />
        <meta
          property="twitter:description"
          content="برترین نمونه کار طراحی سایت 1400 | تجربهٔ طراحی سایت و فروشگاه اینترنتی بیش از 600 کسب‌وکار مختلف با ویترین در اختیار شماست. از موفق‌ها ایده بگیرید!"
        />
      </Head>
      <ExampleBusinessesPage />
    </div>
  );
}
