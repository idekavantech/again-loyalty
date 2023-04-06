/* eslint-disable @next/next/no-img-element */
import React, { memo, useState, useRef, useEffect } from "react";
import Header from "containers/Header";
import Footer from "components/Footer";
import Slider from "react-slick";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Collapse } from "react-collapse";
import { CUSTOMER_COMMENTS } from "utils/constants/CUSTOMER_COMMENTS";
import { FAQS } from "utils/constants/FAQS";
import {
  SLIDE1,
  SLIDE2,
  SLIDE3,
  SLIDE4,
  SLIDE5,
  SLIDE6,
  SLIDE7,
} from "utils/constants/SLIDES";
import { VITRIN_POSSIBILITIES } from "utils/constants/VITRIN_POSSIBILITIES";
import Image from "next/image";
import Link from "next/link";
import FreeConsultationModal from "containers/FreeConsultationModal";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { priceFormatter } from "utils/helpers/priceFormatter";
import { showTotolGmv, createVitrin } from "stores/global/actions";
import { makeSelectVitrinGmv } from "stores/global/selector";
import { makeSelectLoading } from "stores/global/selector";
import {
  createFormResponse,
  setSnackBarMessage,
  getFormsDictionary,
} from "stores/global/actions";
import { makeSelectFormsDictionary } from "stores/global/selector";
import { NumberOfBrands } from "utils/constants";
import { setQueriesInLocalstorage } from "utils/helpers/setQueriesInLocalstorage";
import { useRouter } from "next/router";
import { persianToEnglishNumber } from "utils/helpers/persianToEnglishNumber";
import { phoneValidator } from "utils/helpers/phoneValidator";

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
const siteExample = [SLIDE1, SLIDE2, SLIDE3, SLIDE4, SLIDE5, SLIDE6, SLIDE7];
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
function LandingPage({
  _gmv,
  loading,
  _showTotolGmv,
  _setSnackBarMessage,
  _submitForm,
  _getFormsDictionary,
  formsDictionary,
  _createVitrin,
}) {
  const [collapses, setCollapses] = useState({});
  const [isOpenConsultationModal, setIsOpenConsultationModal] = useState(false);
  const [isOpenCollaps, setIsOpenCollaps] = useState(false);
  const [isOpenSupport, setIsOpenSupport] = useState(false);
  const [form, setForm] = useState(null);
  const [_form, _setForm] = useState({});
  const form_id = 548;
  const examplesRef = useRef();
  const possibilitiesRef = useRef();
  const possibilitiesRefMobile = useRef();
  const router = useRouter();

  useEffect(() => {
    setQueriesInLocalstorage(router.query);
  }, [router]);

  // create element ref
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

  useEffect(() => {
    _showTotolGmv();
  }, []);

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

  return (
    <main>
      <div className="position-relative">
        <div className="header_container"></div>
        <Header isTransparent />
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
            طراحی سایت ویترین
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
          <div
            style={{ width: "100%", overflowX: "hidden" }}
            onClick={() => examplesRef.current.scrollIntoView()}
          >
            <div className="d-flex slide-logos-two mt-4">
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
            <p
              style={{ fontSize: 14, fontWeight: 500 }}
              className="text-center"
            >
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
          <Link passHref href="/cr~templates">
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
            <Link passHref href="/features">
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
                امکانات و ویژگی‌‌ها
              </button>
            </Link>
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
              src={"/images/banner-bg.jpg"}
              width="300px"
              height="280px"
              alt="نمونه‌ای از طراحی سایت حرفه‌ای که برای یک کسب‌وکار انجام شده است."
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
            طراحی سایت ویترین
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
          <div
            style={{ width: 700, overflowX: "hidden" }}
            onClick={() => examplesRef.current.scrollIntoView()}
          >
            <div className="d-flex slide-logos-two mt-4">
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
            <p
              style={{ fontSize: 20, fontWeight: 500 }}
              className="text-center"
            >
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
          <Link passHref href="/cr~templates">
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
            <Link passHref href="/features">
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
                امکانات و ویژگی‌‌ها
              </button>
            </Link>
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
              src={"/images/banner-bg.jpg"}
              width="691px"
              height="389px"
              alt="نمونه‌ای از طراحی سایت حرفه‌ای که برای یک کسب‌وکار انجام شده است.
              ."
              priority
            />
          </div>
        </div>
      </div>
      <div
        ref={possibilitiesRefMobile}
        className="d-block d-md-none"
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
                      display: "inline-block",
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
                      <Collapse key={item} isOpened={isOpenCollaps}>
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
                        key={item}
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
      </div>
      {/* Features (Desktop)  */}
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
          <h2
            className="mt-md-4 mt-2"
            style={{ fontSize: 24, fontWeight: 400 }}
          >
            چگونه ویترین به شما کمک می کند؟
          </h2>
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
                  <span
                    style={{
                      fontSize: 18,
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
                      <Collapse key={item} isOpened={isOpenCollaps}>
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
                        key={item}
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
      </div>
      {/* Examples */}
      <div ref={examplesRef}>
        {/* (Mobile) */}
        <div
          className="d-md-none"
          style={{
            backgroundColor: "#F2F7FE",
            padding: "32px 0",
            color: "#202223",
          }}
        >
          <div className="d-flex flex-column align-items-center container">
            <h2
              className=" font-weight-600"
              style={{
                fontSize: 20,
                fontWeight: 500,
                textAlign: "center",
                lineHeight: "28px",
              }}
            >
              از چند نمونه سایت ایده بگیرید
            </h2>
            <p
              style={{
                fontSize: 15,
                paddingTop: 24,
                lineHeight: "24px",
                textAlign: "center",
                width: "100%",
              }}
            >
              دیدن چند نمونه سایت مختلف به شما کمک می‌کند از امکانات و
              قابلیت‌هایی که در ویترین وجود دارد باخبر شوید. بد نیست قبل از شروع
              طراحی سایت خودتان، از این نمونه‌کارهای طراحی سایت الهام بگیرید تا
              سریع‌تر سایت مطلوب خود را بسازید.
            </p>
            <Link
              href="/cr~templates"
              className="header-buttons d-flex  justify-content-center align-items-center mt-4"
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
              <Link href="/examples" className="d-flex">
                <span>دیدن نمونه‌های بیشتر</span>
                <Image
                  unoptimized
                  priority
                  width={24}
                  height={24}
                  src="/images/arrow-left-icon-blue.svg"
                  alt="ساخت سایت"
                />
              </Link>
            </p>
          </div>

          <div className="sample-site w-100">
            <Slider {...settings}>
              {siteExample.map((item) => (
                <div className="image-container" key={item}>
                  <Image
                    unoptimized
                    priority
                    layout="fill"
                    className="image"
                    src={item}
                    alt="نمونه سایت"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        {/* (Desktop) */}
        <div
          className="d-none d-md-block"
          style={{
            backgroundColor: "#F2F7FE",
            padding: "52px 0",
            color: "#202223",
          }}
        >
          <div className="d-flex flex-column align-items-center container">
            <h2
              className=" font-weight-600"
              style={{
                fontSize: 32,
                fontWeight: 500,
                textAlign: "center",
                lineHeight: "28px",
              }}
            >
              از چند نمونه سایت ایده بگیرید
            </h2>
            <p
              style={{
                fontSize: 16,
                paddingTop: 36,
                lineHeight: "24px",
                textAlign: "center",
                width: 666,
              }}
            >
              دیدن چند نمونه سایت مختلف به شما کمک می‌کند از امکانات و
              قابلیت‌هایی که در ویترین وجود دارد باخبر شوید. بد نیست قبل از شروع
              طراحی سایت خودتان، از این نمونه‌کارهای طراحی سایت الهام بگیرید تا
              سریع‌تر سایت مطلوب خود را بسازید.
            </p>

            <Link
              href="/cr~templates"
              className="header-buttons d-flex  justify-content-center align-items-center mt-4"
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
              <Link href="/examples" className="d-flex">
                <span>دیدن نمونه‌های بیشتر</span>
                <Image
                  unoptimized
                  priority
                  width={24}
                  height={24}
                  src="/images/arrow-left-icon-blue.svg"
                  alt="ساخت سایت"
                />
              </Link>
            </p>
          </div>

          <div className="sample-site w-100">
            <Slider {...settings}>
              {siteExample.map((item) => (
                <div className="image-container" key={item}>
                  <Image
                    unoptimized
                    priority
                    layout="fill"
                    className="image"
                    src={item}
                    alt="نمونه سایت"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      {/* Professional & Marketing (Mobile) */}
      <div className="d-flex d-md-none flex-md-column flex-column-reverse">
        <div
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
                width: "100%",
                color: "#202223",
                fontWeight: 500,
                paddingBottom: 24,
                borderBottom: "1px solid #E4E6E7",
              }}
            >
              ویترین بهترین امکانات طراحی سایت برای فروش آنلاین را ارائه می‌کند
            </h2>
            <div
              className="d-flex flex-column flex-md-row"
              style={{
                paddingTop: 24,
                color: "#202223",
                lineHeight: "24px",
              }}
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
                      alt="وب‌سایت و وپس از ساخت سایت با ویترین، این امکان را خواهید داشت که نرم‌افزارهای فروش مختلفی که الان استفاده می‌کنید و کانال‌های فروش خود (حضوری، آنلاین، …) را یکپارچه و گزارش‌های دقیقی از میزان فروشتان دریافت کنید. تکنولوژی I.O.M ویترین به شما کمک می‌کند تا انبار، مواد اولیه، تأمین‌کنندگان، پیک‌ها و سایر جزئیات عملیات فروش خود را از طریق یک سیستم یکپارچه مدیریت کنید.
                      ب‌اپلیکیشن اختصاصی"
                      priority
                    />
                    <h3
                      className="mx-3 font-weight-600"
                      style={{ fontSize: 15 }}
                    >
                      فروش خود را افزایش دهید
                    </h3>
                  </div>
                  <p
                    className="mt-4"
                    style={{
                      fontSize: 15,
                      textAlign: "right",
                      paddingBottom: 0,
                    }}
                  >
                    با ویترین علاوه بر اینکه می‌توانید هر محصولی را آنلاین
                    بفروشید، وب سایتی که راه اندازی می‌کنید به تکنولوژی I.O.M
                    نیز مجهز است که به کمک ابزارهای اتوماسیون بازاریابی آن
                    می‌توانید مشتری‌های خود را به خرید دوباره ترغیب کنید.
                    کسب‌وکارهایی که به ویترین اعتماد کرده‌اند به کمک این
                    تکنولوژی توانسته‌اند تا ۲۰۰٪ فروش آنلاین خود را افزایش دهند!
                  </p>
                </div>
                <div style={{ padding: "24px 0" }}>
                  <div className="d-flex align-items-center">
                    <Image
                      unoptimized
                      width={24}
                      height={24}
                      src="/images/website-blue.svg"
                      alt="رعایت اصول سئو و طراحی واکنشگرا"
                      priority
                    />
                    <h3
                      className="mx-3 font-weight-600"
                      style={{ fontSize: 15 }}
                    >
                      سیستم فروش خود را یکپارچه کنید
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 15, textAlign: "right" }}
                  >
                    پس از ساخت سایت با ویترین، این امکان را خواهید داشت که
                    نرم‌افزارهای فروش مختلفی که الان استفاده می‌کنید و کانال‌های
                    فروش خود (حضوری، آنلاین، …) را یکپارچه و گزارش‌های دقیقی از
                    میزان فروشتان دریافت کنید. تکنولوژی I.O.M ویترین به شما کمک
                    می‌کند تا انبار، مواد اولیه، تأمین‌کنندگان، پیک‌ها و سایر
                    جزئیات عملیات فروش خود را از طریق یک سیستم یکپارچه مدیریت
                    کنید.
                  </p>
                </div>
                <Link
                  href="/cr~templates"
                  className="d-flex position-absolute left-0 bottom-0"
                  style={{ color: "#0050ff", fontSize: 16 }}
                >
                  <span>شروع کنید</span>
                  <Image
                    unoptimized
                    width={24}
                    priority
                    height={24}
                    src="/images/arrow-left-icon-blue.svg"
                    alt="ساخت سایت"
                  />
                </Link>
              </div>
              <div className="flex-1 d-flex justify-content-center">
                <Image
                  unoptimized
                  priority
                  height={240}
                  src="/images/web-features.svg"
                  width={320}
                  alt=" بعضی از امکانات طراحی سایت ویترین برای کسب‌وکارها"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Professional & Marketing (Desktop) */}
      <div className="d-none d-md-flex flex-md-column flex-column-reverse">
        <div
          style={{
            padding: "48px 0px 64px",
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
                width: "100%",
                color: "#202223",
                fontWeight: 500,
                paddingBottom: 0,
                borderBottom: "1px solid transparent",
              }}
            >
              ویترین بهترین امکانات طراحی سایت برای فروش آنلاین را ارائه می‌کند
            </h2>
            <div
              className="d-flex flex-column flex-md-row"
              style={{
                paddingTop: 60,
                color: "#202223",
                lineHeight: "24px",
              }}
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
                      alt="وب‌سایت و وب‌اپلیکیشن اختصاصی"
                    />
                    <h3
                      className="mx-3 font-weight-600"
                      style={{ fontSize: 20 }}
                    >
                      فروش خود را افزایش دهید
                    </h3>
                  </div>
                  <p
                    className="mt-4"
                    style={{
                      fontSize: 16,
                      textAlign: "right",
                      paddingBottom: 20,
                    }}
                  >
                    با ویترین علاوه بر اینکه می‌توانید هر محصولی را آنلاین
                    بفروشید، وب سایتی که راه اندازی می‌کنید به تکنولوژی I.O.M
                    نیز مجهز است که به کمک ابزارهای اتوماسیون بازاریابی آن
                    می‌توانید مشتری‌های خود را به خرید دوباره ترغیب کنید.
                    کسب‌وکارهایی که به ویترین اعتماد کرده‌اند به کمک این
                    تکنولوژی توانسته‌اند تا ۲۰۰٪ فروش آنلاین خود را افزایش دهند!
                  </p>
                </div>
                <div style={{ padding: "40px 0" }}>
                  <div className="d-flex align-items-center">
                    <Image
                      unoptimized
                      priority
                      width={24}
                      height={24}
                      src="/images/website-blue.svg"
                      alt="رعایت اصول سئو و طراحی واکنشگرا"
                    />
                    <h3
                      className="mx-3 font-weight-600"
                      style={{ fontSize: 20 }}
                    >
                      سیستم فروش خود را یکپارچه کنید
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 16, textAlign: "right" }}
                  >
                    پس از ساخت سایت با ویترین، این امکان را خواهید داشت که
                    نرم‌افزارهای فروش مختلفی که الان استفاده می‌کنید و کانال‌های
                    فروش خود (حضوری، آنلاین، …) را یکپارچه و گزارش‌های دقیقی از
                    میزان فروشتان دریافت کنید. تکنولوژی I.O.M ویترین به شما کمک
                    می‌کند تا انبار، مواد اولیه، تأمین‌کنندگان، پیک‌ها و سایر
                    جزئیات عملیات فروش خود را از طریق یک سیستم یکپارچه مدیریت
                    کنید.
                  </p>
                </div>
                <Link
                  href="/cr~templates"
                  className="d-flex position-absolute left-0 bottom-0"
                  style={{ color: "#0050ff", fontSize: 16 }}
                >
                  <span>شروع کنید</span>
                  <Image
                    unoptimized
                    priority
                    width={24}
                    height={24}
                    src="/images/arrow-left-icon-blue.svg"
                    alt="ساخت سایت"
                  />
                </Link>
              </div>
              <div className="flex-1 d-flex justify-content-center">
                <Image
                  unoptimized
                  priority
                  height={400}
                  src="/images/web-features.svg"
                  width={533}
                  alt=" بعضی از امکانات طراحی سایت ویترین برای کسب‌وکارها"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Question from others */}
      {/* (Mobile) */}
      <div
        className="d-md-none"
        style={{
          backgroundColor: "#0050FF",
          padding: "32px 0",
        }}
      >
        <p
          style={{
            fontSize: 20,
            textAlign: "center",
            lineHeight: "24px",
            color: "#fff",
            fontWeight: 500,
          }}
        >
          از دیگران بپرسید
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
                      priority
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
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* (Desktop) */}
      <div
        className="d-none d-md-block"
        style={{
          backgroundColor: "#0050FF",
          padding: "52px 0 80px",
        }}
      >
        <p
          style={{
            fontSize: 32,
            textAlign: "center",
            lineHeight: "24px",
            color: "#fff",
            fontWeight: 500,
          }}
        >
          از دیگران بپرسید
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
                        priority
                        width={185}
                        height={185}
                        src={customer.image}
                        className="radius-8"
                        alt={customer.name}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* Pricing & I.O.M (Mobile) */}
      <div className="d-flex d-md-none flex-md-column flex-column-reverse">
        <div style={{ backgroundColor: "#F6F6F7" }}>
          <div className="container">
            <div
              style={{
                padding: "32px 0 24px",
                textAlign: "center",
                lineHeight: "28px",
                color: "#202223",
              }}
            >
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  paddingBottom: 24,
                  borderBottom: "1px solid #E4E6E7",
                }}
                className="font-weight-600"
              >
                حرفه‌ای‌ترین ابزارهای طراحی سایت در اختیار شماست
              </h2>
            </div>
            <div
              className="d-flex flex-column-reverse flex-md-row"
              style={{
                color: "#202223",
                lineHeight: "24px",
                paddingBottom: 64,
              }}
            >
              <div className="flex-1 align-self-center">
                <Image
                  unoptimized
                  priority
                  src="/images/web-general.png"
                  width={320}
                  height={240}
                  alt="تعدادی از ویژگی‌های ساخت سایت با ویترین."
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
                      priority
                      width={24}
                      height={24}
                      src="/images/edit-square-blue.svg"
                      alt="بیشتر بفروشید"
                    />
                    <h3
                      className="mx-3 font-weight-600"
                      style={{ fontSize: 15 }}
                    >
                      بدون نیاز به دانش فنی سایت بسازید
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 15, textAlign: "right" }}
                  >
                    با استفاده از ویترین می‌توانید بدون نیاز به کدنویسی، وب سایت
                    خودتان را طراحی کنید. تکنولوژی ویترین به شما این امکان را
                    می‌دهد تا مدیریت سایت را نیز خودتان انجام دهید. برای این کار
                    یک پنل اختصاصی مدیریت سایت در اختیار شما قرار می‌گیرد تا
                    بتوانید محتوای سایت خود را حتی از خانه و با گوشی موبایل
                    ویرایش کنید. طراحی سایت از این آسان‌تر نمی‌شود!
                  </p>
                </div>
                <div style={{ padding: "40px 0" }}>
                  <div className="d-flex align-items-center">
                    <Image
                      unoptimized
                      priority
                      width={24}
                      height={24}
                      src="/images/website-blue.svg"
                      alt="راحت‌تر بفروشید"
                    />
                    <h3
                      className="mx-3 font-weight-600"
                      style={{ fontSize: 15 }}
                    >
                      یک سایت واکنش‌گرا با سئوی خودکار طراحی کنید
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 15, textAlign: "right" }}
                  >
                    تمام سایت‌های ساخته شده با ویترین، انعطاف پذیری بالایی برای
                    سئوی فنی و محتوایی دارند تا شما بتوانید با تمرکز روی محتوای
                    سایت خودتان، در نتایج گوگل بدرخشید. همچنین رعایت اصول طراحی
                    واکنش‌گرا در ویترین باعث می‌شود سایت شما در ابعاد مختلف صفحه
                    نمایش (موبایل، دسکتاپ و تبلت) به زیبایی دیده شود و بتوانید
                    مشتریان با سلیقه‌های مختلف را جذب کنید!
                  </p>
                </div>
                <Link
                  href="/cr~templates"
                  className="d-flex position-absolute left-0 bottom-0"
                  style={{ color: "#0050ff", fontSize: 16 }}
                >
                  <span>شروع کنید</span>
                  <Image
                    unoptimized
                    priority
                    width={24}
                    height={24}
                    src="/images/arrow-left-icon-blue.svg"
                    alt="ساخت سایت"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="d-flex "
          style={{
            backgroundColor: "#0050FF",
            padding: "24px 0",
          }}
        >
          <div
            className="d-flex justify-content-end"
            style={{
              width: "33.5%",
              padding: "0 24px",
            }}
          >
            <Image
              unoptimized
              priority
              width={64}
              height={64}
              src="/images/display.svg"
              alt="برای اولین بار با تکنولوژی I.O.M"
            />
          </div>
          <div
            className="container d-flex flex-column justify-content-center font-weight-600"
            style={{
              width: "66.5%",
              paddingRight: 24,
              textAlign: "right",
              color: "#fff",
              borderRight: "1px solid #E4E6E7",
              fontSize: 15,
            }}
          >
            <p>برای اولین بار با تکنولوژی I.O.M</p>
            <p className="pt-4">تا ۲۰۰٪‌ فروش بیشتر </p>
          </div>
        </div>
      </div>
      {/* Pricing & I.O.M (Desktop) */}
      <div className="d-none d-md-flex flex-md-column flex-column-reverse">
        <div style={{ backgroundColor: "#F6F6F7" }}>
          <div className="container">
            <div
              style={{
                padding: "48px 0 40px",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  paddingBottom: 24,
                  borderBottom: "1px solid #E4E6E7",
                }}
                className="font-weight-600"
              >
                حرفه‌ای‌ترین ابزارهای طراحی سایت در اختیار شماست
              </h2>
            </div>
            <div
              className="d-flex flex-column-reverse flex-md-row"
              style={{
                color: "#202223",
                lineHeight: "24px",
                paddingBottom: 64,
              }}
            >
              <div className="flex-1 align-self-center">
                <Image
                  unoptimized
                  priority
                  src="/images/web-general.png"
                  width={533}
                  height={400}
                  alt="تعدادی از ویژگی‌های ساخت سایت با ویترین"
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
                      priority
                      width={24}
                      height={24}
                      src="/images/edit-square-blue.svg"
                      alt="بیشتر بفروشید"
                    />
                    <h3
                      className="mx-3 font-weight-600"
                      style={{ fontSize: 20 }}
                    >
                      بدون نیاز به دانش فنی سایت بسازید
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 16, textAlign: "right" }}
                  >
                    با استفاده از ویترین می‌توانید بدون نیاز به کدنویسی، وب سایت
                    خودتان را طراحی کنید. تکنولوژی ویترین به شما این امکان را
                    می‌دهد تا مدیریت سایت را نیز خودتان انجام دهید. برای این کار
                    یک پنل اختصاصی مدیریت سایت در اختیار شما قرار می‌گیرد تا
                    بتوانید محتوای سایت خود را حتی از خانه و با گوشی موبایل
                    ویرایش کنید. طراحی سایت از این آسان‌تر نمی‌شود!
                  </p>
                </div>
                <div style={{ padding: "40px 0" }}>
                  <div className="d-flex align-items-center">
                    <Image
                      unoptimized
                      priority
                      width={24}
                      height={24}
                      src="/images/website-blue.svg"
                      alt="راحت‌تر بفروشید"
                    />
                    <h3
                      className="mx-3 font-weight-600"
                      style={{ fontSize: 20 }}
                    >
                      یک سایت واکنش‌گرا با سئوی خودکار طراحی کنید
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 16, textAlign: "right" }}
                  >
                    تمام سایت‌های ساخته شده با ویترین، انعطاف پذیری بالایی برای
                    سئوی فنی و محتوایی دارند تا شما بتوانید با تمرکز روی محتوای
                    سایت خودتان، در نتایج گوگل بدرخشید. همچنین رعایت اصول طراحی
                    واکنش‌گرا در ویترین باعث می‌شود سایت شما در ابعاد مختلف صفحه
                    نمایش (موبایل، دسکتاپ و تبلت) به زیبایی دیده شود و بتوانید
                    مشتریان با سلیقه‌های مختلف را جذب کنید!
                  </p>
                </div>
                <Link
                  href="/cr~templates"
                  className="d-flex position-absolute left-0 bottom-0"
                  style={{ color: "#0050ff", fontSize: 16 }}
                >
                  <span>شروع کنید</span>
                  <Image
                    unoptimized
                    priority
                    width={24}
                    height={24}
                    src="/images/arrow-left-icon-blue.svg"
                    alt="ساخت سایت"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="d-flex "
          style={{
            backgroundColor: "#0050FF",
            padding: 32,
          }}
        >
          <div
            className="d-flex justify-content-end"
            style={{
              width: "48%",
              padding: "0 33px",
            }}
          >
            <Image
              unoptimized
              priority
              width={64}
              height={64}
              src="/images/display.svg"
              alt="برای اولین بار با تکنولوژی I.O.M"
            />
          </div>
          <div
            className="container d-flex flex-column justify-content-center font-weight-600"
            style={{
              width: "49%",
              paddingRight: 33,
              textAlign: "right",
              color: "#fff",
              borderRight: "1px solid #E4E6E7",
              fontSize: 20,
            }}
          >
            <p>برای اولین بار با تکنولوژی I.O.M</p>
            <p className="pt-4">تا ۲۰۰٪‌ فروش بیشتر </p>
          </div>
        </div>
      </div>
      {/* With taste */}
      <div style={{ backgroundColor: "#F6F6F7" }}>
        {/* (Mobile) */}
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
            قالب سایت مورد پسند خود را انتخاب کنید
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
            در ویترین می‌توانید با استفاده از یک قالب، سایت خود را بسازید یا
            اینکه سایت خود را طبق سلیقه خودتان طراحی کنید. همه قالب‌های سایت در
            ویترین رایگان هستند و توسط تیم حرفه‌ای ویترین طراحی شده‌اند تا
            کسب‌وکارها مختلف بتوانند با استفاده از این قالب‌ها سایت خود را
            سریع‌تر راه‌اندازی کنند.
          </p>
          <Image
            unoptimized
            priority
            height={232}
            width={342}
            className="mt-4"
            src="/images/Main-Temp.jpg"
            alt="چند قالبب طراحی سایت ویترین"
          />
        </div>
        {/* (Desktop) */}
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
            قالب سایت مورد پسند خود را انتخاب کنید
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
            در ویترین می‌توانید با استفاده از یک قالب، سایت خود را بسازید یا
            اینکه سایت خود را طبق سلیقه خودتان طراحی کنید. همه قالب‌های سایت در
            ویترین رایگان هستند و توسط تیم حرفه‌ای ویترین طراحی شده‌اند تا
            کسب‌وکارها مختلف بتوانند با استفاده از این قالب‌ها سایت خود را
            سریع‌تر راه‌اندازی کنند.
          </p>
          <Image
            unoptimized
            priority
            height={438}
            width={600}
            className="mt-4"
            src="/images/Main-Temp.jpg"
            alt="چند قالبب طراحی سایت ویترین"
          />
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
            className="font-weight-600"
            style={{
              textAlign: "center",
              fontSize: 20,
              lineHeight: "24px",
              paddingBottom: 0,
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
                      priority
                      height={24}
                      width={24}
                      src="/images/question-icon-blue.svg"
                      alt={item.question}
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
      {/* Support (Mobile) */}
      <div
        className="d-md-none"
        style={{
          backgroundColor: "#F2F7FE",
          color: "#202223",
        }}
      >
        <div className="container">
          <div className="container">
            <div
              className="w-100 d-flex flex-column flex-md-row align-items-center"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
              }}
            >
              <div className={`w-100 flex-column justify-content-between`}>
                <Image
                  src="/images/vitrin-support.jpg"
                  width={"600px"}
                  height={"400px"}
                  priority
                  unoptimized
                  alt="تیم پشتیبانی ویترین"
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
        <div className="container">
          <div className="container">
            <div
              className="w-100 d-flex flex-column flex-md-row align-items-center"
              style={{
                paddingTop: "40px",
                paddingBottom: "40px",
              }}
            >
              <div className={`flex-1 flex-column justify-content-between`}>
                <Image
                  src="/images/vitrin-support.jpg"
                  width={"600px"}
                  height={"400px"}
                  priority
                  unoptimized
                  alt="تیم پشتیبانی ویترین"
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
            className="font-weight-600"
            style={{
              textAlign: "center",
              fontSize: 32,
              lineHeight: "24px",
              paddingBottom: 32,
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
                onClick={() => {
                  setCollapses({ ...collapses, [index]: !collapses[index] });
                }}
              >
                <div className={`d-flex align-items-center pr-2`}>
                  <div style={{ minWidth: 24 }}>
                    <Image
                      unoptimized
                      priority
                      height={24}
                      width={24}
                      src="/images/question-icon-blue.svg"
                      alt={item.question}
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

      <FreeConsultationModal
        isOpen={isOpenConsultationModal}
        onClose={() => setIsOpenConsultationModal(false)}
      />
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
            رایگان شروع کنید
          </Link>
        )}
        {isOpenSupport ? (
          <div
            style={{ height: 40 }}
            onClick={() => setIsOpenConsultationModal(true)}
          >
            <Image
              alt=""
              unoptimized
              width={40}
              height={40}
              src="/images/Support agent.svg"
              priority
            />
          </div>
        ) : (
          <div
            style={{ height: 64 }}
            onClick={() => setIsOpenConsultationModal(true)}
          >
            <Image
              alt=""
              unoptimized
              width={64}
              height={64}
              src="/images/Frame 451.svg"
              priority
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
            alt=""
            unoptimized
            width={64}
            height={64}
            src="/images/Frame 451.svg"
            priority
          />
        </div>
      </div>
    </main>
  );
}
const mapStateToProps = createStructuredSelector({
  _gmv: makeSelectVitrinGmv(),
  formsDictionary: makeSelectFormsDictionary(),
  loading: makeSelectLoading(),
});
function mapDispatchToProps(dispatch) {
  return {
    _showTotolGmv: () => dispatch(showTotolGmv()),
    _submitForm: (data, id, cb) => dispatch(createFormResponse(data, id, cb)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
    _getFormsDictionary: (id) => dispatch(getFormsDictionary(id)),
    _createVitrin: (data) => dispatch(createVitrin(data)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(LandingPage);
