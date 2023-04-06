import { memo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import SlideShow from "./SlideShow";

function Section7OfBusinessNoShopping({
  refOfSampleSites,
  ibt,
  v22,
  xb14,
  v4,
  nameOfCity,
  xbc3,
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
              نمونه سایت‌های {ibt} موفق در {nameOfCity} را ببینید
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
              نمونه سایت‌های {ibt} موفق را ببینید
            </h2>
          )}
          <p
            style={{
              fontSize: 15,
              paddingTop: 24,
              lineHeight: "24px",
              textAlign: "center",
              width: "100%",
            }}
          >
            یکی از مشکلاتی که صاحبان مشاغل و مخصوصا برندهای {ibt} با آن درگیر
            هستند این است که برای تأسیس شعبه آنلاین کسب‌وکار خود نیاز به
            ایده‌های کاربردی دارند. در ویترین می‌توانید با بررسی چند{" "}
            {xbc3 || xb14}، علاوه بر آشنایی با امکانات حرفه‌ای ویترین، از تعدادی{" "}
            {v22} موفق حوزه کاری خودتان هم ایده‌های خوبی بگیرید تا در مسیر {v4}{" "}
            برند خود، چند قدم پیش بیفتید.
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
              نمونه سایت‌های {ibt} موفق در {nameOfCity} را ببینید
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
              نمونه سایت‌های {ibt} موفق را ببینید
            </h2>
          )}
          <p
            style={{
              fontSize: 16,
              paddingTop: 36,
              lineHeight: "24px",
              textAlign: "center",
              width: 666,
            }}
          >
            یکی از مشکلاتی که صاحبان مشاغل و مخصوصا برندهای {ibt} با آن درگیر
            هستند این است که برای تأسیس شعبه آنلاین کسب‌وکار خود نیاز به
            ایده‌های کاربردی دارند. در ویترین می‌توانید با بررسی چند{" "}
            {xbc3 || xb14}، علاوه بر آشنایی با امکانات حرفه‌ای ویترین، از تعدادی{" "}
            {v22} موفق حوزه کاری خودتان هم ایده‌های خوبی بگیرید تا در مسیر {v4}{" "}
            برند خود، چند قدم پیش بیفتید.
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

Section7OfBusinessNoShopping.propTypes = {
  refOfSampleSites: PropTypes.object.isRequired,
  ibt: PropTypes.string.isRequired,
  v22: PropTypes.element.isRequired,
  xb14: PropTypes.element.isRequired,
  v4: PropTypes.element.isRequired,
  nameOfCity: PropTypes.string.isRequired,
  xbc3: PropTypes.element.isRequired,
};

export default memo(Section7OfBusinessNoShopping);
