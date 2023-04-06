/* eslint-disable @next/next/no-img-element */
import React, { memo, useState, useRef, useEffect } from "react";
import Header from "containers/Header";
import Footer from "components/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Collapse } from "react-collapse";
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
import { useRouter } from "next/router";
import BreadCrumb from "components/BreadCrumb";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { priceFormatter } from "utils/helpers/priceFormatter";
import { showTotolGmv, createVitrin } from "stores/global/actions";
import { makeSelectVitrinGmv } from "stores/global/selector";
import { NumberOfBrands } from "utils/constants";
import { setQueriesInLocalstorage } from "utils/helpers/setQueriesInLocalstorage";
import { persianToEnglishNumber } from "utils/helpers/persianToEnglishNumber";

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

function NewSiteBuilderPage({
  formsDictionary,
  _getFormsDictionary,
  _setSnackBarMessage,
  _submitForm,
  loading,
  _gmv,
  _showTotolGmv,
  _createVitrin,
}) {
  const contactUsRef = useRef();
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
  const possibilitiesRef = useRef();
  const possibilitiesRefMobile = useRef();
  useEffect(() => {
    setQueriesInLocalstorage(router.query);
  }, [router]);

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
        _createVitrin({ phone: form?.inputs[1].value });
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
        <Header isTransparent />
      </div>
      {/* Banner (Mobile) */}
      <div
        className="d-flex d-md-none flex-column align-items-center"
        style={{ backgroundColor: "#fff" }}
      >
        <h1
          className="text-center"
          style={{
            fontSize: 24,
            fontWeight: 600,
            paddingTop: 40,
          }}
        >
          سایت ساز ویترین
        </h1>
        <h2
          className="text-center"
          style={{
            fontSize: 16,
            fontWeight: 600,
            paddingTop: 36,
          }}
        >
          مورد اعتماد بیش از {NumberOfBrands} کسب‌وکار و برند بوده‌ایم
        </h2>
        <div style={{ width: "100%", overflowX: "hidden" }}>
          <div
            className="d-flex slide-logos-two mt-4"
            onClick={() => exampleRef.current.scrollIntoView()}
          >
            {CUSTOMERS.map((item) => (
              <div
                className=" position-relative d-flex m-2 p-1"
                key={item}
                style={{
                  borderRadius: 16,
                }}
              >
                <Image
                  unoptimized
                  width={60}
                  height={60}
                  src={item}
                  layout="fixed"
                  alt="customer"
                  className="logo-img"
                  priority
                />
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row mt-md-5">
          <p style={{ fontSize: 14, fontWeight: 500 }} className="text-center">
            و به آن‌ها کمک کرده‌ایم تا این لحظه بیش از
          </p>
          <p
            className="text-center mt-4 mt-md-0 ml-md-3"
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#0050FF",
            }}
          >
            {" "}
            <span className="my-1 my-md-2 mx-3">{priceFormatter(_gmv)}</span>
            <span>تومان</span>
          </p>
          <p
            style={{ fontSize: 14, fontWeight: 500 }}
            className="text-center mt-4 mt-md-0"
          >
            از طریق وبسایت‌های خود درآمد ‌کسب کنند
          </p>
        </div>
        <Link passHref href="/cr~templates?step=0">
          <button
            style={{
              backgroundColor: "#0050FF",
              color: "#fff",
              height: 60,
              borderRadius: 8,
              minWidth: 296,
              fontSize: 18,
              marginTop: 32,
            }}
          >
            رایگان شروع کنید
          </button>
        </Link>

        <div
          style={{ width: 296 }}
          className="mt-4 d-flex justify-content-between align-items-center"
        >
          <Link passHref href="/cr~templates">
            <button
              style={{
                height: 44,
                color: "#0050FF",
                border: "1px solid #0050FF",
                borderRadius: 8,
                width: 144,
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              مشاهده قالب‌ها
            </button>
          </Link>

          <button
            style={{
              height: 44,
              color: "#0050FF",
              border: "1px solid #0050FF",
              borderRadius: 8,
              width: 144,
              fontSize: 15,
              fontWeight: 500,
            }}
            onClick={() => possibilitiesRefMobile.current.scrollIntoView()}
          >
            امکانات و ویژگی‌‌ها
          </button>
        </div>
        <div
          style={{
            width: 300,
            height: 300,
            marginTop: 50,
          }}
        >
          <Image
            unoptimized
            priority
            src={"/images/p1.webp"}
            width="300px"
            height="280px"
            alt="یک نمونه از سایتی که با سایت ساز ویترین ساخته شده است."
          />
        </div>
      </div>
      {/* Banner (Desktop) */}
      <div
        className="d-none d-md-flex flex-column align-items-center"
        style={{ backgroundColor: "#f2f7fe" }}
      >
        <h1
          className="text-center"
          style={{
            fontSize: 48,
            fontWeight: 600,
            paddingTop: 150,
          }}
        >
          سایت ساز ویترین
        </h1>
        <h2
          className="text-center"
          style={{
            fontSize: 28,
            fontWeight: 600,
            paddingTop: 36,
          }}
        >
          مورد اعتماد بیش از {NumberOfBrands} کسب‌وکار و برند بوده‌ایم
        </h2>
        <div style={{ width: 700, overflowX: "hidden" }}>
          <div
            className="d-flex slide-logos-two mt-4"
            onClick={() => exampleRef.current.scrollIntoView()}
          >
            {CUSTOMERS.map((item) => (
              <div
                className=" position-relative d-flex m-2 p-1"
                key={item}
                style={{
                  borderRadius: 16,
                }}
              >
                <Image
                  unoptimized
                  priority
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
        <div className="d-flex flex-column flex-md-row mt-md-5">
          <p style={{ fontSize: 20, fontWeight: 500 }} className="text-center">
            و به آن‌ها کمک کرده‌ایم تا این لحظه بیش از
          </p>

          <p
            className="text-center mt-4 mt-md-0 ml-md-3"
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#0050FF",
            }}
          >
            {" "}
            <span className="my-1 my-md-2 mx-3">{priceFormatter(_gmv)}</span>
            <span>تومان</span>
          </p>
          <p
            style={{ fontSize: 20, fontWeight: 500 }}
            className="text-center mt-4 mt-md-0"
          >
            از طریق وبسایت‌های خود درآمد ‌کسب کنند
          </p>
        </div>
        <Link passHref href="/cr~templates?step=0">
          <button
            style={{
              backgroundColor: "#0050FF",
              color: "#fff",
              height: 60,
              borderRadius: 8,
              minWidth: 296,
              fontSize: 18,
              marginTop: 40,
            }}
          >
            رایگان شروع کنید
          </button>
        </Link>
        <div
          style={{ width: 296 }}
          className="mt-4 d-flex justify-content-between align-items-center"
        >
          <Link passHref href="/cr~templates">
            <button
              style={{
                height: 44,
                color: "#0050FF",
                border: "1px solid #0050FF",
                borderRadius: 8,
                width: 144,
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              مشاهده قالب‌ها
            </button>
          </Link>

          <button
            style={{
              height: 44,
              color: "#0050FF",
              border: "1px solid #0050FF",
              borderRadius: 8,
              width: 144,
              fontSize: 15,
              fontWeight: 500,
            }}
            onClick={() => possibilitiesRef.current.scrollIntoView()}
          >
            امکانات و ویژگی‌‌ها
          </button>
        </div>
        <div
          style={{
            width: 700,
            height: "auto",
            marginTop: 20,
          }}
        >
          <Image
            unoptimized
            src={"/images/header3-2.webp"}
            width="691px"
            height="389px"
            alt="یک نمونه از سایتی که با سایت ساز ویترین ساخته شده است."
            priority
          />
        </div>
      </div>
      {/* Features (Mobile) */}
      <div
        ref={possibilitiesRefMobile}
        className="d-md-none"
        style={{
          padding: "32px 0",
          textAlign: "center",
          backgroundColor: "#F2F7FE",
        }}
      >
        <div className="container">
          <h2 style={{ fontSize: 16, fontWeight: 500 }}>
            امکانات ویترین را بشناسید
          </h2>
          <p className="mt-md-4 mt-2" style={{ fontSize: 16, fontWeight: 400 }}>
            چگونه ویترین به شما کمک می کند؟
          </p>
          <div className="d-flex flex-md-row flex-column justify-content-between ">
            {VITRIN_POSSIBILITIES.map((possibiliti) => (
              <div
                key={possibiliti?.id}
                className="flex-1 position-relative d-flex flex-column justify-content-between"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  margin: possibiliti?.id == 2 ? "70px 0 24px" : 0,
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
                    padding: "0 25px",
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
                  <h3
                    style={{
                      fontSize: 16,
                      color: "#0050FF",
                      fontWeight: 700,
                      lineHeight: "16px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {possibiliti.title}
                  </h3>
                  <Image
                    alt=""
                    unoptimized
                    height={120}
                    width={80}
                    src={possibiliti.image}
                    priority
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
                        transition: "transform 0.5s",
                        width: 12,
                        height: 12,
                      }}
                    >
                      <Image
                        alt=""
                        unoptimized
                        priority
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
                  unoptimized
                  layout="fill"
                  src="/images/arrow-bottom-icon-blue.svg"
                  priority
                />
              </div>
            </button>
          )}
        </div>
        <Link
          href="/cr~templates"
          className="w-100 d-flex justify-content-center align-items-center"
          style={{ marginTop: 40 }}
        >
          <Image
            alt=""
            unoptimized
            width={40}
            height={40}
            src="/images/web.svg"
            priority
          />
          <span
            className="mr-2"
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: "#0050FF",
            }}
          >
            ویترین خودتان را بسازید
          </span>
        </Link>
      </div>
      {/* Features (Desktop) */}
      <div
        ref={possibilitiesRef}
        className="d-none d-md-block"
        style={{
          padding: "32px 0px 52px",
          textAlign: "center",
          backgroundColor: "#F2F7FE",
        }}
      >
        <div className="container">
          <h2 style={{ fontSize: 32, fontWeight: 500 }}>
            امکانات ویترین را بشناسید
          </h2>
          <p className="mt-md-4 mt-2" style={{ fontSize: 24, fontWeight: 400 }}>
            چگونه ویترین به شما کمک می کند؟
          </p>
          <div className="d-flex flex-md-row flex-column justify-content-between ">
            {VITRIN_POSSIBILITIES.map((possibiliti) => (
              <div
                key={possibiliti?.id}
                className="flex-1 position-relative d-flex flex-column justify-content-between"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  margin: possibiliti?.id == 2 ? "0 43px" : 0,
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
                    padding: "0 20px",
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
                  <h3
                    style={{
                      fontSize: 18,
                      color: "#0050FF",
                      fontWeight: 700,
                      lineHeight: "16px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {possibiliti.title}
                  </h3>
                  <Image
                    alt=""
                    unoptimized
                    height={120}
                    width={80}
                    src={possibiliti.image}
                    priority
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
                        unoptimized
                        priority
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
                  unoptimized
                  layout="fill"
                  src="/images/arrow-bottom-icon-blue.svg"
                  priority
                />
              </div>
            </button>
          )}
        </div>
        <Link
          href="/cr~templates"
          className="w-100 d-flex justify-content-center align-items-center"
          style={{ marginTop: 40 }}
        >
          <Image
            alt=""
            unoptimized
            width={40}
            height={40}
            src="/images/web.svg"
            priority
          />
          <span
            className="mr-2"
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: "#0050FF",
            }}
          >
            ویترین خودتان را بسازید
          </span>
        </Link>
      </div>
      {/* With taste (Mobile) */}
      <div style={{ backgroundColor: "#fff" }}>
        <div
          className="container d-flex d-md-none flex-column justify-content-center align-items-center"
          style={{
            paddingTop: 32,
            paddingBottom: 32,
          }}
        >
          <h2
            style={{
              color: "#202223",
              fontWeight: 600,
              fontSize: 20,
              lineHeight: "28px",
            }}
          >
            با یک قالب سایت زیبا شروع کنید
          </h2>
          <p
            className={`pt-3 pt-md-4 mb-0`}
            style={{
              fontSize: 15,
              lineHeight: "24px",
              width: "100%",
              textAlign: "center",
            }}
          >
            به کمک سایت ساز ویترین می‌توانید با چند کلیک و در ۵ دقیقه یک سایت
            زیبا بسازید! برای شروع یک قالب انتخاب کنید و سپس هر تغییر ظاهری و
            محتوایی که مد نظر داشتید، به‌راحتی روی آن اعمال کنید.
          </p>
          <Link
            href="/cr~templates"
            className="header-buttons d-flex  justify-content-center align-items-center mt-4"
          >
            <button>مشاهده قالب</button>
          </Link>
          <Image
            unoptimized
            height={232}
            width={342}
            className="mt-4"
            src="/images/site-temp.jpg"
            alt="نمونه‌هایی از قالب‌های سایت ساز ویترین"
            priority
          />
        </div>
      </div>
      {/* With taste (Desktop) */}
      <div style={{ backgroundColor: "#fff" }}>
        <div
          className="container d-none d-md-flex flex-column justify-content-center align-items-center"
          style={{
            paddingTop: 48,
            paddingBottom: 60,
          }}
        >
          <h2
            style={{
              color: "#202223",
              fontWeight: 600,
              fontSize: 32,
              lineHeight: "28px",
            }}
          >
            با یک قالب سایت زیبا شروع کنید
          </h2>
          <p
            className={`pt-3 pt-md-4 mb-5`}
            style={{
              fontSize: 16,
              lineHeight: "24px",
              width: 573,
              textAlign: "center",
            }}
          >
            به کمک سایت ساز ویترین می‌توانید با چند کلیک و در ۵ دقیقه یک سایت
            زیبا بسازید! برای شروع یک قالب انتخاب کنید و سپس هر تغییر ظاهری و
            محتوایی که مد نظر داشتید، به‌راحتی روی آن اعمال کنید.
          </p>
          <Link
            href="/cr~templates"
            className="header-buttons d-flex  justify-content-center align-items-center mt-4"
          >
            <button>مشاهده قالب</button>
          </Link>
          <Image
            unoptimized
            height={438}
            width={600}
            className="mt-4"
            src="/images/site-temp.jpg"
            alt="نمونه‌هایی از قالب‌های سایت ساز ویترین"
            priority
          />
        </div>
      </div>
      {/* Advantages (Mobile) */}
      <div
        className="d-md-none"
        style={{
          padding: "32px 0",
          textAlign: "center",
          backgroundColor: "#F6F6F7",
        }}
      >
        <div className="container">
          <h2
            style={{
              textAlign: "center",
              fontSize: 20,
              lineHeight: "28px",
              paddingBottom: 16,
              borderBottom: "1px solid #E4E6E7",
              width: "100%",
              color: "#202223",
              fontWeight: 600,
            }}
          >
            با مزیت سایت ساز ویترین آشنا شوید
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
                    unoptimized
                    width={24}
                    height={24}
                    src="/images/edit-square-blue.svg"
                    alt="سایت اختصاصی شما"
                    priority
                  />
                  <h3 className="mx-3 font-weight-600" style={{ fontSize: 15 }}>
                    یک سایت حرفه‌ای و مختص خودتان
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 15, textAlign: "right" }}
                >
                  داشتن سایتی که تمام صفحات و جزئیات آن مطابق سلیقه مالک آن
                  باشد، برای تمامی افراد خوشایند است. از همین رو ویترین راه‌حلی
                  به‌صورت استفاده آسان از کامل‌ترین ابزار سایت ساز ارائه می‌کند.
                  شما برای استفاده از سایت ساز ویترین نیاز به هیچ گونه کدنویسی
                  یا حتی یادگیری آن ندارید و می‌توانید از ابزارهای آماده استفاده
                  کنید. از طرف دیگر هر لحظه که بخواهید می‌توانید به‌راحتی، حتی
                  با گوشی ظاهر سایت را عوض کنید و محتوای صفحات را بنا به سلیقه و
                  نیاز خود به‌روز کنید. بله درست متوجه شدید، مدیریت سایت‌های
                  ساخته شده با ویترین بسیار آسان است!
                </p>
                <div className="w-100 d-flex justify-content-md-end justify-content-center mb-4">
                  <Link
                    href="/cr~templates"
                    className="header-buttons-site-builder col-5 d-flex  justify-content-center align-items-center  ml-2 ml-md-4"
                  >
                    <button style={{ fontSize: 20 }}>ساخت سایت</button>
                  </Link>
                </div>
              </div>

              <div style={{ padding: "40px 0 10px" }}>
                <div className="d-flex align-items-center">
                  <Image
                    unoptimized
                    width={24}
                    height={24}
                    src="/images/website-blue.svg"
                    alt="یک سایت با سئوی فنی خودکار و طراحی واکنش‌گرا"
                    priority
                  />
                  <h3 className="mx-3 font-weight-600" style={{ fontSize: 15 }}>
                    یک سایت با سئوی فنی خودکار و طراحی واکنش‌گرا
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 15, textAlign: "right" }}
                >
                  <span>
                    امروزه اکثر کاربران برای دسترسی به اینترنت از گوشی خود
                    استفاده می‌کنند. به همین دلیل شما نیاز به سایتی دارید که
                    برای کاربران موبایل هم بهینه باشد. با سایت ساز ویترین
                    می‌توانید سایتی بسازید که با استفاده از طراحی واکنش‌گرا
                    (Responsive) کار می‌کند و در صفحه‌نمایش تمامی تلفن‌های
                    همراه، به درستی دیده می‌شود. در رابطه با سئو و بهینه‌سازی
                    برای موتورهای جست‌وجو هم می‌توانید با تمرکز روی محتوا و
                    استفاده از ابزار سئو محتوایی و
                  </span>
                  <a
                    href="https://vitrin.me/blog/84542-%D8%A2%D9%85%D9%88%D8%B2%D8%B4-%D8%B3%D8%A6%D9%88"
                    style={{ color: "#0050FF" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    آموزش سئو با ویترین
                  </a>
                  <span>
                    ، سایت خود را در گوگل به رتبه‌های بالاتر برسانید. نتیجه تمام
                    این‌ها هم ترافیک بالای سایت و فروش بیش‌تر سایت شما خواهد
                    بود.
                  </span>
                </p>
              </div>
              <div className="w-100 d-flex justify-content-md-end justify-content-center mb-4">
                <Link
                  className="header-buttons-site-builder col-5 d-flex  justify-content-center align-items-center  ml-2 ml-md-4"
                  href="/cr~templates"
                >
                  <button style={{ fontSize: 20 }}>ساخت سایت</button>
                </Link>
              </div>
            </div>
            <div className="flex-1 d-flex justify-content-center">
              <Image
                unoptimized
                height={240}
                src="/images/1-WebDesign3.svg"
                width={320}
                alt="برخی از امکانات سایت ساز ویترین"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      {/* Advantages (Desktop) */}
      <div
        className="d-none d-md-block"
        style={{
          padding: "40px 0px",
          textAlign: "center",
          backgroundColor: "#F6F6F7",
        }}
      >
        <div className="container">
          <h2
            style={{
              textAlign: "center",
              fontSize: 32,
              lineHeight: "28px",
              paddingBottom: 40,
              borderBottom: "1px solid #E4E6E7",
              width: "100%",
              color: "#202223",
              fontWeight: 600,
            }}
          >
            با مزیت سایت ساز ویترین آشنا شوید
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
                    unoptimized
                    width={24}
                    height={24}
                    src="/images/edit-square-blue.svg"
                    alt="سایت اختصاصی شما"
                    priority
                  />
                  <h3 className="mx-3 font-weight-600" style={{ fontSize: 20 }}>
                    یک سایت حرفه‌ای و مختص خودتان
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 16, textAlign: "right" }}
                >
                  داشتن سایتی که تمام صفحات و جزئیات آن مطابق سلیقه مالک آن
                  باشد، برای تمامی افراد خوشایند است. از همین رو ویترین راه‌حلی
                  به‌صورت استفاده آسان از کامل‌ترین ابزار سایت ساز ارائه می‌کند.
                  شما برای استفاده از سایت ساز ویترین نیاز به هیچ گونه کدنویسی
                  یا حتی یادگیری آن ندارید و می‌توانید از ابزارهای آماده استفاده
                  کنید. از طرف دیگر هر لحظه که بخواهید می‌توانید به‌راحتی، حتی
                  با گوشی ظاهر سایت را عوض کنید و محتوای صفحات را بنا به سلیقه و
                  نیاز خود به‌روز کنید. بله درست متوجه شدید، مدیریت سایت‌های
                  ساخته شده با ویترین بسیار آسان است!
                </p>
                <div className="w-100 d-flex justify-content-md-end justify-content-center mb-4">
                  <Link
                    className="header-buttons-site-builder col-5 d-flex  justify-content-center align-items-center  ml-2 ml-md-4"
                    href="/cr~templates"
                  >
                    <button style={{ fontSize: 20 }}>ساخت سایت</button>
                  </Link>
                </div>
              </div>

              <div style={{ padding: "40px 0" }}>
                <div className="d-flex align-items-center">
                  <Image
                    unoptimized
                    width={24}
                    height={24}
                    src="/images/website-blue.svg"
                    alt="یک سایت با سئوی فنی خودکار و طراحی واکنش‌گرا"
                    priority
                  />
                  <h3 className="mx-3 font-weight-600" style={{ fontSize: 20 }}>
                    یک سایت با سئوی فنی خودکار و طراحی واکنش‌گرا
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 16, textAlign: "right" }}
                >
                  <span>
                    امروزه اکثر کاربران برای دسترسی به اینترنت از گوشی خود
                    استفاده می‌کنند. به همین دلیل شما نیاز به سایتی دارید که
                    برای کاربران موبایل هم بهینه باشد. با سایت ساز ویترین
                    می‌توانید سایتی بسازید که با استفاده از طراحی واکنش‌گرا
                    (Responsive) کار می‌کند و در صفحه‌نمایش تمامی تلفن‌های
                    همراه، به درستی دیده می‌شود. در رابطه با سئو و بهینه‌سازی
                    برای موتورهای جست‌وجو هم می‌توانید با تمرکز روی محتوا و
                    استفاده از ابزار سئو محتوایی و
                  </span>
                  <a
                    href="https://vitrin.me/blog/84542-%D8%A2%D9%85%D9%88%D8%B2%D8%B4-%D8%B3%D8%A6%D9%88"
                    style={{ color: "#0050FF" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    آموزش سئو با ویترین
                  </a>
                  <span>
                    ، سایت خود را در گوگل به رتبه‌های بالاتر برسانید. نتیجه تمام
                    این‌ها هم ترافیک بالای سایت و فروش بیش‌تر سایت شما خواهد
                    بود.
                  </span>
                </p>
              </div>
              <div className="w-100 d-flex justify-content-md-end justify-content-center mb-4">
                <Link
                  className="header-buttons-site-builder col-5 d-flex  justify-content-center align-items-center  ml-2 ml-md-4"
                  href="/cr~templates"
                >
                  <button style={{ fontSize: 20 }}>ساخت سایت</button>
                </Link>
              </div>
            </div>
            <div className="flex-1 d-flex justify-content-center">
              <Image
                unoptimized
                height={1117}
                src="/images/1-WebDesign3.svg"
                width={1595}
                alt="برخی از امکانات سایت ساز ویترین"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      {/* Marketing (Mobile) */}
      <div
        className="d-md-none"
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
              fontSize: 20,
              fontWeight: 500,
              lineHeight: "24px",
              marginBottom: 24,
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
                  width: 88,
                  fontSize: 15,
                }}
              >
                مدیریت ارسال
              </span>
              <div className="m-1 my-md-0 mx-md-2">
                <Image
                  unoptimized
                  width={64}
                  height={64}
                  src="/images/miare-icon.svg"
                  alt="میاره"
                  priority
                />
              </div>
              <div className="m-1 my-md-0 mx-md-2">
                <Image
                  unoptimized
                  priority
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
                  width: 88,
                  fontSize: 15,
                }}
              >
                سفارش‌گیری آنلاین
              </span>
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
                            unoptimized
                            width={64}
                            height={64}
                            src={item}
                            alt="سفارش‌گیری آنلاین"
                            priority
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
                            unoptimized
                            priority
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
            </div>
            <div className=" d-flex  align-items-center">
              <span
                className="pl-4 ml-2 d-flex align-items-center"
                style={{
                  borderLeft: "1px solid #E4E6E7",
                  height: 64,
                  width: 88,
                  fontSize: 15,
                }}
              >
                درگاه پرداخت
              </span>
              <div className="m-1 my-md-0 mx-md-2">
                <Image
                  unoptimized
                  width={64}
                  height={64}
                  src="/images/zarinpall-icon.svg"
                  alt="زرین پال"
                  priority
                />
              </div>

              <div className="m-1 my-md-0 mx-md-2">
                <Image
                  unoptimized
                  width={64}
                  height={64}
                  src="/images/idpay-icon.svg"
                  alt="آیدی پی"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Marketing (Desktop) */}
      <div
        className="d-none d-md-block"
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
              fontSize: 24,
              fontWeight: 500,
              lineHeight: "24px",
              marginBottom: 60,
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
                  fontSize: 15,
                }}
              >
                مدیریت ارسال
              </span>
              <div className="m-1 my-md-0 mx-md-2">
                <Image
                  unoptimized
                  width={64}
                  height={64}
                  src="/images/miare-icon.svg"
                  alt="میاره"
                  priority
                />
              </div>
              <div className="m-1 my-md-0 mx-md-2">
                <Image
                  unoptimized
                  width={64}
                  height={64}
                  src="/images/alopeyk-icon.svg"
                  alt="الوپیک"
                  priority
                />
              </div>
            </div>
            <div className=" d-flex my-4 py-4 align-items-center">
              <span
                className="pl-4  d-flex align-items-center flex-wrap"
                style={{
                  height: 64,
                  fontSize: 15,
                }}
              >
                سفارش‌گیری آنلاین
              </span>
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
                        unoptimized
                        width={64}
                        height={64}
                        src={item}
                        alt="سفارش‌گیری آنلاین"
                        priority
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className=" d-flex  align-items-center">
              <span
                className="pl-4 ml-2 d-flex align-items-center"
                style={{
                  borderLeft: "1px solid #E4E6E7",
                  height: 64,
                  fontSize: 15,
                }}
              >
                درگاه پرداخت
              </span>
              <div className="m-1 my-md-0 mx-md-2">
                <Image
                  unoptimized
                  width={64}
                  height={64}
                  src="/images/zarinpall-icon.svg"
                  alt="زرین پال"
                  priority
                />
              </div>

              <div className="m-1 my-md-0 mx-md-2">
                <Image
                  unoptimized
                  width={64}
                  height={64}
                  src="/images/idpay-icon.svg"
                  alt="آیدی پی"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Examples (Mobile) */}
      <div
        className="d-md-none"
        style={{
          backgroundColor: "#F2F7FE",
          padding: "32px 0",
          color: "#202223",
        }}
        ref={exampleRef}
      >
        <div className="d-flex flex-column align-items-center container">
          <h2
            className=" font-weight-600"
            style={{
              fontSize: 20,
              textAlign: "center",
              lineHeight: "28px",
            }}
          >
            نمونه سایت‌های ساخته شده با سایت ساز ویترین را ببینید
          </h2>
          <p
            className="pt-4"
            style={{
              fontSize: 15,
              lineHeight: "24px",
              textAlign: "center",
            }}
          >
            معمولا پیشنهاد می‌شود قبل از اینکه سایت خودتان را بسازید، ابتدا از
            نمونه‌کارهای دیگران بازدید کنید تا با ایده‌های مختلف آشنا شوید و
            بتوانید از بهترین آن‌ها در سایت خودتان استفاده کنید. نمونه‌های مختلف
            سایت ساز ویترین متنوع و گسترده هستند.
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
                unoptimized
                width={24}
                height={24}
                src="/images/arrow-left-icon-blue.svg"
                alt="مشاهده نمونه سایت‌ها"
                priority
              />
            </Link>
          </p>
        </div>

        <div className="sample-site w-100">
          <Slider {...settings}>
            {siteExample?.map((item) => (
              <div className="image-container" key={item.id}>
                <Image
                  unoptimized
                  layout="fill"
                  className="image"
                  src={item.image}
                  alt={item.alt}
                  priority
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* Examples (Desktop) */}
      <div
        className="d-none d-md-block"
        style={{
          backgroundColor: "#F2F7FE",
          padding: "40px 0",
          color: "#202223",
        }}
        ref={exampleRef}
      >
        <div className="d-flex flex-column align-items-center container">
          <h2
            className=" font-weight-600"
            style={{
              fontSize: 32,
              textAlign: "center",
              lineHeight: "28px",
            }}
          >
            نمونه سایت‌های ساخته شده با سایت ساز ویترین را ببینید
          </h2>
          <p
            className="pt-4"
            style={{
              fontSize: 16,
              lineHeight: "24px",
              textAlign: "center",
            }}
          >
            معمولا پیشنهاد می‌شود قبل از اینکه سایت خودتان را بسازید، ابتدا از
            نمونه‌کارهای دیگران بازدید کنید تا با ایده‌های مختلف آشنا شوید و
            بتوانید از بهترین آن‌ها در سایت خودتان استفاده کنید. نمونه‌های مختلف
            سایت ساز ویترین متنوع و گسترده هستند.
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
                unoptimized
                width={24}
                height={24}
                src="/images/arrow-left-icon-blue.svg"
                alt="مشاهده نمونه سایت‌ها"
                priority
              />
            </Link>
          </p>
        </div>

        <div className="sample-site w-100">
          <Slider {...settings}>
            {siteExample?.map((item) => (
              <div className="image-container" key={item.id}>
                <Image
                  unoptimized
                  priority
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
      {/* Comments (Mobile) */}
      <div
        className="d-md-none"
        style={{
          backgroundColor: "#5699d8",
          padding: "32px 0",
        }}
      >
        <p
          style={{
            fontSize: 20,
            textAlign: "center",
            lineHeight: "28px",
            color: "#fff",
          }}
        >
          نظرات مشتریان
        </p>
        <div className="customers-comments w-100" style={{ paddingTop: 29 }}>
          <Slider {...customers_comments_slider_setting}>
            {CUSTOMER_COMMENTS.map((customer) => (
              <div key={customer.id}>
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
                      unoptimized
                      width={204}
                      height={204}
                      src={customer.image}
                      className="radius-16"
                      alt={customer.name}
                      priority
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
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* Comments (Desktop) */}
      <div
        className="d-none d-md-block"
        style={{
          backgroundColor: "#5699d8",
          padding: "40px 0 80px",
        }}
      >
        <p
          style={{
            fontSize: 32,
            textAlign: "center",
            lineHeight: "28px",
            color: "#fff",
          }}
        >
          نظرات مشتریان
        </p>
        <div className="customers-comments w-100" style={{ paddingTop: 40 }}>
          <Slider {...customers_comments_slider_setting}>
            {CUSTOMER_COMMENTS.map((customer) => (
              <div key={customer.id}>
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
                        unoptimized
                        width={185}
                        height={185}
                        src={customer.image}
                        className="radius-8"
                        alt={customer.name}
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* Online Shopping (Mobile) */}
      <div
        ref={shoppingRef}
        className="d-md-none"
        style={{ backgroundColor: "#F6F6F7" }}
      >
        <div className="container">
          <div
            style={{
              padding: "32px 0",
              textAlign: "center",
              fontSize: 20,
              lineHeight: "28px",
              paddingBottom: 16,
              color: "#202223",
              borderBottom: "1px solid #E4E6E7",
            }}
          >
            <h2 className="font-weight-600">
              سایت ساز ویترین مجموعه‌ای از قابلیت‌های حرفه‌ای فروش آنلاین دارد
            </h2>
          </div>
          <div
            className="d-flex flex-column flex-md-row"
            style={{ padding: "40px 0 ", color: "#202223", lineHeight: "24px" }}
          >
            <div className="flex-1 align-self-center">
              <Image
                unoptimized
                src="/images/2-Shopping3.svg"
                width={320}
                height={240}
                alt="نمونه‌ای ازقابلیت‌های سایت ساز ویترین برا فروش آنلاین"
                priority
              />
            </div>
            <div className="flex-1 position-relative">
              <div
                className="pb-5"
                style={{ borderBottom: "1px solid #E4E6E7" }}
              >
                <div className="d-flex align-items-center">
                  <Image
                    unoptimized
                    width={24}
                    height={24}
                    src="/images/edit-square-blue.svg"
                    alt="وب‌سایت و وب‌اپلیکیشن اختصاصی"
                    priority
                  />
                  <h3 className="mx-3 font-weight-600" style={{ fontSize: 15 }}>
                    فروش سایت شما بیشتر می‌شود
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 15, textAlign: "right" }}
                >
                  از اهداف اصلی هر کسب‌وکار، تبدیل شدن به یکی از بهترین‌ها و
                  فروش بیش‌تر است. هر سایتی که با سایت ساز ویترین بسازید، قابلیت
                  تبدیل به یک فروشگاه اینترنتی حرفه‌ای را دارد. سایت‌های
                  فروشگاهی ویترین از تکنولوژی I.O.M استفاده می‌کنند که به کمک آن
                  می‌توانید فروش خود را بیش‌تر کنید. I.O.M تکنولوژی فروش آنلاین
                  ویترین است که امکان افزایش فروش را از طریق یکپارچه کردن عملیات
                  روزمره کسب‌وکار و فرایندهای بازاریابی در اختیار شما قرار
                  می‌دهد. در نهایت هم این ابزارهای اتوماسیون بازاریابی ویترین،
                  به شما امکان می‌دهند تا فروش سایت خود را تا ۲۰۰٪ افزایش دهید!
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
              <div style={{ padding: "40px 0 10px" }}>
                <div className="d-flex align-items-center">
                  <Image
                    unoptimized
                    width={24}
                    height={24}
                    src="/images/website-blue.svg"
                    alt="رعایت اصول سئو و طراحی واکنشگرا"
                    priority
                  />
                  <h3 className="mx-3 font-weight-600" style={{ fontSize: 15 }}>
                    عملیات کسب‌وکار شما راحت‌تر می‌شود
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 15, textAlign: "right" }}
                >
                  علاوه بر فروش بیش‌تر، سایت ساز ویترین مزیت دیگری برای
                  فروشگاه‌های اینترنتی دارد و آن هم یکپارچه و آسان کردن عملیات
                  فروش آنلاین آن‌ها است. یعنی کارهایی مثل مدیریت موجودی کالا،
                  روش‌های ارسال، اعمال خودکار هزینه ارسال روی فاکتور، اتصال به
                  درگاه پرداخت و تمام کارهایی که برای فروش راحت‌تر محصولات خود
                  نیاز دارید، با سایت ساز ویترین در اختیار شما قرار می‌گیرند.
                  خلاصه بگوییم که با ویترین می‌توانید راحت بفروشید و در زمانی که
                  صرف عملیات روزمره می‌کنید صرفه‌جویی کنید.
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
      {/* Online Shopping (Desktop) */}
      <div
        ref={shoppingRef}
        className="d-none d-md-block"
        style={{ backgroundColor: "#F6F6F7" }}
      >
        <div className="container">
          <div
            style={{
              padding: "40px 0",
              textAlign: "center",
              fontSize: 32,
              lineHeight: "28px",
              paddingBottom: 40,
              color: "#202223",
              borderBottom: "1px solid #E4E6E7",
            }}
          >
            <h2 className="font-weight-600">
              سایت ساز ویترین مجموعه‌ای از قابلیت‌های حرفه‌ای فروش آنلاین دارد
            </h2>
          </div>
          <div
            className="d-flex flex-column flex-md-row"
            style={{ padding: "40px 0 ", color: "#202223", lineHeight: "24px" }}
          >
            <div className="flex-1 align-self-center">
              <Image
                unoptimized
                src="/images/2-Shopping3.svg"
                width={533}
                height={400}
                alt="نمونه‌ای ازقابلیت‌های سایت ساز ویترین برا فروش آنلاین"
                priority
              />
            </div>
            <div className="flex-1 position-relative">
              <div
                className="pb-5"
                style={{ borderBottom: "1px solid #E4E6E7" }}
              >
                <div className="d-flex align-items-center">
                  <Image
                    unoptimized
                    width={24}
                    height={24}
                    src="/images/edit-square-blue.svg"
                    alt="وب‌سایت و وب‌اپلیکیشن اختصاصی"
                    priority
                  />
                  <h3 className="mx-3 font-weight-600" style={{ fontSize: 20 }}>
                    فروش سایت شما بیشتر می‌شود
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 16, textAlign: "right" }}
                >
                  از اهداف اصلی هر کسب‌وکار، تبدیل شدن به یکی از بهترین‌ها و
                  فروش بیش‌تر است. هر سایتی که با سایت ساز ویترین بسازید، قابلیت
                  تبدیل به یک فروشگاه اینترنتی حرفه‌ای را دارد. سایت‌های
                  فروشگاهی ویترین از تکنولوژی I.O.M استفاده می‌کنند که به کمک آن
                  می‌توانید فروش خود را بیش‌تر کنید. I.O.M تکنولوژی فروش آنلاین
                  ویترین است که امکان افزایش فروش را از طریق یکپارچه کردن عملیات
                  روزمره کسب‌وکار و فرایندهای بازاریابی در اختیار شما قرار
                  می‌دهد. در نهایت هم این ابزارهای اتوماسیون بازاریابی ویترین،
                  به شما امکان می‌دهند تا فروش سایت خود را تا ۲۰۰٪ افزایش دهید!
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
              <div style={{ padding: "40px 0" }}>
                <div className="d-flex align-items-center">
                  <Image
                    unoptimized
                    width={24}
                    height={24}
                    src="/images/website-blue.svg"
                    alt="رعایت اصول سئو و طراحی واکنشگرا"
                    priority
                  />
                  <h3 className="mx-3 font-weight-600" style={{ fontSize: 20 }}>
                    عملیات کسب‌وکار شما راحت‌تر می‌شود
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 16, textAlign: "right" }}
                >
                  علاوه بر فروش بیش‌تر، سایت ساز ویترین مزیت دیگری برای
                  فروشگاه‌های اینترنتی دارد و آن هم یکپارچه و آسان کردن عملیات
                  فروش آنلاین آن‌ها است. یعنی کارهایی مثل مدیریت موجودی کالا،
                  روش‌های ارسال، اعمال خودکار هزینه ارسال روی فاکتور، اتصال به
                  درگاه پرداخت و تمام کارهایی که برای فروش راحت‌تر محصولات خود
                  نیاز دارید، با سایت ساز ویترین در اختیار شما قرار می‌گیرند.
                  خلاصه بگوییم که با ویترین می‌توانید راحت بفروشید و در زمانی که
                  صرف عملیات روزمره می‌کنید صرفه‌جویی کنید.
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
      {/* I.O.M (Mobile) */}
      <div
        className="d-flex d-md-none"
        style={{ backgroundColor: "#5699d8", padding: 33 }}
      >
        <div
          className="d-flex justify-content-end"
          style={{ width: "46.5%", padding: "0 33px" }}
        >
          <Image
            unoptimized
            width={64}
            height={64}
            src="/images/display.svg"
            alt="برای اولین بار با تکنولوژی I.O.M"
            priority
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
      {/* I.O.M (Desktop) */}
      <div
        className="d-none d-md-flex "
        style={{ backgroundColor: "#5699d8", padding: 33 }}
      >
        <div
          className="d-flex justify-content-end"
          style={{ width: "46.5%", padding: "0 33px" }}
        >
          <Image
            unoptimized
            width={64}
            height={64}
            src="/images/display.svg"
            alt="برای اولین بار با تکنولوژی I.O.M"
            priority
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
      {/* Support (Mobile) */}
      <div
        className="d-md-none"
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
                paddingTop: "24px",
                paddingBottom: "24px",
              }}
            >
              <div className={`w-100 flex-column justify-content-between`}>
                <Image
                  alt=""
                  src="/images/vitrin-support.jpg"
                  width={"600px"}
                  height={"400px"}
                  priority
                  unoptimized
                />
              </div>
              <div className="w-100 flex-1 d-flex flex-column justify-content-between m-0 mr-md-4">
                <h2 className="font-weight-600 mt-5">
                  با پشتیبانی ویترین صحبت کنید
                </h2>
                <p className="mt-4">
                  برای دریافت مشاورهٔ رایگان و جزئیات بیشتر دربارهٔ سایت ساز
                  ویترین، لطفا اطلاعات خود را در فرم مشاوره ثبت کنید تا با شما
                  تماس بگیریم.
                  <br />
                  برای تماس تلفنی با تیم پشتیبانی ویترین، شمارهٔ ۰۲۱۹۱۰۷۰۷۵۱ در
                  اختیار شماست.
                </p>
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
                      unoptimized
                      width={24}
                      height={24}
                      src="/images/profile-icon-gray.svg"
                      alt="profile"
                      priority
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
                    value={form?.inputs[0]?.value || ""}
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
                      unoptimized
                      width={24}
                      height={24}
                      src="/images/mobile-icon-gray.svg"
                      alt="mobile"
                      priority
                    />
                  </div>

                  <input
                    className="flex-1 mr-4"
                    placeholder="شماره تلفن همراه"
                    value={
                      form?.inputs[1]?.value
                        ? englishNumberToPersianNumber(form?.inputs[1]?.value)
                        : ""
                    }
                    style={{
                      fontSize: 15,
                      lineHeight: "25px",
                      color: "#202223",
                    }}
                    onChange={(e) => {
                      const localForm = { ..._form };
                      localForm.inputs[1].value = persianToEnglishNumber(
                        e.target.value
                      );
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
                      unoptimized
                      width={24}
                      height={24}
                      src="/images/work-gray.svg"
                      alt="mobile"
                      priority
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
                    value={form?.inputs[2]?.value || ""}
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
      {/* Support (Desktop) */}
      <div
        className="d-none d-md-block"
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
                paddingTop: "40px",
                paddingBottom: "40px",
              }}
            >
              <div className={`flex-1 flex-column justify-content-between`}>
                <Image
                  alt=""
                  src="/images/vitrin-support.jpg"
                  width={"600px"}
                  height={"400px"}
                  priority
                  unoptimized
                />
              </div>
              <div className="w-100 flex-1 d-flex flex-column justify-content-between m-0 mr-md-4">
                <h2 className="font-weight-600">
                  با پشتیبانی ویترین صحبت کنید
                </h2>
                <p className="mt-4">
                  برای دریافت مشاورهٔ رایگان و جزئیات بیشتر دربارهٔ سایت ساز
                  ویترین، لطفا اطلاعات خود را در فرم مشاوره ثبت کنید تا با شما
                  تماس بگیریم.
                  <br />
                  برای تماس تلفنی با تیم پشتیبانی ویترین، شمارهٔ ۰۲۱۹۱۰۷۰۷۵۱ در
                  اختیار شماست.
                </p>
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
                      unoptimized
                      width={24}
                      height={24}
                      src="/images/profile-icon-gray.svg"
                      alt="profile"
                      priority
                    />
                  </div>

                  <input
                    className="flex-1 mr-4"
                    placeholder="نام و نام‌خانوادگی"
                    value={form?.inputs[0]?.value || ""}
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
                      unoptimized
                      width={24}
                      height={24}
                      src="/images/mobile-icon-gray.svg"
                      alt="mobile"
                      priority
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
                    value={
                      form?.inputs[1]?.value
                        ? englishNumberToPersianNumber(form?.inputs[1]?.value)
                        : ""
                    }
                    onChange={(e) => {
                      const localForm = { ..._form };
                      localForm.inputs[1].value = persianToEnglishNumber(
                        e.target.value
                      );
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
                      unoptimized
                      width={24}
                      height={24}
                      src="/images/work-gray.svg"
                      alt="mobile"
                      priority
                    />
                  </div>

                  <input
                    className="flex-1 mr-4"
                    placeholder="زمینه فعالیت شما"
                    value={form?.inputs[2]?.value || ""}
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
      {/* FAQ (Mobile) */}
      <div
        className="container d-md-none"
        style={{
          paddingTop: 32,
        }}
      >
        <div
          style={{
            backgroundColor: "#F6F6F7",
            borderRadius: 16,
            padding: "24px 16px",
          }}
        >
          <p
            className="font-weight-600 pb-4"
            style={{
              textAlign: "center",
              fontSize: 20,
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
                <div className={`d-flex align-items-center p-0`}>
                  <div style={{ minWidth: 24 }}>
                    <Image
                      unoptimized
                      height={24}
                      width={24}
                      src="/images/question-icon-blue.svg"
                      alt={item.question}
                      priority
                    />
                  </div>

                  <span
                    style={{
                      fontSize: 13,
                      lineHeight: "24px",
                      color: "#202223",
                      margin: "0 10px",
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
                    transition: "transform 0.5s",
                    marginLeft: 0,
                  }}
                >
                  <div style={{ width: 12, height: 12 }}>
                    <Image
                      unoptimized
                      priority
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
      {/* FAQ (Desktop) */}
      <div
        className="container d-none d-md-block"
        style={{
          paddingTop: 40,
        }}
      >
        <div
          style={{
            backgroundColor: "#F6F6F7",
            borderRadius: 16,
            padding: "40px 64px",
          }}
        >
          <p
            className="font-weight-600 pb-4"
            style={{
              textAlign: "center",
              fontSize: 32,
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
                <div className={`d-flex align-items-center pr-2`}>
                  <div style={{ minWidth: 24 }}>
                    <Image
                      unoptimized
                      height={24}
                      width={24}
                      src="/images/question-icon-blue.svg"
                      alt={item.question}
                      priority
                    />
                  </div>

                  <span
                    style={{
                      fontSize: 14,
                      lineHeight: "24px",
                      color: "#202223",
                      margin: "0 16px 0 0",
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
                    marginLeft: 8,
                  }}
                >
                  <div style={{ width: 12, height: 12 }}>
                    <Image
                      unoptimized
                      layout="fill"
                      src="/images/arrow-bottom-icon-blue.svg"
                      alt="پرسش های متداول"
                      priority
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
      <BreadCrumb text="سایت ساز" link={router.asPath} />

      <Footer />
      {/* Support (Mobile) */}
      <div
        className="w-100 d-flex d-md-none align-items-center p-4"
        style={{
          position: "sticky",
          bottom: 0,
          backgroundColor: isOpenSupport ? "#0050FF" : "transparent",
          justifyContent: !isOpenSupport ? "end" : "space-between",
        }}
      >
        {isOpenSupport && (
          <Link
            href="/cr~templates?step=0"
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
            رایگان شروع کنید
          </Link>
        )}
        {isOpenSupport ? (
          <div
            style={{ height: 40 }}
            onClick={() => setIsOpenConsultationModal(true)}
          >
            <Image
              unoptimized
              width={40}
              height={40}
              src="/images/Support agent.svg"
              priority
              alt=""
            />
          </div>
        ) : (
          <div
            style={{ height: 64 }}
            onClick={() => setIsOpenConsultationModal(true)}
          >
            <Image
              unoptimized
              width={64}
              height={64}
              src="/images/Frame 451.svg"
              priority
              alt=""
            />
          </div>
        )}
      </div>
      {/* Support (Desktop) */}
      <div
        className="w-100 d-none d-md-flex align-items-center p-4"
        style={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "transparent",
          justifyContent: "end",
        }}
      >
        <div
          style={{ height: 64 }}
          onClick={() => setIsOpenConsultationModal(true)}
        >
          <Image
            unoptimized
            width={64}
            height={64}
            src="/images/Frame 451.svg"
            priority
            alt=""
          />
        </div>
      </div>
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
    _createVitrin: (data) => dispatch(createVitrin(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(NewSiteBuilderPage);
