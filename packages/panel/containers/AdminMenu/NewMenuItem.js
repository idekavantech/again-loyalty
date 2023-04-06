import React, { useCallback, useEffect, useRef, useState } from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { Collapse } from "react-collapse";
import { graphite, pollution } from "@saas/utils/colors";
import IconsDictionary from "@saas/utils/IconsDictionary";
import newIconsDictionary from "../../configs/icons";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import useTheme from "@material-ui/core/styles/useTheme";
import { useRouter } from "next/router";
import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import Link from "next/link";
import { INCLUDED_WEBAPPS_ONLY_KEY } from "@saas/utils/constants";
import { useSelector } from "react-redux";
import { makeSelectAdminUrlPrefix } from "@saas/stores/plugins/selector";

function NewMenuItem({
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
  const Icon1 = IconsDictionary[route.icon] || newIconsDictionary[route.icon];
  const theme = useTheme();
  const isFirstMount = useRef(true);

  const comparePaths = useCallback(
    (url) => {
      const urlParts = url.split("/").filter((url) => !!url);
      if (!urlParts.length) return false;
      const routerParts = window
        ? window.location.pathname // using window.location.pathname instead of router.asPath to remove query params
            .split("/")
            .reverse()
            .filter((_, index) => index < urlParts.length)
            .reverse()
        : [];

      let isEqual = true;
      urlParts.forEach((part, index) => {
        if (routerParts[index] !== part) {
          isEqual = false;
        }
      });
      return isEqual;
    },
    [window?.location?.pathname]
  );

  const isActive = route.exact
    ? window.location.pathname === route.url.slice(0, -1)
    : comparePaths(route.url);

  const isSublinkActive = () => {
    return subRoutes
      .filter(
        (link) =>
          !link?.[INCLUDED_WEBAPPS_ONLY_KEY] ||
          link[INCLUDED_WEBAPPS_ONLY_KEY].includes(
            process.env.NEXT_PUBLIC_APP_NAME
          )
      )
      .some((link) => comparePaths(link.url));
  };

  useEffect(() => {
    if (isSublinkActive() && !collapse && isFirstMount.current) {
      isFirstMount.current = false;
      setCollapse(true); // Open Menu if sublink is Active
    }
  }, [isSublinkActive]);

  if (!subRoutes.length) {
    return (
      <Link
        className="d-block w-100"
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
            height: 44,
            color: isActive ? theme.palette.primary.main : graphite,
            ...(route.style || {}),
            ...(isActive && { borderLeft: "solid 2px" }),
          }}
          key={route.text}
          onClick={onClickItem}
          className="ltr_force"
        >
          <ListItemIcon
            style={{
              minWidth: 38,
              color: isActive ? theme.palette.primary.main : pollution,
            }}
          >
            {Icon1 && (
              <Icon1
                style={{
                  fontSize: 24,
                  color: isActive
                    ? theme.palette.primary.main
                    : hexToRGBA("#202223", 0.67),
                }}
              />
            )}
          </ListItemIcon>
          <ListItemText
            className="text-left"
            style={{
              color: isActive ? theme.palette.primary.main : "#202223",
            }}
            primary={route.text}
          />
        </ListItem>
      </Link>
    );
  }
  return (
    <div className="d-block w-100">
      <ListItem
        button
        style={{ height: 44 }}
        key={route.text}
        disabled={disabled}
        onClick={() => {
          setCollapse(!collapse);
        }}
      >
        <ListItemIcon style={{ minWidth: 38 }}>
          {Icon1 && (
            <Icon1
              style={{
                fontSize: 24,
                color: isActive
                  ? theme.palette.primary.main
                  : hexToRGBA("#202223", 0.67),
              }}
            />
          )}
        </ListItemIcon>
        <ListItemText className="text-left" style={{ color: "#202223" }}>
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
                className="d-block w-100"
              >
                  <ListItem
                    disabled={disabled}
                    button
                    style={{
                      backgroundColor: active
                        ? hexToRGBA(theme.palette.primary.main, 0.05)
                        : "",
                      height: 44,
                      paddingLeft: 23,
                      paddingRight: 55,
                      ...(active && {
                        borderLeft: `solid 2px ${theme.palette.primary.main}`,
                      }),
                    }}
                    key={subRoute.text}
                    onClick={onClickItem}
                  >
                    <ListItemText
                      style={{
                        color: active ? theme.palette.primary.main : "#202223",
                        opacity: 0.8,
                      }}
                      className="text-left"
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

export default NewMenuItem;
