import React, { useState } from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { Collapse } from "react-collapse";
import { graphite, pollution } from "@saas/utils/colors";
import IconsDictionary from "@saas/utils/IconsDictionary";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import useTheme from "@material-ui/core/styles/useTheme";
import { useRouter } from "next/router";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import Link from "next/link";
import Icon from "@saas/components/Icon";
import { CROWN } from "@saas/icons";
import { INCLUDED_WEBAPPS_ONLY_KEY } from "@saas/utils/constants";
import { useSelector } from "react-redux";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";

function MenuItem({
  route = {},
  subRoutes = [],
  onClickItem,
  disabled,
  isSubLinksOpen,
}) {
  const router = useRouter();
  const [collapse, setCollapse] = useState(
    route?.url?.length ? router.asPath.includes(route.url) : isSubLinksOpen
  );
  const adminUrlPrefix = useSelector(makeSelectAdminUrlPrefix());
  const Icon1 = IconsDictionary[route.icon];
  const theme = useTheme();

  const comparePaths = (url) => {
    const urlParts = url.split("/");
    const routerParts = router.asPath
      .split("/")
      .reverse()
      .filter((_, index) => index < urlParts.length)
      .reverse();

    let isEqual = true;
    urlParts.forEach((part, index) => {
      if (routerParts[index] !== part) {
        isEqual = false;
      }
    });
    return isEqual;
  };
  const isActive = route.exact
    ? router.asPath === route.url
    : comparePaths(route.url);
  if (!subRoutes.length) {
    return (
      <Link
        className="px-3 d-block w-100"
        disabled={disabled}
        href={route.url}
        passHref
      >
        <ListItem
          button
          disabled={disabled}
          style={{
            backgroundColor: isActive
              ? hexToRGBA(theme.palette.primary.main, 0.05)
              : "",
            borderRadius: 8,
            height: 44,
            color: isActive ? theme.palette.primary.main : graphite,
            ...(route.style || {}),
          }}
          key={route.text}
          onClick={onClickItem}
        >
          <ListItemIcon
            style={{
              minWidth: 30,
              color: isActive ? theme.palette.primary.main : pollution,
            }}
          >
            {Icon1 && <Icon1 style={{ fontSize: 24 }} />}
          </ListItemIcon>
          <ListItemText className="text-right" primary={route.text} />
        </ListItem>
      </Link>
    );
  }
  return (
    <div className="px-3 d-block w-100">
      <ListItem
        button
        style={{ height: 44 }}
        key={route.text}
        disabled={disabled}
        onClick={() => {
          setCollapse(!collapse);
        }}
      >
        <ListItemIcon style={{ minWidth: 30 }}>
          {Icon1 && <Icon1 style={{ fontSize: 18, color: graphite }} />}
        </ListItemIcon>
        <ListItemText className="text-right" style={{ color: graphite }}>
          {route.text}
        </ListItemText>
        <KeyboardArrowDownRoundedIcon
          style={{
            color: graphite,
            transform: `rotate(${collapse ? 180 : 0}deg)`,
            transition: "all 0.3s ease-in-out",
          }}
        />
      </ListItem>
      <Collapse
        isOpened={collapse}
        theme={{
          collapse: "ReactCollapse--collapse",
          content: "ReactCollapse--content",
        }}
      >
        {subRoutes
          .filter(
            (link) =>
              !link[INCLUDED_WEBAPPS_ONLY_KEY] ||
              link[INCLUDED_WEBAPPS_ONLY_KEY].includes(
                process.env.NEXT_PUBLIC_APP_NAME
              )
          )
          .map((subRoute) => {
            const active = subRoute.exact
              ? router.asPath === subRoute.url
              : comparePaths(subRoute.url);
            return (
              <Link
                key={`menu-${subRoute.url}`}
                href={`${adminUrlPrefix}${subRoute.url}`}
                passHref
                disabled={disabled}
                className="px-3 d-block w-100"
              >
                <ListItem
                  disabled={disabled}
                  button
                  style={{
                    backgroundColor: active
                      ? hexToRGBA(theme.palette.primary.main, 0.05)
                      : "",
                    borderRadius: 8,
                    height: 44,
                    paddingLeft: 23,
                    paddingRight: 33,
                  }}
                  key={subRoute.text}
                  onClick={onClickItem}
                >
                  <ListItemText
                    style={{
                      color: active
                        ? theme.palette.primary.main
                        : theme.palette.text.disabled,
                    }}
                    className="text-right"
                    primary={subRoute.text}
                  />
                </ListItem>
              </Link>
            );  
          })}
      </Collapse>
    </div>
  );
}

export default MenuItem;
