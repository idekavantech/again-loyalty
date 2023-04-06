import { Fragment, memo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

function Section8OfBusinessNoShopping({
  ibt,
  v31,
  xb11,
  xb11Text,
  xb2,
  main,
  site,
  v4,
  v37,
  xbc4,
}) {
  return (
    <Fragment>
      {/* (Mobile) */}
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
                ویترین به‌صرفه‌ترین تعرفه‌های طراحی سایت را دارد
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
                  alt={`قابلت‌های مختلف ویترین که ${xb11Text} را تحت تأثیر قرار می‌دهند.`}
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
                      تعرفه‌های شفاف سایت {ibt} را از ویترین بخواهید
                    </h3>
                  </div>
                  {xbc4 ? (
                    <p
                      className="mt-4 pb-5"
                      style={{ fontSize: 15, textAlign: "right" }}
                    >
                      یکی از اصلی‌ترین شاخصه‌های یک {v31} خوب و معتبر این است که
                      تعرفه‌های خدمات طراحی {site} را به‌صورت کاملا شفاف و
                      بی‌پرده در اختیار مشتری قرار دهد. شما برای تأسیس سایت
                      کسب‌وکار {ibt} خود می‌توانید از مشاوره رایگان تیم ویترین
                      بهره‌مند شوید و سفارش ساخت سایت خودتان را در اسرع وقت از
                      طریق تماس با کارشناسان ویترین ثبت کنید. سایت ساز ویترین
                      متعهد است که به‌صرفه‌ترین {xbc4} را به شما ارائه دهد تا
                      بتوانید امکانات مورد نیاز برای {main} یک {site} کارآمد را
                      در اختیار داشته باشید.
                    </p>
                  ) : (
                    <p
                      className="mt-4 pb-5"
                      style={{ fontSize: 15, textAlign: "right" }}
                    >
                      یکی از اصلی‌ترین شاخصه‌های یک {v31} خوب و معتبر این است که
                      تعرفه‌های خدمات طراحی {site} را به‌صورت کاملا شفاف و
                      بی‌پرده در اختیار مشتری قرار دهد. شما برای تأسیس سایت
                      کسب‌وکار {ibt} خود می‌توانید از مشاوره رایگان تیم ویترین
                      بهره‌مند شوید و سفارش ساخت سایت خودتان را در اسرع وقت از
                      طریق تماس با کارشناسان ویترین ثبت کنید. سایت ساز ویترین
                      متعهد است که به‌صرفه‌ترین {xb11} را به شما ارائه دهد تا
                      بتوانید امکانات مورد نیاز برای {main} یک {site} کارآمد را
                      در اختیار داشته باشید.
                    </p>
                  )}
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
                      ویترین معتبرترین شرکت طراحی سایت است
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 15, textAlign: "right" }}
                  >
                    وقتی می‌خواهید یک {xb2} طراحی کنید که همزمان با افزایش
                    مشتریان شما، اعتبار برند {ibt} شما را نیز بیشتر کند، باید
                    سراغ یک {v31} معتبر بروید. برای انتخاب یک طراح سایت باتجربه،
                    نکات زیادی را می‌بایست بررسی کنید. از جمله این موارد می‌توان
                    به مشاوره‌هایی که از شرکت دریافت می‌کنید، تجربه‌های قبلی و
                    نمونه‌کارهای {v4} اشاره کرد. {v37} یک شرکت طراحی سایت {ibt}{" "}
                    معتبر و حرفه‌ای است که آماده ارائه خدمات متنوع طراحی {site}{" "}
                    برای کسب‌وکارهای مختلف است.
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
      </div>
      {/* (Desktop) */}
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
                ویترین به‌صرفه‌ترین تعرفه‌های طراحی سایت را دارد
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
                  alt={`قابلت‌های مختلف ویترین که ${xb11Text} را تحت تأثیر قرار می‌دهند.`}
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
                      تعرفه‌های شفاف سایت {ibt} را از ویترین بخواهید
                    </h3>
                  </div>
                  {xbc4 ? (
                    <p
                      className="mt-4 pb-5"
                      style={{ fontSize: 16, textAlign: "right" }}
                    >
                      یکی از اصلی‌ترین شاخصه‌های یک {v31} خوب و معتبر این است که
                      تعرفه‌های خدمات طراحی {site} را به‌صورت کاملا شفاف و
                      بی‌پرده در اختیار مشتری قرار دهد. شما برای تأسیس سایت
                      کسب‌وکار {ibt} خود می‌توانید از مشاوره رایگان تیم ویترین
                      بهره‌مند شوید و سفارش ساخت سایت خودتان را در اسرع وقت از
                      طریق تماس با کارشناسان ویترین ثبت کنید. سایت ساز ویترین
                      متعهد است که به‌صرفه‌ترین {xbc4} را به شما ارائه دهد تا
                      بتوانید امکانات مورد نیاز برای {main} یک {site} کارآمد را
                      در اختیار داشته باشید.
                    </p>
                  ) : (
                    <p
                      className="mt-4 pb-5"
                      style={{ fontSize: 16, textAlign: "right" }}
                    >
                      یکی از اصلی‌ترین شاخصه‌های یک {v31} خوب و معتبر این است که
                      تعرفه‌های خدمات طراحی {site} را به‌صورت کاملا شفاف و
                      بی‌پرده در اختیار مشتری قرار دهد. شما برای تأسیس سایت
                      کسب‌وکار {ibt} خود می‌توانید از مشاوره رایگان تیم ویترین
                      بهره‌مند شوید و سفارش ساخت سایت خودتان را در اسرع وقت از
                      طریق تماس با کارشناسان ویترین ثبت کنید. سایت ساز ویترین
                      متعهد است که به‌صرفه‌ترین {xb11} را به شما ارائه دهد تا
                      بتوانید امکانات مورد نیاز برای {main} یک {site} کارآمد را
                      در اختیار داشته باشید.
                    </p>
                  )}
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
                      ویترین معتبرترین شرکت طراحی سایت است
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 16, textAlign: "right" }}
                  >
                    وقتی می‌خواهید یک {xb2} طراحی کنید که همزمان با افزایش
                    مشتریان شما، اعتبار برند {ibt} شما را نیز بیشتر کند، باید
                    سراغ یک {v31} معتبر بروید. برای انتخاب یک طراح سایت باتجربه،
                    نکات زیادی را می‌بایست بررسی کنید. از جمله این موارد می‌توان
                    به مشاوره‌هایی که از شرکت دریافت می‌کنید، تجربه‌های قبلی و
                    نمونه‌کارهای {v4} اشاره کرد. {v37} یک شرکت طراحی سایت {ibt}{" "}
                    معتبر و حرفه‌ای است که آماده ارائه خدمات متنوع طراحی {site}{" "}
                    برای کسب‌وکارهای مختلف است.
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
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

Section8OfBusinessNoShopping.propTypes = {
  ibt: PropTypes.string.isRequired,
  v31: PropTypes.element.isRequired,
  xb11: PropTypes.element.isRequired,
  xb11Text: PropTypes.string.isRequired,
  xb2: PropTypes.element.isRequired,
  main: PropTypes.element.isRequired,
  site: PropTypes.element.isRequired,
  v4: PropTypes.element.isRequired,
  v37: PropTypes.element.isRequired,
  xbc4: PropTypes.element.isRequired,
};

export default memo(Section8OfBusinessNoShopping);
