/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Header from "containers/Header";
import Footer from "components/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Collapse } from "react-collapse";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { CUSTOMER_COMMENTS } from "utils/constants/CUSTOMER_COMMENTS";
import {
  DIFFERENT_METHODS_OF_SITE_DESIGN,
  DIFFERENT_METHODS_OF_SITE_DESIGN_LINK,
  DIFFERENT_METHODS_OF_SITE_DESIGN_DESCRIPTION,
  DIFFERENT_METHODS_OF_SITE_DESIGN_IMAGE,
  DIFFERENT_METHODS_OF_SITE_DESIGN_ALT,
  LAUNCHING_AN_ONLINE_STORE,
  LAUNCHING_AN_ONLINE_STORE_IMAGE,
  LAUNCHING_AN_ONLINE_STORE_LINK,
  LAUNCHING_AN_ONLINE_STORE_DESCRIPTION,
  LAUNCHING_AN_ONLINE_STORE_ALT,
  WAYS_TO_INCREASE_ONLINE_SALES_IMAGE,
  WAYS_TO_INCREASE_ONLINE_SALES,
  WAYS_TO_INCREASE_ONLINE_SALES_DESCRIPTION,
  WAYS_TO_INCREASE_ONLINE_SALES_LINK,
  WAYS_TO_INCREASE_ONLINE_SALES_ALT,
} from "utils/constants/BLOGS";
import Image from "next/image";
import Link from "next/link";
import FreeConsultationModal from "containers/FreeConsultationModal";
import ContactUs from "components/ContactUs";
import { siteExample, FAQS } from "./constant";
import { useRouter } from "next/router";
import BreadCrumb from "components/BreadCrumb";

const SEARCH_INTENT_SATISFYERS = [
  {
    id: 0,
    label: "ساخت سایت",
    icon: "/images/site-icon-white.svg",
    description: "",
    link: "/cr~templates",
  },

  {
    id: 2,
    label: "نمونه سایت",
    icon: "/images/Tick Square.svg",
    description: "",
    link: "/examples",
  },
  {
    id: 3,
    label: "قیمت طراحی سایت",
    icon: "/images/Price.svg",
    description: "",
    link: "/pricing",
  },
];
const CUSTOMERS = [
  "/images/customer-01.svg",
  "/images/customer-02.svg",
  "/images/customer-03.svg",
  "/images/customer-04.svg",
  "/images/customer-05.svg",
  "/images/customer-06.svg",
  "/images/customer-07.svg",
  "/images/customer-08.svg",
  "/images/customer-09.svg",
  "/images/customer-10.svg",
  "/images/customer-11.svg",
  "/images/customer-12.svg",
  "/images/customer-13.svg",
  "/images/customer-14.svg",
  "/images/customer-15.svg",
  "/images/customer-16.svg",
  "/images/customer-17.svg",
  "/images/customer-18.svg",
  "/images/customer-19.svg",
  "/images/customer-20.svg",
  "/images/customer-21.svg",
  "/images/customer-22.svg",
  "/images/customer-23.svg",
  "/images/customer-24.svg",
  "/images/customer-25.svg",
  "/images/customer-26.svg",
  "/images/customer-27.svg",
  "/images/customer-28.svg",
  "/images/customer-29.svg",
  "/images/customer-30.svg",
];
const blogs = [
  {
    title: DIFFERENT_METHODS_OF_SITE_DESIGN,
    image: DIFFERENT_METHODS_OF_SITE_DESIGN_IMAGE,
    description: DIFFERENT_METHODS_OF_SITE_DESIGN_DESCRIPTION,
    link: DIFFERENT_METHODS_OF_SITE_DESIGN_LINK,
    alt: DIFFERENT_METHODS_OF_SITE_DESIGN_ALT,
  },
  {
    title: LAUNCHING_AN_ONLINE_STORE,
    image: LAUNCHING_AN_ONLINE_STORE_IMAGE,
    description: LAUNCHING_AN_ONLINE_STORE_DESCRIPTION,
    link: LAUNCHING_AN_ONLINE_STORE_LINK,
    alt: LAUNCHING_AN_ONLINE_STORE_ALT,
  },
  {
    title: WAYS_TO_INCREASE_ONLINE_SALES,
    image: WAYS_TO_INCREASE_ONLINE_SALES_IMAGE,
    description: WAYS_TO_INCREASE_ONLINE_SALES_DESCRIPTION,
    link: WAYS_TO_INCREASE_ONLINE_SALES_LINK,
    alt: WAYS_TO_INCREASE_ONLINE_SALES_ALT,
  },
];

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  dots: true,
  arrows: false,
  speed: 300,
  slidesToShow: 3,
  centerPadding: "0",
  swipeToSlide: true,
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 1490,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        className: "center",
        centerMode: true,
        infinite: true,
        dots: true,
        arrows: false,
        speed: 300,
      },
    },
  ],
};
const customers_comments_slider_setting = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "31%",
  dots: true,
  slidesToShow: 1,
  arrows: false,
  speed: 500,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        dots: false,
        arrows: false,
        slidesToShow: 1,
        centerPadding: "25%",
      },
    },
  ],
};

const Online_ordering = [
  "/images/jet-icon.svg",
  "/images/pwa-icon.svg",
  "/images/torob-icon.svg",
  "/images/emallz-icon.svg",
  "/images/int-icons.svg",
];

function PersonalWebsitePage() {
  const [collapses, setCollapses] = useState({});
  const { maxWidth768 } = useResponsive();
  const [isOpenConsultationModal, setIsOpenConsultationModal] = useState(false);
  const router = useRouter();
  return (
    <main>
      <div className="position-relative">
        <div className="header_container"></div>
        <Header isTransparent />
        <div
          className=" d-flex flex-column position-relative align-items-center"
          style={{ padding: maxWidth768 ? "80px 0px 40px" : "120px 0px 80px" }}
        >
          <h1
            style={{
              fontSize: maxWidth768 ? 21 : 28,
              lineHeight: maxWidth768 ? "28px" : "32px",
              color: "#202223",
            }}
            className="mb-1"
          >
            طراحی سایت شخصی با ویترین
          </h1>
          <h2
            style={{
              fontSize: maxWidth768 ? 16 : 26,
              lineHeight: maxWidth768 ? "24px" : "32px",
              color: "#202223",
              fontWeight: 600,
            }}
            className={maxWidth768 ? "mt-1" : "mt-5"}
          >
            با انتخاب از گزینه‌های زیر، طراحی سایت شخصی را سریع‌تر شروع کنید
          </h2>
          <div
            className=" w-100 d-flex mt-5 scrollbar-hidden"
            style={{
              justifyContent: maxWidth768 ? "flex-start" : "center",
              overflowX: maxWidth768 ? "scroll" : "hidden",
            }}
          >
            {SEARCH_INTENT_SATISFYERS.map((SIS, index) => (
              <Link href={SIS.link} key={SIS.id}>
                <div
                  key={index}
                  className="position-relative m-2 m-md-4 d-flex flex-column position-relative  justify-content-between align-items-center"
                  style={{
                    backgroundColor: "#0050ff",
                    width: 144,
                    height: 144,
                    borderRadius: 16,
                    padding: 24,
                  }}
                >
                  <Image
                    width={40}
                    height={40}
                    src={SIS.icon}
                    alt={SIS.label}
                  />
                  <span
                    className="mt-4"
                    style={{
                      color: "#fff",
                      fontSize: 14,
                      lineHeight: "20px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {SIS.label}
                  </span>
                  <span
                    className="mt-1"
                    style={{
                      color: "#fff",
                      fontSize: 12,
                      lineHeight: "16px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {SIS.description}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div
            className="w-100 d-flex justify-content-center px-4"
            style={{ marginTop: maxWidth768 ? 32 : 64 }}
          >
            <button
              className="header-buttons mr-2 mr-md-4"
              onClick={() => setIsOpenConsultationModal(true)}
            >
              مشاوره رایگان
            </button>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundColor: "#F0F0F0", padding: "40px 0" }}
        className="d-flex flex-column  align-items-center"
      >
        <span
          style={{
            fontSize: maxWidth768 ? 16 : 20,
            lineHeight: "28px",
            color: "#202223",
          }}
          className="mb-4"
        >
          بیش از ۶۳۰ برند به ویترین اعتماد کرده اند...
        </span>
        <div className="w-100 d-flex justify-content-center flex-wrap">
          <div style={{ overflowX: "hidden" }}>
            <div className="d-flex slide-logos-one">
              {CUSTOMERS.filter((item, index) => index <= 14).map((item) => (
                <div
                  className="position-relative d-flex m-2 p-1"
                  key={item}
                  style={{
                    borderRadius: 16,
                  }}
                >
                  <Image
                    width={60}
                    height={60}
                    src={item}
                    layout="fixed"
                    alt="customer"
                    className="logo-img"
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ overflowX: "hidden" }}>
            <div className="d-flex slide-logos-two">
              {CUSTOMERS.filter((item, index) => index > 14).map((item) => (
                <div
                  className=" position-relative d-flex m-2 p-1"
                  key={item}
                  style={{
                    borderRadius: 16,
                  }}
                >
                  <Image
                    width={60}
                    height={60}
                    src={item}
                    layout="fixed"
                    alt="customer"
                    className="logo-img"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <span
          className="mt-4"
          style={{
            fontSize: maxWidth768 ? 15 : 20,
            lineHeight: "28px",
            textAlign: "center",
            color: "#202223",
          }}
        >
          و بیش از ۴۴,۰۰۰,۰۰۰,۰۰۰ تومان
          <br />
          از طریق وبسایت‌های فروشگاهی خود درآمد کسب کرده‌اند.
        </span>
      </div>
      <div
        style={{
          padding: maxWidth768 ? "32px 0" : "40px 0px",
          textAlign: "center",
          backgroundColor: "#F6F6F7",
        }}
      >
        <div className="container">
          <h2
            style={{
              textAlign: "center",
              fontSize: maxWidth768 ? 16 : 20,
              lineHeight: "28px",
              paddingBottom: maxWidth768 ? 16 : 40,
              borderBottom: "1px solid #E4E6E7",
              width: "100%",
              color: "#202223",
              fontWeight: 600,
            }}
          >
            طراحی سایت شخصی به شما کمک می‌کند …
          </h2>
          <div
            className="d-flex flex-column flex-md-row"
            style={{ paddingTop: 40, color: "#202223", lineHeight: "24px" }}
          >
            <div className="flex-1 position-relative">
              <div
                className="pb-5"
                style={{ borderBottom: "1px solid #E4E6E7" }}
              >
                <div className="d-flex align-items-center">
                  <Image
                    width={24}
                    height={24}
                    src="/images/edit-square-blue.svg"
                    alt="اعتبار برند شخصی شما بیشتر شود"
                  />
                  <h3 className="mx-3 font-weight-600">
                    اعتبار برند شخصی شما بیشتر شود
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 14, textAlign: "right" }}
                >
                  یکی از سریع‌ترین راه‌های افزایش اعتبار برند شخصی، طراحی یک
                  سایت شخصی با ظاهری حرفه‌ای است تا به مخاطبان خود ارائه کنید.
                  از این طریق می‌توانید رزومه و پروژه‌های خود را در بستری مدرن
                  به نمایش بگذارید و برند خودتان را به‌گونه‌ای شایسته به دیگران
                  معرفی کنید. در ویترین ابزارهای مختلفی برای طراحی سایت شخصی
                  بدون کدنویسی و مدیریت آن، حتی با گوشی، در اختیار دارید.
                </p>
              </div>
              <div style={{ padding: "40px 0" }}>
                <div className="d-flex align-items-center">
                  <Image
                    width={24}
                    height={24}
                    src="/images/website-blue.svg"
                    alt="برای کسب‌وکار خودتان مشتری جدید داشته باشید"
                  />
                  <h3 className="mx-3 font-weight-600">
                    برای کسب‌وکار خودتان مشتری جدید داشته باشید
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 14, textAlign: "right" }}
                >
                  با طراحی سایت شخصی، راه‌های ارتباطی سریع‌تر و بیشتری با مشتری
                  خواهید داشت. با استفاده از تجربهٔ ویترین در طراحی سایت‌های
                  مختلف می‌توانید از روش‌های تست شده برای تبدیل بازدیدکننده‌های
                  سایت شخصی خود به مشتری بهره بگیرید. همچنین تمام سایت‌های طراحی
                  شده با ویترین از طراحی واکنشگرا استفاده می‌کنند که به شما کمک
                  می‌کند هیچ مشتری بالقوه‌ای را از دست ندهید و سایت شما در دسترس
                  انواع کاربرها باشد.
                </p>
              </div>
              <Link
                href="/cr~templates"
                className="d-flex position-absolute left-0 bottom-0"
                style={{ color: "#0050ff" }}
              >
                <span>ساخت سایت شخصی</span>
                <Image
                  width={24}
                  height={24}
                  src="/images/arrow-left-icon-blue.svg"
                  alt="ساخت سایت شخصی"
                />
              </Link>
            </div>
            <div className="flex-1 d-flex justify-content-center">
              <Image
                height={maxWidth768 ? 240 : 400}
                src="/images/1-corporate.svg"
                width={maxWidth768 ? 320 : 533}
                alt=" طراحی سایت شخصی با ویترین برای کسب‌وکارهای امروزی ضروری است."
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="d-flex "
        style={{ backgroundColor: "#0050FF", padding: 33 }}
      >
        <div
          className="d-flex justify-content-end"
          style={{ width: "46.5%", padding: "0 33px" }}
        >
          <Image
            width={64}
            height={64}
            src="/images/display.svg"
            alt="برای اولین بار با تکنولوژی I.O.M"
          />
        </div>
        <div
          className="container d-flex flex-column justify-content-center font-weight-600"
          style={{
            width: "53.5%",
            paddingRight: 33,
            textAlign: "right",
            color: "#fff",
            borderRight: "1px solid #E4E6E7",
          }}
        >
          <p>برای اولین بار با تکنولوژی I.O.M</p>
          <p className="pt-4">تا ۲۰۰٪‌ فروش بیشتر </p>
        </div>
      </div>
      <div style={{ backgroundColor: "#F6F6F7" }}>
        <div className="container">
          <div
            style={{
              padding: maxWidth768 ? "32px 0" : "40px 0",
              textAlign: "center",

              fontSize: maxWidth768 ? 16 : 20,
              lineHeight: "28px",
              paddingBottom: maxWidth768 ? 16 : 40,
              color: "#202223",
              borderBottom: "1px solid #E4E6E7",
            }}
          >
            <h2 className="font-weight-600">ویژگی طراحی سایت شخصی با ویترین</h2>
          </div>
          <div
            className="d-flex flex-column flex-md-row"
            style={{ padding: "40px 0 ", color: "#202223", lineHeight: "24px" }}
          >
            <div className="flex-1 align-self-center">
              <Image
                src="/images/2-features.svg"
                width={maxWidth768 ? 320 : 533}
                height={maxWidth768 ? 240 : 400}
                alt="ویترین ویژگی‌های مختلفی برای طراحی سایت شخصی در اختیار شما می‌گذارد."
              />
            </div>
            <div className="flex-1 position-relative">
              <div
                className="pb-5"
                style={{ borderBottom: "1px solid #E4E6E7" }}
              >
                <div className="d-flex align-items-center">
                  <Image
                    width={24}
                    height={24}
                    src="/images/edit-square-blue.svg"
                    alt="بلاگ شخصی و ابزار سئو"
                  />
                  <h3 className="mx-3 font-weight-600">
                    بلاگ شخصی و ابزار سئو
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 14, textAlign: "right" }}
                >
                  اگر به فکر ارتقای برند شخصی خودتان از طریق اینترنت هستید،
                  نباید از تولید محتوا غافل شوید. در ویترین می‌توانید برای سایت
                  شخصی خودتان یک بلاگ کاربردی داشته باشید و محتوای متنی، تصویری،
                  ویدئویی و حتی صوتی را در آن بارگذاری کنید. خیالتان از سئوی فنی
                  سایت هم راحت است چون کدهای ویترین برای گوگل بهینه شده‌اند! با
                  استفاده از ابزار سئوی ویترین می‌توانید فقط روی بهبود کیفیت
                  محتوای صفحات سایت شخصی خودتان متمرکز شوید تا رتبهٔ بهتری در
                  گوگل داشته باشید.
                </p>
              </div>
              <div style={{ padding: "40px 0" }}>
                <div className="d-flex align-items-center">
                  <Image
                    width={24}
                    height={24}
                    src="/images/website-blue.svg"
                    alt="فروش آنلاین حرفه‌ای"
                  />
                  <h3 className="mx-3 font-weight-600">فروش آنلاین حرفه‌ای</h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 14, textAlign: "right" }}
                >
                  تمام سایت‌های طراحی شده با ویترین قابلیت تبدیل به یک فروشگاه
                  اینترنتی حرفه‌ای را دارند. اگر محصولی برای فروش داشته باشید،
                  بهترین راه افزایش فروشتان استفاده از سایت شخصی و برندینگ آن در
                  راستای فروش مستقیم به مخاطبان سایت است. با ارتقای سایت شخصی به
                  یک سایت فروشگاهی، می‌توانید از امکانات پیشرفتهٔ فروش آنلاین
                  ویترین (تکنولوژی I.O.M) بهره‌مند شوید.
                </p>
              </div>
              <Link
                href="/cr~templates"
                className="d-flex position-absolute left-0 bottom-0"
                style={{ color: "#0050ff" }}
              >
                <span>ساخت سایت شخصی</span>
                <Image
                  width={24}
                  height={24}
                  src="/images/arrow-left-icon-blue.svg"
                  alt="ساخت سایت شخصی"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#0050FF",
          paddingTop: 40,
          paddingBottom: 40,
          color: "#fff",
        }}
      >
        <div className="container">
          <p style={{ textAlign: "center", fontSize: 16, lineHeight: "24px" }}>
            عملیات و بازاریابی کسب‌وکار خود را یکپارچه کنید{" "}
          </p>
          <div className="d-flex flex-column flex-md-row justify-content-between pt-5">
            <div className="pt-5 d-flex  align-items-center">
              <span
                className="pl-4 ml-2 d-flex align-items-center"
                style={{
                  borderLeft: "1px solid #E4E6E7",
                  height: 64,
                  width: maxWidth768 && 88,
                }}
              >
                مدیریت ارسال
              </span>
              <div className="m-1 my-md-0 mx-md-2">
                <Image
                  width={64}
                  height={64}
                  src="/images/miare-icon.svg"
                  alt="میاره"
                />
              </div>
              <div className="m-1 my-md-0 mx-md-2">
                <Image
                  width={64}
                  height={64}
                  src="/images/alopeyk-icon.svg"
                  alt="الوپیک"
                />
              </div>
              <div className="m-1 my-md-0 mx-md-2">
                <Image
                  width={64}
                  height={64}
                  src="/images/int-icons.svg"
                  alt="مدیریت ارسال"
                />
              </div>
            </div>
            <div className="pt-5 d-flex  align-items-center">
              <span
                className="pl-4 ml-2 d-flex align-items-center flex-wrap"
                style={{
                  borderLeft: "1px solid #E4E6E7",
                  height: 64,
                  width: maxWidth768 && 88,
                }}
              >
                سفارش‌گیری آنلاین
              </span>
              <div className=" d-flex align-items-center flex-wrap">
                {Online_ordering.map((item, index) => {
                  return maxWidth768 ? (
                    index !== 1 && index !== 2 && (
                      <div key={item} className="m-1 my-md-0 mx-md-2">
                        <Image
                          width={64}
                          height={64}
                          src={item}
                          alt="سفارش‌گیری آنلاین"
                        />
                      </div>
                    )
                  ) : (
                    <div key={item} className="m-1 my-md-0 mx-md-2">
                      <Image
                        width={64}
                        height={64}
                        src={item}
                        alt="سفارش‌گیری آنلاین"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="pt-5 d-flex  align-items-center">
              <span
                className="pl-4 ml-2 d-flex align-items-center"
                style={{
                  borderLeft: "1px solid #E4E6E7",
                  height: 64,
                  width: maxWidth768 && 88,
                }}
              >
                درگاه پرداخت
              </span>
              <div className="m-1 my-md-0 mx-md-2">
                <Image
                  width={64}
                  height={64}
                  src="/images/zarinpall-icon.svg"
                  alt="زرین پال"
                />
              </div>

              <div className="m-1 my-md-0 mx-md-2">
                <Image
                  width={64}
                  height={64}
                  src="/images/idpay-icon.svg"
                  alt="آیدی پی"
                />
              </div>
              <div className="m-1 my-md-0 mx-md-2">
                <Image
                  width={64}
                  height={64}
                  src="/images/int-icons.svg"
                  alt="درگاه پرداخت"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#F6F6F7" }}>
        <div
          className="container d-flex flex-column justify-content-center align-items-center"
          style={{
            paddingTop: maxWidth768 ? 32 : 40,
            paddingBottom: maxWidth768 ? 32 : 40,
          }}
        >
          <p
            style={{
              color: "#202223",
              fontWeight: 600,
              fontSize: maxWidth768 ? 16 : 20,
              lineHeight: "28px",
            }}
          >
            سایت شخصی خود را با سلیقه طراحی کنید
          </p>
          <p
            className={`pt-4 ${maxWidth768 ? "mb-0" : " mb-5"}`}
            style={{ fontSize: 14, lineHeight: "24px", textAlign: "center" }}
          >
            سلیقهٔ شما در طراحی صفحات سایتتان، بهترین نشانهٔ برند شخصی شماست. با
            ویترین دست شما باز است تا هر طور که دوست دارید سایت شخصی خودتان را
            طراحی کنید.
          </p>
          <Image
            height={maxWidth768 ? 232 : 438}
            width={maxWidth768 ? 342 : 600}
            className="mt-4"
            src="/images/3-template.svg"
            alt="در ویترین می‌توانید طراحی صفحات سایت شخصی را مطابق با سلیقه خودتان انجام دهید."
          />
        </div>
      </div>
      <div
        className="container"
        style={{
          paddingTop: maxWidth768 ? 32 : 40,
          paddingBottom: maxWidth768 ? 32 : 40,
          color: "#202223",
        }}
      >
        <h2
          className="font-weight-600"
          style={{ fontSize: maxWidth768 ? 16 : 20, textAlign: "center" }}
        >
          راهنمای شروع طراحی سایت شخصی
        </h2>
        <div
          className={`mt-5 d-flex ${
            maxWidth768 ? "flex-column " : "flex-row  mt-5"
          } justify-content-between `}
        >
          {blogs.map((blog, index) => (
            <Link key={blog.link} href={blog.link} passHref>
              <div
                className={`d-flex flex-1 ${
                  maxWidth768
                    ? "mx-0 my-2"
                    : index == 0
                    ? "ml-4"
                    : index == 2
                    ? "mr-4"
                    : "mx-4"
                }  align-items-center p-4`}
                style={{
                  minHeight: 96,
                  borderRadius: 16,
                  backgroundColor: "#F2F7FE",
                  cursor: "pointer",
                }}
              >
                <div>
                  <Image
                    width={64}
                    height={64}
                    src={blog.image}
                    alt={blog.alt}
                    className="radius-16"
                  />
                </div>

                <div className="pr-4 flex-1">
                  <p
                    style={{
                      fontSize: 13,
                      color: "#202223",
                      fontWeight: 600,
                      lineHeight: "16px",
                    }}
                  >
                    {blog.title}
                  </p>
                  <p
                    className="pt-1"
                    style={{
                      fontSize: 11,
                      color: "#202223",
                      lineHeight: "20px",
                    }}
                  >
                    {blog.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p
          className="mt-4 d-flex justify-content-end align-items-center"
          style={{
            paddingLeft: 34,
            textAlign: "left",
            color: "#0050FF",
            fontSize: 16,
          }}
        >
          <Link href="https://vitrin.me/blog" className="d-flex">
            <span> آموزش‌های بیشتر در ویترین بلاگ</span>
            <Image
              width={24}
              height={24}
              src="/images/arrow-left-icon-blue.svg"
              alt="مطالب بیشتر"
            />
          </Link>
        </p>
      </div>
      <div
        style={{
          backgroundColor: "#F2F7FE",
          padding: maxWidth768 ? "32px 0" : "40px 0",
          color: "#202223",
        }}
      >
        <div className="container">
          <p
            className=" font-weight-600"
            style={{
              fontSize: maxWidth768 ? 16 : 20,
              textAlign: "center",
              lineHeight: "28px",
            }}
          >
            نمونه سایت‌های دیگران را ببینید
          </p>
          <p
            className="pt-4"
            style={{ fontSize: 14, lineHeight: "24px", textAlign: "center" }}
          >
            با بررسی نمونه کار طراحی سایت شخصی در ویترین می‌توانید با تنوع
            سایت‌هایی که با ویترین طراحی شده‌اند آشنا شوید.
          </p>
          <p
            className="my-4 d-flex justify-content-center align-items-center"
            style={{
              textAlign: "left",
              color: "#0050FF",
              fontSize: 16,
            }}
          >
            <Link className="d-flex" href="/examples">
              <span>مشاهده نمونه سایت‌ها</span>
              <Image
                width={24}
                height={24}
                src="/images/arrow-left-icon-blue.svg"
                alt="مشاهده نمونه سایت‌ها"
              />
            </Link>
          </p>
        </div>

        <div className="sample-site w-100">
          <Slider {...settings}>
            {siteExample?.map((item) => (
              <div className="image-container" key={item.id}>
                <Image
                  layout="fill"
                  className="image"
                  src={item.image}
                  alt={item.alt}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#0050FF",
          padding: maxWidth768 ? "32px 0" : "40px 0 80px",
        }}
      >
        <p
          style={{
            fontSize: maxWidth768 ? 16 : 20,
            textAlign: "center",
            lineHeight: "28px",
            color: "#fff",
          }}
        >
          نظرات مشتریان
        </p>
        <div
          className="customers-comments w-100"
          style={{ paddingTop: maxWidth768 ? 29 : 40 }}
        >
          <Slider {...customers_comments_slider_setting}>
            {CUSTOMER_COMMENTS.map((customer) => (
              <div key={customer.id}>
                {maxWidth768 ? (
                  <div
                    className="d-flex flex-column  align-items-center"
                    style={{
                      backgroundColor: "#fff",
                      width: "90%",
                      marginLeft: "5%",
                      borderRadius: 16,
                      padding: 16,
                    }}
                  >
                    <div className="flex-1">
                      <Image
                        width={204}
                        height={204}
                        src={customer.image}
                        className="radius-16"
                        alt={customer.name}
                      />
                    </div>
                    <p className="flex-1" style={{ textAlign: "right" }}>
                      <p
                        className=" font-weight-600 w-100 mt-4"
                        style={{ fontSize: 13, lineHeight: "16px" }}
                      >
                        {customer.name}
                      </p>
                      <p
                        style={{
                          fontSize: 11,
                          lineHeight: "20px",
                          marginTop: 4,
                          direction: "rtl",
                        }}
                      >
                        {customer.comment}
                      </p>
                    </p>
                  </div>
                ) : (
                  <div
                    className="d-flex justify-content-center"
                    style={{
                      backgroundColor: "transparent",
                      width: "100%",
                    }}
                  >
                    <div
                      className="d-flex flex-row align-items-center  radius-16"
                      style={{
                        backgroundColor: "#fff",
                        width: "90%",
                        padding: 21,
                      }}
                    >
                      <div
                        style={{
                          textAlign: "right",
                          width: "100%",
                        }}
                      >
                        <p className="pr-5 font-weight-600 w-100">
                          {customer.name}
                        </p>
                        <p
                          className="pr-5 mt-2"
                          style={{
                            fontSize: 12,
                            lineHeight: "16px",
                            direction: "rtl",
                          }}
                        >
                          {customer.comment}
                        </p>
                      </div>
                      <div style={{ marginRight: "-50px" }}>
                        <Image
                          width={185}
                          height={185}
                          src={customer.image}
                          className="radius-8"
                          alt={customer.name}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div
        className="container"
        style={{
          paddingTop: maxWidth768 ? 32 : 40,
        }}
      >
        <div
          style={{
            backgroundColor: "#F6F6F7",
            borderRadius: 16,
            padding: maxWidth768 ? "24px 16px" : "40px 64px",
          }}
        >
          <p
            className="font-weight-600 pb-4"
            style={{ textAlign: "center", fontSize: 16, lineHeight: "24px" }}
          >
            پرسش‌های متداول
          </p>
          {FAQS.map((item, index) => (
            <div
              key={item.question}
              style={{
                backgroundColor: "#DFE9FF",
                borderRadius: 16,
              }}
            >
              <div
                className="d-flex justify-content-between align-items-center p-4"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  marginTop: 24,
                  cursor: "pointer",
                }}
                onClick={() =>
                  setCollapses({ ...collapses, [index]: !collapses[index] })
                }
              >
                <div
                  className={`d-flex align-items-center ${
                    maxWidth768 ? "p-0" : "pr-2"
                  }`}
                >
                  <div style={{ minWidth: 24 }}>
                    <Image
                      height={24}
                      width={24}
                      src="/images/question-icon-blue.svg"
                      alt={item.question}
                    />
                  </div>

                  <span
                    style={{
                      fontSize: maxWidth768 ? 13 : 14,
                      lineHeight: "24px",
                      color: "#202223",
                      margin: maxWidth768 ? "0 10px" : "0 16px 0 0",
                    }}
                  >
                    {item.question}
                  </span>
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    transform: collapses[index]
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "0.5s all",
                    marginLeft: maxWidth768 ? 0 : 8,
                  }}
                >
                  <div style={{ width: 12, height: 12 }}>
                    <Image
                      layout="fill"
                      src="/images/arrow-bottom-icon-blue.svg"
                      alt="پرسش های متداول"
                    />
                  </div>
                </div>
              </div>
              <Collapse isOpened={collapses[index]}>
                <p
                  style={{
                    fontSize: 12,
                    lineHeight: "20px",
                    padding: 20,
                    color: "#202223",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: item.response,
                  }}
                ></p>
              </Collapse>
            </div>
          ))}
        </div>
      </div>
      <ContactUs click={() => setIsOpenConsultationModal(true)} />
      <FreeConsultationModal
        isOpen={isOpenConsultationModal}
        onClose={() => setIsOpenConsultationModal(false)}
      />
      <BreadCrumb text="طراحی سایت شخصی" link={router.asPath} />
      <Footer />
    </main>
  );
}

export default PersonalWebsitePage;
