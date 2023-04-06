import FeaturesChildPage from "containers/FeaturesChildPage";
import Head from "next/head";

const featuresChild = () => {
  return (
    <div>
      <Head>
        <title>طراحی سایت بدون کدنویسی | فقط در ۵ دقیقه! | Vitrin</title>
        <meta
          name="description"
          content="ساخت سایت بدون نیاز به دانش برنامه‌نویسی، با سریع‌ترین روش ممکن! فقط کافی است به کمک سایت‌ساز ویترین و 100% بدون کدنویسی سایت خود را طراحی کنید!"
        />
        <meta
          property="og:title"
          content="طراحی سایت بدون کدنویسی | فقط در ۵ دقیقه! | Vitrin"
        />
        <meta
          property="og:description"
          content="ساخت سایت بدون نیاز به دانش برنامه‌نویسی، با سریع‌ترین روش ممکن! فقط کافی است به کمک سایت‌ساز ویترین و 100% بدون کدنویسی سایت خود را طراحی کنید!"
        />
        <meta
          name="twitter:title"
          content="طراحی سایت بدون کدنویسی | فقط در ۵ دقیقه! | Vitrin"
        />
        <meta
          property="twitter:description"
          content="ساخت سایت بدون نیاز به دانش برنامه‌نویسی، با سریع‌ترین روش ممکن! فقط کافی است به کمک سایت‌ساز ویترین و 100% بدون کدنویسی سایت خود را طراحی کنید!"
        />
      </Head>
      <FeaturesChildPage />
    </div>
  );
};

export default featuresChild;
