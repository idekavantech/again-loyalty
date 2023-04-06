import ProfilePageContainer from "containers/Pages/Profile";
import Head from "next/head";

export default function ProfilePage() {
  return (
    <div>
      <Head>
        <title>پروفایل شما</title>
        <meta name="robots" content="noindex" />
      </Head>
      <ProfilePageContainer />
    </div>
  );
}
ProfilePage.NeedAuth = true;
