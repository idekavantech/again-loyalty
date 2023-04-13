import React, { memo } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import Paper from "@material-ui/core/Paper";
import LazyImage from "@saas/components/LazyImage";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TelegramIcon from "@material-ui/icons/Telegram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import { useRouter } from "next/router";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeConfig,
} from "@saas/stores/business/selector";
import {
  makeSelectPlugin,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import { PWA_PLUGIN } from "@saas/utils/constants/plugins";
import { useResponsive } from "@saas/utils/hooks/useResponsive";


function Footer1({ business, themeConfig, isMobile, pluginData }) {
  const router = useRouter();
  const { maxWidth360 } = useResponsive();
  const iphone5Matches = typeof isMobile === "boolean" ? isMobile : maxWidth360;
  const numbers = business.more_phone_numbers.split("\n");
  numbers.push(business.phone_zero_starts);
  if (iphone5Matches) {
    return (
      <Paper elevation={1}>
        <div
          className="d-flex flex-column align-items-center p-3"
          style={{ backgroundColor: "#f5f7f8" }}
        >
          <div className="u-fontVeryLarge u-fontWeightBold d-flex col-12 px-0 justify-content-center">
            {numbers.filter((number) => number !== "").length !== 0 ? (
              <span>Support contact number</span>
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
                    <a href={`tel:${number}`} className="mx-2 mb-4">
                      {englishNumberToPersianNumber(number)}
                    </a>
                  )
              )}
          </div>
          <div
            className={`flex-column ${
              business.instagram_url
                ? "justify-content-between "
                : "flex-row-reverse justify-content-center"
            } d-flex align-items-center  col-12 px-0`}
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
              <a className="cursor-pointer" href={"/sitemap.xml"}>
                Sitemap
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
                  <span className="mx-2 u-fontWeightBold">Certificate</span>
                  <div style={{ width: 20 }}>
                    <LazyImage
                      className="w-100 h-100 object-fit-cover"
                      alt="item"
                      src={`/images/cert.svg`}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center my-4">
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
              } order-2 justify-content-center`}
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
            <span>Support contact number</span>
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
            <a className="cursor-pointer" href={"/sitemap.xml"}>
              Sitemap
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
                <span className="mx-2 u-fontWeightBold">Certificate</span>
                <div style={{ width: 20 }}>
                  <LazyImage
                    className="w-100 h-100 object-fit-cover"
                    alt="item"
                    src={`/images/cert.svg`}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center my-4 my-lg-0">
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
    pluginData: makeSelectPlugin(PWA_PLUGIN),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Footer1);
