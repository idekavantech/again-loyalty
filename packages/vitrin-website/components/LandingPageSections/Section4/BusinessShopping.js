import { memo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import LazyHydrate from "react-lazy-hydration";

function Section4OfBusinessShopping({ sbm, v35, v4, v14, v11Text, xsb5, xsb7, xsbc2, type }) {
  return <LazyHydrate whenVisible>
    <div style={{ backgroundColor: "#F6F6F7" }}>
      {/* (Mobile) */}
      <div
        className="container d-flex d-md-none flex-column justify-content-center align-items-center"
        style={{
          paddingTop: 32,
          paddingBottom: 32,
        }}
      >
        <h2
          style={{
            color: "#202223",
            fontWeight: 600,
            fontSize: 20,
            lineHeight: "28px",
          }}
        >
          با یک قالب سایت {sbm} حرفه‌ای شروع کنید
        </h2>
        <p
          className={`pt-3 pt-md-4 mb-0`}
          style={{
            fontSize: 15,
            lineHeight: "24px",
            width: "100%",
            textAlign: "center",
          }}
        >
          در {v35} می‌توانید از میان چندین قالب زیبا که {type} هستند، کار {v4} خود را آغاز کنید. فقط کافیست یک قالب مناسب برای {xsb5} خود انتخاب کنید تا از تمام ویژگی‌های قالب‌های واکنش‌گرای ویترین بهره‌مند شوید. برای اینکه {v4} برند {sbm} شما به شکلی حرفه‌ای انجام شود، لازم است روی انتخاب {xsbc2} خود دقت داشته باشید تا بتوانید بعد از ساخت سایت، {v14} خود را متناسب با کسب‌وکار خود شخصی‌سازی کنید.

        </p>
        <Image
          unoptimized
          priority
          height={232}
          width={342}
          className="mt-4"
          src="/images/Main-Temp.jpg"
          alt={`چند ${v11Text} مختص ${sbm} که در سایت ساز ویترین قابل انتخاب و شخصی‌سازی است.`}
        />
      </div>
      {/* (Desktop) */}
      <div
        className="container d-none d-md-flex flex-column justify-content-center align-items-center"
        style={{
          paddingTop: 48,
          paddingBottom: 60,
        }}
      >
        <h2
          style={{
            color: "#202223",
            fontWeight: 600,
            fontSize: 32,
            lineHeight: "28px",
          }}
        >
          با یک قالب سایت {sbm} حرفه‌ای شروع کنید
        </h2>
        {xsbc2 ? <p className={`pt-3 pt-md-4 mb-5`}
          style={{
            fontSize: 16,
            lineHeight: "24px",
            width: 573,
            textAlign: "center",
          }}>
          در {v35} می‌توانید از میان چندین قالب زیبا که {type} هستند، کار {v4} خود را آغاز کنید. فقط کافیست یک قالب مناسب برای {xsb5} خود انتخاب کنید تا از تمام ویژگی‌های قالب‌های واکنش‌گرای ویترین بهره‌مند شوید. برای اینکه {v4} برند {sbm} شما به شکلی حرفه‌ای انجام شود، لازم است روی انتخاب {xsbc2} خود دقت داشته باشید تا بتوانید بعد از ساخت سایت، {v14} خود را متناسب با کسب‌وکار خود شخصی‌سازی کنید.
        </p> : <p
          className={`pt-3 pt-md-4 mb-5`}
          style={{
            fontSize: 16,
            lineHeight: "24px",
            width: 573,
            textAlign: "center",
          }}
        >
          در {v35} می‌توانید از میان چندین قالب زیبا که {type} هستند، کار {v4} خود را آغاز کنید. فقط کافیست یک قالب مناسب برای {xsb5} خود انتخاب کنید تا از تمام ویژگی‌های قالب‌های واکنش‌گرای ویترین بهره‌مند شوید. برای اینکه {v4} برند {sbm} شما به شکلی حرفه‌ای انجام شود، لازم است روی انتخاب {xsb7} خود دقت داشته باشید تا بتوانید بعد از ساخت سایت، {v14} خود را متناسب با کسب‌وکار خود شخصی‌سازی کنید.
        </p>}

        <Image
          unoptimized
          priority
          height={438}
          width={600}
          className="mt-4"
          src="/images/Main-Temp.jpg"
          alt={`چند ${v11Text} مختص ${sbm} که در سایت ساز ویترین قابل انتخاب و شخصی‌سازی است.`}
        />
      </div>
    </div>
  </LazyHydrate>
}

Section4OfBusinessShopping.propTypes = {
  sbm: PropTypes.string.isRequired,
  v35: PropTypes.element.isRequired,
  v4: PropTypes.element.isRequired,
  v14: PropTypes.element.isRequired,
  v11Text: PropTypes.string.isRequired,
  xsb5: PropTypes.element.isRequired,
  xsb7: PropTypes.element.isRequired,
  xsbc2: PropTypes.element.isRequired,
  type: PropTypes.element.isRequired,
}

export default memo(Section4OfBusinessShopping)