import Image from "next/image";
import { Fragment, memo } from "react";

function Section5() {
  return <Fragment>
    {/* I.O.M (Mobile) */}
    <div className="d-flex d-md-none flex-md-column flex-column-reverse">
      <div
        className="d-flex "
        style={{
          backgroundColor: "#0050FF",
          padding: "24px 0",
        }}
      >
        <div
          className="d-flex justify-content-end"
          style={{
            width: "33.5%",
            padding: "0 24px",
          }}
        >
          <Image
            unoptimized
            priority
            width={64}
            height={64}
            src="/images/display.svg"
            alt="برای اولین بار با تکنولوژی I.O.M"
          />
        </div>
        <div
          className="container d-flex flex-column justify-content-center font-weight-600"
          style={{
            width: "66.5%",
            paddingRight: 24,
            textAlign: "right",
            color: "#fff",
            borderRight: "1px solid #E4E6E7",
            fontSize: 15,
          }}
        >
          <p>برای اولین بار با تکنولوژی I.O.M</p>
          <p className="pt-4">تا ۲۰۰٪‌ فروش بیشتر </p>
        </div>
      </div>
    </div>
    {/* I.O.M (Desktop) */}
    <div className="d-none d-md-flex flex-md-column flex-column-reverse">
      <div
        className="d-flex "
        style={{
          backgroundColor: "#0050FF",
          padding: 32,
        }}
      >
        <div
          className="d-flex justify-content-end"
          style={{
            width: "48%",
            padding: "0 33px",
          }}
        >
          <Image
            unoptimized
            priority
            width={64}
            height={64}
            src="/images/display.svg"
            alt="برای اولین بار با تکنولوژی I.O.M"
          />
        </div>
        <div
          className="container d-flex flex-column justify-content-center font-weight-600"
          style={{
            width: "49%",
            paddingRight: 33,
            textAlign: "right",
            color: "#fff",
            borderRight: "1px solid #E4E6E7",
            fontSize: 20,
          }}
        >
          <p>برای اولین بار با تکنولوژی I.O.M</p>
          <p className="pt-4">تا ۲۰۰٪‌ فروش بیشتر </p>
        </div>
      </div>
    </div>
  </Fragment>
}

export default memo(Section5)