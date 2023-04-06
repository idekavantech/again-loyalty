/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import ChevronLeftRoundedIcon from "@material-ui/icons/ChevronLeftRounded";
import Link from "next/link";

function BreadCrumb({ themeColor, items, categoryItemLink }) {
  const theme = useTheme();
  return (
    <div className="d-flex scrollbar-hidden" style={{ overflow: "auto" }}>
      {items.map((item, index) => (
        <div
          className="d-flex align-items-center u-cursor-pointer"
          key={item.name}
        >
          {index !== 0 && item.name ? (
            <ChevronLeftRoundedIcon
              style={{ color: theme.palette.text.disabled }}
            />
          ) : null}
          <Link
            tabIndex="0"
            role="button"
            className="p-1"
            style={{
              whiteSpace: "pre",
              color:
                index === items.length - 1
                  ? themeColor
                  : theme.palette.text.disabled,
            }}
            href={categoryItemLink(item.id ? item : null)}
          >
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default BreadCrumb;
