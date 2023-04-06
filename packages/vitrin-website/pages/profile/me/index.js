import Head from "next/head";
import MyProfile from "../../../containers/MyProfile";
export default function Profile() {
  return (
    <div>
      <Head>
        <title>پنل مدیریت سایت در ویترین | Vitrin</title>
        <meta name="robots" content="noindex" />
        <meta
          name="description"
          content="از این صفحه می‌توانید سایت‌های خود در ویترین را مدیریت کنید."
        />
        <meta
          property="og:title"
          content="پنل مدیریت سایت در ویترین | Vitrin"
        />
        <meta
          property="og:description"
          content="از این صفحه می‌توانید سایت‌های خود در ویترین را مدیریت کنید."
        />
        <meta
          name="twitter:title"
          content="پنل مدیریت سایت در ویترین | Vitrin"
        />
        <meta
          property="twitter:description"
          content="از این صفحه می‌توانید سایت‌های خود در ویترین را مدیریت کنید."
        />
      </Head>
      <MyProfile />
    </div>
  );
}

Profile.NeedAuth = true;
