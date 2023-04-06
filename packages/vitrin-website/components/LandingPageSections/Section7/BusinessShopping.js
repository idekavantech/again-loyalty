import { memo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import SlideShow from "./SlideShow";

function Section7OfBusinessShopping({
  refOfSampleSites,
  sbm,
  v22,
  xsb4,
  xsb14,
  v7,
  shop2,
  v23,
  nameOfCity,
  xsbc3,
}) {
  return (
    <div ref={refOfSampleSites}>
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
          {nameOfCity ? (
            <h2
              className=" font-weight-600"
              style={{
                fontSize: 20,
                fontWeight: 500,
                textAlign: "center",
                lineHeight: "28px",
              }}
            >
              از چند نمونه سایت {sbm} در {nameOfCity} ایده بگیرید
            </h2>
          ) : (
            <h2
              className=" font-weight-600"
              style={{
                fontSize: 20,
                fontWeight: 500,
                textAlign: "center",
                lineHeight: "28px",
              }}
            >
              از چند نمونه سایت {sbm} ایده بگیرید
            </h2>
          )}

          {xsbc3 ? (
            <p
              style={{
                fontSize: 15,
                paddingTop: 24,
                lineHeight: "24px",
                textAlign: "center",
                width: "100%",
              }}
            >
              یکی از راه‌هایی که می‌توانید برای شروع {xsb4} پیش بگیرید، دیدن چند{" "}
              {v23} کسب‌وکارهای مشابه خودتان است. از این طریق می‌توانید ایده‌های
              مختلفی که برای {shop2} یک برند {sbm} استفاده می‌شود را بررسی کنید
              و سپس {v7} خودتان را آغاز کنید. در ویترین چندین {xsbc3} وجود دارد
              که با دیدن این نمونه کارها با امکانات ویترین بیشتر آشنا می‌شوید.
            </p>
          ) : (
            <p
              style={{
                fontSize: 15,
                paddingTop: 24,
                lineHeight: "24px",
                textAlign: "center",
                width: "100%",
              }}
            >
              یکی از راه‌هایی که می‌توانید برای شروع {xsb4} پیش بگیرید، دیدن چند{" "}
              {v22} کسب‌وکارهای مشابه خودتان است. از این طریق می‌توانید ایده‌های
              مختلفی که برای {shop2} یک برند {sbm} استفاده می‌شود را بررسی کنید
              و سپس {v7} خودتان را آغاز کنید. در ویترین چندین {xsb14} وجود دارد
              که با دیدن این نمونه کارها با امکانات ویترین بیشتر آشنا می‌شوید.
            </p>
          )}

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
            <Link href="/examples">
              <a className="d-flex">
                <span>دیدن نمونه‌های بیشتر</span>
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
          </p>
        </div>

        <div className="sample-site w-100">
          <SlideShow />
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
          {nameOfCity ? (
            <h2
              className=" font-weight-600"
              style={{
                fontSize: 32,
                fontWeight: 500,
                textAlign: "center",
                lineHeight: "28px",
              }}
            >
              از چند نمونه سایت {sbm} در {nameOfCity} ایده بگیرید
            </h2>
          ) : (
            <h2
              className=" font-weight-600"
              style={{
                fontSize: 32,
                fontWeight: 500,
                textAlign: "center",
                lineHeight: "28px",
              }}
            >
              از چند نمونه سایت {sbm} ایده بگیرید
            </h2>
          )}
          {xsbc3 ? (
            <p
              style={{
                fontSize: 16,
                paddingTop: 36,
                lineHeight: "24px",
                textAlign: "center",
                width: 666,
              }}
            >
              یکی از راه‌هایی که می‌توانید برای شروع {xsb4} پیش بگیرید، دیدن چند{" "}
              {v23} کسب‌وکارهای مشابه خودتان است. از این طریق می‌توانید ایده‌های
              مختلفی که برای {shop2} یک برند {sbm} استفاده می‌شود را بررسی کنید
              و سپس {v7} خودتان را آغاز کنید. در ویترین چندین {xsbc3} وجود دارد
              که با دیدن این نمونه کارها با امکانات ویترین بیشتر آشنا می‌شوید.
            </p>
          ) : (
            <p
              style={{
                fontSize: 16,
                paddingTop: 36,
                lineHeight: "24px",
                textAlign: "center",
                width: 666,
              }}
            >
              یکی از راه‌هایی که می‌توانید برای شروع {xsb4} پیش بگیرید، دیدن چند{" "}
              {v22} کسب‌وکارهای مشابه خودتان است. از این طریق می‌توانید ایده‌های
              مختلفی که برای {shop2} یک برند {sbm} استفاده می‌شود را بررسی کنید
              و سپس {v7} خودتان را آغاز کنید. در ویترین چندین {xsb14} وجود دارد
              که با دیدن این نمونه کارها با امکانات ویترین بیشتر آشنا می‌شوید.
            </p>
          )}

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
            <Link href="/examples">
              <a className="d-flex">
                <span>دیدن نمونه‌های بیشتر</span>
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
          </p>
        </div>

        <div className="sample-site w-100">
          <SlideShow />
        </div>
      </div>
    </div>
  );
}

Section7OfBusinessShopping.propTypes = {
  refOfSampleSites: PropTypes.object.isRequired,
  sbm: PropTypes.string.isRequired,
  v22: PropTypes.element.isRequired,
  xsb4: PropTypes.element.isRequired,
  xsb14: PropTypes.element.isRequired,
  v7: PropTypes.element.isRequired,
  shop2: PropTypes.element.isRequired,
  v23: PropTypes.element.isRequired,
  nameOfCity: PropTypes.string.isRequired,
  xsbc3: PropTypes.element.isRequired,
};

export default memo(Section7OfBusinessShopping);
