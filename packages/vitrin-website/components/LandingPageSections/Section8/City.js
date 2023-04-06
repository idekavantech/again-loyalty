import { Fragment, memo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

function Section8OfCity({
  cn,
  xc12,
  xc15,
  v3,
  v19,
  site,
  v31,
  v5,
  xc13,
  xc8,
  xc14,
  xc7,
  v30,
  v13,
  v23,
  v32,
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
                برای قیمت طراحی سایت در {cn} از ویترین مشاوره بگیرید
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
                  alt={`امکاناتی که روی قیمت طراحی سایت در ${cn} تأثیرگذار هستند.`}
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
                      ویترین به‌صرفه‌ترین {xc15} را ارائه می‌دهد
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 15, textAlign: "right" }}
                  >
                    انتخاب بهترین {xc12} یکی از چالش‌های همیشگی کسب‌وکارها برای
                    سپردن {v3} برند خود به یک طراح سایت معتبر در {cn} است. برای
                    اینکه بخواهید درباره {v19} تصمیم‌گیری کنید، بهتر است از
                    امکاناتی که می‌خواهید در {site} خودتان داشته باشید مطمئن
                    شوید. اگر درباره {xc12} مردد هستید، پیشنهاد می‌شود با {v31}{" "}
                    ویترین تماس بگیرید تا از طریق مشاوره رایگان به سؤالات شما در
                    مورد {v5} و {xc13} پاسخ داده شود.
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
                      ویترین معتبرترین {xc8} است
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 15, textAlign: "right" }}
                  >
                    شرکت‌های زیادی اقدام به ارائه {xc14} می‌کنند که ممکن است از
                    تجربه و تخصص کافی برای {v3} برخوردار نباشند. برای انتخاب{" "}
                    {xc7} لازم است از نحوه کار {v30} مورد نظر اطلاع پیدا کنید.
                    مثلا دقت کنید که از {v13} آماده استفاده می‌کنند یا خیر.
                    همچنین بهتر است {v23} مرتبط با حوزه کسب‌وکار شما داشته
                    باشند. {v31} ویترین با اتکا به نیروی متخصص و جوان خود
                    می‌تواند تمام نیازهای برند شما برای {v32} را پوشش دهد.
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
                برای قیمت طراحی سایت در {cn} از ویترین مشاوره بگیرید
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
                  alt={`امکاناتی که روی قیمت طراحی سایت در ${cn} تأثیرگذار هستند.`}
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
                      ویترین به‌صرفه‌ترین {xc15} را ارائه می‌دهد
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 16, textAlign: "right" }}
                  >
                    انتخاب بهترین {xc12} یکی از چالش‌های همیشگی کسب‌وکارها برای
                    سپردن {v3} برند خود به یک طراح سایت معتبر در {cn} است. برای
                    اینکه بخواهید درباره {v19} تصمیم‌گیری کنید، بهتر است از
                    امکاناتی که می‌خواهید در {site} خودتان داشته باشید مطمئن
                    شوید. اگر درباره {xc12} مردد هستید، پیشنهاد می‌شود با {v31}{" "}
                    ویترین تماس بگیرید تا از طریق مشاوره رایگان به سؤالات شما در
                    مورد {v5} و {xc13} پاسخ داده شود.
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
                      ویترین معتبرترین {xc8} است
                    </h3>
                  </div>
                  <p
                    className="mt-4 pb-5"
                    style={{ fontSize: 16, textAlign: "right" }}
                  >
                    شرکت‌های زیادی اقدام به ارائه {xc14} می‌کنند که ممکن است از
                    تجربه و تخصص کافی برای {v3} برخوردار نباشند. برای انتخاب{" "}
                    {xc7} لازم است از نحوه کار {v30} مورد نظر اطلاع پیدا کنید.
                    مثلا دقت کنید که از {v13} آماده استفاده می‌کنند یا خیر.
                    همچنین بهتر است {v23} مرتبط با حوزه کسب‌وکار شما داشته
                    باشند. {v31} ویترین با اتکا به نیروی متخصص و جوان خود
                    می‌تواند تمام نیازهای برند شما برای {v32} را پوشش دهد.
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

Section8OfCity.propTypes = {
  cn: PropTypes.string.isRequired,
  xc12: PropTypes.element.isRequired,
  xc15: PropTypes.element.isRequired,
  v3: PropTypes.element.isRequired,
  v19: PropTypes.element.isRequired,
  site: PropTypes.element.isRequired,
  v31: PropTypes.element.isRequired,
  v5: PropTypes.element.isRequired,
  xc13: PropTypes.element.isRequired,
  xc8: PropTypes.element.isRequired,
  xc14: PropTypes.element.isRequired,
  xc7: PropTypes.element.isRequired,
  v30: PropTypes.element.isRequired,
  v13: PropTypes.element.isRequired,
  v23: PropTypes.element.isRequired,
  v32: PropTypes.element.isRequired,
};

export default memo(Section8OfCity);
