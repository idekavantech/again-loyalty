/* eslint-disable @next/next/no-img-element */
import React, { memo, useEffect, useRef, useState } from "react";
import Header from "containers/Header";
import Footer from "components/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Collapse } from "react-collapse";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { CUSTOMER_COMMENTS } from "utils/constants/CUSTOMER_COMMENTS";
import Image from "next/image";
import Link from "next/link";
import FreeConsultationModal from "containers/FreeConsultationModal";
import { FAQS, VITRIN_POSSIBILITIES } from "./constant";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  makeSelectFormsDictionary,
  makeSelectLoading,
  makeSelectVitrinFormInformation,
  makeSelectVitrinGmv,
} from "stores/global/selector";
import {
  createFormResponse,
  getFormsDictionary,
  setSnackBarMessage,
  showTotolGmv,
} from "stores/global/actions";
import { persianToEnglishNumber } from "utils/helpers/persianToEnglishNumber";
import { phoneValidator } from "utils/helpers/phoneValidator";
import { callPhoneNumber } from "utils/helpers/callPhoneNumber";
import Paper from "@material-ui/core/Paper";
import { useRouter } from "next/router";
import BreadCrumb from "components/BreadCrumb";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { priceFormatter } from "utils/helpers/priceFormatter";
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
export const blogs = [
  {
    title: "ساخت فروشگاه اینترنتی",
    image: "/images/bag-icon-white.svg",
    description: "فروش آنلاین خود را با ویترین شروع کنید",
    alt: "فروش آنلاین",
  },
  {
    title: "نمونه سایت‌ها",
    image: "/images/Tick Square.svg",
    description: "سایت‌های ساخته شده با ویترین را ببینید",
    alt: "نمونه سایت‌ها",
  },
  {
    title: "قیمت طراحی سایت",
    image: "/images/Price.svg",
    description: "با قیمت‌های منعطف ویترین آشنا شوید",
    alt: "قیمت طراحی سایت",
  },
];

export const settings = {
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

function SiteBuilderPage({
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
  const pricingRef = useRef();
  const exampleRef = useRef();
  const shoppingRef = useRef();
  const [form, setForm] = useState(null);
  const [_form, _setForm] = useState({});
  const [collapses, setCollapses] = useState({});
  const router = useRouter();
  const form_id = 758;
  const isOpenCollaps = false;
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
    } else if (
      !phoneValidator(persianToEnglishNumber(form?.inputs[1].value)).valid
    ) {
      _setSnackBarMessage("شماره تلفن همراه وارد شده اشتباه است", "fail");
    } else {
      _submitForm(_form, form_id);
      setTimeout(() => {
        form.inputs.forEach((input) => (input.value = ""));
        if (form.inputs.find((input) => input.type === "image")) {
          _removeFile();
        }
        setForm(form);
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
        <Header isTransparent maxWidth768={maxWidth768} />
        <div style={{ paddingTop: maxWidth768 ? "40px" : "60px" }}>
          <Paper elevation={1}>
            <style></style>
            <div>
              <div
                className={`${
                  !maxWidth768 ? "flex-lg-row" : "flex-column"
                } p-5 d-flex w-100 position-relative`}
                style={{ zIndex: 0 }}
              >
                <div></div>
                <div
                  className="d-flex flex-column w-50 justify-content-center"
                  style={{ width: !maxWidth768 ? "50%" : "100%" }}
                >
                  <div>
                    <div
                      // style={{ minHeight: 65 }}
                      className={!maxWidth768 ? "mb-lg-3" : ""}
                    >
                      <h1
                        style={{
                          fontSize: 32,
                          margin: "15px 0",
                          textAlign: !maxWidth768 ? "right" : "center",
                        }}
                      >
                        منو دیجیتال ویترین
                      </h1>
                    </div>
                  </div>

                  <div
                    className="d-flex flex-column"
                    style={{ padding: maxWidth768 ? "20px 0" : "80px 0 0" }}
                  >
                    <div
                      className="u-fontWeightBold u-pre-wrap u-overflow-wrap d-flex align-items-center justify-content-center justify-content-lg-start"
                      style={{ color: "#000", fontSize: 24 }}
                    >
                      سفارش‌گیری رستوران خود را با منوی دیجیتال متحول کنید!
                      مشتری شما تا ۳ برابر سریع‌تر سفارش می‌دهد!
                    </div>

                    <div
                      className={`${
                        !maxWidth768 ? "flex-lg-row" : "flex-column"
                      } d-flex align-items-center mt-4`}
                    ></div>

                    <div
                      className={`d-flex ${
                        maxWidth768
                          ? "justify-content-between"
                          : "justify-content-start"
                      }`}
                      style={{
                        marginTop: `${!maxWidth768 ? " 50px " : "20px"}`,
                      }}
                    >
                      <button
                        className="header-buttons d-flex justify-content-center align-items-center p-4"
                        style={{ fontSize: maxWidth768 ? 17 : 20 }}
                        onClick={() => contactUsRef.current.scrollIntoView()}
                      >
                        درخواست دمو
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className={`${
                    !maxWidth768 ? "mt-lg-0" : ""
                  } d-flex justify-content-end mt-5`}
                  style={{ width: !maxWidth768 ? "50%" : "100%" }}
                >
                  <img
                    src="images/1 - menu digital.jpg"
                    alt="منوی دیجیتال ویترین برای هر کسب‌وکاری لازم است."
                    style={{
                      objectFit: "contain",
                      maxHeight: "100%",
                      maxWidth: "100%",
                    }}
                  />
                </div>
              </div>
            </div>
          </Paper>
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
            با منو دیجیتال ویترین چه امکاناتی دارید؟
          </h2>
          <h2
            className="mt-md-4 mt-2"
            style={{ fontSize: maxWidth768 ? 16 : 24, fontWeight: 400 }}
          >
            فروش شما بیشتر و راحت‌تر می‌شود
          </h2>
          <div className="d-flex flex-md-row flex-column justify-content-between ">
            {VITRIN_POSSIBILITIES.map((possibiliti) => (
              <div
                key={possibiliti?.id}
                className="flex-1 position-relative d-flex flex-column justify-content-between"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  margin:
                    possibiliti?.id == 2
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
                    {englishNumberToPersianNumber(possibiliti?.id)}
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
                    {possibiliti.title}
                  </span>
                  <Image
                    alt=""
                    height={120}
                    width={80}
                    src={possibiliti.image}
                  />
                </div>
                <div>
                  {possibiliti.items.map((item, index) =>
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
              </div>
            ))}
          </div>
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
            منوی دیجیتال چطور فروش شما را افزایش می‌دهد؟
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
                    مشتری راحت‌تر سفارش می‌دهد{" "}
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{
                    fontSize: maxWidth768 ? 15 : 16,
                    textAlign: "right",
                  }}
                >
                  هر مشتری با گوشی موبایل خود می‌تواند از رستوران، کافه یا فست
                  فود شما خرید کند. به سادگی اسکن یه QR Code یا کلیک روی لینک
                  منوی دیجیتال شما. تیم ویترین توانسته بهترین تجربهٔ خرید آنلاین
                  برای کسب‌وکارهای زیادی را فراهم کند و همین موضوع باعث می‌شود
                  سرعت و راحتی خرید مشتری‌های شما بیشتر شود. دوست دارید
                  مشتری‌های راضی و بیشتری داشته باشید؟!
                </p>
              </div>

              <div style={{ padding: maxWidth768 ? "40px 0 10px" : "40px 0" }}>
                <div className="d-flex align-items-center">
                  <Image
                    width={24}
                    height={24}
                    src="/images/website-blue.svg"
                    alt="از همه‌جا مشتری جذب می‌کنید"
                  />
                  <h3
                    className="mx-3 font-weight-600"
                    style={{ fontSize: maxWidth768 ? 15 : 20 }}
                  >
                    از همه‌جا مشتری جذب می‌کنید
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{
                    fontSize: maxWidth768 ? 15 : 16,
                    textAlign: "right",
                  }}
                >
                  حضوری یا آنلاین، فرقی نمی‌کند! لینک منوی دیجیتال خود را در
                  اینستاگرام بگذارید تا مخاطب‌های شما با یک کلیک، مستقیم از شما
                  خرید کنند. منوی شما مثل هر محتوای دیگری، قابلیت اشتراک‌گذاری
                  در تلگرام و واتساپ یا فرستادن در پیامک را دارد. از این روش
                  می‌توانید حتی در تبلیغات اینستاگرام و استوری‌های اینفلوئنسرها
                  استفاده کنید تا هر هزینه‌ای را مستقیما به خرید تبدیل کنید
                </p>
              </div>
              <div className="w-100 d-flex  justify-content-md-end justify-content-center">
                <div
                  style={{ color: "#0050ff", fontSize: 16 }}
                  onClick={() => contactUsRef.current.scrollIntoView()}
                  className="d-flex align-items-center"
                >
                  <span> درخواست دمو</span>
                  <Image
                    width={24}
                    height={24}
                    src="/images/arrow-left-icon-blue.svg"
                    alt="ساخت فروشگاه اینترنتی"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 d-flex justify-content-center">
              <Image
                height={maxWidth768 ? 240 : 400}
                src="/images/2 - increase sales.svg"
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
              منو دیجیتال چطور کار شما را راحت‌تر می‌کند؟
            </h2>
          </div>
          <div
            className="d-flex flex-column flex-md-row"
            style={{ padding: "40px 0 ", color: "#202223", lineHeight: "24px" }}
          >
            <div className="flex-1 align-self-center">
              <Image
                src="/images/3 - ease operations.svg"
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
                    alt="یک منوی دیجیتال به‌روز دارید"
                  />
                  <h3
                    className="mx-3 font-weight-600"
                    style={{ fontSize: maxWidth768 ? 15 : 20 }}
                  >
                    یک منوی دیجیتال به‌روز دارید
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{
                    fontSize: maxWidth768 ? 15 : 16,
                    textAlign: "right",
                  }}
                >
                  به‌روز کردن قیمت‌هایی که ممکن است هر هفته تغییر کنند، برای
                  منوی کاغذی امکان‌پذیر نیست. اما با منو دیجیتال، این امکان را
                  دارید که هر لحظه تمام قیمت‌ها را تغییر دهید، تخفیف‌های مناسبتی
                  روی هر غذا یا دسته‌ای از آن‌ها اعمال کنید و امکان سفارش‌گیری
                  برای هر آیتم منو را به‌سرعت فعال یا غیر فعال کنید. برای افزودن
                  یه غذای جدید به منو دیگر نیاز نیست تا چاپ بعدی منو منتظر
                  بمانید!
                </p>
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
                    وقت و هزینهٔ کمتری صرف می‌کنید
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{
                    fontSize: maxWidth768 ? 15 : 16,
                    textAlign: "right",
                  }}
                >
                  منو دیجیتال رستوران شما می‌تواند سؤال‌های پر تکراری که
                  مشتری‌ها به‌طور سنتی می‌پرسند را پاسخ دهد. مثلا دیگر نیاز نیست
                  برای توضیح مواد اولیه یک غذا وقت بگذارید یا اینکه به سؤالات
                  دربارهٔ موجود بودن یک آیتم پاسخ دهید. با داشتن منو دیجیتال
                  می‌توانید زمان پاسخ‌گویی به مشتریان را کمتر کنید. از طرف دیگر
                  برای ویرایش منوی خود هیچ هزینهٔ چاپ یا ارسالی متحمل نمی‌شوید و
                  به این ترتیب هزینه‌های رستوران، کافه یا فست فود خود را کاهش
                  می‌دهید.
                </p>
              </div>
              <div className="w-100 d-flex  justify-content-md-end justify-content-center">
                <div
                  style={{ color: "#0050ff", fontSize: 16 }}
                  onClick={() => contactUsRef.current.scrollIntoView()}
                  className="d-flex align-items-center"
                >
                  <span> درخواست دمو</span>
                  <Image
                    width={24}
                    height={24}
                    src="/images/arrow-left-icon-blue.svg"
                    alt="ساخت فروشگاه اینترنتی"
                  />
                </div>
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

      <div ref={pricingRef} style={{ backgroundColor: "#F6F6F7" }}>
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
            مهم‌ترین مزیت منو دیجیتال ویترین چیست؟
          </h2>
          <p
            className={`pt-4 ${maxWidth768 ? "mb-0" : " mb-5"}`}
            style={{ fontSize: 14, lineHeight: "24px", textAlign: "center" }}
          >
            یکپارچگی! منو دیجیتال ویترین به راحتی می‌تواند به یک سایت کامل برای
            رستوران، کافه یا فست‌فود شما تبدیل شود چون از زیرساخت و تکنولوژی
            فروش آنلاین ویترین استفاده می‌کند. از طرف دیگر یکپارچگی ویترین با
            نرم‌افزار صندوق فروشگاهی و باشگاه مشتریان دلخواه شما می‌تواند فروش
            آنلاین شما را چندبرابر سریع‌تر و راحت‌تر کند.
          </p>

          <Image
            height={maxWidth768 ? 232 : 438}
            width={maxWidth768 ? 342 : 600}
            className="mt-4"
            src="/images/4 - integrations.svg"
            alt="ساخت سایت با ویترین به سرعت و با چند کلیک امکان پذیر است."
          />
        </div>
      </div>

      {/* <div
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
            چه کسب‌وکارهایی از منوی دیجیتال ویترین استفاده می‌کنند؟{" "}
          </p>
        </div>

        <div className="sample-site w-100">
          <Slider {...settings}>
            {siteExample?.map((item, index) => (
              <div className="image-container" style={{height: 296,
                marginTop: 61}} key={item.id}>
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
      </div> */}
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
                <p className="font-weight-600">
                  دربارهٔ منوی دیجیتال سؤالی دارید؟
                </p>
                <p className="mt-4">
                  برای درخواست دمو و جزئیات بیشتر دربارهٔ منوی دیجیتال ویترین،
                  لطفا اطلاعات خود را در فرم مشاوره ثبت کنید تا با شما تماس
                  بگیریم.
                  <br />
                  برای تماس تلفنی با تیم پشتیبانی ویترین، شمارهٔ ۰۲۱۹۱۰۷۰۷۵۱ در
                  اختیار شماست
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
                    value={form?.inputs[0]?.value}
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
                    value={form?.inputs[1]?.value}
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
                    value={form?.inputs[2]?.value}
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
      <FreeConsultationModal
        isOpen={isOpenConsultationModal}
        onClose={() => setIsOpenConsultationModal(false)}
      />
      <BreadCrumb text="منو دیجیتال" link={router.asPath} />

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
            <Link
              href="/cr~templates"
              className="flex-1 d-flex align-items-center justify-content-center"
              style={{
                marginLeft: 83,
                borderRadius: 8,
                height: 52,
                backgroundColor: "#fff",
                color: "#0050FF",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              شروع کنید
            </Link>
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
export default compose(withConnect, memo)(SiteBuilderPage);
