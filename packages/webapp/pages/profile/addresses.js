import Addresses from "containers/Pages/Address";
import { NextSeo } from "next-seo";

export default function profileAddresses() {
  return (
    <>
      <NextSeo noindex={true} /> <Addresses />
    </>
  );
}
