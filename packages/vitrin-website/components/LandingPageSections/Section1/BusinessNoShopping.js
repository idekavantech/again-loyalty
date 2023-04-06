import { Fragment, memo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import { CUSTOMERS } from "./constant";
import { NumberOfBrands } from "utils/constants";

function Section1OfBusinessNoShopping({
  refToExamples,
  refToPossibilities,
  formattedGmv,
  ibt,
  image,
  cn,
}) {
  return (
    <Fragment>
      {/* (Mobile) */}
      <div
        className="d-flex d-md-none flex-column align-items-center"
        style={{ backgroundColor: "#fff" }}
      >
        <h1
          className="text-center"
          style={{
            fontSize: 24,
            fontWeight: 600,
            paddingTop: 40,
          }}
        >
          {cn ? `طراحی سایت ${ibt} در ${cn}` : `طراحی سایت ${ibt}`}
        </h1>
        <h2
          className="text-center"
          style={{
            fontSize: 16,
            fontWeight: 600,
            paddingTop: 36,
          }}
        >
          ساخت سایت {ibt} با ویترین
        </h2>
        <h2
          className="text-center"
          style={{
            fontSize: 16,
            fontWeight: 600,
            paddingTop: 36,
          }}
        >
          مورد اعتماد بیش از {NumberOfBrands} کسب‌وکار و برند بوده‌ایم
        </h2>
        <div
          style={{ width: "100%", overflowX: "hidden" }}
          onClick={() => refToExamples.current.scrollIntoView()}
        >
          <div className="d-flex slide-logos-two mt-4">
            {CUSTOMERS.map((item) => (
              <div
                className=" position-relative d-flex m-2 p-1"
                key={item}
                style={{
                  borderRadius: 16,
                }}
              >
                <Image
                  unoptimized
                  priority
                  width={60}
                  height={60}
                  src={item}
                  layout="fixed"
                  alt="customer"
                  className="logo-img"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row mt-md-5">
          <p style={{ fontSize: 14, fontWeight: 500 }} className="text-center">
            و به آن‌ها کمک کرده‌ایم تا این لحظه بیش از
          </p>
          <p
            className="text-center mt-4 mt-md-0 ml-md-3"
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#0050FF",
            }}
          >
            {" "}
            <span className="my-1 my-md-2 mx-3">{formattedGmv}</span>
            <span>تومان</span>
          </p>
          <p
            style={{ fontSize: 14, fontWeight: 500 }}
            className="text-center mt-4 mt-md-0"
          >
            از طریق وبسایت‌های خود درآمد ‌کسب کنند
          </p>
        </div>
        <Link passHref href="/cr~templates">
          <button
            style={{
              backgroundColor: "#0050FF",
              color: "#fff",
              height: 60,
              borderRadius: 8,
              minWidth: 296,
              fontSize: 18,
              marginTop: 32,
            }}
          >
            رایگان شروع کنید
          </button>
        </Link>

        <div
          style={{ width: 296 }}
          className="mt-4 d-flex justify-content-between align-items-center"
        >
          <Link passHref href="/cr~templates">
            <button
              style={{
                height: 44,
                color: "#0050FF",
                border: "1px solid #0050FF",
                borderRadius: 8,
                width: 144,
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              مشاهده قالب‌ها
            </button>
          </Link>

          <button
            style={{
              height: 44,
              color: "#0050FF",
              border: "1px solid #0050FF",
              borderRadius: 8,
              width: 144,
              fontSize: 15,
              fontWeight: 500,
            }}
            onClick={() => refToPossibilities.current.scrollIntoView()}
          >
            امکانات و ویژگی‌‌ها
          </button>
        </div>
        <div
          style={{
            width: 300,
            height: 300,
            marginTop: 50,
          }}
        >
          <Image
            unoptimized
            priority
            src={image}
            width="300px"
            height="280px"
            alt={`یک برند ${ibt} که طراحی سایت آن با سایت ساز ویترین انجام شده است.`}
          />
        </div>
      </div>
      {/* (Desktop) */}
      <div
        className="d-none d-md-flex flex-column align-items-center"
        style={{ backgroundColor: "#f2f7fe" }}
      >
        <h1
          className="text-center"
          style={{
            fontSize: 48,
            fontWeight: 600,
            paddingTop: 150,
          }}
        >
          {cn ? `طراحی سایت ${ibt} در ${cn}` : `طراحی سایت ${ibt}`}
        </h1>
        <h2
          className="text-center"
          style={{
            fontSize: 16,
            fontWeight: 600,
            paddingTop: 36,
          }}
        >
          ساخت سایت {ibt} با ویترین
        </h2>
        <h2
          className="text-center"
          style={{
            fontSize: 28,
            fontWeight: 600,
            paddingTop: 36,
          }}
        >
          مورد اعتماد بیش از {NumberOfBrands} کسب‌وکار و برند بوده‌ایم
        </h2>
        <div
          style={{ width: 700, overflowX: "hidden" }}
          onClick={() => refToExamples.current.scrollIntoView()}
        >
          <div className="d-flex slide-logos-two mt-4">
            {CUSTOMERS.map((item) => (
              <div
                className=" position-relative d-flex m-2 p-1"
                key={item}
                style={{
                  borderRadius: 16,
                }}
              >
                <Image
                  unoptimized
                  priority
                  width={60}
                  height={60}
                  src={item}
                  layout="fixed"
                  alt="customer"
                  className="logo-img"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row mt-md-5">
          <p style={{ fontSize: 20, fontWeight: 500 }} className="text-center">
            و به آن‌ها کمک کرده‌ایم تا این لحظه بیش از
          </p>

          <p
            className="text-center mt-4 mt-md-0 ml-md-3"
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#0050FF",
            }}
          >
            {" "}
            <span className="my-1 my-md-2 mx-3">{formattedGmv}</span>
            <span>تومان</span>
          </p>
          <p
            style={{ fontSize: 20, fontWeight: 500 }}
            className="text-center mt-4 mt-md-0"
          >
            از طریق وبسایت‌های خود درآمد ‌کسب کنند
          </p>
        </div>
        <Link passHref href="/cr~templates">
          <button
            style={{
              backgroundColor: "#0050FF",
              color: "#fff",
              height: 60,
              borderRadius: 8,
              minWidth: 296,
              fontSize: 18,
              marginTop: 40,
            }}
          >
            رایگان شروع کنید
          </button>
        </Link>

        <div
          style={{ width: 296 }}
          className="mt-4 d-flex justify-content-between align-items-center"
        >
          <Link passHref href="/cr~templates">
            <button
              style={{
                height: 44,
                color: "#0050FF",
                border: "1px solid #0050FF",
                borderRadius: 8,
                width: 144,
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              مشاهده قالب‌ها
            </button>
          </Link>

          <button
            style={{
              height: 44,
              color: "#0050FF",
              border: "1px solid #0050FF",
              borderRadius: 8,
              width: 144,
              fontSize: 15,
              fontWeight: 500,
            }}
            onClick={() => refToPossibilities.current.scrollIntoView()}
          >
            امکانات و ویژگی‌‌ها
          </button>
        </div>
        <div
          style={{
            width: 700,
            height: "auto",
            marginTop: 20,
          }}
        >
          <Image
            unoptimized
            src={image}
            width="691px"
            height="389px"
            alt={`یک برند ${ibt} که طراحی سایت آن با سایت ساز ویترین انجام شده است.`}
            priority
          />
        </div>
      </div>
    </Fragment>
  );
}

Section1OfBusinessNoShopping.propTypes = {
  refToExamples: PropTypes.object.isRequired,
  refToPossibilities: PropTypes.object.isRequired,
  formattedGmv: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  ibt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default memo(Section1OfBusinessNoShopping);
