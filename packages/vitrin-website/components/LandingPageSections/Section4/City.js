import { memo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import LazyHydrate from "react-lazy-hydration";

function Section4OfCity({cn, v3, v10, v14, v17, xc1, xc3, type, site}) {
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
          ابتدا یک قالب سایت در {cn} انتخاب کنید
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
          برای اینکه {xc1} برای شما راحت‌تر و سریع‌تر باشد، بهتر است کار خود را با انتخاب یک {v10} که {type} باشد شروع کنید. ویترین چندین {v14} جدید و واکنش‌گرا دارد که به کمک آن‌ها می‌توانید {site} خودتان را در {cn} جذاب کنید. همچنین در {v17} ویترین، هر {xc3} کاملا قابل شخصی‌سازی است و برای {v3} دست شما باز است تا تمام اجزای site و قالب آن را مطابق با سلیقه و برند کسب‌وکارتان در {cn} ویرایش کنید.
        </p>
        <Image
          unoptimized
          priority
          height={232}
          width={342}
          className="mt-4"
          src="/images/Main-Temp.jpg"
          alt={`چند قالب سایت در ${cn} که در سایت ساز ویترین قابل انتخاب و شخصی‌سازی است.`}
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
          ابتدا یک قالب سایت در {cn} انتخاب کنید
        </h2>
        <p
          className={`pt-3 pt-md-4 mb-5`}
          style={{
            fontSize: 16,
            lineHeight: "24px",
            width: 573,
            textAlign: "center",
          }}
        >
          برای اینکه {xc1} برای شما راحت‌تر و سریع‌تر باشد، بهتر است کار خود را با انتخاب یک {v10} که {type} باشد شروع کنید. ویترین چندین {v14} جدید و واکنش‌گرا دارد که به کمک آن‌ها می‌توانید {site} خودتان را در {cn} جذاب کنید. همچنین در {v17} ویترین، هر {xc3} کاملا قابل شخصی‌سازی است و برای {v3} دست شما باز است تا تمام اجزای site و قالب آن را مطابق با سلیقه و برند کسب‌وکارتان در {cn} ویرایش کنید.
        </p>
        <Image
          unoptimized
          priority
          height={438}
          width={600}
          className="mt-4"
          src="/images/Main-Temp.jpg"
          alt={`چند قالب سایت در ${cn} که در سایت ساز ویترین قابل انتخاب و شخصی‌سازی است.`}
        />
      </div>
    </div>
  </LazyHydrate>
}

Section4OfCity.propTypes = {
  cn: PropTypes.string.isRequired, 
  v3: PropTypes.element.isRequired, 
  v10: PropTypes.element.isRequired, 
  v14: PropTypes.element.isRequired, 
  v17: PropTypes.element.isRequired, 
  xc1: PropTypes.element.isRequired, 
  xc3: PropTypes.element.isRequired, 
  type: PropTypes.element.isRequired, 
  site: PropTypes.element.isRequired
}

export default memo(Section4OfCity)