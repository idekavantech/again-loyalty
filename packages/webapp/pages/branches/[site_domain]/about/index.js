import AboutPageContainer from "containers/Pages/About";
import Head from "next/head";

export default function AboutPage() {
  return (
    <div>
      <Head>
        <title>درباره ما</title>
      </Head>
      <AboutPageContainer />
    </div>
  );
}
