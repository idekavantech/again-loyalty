import Head from "next/head";
import FeaturesPage from "containers/FeaturesPage";

export default function Features() {
  return (
    <div>
      <Head>
        <title>امکانات ویترین | مزیت سایت ساز ویترین | Vitrin</title>
        <meta
          name="description"
          content="مزیت‌های کلیدی و امکانات طراحی سایت ویترین - تکنولوژی I.O.M - یکپارچگی با نرم‌افزارهای فروش - اکانت منیجر اختصاصی - سیستم فروش آنلاین و سایت ساز پیشرفته"
        />
        <meta
          property="og:title"
          content="امکانات ویترین | مزیت سایت ساز ویترین | Vitrin"
        />
        <meta
          property="og:description"
          content="مزیت‌های کلیدی و امکانات طراحی سایت ویترین - تکنولوژی I.O.M - یکپارچگی با نرم‌افزارهای فروش - اکانت منیجر اختصاصی - سیستم فروش آنلاین و سایت ساز پیشرفته"
        />
        <meta
          name="twitter:title"
          content="امکانات ویترین | مزیت سایت ساز ویترین | Vitrin"
        />
        <meta
          property="twitter:description"
          content="مزیت‌های کلیدی و امکانات طراحی سایت ویترین - تکنولوژی I.O.M - یکپارچگی با نرم‌افزارهای فروش - اکانت منیجر اختصاصی - سیستم فروش آنلاین و سایت ساز پیشرفته"
        />
      </Head>
      <FeaturesPage />
    </div>
  );
}
