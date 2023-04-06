import Customized404Page from "../containers/Customized404Page";
import Head from "next/head";
export default function Custom404() {
  return (<div>
    <Head>
      <title>404</title>
    </Head>
    <Customized404Page />
  </div>);
}
Custom404.NeedAuth = false;
