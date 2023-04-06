import React, { memo, useEffect, useMemo, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import Paper from "@material-ui/core/Paper";

import DirectionsRoundedIcon from "@material-ui/icons/DirectionsRounded";
import Button from "@material-ui/core/Button";
import LazyImage from "@saas/components/LazyImage";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TelegramIcon from "@material-ui/icons/Telegram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useRouter } from "next/router";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { getWeekDays } from "@saas/utils/constants/date";
import { getWeekDay } from "@saas/utils/helpers/getWeekDay";

import {
  makeSelectBusiness,
  makeSelectBusinessThemeColor,
  makeSelectBusinessThemeConfig,
} from "@saas/stores/business/selector";
import {
  defaultNavigationMenus,
  MAIN_FOOTER_NAVIGATION_MENU,
} from "@saas/utils/constants/navigationMenus";
import {
  makeSelectPlugin,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import dynamic from "next/dynamic";
import { DIRECTION_MODAL } from "@saas/stores/ui/constants";
import { PWA_PLUGIN } from "@saas/utils/constants/plugins";
import { FOOTER_MAP_VISIBILITY } from "@saas/utils/constants/footerConstants";
import { useResponsive } from "@saas/utils/hooks/useResponsive";


const Map = dynamic(() => import("@saas/components/Map"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "185px", width: "100%", background: "#eeeeee" }} />
  ),
});

function Footer1({
  business,
  themeConfig,
  urlPrefix,
  themeColor,
  customization,
  isMobile,
  pluginData,
}) {
  const {
    layout: { [FOOTER_MAP_VISIBILITY]: _FOOTER_MAP_VISIBILITY },
  } = customization;
  const [footerMenu, setFooterMenu] = useState(null);
  const today = new Date().getDay();
  const hasPWAPlugin = !!business?.plugins_config?.[PWA_PLUGIN];
  let changedTodayForOurFormat;
  today == 0
    ? (changedTodayForOurFormat = 7)
    : (changedTodayForOurFormat = today);
  const { work_hours: workHours, has_working_hours: hasWorkingHours } =
    business;
  const router = useRouter();
  const { maxWidth360, minWidth768 } = useResponsive();
  const iphone5Matches = typeof isMobile === "boolean" ? isMobile : maxWidth360;
  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth768;
  const numbers = business.more_phone_numbers.split("\n");
  numbers.push(business.phone_zero_starts);
  const position = {
    latitude: business.latitude,
    longitude: business.longitude,
    singleMarker: true,
  };
  const mapOptions = useMemo(() => {
    return {
      height: "185px",
      width: "100%",
      center: position,
      markers: [position],
      touchZoom: true,
      scrollWheelZoom: false,
      zoomControl: isDesktop,
      zoomControlPosition: "bottomright",
      zoom: 13,
      themeColor,
      dragging: isDesktop,
    };
  }, [position, themeColor, isDesktop]);
  useEffect(() => {
    if (
      themeConfig &&
      themeConfig.navigation_menus &&
      themeConfig.navigation_menus[MAIN_FOOTER_NAVIGATION_MENU]
    ) {
      setFooterMenu(themeConfig.navigation_menus[MAIN_FOOTER_NAVIGATION_MENU]);
    } else {
      setFooterMenu(
        defaultNavigationMenus(urlPrefix)[MAIN_FOOTER_NAVIGATION_MENU]
      );
    }
  }, [themeConfig]);

  if (iphone5Matches) {
    return (
      <Paper elevation={1}>
        <div
          className="d-flex flex-column align-items-center p-3"
          style={{ backgroundColor: "#f5f7f8" }}
        >
          <div className="u-fontVeryLarge u-fontWeightBold d-flex col-12 px-0 justify-content-center justify-content-lg-start">
            {numbers.filter((number) => number !== "").length !== 0 ? (
              <span>شماره تماس پشتیبانی</span>
            ) : null}
          </div>
          <div
            className={`u-fontLarge ${
              numbers.filter((number) => number !== "").length !== 0 && "my-3 "
            } d-flex flex-wrap justify-content-around align-items-center col-12`}
          >
            {numbers
              .slice(0)
              .reverse()
              .map(
                (number) =>
                  number !== "" && (
                    <a
                      key={number.id}
                      href={`tel:${number}`}
                      className="mx-2 mb-4"
                    >
                      {englishNumberToPersianNumber(number)}
                    </a>
                  )
              )}
          </div>
          <div
            className={`flex-column ${
              business.instagram_url
                ? "justify-content-betwee "
                : "flex-row-reverse justify-content-center"
            } d-flex align-items-center col-12 px-0`}
          >
            {business.instagram_url &&
              business.instagram_url !== "" &&
              business.instagram_url !== null && (
                <a
                  className={
                    iphone5Matches
                      ? "mb-3 u-cursor-pointer d-flex"
                      : "u-cursor-pointer d-flex"
                  }
                  href={business.instagram_url}
                  target="blank"
                >
                  <LazyImage
                    width={163}
                    height={51}
                    src={`/images/follow-on-instagram.svg`}
                    alt={business.revised_title}
                  />
                </a>
              )}
            {pluginData?.isActive && (
              <div
                className="u-cursor-pointer d-flex"
                onClick={() => router.push("/pwa/download")}
              >
                <LazyImage
                  width={163}
                  height={51}
                  src={`/images/install-pwa.svg`}
                  alt={business.revised_title}
                />
              </div>
            )}
          </div>
        </div>
        <div className="d-flex flex-column p-3">
          <div className="col-12 d-flex flex-column pr-0">
            <div className="mb-2">
              <LazyImage
                className="u-border-radius-50-percent"
                src={business.icon_image_url}
                width={80}
                height={80}
                alt={business.revised_title}
              />
            </div>
            <div className="u-fontVeryLarge u-fontWeightBold d-flex mb-2">
              {business.revised_title}
            </div>
            <div
              className="u-fontLarge d-flex text-right"
              style={{ wordBreak: "break-word" }}
              dangerouslySetInnerHTML={{
                __html: business.about_us
                  .toString()
                  .replace(/(<([^>]+)>)/gi, "")
                  .substr(0, 250),
              }}
            ></div>
          </div>
          <div className="col-12 my-5 px-0 d-flex flex-column">
            <div className="u-fontLarge u-fontWeightBold text-right mb-4 u-cursor-default">
              صفحات فروشگاه
            </div>
            <div className="d-flex flex-column ">
              <div className="col-12 pr-0">
                <div
                  onClick={() => router.push(`${urlPrefix}/about`)}
                  className="u-fontLarge u-fontWeightBold text-right mb-4 u-cursor-pointer"
                >
                  راه‌های ارتباطی
                </div>
                {hasPWAPlugin && (
                  <div
                    onClick={() => router.push("/pwa/download")}
                    className="u-fontLarge u-fontWeightBold text-right mb-4 u-cursor-pointer"
                  >
                    نصب وب‌اپلیکیشن
                  </div>
                )}

                {footerMenu &&
                  footerMenu.links.slice(0, 4).map((menu) => (
                    <div
                      key={menu.id}
                      onClick={() => router.push(menu.link)}
                      className="u-fontLarge u-fontWeightBold text-right mb-4 u-cursor-pointer"
                    >
                      {menu.title}
                    </div>
                  ))}
              </div>
              <div className="col-12 pr-0">
                {footerMenu &&
                  footerMenu.links.slice(4, 10).map((menu) => (
                    <div
                      key={menu.id}
                      onClick={() => router.push(menu.link)}
                      className="u-fontLarge u-fontWeightBold text-right mb-4 u-cursor-pointer"
                    >
                      {menu.title}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-12 pl-0 px-0">
            {hasWorkingHours && (
              <div className="u-fontVeryLarge u-fontWeightBold text-right">
                ساعت ارائه خدمت
              </div>
            )}
            <div className="my-2 d-flex flex-wrap justify-content-center text-center">
              {hasWorkingHours &&
                getWeekDays.map((label) => {
                  const day = workHours[label];
                  return (
                    <div
                      style={{ minWidth: 65 }}
                      className="ml-2 mb-2"
                      key={`day-working-hour-${label}`}
                    >
                      <span
                        className="px-2 u-fontVerySmall u-fontWeightBold"
                        style={{
                          border: "1px solid rgba(164, 176, 190,1.0)",
                          borderRadius: 5,
                          backgroundColor:
                            changedTodayForOurFormat == label ? "#ECFDE7" : "",
                        }}
                      >
                        {getWeekDay(label).charAt(0)}
                      </span>
                      {day.length ? (
                        day.map((shift) => (
                          <div
                            className="my-1 u-fontVerySmall u-fontWeightBold"
                            key={`${shift.from}-${shift.to}`}
                          >
                            {englishNumberToPersianNumber(shift.from)} -{" "}
                            {englishNumberToPersianNumber(shift.to)}
                          </div>
                        ))
                      ) : (
                        <div className="my-1 u-fontVerySmall u-fontWeightBold">
                          تعطیل
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            {_FOOTER_MAP_VISIBILITY ? (
              <div className="position-relative">
                <div style={{ borderRadius: 8, overflow: "hidden" }}>
                  <Map options={mapOptions} />
                </div>
                <span
                  className="position-absolute u-cursor-pointer"
                  style={{ left: 10, bottom: 10 }}
                >
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "white",
                      borderRadius: 8,
                      color: themeColor,
                    }}
                    onClick={() => pushParamsToUrl(DIRECTION_MODAL)}
                  >
                    <DirectionsRoundedIcon color="secondary" />
                    <span className="mr-2" style={{ color: themeColor }}>
                      مسیریابی
                    </span>
                  </Button>
                </span>
              </div>
            ) : null}
            <div className="text-right u-fontLarge my-3">
              {business.address}
            </div>
          </div>
        </div>
        {Boolean(business.linkedin_url) ||
        Boolean(business.telegram_url) ||
        Boolean(business.whatsapp_url) ||
        Boolean(business.aparat_url) ||
        Boolean(business.youtube_url) ||
        Boolean(business.facebook_url) ||
        Boolean(business.twitter_url) ||
        Boolean(themeConfig.enamad_config) ||
        Boolean(themeConfig.samandehi_config) ||
        Boolean(themeConfig.virtual_business_association_config) ? (
          <div
            className="d-flex flex-column p-3"
            style={{ backgroundColor: "#f5f7f8" }}
          >
            <div
              className={`d-flex align-items-center flex-1 ${
                themeConfig.enamad_config || themeConfig.samandehi_config
                  ? "pt-3 "
                  : ""
              } order-3 justify-content-center`}
              style={{ visibility: "hidden" }}
            >
              <a className="cursor-pointer" href="/sitemap.xml">
                نقشه سایت
              </a>
            </div>
            {themeConfig.enamad_config ||
            themeConfig.samandehi_config ||
            themeConfig.virtual_business_association_config ? (
              <div className="d-flex flex-column order-1">
                <div className="d-flex align-items-center justify-content-center mb-4">
                  <div style={{ width: 20 }}>
                    <LazyImage
                      className="w-100 h-100 object-fit-cover"
                      alt="item"
                      src={`/images/cert.svg`}
                    />
                  </div>
                  <span className="mx-2 u-fontWeightBold">گواهینامه</span>
                  <div style={{ width: 20 }}>
                    <LazyImage
                      className="w-100 h-100 object-fit-cover"
                      alt="item"
                      src={`/images/cert.svg`}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <style
                    dangerouslySetInnerHTML={{
                      __html: `
                  .parent a img {
                    width : 120px ;
                    height : 120px ;
                    object-fit : contain;
                  }
                  .virtual img {
                    width : 120px ;
                    height : 120px ;
                    object-fit : contain;
                  }
                `,
                    }}
                  ></style>
                  {themeConfig.enamad_config && (
                    <div
                      className={`${
                        ((themeConfig.enamad_config &&
                          themeConfig.samandehi_config) ||
                          (themeConfig.enamad_config &&
                            themeConfig.virtual_business_association_config)) &&
                        " ml-2 "
                      }`}
                    >
                      <div
                        className="w-100 h-100 parent"
                        dangerouslySetInnerHTML={{
                          __html: `${themeConfig.enamad_config}`,
                        }}
                      ></div>
                    </div>
                  )}
                  {themeConfig.samandehi_config && (
                    <div
                      className={`${
                        themeConfig.samandehi_config &&
                        themeConfig.virtual_business_association_config &&
                        " ml-2 "
                      }`}
                    >
                      <div
                        className="w-100 h-100 virtual"
                        dangerouslySetInnerHTML={{
                          __html: `${themeConfig.samandehi_config}`,
                        }}
                      ></div>
                    </div>
                  )}
                  {themeConfig.virtual_business_association_config && (
                    <div>
                      <div
                        className="w-100 h-100 virtual"
                        dangerouslySetInnerHTML={{
                          __html: `${themeConfig.virtual_business_association_config}`,
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
            <div
              className={`d-flex align-items-center flex-1 ${
                themeConfig.enamad_config ||
                themeConfig.samandehi_config ||
                themeConfig.virtual_business_association_config
                  ? "pt-3 "
                  : ""
              }  order-2 justify-content-center`}
            >
              {Boolean(business.linkedin_url) && (
                <a
                  className="mx-1 cursor-pointer"
                  href={business.linkedin_url}
                  target="blank"
                >
                  <LinkedInIcon />
                </a>
              )}
              {Boolean(business.telegram_url) && (
                <a
                  className="mx-1 cursor-pointer"
                  href={business.telegram_url}
                  target="blank"
                >
                  <TelegramIcon />
                </a>
              )}
              {Boolean(business.whatsapp_url) && (
                <a
                  className="mx-1 cursor-pointer"
                  href={business.whatsapp_url}
                  target="blank"
                >
                  <WhatsAppIcon />
                </a>
              )}
              {Boolean(business.aparat_url) && (
                <a
                  className="mx-1 cursor-pointer"
                  href={business.aparat_url}
                  target="blank"
                  style={{ width: 24, height: 30 }}
                >
                  <LazyImage src={`/images/aparat.svg`} />
                </a>
              )}
              {Boolean(business.youtube_url) && (
                <a
                  className="mx-1 cursor-pointer"
                  href={business.youtube_url}
                  target="blank"
                >
                  <YouTubeIcon />
                </a>
              )}
              {Boolean(business.facebook_url) && (
                <a
                  className="mx-1 cursor-pointer"
                  href={business.facebook_url}
                  target="blank"
                >
                  <FacebookIcon />
                </a>
              )}
              {Boolean(business.twitter_url) && (
                <a
                  className="mx-1 cursor-pointer"
                  href={business.twitter_url}
                  target="blank"
                >
                  <TwitterIcon />
                </a>
              )}
            </div>
          </div>
        ) : null}
      </Paper>
    );
  }
  return (
    <Paper elevation={1}>
      <div
        className="d-flex flex-column flex-lg-row align-items-center p-3"
        style={{ backgroundColor: "#f5f7f8" }}
      >
        <div className="u-fontVeryLarge u-fontWeightBold d-flex col-12 col-lg-2 px-0 justify-content-center justify-content-lg-start">
          {numbers.filter((number) => number !== "").length !== 0 ? (
            <span>شماره تماس پشتیبانی</span>
          ) : null}
        </div>
        <div
          className={`u-fontLarge ${
            numbers.filter((number) => number !== "").length !== 0 && "my-3 "
          }  my-lg-0 d-flex flex-wrap justify-content-around justify-content-lg-start align-items-center col-12 col-lg-6`}
        >
          {numbers
            .slice(0)
            .reverse()
            .map(
              (number) =>
                number !== "" && (
                  <a
                    key={number.id}
                    href={`tel:${number}`}
                    className="ml-lg-5 mx-2 mb-4 mb-lg-0"
                  >
                    {englishNumberToPersianNumber(number)}
                  </a>
                )
            )}
        </div>
        <div
          className={`${iphone5Matches ? "flex-column" : ""} ${
            business.instagram_url
              ? "justify-content-between "
              : "flex-row-reverse justify-content-center justify-content-lg-between  "
          } d-flex align-items-center  col-12 col-lg-4 px-0`}
        >
          {Boolean(business.instagram_url) && (
            <a
              className={
                iphone5Matches
                  ? "mb-3 u-cursor-pointer d-flex"
                  : "u-cursor-pointer d-flex"
              }
              href={business.instagram_url}
              target="blank"
            >
              <LazyImage
                width={163}
                height={51}
                src={`/images/follow-on-instagram.svg`}
                alt={business.revised_title}
              />
            </a>
          )}
          {pluginData?.isActive && (
            <div
              className="u-cursor-pointer d-flex"
              onClick={() => router.push("/pwa/download")}
            >
              <LazyImage
                width={163}
                height={51}
                src={`/images/install-pwa.svg`}
                alt={business.revised_title}
              />
            </div>
          )}
        </div>
      </div>
      <div className="d-flex flex-column flex-lg-row p-3">
        <div className="col-12 col-lg-3 d-flex flex-column pr-0">
          <div className="mb-2">
            <LazyImage
              className="u-border-radius-50-percent"
              src={business.icon_image_url}
              width={80}
              height={80}
              alt={business.revised_title}
            />
          </div>
          <div className="u-fontVeryLarge u-fontWeightBold d-flex mb-2">
            {business.revised_title}
          </div>
          <div
            className="u-fontLarge d-flex text-right"
            style={{ wordBreak: "break-word" }}
            dangerouslySetInnerHTML={{
              __html: business.about_us
                .toString()
                .replace(/(<([^>]+)>)/gi, "")
                .substr(0, 250),
            }}
          ></div>
        </div>
        <div className="col-12 col-lg-5 my-5 my-lg-0 px-0 px-lg-3 d-flex flex-column">
          <div className="u-fontLarge u-fontWeightBold text-right mb-4 u-cursor-default">
            صفحات فروشگاه
          </div>
          <div className="d-flex flex-column flex-lg-row">
            <div className="col-12 col-lg-6 pr-0">
              <div
                onClick={() => router.push(`${urlPrefix}/about`)}
                className="u-fontLarge u-fontWeightBold text-right mb-4 u-cursor-pointer"
              >
                راه‌های ارتباطی
              </div>
              {hasPWAPlugin && (
                <div
                  onClick={() => router.push("/pwa/download")}
                  className="u-fontLarge u-fontWeightBold text-right mb-4 u-cursor-pointer"
                >
                  نصب وب‌اپلیکیشن
                </div>
              )}
              {footerMenu &&
                footerMenu.links.slice(0, 4).map((menu) => (
                  <div
                    key={menu.id}
                    onClick={() => router.push(menu.link)}
                    className="u-fontLarge u-fontWeightBold text-right mb-4 u-cursor-pointer"
                  >
                    {menu.title}
                  </div>
                ))}
            </div>
            <div className="col-12 col-lg-6 pr-0">
              {footerMenu &&
                footerMenu.links.slice(4, 10).map((menu) => (
                  <div
                    key={menu.id}
                    onClick={() => router.push(menu.link)}
                    className="u-fontLarge u-fontWeightBold text-right mb-4 u-cursor-pointer"
                  >
                    {menu.title}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 pl-0 px-0">
          {hasWorkingHours && (
            <div className="u-fontVeryLarge u-fontWeightBold text-right">
              ساعت ارائه خدمت
            </div>
          )}
          <div className="my-2 d-flex flex-wrap justify-content-center justify-content-lg-start text-center">
            {hasWorkingHours &&
              getWeekDays.map((label) => {
                const day = workHours[label];
                return (
                  <div
                    style={{ minWidth: 65 }}
                    className="ml-2 mb-2"
                    key={`day-working-hour-${label}`}
                  >
                    <span
                      className="px-2 u-fontVerySmall u-fontWeightBold"
                      style={{
                        border: "1px solid rgba(164, 176, 190,1.0)",
                        borderRadius: 5,
                        backgroundColor:
                          changedTodayForOurFormat == label ? "#ECFDE7" : "",
                      }}
                    >
                      {getWeekDay(label).charAt(0)}
                    </span>
                    {day.length ? (
                      day.map((shift) => (
                        <div
                          className="my-1 u-fontVerySmall u-fontWeightBold"
                          key={`${shift.from}-${shift.to}`}
                        >
                          {englishNumberToPersianNumber(shift.from)} -{" "}
                          {englishNumberToPersianNumber(shift.to)}
                        </div>
                      ))
                    ) : (
                      <div className="my-1 u-fontVerySmall u-fontWeightBold">
                        تعطیل
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          {_FOOTER_MAP_VISIBILITY ? (
            <div className="position-relative">
              <div style={{ borderRadius: 8, overflow: "hidden" }}>
                <Map options={mapOptions} />
              </div>
              <span
                className="position-absolute u-cursor-pointer"
                style={{ left: 10, bottom: 10 }}
              >
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "white",
                    borderRadius: 8,
                    color: themeColor,
                  }}
                  onClick={() => pushParamsToUrl(DIRECTION_MODAL)}
                >
                  <DirectionsRoundedIcon color="secondary" />
                  <span className="mr-2" style={{ color: themeColor }}>
                    مسیریابی
                  </span>
                </Button>
              </span>
            </div>
          ) : null}
          <div className="text-right u-fontLarge my-3 mb-lg-0">
            {business.address}
          </div>
        </div>
      </div>
      {Boolean(business.linkedin_url) ||
      Boolean(business.telegram_url) ||
      Boolean(business.whatsapp_url) ||
      Boolean(business.aparat_url) ||
      Boolean(business.youtube_url) ||
      Boolean(business.facebook_url) ||
      Boolean(business.twitter_url) ||
      Boolean(themeConfig.enamad_config) ||
      Boolean(themeConfig.samandehi_config) ||
      Boolean(themeConfig.virtual_business_association_config) ? (
        <div
          className="d-flex align-items-lg-center flex-column flex-lg-row p-3"
          style={{ backgroundColor: "#f5f7f8" }}
        >
          <div
            className={`d-flex align-items-center flex-1 ${
              themeConfig.enamad_config || themeConfig.samandehi_config
                ? "pt-3 "
                : ""
            } order-3 order-lg-1 justify-content-center justify-content-lg-start`}
            style={{ visibility: "hidden" }}
          >
            <a className="cursor-pointer" href="/sitemap.xml">
              نقشه سایت
            </a>
          </div>
          {themeConfig.enamad_config ||
          themeConfig.samandehi_config ||
          themeConfig.virtual_business_association_config ? (
            <div className="d-flex flex-column order-1 order-lg-2">
              <div className="d-flex align-items-center justify-content-center mb-4">
                <div style={{ width: 20 }}>
                  <LazyImage
                    className="w-100 h-100 object-fit-cover"
                    alt="item"
                    src={`/images/cert.svg`}
                  />
                </div>
                <span className="mx-2 u-fontWeightBold">گواهینامه</span>
                <div style={{ width: 20 }}>
                  <LazyImage
                    className="w-100 h-100 object-fit-cover"
                    alt="item"
                    src={`/images/cert.svg`}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <style
                  dangerouslySetInnerHTML={{
                    __html: `
                .parent a img {
                  width : 120px ;
                  height : 120px ;
                  object-fit : contain;
                }
                .virtual img {
                  width : 120px ;
                  height : 120px ;
                  object-fit : contain;
                }
              `,
                  }}
                ></style>
                {themeConfig.enamad_config && (
                  <div
                    className={`${
                      ((themeConfig.enamad_config &&
                        themeConfig.samandehi_config) ||
                        (themeConfig.enamad_config &&
                          themeConfig.virtual_business_association_config)) &&
                      " ml-2 "
                    }`}
                  >
                    <div
                      className="w-100 h-100 parent"
                      dangerouslySetInnerHTML={{
                        __html: `${themeConfig.enamad_config}`,
                      }}
                    ></div>
                  </div>
                )}
                {themeConfig.samandehi_config && (
                  <div
                    className={`${
                      themeConfig.samandehi_config &&
                      themeConfig.virtual_business_association_config &&
                      " ml-2 "
                    }`}
                  >
                    <div
                      className="w-100 h-100 virtual"
                      dangerouslySetInnerHTML={{
                        __html: `${themeConfig.samandehi_config}`,
                      }}
                    ></div>
                  </div>
                )}
                {themeConfig.virtual_business_association_config && (
                  <div>
                    <div
                      className="w-100 h-100 virtual"
                      dangerouslySetInnerHTML={{
                        __html: `${themeConfig.virtual_business_association_config}`,
                      }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          ) : null}
          <div
            className={`d-flex align-items-center flex-lg-row-reverse flex-1 ${
              themeConfig.enamad_config ||
              themeConfig.samandehi_config ||
              themeConfig.virtual_business_association_config
                ? "pt-3 "
                : ""
            }  order-2 order-lg-3 justify-content-center justify-content-lg-start`}
          >
            {Boolean(business.linkedin_url) && (
              <a
                className="mx-1 cursor-pointer"
                href={business.linkedin_url}
                target="blank"
              >
                <LinkedInIcon />
              </a>
            )}
            {Boolean(business.telegram_url) && (
              <a
                className="mx-1 cursor-pointer"
                href={business.telegram_url}
                target="blank"
              >
                <TelegramIcon />
              </a>
            )}
            {Boolean(business.whatsapp_url) && (
              <a
                className="mx-1 cursor-pointer"
                href={business.whatsapp_url}
                target="blank"
              >
                <WhatsAppIcon />
              </a>
            )}
            {Boolean(business.aparat_url) && (
              <a
                className="mx-1 cursor-pointer"
                href={business.aparat_url}
                target="blank"
                style={{ width: 24, height: 30 }}
              >
                <LazyImage src={`/images/aparat.svg`} />
              </a>
            )}
            {Boolean(business.youtube_url) && (
              <a
                className="mx-1 cursor-pointer"
                href={business.youtube_url}
                target="blank"
              >
                <YouTubeIcon />
              </a>
            )}
            {Boolean(business.facebook_url) && (
              <a
                className="mx-1 cursor-pointer"
                href={business.facebook_url}
                target="blank"
              >
                <FacebookIcon />
              </a>
            )}
            {Boolean(business.twitter_url) && (
              <a
                className="mx-1 cursor-pointer"
                href={business.twitter_url}
                target="blank"
              >
                <TwitterIcon />
              </a>
            )}
          </div>
        </div>
      ) : null}
    </Paper>
  );
}

const mapStateToProps = createStructuredSelector({
    business: makeSelectBusiness(),
    themeConfig: makeSelectBusinessThemeConfig(),
    urlPrefix: makeSelectUrlPrefix(),
    themeColor: makeSelectBusinessThemeColor(),
    pluginData: makeSelectPlugin(PWA_PLUGIN),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Footer1);
