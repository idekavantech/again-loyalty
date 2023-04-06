/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef, memo, useEffect } from "react";
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
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  makeSelectLoading,
  makeSelectVitrinFormInformation,
} from "stores/global/selector";
import {
  createFormResponse,
  getFormsDictionary,
  setSnackBarMessage,
} from "stores/global/actions";
import { phoneValidator } from "utils/helpers/phoneValidator";
import { makeSelectFormsDictionary } from "stores/global/selector";
import { callPhoneNumber } from "utils/helpers/callPhoneNumber";

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

function SiteBuilderPage({
  formsDictionary,
  _getFormsDictionary,
  _setSnackBarMessage,
  _submitForm,
  loading,
}) {
  const [collapses, setCollapses] = useState({});
  const { maxWidth768 } = useResponsive();
  const [isOpenConsultationModal, setIsOpenConsultationModal] = useState(false);
  const contactUsRef = useRef();

  const [form, setForm] = useState(null);
  const [_form, _setForm] = useState({});
  const form_id = 548;

  useEffect(() => {
    setTimeout(() => {
      _getFormsDictionary(form_id);
    }, 0);
  }, []);

  useEffect(() => {
    if (formsDictionary) {
      _setForm(formsDictionary[form_id]);
      setForm(formsDictionary[form_id]);
    }
  }, [formsDictionary]);

  const submit = () => {
    const newArray = [];
    form.inputs.forEach((input) => {
      if (
        input.required === true &&
        (input.value === undefined || input.value === "")
      ) {
        newArray.push(input);
      }
    });
    if (newArray && newArray.length) {
      _setSnackBarMessage("لطفا همه فیلدها را پر نمایید.", "fail");
    } else if (!phoneValidator(form?.inputs[1].value).valid) {
      _setSnackBarMessage("شماره تلفن همراه وارد شده اشتباه است", "fail");
    } else {
      _submitForm(_form, form_id);
      setTimeout(() => {
        form.inputs.forEach((input) => (input.value = ""));
        if (form.inputs.find((input) => input.type === "image")) {
          _removeFile();
        }
      }, 0);
    }
  };

  return (
    <main>
      <div className="position-relative">
        <div className="header_container_site_builder"></div>
        <Header isTransparent />
        <div
          className=" d-flex flex-column position-relative align-items-center"
          style={{ padding: maxWidth768 ? "80px 0px 40px" : "120px 80px 80px" }}
        >
          <h1
            style={{
              fontSize: maxWidth768 ? 21 : 28,
              lineHeight: maxWidth768 ? "28px" : "32px",
              color: "#202223",
            }}
            className="mb-1"
          >
            سایت ساز ویترین
          </h1>
          <p
            style={{
              fontSize: maxWidth768 ? 16 : 26,
              lineHeight: maxWidth768 ? "24px" : "32px",
              color: "#202223",
              fontWeight: 600,
              textAlign: "center",
            }}
            className={maxWidth768 ? "mt-1" : "mt-5"}
          >
            بدون کدنویسی سایت بسازید و با گوشی مدیریت کنید{" "}
          </p>
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
          به جمع ۶۳۰ برندی بپیوندید که...
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
          بیش از <strong>۶۰٫۷۶۴٫۰۰۰٫۰۰۰</strong> تومان با وبسایت‌های اختصاصی خود
          درآمد کسب کرده‌اند..
        </span>
        <div
          className="w-100 d-flex justify-content-center px-4"
          style={{ marginTop: maxWidth768 ? 32 : 64 }}
        >
          <div className="col-5 header-buttons-site-builder d-flex  justify-content-center align-items-center  ml-2 ml-md-4">
            <Link href="/cr~templates">
              <button>ساخت سایت</button>
            </Link>
          </div>
        </div>
        <button
          className="mt-5"
          style={{ color: "#0050ff" }}
          onClick={() => contactUsRef.current.scrollIntoView()}
        >
          مشاوره رایگان
        </button>
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
            مزیت سایت ساز ویترین
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
                    alt="سایت اختصاصی شما"
                  />
                  <h3 className="mx-3 font-weight-600">سایت اختصاصی شما </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 14, textAlign: "right" }}
                >
                  رای ساخت سایت با ویترین نیاز به هیچ گونه کدنویسی ندارید و
                  می‌توانید از ابزارهای آمادهٔ سایت ساز ویترین استفاده کنید. هر
                  لحظه که بخواهید می‌توانید حتی با گوشی خود ظاهر سایت را عوض
                  کنید و محتوای صفحات را به‌روز کنید. مدیریت سایت هیچ وقت به این
                  آسانی نبوده است!
                </p>
                <div className="w-100 d-flex justify-content-md-end justify-content-center mb-4">
                  <Link
                    className="header-buttons-site-builder col-5 d-flex  justify-content-center align-items-center  ml-2 ml-md-4"
                    href="/cr~templates"
                  >
                    <button>ساخت سایت</button>
                  </Link>
                </div>
              </div>

              <div style={{ padding: maxWidth768 ? "40px 0 10px" : "40px 0" }}>
                <div className="d-flex align-items-center">
                  <Image
                    width={24}
                    height={24}
                    src="/images/website-blue.svg"
                    alt="بهینه برای گوگل و گوشی"
                  />
                  <h3 className="mx-3 font-weight-600">
                    بهینه برای گوگل و گوشی
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 14, textAlign: "right" }}
                >
                  اکثر کاربران برای دسترسی به اینترنت از گوشی خود استفاده
                  می‌کنند. به همین دلیل نیاز به سایتی دارید که برای کاربران
                  موبایل هم بهینه باشد. با سایت ساز ویترین می‌توانید سایتی
                  بسازید که با استفاده از طراحی واکنشگرا (Responsive) کار می‌کند
                  و در هر گوشی، به درستی دیده می‌شود. در رابطه با سئو و
                  بهینه‌سازی برای موتورهای جست‌وجو هم می‌توانید با تمرکز روی
                  محتوا و استفاده از آموزش سئوی ویترین، سایت خود را در گوگل به
                  رتبه‌های بالاتر برسانید.
                </p>
              </div>
              <div className="w-100 d-flex justify-content-md-end justify-content-center mb-4">
                <Link
                  className="header-buttons-site-builder col-5 d-flex  justify-content-center align-items-center  ml-2 ml-md-4"
                  href="/cr~templates"
                >
                  <button>ساخت سایت</button>
                </Link>
              </div>
            </div>
            <div className="flex-1 d-flex justify-content-center">
              <Image
                height={maxWidth768 ? 240 : 400}
                src="/images/1-WebDesign3.svg"
                width={maxWidth768 ? 320 : 533}
                alt="با سایت ساز ویترین می‌توانید به‌سرعت سایت خود را بسازید."
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="d-flex "
        style={{ backgroundColor: "#5699d8", padding: 33 }}
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
            <h2 className="font-weight-600">
              سایت ساز ویترین با قابلیت‌های حرفه‌ای فروش آنلاین
            </h2>
          </div>
          <div
            className="d-flex flex-column flex-md-row"
            style={{ padding: "40px 0 ", color: "#202223", lineHeight: "24px" }}
          >
            <div className="flex-1 align-self-center">
              <Image
                src="/images/2-Shopping3.svg"
                width={maxWidth768 ? 320 : 533}
                height={maxWidth768 ? 240 : 400}
                alt="سایت های ساخته شده با ویترین قابل تبدیل به فروشگاه اینترنتی هستند."
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
                    alt="وب‌سایت و وب‌اپلیکیشن اختصاصی"
                  />
                  <h3 className="mx-3 font-weight-600">بیشتر بفروشید</h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 14, textAlign: "right" }}
                >
                  هر سایتی که با سایت ساز ویترین بسازید، قابلیت تبدیل به یک
                  فروشگاه اینترنتی حرفه‌ای را دارد. سایت‌های فروشگاهی ویترین از
                  تکنولوژی I.O.M استفاده می‌کنند که به کمک آن می‌توانید فروش خود
                  را بیشتر کنید. ابزارهای اتوماسیون بازاریابی ویترین به شما
                  امکان می‌دهد فروش سایت فروشگاه خود را تا ۲۰۰٪ افزایش دهید!
                </p>
                <div className="w-100 d-flex justify-content-md-end justify-content-center ">
                  <Link
                    className="header-buttons-site-builder col-5 d-flex  justify-content-center align-items-center  ml-2 ml-md-4"
                    href="/cr~templates"
                  >
                    <button>ساخت سایت</button>
                  </Link>
                </div>
              </div>
              <div style={{ padding: maxWidth768 ? "40px 0 10px" : "40px 0" }}>
                <div className="d-flex align-items-center">
                  <Image
                    width={24}
                    height={24}
                    src="/images/website-blue.svg"
                    alt="رعایت اصول سئو و طراحی واکنشگرا"
                  />
                  <h3 className="mx-3 font-weight-600">راحت‌تر بفروشید</h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 14, textAlign: "right" }}
                >
                  علاوه بر فروش بیشتر، سایت ساز ویترین مزیت دیگری برای
                  فروشگاه‌های اینترنتی دارد و آن هم یکپارچه و آسان کردن عملیات
                  فروش آنلاین شماست. یعنی کارهایی مثل مدیریت موجودی کالاها و
                  روش‌های ارسال، اعمال خودکار هزینهٔ ارسال روی فاکتور و اتصال به
                  درگاه پرداخت و تمام کارهایی که برای فروش راحت‌تر محصولات خود
                  نیاز دارید، با سایت ساز ویترین در اختیار شماست.
                </p>
              </div>
              <div className="w-100 d-flex justify-content-md-end justify-content-center">
                <Link
                  className="header-buttons-site-builder col-5 d-flex  justify-content-center align-items-center  ml-2 ml-md-4"
                  href="/cr~templates"
                >
                  <button>ساخت سایت</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#5699d8",
          paddingTop: 40,
          paddingBottom: 40,
          color: "#fff",
        }}
      >
        <div className="container">
          <p style={{ textAlign: "center", fontSize: 16, lineHeight: "24px" }}>
            عملیات و بازاریابی کسب‌وکار خود را یکپارچه کنید
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
            سایت خود را با سلیقه بسازید
          </p>
          <p
            className={`pt-4 ${maxWidth768 ? "mb-0" : " mb-5"}`}
            style={{ fontSize: 14, lineHeight: "24px", textAlign: "center" }}
          >
            ساخت سایت با سایت ساز ویترین به راحتی چند کلیک است! می‌توانید از
            همان لحظهٔ اول، محتوا و ظاهر سایت خود را به دلخواه خود بسازید، یا
            برای شروع یک قالب آماده انتخاب کنید.
          </p>
          <div className="w-100 d-flex my-2 justify-content-center ">
            <Link
              className="header-buttons-site-builder col-5 d-flex  justify-content-center align-items-center  ml-2 ml-md-4"
              href="/cr~templates"
            >
              <button>ساخت سایت</button>
            </Link>
          </div>
          <Image
            height={maxWidth768 ? 232 : 438}
            width={maxWidth768 ? 342 : 600}
            className="mt-4"
            src="/images/3-Templates3.svg"
            alt="ساخت سایت با ویترین به سرعت و با چند کلیک امکان پذیر است."
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
          راهنمای شروع ساخت سایت
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
          <Link className="d-flex" href="https://vitrin.me/blog">
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
            سایت‌های ساخته شده با ویترین را ببینید{" "}
          </p>
          <p
            className="pt-4"
            style={{ fontSize: 14, lineHeight: "24px", textAlign: "center" }}
          >
            می‌توانید قبل از ساخت سایت خودتان، از نمونه سایت‌های دیگران بازدید
            کنید تا علاوه بر دیدن ایده‌های متنوع، با امکانات مختلف سایت ساز
            ویترین آشنا شوید.
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
          backgroundColor: "#5699d8",
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
        style={{
          backgroundColor: "#F2F7FE",
          color: "#202223",
        }}
      >
        <div className="container" ref={contactUsRef}>
          <div className="container" ref={contactUsRef}>
            <div
              className="w-100 d-flex flex-column flex-md-row align-items-center"
              style={{
                paddingTop: maxWidth768 ? "24px " : "40px",
                paddingBottom: maxWidth768 ? "24px " : "40px",
              }}
            >
              <div
                className={`${
                  maxWidth768 ? "w-100" : "flex-1"
                }  flex-column justify-content-between`}
              >
                <p className="font-weight-600">سؤالی دارید؟ پاسخ‌گو هستیم!</p>
                <p className="mt-4">
                  برای دریافت مشاورهٔ رایگان و جزئیات بیشتر دربارهٔ سایت ساز
                  ویترین، لطفا اطلاعات خود را در فرم مشاوره ثبت کنید تا با شما
                  تماس بگیریم.
                  <br />
                  برای تماس تلفنی با تیم پشتیبانی ویترین، شمارهٔ ۰۲۱۹۱۰۷۰۷۵۱ در
                  اختیار شماست.
                </p>
                <div className="flex-1 d-flex mt-5 justify-content-between justify-content-md-start">
                  <div className="  d-flex  justify-content-center align-items-center  ml-2 ml-md-4">
                    <button
                      className="d-flex w-100 align-items-center justify-content-center px-2 px-md-5"
                      onClick={callPhoneNumber}
                      style={{
                        height: 40,
                        borderRadius: 8,
                        border: "1px solid #0050FF",
                        lineHeight: "20px",
                        fontSize: 13,
                        color: "#0050FF",
                      }}
                    >
                      <Image
                        width={24}
                        height={24}
                        src="/images/Calling-blue.svg"
                        alt="call"
                      />{" "}
                      <span className="mr-2">۰۲۱۹۱۰۷۰۷۵۱</span>
                    </button>
                  </div>
                  <div className="d-flex  justify-content-center align-items-center  ml-2 ml-md-4">
                    <Link href="https://api.whatsapp.com/send/?phone=989981741275&text&app_absent=0">
                      <button
                        className="d-flex align-items-center justify-content-center w-100 px-3 px-md-5"
                        style={{
                          height: 40,
                          borderRadius: 8,
                          border: "1px solid #0050FF",
                          lineHeight: "20px",
                          fontSize: 13,
                          color: "#0050FF",
                        }}
                      >
                        <Image
                          width={24}
                          height={24}
                          src="/images/whats-up-blue.svg"
                          alt="whatsapp"
                        />
                        <span className="mr-2">واتساپ</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-100 flex-1 d-flex flex-column justify-content-between m-0 mr-md-4">
                <div
                  className="d-flex w-100 radius-16 p-4"
                  style={{
                    border: "1px solid #E4E6E7",
                    marginTop: 43,
                    backgroundColor: "rgba(240, 240, 240, 0.3)",
                  }}
                >
                  <div>
                    <Image
                      width={24}
                      height={24}
                      src="/images/profile-icon-gray.svg"
                      alt="profile"
                    />
                  </div>

                  <input
                    className="flex-1 mr-4"
                    placeholder="نام و نام‌خانوادگی"
                    style={{
                      fontSize: 15,
                      lineHeight: "25px",
                      color: "#202223",
                    }}
                    onChange={(e) => {
                      const localForm = { ..._form };
                      localForm.inputs[0].value = e.target.value;
                      _setForm(localForm);
                    }}
                  />
                </div>
                <div
                  className="d-flex w-100 radius-16 mt-4 p-4"
                  style={{
                    border: "1px solid #E4E6E7",
                    backgroundColor: "rgba(240, 240, 240, 0.3)",
                  }}
                >
                  <div>
                    <Image
                      width={24}
                      height={24}
                      src="/images/mobile-icon-gray.svg"
                      alt="mobile"
                    />
                  </div>

                  <input
                    className="flex-1 mr-4"
                    placeholder="شماره تلفن همراه"
                    style={{
                      fontSize: 15,
                      lineHeight: "25px",
                      color: "#202223",
                    }}
                    onChange={(e) => {
                      const localForm = { ..._form };
                      localForm.inputs[1].value = e.target.value;
                      _setForm(localForm);
                    }}
                  />
                </div>
                <div
                  className="d-flex w-100 radius-16 mt-4 p-4"
                  style={{
                    border: "1px solid #E4E6E7",
                    backgroundColor: "rgba(240, 240, 240, 0.3)",
                  }}
                >
                  <div>
                    <Image
                      width={24}
                      height={24}
                      src="/images/work-gray.svg"
                      alt="mobile"
                    />
                  </div>

                  <input
                    className="flex-1 mr-4"
                    placeholder="زمینه فعالیت شما"
                    style={{
                      fontSize: 15,
                      lineHeight: "25px",
                      color: "#202223",
                    }}
                    onChange={(e) => {
                      const localForm = { ..._form };
                      localForm.inputs[2].value = e.target.value;
                      _setForm(localForm);
                    }}
                  />
                </div>
                <button
                  className="w-100 radius-16 p-4 mt-4"
                  style={{
                    color: "#fff",
                    backgroundColor: "#0050FF",
                    boxSizing: "border-box",
                  }}
                  onClick={submit}
                  disabled={loading}
                >
                  ارسال
                </button>
              </div>
            </div>
          </div>
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
      <ContactUs click={() => contactUsRef.current.scrollIntoView()} />
      <FreeConsultationModal
        isOpen={isOpenConsultationModal}
        onClose={() => setIsOpenConsultationModal(false)}
      />
      <Footer />
    </main>
  );
}

const mapStateToProps = createStructuredSelector({
  formsDictionary: makeSelectFormsDictionary(),
  loading: makeSelectLoading(),
  form: makeSelectVitrinFormInformation(),
});
function mapDispatchToProps(dispatch) {
  return {
    _getFormsDictionary: (id) => dispatch(getFormsDictionary(id)),
    _submitForm: (data, id, cb) => dispatch(createFormResponse(data, id, cb)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(SiteBuilderPage);
