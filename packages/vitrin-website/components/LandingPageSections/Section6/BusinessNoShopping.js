import { Fragment, memo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

function Section6OfBusinessNoShopping({
  ibt,
  xb3,
  xb2,
  xb2Text,
  v1,
  v10,
  v17,
  site,
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
              طراحی سایت {ibt} به برند شما کمک می‌کند
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
                      اعتبار برند خود را افزایش دهید
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
                    داشتن یک برند {ibt} قوی، لازمه فعالیت موفق در دنیای اینترنتی
                    امروز است. {xb3} یکی از بهترین راه‌های افزایش اعتبار شرکت و
                    آنلاین برندینگ حرفه‌ای برای کسب‌وکار شماست. ویترین به شما
                    کمک می‌کند {xb2} خود را به‌سرعت طراحی کنید و نگران کمبود وقت
                    نباشید. شما به کمک ابزارهای ویترین می‌توانید خودتان ساخت
                    سایت را پیش ببرید و متناسب با سلیقه خود و هویت بصری برندتان،
                    مراحل مختلف راه اندازی یک {v10} را طی کنید. پشتیبانی تیم{" "}
                    {v1} نیز در تمام مسیر کنار شما خواهد بود.
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
                      مشتری‌های جدید برای کسب‌وکار خود جذب کنید
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 15, textAlign: "right" }}
                  >
                    بخش مهمی از مشتریان {xb2} شما در اینترنت و مشخصا در گوگل به
                    دنبال خدمات شما می‌گردند. شرکت و برند شما باید در فضای مجازی
                    حضور داشته باشد تا مشتری‌های بالقوه را از دست ندهید.
                    سایت‌های ساخته‌شده با {v17} ویترین طوری طراحی شده‌اند که
                    برای ارتباط با مخاطب {site} شما بهینه هستند. برای مثال
                    صفحاتی که با ویترین طراحی می‌کنید از طراحی واکنشگرا استفاده
                    می‌کنند تا {site} همیشه در هر صفحه نمایش گوشی یا لپتاپ، درست
                    دیده شود. همچنین خیالتان بابت سئوی فنی سایت راحت است چون
                    کدهای هر {xb2} در ویترین کاملا با معیارهای گوگل هماهنگ است و
                    از اصول سئوی فنی پیروی می‌کند.
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
                  alt={`برخی از فوایدی که طراحی ${xb2Text} با سایت ساز ویترین برای یک برند ${ibt} دارد.`}
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
              طراحی سایت {ibt} به برند شما کمک می‌کند
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
                      اعتبار برند خود را افزایش دهید
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
                    داشتن یک برند {ibt} قوی، لازمه فعالیت موفق در دنیای اینترنتی
                    امروز است. {xb3} یکی از بهترین راه‌های افزایش اعتبار شرکت و
                    آنلاین برندینگ حرفه‌ای برای کسب‌وکار شماست. ویترین به شما
                    کمک می‌کند {xb2} خود را به‌سرعت طراحی کنید و نگران کمبود وقت
                    نباشید. شما به کمک ابزارهای ویترین می‌توانید خودتان ساخت
                    سایت را پیش ببرید و متناسب با سلیقه خود و هویت بصری برندتان،
                    مراحل مختلف راه اندازی یک {v10} را طی کنید. پشتیبانی تیم{" "}
                    {v1} نیز در تمام مسیر کنار شما خواهد بود.
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
                      مشتری‌های جدید برای کسب‌وکار خود جذب کنید
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 16, textAlign: "right" }}
                  >
                    بخش مهمی از مشتریان {xb2} شما در اینترنت و مشخصا در گوگل به
                    دنبال خدمات شما می‌گردند. شرکت و برند شما باید در فضای مجازی
                    حضور داشته باشد تا مشتری‌های بالقوه را از دست ندهید.
                    سایت‌های ساخته‌شده با {v17} ویترین طوری طراحی شده‌اند که
                    برای ارتباط با مخاطب {site} شما بهینه هستند. برای مثال
                    صفحاتی که با ویترین طراحی می‌کنید از طراحی واکنشگرا استفاده
                    می‌کنند تا {site} همیشه در هر صفحه نمایش گوشی یا لپتاپ، درست
                    دیده شود. همچنین خیالتان بابت سئوی فنی سایت راحت است چون
                    کدهای هر {xb2} در ویترین کاملا با معیارهای گوگل هماهنگ است و
                    از اصول سئوی فنی پیروی می‌کند.
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
                  alt={`برخی از فوایدی که طراحی ${xb2Text} با سایت ساز ویترین برای یک برند ${ibt} دارد.`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Section6OfBusinessNoShopping.propTypes = {
  ibt: PropTypes.string.isRequired,
  xb3: PropTypes.element.isRequired,
  xb2: PropTypes.element.isRequired,
  xb2Text: PropTypes.string.isRequired,
  v1: PropTypes.element.isRequired,
  v10: PropTypes.element.isRequired,
  v17: PropTypes.element.isRequired,
  site: PropTypes.element.isRequired,
};

export default memo(Section6OfBusinessNoShopping);
