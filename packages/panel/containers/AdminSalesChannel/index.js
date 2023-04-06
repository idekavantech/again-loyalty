import { memo } from "react";
import Head from "next/head";
import AdminBreadCrumb from "../AdminBreadCrumb";
import ChannelBox from "./ChannelBox";
import { SALES_CHANNELS } from "./constants";
import SalesChannelInformBox from "./SalesChannelInformBox";

function AdminSaleChannelLayout() {
  return (
    <div className="container pb-3">
      <Head>
        <title>Marketing and increasing visits</title>
      </Head>
      <AdminBreadCrumb />
      <SalesChannelInformBox />
      <div className="mt-3 d-flex justify-content-right flex-wrap">
        {SALES_CHANNELS.map((channel) => (
          <ChannelBox key={channel.name} {...channel} />
        ))}
      </div>
    </div>
  );
}

export default memo(AdminSaleChannelLayout);
