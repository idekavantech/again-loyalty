import { useEffect, useState } from "react";
import useTheme from "@material-ui/core/styles/useTheme";
import Button from "@material-ui/core/Button";
import createTheme from "@material-ui/core/styles/createTheme";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { INSTAGRAM, LINKED_IN, WHATSAPP } from "@saas/icons";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import {
  defaultNavigationMenus,
  TOP_PAGE_HEADER_MENU,
} from "@saas/utils/constants/navigationMenus";
import KeyboardArrowDownRoundedIcon from "@material-ui/icons/KeyboardArrowDownRounded";
import SectionLink from "../SectionRenderer/components/SectionLink";
import TelegramIcon from "@material-ui/icons/Telegram";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { useRouter } from "next/router";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { isUrlExternal } from "@saas/utils/helpers/isUrlExternal";
import {
  HAS_EXTERNAL_LINK,
  HAS_INTERNAL_LINK,
} from "@saas/utils/constants/builderConstants";

export function TopPageHeaderComponent({
  customization,
  content,
  business,
  urlPrefix,
  isMobile,
  isEditMode,
}) {
  const {
    buttons: { variant, link_type, internal_link, external_link, title },
    menus: {},
    socialNetworks: { instagram, whats_app, linkdin, telegram },
  } = content;

  const {
    display: {
      is_date = true,
      is_time = true,
      show_social_media = true,
      show_menus = true,
      show_button = true,
      title_color = true,
      button_color = true,
      is_home_page,
      is_allPage,
    },
  } = customization;

  let today = new Date().toLocaleDateString("fa-IR");
  let time = new Date().toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const {
    instagram_url: instagramUrl,
    telegram_url: telegramUrl,
    linkedin_url: linkedinUrl,
    whatsapp_url: whatsappUrl,
  } = business;
  const router = useRouter();
  const theme = useTheme();
  const [topPageMenus, setTopPageMenus] = useState(null);
  const { maxWidth768 } = useResponsive();
  const _isMobile = typeof isMobile === "boolean" ? isMobile : maxWidth768;
  const businessAddress = business?.get_vitrin_absolute_url;

  useEffect(() => {
    if (business?.theme_config?.navigation_menus?.[TOP_PAGE_HEADER_MENU]) {
      setTopPageMenus(
        business.theme_config.navigation_menus[TOP_PAGE_HEADER_MENU]
      );
    } else {
      setTopPageMenus(defaultNavigationMenus(urlPrefix)[TOP_PAGE_HEADER_MENU]);
    }
  }, [business.theme_config]);
  const ThemeColor = createTheme({
    palette: {
      primary: {
        main: button_color,
      },
    },
  });

  return (
    <div
      className={`w-100  ${
        !_isMobile
          ? is_allPage || isEditMode
            ? "d-flex"
            : (is_home_page &&
                router.asPath.split("?")[0] == `${urlPrefix}/`) ||
              isEditMode
            ? "d-flex"
            : "d-none"
          : "d-none"
      } justify-content-between align-items-center`}
      style={{
        height: 40,
        padding: "4px 12px",
        boxSizing: "border-box",
      }}
    >
      <div className=" d-flex justify-content-between align-items-center">
        {show_button && (
          <SectionLink
            style={{ padding: 0, margin: 0 }}
            href={
              link_type === HAS_INTERNAL_LINK ? internal_link : external_link
            }
            isExternal={link_type === HAS_EXTERNAL_LINK}
            businessAddress={businessAddress}
          >
            <MuiThemeProvider theme={ThemeColor}>
              <Button
                color="primary"
                variant={variant}
                style={{
                  height: 32,
                  minWidth: 42,
                  borderRadius: 4,
                  padding: "8px 4px 4px",
                  fontWeight: 600,
                  boxShadow: "none",
                  color: title_color ? title_color : "#000000",
                  fontFamily: "IranSans",
                  textTransform: "initial",
                  fontSize: 14,
                  marginLeft: 7,
                }}
              >
                {title}
              </Button>
            </MuiThemeProvider>
          </SectionLink>
        )}

        {show_menus && (
          <div className=" d-flex justify-content-between align-items-center">
            {topPageMenus &&
              topPageMenus.links.map(
                (item) =>
                  item.is_active && (
                    <div className="d-flex">
                      <SectionLink
                        href={item.link}
                        isExternal={isUrlExternal(item.link)}
                        businessAddress={businessAddress}
                      >
                        <div
                          className="d-flex align-items-center px-2 u-cursor-pointer header_4_menu_item_hover"
                          style={{
                            color: theme.palette.text.disabled,
                            fontSize: 13,
                            textAlign: "center",
                          }}
                        >
                          <div>{item.title}</div>
                          {item.links ? (
                            <div className="d-flex">
                              <KeyboardArrowDownRoundedIcon
                                style={{ fontSize: 20 }}
                              />
                            </div>
                          ) : null}
                        </div>
                      </SectionLink>
                    </div>
                  )
              )}
          </div>
        )}
      </div>{" "}
      <div className=" d-flex justify-content-between align-items-center">
        {show_social_media && linkedinUrl && linkdin && (
          <a
            target="blank"
            className="d-flex justify-content-center align-items-center"
            href={linkedinUrl}
          >
            <LinkedInIcon
              style={{
                width: 20,
                height: 20,
                margin: "0 5px",
                color: "#5C5F62",
              }}
              icon={LINKED_IN}
            />
          </a>
        )}
        {show_social_media && whatsappUrl && whats_app && (
          <a
            target="blank"
            className="d-flex justify-content-center align-items-center"
            href={whatsappUrl}
          >
            <WhatsAppIcon
              icon={WHATSAPP}
              style={{
                color: "#5C5F62",
                width: 20,
                height: 20,
                margin: "0 5px",
              }}
            />
          </a>
        )}
        {show_social_media && telegramUrl && telegram && (
          <a
            target="blank"
            className="d-flex justify-content-center align-items-center"
            href={telegramUrl}
          >
            <TelegramIcon
              style={{
                height: 20,
                width: 20,
                margin: "0 5px",
                color: "#5C5F62",
              }}
            />{" "}
          </a>
        )}
        {show_social_media && instagramUrl && instagram && (
          <a
            target="blank"
            className="d-flex justify-content-center align-items-center"
            href={instagramUrl}
          >
            <InstagramIcon
              style={{
                width: 20,
                height: 20,
                margin: "0 5px",
                color: "#5C5F62",
              }}
              icon={INSTAGRAM}
              color="#5C5F62"
            />
          </a>
        )}
        <span
          style={{
            paddingRight: is_date || is_time ? 16 : 0,
            borderRight:
              show_social_media &&
              (is_date || is_time) &&
              (instagram || telegram || whats_app || linkdin)
                ? "1px solid #E4E6E7"
                : "none",
            fontSize: 14,
            fontWeight: 600,
            color: "#6D7175",
            marginRight: is_date || is_time ? 9 : 0,
            direction: "rtl",
          }}
        >
          {is_date && <span>{today}</span>}
          {is_time && <span style={{ marginLeft: 5 }}>{time}</span>}
        </span>
      </div>
    </div>
  );
}
