import { Fragment, memo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

function Section8OfBusinessShopping({
  sbm,
  main,
  shop1,
  xsb11,
  xsb3,
  xsb13,
  v2,
  v30,
  site,
  v9,
  v6,
  v4,
  xsbc4,
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
                برای قیمت طراحی سایت از ویترین مشاوره بگیرید
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
                  alt={`مجموعه ویژگی‌هایی که بر تعرفه طراحی سایت ${sbm} اثر دارند.`}
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
                      ویترین بهترین تعرفه طراحی سایت {sbm} را دارد
                    </h3>
                  </div>
                  {xsbc4 ? (
                    <p
                      className="mt-4 pb-5"
                      style={{ fontSize: 15, textAlign: "right" }}
                    >
                      در گذشته برای {main} یک {site} یا {shop1} هزینه‌های زیادی
                      وجود داشت که شاید برای یک کسب‌وکار {sbm} به‌صرفه نبود. اما
                      امروز با تکنولوژی که ویترین در اختیار برندهای کوچک و متوسط
                      قرار داده است، {xsbc4} بسیار کمتر از قبل شده و برای
                      کسب‌وکارها بسیار توجیه‌پذیر است. قبل از تصمیم‌گیری درباره{" "}
                      {xsb3} بهتر است از هزینه‌هایی که برای {v2} انجام می‌شود
                      آگاهی داشته باشید. تیم ویترین همیشه آماده مشاوره رایگان به
                      کسب‌وکارها برای انتخاب بهترین {xsb13} است.
                    </p>
                  ) : (
                    <p
                      className="mt-4 pb-5"
                      style={{ fontSize: 15, textAlign: "right" }}
                    >
                      در گذشته برای {main} یک {site} یا {shop1} هزینه‌های زیادی
                      وجود داشت که شاید برای یک کسب‌وکار {sbm} به‌صرفه نبود. اما
                      امروز با تکنولوژی که ویترین در اختیار برندهای کوچک و متوسط
                      قرار داده است، {xsb11} بسیار کمتر از قبل شده و برای
                      کسب‌وکارها بسیار توجیه‌پذیر است. قبل از تصمیم‌گیری درباره{" "}
                      {xsb3} بهتر است از هزینه‌هایی که برای {v2} انجام می‌شود
                      آگاهی داشته باشید. تیم ویترین همیشه آماده مشاوره رایگان به
                      کسب‌وکارها برای انتخاب بهترین {xsb13} است.
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
                      ویترین یکی از بهترین شرکت‌های طراحی {site} است
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 15, textAlign: "right" }}
                  >
                    همیشه بهتر است قبل از انتخاب یک {v30} به نمونه کارها و
                    مشتریانی که شرکت مذکور داشته است دقت کنید. همچنین اطلاع از
                    تعرفه‌ها به‌صورت شفاف و گرفتن مشاوره قبل از خرید سایت {sbm}{" "}
                    یکی دیگر از نکات مهم است. معمولا خدمات ساخت {site} برای{" "}
                    {sbm} نیازمند داشتن دانش و تیم فنی برنامه‌نویسی است که ممکن
                    است هر شرکتی از عهده آن برنیاید. ویترین به عنوان یکی از
                    بهترین شرکت‌های طراحی سایت در زمینه {v6} و {v9} می‌تواند
                    بهترین گزینه برای {v4} کسب‌وکار شما باشد.
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
                برای قیمت طراحی سایت از ویترین مشاوره بگیرید
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
                  alt={`مجموعه ویژگی‌هایی که بر تعرفه طراحی سایت ${sbm} اثر دارند.`}
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
                      ویترین بهترین تعرفه طراحی سایت {sbm} را دارد
                    </h3>
                  </div>
                  {xsbc4 ? (
                    <p
                      className="mt-4 pb-5"
                      style={{ fontSize: 16, textAlign: "right" }}
                    >
                      در گذشته برای {main} یک {site} یا {shop1} هزینه‌های زیادی
                      وجود داشت که شاید برای یک کسب‌وکار {sbm} به‌صرفه نبود. اما
                      امروز با تکنولوژی که ویترین در اختیار برندهای کوچک و متوسط
                      قرار داده است، {xsbc4} بسیار کمتر از قبل شده و برای
                      کسب‌وکارها بسیار توجیه‌پذیر است. قبل از تصمیم‌گیری درباره{" "}
                      {xsb3} بهتر است از هزینه‌هایی که برای {v2} انجام می‌شود
                      آگاهی داشته باشید. تیم ویترین همیشه آماده مشاوره رایگان به
                      کسب‌وکارها برای انتخاب بهترین {xsb13} است.
                    </p>
                  ) : (
                    <p
                      className="mt-4 pb-5"
                      style={{ fontSize: 16, textAlign: "right" }}
                    >
                      در گذشته برای {main} یک {site} یا {shop1} هزینه‌های زیادی
                      وجود داشت که شاید برای یک کسب‌وکار {sbm} به‌صرفه نبود. اما
                      امروز با تکنولوژی که ویترین در اختیار برندهای کوچک و متوسط
                      قرار داده است، {xsb11} بسیار کمتر از قبل شده و برای
                      کسب‌وکارها بسیار توجیه‌پذیر است. قبل از تصمیم‌گیری درباره{" "}
                      {xsb3} بهتر است از هزینه‌هایی که برای {v2} انجام می‌شود
                      آگاهی داشته باشید. تیم ویترین همیشه آماده مشاوره رایگان به
                      کسب‌وکارها برای انتخاب بهترین {xsb13} است.
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
                      ویترین یکی از بهترین شرکت‌های طراحی {site} است
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 16, textAlign: "right" }}
                  >
                    همیشه بهتر است قبل از انتخاب یک {v30} به نمونه کارها و
                    مشتریانی که شرکت مذکور داشته است دقت کنید. همچنین اطلاع از
                    تعرفه‌ها به‌صورت شفاف و گرفتن مشاوره قبل از خرید سایت {sbm}{" "}
                    یکی دیگر از نکات مهم است. معمولا خدمات ساخت {site} برای{" "}
                    {sbm} نیازمند داشتن دانش و تیم فنی برنامه‌نویسی است که ممکن
                    است هر شرکتی از عهده آن برنیاید. ویترین به عنوان یکی از
                    بهترین شرکت‌های طراحی سایت در زمینه {v6} و {v9} می‌تواند
                    بهترین گزینه برای {v4} کسب‌وکار شما باشد.
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

Section8OfBusinessShopping.propTypes = {
  sbm: PropTypes.string.isRequired,
  main: PropTypes.element.isRequired,
  shop1: PropTypes.element.isRequired,
  xsb11: PropTypes.element.isRequired,
  xsb3: PropTypes.element.isRequired,
  xsb13: PropTypes.element.isRequired,
  v2: PropTypes.element.isRequired,
  v30: PropTypes.element.isRequired,
  site: PropTypes.element.isRequired,
  v9: PropTypes.element.isRequired,
  v6: PropTypes.element.isRequired,
  v4: PropTypes.element.isRequired,
};

export default memo(Section8OfBusinessShopping);
