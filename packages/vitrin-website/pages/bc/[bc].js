import Head from "next/head";
import BusinessCityPageContainer from "containers/BCPage";
import { BOTH_PAGES, bcn } from "utils/constants/PAGES";


export default function BothPage({ page }) {
  const description = page?.isShopping ? `ساخت فروشگاه اینترنتی ${page?.nameFaBusiness} در ${page?.nameFaCity} | انواع نمونه و قالب سایت فروشگاهی ${page?.nameFaBusiness} با بهترین تعرفه و قیمت طراحی فروشگاهی اینترنتی در ${page?.nameFaCity}` : `ساخت سایت ${page?.nameFaBusiness} در ${page?.nameFaCity} با بهترین تعرفه و قیمت طراحی سایت در ${page?.nameFaCity} | جدیدترین نمونه کار طراحی سایت و قالب سایت ${page?.nameFaBusiness} با ویترین`
  return page ? (
    <div>
      <Head>
        <title>{`طراحی سایت ${page?.nameFaBusiness} در ${page?.nameFaCity} | نمونه قالب قیمت | Vitrin`}</title>
        <meta
          name="description"
          content={description}
        />
        <meta
          property="og:title"
          content={`طراحی سایت ${page?.nameFaBusiness} در ${page?.nameFaCity} | نمونه قالب قیمت | Vitrin`}
        />
        <meta
          property="og:description"
          content={description}
        />
        <meta
          name="twitter:title"
          content={`طراحی سایت ${page?.nameFaBusiness} در ${page?.nameFaCity} | نمونه قالب قیمت | Vitrin`}
        />
        <meta
          property="twitter:description"
          content={description}
        />
      </Head>
      <BusinessCityPageContainer data={page} />
    </div>
  ) : (
    <span>404</span>
  );
}
export async function getStaticPaths() {
  
  return {
    paths: bcn.filter(item => item.show).map((bothItem) => {
      const path = { params: { bc: `${bothItem.english.business}~${bothItem.english.city}` } };
      return path;
    }),
    fallback: false,
  };
}
export async function getStaticProps(context) {
  const { bc } = context.params;
  const [business, city] = bc.split("~")
  
  const isCreateBusinessPage = bcn.find(item => item.english.business == business && item.english.city == city)?.show
  
  const page = isCreateBusinessPage ? { ...BOTH_PAGES[bc], nameBusiness: business, nameCity: city, name: bc } : undefined;

  return {
    props: { page },
  };
}
