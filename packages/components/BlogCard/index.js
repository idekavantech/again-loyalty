import React from "react";
import Link from "next/link";
import moment from "moment";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

export default function BlogCard({ blog }) {
  const { maxWidth430, maxWidth600 } = useResponsive();

  if (maxWidth600) {
    <Link className="w-100" href={`/blog/${blog.id}`} />;
  }
  return (
    <Link
      className="w-100 d-flex align-items-center justify-content-center mx-4"
      style={{
        backgroundColor: "#fff",
        borderRadius: maxWidth600 ? 12 : 16,
        height: maxWidth600 ? 150 : maxWidth430 ? 200 : 170,
        cursor: "pointer",
      }}
      href={`/blog/${blog.id}`}
    >
      <div
        className={`${maxWidth600 ? "" : "p-4"}`}
        style={{
          height: maxWidth600 ? "100%" : 170,
          width: maxWidth600 ? "40%" : 170,
        }}
      >
        <img
          style={{ borderRadius: maxWidth600 ? "0 12px 12px 0" : 12 }}
          src={blog?.data?.main_image_url}
          className="card-img-top w-100 h-100 overflow-hidden"
          alt="..."
        />
      </div>
      <div
        className={`h-100 d-flex flex-column justify-content-center align-items-center py-4 ${
          maxWidth600 ? "pr-3 pl-2" : "pl-4"
        }`}
        style={{ width: maxWidth600 ? "60%" : "70%", position: "relative" }}
      >
        <div className="mb-auto">
          <h5
            style={{ fontSize: maxWidth600 ? 13 : 16 }}
            className="card-title my-1 my-md-2 blog-card-description"
          >
            {blog?.data?.seo_title}
          </h5>
          <p
            style={{ fontSize: maxWidth600 ? 11 : 14 }}
            className="card-text blog-card-description pt-1"
          >
            {blog?.data?.meta_description}
          </p>
        </div>
        <div
          className="text-center mr-auto mt-auto p-1"
          style={{
            width: 65,
            backgroundColor: "#0083cc",
            borderRadius: 4,
            color: "#fff",
            fontSize: 11,
            position: "absolute",
            left: 12,
            bottom: maxWidth600 ? 8 : 16,
          }}
        >
          <time>
            {englishNumberToPersianNumber(
              moment(blog?._updated_at || blog?._created_at).format(
                "YYYY/MM/DD"
              )
            )}
          </time>
        </div>
      </div>
    </Link>
  );
}
