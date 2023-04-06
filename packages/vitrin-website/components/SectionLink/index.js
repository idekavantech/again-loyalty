import Link from "next/link";
import React from "react";
import { getRelativeURL } from "utils/helpers/getRelativeURL";
export default function SectionLink({
  href = "",
  businessAddress,
  children,
  ...props
}) {
  if (getRelativeURL(href, businessAddress)) {
    return (
      <Link href={getRelativeURL(href, businessAddress)} {...props}>
        {children}
      </Link>
    );
  }

  return <span {...props}>{children}</span>;
}
