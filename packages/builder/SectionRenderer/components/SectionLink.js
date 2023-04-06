import Link from "next/link";
import React from "react";
// import qs from "qs";
import { getRelativeURL } from "@saas/utils/helpers/getRelativeURL";
import { formatUrl } from "@saas/utils/helpers/formatUrl";
// const dynamicRoutes = [
//   { key: "/invite/", href: "/invite/[slug]" },
//   { key: "/s/l/", href: "/s/l/[id]" },
//   { key: "/s/c/", href: "/s/c/[id]" },
//   { key: "/s/products/", href: "/s/products/[id]" },
// ];
export default function SectionLink({
  href = "",
  businessAddress,
  children,
  isExternal = false,
  ...props
}) {
  // const dynamicRoute = dynamicRoutes.find(
  //   (dr) => href && href.includes(dr.key)
  // );
  // const params = qs.parse(href && href.split(/\?/)[1], {
  //   ignoreQueryPrefix: true,
  // });

  // if (dynamicRoute) {
  //   return (
  //     <Link
  //       href={`${dynamicRoute.href}${qs.stringify(params, {
  //         addQueryPrefix: true,
  //       })}`}
  //       as={`${dynamicRoute.key}${href.split(dynamicRoute.key)[1]}`}
  //       {...props}
  //     >
  //       {children}
  //     </Link>
  //   );
  // }

  const isTelOrMailLink =
    !!href &&
    (href.slice(0, 4).includes("tel") || href.slice(0, 6).includes("mailto"));

  if (isExternal) {
    return (
      <a
        href={formatUrl(href)}
        {...props}
        {...(!isTelOrMailLink && { target: "_blank" })}
        rel="nooppner noreferrer"
      >
        {children}
      </a>
    );
  }
  if (getRelativeURL(href, businessAddress)) {
    return (
      <Link {...props} href={getRelativeURL(href, businessAddress)}>
        {children}
      </Link>
    );
  }

  return <span {...props}>{children}</span>;
}
