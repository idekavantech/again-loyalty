import Head from "next/head";
import CityPageContainer from "containers/CityPage";
import { cn, CITY_PAGES } from "utils/constants/PAGES";

export default function CityPage({ page }) {
  return page ? (
    <div>
      <Head>
        <title>{`طراحی سایت و فروشگاه اینترنتی در ${page.nameFa} | نمونه قالب قیمت | Vitrin`}</title>
        <meta
          name="description"
          content={`تعرفه طراحی سایت در ${page.nameFa} توسط معتبرترین شرکت طراحی سایت در ${page.nameFa} | جدیدترین قالب فروشگاهی و نمونه سایت در ${page.nameFa} | مشاوره و پشتیبانی طراحی سایت در ${page.nameFa}`}
        />
        <meta
          property="og:title"
          content={`طراحی سایت و فروشگاه اینترنتی در ${page.nameFa} | نمونه قالب قیمت | Vitrin`}
        />
        <meta
          property="og:description"
          content={`تعرفه طراحی سایت در ${page.nameFa} توسط معتبرترین شرکت طراحی سایت در ${page.nameFa} | جدیدترین قالب فروشگاهی و نمونه سایت در ${page.nameFa} | مشاوره و پشتیبانی طراحی سایت در ${page.nameFa}`}
        />
        <meta
          name="twitter:title"
          content={`طراحی سایت و فروشگاه اینترنتی در ${page.nameFa} | نمونه قالب قیمت | Vitrin`}
        />
        <meta
          property="twitter:description"
          content={`تعرفه طراحی سایت در ${page.nameFa} توسط معتبرترین شرکت طراحی سایت در ${page.nameFa} | جدیدترین قالب فروشگاهی و نمونه سایت در ${page.nameFa} | مشاوره و پشتیبانی طراحی سایت در ${page.nameFa}`}
        />
      </Head>
      <CityPageContainer data={page} />
    </div>
  ) : (
    <span>404</span>
  );
}
export async function getStaticPaths() {
  return {
    paths: cn.filter(item => item.show).map((city) => {
      let path = { params: { city: city.english } };
      return path;
    }),
    fallback: false,
  };
}
export async function getStaticProps(context) {
  let { city } = context.params;
  let isCreateCityPage = cn.find(item => item.english == city).show
  
  const page = isCreateCityPage ? { ...CITY_PAGES[city], name: city } : undefined;

  return {
    props: { page },
  };
}
