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
import { VITRIN_POSSIBILITIES } from "utils/constants/VITRIN_POSSIBILITIES";
import Image from "next/image";
import Link from "next/link";
import FreeConsultationModal from "containers/FreeConsultationModal";
import { siteExample, FAQS } from "./constant";
import { useRouter } from "next/router";
import BreadCrumb from "components/BreadCrumb";
import { priceFormatter } from "utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { showTotolGmv } from "stores/global/actions";
import { makeSelectVitrinGmv } from "stores/global/selector";
import LazyHydrate from "react-lazy-hydration";
import { NumberOfBrands } from "utils/constants";
import { setQueriesInLocalstorage } from "utils/helpers/setQueriesInLocalstorage";

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

function ShopBuilderPage({ _gmv, _showTotolGmv }) {
  const [collapses, setCollapses] = useState({});
  const [isOpenConsultationModal, setIsOpenConsultationModal] = useState(false);
  const [isOpenCollaps, setIsOpenCollaps] = useState(false);
  const [isOpenSupport, setIsOpenSupport] = useState(false);
  const examplesRef = useRef();
  const possibilitiesRef = useRef();
  const possibilitiesRefMobile = useRef();
  const router = useRouter();
  useEffect(() => {
    setQueriesInLocalstorage(router.query);
  }, [router]);
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
        <div className="header_container"></div>
        <Header isTransparent />
      </div>
      {/* Banner (Mobile) */}
      <div
        className="d-flex d-md-none flex-column align-items-center"
        style={{ backgroundColor: "#f2f7fe" }}
      >
        <h1
          className="text-center"
          style={{
            fontSize: 24,
            fontWeight: 600,
            paddingTop: 40,
          }}
        >
          فروشگاه ساز ویترین
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
        <Link
          passHref
          href={{
            pathname: "/cr~templates",
            query: { prev: "shop-builder", step: 0 },
          }}
        >
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
          <Link href="/cr~templates" passHref>
            <button
              style={{
                height: 44,
                color: "#0050FF",
                border: "1px solid #0050FF",
                borderRadius: 8,
                width: 144,
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              مشاهده قالب فروشگاهی
            </button>
          </Link>

          <button
            style={{
              height: 44,
              color: "#0050FF",
              border: "1px solid #0050FF",
              borderRadius: 8,
              width: 144,
              fontSize: 13,
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
            src={"/images/shop-ATF.jpg"}
            width="300px"
            height="280px"
            alt="یک فروشگاه اینترنتی که از فروشگاه ساز ویترین استفاده کرده است."
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
          فروشگاه ساز ویترین
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
        <Link
          passHref
          href={{
            pathname: "/cr~templates",
            query: { prev: "shop-builder", step: 0 },
          }}
        >
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
          <Link href="/cr~templates" passHref>
            <button
              style={{
                height: 44,
                color: "#0050FF",
                border: "1px solid #0050FF",
                borderRadius: 8,
                width: 144,
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              مشاهده قالب فروشگاهی
            </button>
          </Link>

          <button
            style={{
              height: 44,
              color: "#0050FF",
              border: "1px solid #0050FF",
              borderRadius: 8,
              width: 144,
              fontSize: 13,
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
            src={"/images/shop-ATF.jpg"}
            width="691px"
            height="389px"
            alt="یک فروشگاه اینترنتی که از فروشگاه ساز ویترین استفاده کرده است."
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
                    unoptimized
                    height={120}
                    width={80}
                    src={possibiliti.image}
                    alt={possibiliti.title}
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
                  transition: "transform 0.5s",
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
                  transition: "transform 0.5s",
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
      {/* Marketing (Mobile) */}
      <div
        className="d-md-none"
        style={{
          backgroundColor: "#0050FF",
          padding: "32px 0",
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
            عملیات و بازاریابی یکپارچه
          </p>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="d-flex  align-items-center">
              <span
                className="pl-4 ml-2 d-flex align-items-center"
                style={{
                  borderLeft: "1px solid #E4E6E7",
                  height: 64,
                  width: 155,
                  fontSize: 15,
                }}
              >
                پیک و روش‌های ارسال{" "}
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
                  width: 155,
                  fontSize: 15,
                }}
              >
                کانال‌های جذب مشتری
              </span>
              <div
                className="  d-flex pr-2  flex-column"
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
              </div>
            </div>
            <div className=" d-flex  align-items-center">
              <span
                className="pl-4 ml-2 d-flex align-items-center"
                style={{
                  borderLeft: "1px solid #E4E6E7",
                  height: 64,
                  width: 155,
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
          backgroundColor: "#0050FF",
          padding: "40px 0",
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
            عملیات و بازاریابی یکپارچه
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
                پیک و روش‌های ارسال{" "}
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
                کانال‌های جذب مشتری
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
              fontSize: 16,
              lineHeight: "28px",
              paddingBottom: 16,
              borderBottom: "1px solid #E4E6E7",
              width: "100%",
              color: "#202223",
              fontWeight: 600,
            }}
          >
            استفاده از فروشگاه ساز ویترین برای شما سود دارد!
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
                    alt="می‌توانید فروش سایت خود را بیشتر کنید"
                    priority
                  />{" "}
                  <h3 className="mx-3 font-weight-600" style={{ fontSize: 15 }}>
                    می‌توانید فروش سایت خود را بیشتر کنید
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 15, textAlign: "right" }}
                >
                  فروشگاهی حرفه‌ای داشته باشید و بیشتر بفروشید! فروشگاه ساز
                  ویترین به شما امکان می‌دهد تا در فروشگاه اینترنتی خود از
                  تکنولوژی I.O.M بهره‌مند شوید. شما به کمک تکنولوژی I.O.M و دیگر
                  ابزارهای اتوماسیون بازاریابی فروشگاه ساز ویترین، می‌توانید به
                  صورت یک‌جا به اطلاعات تمام مشتری‌های خود دسترسی داشته باشید
                  (فارغ از این‌که آنلاین، حضوری، تلفنی یا با اینستاگرام از شما
                  خرید می‌کنند) و بتوانید آن‌ها را دوباره به سمت خرید از خودتان
                  تشویق کنید. فروشگاه‌های اینترنتی ساخته شده با فروشگاه ساز
                  ویترین، توانسته‌اند تا ۲۰۰٪ فروش بیش‌تری نسبت به روش‌های مستقل
                  فروش آنلاین دیگر تجربه کنند!
                </p>
              </div>
              <div style={{ padding: "40px 0" }}>
                <div className="d-flex align-items-center">
                  <Image
                    unoptimized
                    width={24}
                    height={24}
                    src="/images/website-blue.svg"
                    alt="می‌توانید عملیات خود را راحت‌تر کنید"
                    priority
                  />
                  <h3 style={{ fontSize: 15 }} className="mx-3 font-weight-600">
                    می‌توانید عملیات خود را راحت‌تر کنید
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 15, textAlign: "right" }}
                >
                  حتما از دردسرهای همیشگی یک آنلاین شاپ مثل مدیریت سفارش‌ها و
                  موجودی محصولات، کنترل عملیات مختلف پرداخت و ارسال سفارش‌ها
                  آگاهی دارید. شما با فروشگاه ساز ویترین می‌توانید کانال‌های
                  فروش آنلاین و حضوری خود را در پنل مدیریت فروشگاه خود در ویترین
                  یکپارچه کنید، همهٔ سفارش‌ها را از یک محل مدیریت کنید و حجم
                  زیادی از جزئیات سفارش‌گیری مثل هزینه‌های ارسال را به‌صورت
                  خودکار با ویترین انجام دهید. فروشگاه ساز ویترین ساده‌ترین و
                  سریع‌ترین راه برای مدیریت کسب‌وکارآنلاین را در اختیار شما قرار
                  می‌دهد.
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
                  height={24}
                  src="/images/arrow-left-icon-blue.svg"
                  alt="ساخت فروشگاه اینترنتی"
                  priority
                />
              </Link>
            </div>
            <div className="flex-1 d-flex justify-content-center">
              <Image
                unoptimized
                height={240}
                src="/images/1-Shopping2.svg"
                width={320}
                alt=" چند ویژگی فروشگاه ساز ویترین"
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
              fontSize: 24,
              lineHeight: "28px",
              paddingBottom: 40,
              borderBottom: "1px solid #E4E6E7",
              width: "100%",
              color: "#202223",
              fontWeight: 600,
            }}
          >
            استفاده از فروشگاه ساز ویترین برای شما سود دارد!
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
                    alt="می‌توانید فروش سایت خود را بیشتر کنید"
                    priority
                  />{" "}
                  <h3 className="mx-3 font-weight-600" style={{ fontSize: 20 }}>
                    می‌توانید فروش سایت خود را بیشتر کنید
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 16, textAlign: "right" }}
                >
                  فروشگاهی حرفه‌ای داشته باشید و بیشتر بفروشید! فروشگاه ساز
                  ویترین به شما امکان می‌دهد تا در فروشگاه اینترنتی خود از
                  تکنولوژی I.O.M بهره‌مند شوید. شما به کمک تکنولوژی I.O.M و دیگر
                  ابزارهای اتوماسیون بازاریابی فروشگاه ساز ویترین، می‌توانید به
                  صورت یک‌جا به اطلاعات تمام مشتری‌های خود دسترسی داشته باشید
                  (فارغ از این‌که آنلاین، حضوری، تلفنی یا با اینستاگرام از شما
                  خرید می‌کنند) و بتوانید آن‌ها را دوباره به سمت خرید از خودتان
                  تشویق کنید. فروشگاه‌های اینترنتی ساخته شده با فروشگاه ساز
                  ویترین، توانسته‌اند تا ۲۰۰٪ فروش بیش‌تری نسبت به روش‌های مستقل
                  فروش آنلاین دیگر تجربه کنند!
                </p>
              </div>
              <div style={{ padding: "40px 0" }}>
                <div className="d-flex align-items-center">
                  <Image
                    unoptimized
                    width={24}
                    height={24}
                    src="/images/website-blue.svg"
                    alt="می‌توانید عملیات خود را راحت‌تر کنید"
                    priority
                  />
                  <h3 style={{ fontSize: 20 }} className="mx-3 font-weight-600">
                    می‌توانید عملیات خود را راحت‌تر کنید
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 20, textAlign: "right" }}
                >
                  حتما از دردسرهای همیشگی یک آنلاین شاپ مثل مدیریت سفارش‌ها و
                  موجودی محصولات، کنترل عملیات مختلف پرداخت و ارسال سفارش‌ها
                  آگاهی دارید. شما با فروشگاه ساز ویترین می‌توانید کانال‌های
                  فروش آنلاین و حضوری خود را در پنل مدیریت فروشگاه خود در ویترین
                  یکپارچه کنید، همهٔ سفارش‌ها را از یک محل مدیریت کنید و حجم
                  زیادی از جزئیات سفارش‌گیری مثل هزینه‌های ارسال را به‌صورت
                  خودکار با ویترین انجام دهید. فروشگاه ساز ویترین ساده‌ترین و
                  سریع‌ترین راه برای مدیریت کسب‌وکارآنلاین را در اختیار شما قرار
                  می‌دهد.
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
                  height={24}
                  src="/images/arrow-left-icon-blue.svg"
                  alt="ساخت فروشگاه اینترنتی"
                  priority
                />
              </Link>
            </div>
            <div className="flex-1 d-flex justify-content-center">
              <Image
                unoptimized
                height={400}
                src="/images/1-Shopping2.svg"
                width={533}
                alt=" چند ویژگی فروشگاه ساز ویترین"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      {/* I.O.M (Mobile) */}
      <div
        className="d-flex d-md-none"
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
      {/* I.O.M (Desktop) */}
      <div
        className="d-none d-md-flex"
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
      {/* Examples  */}
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
          <div className="container">
            <h2
              className=" font-weight-600"
              style={{
                fontSize: 16,
                textAlign: "center",
                lineHeight: "28px",
              }}
            >
              نمونه سایت‌های فروشگاهی ساخته شده با فروشگاه ساز ویترین را ببینید
            </h2>
            <p
              className="pt-4"
              style={{
                fontSize: 15,
                lineHeight: "24px",
                textAlign: "center",
              }}
            >
              <span>یکی از اولین قدم‌های </span>
              <a
                href="https://vitrin.me"
                style={{ color: "#0050FF" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                راه‌اندازی سایت
              </a>
              <span>
                ، دیدن نمونه‌کارهای دیگران است تا با ایده‌های مختلف آشنا شوید.
                در ویترین می‌توانید از چندین نمونه سایت فروشگاهی دیدن کنید و سپس
                کار روی دکور فروشگاه اینترنتی خودتان را آغاز کنید.
              </span>
            </p>
            <div className="d-flex justify-content-center">
              <Link
                href="/cr~templates"
                className="header-buttons d-flex  justify-content-center align-items-center mt-4"
              >
                <button>نمونه خودتان را بسازید</button>
              </Link>
            </div>

            <p
              className="my-4 d-flex justify-content-center align-items-center"
              style={{
                textAlign: "left",
                color: "#0050FF",
                fontSize: 16,
              }}
            >
              <Link href="/examples/shopping" className="d-flex">
                <span>مشاهده نمونه سایت‌های فروشگاهی</span>
                <Image
                  unoptimized
                  width={24}
                  height={24}
                  priority
                  src="/images/arrow-left-icon-blue.svg"
                  alt="مشاهده نمونه سایت‌های فروشگاهی"
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
        {/* (Desktop) */}
        <div
          className="d-none d-md-block"
          style={{
            backgroundColor: "#F2F7FE",
            padding: "40px 0",
            color: "#202223",
          }}
          ref={examplesRef}
        >
          <div className="container">
            <h2
              className=" font-weight-600"
              style={{
                fontSize: 24,
                textAlign: "center",
                lineHeight: "28px",
              }}
            >
              نمونه سایت‌های فروشگاهی ساخته شده با فروشگاه ساز ویترین را ببینید
            </h2>
            <p
              className="pt-4"
              style={{
                fontSize: 16,
                lineHeight: "24px",
                textAlign: "center",
              }}
            >
              <span>یکی از اولین قدم‌های </span>
              <a
                href="https://vitrin.me"
                style={{ color: "#0050FF" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                راه‌اندازی سایت
              </a>
              <span>
                ، دیدن نمونه‌کارهای دیگران است تا با ایده‌های مختلف آشنا شوید.
                در ویترین می‌توانید از چندین نمونه سایت فروشگاهی دیدن کنید و سپس
                کار روی دکور فروشگاه اینترنتی خودتان را آغاز کنید.
              </span>
            </p>
            <div className="d-flex justify-content-center">
              <Link
                className="header-buttons d-flex  justify-content-center align-items-center mt-4"
                href="/cr~templates"
              >
                <button>نمونه خودتان را بسازید</button>
              </Link>
            </div>

            <p
              className="my-4 d-flex justify-content-center align-items-center"
              style={{
                textAlign: "left",
                color: "#0050FF",
                fontSize: 16,
              }}
            >
              <Link className="d-flex" href="/examples/shopping">
                <span>مشاهده نمونه سایت‌های فروشگاهی</span>
                <Image
                  unoptimized
                  width={24}
                  height={24}
                  src="/images/arrow-left-icon-blue.svg"
                  alt="مشاهده نمونه سایت‌های فروشگاهی"
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
      </div>
      {/* Comments */}
      <LazyHydrate whenVisible>
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
              fontSize: 16,
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
        {/* (Desktop) */}
        <div
          className="d-none d-md-block"
          style={{
            backgroundColor: "#0050FF",
            padding: "40px 0 80px",
          }}
        >
          <p
            style={{
              fontSize: 24,
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
      </LazyHydrate>
      {/* With taste */}
      <LazyHydrate whenVisible>
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
                fontSize: 16,
                lineHeight: "28px",
              }}
            >
              از یک قالب فروشگاهی زیبا استفاده کنید
            </h2>
            <p
              className={`pt-4 mb-0`}
              style={{
                fontSize: 15,
                lineHeight: "24px",
                textAlign: "center",
              }}
            >
              <span>
                وقتی بخواهید فروشگاه اینترنتی خودتان را مثل پیج اینستاگرام زیبا
                کنید، بهتر است از یک{" "}
              </span>
              <a
                href="https://vitrin.me/cr~templates"
                style={{ color: "#0050FF" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                قالب سایت فروشگاهی{" "}
              </a>
              <span>
                چشم‌نواز استفاده کنید که توسط یک تیم حرفه‌ای برای موفقیت
                آنلاین‌شاپ‌ها طراحی شده است. در ویترین قالب‌های متنوعی برای
                انواع کسب‌وکارها وجود دارد.
              </span>
            </p>
            <Image
              unoptimized
              height={232}
              width={342}
              priority
              className="mt-4"
              src="/images/3-Templates2.svg"
              alt="با چند نمونه قالب فروشگاهی حرفه‌ای در فروشگاه ساز ویترین"
            />
          </div>
          {/* (Desktop) */}
          <div
            className="container d-none d-md-flex flex-column justify-content-center align-items-center"
            style={{
              paddingTop: 40,
              paddingBottom: 40,
            }}
          >
            <h2
              style={{
                color: "#202223",
                fontWeight: 600,
                fontSize: 24,
                lineHeight: "28px",
              }}
            >
              از یک قالب فروشگاهی زیبا استفاده کنید
            </h2>
            <p
              className={`pt-4 mb-5`}
              style={{
                fontSize: 16,
                lineHeight: "24px",
                textAlign: "center",
              }}
            >
              <span>
                وقتی بخواهید فروشگاه اینترنتی خودتان را مثل پیج اینستاگرام زیبا
                کنید، بهتر است از یک{" "}
              </span>
              <a
                href="https://vitrin.me/cr~templates"
                style={{ color: "#0050FF" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                قالب سایت فروشگاهی{" "}
              </a>
              <span>
                چشم‌نواز استفاده کنید که توسط یک تیم حرفه‌ای برای موفقیت
                آنلاین‌شاپ‌ها طراحی شده است. در ویترین قالب‌های متنوعی برای
                انواع کسب‌وکارها وجود دارد.
              </span>
            </p>
            <Image
              unoptimized
              height={438}
              width={600}
              priority
              className="mt-4"
              src="/images/3-Templates2.svg"
              alt="با چند نمونه قالب فروشگاهی حرفه‌ای در فروشگاه ساز ویترین"
            />
          </div>
        </div>
      </LazyHydrate>
      {/* Expectations */}
      <div style={{ backgroundColor: "#F6F6F7" }}>
        {/* (Mobile) */}
        <div className="container d-md-none">
          <div
            style={{
              padding: "32px 0",
              textAlign: "center",
              fontSize: 16,
              lineHeight: "28px",
              paddingBottom: 16,
              color: "#202223",
              borderBottom: "1px solid #E4E6E7",
            }}
          >
            <h2 className="font-weight-600">
              هر چیزی که از یک فروشگاه ساز حرفه‌ای انتظار دارید
            </h2>
          </div>
          <div
            className="d-flex flex-column flex-md-row"
            style={{ padding: "40px 0 ", color: "#202223", lineHeight: "24px" }}
          >
            <div className="flex-1 align-self-center">
              <Image
                unoptimized
                src="/images/2-WebDesign2.svg"
                width={320}
                height={240}
                alt="تعدادی از امکانات عمومی سایت‌های ساخته شده با فروشگاه ساز ویترین"
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
                    alt="سایت اختصاصی شما"
                    priority
                  />
                  <h3 className="mx-3 font-weight-600" style={{ fontSize: 15 }}>
                    یک فروشگاه اینترنتی مختص برند خودتان بسازید
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 15, textAlign: "right" }}
                >
                  <span>اگر همیشه نگران این بودید که برای </span>
                  <a
                    href="https://vitrin.me/shopping"
                    style={{ color: "#0050FF" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ساخت سایت فروشگاهی{" "}
                  </a>
                  <span>
                    نیاز به دانش برنامه‌نویسی دارید، خبر خوبی برایتان داریم! شما
                    با فروشگاه ساز ویترین می‌توانید بدون کدنویسی، فروشگاه
                    اینترنتی خود را طراحی کنید و همیشه حتی با گوشی، فروشگاه خود
                    را مدیریت کنید. کافی است تا یک قالب فروشگاهی برای سایت خود
                    انتخاب کنید و با استفاده از ابزارهایی که ویترین در اختیارتان
                    قرار می‌دهد ظاهر سایت را مطابق سلیقه خود شخصی سازی کنید. کار
                    با ویترین راحت‌تر از آن چیزی است که فکر می‌کنید!
                  </span>
                </p>
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
                  <h3 style={{ fontSize: 15 }} className="mx-3 font-weight-600">
                    یک آنلاین شاپ کاربرپسند داشته باشید
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 15, textAlign: "right" }}
                >
                  هر سایت فروشگاهی که با ویترین ساخته می‌شود از اصول سئو پیروی
                  می‌کند تا شما برای رسیدن به رتبه‌های بالای گوگل مشکلی نداشته
                  باشید. برای رعایت اصول محتوایی سئو سایت هم کافی است تا از
                  ابزار سئو ویترین کمک بگیرید. از طرف دیگر چون استفاده از
                  اینترنت در گوشی‌های موبایل رشد چشمگیری داشته است، هر سایت
                  فروشگاهی در ویترین با رعایت تمامی اصول طراحی واکنش‌گرا ساخته
                  می‌شود تا بازدیدکننده‌ها، فروشگاه اینترنتی شما را همیشه در
                  بهترین حالت در صفحه نمایش مشاهده کنند.
                </p>
              </div>
              <Link
                href="/cr~templates"
                className="d-flex position-absolute left-0 bottom-0"
                style={{ color: "#0050ff", fontSize: 16 }}
              >
                <span>شروع کنید </span>
                <Image
                  unoptimized
                  width={24}
                  height={24}
                  src="/images/arrow-left-icon-blue.svg"
                  alt="ساخت فروشگاه اینترنتی"
                  priority
                />
              </Link>
            </div>
          </div>
        </div>
        {/* (Desktop) */}
        <div className="container d-none d-md-block">
          <div
            style={{
              padding: "40px 0",
              textAlign: "center",

              fontSize: 24,
              lineHeight: "28px",
              paddingBottom: 40,
              color: "#202223",
              borderBottom: "1px solid #E4E6E7",
            }}
          >
            <h2 className="font-weight-600">
              هر چیزی که از یک فروشگاه ساز حرفه‌ای انتظار دارید
            </h2>
          </div>
          <div
            className="d-flex flex-column flex-md-row"
            style={{ padding: "40px 0 ", color: "#202223", lineHeight: "24px" }}
          >
            <div className="flex-1 align-self-center">
              <Image
                unoptimized
                src="/images/2-WebDesign2.svg"
                width={533}
                height={400}
                alt="تعدادی از امکانات عمومی سایت‌های ساخته شده با فروشگاه ساز ویترین"
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
                    alt="سایت اختصاصی شما"
                    priority
                  />
                  <h3 className="mx-3 font-weight-600" style={{ fontSize: 20 }}>
                    یک فروشگاه اینترنتی مختص برند خودتان بسازید
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 16, textAlign: "right" }}
                >
                  <span>اگر همیشه نگران این بودید که برای </span>
                  <a
                    href="https://vitrin.me/shopping"
                    style={{ color: "#0050FF" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ساخت سایت فروشگاهی{" "}
                  </a>
                  <span>
                    نیاز به دانش برنامه‌نویسی دارید، خبر خوبی برایتان داریم! شما
                    با فروشگاه ساز ویترین می‌توانید بدون کدنویسی، فروشگاه
                    اینترنتی خود را طراحی کنید و همیشه حتی با گوشی، فروشگاه خود
                    را مدیریت کنید. کافی است تا یک قالب فروشگاهی برای سایت خود
                    انتخاب کنید و با استفاده از ابزارهایی که ویترین در اختیارتان
                    قرار می‌دهد ظاهر سایت را مطابق سلیقه خود شخصی سازی کنید. کار
                    با ویترین راحت‌تر از آن چیزی است که فکر می‌کنید!
                  </span>
                </p>
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
                  <h3 style={{ fontSize: 20 }} className="mx-3 font-weight-600">
                    یک آنلاین شاپ کاربرپسند داشته باشید
                  </h3>
                </div>
                <p
                  className="mt-4 pb-5"
                  style={{ fontSize: 16, textAlign: "right" }}
                >
                  هر سایت فروشگاهی که با ویترین ساخته می‌شود از اصول سئو پیروی
                  می‌کند تا شما برای رسیدن به رتبه‌های بالای گوگل مشکلی نداشته
                  باشید. برای رعایت اصول محتوایی سئو سایت هم کافی است تا از
                  ابزار سئو ویترین کمک بگیرید. از طرف دیگر چون استفاده از
                  اینترنت در گوشی‌های موبایل رشد چشمگیری داشته است، هر سایت
                  فروشگاهی در ویترین با رعایت تمامی اصول طراحی واکنش‌گرا ساخته
                  می‌شود تا بازدیدکننده‌ها، فروشگاه اینترنتی شما را همیشه در
                  بهترین حالت در صفحه نمایش مشاهده کنند.
                </p>
              </div>
              <Link
                passHref
                href="/cr~templates"
                className="d-flex position-absolute left-0 bottom-0"
                style={{ color: "#0050ff", fontSize: 16 }}
              >
                <span>شروع کنید </span>
                <Image
                  unoptimized
                  width={24}
                  height={24}
                  src="/images/arrow-left-icon-blue.svg"
                  alt="ساخت فروشگاه اینترنتی"
                  priority
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ (Mobile) */}
      <LazyHydrate whenVisible>
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
                fontSize: 16,
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
      </LazyHydrate>
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
              fontSize: 24,
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
                    transition: "transform 0.5s",
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
      <BreadCrumb text="فروشگاه ساز" link={router.asPath} />
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
});
function mapDispatchToProps(dispatch) {
  return {
    _showTotolGmv: () => dispatch(showTotolGmv()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(ShopBuilderPage);
