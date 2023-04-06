import Close from "@material-ui/icons/Close";
import SectionLink from "../SectionRenderer/components/SectionLink";
import LazyImage from "@saas/components/LazyImage";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTheme from "@material-ui/core/styles/useTheme";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import {
  HAS_EXTERNAL_LINK,
  HAS_INTERNAL_LINK,
} from "@saas/utils/constants/builderConstants";

export default function NavigationBarRenderer({
  customization,
  content,
  business,
  urlPrefix,
  isMobile,
  isEditMode,
}) {
  const {
    layout: { title_desktop, title_mobile },
    link: { link_type, internal_link, external_link },
  } = content;
  const {
    background: {
      background_type = "color",
      background_color,
      use_theme_color,
      color,
      opacity = 100,
      background_image,
      font_size,
    } = {},
    show_navigation_bar: {
      show_btn_close = false,
      close_all = false,
      is_allPage = true,
      is_home_page = false,
    },
  } = customization;
  const businessAddress = business && business.get_vitrin_absolute_url;
  const [isNavigationBar, setIsNavigationBar] = useState(true);
  const [showNavigation, setShowNavigation] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const { maxWidth768 } = useResponsive();
  const _isMobile = typeof isMobile === "boolean" ? isMobile : maxWidth768;
  useEffect(() => {
    if (is_allPage) {
      setShowNavigation(true);
      window.scrollTo(0, 1);
    } else {
      if (is_home_page && router.asPath.split("?")[0] === `${urlPrefix}/`) {
        setShowNavigation(true);
        window.scrollTo(0, 1);
      } else {
        setShowNavigation(false);
      }
    }
    if (close_all) {
      if (sessionStorage.getItem("is_close")) {
        setIsNavigationBar(false);
      } else {
        setIsNavigationBar(true);
        window.scrollTo(0, 1);
      }
    } else {
      setIsNavigationBar(true);
      window.scrollTo(0, 1);
    }
  }, []);

  return (
    <>
      {internal_link || external_link ? (
        <div
          className={`w-100 position-relative justify-content-center align-items-center ${
            (isNavigationBar && showNavigation) || isEditMode
              ? "d-flex"
              : "d-none"
          }`}
          style={{
            height: 40,
            backgroundColor:
              background_color && background_type === "color"
                ? background_color
                : "#fff",
          }}
        >
          {show_btn_close ? (
            <Close
              style={{
                color: use_theme_color ? theme.palette.secondary.main : color,
                fontSize: 16,
                right: 15,
                cursor: "pointer",
                zIndex: 10,
              }}
              className="position-absolute"
              onClick={() => {
                sessionStorage.setItem("is_close", true);
                setIsNavigationBar(false);
              }}
            />
          ) : null}
          <SectionLink
            className="w-100 d-flex justify-content-center align-items-center"
            style={{ height: 40 }}
            href={
              link_type === HAS_INTERNAL_LINK ? internal_link : external_link
            }
            isExternal={link_type === HAS_EXTERNAL_LINK}
            businessAddress={businessAddress}
          >
            {background_image && background_type === "image" && (
              <div
                style={{ height: "100%" }}
                className="position-absolute left-0 u-top-0 w-100 d-block"
              >
                <LazyImage
                  src={background_image}
                  alt={business.revised_title}
                  style={{ opacity: opacity / 100 }}
                />
              </div>
            )}

            <span
              className="position-absolute"
              style={{
                fontWeight: 600,
                color: use_theme_color ? theme.palette.secondary.main : color,
                fontSize: font_size || 12,
              }}
            >
              {_isMobile ? title_mobile : title_desktop}
            </span>
          </SectionLink>
        </div>
      ) : (
        <div
          className={`w-100 justify-content-center align-items-center ${
            (isNavigationBar && showNavigation) || isEditMode
              ? "d-flex"
              : "d-none"
          }`}
          style={{
            height: 40,
            backgroundColor:
              background_color && background_type === "color"
                ? background_color
                : "#fff",
          }}
        >
          {background_image && background_type === "image" && (
            <div className="position-absolute left-0 u-top-0  w-100 d-block">
              <LazyImage
                src={background_image}
                alt={business.revised_title}
                style={{ opacity: opacity / 100, height: 40 }}
              />
            </div>
          )}

          <span
            className="position-absolute z-index-10"
            style={{
              fontWeight: 600,
              color: use_theme_color ? theme.palette.secondary.main : color,
              fontSize: font_size || 12,
            }}
          >
            {_isMobile ? title_mobile : title_desktop}
          </span>

          {show_btn_close ? (
            <Close
              style={{
                color: use_theme_color ? theme.palette.secondary.main : color,
                fontSize: 16,
                right: 15,
                cursor: "pointer",
              }}
              className="position-absolute z-index-100"
              onClick={() => {
                sessionStorage.setItem("is_close", true);
                setIsNavigationBar(false);
              }}
            />
          ) : null}
        </div>
      )}
    </>
  );
}
