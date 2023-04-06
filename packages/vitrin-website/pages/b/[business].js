import Head from "next/head";
import BusinessPageContainer from "containers/BusinessPage";
import { bn, BUSINESS_PAGES } from "utils/constants/PAGES";

export default function BusinessPage({ page }) {
  const description = page?.isShopping ? `ساخت فروشگاه اینترنتی ${page?.nameFa} با انواع قالب سایت ${page?.nameFa} | بررسی نمونه سایت ${page?.nameFa} با بهترین تعرفه و قیمت طراحی سایت ${page?.nameFa}` : `ساخت سایت ${page?.nameFa} | بررسی نمونه سایت ${page?.nameFa} مختلف و انواع قالب سایت ${page?.nameFa} | بهترین تعرفه و قیمت طراحی سایت ${page?.nameFa} با ویترین`
  return page ? (
    <div>
      <Head>
        <title>{`ساخت و طراحی سایت ${page?.nameFa} | نمونه، قالب و قیمت + 15 روز رایگان | Vitrin`}</title>
        <meta
          name="description"
          content={description}
        />
        <meta
          property="og:title"
          content={`ساخت و طراحی سایت ${page?.nameFa} | نمونه، قالب و قیمت + 15 روز رایگان | Vitrin`}
        />
        <meta
          property="og:description"
          content={description}
        />
        <meta
          name="twitter:title"
          content={`ساخت و طراحی سایت ${page?.nameFa} | نمونه، قالب و قیمت + 15 روز رایگان | Vitrin`}
        />
        <meta
          property="twitter:description"
          content={description}
        />
      </Head>
      <BusinessPageContainer data={page} />
    </div>
  ) : (
    <span>404</span>
  );
}
export async function getStaticPaths() {
  return {
    paths: bn.filter(item => item.show).map((business) => {
      const path = { params: { business: business.english } };
      return path;
    }),
    fallback: false,
  };
}
export async function getStaticProps(context) {
  const { business } = context.params;
  const isCreateBusinessPage = bn.find(item => item.english == business).show
  
  const page = isCreateBusinessPage ? { ...BUSINESS_PAGES[business], name: business } : undefined;

  return {
    props: { page },
  };
}
