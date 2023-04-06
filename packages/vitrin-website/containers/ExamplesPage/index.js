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
import BreadCrumb from "components/BreadCrumb";
import { useRouter } from "next/router";

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

const ExamplesPage = () => {
  const { maxWidth768 } = useResponsive();
  const [selectedBusiness, setSelectedBusiness] = useState();
  const [primarySearch, setPrimarySearch] = useState("");
  const [secondarySearch, setSecondarySearch] = useState("");
  const [searched, setSearched] = useState("");
  const categoriesRef = useRef();
  const router = useRouter();
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

  return (
    <div className="w-100 position-relative">
      <Header isTransparent />
      <div
        style={{
          backgroundColor: "#1B2125",
          padding: maxWidth768 ? "64px 0" : "120px 0",
        }}
      >
        <div className="container">
          <h1
            style={{
              color: "#fff",
              fontSize: maxWidth768 ? 21 : 28,
              textAlign: "center",
            }}
          >
            نمونه طراحی سایت با ویترین
          </h1>
          <p
            style={{
              color: "#fff",
              fontSize: maxWidth768 ? 16 : 26,
              marginTop: maxWidth768 ? 8 : 24,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            چه نمونه سایتی مد نظر دارید؟{" "}
          </p>
          <div
            className="d-flex position-relative  col-11 col-md-6 radius-16 p-4"
            style={{
              background: "rgba(255, 255, 255, 0.3)",
              margin: maxWidth768 ? "48px auto" : "64px auto",
              boxSizing: "border-box",
              height: 56,
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
              placeholder="جستجوی نمونه سایت"
              value={primarySearch}
              onChange={(e) => {
                setPrimarySearch(e.target.value),
                  setSearched(searchCategory(e.target.value));
              }}
            />

            <div
              className="radius-16"
              style={{
                position: "absolute",
                backgroundColor: "#fff",
                top: 64,
                left: 0,
                right: 0,
              }}
            >
              {primarySearch &&
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
                        setPrimarySearch("");
                      }}
                    >
                      <Image
                        src={item.logo}
                        width={60}
                        height={50}
                        className="radius-8"
                        alt={item.title}
                      />
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
          <div
            className="d-flex"
            style={{
              justifyContent: maxWidth768 ? "flex-start" : "center",
              overflowX: maxWidth768 ? "scroll" : "hidden",
            }}
          >
            {example_businesses.map((item) => (
              <div
                className={`radius-16 cursorPointer ${
                  maxWidth768 ? "mx-2" : "mx-4"
                }`}
                key={item.id}
                style={{
                  minWidth: 144,
                  minHeight: 144,
                  background: "#fff",
                }}
                onClick={() => {
                  setSelectedBusiness(item);
                  categoriesRef.current.scrollIntoView();
                }}
              >
                <div
                  className="w-100"
                  style={{
                    height: 104,
                    backgroundImage: `url(${item.logo})`,
                    backgroundSize: "cover",
                    borderRadius: "16px 16px 0 0",
                  }}
                ></div>
                <div
                  className="d-flex justify-content-center align-items-center font-weight-600"
                  style={{ color: "#202223", height: 40 }}
                >
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="container"
        style={{
          padding: maxWidth768 ? "64px 16px 84px" : "120px 0 180px",
          color: "#202223",
          backgroundImage: `url(${
            maxWidth768
              ? "/images/logos-example-mobile.svg"
              : "/images/logos-examples.svg"
          } )`,
          backgroundSize: "cover",
        }}
      >
        <h2 style={{ fontSize: 20, textAlign: "center" }}>
          طیف وسیعی از نمونه طراحی سایت ویترین
        </h2>
        <p
          style={{ fontSize: 14, textAlign: "center" }}
          className="col-md-8 mt-4 container"
        >
          بیش از ۶۳۰ کسب‌وکار مختلف در حوزه‌های گوناگون، برای طراحی سایت به
          ویترین اعتماد کرده‌اند. انواع مختلف فروشگاه‌های آنلاین و سایت‌های
          معرفی با ویترین قابل طراحی هستند.
        </p>
      </div>
      <div ref={categoriesRef} className="mt-5 pt-5">
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
          {selectedBusiness?.label === "shopping" && (
            <p
              className="mb-4 d-flex justify-content-center align-items-center"
              style={{
                textAlign: "left",
                color: "#0050FF",
                fontSize: 16,
                zIndex: 10000,
              }}
            >
              <Link className="d-flex" href="/examples/shopping">
                <span>دیدن همه نمونه سایت‌های فروشگاهی</span>
                <Image
                  width={24}
                  height={24}
                  src="/images/arrow-left-icon-blue.svg"
                  alt="ساخت سایت"
                />
              </Link>
            </p>
          )}
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
                ویژگی نمونه سایت‌های ویترین
              </p>
              <p className="my-4" style={{ fontSize: 14, lineHeight: "24px" }}>
                ویترین با تجربهٔ طراحی بیش از ۶۳۰ فروشگاه اینترنتی در زمینه‌های
                مختلف، راه‌های موفقیت آنلاین کسب‌وکارهای متفاوت را آزموده است و
                بر همین اساس امکانات مختلفی را پیاده‌سازی کرده که هر کسب‌وکاری
                برای طراحی سایت به آن‌ها نیاز دارد. فارغ از اینکه سایت شما فروش
                آنلاین داشته باشد یا خیر، در ویترین دست شما باز است تا طراحی
                سایت و صفحات آن را مطابق با سلیقهٔ خود انجام دهید. به لطف طراحی
                واکنشگرای ویترین، هر تغییری که در ظاهر و محتوای سایت خود بدهید،
                در گوشی‌ها هم به‌درستی دیده می‌شود. به‌علاوه، سایت‌های طراحی شده
                با ویترین از سئوی بهینه نیز بهره می‌برند. دیدن نمونه سایت‌های
                ویترین به شما کمک می‌کند برای کسب‌وکار خودتان ایده بگیرید، با
                قابلیت‌های ویترین آشنا شوید و از این نمونه سایت‌ها به عنوان
                الگوهایی که جواب پس داده‌اند برای کسب‌وکارتان استفاده کنید.
              </p>
              <Link
                href="/cr~templates"
                className="d-flex justify-content-end mt-4"
                style={{ color: "#0050ff" }}
              >
                <span>ساخت سایت</span>
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
                  alt="ویژگی نمونه سایت‌های ویترین"
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
            <p className="my-4" style={{ textAlign: "center" }}>
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
                placeholder="جستجوی نمونه سایت"
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
                        <Image
                          src={item.logo}
                          width={60}
                          height={50}
                          //objectFit="contain"
                          className="radius-8"
                          alt={item.title}
                        />
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
      <BreadCrumb text="نمونه سایت" link={router.asPath} />
      <Footer />
    </div>
  );
};

export default ExamplesPage;
