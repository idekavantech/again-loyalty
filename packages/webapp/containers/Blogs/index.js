import React from "react";
import Head from "next/head";
import BlogCard from "@saas/components/BlogCard";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

export default function Blogs({ blogs }) {
  const { maxWidth600 } = useResponsive();

  return (
    <>
      <Head>
        <title>بلاگ‌ها</title>
      </Head>
      <div
        className="w-100"
        style={{
          padding: maxWidth600 ? "0 16px" : "0 32px",
          backgroundColor: "#e5e5ff",
        }}
      >
        <h1 className="py-5 pr-4" style={{ fontSize: 20 }}>
          ویترین بلاگ
        </h1>
        <div className="row">
          {blogs?.map((blog) => (
            <div
              key={blog.id}
              className="col-12 col-lg-6 d-flex align-items-center justify-content-center my-3"
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
