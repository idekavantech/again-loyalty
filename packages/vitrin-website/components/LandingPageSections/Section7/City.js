import { memo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import SlideShow from "./SlideShow";

function Section7OfCity({
  refOfSampleSites,
  cn,
  v22,
  v4,
  v23,
  xc9,
  v18,
  xc10,
  shop2,
  v25,
  v7,
  xc11,
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
          <h2
            className=" font-weight-600"
            style={{
              fontSize: 20,
              fontWeight: 500,
              textAlign: "center",
              lineHeight: "28px",
            }}
          >
            از چند فروشگاه اینترنتی و نمونه سایت در {cn} ایده بگیرید
          </h2>
          <p
            style={{
              fontSize: 15,
              paddingTop: 24,
              lineHeight: "24px",
              textAlign: "center",
              width: "100%",
            }}
          >
            دیدن تعدادی {v22} مختلف به شما کمک می‌کند برای {v4} خودتان از {v23}{" "}
            دیگران ایده بگیرید. در ادامه می‌توانید چند {xc9} که توسط {v18}{" "}
            ویترین طراحی شده‌اند را ببینید. این موارد شامل انواع {xc10} می‌شوند
            که قابلیت {shop2} را در اختیار مشتری قرار می‌دهند. با بررسی چند{" "}
            {v25} می‌توانید با قابلیت‌های ویترین برای {v7} آشنا شوید و از این
            امکانات جذاب برای {xc11} استفاده کنید.
          </p>
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
          <h2
            className=" font-weight-600"
            style={{
              fontSize: 32,
              fontWeight: 500,
              textAlign: "center",
              lineHeight: "28px",
            }}
          >
            از چند فروشگاه اینترنتی و نمونه سایت در {cn} ایده بگیرید
          </h2>
          <p
            style={{
              fontSize: 16,
              paddingTop: 36,
              lineHeight: "24px",
              textAlign: "center",
              width: 666,
            }}
          >
            دیدن تعدادی {v22} مختلف به شما کمک می‌کند برای {v4} خودتان از {v23}{" "}
            دیگران ایده بگیرید. در ادامه می‌توانید چند {xc9} که توسط {v18}{" "}
            ویترین طراحی شده‌اند را ببینید. این موارد شامل انواع {xc10} می‌شوند
            که قابلیت {shop2} را در اختیار مشتری قرار می‌دهند. با بررسی چند{" "}
            {v25} می‌توانید با قابلیت‌های ویترین برای {v7} آشنا شوید و از این
            امکانات جذاب برای {xc11} استفاده کنید.
          </p>

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

Section7OfCity.propTypes = {
  refOfSampleSites: PropTypes.object.isRequired,
  cn: PropTypes.string.isRequired,
  v22: PropTypes.element.isRequired,
  v4: PropTypes.element.isRequired,
  v23: PropTypes.element.isRequired,
  xc9: PropTypes.element.isRequired,
  v18: PropTypes.element.isRequired,
  xc10: PropTypes.element.isRequired,
  shop2: PropTypes.element.isRequired,
  v25: PropTypes.element.isRequired,
  v7: PropTypes.element.isRequired,
  xc11: PropTypes.element.isRequired,
};

export default memo(Section7OfCity);
