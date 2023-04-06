import axios from "axios";
import VitrinUpdates from "containers/Updates";
import Head from "next/head";
import { GET_VITRIN_UPDATES_API } from "utils/apis";

export default function Updates({ updates }) {
  return (
    <div>
      <Head>
        <title>آپدیت‌های محصولی ویترین | Vitrin</title>
        <meta
          name="description"
          content="میتونین از طریق این صفحه از لیست اپدیت‌های ویترین با خبر بشین."
        />
        <meta property="og:title" content="آپدیت‌های محصولی ویترین | Vitrin" />
        <meta
          property="og:description"
          content="میتونین از طریق این صفحه از لیست اپدیت‌های ویترین با خبر بشین."
        />
        <meta name="twitter:title" content="آپدیت‌های محصولی ویترین | Vitrin" />
        <meta
          property="twitter:description"
          content="میتونین از طریق این صفحه از لیست اپدیت‌های ویترین با خبر بشین."
        />
      </Head>
      <VitrinUpdates items={updates} />
    </div>
  );
}

const getVitrinUpdates = async () => {
  try {
    const res = await axios.get(GET_VITRIN_UPDATES_API);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export async function getStaticProps() {
  const updates = await getVitrinUpdates();
  if(!updates) {
    return {
      notFound : true
    }
  }
  return {
    props: {
      updates,
    }, // will be passed to the page component as props
  };
}
