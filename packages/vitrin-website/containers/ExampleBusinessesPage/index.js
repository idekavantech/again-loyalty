/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from "react";
import Header from "containers/Header/index";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Footer from "components/Footer";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { example_businesses } from "./constants";
import Link from "next/link";
import { useRouter } from "next/router";
import BreadCrumb from "components/BreadCrumb";
const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  dots: true,
  arrows: false,
  speed: 300,
  slidesToShow: 3,
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

const ExampleBusinessesPage = () => {
  const { maxWidth768 } = useResponsive();

  const [selectedBusiness, setSelectedBusiness] = useState();
  const [secondarySearch, setSecondarySearch] = useState("");
  const [searched, setSearched] = useState("");
  const categoriesRef = useRef();
  useEffect(() => {
    setSelectedBusiness(example_businesses[0]);
  }, []);
  const searchCategory = (str) => {
    if (str) {
      return example_businesses.filter(({ title }) => title.includes(str))
        .length > 0
        ? example_businesses.filter(({ title }) => title.includes(str))
        : example_businesses.filter(
            ({ items }) =>
              items.filter(({ name }) => name.includes(str)).length > 0
          );
    } else {
      return [];
    }
  };

  const router = useRouter();
  return (
    <div className="w-100 position-relative">
      <Header isTransparent />
      <div
        className="container"
        style={{
          padding: maxWidth768 ? "64px 16px 84px" : "120px 0",
          color: "#202223",
          backgroundSize: "cover",
        }}
      >
        <h1 style={{ fontSize: 20, textAlign: "center" }}>
          نمونه سایت فروشگاهی با ویترین
        </h1>
        <p
          style={{ fontSize: 14, textAlign: "center" }}
          className="col-md-8 mt-4 container"
        >
          هر کالایی که برای فروش داشته باشید، می‌توانید با ویترین یک فروشگاه
          آنلاین برای فروش آن طراحی کنید. نمونه طراحی سایت فروشگاهی در دسته‌های
          پرمخاطب زیر به شما کمک می‌کند ایده‌های بهتری برای سایت فروشگاهی خودتان
          داشته باشید
        </p>
      </div>
      <div ref={categoriesRef}>
        <div
          className="position-sticky col-md-11 m-auto"
          style={{ top: 16, zIndex: 1 }}
        >
          <div
            className={`scrollbar-hidden col-md-10 m-auto d-flex justify-content-between align-items-center ${
              maxWidth768 ? "p-2" : "p-4"
            }`}
            style={{
              // width: 1137,
              top: 0,
              borderRadius: 145,
              backgroundColor: "#1B2125",
              overflowX: maxWidth768 ? "scroll" : "auto",
            }}
          >
            {example_businesses.map((category) => (
              <span
                key={category.id}
                className="flex-1 px-4 py-3 cursorPointer"
                onClick={() => setSelectedBusiness(category)}
                style={{
                  transition: "all 0.3s ease-in-out",
                  color:
                    category.id == selectedBusiness?.id ? "#202223" : "#fff",
                  backgroundColor:
                    category.id == selectedBusiness?.id
                      ? "#fff"
                      : "transparent",
                  borderRadius: 136,
                  fontSize: maxWidth768 ? 15 : 14,
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                {category.title}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="sample-site example w-100 mt-5">
            <Slider {...settings}>
              {selectedBusiness?.items.map((item) => (
                <div key={item.id}>
                  <p
                    className="mb-md-4 mb-1"
                    style={{
                      textAlign: "center",
                      fontSize: maxWidth768 ? 9 : 16,
                      whiteSpace: "nowrap",
                      direction: "rtl",
                    }}
                  >
                    {item.name}{" "}
                  </p>

                  <div key={item.id}>
                    <Link rel="nofollow" href={item.link}>
                      <div className="image-container">
                        <Image
                          className="image radius-16"
                          src={item.image}
                          alt={item.alt}
                          layout="fill"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#DFE9FF",
          padding: maxWidth768 ? "24px 0" : "80px 0",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#202223", fontSize: maxWidth768 ? 16 : 20 }}>
          کدام نمونه سایت فروشگاهی مناسب شماست؟{" "}
        </h2>
        <p
          className="container mt-4 font-weight-600"
          style={{ color: "#6D7175", fontSize: maxWidth768 ? 15 : 16 }}
        >
          امکانات سایت‌های فروشگاهی ویترین گسترده است و می‌تواند پاسخگوی نیاز
          فروش آنلاین کسب‌وکار شما باشد؛ مثلا اتصال به درگاه پرداخت، مدیریت
          سفارش‌ها و روش‌های ارسال، کیف پول مشتری، اعتبار هدیه و کد تخفیف،
          گزارش‌های عملکرد دوره‌ای و … شما هم می‌توانید با طراحی فروشگاه
          اینترنتی خود به این امکانات و قابلیت‌های بیشتر برای کسب‌وکارتان دسترسی
          داشته باشید.
        </p>
        <div className="d-flex justify-content-center mt-4">
          <Link
            href="/cr~templates"
            className="d-flex justify-content-end mt-4 align-items-center"
            style={{ color: "#0050ff" }}
          >
            <span>ساخت فروشگاه اینترنتی</span>
            <Image
              width={24}
              height={24}
              src="/images/arrow-left-icon-blue.svg"
              alt="arrow"
            />
          </Link>
        </div>
      </div>
      <section style={{ backgroundColor: "#F6F6F7" }}>
        <div className="container">
          <div
            className={`w-100 d-flex ${
              maxWidth768 ? "flex-column" : "flex-row"
            } justify-space-between align-items-center`}
            style={{ padding: maxWidth768 ? "24px 0" : "32px 0" }}
          >
            <div className="col-12 col-md-6 pl-md-4">
              <p style={{ fontWeight: 600, fontSize: 16 }}>
                کدام نمونه سایت فروشگاهی مناسب شماست؟
              </p>
              <p className="my-4" style={{ fontSize: 14, lineHeight: "24px" }}>
                ویترین با تجربهٔ طراحی بیش از ۶۰۰ فروشگاه اینترنتی در زمینه‌های
                مختلف، راه‌های فروش آنلاین کسب‌وکارهای متفاوت را آزموده است و بر
                همین اساس امکانات مختلفی را پیاده‌سازی کرده که هر سایت فروشگاهی
                موفق به آن‌ها نیاز دارد. سایت‌های فروشگاهی ویترین علاوه بر
                امکانات کامل فروش آنلاین، از سئوی بهینه و طراحی واکنشگرا نیز
                بهره می‌برند. همچنین با ویترین می‌توانید نرم‌افزار صندوق
                فروشگاهی خود را با سیستم سفارش‌گیری آنلاین خود یکپارچه کنید.
                بررسی نمونه سایت‌های فروشگاهی ویترین به شما کمک می‌کند برای
                راه‌اندازی فروشگاه اینترنتی خود ایده بگیرید، با قابلیت‌های
                ویترین آشنا شوید و از این نمونه سایت‌های فروشگاهی به عنوان نقطهٔ
                شروع طراحی فروشگاه اینترنتی خودتان استفاده کنید.
              </p>
              <Link
                href="/cr~templates"
                className="d-flex justify-content-end mt-4 align-items-center"
                style={{ color: "#0050ff" }}
              >
                <span>ساخت فروشگاه اینترنتی</span>
                <Image
                  width={24}
                  height={24}
                  src="/images/arrow-left-icon-blue.svg"
                  alt="ساخت سایت"
                />
              </Link>
            </div>
            <div className="col-12 col-md-6  pl-md-4">
              <div
                className="w-100"
                style={{
                  height: maxWidth768 ? 230 : 417,
                  marginTop: maxWidth768 ? 32 : 0,
                }}
              >
                <Image
                  layout="fill"
                  src="/images/example.svg"
                  alt="همه نمونه سایت های طراحی شده با ویترین با موبایل سازگارند."
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: "#0050FF" }}>
        <div className="container">
          <div
            className="d-flex flex-column align-items-center"
            style={{
              padding: maxWidth768 ? "24px 0" : "80px 0",
              color: "#fff",
            }}
          >
            <p style={{ fontSize: 20, lineHeight: "28px" }}>
              نمونه سایت مورد نظرتان را پیدا نکردید؟
            </p>
            <p className="my-4">
              نمونه سایت‌های مختلفی در زمینه‌های گوناگون با ویترین طراحی شده
              است.
            </p>
            <div
              className="position-relative d-flex col-12 col-md-6 radius-16 p-4 mt-4"
              style={{
                background: "rgba(255, 255, 255, 0.3)",
                color: "#fff",
              }}
            >
              <div>
                <Image
                  height={24}
                  width={24}
                  src="/images/search-icon-white.svg"
                  alt="جستجوی نمونه سایت"
                />
              </div>
              <input
                className="flex-1 login-input mr-4"
                placeholder="جستجوی نمونه سایت فروشگاهی"
                value={secondarySearch}
                onChange={(e) => {
                  setSecondarySearch(e.target.value),
                    setSearched(searchCategory(e.target.value));
                }}
              />
              <div
                className="radius-16"
                style={{
                  position: "absolute",
                  backgroundColor: "#fff",
                  top: 70,
                  left: 0,
                  right: 0,
                  zIndex: 1,
                  boxShadow: "0px 0px 16px 2px rgba(0, 0, 0, 0.12)",
                }}
              >
                {secondarySearch &&
                  (searched.length ? (
                    searched.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          borderBottom:
                            index !== searched.length - 1
                              ? "1px solid #E4E6E7"
                              : "none",
                        }}
                        className={`d-flex align-items-center justify-content-start cursorPointer px-4 py-3`}
                        onClick={() => {
                          setSelectedBusiness(item);
                          categoriesRef.current.scrollIntoView();
                          setSecondarySearch("");
                        }}
                      >
                        <span
                          className="mr-4"
                          style={{
                            fontSize: 16,
                            color: "#202223",
                            fontWeight: 600,
                            direction: "ltr",
                          }}
                        >
                          {item.title}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div
                      className="p-4"
                      style={{
                        fontSize: 16,
                        color: "#202223",
                        fontWeight: 600,
                        direction: "ltr",
                      }}
                    >
                      نتیجه ای یافت نشد{" "}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <BreadCrumb text="نمونه سایت فروشگاهی" link={router.asPath} />
      <Footer />
    </div>
  );
};

export default ExampleBusinessesPage;
