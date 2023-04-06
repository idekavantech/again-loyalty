import { Fragment, memo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

function Section6OfBusinessShopping({
  sbm,
  shop2,
  shop1,
  site,
  xsb4,
  xsb2Text,
  xsb1Text,
  xsb5,
  v36,
  v37,
}) {
  return (
    <Fragment>
      {/* (Mobile) */}
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
              طراحی فروشگاه اینترنتی {sbm} خودتان را با تکنولوژی ویترین انجام
              دهید
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
                      مشتریان {site} شما بیشتر می‌شوند
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
                    هر کسب‌وکاری برای اینکه بتواند سودده باشد، باید به فکر
                    افزایش فروش و مشتری‌های خود باشد. مهم‌ترین مزیتی که {xsb4}{" "}
                    با ویترین برای برند {sbm} شما دارد این است که به کمک سیستم
                    فروش آنلاین ویترین می‌توانید تعداد {shop2} از سایت خود را
                    افزایش دهید. این کار با استفاده از تکنولوژی I.O.M در {v36}{" "}
                    امکان پذیر است که برای انواع {site} و {shop1} قابل اجرا است.
                    با این تکنولوژی شما می‌توانید مشتری‌های خود را به خرید
                    دوباره از {xsb5} خود ترغیب کنید.
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
                      مدیریت {shop1} شما راحت‌تر می‌شود
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 15, textAlign: "right" }}
                  >
                    احتمالا همیشه نگران بودید که با افزایش {shop2} کسب‌وکارتان،
                    هزینه‌های بیشتری هم باید بپردازید. وقتی که برای کسب‌وکار{" "}
                    {sbm} خود یک {site} می‌سازید، بسیاری از هزینه‌های یک فروشگاه
                    سنتی را حذف می‌کنید. {v37} با استفاده از تکنولوژی‌های روز
                    دنیا به شما کمک می‌کند تا علاوه بر افزایش فروش {shop1} خود،
                    مدیریت سایت را نیز راحت‌تر انجام دهید. در این راستا
                    می‌توانید نرم‌افزارهای مختلفی که برای عملیات روزمره برند{" "}
                    {sbm} خود استفاده می‌کنید، مثل صندوق فروشگاهی یا سیستم
                    حسابداری را به فروشگاه اینترنتی کسب‌وکارتان متصل کنید. به
                    این ترتیب عملیات خود را ساده‌تر می‌کنید.
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
                  alt={`مزایایی که ${xsb1Text} با فروشگاه ساز ویترین برای یک ${xsb2Text} دارد.`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* (Desktop) */}
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
              طراحی فروشگاه اینترنتی {sbm} خودتان را با تکنولوژی ویترین انجام
              دهید
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
                      مشتریان {site} شما بیشتر می‌شوند
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
                    هر کسب‌وکاری برای اینکه بتواند سودده باشد، باید به فکر
                    افزایش فروش و مشتری‌های خود باشد. مهم‌ترین مزیتی که {xsb4}{" "}
                    با ویترین برای برند {sbm} شما دارد این است که به کمک سیستم
                    فروش آنلاین ویترین می‌توانید تعداد {shop2} از سایت خود را
                    افزایش دهید. این کار با استفاده از تکنولوژی I.O.M در {v36}{" "}
                    امکان پذیر است که برای انواع {site} و {shop1} قابل اجرا است.
                    با این تکنولوژی شما می‌توانید مشتری‌های خود را به خرید
                    دوباره از {xsb5} خود ترغیب کنید.
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
                      مدیریت {shop1} شما راحت‌تر می‌شود
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 16, textAlign: "right" }}
                  >
                    احتمالا همیشه نگران بودید که با افزایش {shop2} کسب‌وکارتان،
                    هزینه‌های بیشتری هم باید بپردازید. وقتی که برای کسب‌وکار{" "}
                    {sbm} خود یک {site} می‌سازید، بسیاری از هزینه‌های یک فروشگاه
                    سنتی را حذف می‌کنید. {v37} با استفاده از تکنولوژی‌های روز
                    دنیا به شما کمک می‌کند تا علاوه بر افزایش فروش {shop1} خود،
                    مدیریت سایت را نیز راحت‌تر انجام دهید. در این راستا
                    می‌توانید نرم‌افزارهای مختلفی که برای عملیات روزمره برند{" "}
                    {sbm} خود استفاده می‌کنید، مثل صندوق فروشگاهی یا سیستم
                    حسابداری را به فروشگاه اینترنتی کسب‌وکارتان متصل کنید. به
                    این ترتیب عملیات خود را ساده‌تر می‌کنید.
                  </p>
                </div>
                <Link href="/cr~templates">
                  <a
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
                  </a>
                </Link>
              </div>
              <div className="flex-1 d-flex justify-content-center">
                <Image
                  unoptimized
                  priority
                  height={400}
                  src="/images/web-features.svg"
                  width={533}
                  alt={`مزایایی که ${xsb1Text} با فروشگاه ساز ویترین برای یک ${xsb2Text} دارد.`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Section6OfBusinessShopping.propTypes = {
  sbm: PropTypes.string.isRequired,
  shop2: PropTypes.element.isRequired,
  shop1: PropTypes.element.isRequired,
  site: PropTypes.element.isRequired,
  xsb4: PropTypes.element.isRequired,
  xsb2Text: PropTypes.string.isRequired,
  xsb8Text: PropTypes.string.isRequired,
  xsb5: PropTypes.element.isRequired,
  v36: PropTypes.element.isRequired,
  v37: PropTypes.element.isRequired,
};

export default memo(Section6OfBusinessShopping);
