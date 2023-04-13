import React, { memo, useEffect, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import Paper from "@material-ui/core/Paper";
import LazyImage from "@saas/components/LazyImage";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TelegramIcon from "@material-ui/icons/Telegram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import Divider from "@material-ui/core/Divider";
import { useRouter } from "next/router";
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
import { MAIN_FOOTER_NAVIGATION_MENU } from "@saas/utils/constants/navigationMenus";
import {
  FOOTER_COMIUNICATION_VISIBILITY,
  FOOTER_CONTACT_US_VISIBILITY,
  FOOTER_LOGO_VISIBILITY,
  FOOTER_MENU_VISIBILITY,
  FOOTER_TITLE_VISIBILITY,
} from "@saas/utils/constants/footerConstants";
import useTheme from "@material-ui/core/styles/useTheme";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function Footer4({
  business,
  themeConfig,
  isMobile,
  customization,
  content = {},
}) {
  const {
    display: {
      [FOOTER_MENU_VISIBILITY]: _FOOTER_MENU_VISIBILITY = true,
      [FOOTER_LOGO_VISIBILITY]: _FOOTER_LOGO_VISIBILITY = true,
      [FOOTER_TITLE_VISIBILITY]: _FOOTER_TITLE_VISIBILITY = true,
      [FOOTER_CONTACT_US_VISIBILITY]: _FOOTER_CONTACT_US_VISIBILITY = true,
      [FOOTER_COMIUNICATION_VISIBILITY]:
        _FOOTER_COMIUNICATION_VISIBILITY = true,
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
  } = customization;
  const router = useRouter();
  const theme = useTheme();
  const icon_and_text_color = use_theme_color
    ? theme.palette.secondary.main
    : text_color;
  const { maxWidth768 } = useResponsive();
  const mobileMatches = typeof isMobile === "boolean" ? isMobile : maxWidth768;
  const numbers = business.more_phone_numbers.split("\n");
  numbers.push(business.phone_zero_starts);
  const [footerMenu, setFooterMenu] = useState(null);
  useEffect(() => {
    if (themeConfig?.navigation_menus?.[MAIN_FOOTER_NAVIGATION_MENU]) {
      setFooterMenu(
        themeConfig?.navigation_menus?.[MAIN_FOOTER_NAVIGATION_MENU]
      );
    }
  }, [themeConfig]);

  if (mobileMatches) {
    return (
      <Paper elevation={1} className="position-relative">
        {(_FOOTER_COMIUNICATION_VISIBILITY ||
          _FOOTER_CONTACT_US_VISIBILITY ||
          _FOOTER_LOGO_VISIBILITY ||
          _FOOTER_TITLE_VISIBILITY ||
          _FOOTER_MENU_VISIBILITY) && (
          <>
            <div
              style={{
                height: "100%",
                backgroundColor:
                  background_type === "color"
                    ? background_color
                    : "transparent",
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
            {(_FOOTER_COMIUNICATION_VISIBILITY ||
              _FOOTER_CONTACT_US_VISIBILITY ||
              _FOOTER_LOGO_VISIBILITY ||
              _FOOTER_TITLE_VISIBILITY) && (
              <>
                <div
                  className="d-flex justify-content-center flex-column"
                  style={{
                    paddingTop: "32px",

                    paddingBottom: `${
                      !_FOOTER_MENU_VISIBILITY ? "32px" : "0px"
                    }`,
                  }}
                >
                  {(_FOOTER_LOGO_VISIBILITY || _FOOTER_TITLE_VISIBILITY) && (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        marginBottom: `${
                          _FOOTER_COMIUNICATION_VISIBILITY ||
                          _FOOTER_CONTACT_US_VISIBILITY
                            ? "10px"
                            : "0px"
                        }`,
                      }}
                    >
                      {_FOOTER_TITLE_VISIBILITY && (
                        <div
                          className="mr-2"
                          style={{
                            fontWeight: 600,
                            fontSize: 20,
                            zIndex: 100,
                            color: icon_and_text_color,
                          }}
                        >
                          {business.revised_title}
                        </div>
                      )}
                    </div>
                  )}

                  {_FOOTER_COMIUNICATION_VISIBILITY && (
                    <div
                      className="d-flex justify-content-center"
                      style={{
                        zIndex: 100,
                        marginBottom: _FOOTER_CONTACT_US_VISIBILITY
                          ? "20px"
                          : "",
                      }}
                    >
                      {Boolean(business.linkedin_url) && (
                        <a
                          className="ml-2 cursor-pointer"
                          href={business.linkedin_url}
                          target="blank"
                        >
                          <LinkedInIcon
                            style={{
                              color: icon_and_text_color,
                            }}
                          />
                        </a>
                      )}
                      {Boolean(business.whatsapp_url) && (
                        <a
                          className="ml-2 cursor-pointer"
                          href={business.whatsapp_url}
                          target="blank"
                        >
                          <WhatsAppIcon
                            style={{
                              color: icon_and_text_color,
                            }}
                          />
                        </a>
                      )}

                      {Boolean(business.telegram_url) && (
                        <a
                          className="ml-2 cursor-pointer"
                          href={business.telegram_url}
                          target="blank"
                        >
                          <TelegramIcon
                            style={{
                              color: icon_and_text_color,
                            }}
                          />
                        </a>
                      )}
                      {Boolean(business.instagram_url) && (
                        <a
                          className="ml-2 cursor-pointer"
                          href={business.instagram_url}
                          target="blank"
                        >
                          <InstagramIcon
                            style={{
                              color: icon_and_text_color,
                            }}
                          />
                        </a>
                      )}
                      {Boolean(business.youtube_url) && (
                        <a
                          className="ml-2 cursor-pointer"
                          href={business.youtube_url}
                          target="blank"
                        >
                          <YouTubeIcon
                            style={{
                              color: icon_and_text_color,
                            }}
                          />
                        </a>
                      )}
                      {Boolean(business.twitter_url) && (
                        <a
                          className="ml-2 cursor-pointer"
                          href={business.twitter_url}
                          target="blank"
                        >
                          <TwitterIcon
                            style={{
                              color: icon_and_text_color,
                            }}
                          />
                        </a>
                      )}
                      {Boolean(business.facebook_url) && (
                        <a
                          className="mx-1 cursor-pointer"
                          href={business.facebook_url}
                          target="blank"
                        >
                          <FacebookIcon
                            style={{
                              color: icon_and_text_color,
                            }}
                          />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
            {(_FOOTER_LOGO_VISIBILITY ||
              _FOOTER_TITLE_VISIBILITY ||
              _FOOTER_CONTACT_US_VISIBILITY ||
              _FOOTER_COMIUNICATION_VISIBILITY) &&
              _FOOTER_MENU_VISIBILITY && (
                <Divider
                  variant="fullWidth"
                  style={{
                    margin: "32px 16px 0 16px",
                    backgroundColor: "#8C9196",
                    zIndex: 100,
                    position: "relative",
                  }}
                />
              )}
            {_FOOTER_MENU_VISIBILITY && (
              <div
                className="d-flex justify-content-between flex-wrap"
                style={{
                  margin: "32px auto 0px auto",
                  width: "90%",
                  zIndex: 100,
                }}
              >
                {footerMenu?.links?.slice(0, 5).map((menu) => (
                  <div
                    key={menu.id}
                    onClick={() => router.push(menu?.link)}
                    className="cursor-pointer"
                    style={{
                      fontWeight: 600,
                      fontSize: 16,
                      width: "50%",
                      marginBottom: 32,
                      paddingRight: 40,
                      textAlign: "right",
                      zIndex: 100,
                    }}
                  >
                    {menu?.title}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {Boolean(themeConfig?.enamad_config) ||
        Boolean(themeConfig?.samandehi_config) ||
        Boolean(themeConfig?.virtual_business_association_config) ? (
          <div
            className="d-flex justify-content-center align-items-center py-4"
            style={{
              background: "#FAFBFB",
              paddingRight: 40,
              paddingLeft: 40,
              position: "relative",
            }}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  .parent a img {
                    width : 42px ;
                    height :42px ;
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
            <span
              style={{
                color: icon_and_text_color,
                fontWeight: 600,
                fontSize: "15px",
                zIndex: 100,
                whiteSpace: "nowrap",
              }}
            >
              Electronic symbols
            </span>
            <span
              className="mx-5"
              style={{
                fontSize: 13,
                borderLeft: "1px solid #8C9196",
                height: 24,
                zIndex: 100,
              }}
            ></span>
            {themeConfig?.enamad_config && (
              <div
                className={`
                  ${
                    ((themeConfig?.enamad_config &&
                      themeConfig?.samandehi_config) ||
                      (themeConfig?.enamad_config &&
                        themeConfig?.virtual_business_association_config)) &&
                    " ml-2 "
                  }`}
              >
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
        ) : null}
      </Paper>
    );
  }

  return (
    <Paper elevation={1} className="position-relative">
      {(_FOOTER_COMIUNICATION_VISIBILITY ||
        _FOOTER_CONTACT_US_VISIBILITY ||
        _FOOTER_LOGO_VISIBILITY ||
        _FOOTER_TITLE_VISIBILITY ||
        _FOOTER_MENU_VISIBILITY) && (
        <>
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

          <div
            style={{
              padding: `${
                _FOOTER_LOGO_VISIBILITY ||
                _FOOTER_TITLE_VISIBILITY ||
                _FOOTER_CONTACT_US_VISIBILITY ||
                _FOOTER_COMIUNICATION_VISIBILITY
                  ? "32px 64px 26px 64px"
                  : null
              }`,
            }}
          >
            <div
              className={`${
                _FOOTER_CONTACT_US_VISIBILITY &&
                _FOOTER_COMIUNICATION_VISIBILITY
                  ? "flex-row"
                  : "flex-row-reverse"
              } ${
                !_FOOTER_CONTACT_US_VISIBILITY &&
                !_FOOTER_COMIUNICATION_VISIBILITY
                  ? "justify-content-center"
                  : "justify-content-between"
              } d-flex align-items-center`}
            >
              {_FOOTER_COMIUNICATION_VISIBILITY && (
                <div
                  className="d-flex align-items-center"
                  style={{
                    zIndex: 100,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: 16,
                      color: icon_and_text_color,
                    }}
                  >
                    Communication with us
                  </span>
                  <span
                    className="mx-2"
                    style={{
                      fontSize: 13,
                      borderLeft: "1px solid #8C9196",
                      height: 24,
                    }}
                  ></span>
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
              )}
              {/* <div
                className="d-flex align-items-center position-absolute"
                style={{
                  left: `${
                    !_FOOTER_CONTACT_US_VISIBILITY ||
                    !_FOOTER_COMIUNICATION_VISIBILITY
                      ? "0px"
                      : "50%"
                  }`,
                  right: `${
                    !_FOOTER_CONTACT_US_VISIBILITY ||
                    !_FOOTER_COMIUNICATION_VISIBILITY
                      ? "64px"
                      : ""
                  }`,
                  transform: `${
                    !_FOOTER_CONTACT_US_VISIBILITY ||
                    !_FOOTER_COMIUNICATION_VISIBILITY
                      ? ""
                      : "translate(-50%, 0%)"
                  }`,
                }}
              >
                {_FOOTER_LOGO_VISIBILITY && (
                  <LazyImage
                    src={business.icon_image_url}
                    height={56}
                    width={"auto"}
                    alt={business.revised_title}
                  />
                )}
                {_FOOTER_TITLE_VISIBILITY && (
                  <div
                    className="u-fontVeryLarge mr-2"
                    style={{
                      fontWeight: 600,
                      fontSize: 28,
                      zIndex: 100,
                      whiteSpace: "nowrap",
                      color: icon_and_text_color,
                    }}
                  >
                    {business.revised_title}
                  </div>
                )}
              </div> */}
              {_FOOTER_CONTACT_US_VISIBILITY && (
                <div style={{ zIndex: 100 }}>
                  <span
                    style={{
                      fontWeight: 600,
                      color: icon_and_text_color,
                    }}
                    className="ml-1"
                  >
                    contact us:
                  </span>
                  <span
                    style={{
                      fontWeight: 600,
                      color: icon_and_text_color,
                    }}
                  >
                    {englishNumberToPersianNumber(business.phone_zero_starts)}
                  </span>
                </div>
              )}
            </div>

            {(_FOOTER_LOGO_VISIBILITY ||
              _FOOTER_TITLE_VISIBILITY ||
              _FOOTER_CONTACT_US_VISIBILITY ||
              _FOOTER_COMIUNICATION_VISIBILITY) &&
              _FOOTER_MENU_VISIBILITY && (
                <div
                  style={{
                    margin: "32px 0",
                  }}
                >
                  <Divider
                    variant="fullWidth"
                    style={{
                      margin: "32px 0",
                      backgroundColor: icon_and_text_color,
                      zIndex: 100,
                      position: "relative",
                    }}
                  />
                </div>
              )}
            {_FOOTER_MENU_VISIBILITY && (
              <>
                <div
                  className="d-flex justify-content-center"
                  style={{
                    margin: "0 auto",
                    width: "60%",
                    zIndex: 100,
                  }}
                >
                  {footerMenu?.links.slice(0, 5).map((menu, i) => (
                    <a
                      key={menu.id}
                      href={
                        menu?.link.charAt(0) === "/"
                          ? menu?.link.slice(1)
                          : menu?.link
                      }
                      className="cursor-pointer"
                      style={{
                        fontWeight: 600,
                        fontSize: 16,
                        zIndex: 100,
                        whiteSpace: "nowrap",
                        paddingLeft: `${
                          i === footerMenu?.links.length - 1 ? "0px" : "64px"
                        }`,
                      }}
                    >
                      {menu.title}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}

      {Boolean(themeConfig?.enamad_config) ||
      Boolean(themeConfig?.samandehi_config) ||
      Boolean(themeConfig?.virtual_business_association_config) ? (
        <div
          className="d-flex justify-content-center align-items-center py-4"
          style={{
            background: "#FAFBFB",
            paddingRight: 40,
            paddingLeft: 40,
            position: "relative",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
                  .parent a img {
                    width : 42px ;
                    height :42px ;
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
          <span
            style={{
              color: icon_and_text_color,
              fontWeight: 600,
              fontSize: "15px",
              zIndex: 100,
              whiteSpace: "nowrap",
            }}
          >
            Electronic symbols
          </span>
          <span
            className="mx-5"
            style={{
              fontSize: 13,
              borderLeft: "1px solid #8C9196",
              height: 24,
              zIndex: 100,
            }}
          ></span>
          {themeConfig?.enamad_config && (
            <div
              className={`
                  ${
                    ((themeConfig?.enamad_config &&
                      themeConfig?.samandehi_config) ||
                      (themeConfig?.enamad_config &&
                        themeConfig?.virtual_business_association_config)) &&
                    " ml-2 "
                  }`}
            >
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
      ) : null}
    </Paper>
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

export default compose(withConnect, memo)(Footer4);
