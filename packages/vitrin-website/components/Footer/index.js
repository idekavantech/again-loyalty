/* eslint-disable @next/next/no-img-element */
import {
  YOUTUBE_ICON,
  APARAT_ICON,
  INSTAGRAM_ICON,
  TELEGRAM_ICON,
  WHATSUP_ICON,
  LINKDIN_ICON,
  ADDRESS,
  PHONE,
} from "utils/constants/FOOTER";
import Link from "next/link";
import Image from "next/image";
import { footerMenus } from "./constants";
import MenuItems from "components/MenuItems";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const socialNetworks = [
  {
    icon: "/images/twitter.svg",
    link: "https://twitter.com/vitrin_me",
    type: "twitter",
  },
  {
    icon: YOUTUBE_ICON,
    link: "https://www.youtube.com/channel/UCPJ0igq_Ox4K1-iym7j0lSw",
    type: "youtube",
  },
  {
    icon: APARAT_ICON,
    link: "https://www.aparat.com/Vitrin.me",
    type: "aparat",
  },
  {
    icon: INSTAGRAM_ICON,
    link: "https://www.instagram.com/vitrin.me/",
    type: "instagram",
  },
  { icon: TELEGRAM_ICON, link: "https://t.me/vitrin_site", type: "telegram" },
  {
    icon: WHATSUP_ICON,
    link: "https://api.whatsapp.com/send/?phone=989981741275&text&app_absent=0",
    type: "whatsup",
  },
  {
    icon: LINKDIN_ICON,
    link: "https://www.linkedin.com/company/vitrin-me/",
    type: "linkdin",
  },
];

const Footer = () => {
  const { maxWidth768 } = useResponsive();
  return (
    <div className="container">
      {/* Footer Row One (Mobile) */}
      <div
        className="d-flex d-md-none justify-content-between"
        style={{
          padding: "24px 0",
          borderBottom: "1px solid #E4E6E7",
        }}
      >
        <Link href="/" className="d-flex" style={{ transition: "none" }}>
          <div>
            <Image
              priority
              height={24}
              width={24}
              src="/images/vitrin-v-icon.png"
              alt="vitrin"
            />
          </div>
          <span
            className="mr-2 font-weight-600"
            style={{ fontSize: 16, color: "#202223", lineHeight: "24px" }}
          >
            ویترین
          </span>
        </Link>
        <div className="d-flex">
          {socialNetworks.map((item, index) => (
            <div
              key={index}
              className={`cursorPointer
            ${
              maxWidth768
                ? index == 5
                  ? "mr-2"
                  : "mx-2"
                : index == 5
                ? "mr-3"
                : "mx-3"
            }`}
            >
              <Link
                href={item.link}
                target="_blank"
                rel="noopener nofollow"
                style={{ transition: "none" }}
                aria-label={item.type}
              >
                <Image
                  priority
                  key={index}
                  height={16}
                  width={16}
                  src={item.icon}
                  alt={item.type}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* Footer Row One (Desktop) */}
      <div
        className="d-none d-md-flex justify-content-between"
        style={{
          padding: "40px 0",
          borderBottom: "1px solid #E4E6E7",
        }}
      >
        <Link href="/" className="d-flex" style={{ transition: "none" }}>
          <div>
            <Image
              priority
              height={24}
              width={24}
              src="/images/vitrin-v-icon.png"
              alt="vitrin"
            />
          </div>
          <span
            className="mr-2 font-weight-600"
            style={{ fontSize: 16, color: "#202223", lineHeight: "24px" }}
          >
            ویترین
          </span>
        </Link>
        <div className="d-flex">
          {socialNetworks.map((item, index) => (
            <div
              key={index}
              className={`cursorPointer
            ${
              maxWidth768
                ? index == 5
                  ? "mr-2"
                  : "mx-2"
                : index == 5
                ? "mr-3"
                : "mx-3"
            }`}
            >
              <Link
                href={item.link}
                target="_blank"
                rel="noopener nofollow"
                style={{ transition: "none" }}
                aria-label={item.type}
              >
                <Image
                  priority
                  key={index}
                  height={24}
                  width={24}
                  src={item.icon}
                  alt={item.type}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      {/* Footer Row Two (Mobile) */}
      <div
        style={{
          padding: "24px 0",
          borderBottom: "1px solid #E4E6E7",
        }}
        className={`d-flex d-md-none flex-column-reverse justify-content-between`}
      >
        <div className="font-weight-600" style={{ flex: 4 }}>
          <p
            style={{
              fontSize: 16,
              color: "#202223",
              lineHeight: "24px",
            }}
          >
            درباره ما
          </p>
          <p
            className="pt-4"
            style={{
              width: "100%",
              color: "#6D7175",
              fontSize: 12,
              lineHeight: "16px",
            }}
          >
            ویترین راهکار افزایش فروش کسب وکارهاست که با هدف تسهیل فعالیت مستقل
            کسب‌وکارها در اینترنت شکل گرفته است. ویترین تاکنون بیش از ۷۰۰
            کسب‌وکار مختلف را همراهی کرده تا وبسایت حرفه‌ای و فروشگاه آنلاین
            اختصاصی خودشان را طراحی کنند و به کمک تکنولوژی فروش آنلاین ویترین
            (I.O.M) به سیستم سفارش‌گیری آنلاین با امکانات پیشرفته، ابزارهای
            اتوماسیون بازاریابی و باشگاه مشتریان نیز دسترسی داشته باشند تا فروش
            خود را بیشتر و عملیات روزمره خود را راحت‌تر مدیریت کنند.
          </p>
          <p
            style={{
              fontSize: 16,
              color: "#202223",
              lineHeight: "24px",
              paddingTop: 40,
            }}
          >
            راه‌های ارتباطی
          </p>
          <p
            className="pt-4 align-items-center"
            style={{
              width: "100%",
              color: "#6D7175",
              fontSize: 12,
              lineHeight: "16px",
            }}
          >
            <Image
              priority
              width={16}
              height={16}
              src="/images/location-icon.svg"
              alt="location"
            />
            <span className="mr-1">{ADDRESS}</span>
          </p>
          <p
            className="pt-4 d-flex align-items-center"
            style={{
              width: "50%",
              color: "#6D7175",
              fontSize: 12,
              lineHeight: "16px",
            }}
          >
            <Image
              priority
              width={16}
              height={16}
              src="/images/phone-icon.svg"
              alt="phone"
            />
            <span className="mr-1">{PHONE}</span>
          </p>
          <p
            className="pt-4 d-flex align-items-center"
            style={{
              width: "50%",
              color: "#6D7175",
              fontSize: 12,
              lineHeight: "16px",
            }}
          >
            <EmailRoundedIcon style={{ width: 16, height: 16 }} />
            <span className="mr-1"> ایمیل: info@vitrin.me</span>
          </p>
        </div>
        <div
          style={{
            flex: 1,
            paddingBottom: 16,
            marginBottom: "16px",
          }}
        >
          <p
            className="font-weight-600"
            style={{
              fontSize: 16,
              color: "#202223",
              lineHeight: "24px",
              paddingBottom: 16,
              flex: 1,
              borderBottom: "1px solid #E4E6E7",
            }}
          >
            لینک ها
          </p>
          {footerMenus.map((item) => (
            <div
              key={item.id}
              style={{ color: "#6D7175", fontSize: 12, lineHeight: "16px" }}
              className="pt-md-4  cursorPointer font-weight-600"
            >
              <MenuItems menus={item} />
            </div>
          ))}
        </div>
      </div>
      {/* Footer Row Two (Desktop) */}
      <div
        style={{
          padding: "40px 0",
          borderBottom: "1px solid #E4E6E7",
        }}
        className={`d-none d-md-flex justify-content-between`}
      >
        <div className="font-weight-600" style={{ flex: 4 }}>
          <p
            style={{
              fontSize: 16,
              color: "#202223",
              lineHeight: "24px",
            }}
          >
            درباره ما
          </p>
          <p
            className="pt-4"
            style={{
              width: "50%",
              color: "#6D7175",
              fontSize: 12,
              lineHeight: "16px",
            }}
          >
            ویترین راهکار افزایش فروش کسب وکارهاست که با هدف تسهیل فعالیت مستقل
            کسب‌وکارها در اینترنت شکل گرفته است. ویترین تاکنون بیش از ۷۰۰
            کسب‌وکار مختلف را همراهی کرده تا وبسایت حرفه‌ای و فروشگاه آنلاین
            اختصاصی خودشان را طراحی کنند و به کمک تکنولوژی فروش آنلاین ویترین
            (I.O.M) به سیستم سفارش‌گیری آنلاین با امکانات پیشرفته، ابزارهای
            اتوماسیون بازاریابی و باشگاه مشتریان نیز دسترسی داشته باشند تا فروش
            خود را بیشتر و عملیات روزمره خود را راحت‌تر مدیریت کنند.
          </p>
          <p
            style={{
              fontSize: 16,
              color: "#202223",
              lineHeight: "24px",
              paddingTop: 40,
            }}
          >
            راه‌های ارتباطی
          </p>
          <p
            className="pt-4 align-items-center"
            style={{
              width: "50%",
              color: "#6D7175",
              fontSize: 12,
              lineHeight: "16px",
            }}
          >
            <Image
              priority
              width={16}
              height={16}
              src="/images/location-icon.svg"
              alt="location"
            />
            <span className="mr-1">{ADDRESS}</span>
          </p>
          <p
            className="pt-4 d-flex align-items-center"
            style={{
              width: "50%",
              color: "#6D7175",
              fontSize: 12,
              lineHeight: "16px",
            }}
          >
            <Image
              priority
              width={16}
              height={16}
              src="/images/phone-icon.svg"
              alt="phone"
            />
            <span className="mr-1">{PHONE}</span>
          </p>
          <p
            className="pt-4 d-flex align-items-center"
            style={{
              width: "50%",
              color: "#6D7175",
              fontSize: 12,
              lineHeight: "16px",
            }}
          >
            <EmailRoundedIcon style={{ width: 16, height: 16 }} />
            <span className="mr-1"> ایمیل: info@vitrin.me</span>
          </p>
        </div>
        <div
          style={{
            flex: 1,
            paddingBottom: 0,
            marginBottom: 0,
          }}
        >
          <p
            className="font-weight-600"
            style={{
              fontSize: 16,
              color: "#202223",
              lineHeight: "24px",
              paddingBottom: 16,
              flex: 1,
              borderBottom: "1px solid #E4E6E7",
            }}
          >
            لینک ها
          </p>
          {footerMenus.map((item) => (
            <div
              key={item.id}
              style={{ color: "#6D7175", fontSize: 12, lineHeight: "16px" }}
              className="pt-md-4  cursorPointer font-weight-600"
            >
              <MenuItems menus={item} />
            </div>
          ))}
        </div>
      </div>
      <div
        className="d-flex justify-content-center parent"
        style={{ padding: "40px 0" }}
        dangerouslySetInnerHTML={{
          __html: `<a referrerpolicy="origin"aria-label="enamd" target="_blank" style="transition: none" href="https://trustseal.enamad.ir/?id=240017&amp;Code=OZhEG5QB0dQhiOa9Hnq3"><img referrerpolicy="origin" src="https://Trustseal.eNamad.ir/logo.aspx?id=240017&amp;Code=OZhEG5QB0dQhiOa9Hnq3" alt="" style="cursor:pointer" id="OZhEG5QB0dQhiOa9Hnq3"></a>`,
        }}
      ></div>
    </div>
  );
};
export default Footer;
