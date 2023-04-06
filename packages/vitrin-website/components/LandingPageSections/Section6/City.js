import { Fragment, memo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

function Section6OfCity({
  cn,
  shop2,
  shop1Text,
  site,
  xc1,
  xc2Text,
  v19,
  v8,
  xc6,
  xc7,
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
              طراحی فروشگاه اینترنتی در {cn} برای کسب‌وکارتان انجام دهید
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
                      تعداد {shop2} از {site} کسب‌وکار شما در {cn} بیشتر می‌شود
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
                    شما با {xc1} برای کسب‌وکار و برند خود می‌توانید از طریق
                    اینترنت هم {shop2} داشته باشید و همین باعث افزایش فروش و
                    مشتری‌های شما می‌شود. از طرف دیگر داشتن یک {site} برای
                    برندتان، به شما این امکان را می‌دهد که از روش‌های مختلف
                    تبلیغاتی و افزایش فروش استفاده کنید. مثلا سئو سایت که از
                    طریق آن می‌توانید تعداد {shop2} از {site} خودتان را بیشتر
                    کنید. همچنین ابزارهای اتوماسیون بازاریابی ویترین (I.O.M) به
                    شما کمک می‌کند تا بتوانید مشتری‌های قبلی خود را (از هر طریقی
                    که جذب کرده‌اید) به خرید دوباره از {site} خودتان در {cn}{" "}
                    ترغیب کنید. استفاده از تکنولوژی فروش آنلاین ویترین، تغییری
                    در {v19} شما نخواهد داد.
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
                      هر {shop2} از {site} کسب وکار شما راحت‌تر مدیریت می‌شود
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 15, textAlign: "right" }}
                  >
                    داشتن یک {v8} برای کسب‌وکار شما به این معناست که مدیریت
                    تعداد زیادی {shop2} از {site} شما در {cn} بسیار راحت‌تر
                    می‌شود. {xc6} با ویترین به شما اجازه می‌دهد یک شعبهٔ آنلاین
                    برای برند خود داشته باشید. در ویترین ابزارهای مختلفی برای
                    مدیریت شعبه آنلاین کسب‌وکارتان در اختیار دارید؛ از انبارداری
                    و مدیریت سفارش‌ها گرفته تا گزارش‌های فروش دوره‌ای و
                    حسابداری. ویترین به عنوان یک {xc7} این امکان را در اختیار
                    شما می‌گذارد تا {site} خود را به نرم‌افزارهای حسابداری،
                    صندوق فروشگاهی و حتی باشگاه مشتریانی که الان در کسب‌وکار خود
                    استفاده می‌کنید متصل کنید و تمام جوانب فروش حضوری و آنلاین
                    در {cn} را از یک پنل یکپارچه مدیریت کنید.
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
                  alt={`مزایایی که ${xc2Text} با فروشگاه ساز ویترین برای یک ${shop1Text} در ${cn} دارد.`}
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
              طراحی فروشگاه اینترنتی در {cn} برای کسب‌وکارتان انجام دهید
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
                      تعداد {shop2} از {site} کسب‌وکار شما در {cn} بیشتر می‌شود
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
                    شما با {xc1} برای کسب‌وکار و برند خود می‌توانید از طریق
                    اینترنت هم {shop2} داشته باشید و همین باعث افزایش فروش و
                    مشتری‌های شما می‌شود. از طرف دیگر داشتن یک {site} برای
                    برندتان، به شما این امکان را می‌دهد که از روش‌های مختلف
                    تبلیغاتی و افزایش فروش استفاده کنید. مثلا سئو سایت که از
                    طریق آن می‌توانید تعداد {shop2} از {site} خودتان را بیشتر
                    کنید. همچنین ابزارهای اتوماسیون بازاریابی ویترین (I.O.M) به
                    شما کمک می‌کند تا بتوانید مشتری‌های قبلی خود را (از هر طریقی
                    که جذب کرده‌اید) به خرید دوباره از {site} خودتان در {cn}{" "}
                    ترغیب کنید. استفاده از تکنولوژی فروش آنلاین ویترین، تغییری
                    در {v19} شما نخواهد داد.
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
                      هر {shop2} از {site} کسب وکار شما راحت‌تر مدیریت می‌شود
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 16, textAlign: "right" }}
                  >
                    داشتن یک {v8} برای کسب‌وکار شما به این معناست که مدیریت
                    تعداد زیادی {shop2} از {site} شما در {cn} بسیار راحت‌تر
                    می‌شود. {xc6} با ویترین به شما اجازه می‌دهد یک شعبهٔ آنلاین
                    برای برند خود داشته باشید. در ویترین ابزارهای مختلفی برای
                    مدیریت شعبه آنلاین کسب‌وکارتان در اختیار دارید؛ از انبارداری
                    و مدیریت سفارش‌ها گرفته تا گزارش‌های فروش دوره‌ای و
                    حسابداری. ویترین به عنوان یک {xc7} این امکان را در اختیار
                    شما می‌گذارد تا {site} خود را به نرم‌افزارهای حسابداری،
                    صندوق فروشگاهی و حتی باشگاه مشتریانی که الان در کسب‌وکار خود
                    استفاده می‌کنید متصل کنید و تمام جوانب فروش حضوری و آنلاین
                    در {cn} را از یک پنل یکپارچه مدیریت کنید.
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
                  alt={`مزایایی که ${xc2Text} با فروشگاه ساز ویترین برای یک ${shop1Text} در ${cn} دارد.`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Section6OfCity.propTypes = {
  cn: PropTypes.string.isRequired,
  shop2: PropTypes.element.isRequired,
  shop1Text: PropTypes.string.isRequired,
  site: PropTypes.element.isRequired,
  xc1: PropTypes.element.isRequired,
  xc2Text: PropTypes.string.isRequired,
  v19: PropTypes.element.isRequired,
  v8: PropTypes.element.isRequired,
  xc6: PropTypes.element.isRequired,
  xc7: PropTypes.element.isRequired,
};

export default memo(Section6OfCity);
