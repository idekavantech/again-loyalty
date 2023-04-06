import React, { memo } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import LazyImage from "@saas/components/LazyImage";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TelegramIcon from "@material-ui/icons/Telegram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import PhoneEnabledIcon from "@material-ui/icons/PhoneEnabled";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeConfig,
  makeSelectIsBranch,
} from "@saas/stores/business/selector";
import {
  makeSelectPlugin,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import { PWA_PLUGIN } from "@saas/utils/constants/plugins";
import { FOOTER_COMIUNICATION_VISIBILITY } from "@saas/utils/constants/footerConstants";
import useTheme from "@material-ui/core/styles/useTheme";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import Tooltip from "@material-ui/core/Tooltip";

function Footer5({
  business,
  themeConfig,
  isMobile,
  customization,
  content = {},
}) {
  const {
    display: {
      [FOOTER_COMIUNICATION_VISIBILITY]:
        _FOOTER_COMIUNICATION_VISIBILITY = true,
      hide_namad = false,
    } = {},
  } = content;
  const {
    background: {
      background_type = "color",
      background_image,
      opacity,
      background_color,
      use_theme_color,
      text_color,
    } = {},
    logo: { use_default_logo, logo_url } = {},
  } = customization;
  const theme = useTheme();
  const icon_and_text_color = use_theme_color
    ? theme.palette.secondary.main
    : text_color;
  const { maxWidth768 } = useResponsive();
  const mobileMatches = typeof isMobile === "boolean" ? isMobile : maxWidth768;

  const hasNamad =
    !hide_namad &&
    (Boolean(themeConfig?.enamad_config) ||
      Boolean(themeConfig?.samandehi_config) ||
      Boolean(themeConfig?.virtual_business_association_config));

  const truncate = (input, length) => {
    if (input.length > length) {
      return input.substring(0, length) + "...";
    }
    return input;
  };

  return (
    <div className={"position-relative"}>
      <div
        style={{
          height: "100%",
          backgroundColor:
            background_type === "color" ? background_color : "transparent",
        }}
        className="position-absolute left-0 u-top-0 w-100 d-block"
      >
        {background_image && background_type === "image" && (
          <LazyImage
            src={background_image}
            style={{ opacity: opacity / 100 }}
          />
        )}
      </div>

      <div className="w-100">
        <div
          className={`col-12 col-lg-11 w-100 position-relative ${
            mobileMatches ? "p-2" : "py-5"
          }`}
          style={{ margin: "0 auto" }}
        >
          <div
            className={`d-flex flex-wrap justify-content-between align-items-center ${
              mobileMatches ? "flex-col" : "pt-2"
            }`}
            style={{ borderTop: "2px solid #5151512e" }}
          >
            <div
              className={`col-12 col-lg-2 d-flex justify-content-center ${
                mobileMatches ? "p-3 py-5 w-75 mt-3" : "pl-2"
              }`}
              style={
                mobileMatches
                  ? { borderBottom: "0.5px solid #5151512e" }
                  : { height: 60 }
              }
            >
              <LazyImage
                src={use_default_logo ? business.icon_image_url : logo_url}
                height={56}
                width={"auto"}
                alt={business.revised_title}
              />
            </div>
            {!mobileMatches ? (
              <div
                style={{ backgroundColor: "#5151512e", height: 60, width: 0.5 }}
              />
            ) : null}

            <div
              className={`col-12 col-lg-3 ${
                mobileMatches ? "p-3 py-5 w-75" : `py-1`
              }`}
              style={
                mobileMatches
                  ? { borderBottom: "2px solid #5151512e" }
                  : { height: 60 }
              }
            >
              <div
                className={
                  "d-flex align-items-start justify-content-center w-100"
                }
              >
                <LocationOnOutlinedIcon
                  style={{
                    color: icon_and_text_color,
                    height: 30,
                  }}
                  className="ml-2 mt-2"
                />
                {business.address ? (
                  business.address.length > 90 ? (
                    <Tooltip
                      placement="bottom"
                      PopperProps={{
                        disablePortal: true,
                      }}
                      arrow
                      title={<p className="my-2">{business.address}</p>}
                    >
                      <address
                        style={{ color: icon_and_text_color }}
                        className="my-3 text-justify"
                      >
                        آدرس: {truncate(business.address, 90)}
                      </address>
                    </Tooltip>
                  ) : (
                    <address
                      style={{ color: icon_and_text_color }}
                      className="my-3 text-justify"
                    >
                      آدرس: {business.address}
                    </address>
                  )
                ) : (
                  <div
                    style={{ color: icon_and_text_color }}
                    className="u-text-black u-fontLarge-r mt-5"
                  >
                    آدرس: آدرس و موقعیت کسب و کار شما
                  </div>
                )}
              </div>
            </div>
            {!mobileMatches ? (
              <div
                style={{ backgroundColor: "#5151512e", height: 60, width: 0.5 }}
              />
            ) : null}
            {business.phone_zero_starts ? (
              <div
                className={`col-12 col-lg-2 d-flex align-items-center ${
                  mobileMatches ? "p-3 py-5 w-75" : `py-1`
                }`}
                style={
                  mobileMatches
                    ? { borderBottom: "2px solid #5151512e" }
                    : { height: 60 }
                }
              >
                <div
                  className={
                    "d-flex align-items-center justify-content-center w-100 u-fontLarge"
                  }
                  style={{ color: icon_and_text_color }}
                >
                  <PhoneEnabledIcon
                    style={{
                      height: 30,
                    }}
                    className="ml-2"
                  />
                  {englishNumberToPersianNumber(business.phone_zero_starts)}
                </div>
              </div>
            ) : null}
            {!mobileMatches && business.phone_zero_starts ? (
              <div
                style={{ backgroundColor: "#5151512e", height: 60, width: 0.5 }}
              />
            ) : null}

            {_FOOTER_COMIUNICATION_VISIBILITY ? (
              <div
                className={`col-12 col-lg-2 ${
                  mobileMatches
                    ? "p-3 py-5 w-75"
                    : `${!hasNamad ? "pl-0" : ""} py-1`
                }`}
                style={
                  mobileMatches ? { borderBottom: "2px solid #5151512e" } : {}
                }
              >
                <div className="d-flex align-items-center w-100 h-100 justify-content-center">
                  {Boolean(business?.linkedin_url) && (
                    <a
                      className="ml-2 cursor-pointer"
                      href={business?.linkedin_url}
                      target="blank"
                      style={{ height: 25 }}
                    >
                      <LinkedInIcon
                        style={{
                          color: icon_and_text_color,
                          height: 25,
                        }}
                      />
                    </a>
                  )}

                  {Boolean(business?.telegram_url) && (
                    <a
                      className="ml-2 cursor-pointer"
                      href={business?.telegram_url}
                      target="blank"
                      style={{ height: 25 }}
                    >
                      <TelegramIcon
                        style={{
                          color: icon_and_text_color,
                          height: 25,
                        }}
                      />
                    </a>
                  )}
                  {Boolean(business?.instagram_url) && (
                    <a
                      className="ml-2 cursor-pointer"
                      href={business?.instagram_url}
                      target="blank"
                      style={{ height: 25 }}
                    >
                      <InstagramIcon
                        style={{
                          color: icon_and_text_color,
                          height: 25,
                        }}
                      />
                    </a>
                  )}
                  {Boolean(business?.whatsapp_url) && (
                    <a
                      className="ml-2 cursor-pointer"
                      href={business?.whatsapp_url}
                      target="blank"
                      style={{ height: 25 }}
                    >
                      <WhatsAppIcon
                        style={{
                          color: icon_and_text_color,
                          height: 25,
                        }}
                      />
                    </a>
                  )}

                  {Boolean(business?.youtube_url) && (
                    <a
                      className="ml-2 cursor-pointer"
                      href={business?.youtube_url}
                      target="blank"
                      style={{ height: 25 }}
                    >
                      <YouTubeIcon
                        style={{
                          color: icon_and_text_color,
                          height: 25,
                        }}
                      />
                    </a>
                  )}
                  {Boolean(business?.twitter_url) && (
                    <a
                      className="ml-2 cursor-pointer"
                      href={business?.twitter_url}
                      target="blank"
                      style={{ height: 25 }}
                    >
                      <TwitterIcon
                        style={{
                          color: icon_and_text_color,
                          height: 25,
                        }}
                      />
                    </a>
                  )}
                  {Boolean(business?.facebook_url) && (
                    <a
                      className="mx-1 cursor-pointer"
                      href={business?.facebook_url}
                      target="blank"
                      style={{ height: 25 }}
                    >
                      <FacebookIcon
                        style={{
                          color: icon_and_text_color,
                          height: 25,
                        }}
                      />
                    </a>
                  )}
                </div>
              </div>
            ) : null}
            {hasNamad ? (
              <>
                {!mobileMatches && _FOOTER_COMIUNICATION_VISIBILITY ? (
                  <div
                    style={{
                      backgroundColor: "#5151512e",
                      height: 60,
                      width: 0.5,
                    }}
                  />
                ) : null}
                <div
                  className={`col-12 col-lg-2 ${
                    mobileMatches ? "p-3 py-5 w-75" : `pl-0 py-1`
                  }`}
                >
                  <div
                    className="d-flex justify-content-center align-items-center py-4"
                    style={{
                      position: "relative",
                    }}
                  >
                    <style
                      dangerouslySetInnerHTML={{
                        __html: `
                  .parent a img {
                    width: 42px ;
                    height: 42px ;
                    object-fit : contain;
                  }
                  .virtual img {
                    width : 42px ;
                    height : 42px ;
                    object-fit : contain;
                  }
                `,
                      }}
                    ></style>
                    {themeConfig?.enamad_config && (
                      <div>
                        <div
                          className="parent"
                          dangerouslySetInnerHTML={{
                            __html: `${themeConfig?.enamad_config}`,
                          }}
                        ></div>
                      </div>
                    )}
                    {themeConfig?.samandehi_config && (
                      <div
                        className={`
                  ${
                    themeConfig?.samandehi_config &&
                    themeConfig?.virtual_business_association_config &&
                    " ml-2 "
                  }`}
                      >
                        <div
                          className="virtual"
                          dangerouslySetInnerHTML={{
                            __html: `${themeConfig?.samandehi_config}`,
                          }}
                        ></div>
                      </div>
                    )}
                    {themeConfig?.virtual_business_association_config && (
                      <div>
                        <div
                          className="virtual"
                          dangerouslySetInnerHTML={{
                            __html: `${themeConfig?.virtual_business_association_config}`,
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
  themeConfig: makeSelectBusinessThemeConfig(),
  urlPrefix: makeSelectUrlPrefix(),
  pluginData: makeSelectPlugin(PWA_PLUGIN),
  isBranch: makeSelectIsBranch(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Footer5);
