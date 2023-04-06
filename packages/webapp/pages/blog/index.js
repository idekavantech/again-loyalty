import React from "react";
import { GET_PAGES_API } from "@saas/utils/api";
import { getPages } from "@saas/utils/services/getPages";
import BlogsContainer from "containers/Blogs";

export default function Blogs({ pages }) {
  return <BlogsContainer blogs={pages} />;
}

Blogs.getInitialProps = async ({ business }) => {
  const pages = await getPages(GET_PAGES_API(business.slug, 1, true));
  return {
    pages,
  };
};
