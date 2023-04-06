/* eslint-disable @next/next/no-img-element */
import React, { memo, useState, useRef, useEffect } from "react";
import Header from "containers/Header";
import Footer from "components/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Collapse } from "react-collapse";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { CUSTOMER_COMMENTS } from "utils/constants/CUSTOMER_COMMENTS";
import { VITRIN_POSSIBILITIES } from "utils/constants/VITRIN_POSSIBILITIES";
import Image from "next/image";
import Link from "next/link";
import FreeConsultationModal from "containers/FreeConsultationModal";
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
import Section_1 from "containers/Sections/Section_1_2";
import { useRouter } from "next/router";
import BreadCrumb from "components/BreadCrumb";
import { priceFormatter } from "utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { showTotolGmv } from "stores/global/actions";
import { makeSelectVitrinGmv } from "stores/global/selector";
import CountUp from "react-countup";

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
];

function WebsiteBuilderPage({
  formsDictionary,
  _getFormsDictionary,
  _setSnackBarMessage,
  _submitForm,
  loading,
  _gmv,
  _showTotolGmv,
}) {
  const { maxWidth768 } = useResponsive();

  const contactUsRef = useRef();
  const brandsRef = useRef();
  const exampleRef = useRef();
  const shoppingRef = useRef();
  const [form, setForm] = useState(null);
  const [_form, _setForm] = useState({});
  const [collapses, setCollapses] = useState({});
  const router = useRouter();
  const form_id = 548;
  const [isOpenCollaps, setIsOpenCollaps] = useState(false);
  const [isOpenSupport, setIsOpenSupport] = useState(false);
  const [isOpenConsultationModal, setIsOpenConsultationModal] = useState(false);

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

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      if (scrollTop > 500) {
        setIsOpenSupport(true);
      } else {
        setIsOpenSupport(false);
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    _showTotolGmv();
  }, []);

  return (
    <main style={{ backgroundColor: "#fff" }}>
      <div className="position-relative">
        <Header isTransparent isMobile={maxWidth768} />
        <div style={{ paddingTop: maxWidth768 ? "40px" : "60px" }}>
          <Section_1
            clickHandle={() => router.push("/cr~templates")}
            gmv={_gmv}
            title="سایت ساز ویترین"
            titleButton="انتخاب قالب"
          />
        </div>
      </div>
      <div
        ref={brandsRef}
        style={{
          backgroundColor: "#F0F0F0",
          padding: maxWidth768 ? "32px 0" : "36px 0",
        }}
        className="d-flex flex-column  align-items-center"
        onClick={() => exampleRef.current.scrollIntoView()}
      >
        <span style={{ fontSize: maxWidth768 ? 16 : 20, fontWeight: 500 }}>
          بیش از{" "}
          <span style={{ fontSize: maxWidth768 ? 24 : 32, fontWeight: 700 }}>
            ۶۳۰
          </span>{" "}
          برند به ویترین اعتماد کرده‌اند
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
                    width={70}
                    height={70}
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
          {maxWidth768 && (
            <div className="d-flex flex-column align-items-center">
              <span
                className="mb-2"
                style={{
                  fontSize: maxWidth768 ? 14 : 20,
                  fontWeight: 500,
                  marginTop: maxWidth768 ? 24 : 48,
                }}
              >
                و تا این لحظه بیش از
              </span>
              <CountUp
                start={0}
                end={_gmv}
                delay={0}
                formattingFn={(value) => priceFormatter(value)}
              >
                {({ countUpRef }) => (
                  <p
                    style={{
                      fontSize: maxWidth768 ? 24 : 36,
                      fontWeight: 600,
                      color: "#0050FF",
                    }}
                  >
                    {" "}
                    <span className="my-1 my-md-2 mx-3" ref={countUpRef}></span>
                    <span>تومان</span>
                  </p>
                )}
              </CountUp>
              <span
                className="mt-1 mt-md-2"
                style={{ fontSize: maxWidth768 ? 14 : 20, fontWeight: 500 }}
              >
                از طریق وبسایت های خود کسب درآمد کرده اند
              </span>
            </div>
          )}
        </div>
        <div>
          <p
            style={{
              fontWeight: 500,
              fontSize: maxWidth768 ? 14 : 18,
              marginTop: 56,
            }}
          >
            شما چه درآمدی از سایت خودتان با ویترین کسب می کنید؟
          </p>
          <Link
            className="d-flex justify-content-center align-items-center mt-5 pt-1 u-cursor-pointer"
            href="/cr~templates"
          >
            <Image alt="" width={40} height={40} src="/images/bar-chart.svg" />
            <span
              style={{
                fontWeight: 700,
                color: "#0050FF",
                fontSize: maxWidth768 ? 16 : 22,
              }}
            >
              همین امروز امتحان کنید
            </span>
          </Link>
        </div>
      </div>
      <div
        style={{
          padding: maxWidth768 ? "32px 0" : "32px 0px 52px",
          textAlign: "center",
          backgroundColor: "#F2F7FE",
        }}
      >
        <div className="container">
          <h2 style={{ fontSize: maxWidth768 ? 16 : 32, fontWeight: 500 }}>
            امکانات ویترین را بشناسید
          </h2>
          <h2
            className="mt-md-4 mt-2"
            style={{ fontSize: maxWidth768 ? 16 : 24, fontWeight: 400 }}
          >
            چگونه ویترین به شما کمک می کند؟
          </h2>
          <div className="d-flex flex-md-row flex-column justify-content-between ">
            {VITRIN_POSSIBILITIES.map((possibility) => (
              <div
                key={possibility.id}
                className="flex-1 position-relative d-flex flex-column justify-content-between"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  margin:
                    possibility?.id == 2
                      ? maxWidth768
                        ? "70px 0 24px"
                        : "0 43px"
                      : 0,
                  padding: "80px 40px 40px",
                  marginTop: 60,
                }}
              >
                <div
                  className=" d-flex align-items-center justify-content-between "
                  style={{
                    position: "absolute",
                    top: -60,
                    right: 0,
                    left: 0,
                    padding: maxWidth768 ? "0 25px" : "0 20px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 50,
                      color: "#0050FF",
                      fontWeight: 700,
                      lineHeight: "16px",
                    }}
                  >
                    {englishNumberToPersianNumber(possibility?.id)}
                  </span>
                  <span
                    style={{
                      fontSize: maxWidth768 ? 16 : 18,
                      color: "#0050FF",
                      fontWeight: 700,
                      lineHeight: "16px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {possibility.title}
                  </span>
                  <Image
                    alt=""
                    height={120}
                    width={80}
                    src={possibility.image}
                  />
                </div>
                <div>
                  {possibility.items.map((item, index) =>
                    index > 3 ? (
                      <Collapse isOpened={isOpenCollaps}>
                        <div
                          className="p-4 radius-8 mt-4"
                          style={{
                            border: "1px solid #E4E6E7",
                            fontSize: 16,
                            color: "#000000",
                            fontWeight: 500,
                            textAlign: "right",
                          }}
                        >
                          {item}
                        </div>
                      </Collapse>
                    ) : (
                      <div
                        className="p-4 radius-8 mt-4"
                        style={{
                          border: "1px solid #E4E6E7",
                          fontSize: 16,
                          color: "#000000",
                          fontWeight: 500,
                          textAlign: "right",
                        }}
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>
                {!isOpenCollaps && (
                  <button
                    className="w-100 mt-4 d-flex align-items-center justify-content-end"
                    onClick={() => setIsOpenCollaps(!isOpenCollaps)}
                  >
                    <span
                      className="ml-4"
                      style={{ fontSize: 16, color: "#0050FF" }}
                    >
                      مشاهده سایر امکانات
                    </span>
                    <div
                      style={{
                        transform: "rotate(0deg)",
                        transition: "0.5s all",
                        width: 12,
                        height: 12,
                      }}
                    >
                      <Image
                        alt=""
                        layout="fill"
                        src="/images/arrow-bottom-icon-blue.svg"
                      />
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>
          {isOpenCollaps && (
            <button
              className="w-100 mt-4 d-flex align-items-center justify-content-end justify-content-md-center"
              onClick={() => setIsOpenCollaps(!isOpenCollaps)}
            >
              <span className="ml-4" style={{ fontSize: 16, color: "#0050FF" }}>
                نمایش امکانات کمتر
              </span>
              <div
                style={{
                  transform: "rotate(180deg)",
                  transition: "0.5s all",
                  width: 12,
                  height: 12,
                }}
              >
                <Image
                  alt=""
                  layout="fill"
                  src="/images/arrow-bottom-icon-blue.svg"
                />
              </div>
            </button>
          )}
        </div>
        <Link
          className="w-100 d-flex justify-content-center align-items-center"
          style={{ marginTop: 40 }}
          href="/cr~templates"
        >
          <Image alt="" width={40} height={40} src="/images/web.svg" />
          <span
            className="mr-2"
            style={{
              fontSize: maxWidth768 ? 15 : 20,
              fontWeight: 500,
              color: "#0050FF",
            }}
          >
            ویترین خودتان را بسازید
          </span>
        </Link>
      </div>
      <div style={{ backgroundColor: "#fff" }}>
        <div
          className="container d-flex flex-column justify-content-center align-items-center"
          style={{
            paddingTop: maxWidth768 ? 32 : 48,
            paddingBottom: maxWidth768 ? 32 : 60,
          }}
        >
          <p
            style={{
              color: "#202223",
              fontWeight: 600,
              fontSize: maxWidth768 ? 20 : 32,
              lineHeight: "28px",
            }}
          >
            با سلیقه بسازید
          </p>
          <p
            className={`pt-3 pt-md-4  ${maxWidth768 ? "mb-0" : "mb-5"}`}
            style={{
              fontSize: maxWidth768 ? 15 : 16,
              lineHeight: "24px",
              width: maxWidth768 ? "100%" : 573,
              textAlign: "center",
            }}
          >
            به لطف صفحه‌ساز ویترین، شما می‌توانید هر صفحهٔ سایت را به دلخواه
            خودتان طراحی کنید. قالب‌ها برای شروع طراحی سایت به شما کمک می‌کنند.
          </p>
          <Link
            className="header-buttons d-flex  justify-content-center align-items-center mt-4"
            href="/cr~templates"
          >
            <button>انتخاب قالب</button>
          </Link>
          <Image
            height={maxWidth768 ? 232 : 438}
            width={maxWidth768 ? 342 : 600}
            className="mt-4"
            src="/images/ghaleb-06.svg"
            alt="طراحی صفحات وب با ویترین بسیار ساده است."
          />
        </div>
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
              fontSize: maxWidth768 ? 20 : 32,
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
                  <h3
                    className="mx-3 font-weight-600"
                    style={{ fontSize: maxWidth768 ? 15 : 20 }}
                  >
                    سایت اختصاصی شما{" "}
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{
                    fontSize: maxWidth768 ? 15 : 16,
                    textAlign: "right",
                  }}
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
                    passHref
                  >
                    <button style={{ fontSize: 20 }}>ساخت سایت</button>
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
                  <h3
                    className="mx-3 font-weight-600"
                    style={{ fontSize: maxWidth768 ? 15 : 20 }}
                  >
                    بهینه برای گوگل و گوشی
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{
                    fontSize: maxWidth768 ? 15 : 16,
                    textAlign: "right",
                  }}
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
                  passHref
                >
                  <button style={{ fontSize: 20 }}>ساخت سایت</button>
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
        style={{
          backgroundColor: "#5699d8",
          paddingTop: 40,
          paddingBottom: 40,
          color: "#fff",
        }}
      >
        <div className="container">
          <p
            style={{
              textAlign: "center",
              fontSize: maxWidth768 ? 20 : 24,
              fontWeight: 500,
              lineHeight: "24px",
              marginBottom: maxWidth768 ? 24 : 60,
            }}
          >
            عملیات و بازاریابی کسب‌وکار خود را یکپارچه کنید
          </p>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="d-flex  align-items-center">
              <span
                className="pl-4 ml-2 d-flex align-items-center"
                style={{
                  borderLeft: "1px solid #E4E6E7",
                  height: 64,
                  width: maxWidth768 && 88,
                  fontSize: 15,
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
            </div>
            <div className=" d-flex my-4 py-4 align-items-center">
              <span
                className="pl-4  d-flex align-items-center flex-wrap"
                style={{
                  height: 64,
                  width: maxWidth768 && 88,
                  fontSize: 15,
                }}
              >
                سفارش‌گیری آنلاین
              </span>
              {maxWidth768 ? (
                <div
                  className="w-100  d-flex pr-2  flex-column"
                  style={{
                    borderRight: "1px solid #E4E6E7",
                    boxSizing: "border-box",
                    marginRight: -1,
                  }}
                >
                  <div className="d-flex  align-items-center">
                    {Online_ordering.map(
                      (item, index) =>
                        index < 2 && (
                          <div key={item} className="mx-1 my-md-0 mx-md-2">
                            <Image
                              width={64}
                              height={64}
                              src={item}
                              alt="سفارش‌گیری آنلاین"
                            />
                          </div>
                        )
                    )}
                  </div>
                  <div className="d-flex  align-items-center">
                    {Online_ordering.map(
                      (item, index) =>
                        index > 1 && (
                          <div key={item} className="mx-1 my-md-0 mx-md-2">
                            <Image
                              width={64}
                              height={64}
                              src={item}
                              alt="سفارش‌گیری آنلاین"
                            />
                          </div>
                        )
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className="d-flex pr-2"
                  style={{
                    borderRight: "1px solid #E4E6E7",
                    boxSizing: "border-box",
                    marginRight: -1,
                  }}
                >
                  <div className="d-flex  align-items-center">
                    {Online_ordering.map((item) => (
                      <div key={item} className="m-1 my-md-0 mx-md-2">
                        <Image
                          width={64}
                          height={64}
                          src={item}
                          alt="سفارش‌گیری آنلاین"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className=" d-flex  align-items-center">
              <span
                className="pl-4 ml-2 d-flex align-items-center"
                style={{
                  borderLeft: "1px solid #E4E6E7",
                  height: 64,
                  width: maxWidth768 && 88,
                  fontSize: 15,
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
            </div>
          </div>
        </div>
      </div>

      <div ref={shoppingRef} style={{ backgroundColor: "#F6F6F7" }}>
        <div className="container">
          <div
            style={{
              padding: maxWidth768 ? "32px 0" : "40px 0",
              textAlign: "center",
              fontSize: maxWidth768 ? 20 : 32,
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
                  <h3
                    className="mx-3 font-weight-600"
                    style={{ fontSize: maxWidth768 ? 15 : 20 }}
                  >
                    بیشتر بفروشید
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{
                    fontSize: maxWidth768 ? 15 : 16,
                    textAlign: "right",
                  }}
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
                    <button style={{ fontSize: 20 }}>ساخت سایت</button>
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
                  <h3
                    className="mx-3 font-weight-600"
                    style={{ fontSize: maxWidth768 ? 15 : 20 }}
                  >
                    راحت‌تر بفروشید
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{
                    fontSize: maxWidth768 ? 15 : 16,
                    textAlign: "right",
                  }}
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
                  <button style={{ fontSize: 20 }}>ساخت سایت</button>
                </Link>
              </div>
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

      {/* <div ref={pricingRef} style={{ backgroundColor: "#F6F6F7" }}>
        <div
          className="container d-flex flex-column justify-content-center align-items-center"
          style={{
            paddingTop: maxWidth768 ? 32 : 40,
            paddingBottom: maxWidth768 ? 32 : 40,
          }}
        >
          <h2
            style={{
              color: "#202223",
              fontWeight: 600,
              fontSize: maxWidth768 ? 16 : 20,
              lineHeight: "28px",
            }}
          >
            قیمت ساخت سایت با ویترین به‌صرفه است
          </h2>
          <p
            className={`pt-4 ${maxWidth768 ? "mb-0" : " mb-5"}`}
            style={{ fontSize: 14, lineHeight: "24px", textAlign: "center" }}
          >
            به کمک سایت ساز ویترین می‌توانید در هزینه‌های ساخت سایت صرفه‌جویی
            کنید و متناسب با امکانات و کاربردی که از سایت خودتان انتظار دارید،
            هزینه کنید.
          </p>
          <div
            className="w-100 d-flex my-2 justify-content-center "
            style={{ color: "#0050FF", fontSize: 16 }}
          >
            <Link className="d-flex" href="/pricing">
                <span>مشاهده تعرفه</span>
                <Image
                  width={24}
                  height={24}
                  src="/images/arrow-left-icon-blue.svg"
                  alt="مشاهده نمونه سایت‌ها"
                />
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
      </div> */}

      <div
        style={{
          backgroundColor: "#F2F7FE",
          padding: maxWidth768 ? "32px 0" : "40px 0",
          color: "#202223",
        }}
        ref={exampleRef}
      >
        <div className="d-flex flex-column align-items-center container">
          <p
            className=" font-weight-600"
            style={{
              fontSize: maxWidth768 ? 20 : 32,
              textAlign: "center",
              lineHeight: "28px",
            }}
          >
            سایت‌های ساخته شده با ویترین را ببینید{" "}
          </p>
          <p
            className="pt-4"
            style={{
              fontSize: maxWidth768 ? 15 : 16,
              lineHeight: "24px",
              textAlign: "center",
            }}
          >
            می‌توانید قبل از ساخت سایت خودتان، از نمونه سایت‌های دیگران بازدید
            کنید تا علاوه بر دیدن ایده‌های متنوع، با امکانات مختلف سایت ساز
            ویترین آشنا شوید.
          </p>
          <Link
            className="header-buttons d-flex  justify-content-center align-items-center mt-4"
            href="/cr~templates"
          >
            <button>نمونه خودتان را بسازید</button>
          </Link>
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
            fontSize: maxWidth768 ? 20 : 32,
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
            style={{
              textAlign: "center",
              fontSize: maxWidth768 ? 20 : 32,
              lineHeight: "24px",
            }}
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
      {/* <ContactUs click={() => contactUsRef.current.scrollIntoView()} /> */}
      {/* <Section_4
        content={SectionValues.section_4.content}
        customization={SectionValues.section_4.customization}
      />
      <Section_4
        content={SectionValues.section_5.content}
        customization={SectionValues.section_5.customization}
      />

      <Section_5 />
      <Section_4
        content={SectionValues.section_7.content}
        customization={SectionValues.section_7.customization}
      />
      <Section_4
        content={SectionValues.section_8.content}
        customization={SectionValues.section_8.customization}
      />
      <Section_3
        content={SectionValues.section_9.content}
        customization={SectionValues.section_9.customization}
      />
      <Section_6 content={SectionValues.section_10.content} />
      <Section_7 content={SectionValues.section_11.content} />
      <div ref={contactUsRef}>
        <Section_8 />
      </div>
      <Section_7 content={SectionValues.section_13.content} />
      <ContactUs click={() => contactUsRef.current.scrollIntoView()} />
      <FreeConsultationModal
        isOpen={isOpenConsultationModal}
        onClose={() => setIsOpenConsultationModal(false)}
      /> */}
      <FreeConsultationModal
        isOpen={isOpenConsultationModal}
        onClose={() => setIsOpenConsultationModal(false)}
      />
      <BreadCrumb text="سایت ساز" link={router.asPath} />

      <Footer />
      {maxWidth768 && (
        <div
          className="w-100 d-flex align-items-center p-4"
          style={{
            position: "sticky",
            bottom: 0,
            backgroundColor: isOpenSupport ? "#0050FF" : "transparent",
            justifyContent: !isOpenSupport ? "end" : "space-between",
          }}
        >
          {isOpenSupport && (
            <div className="d-flex">
              <Link
                className="flex-1 d-flex align-items-center justify-content-center px-4"
                style={{
                  borderRadius: 8,
                  height: 52,
                  backgroundColor: "#fff",
                  color: "#0050FF",
                  fontSize: 18,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
                href="/cr~templates"
              >
                رایگان شروع کنید
              </Link>
              <Link
                className="flex-1 d-flex align-items-center justify-content-center px-4 mr-3"
                style={{
                  borderRadius: 8,
                  height: 52,
                  backgroundColor: "#0050FF",
                  color: "#ffffff",
                  border: "1px solid #fff",
                  fontSize: 18,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
                href="/cr~templates"
              >
                انتخاب قالب
              </Link>
            </div>
          )}
          {isOpenSupport ? (
            <div
              style={{ height: 40 }}
              onClick={() => setIsOpenConsultationModal(true)}
            >
              <Image
                alt=""
                width={40}
                height={40}
                src="/images/Support agent.svg"
              />
            </div>
          ) : (
            <div
              style={{ height: 64 }}
              onClick={() => setIsOpenConsultationModal(true)}
            >
              <Image
                alt=""
                width={64}
                height={64}
                src="/images/Frame 451.svg"
              />
            </div>
          )}
        </div>
      )}
    </main>
  );
}

const mapStateToProps = createStructuredSelector({
  formsDictionary: makeSelectFormsDictionary(),
  loading: makeSelectLoading(),
  form: makeSelectVitrinFormInformation(),
  _gmv: makeSelectVitrinGmv(),
});
function mapDispatchToProps(dispatch) {
  return {
    _getFormsDictionary: (id) => dispatch(getFormsDictionary(id)),
    _submitForm: (data, id, cb) => dispatch(createFormResponse(data, id, cb)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
    _showTotolGmv: () => dispatch(showTotolGmv()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(WebsiteBuilderPage);
