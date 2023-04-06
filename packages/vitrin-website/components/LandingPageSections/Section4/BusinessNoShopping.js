import { memo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import LazyHydrate from "react-lazy-hydration";

function Section4OfBusinessNoShopping({ibt, v10, xb7, v4, xb2, xbc2}) {
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
          چند قالب سایت {ibt} جذاب را بررسی کنید
        </h2>
        {xbc2 ?  <p
          className={`pt-3 pt-md-4 mb-0`}
          style={{
            fontSize: 15,
            lineHeight: "24px",
            width: "100%",
            textAlign: "center",
          }}
        >
          برای ‌‌کسب‌وکارهایی که به برندینگ خود اهمیت می‌دهند، استفاده از یک {v10} حرفه‌ای و زیبا یکی از اولین و مهم‌ترین الزامات {v4}  است. در ویترین می‌توانید میان تعداد زیادی {xbc2} مقایسه کنید و قالبی که را پسندیدید انتخاب کنید. سپس در ادامه به کمک همان قالب، یک {xb2} چشم‌نواز بسازید و اولین قدم برای حضور برند کسب‌وکار خودتان در فضای اینترنت را استوار بردارید.
        </p> :  <p
          className={`pt-3 pt-md-4 mb-0`}
          style={{
            fontSize: 15,
            lineHeight: "24px",
            width: "100%",
            textAlign: "center",
          }}
        >
          برای ‌‌کسب‌وکارهایی که به برندینگ خود اهمیت می‌دهند، استفاده از یک {v10} حرفه‌ای و زیبا یکی از اولین و مهم‌ترین الزامات {v4}  است. در ویترین می‌توانید میان تعداد زیادی {xb7} مقایسه کنید و قالبی که را پسندیدید انتخاب کنید. سپس در ادامه به کمک همان قالب، یک {xb2} چشم‌نواز بسازید و اولین قدم برای حضور برند کسب‌وکار خودتان در فضای اینترنت را استوار بردارید.
        </p>}
       
        <Image
          unoptimized
          priority
          height={232}
          width={342}
          className="mt-4"
          src="/images/Main-Temp.jpg"
          alt={`تعدادی قالب سایت ${ibt} که برای برندهای مختلف در سایت ساز ویترین ارائه می‌شود.`}
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
          چند قالب سایت {ibt} جذاب را بررسی کنید
        </h2>
        {xbc2 ? <p
          className={`pt-3 pt-md-4 mb-5`}
          style={{
            fontSize: 16,
            lineHeight: "24px",
            width: 573,
            textAlign: "center",
          }}
        >
         برای ‌‌کسب‌وکارهایی که به برندینگ خود اهمیت می‌دهند، استفاده از یک {v10} حرفه‌ای و زیبا یکی از اولین و مهم‌ترین الزامات {v4}  است. در ویترین می‌توانید میان تعداد زیادی {xbc2} مقایسه کنید و قالبی که را پسندیدید انتخاب کنید. سپس در ادامه به کمک همان قالب، یک {xb2} چشم‌نواز بسازید و اولین قدم برای حضور برند کسب‌وکار خودتان در فضای اینترنت را استوار بردارید.
        </p> : <p
          className={`pt-3 pt-md-4 mb-5`}
          style={{
            fontSize: 16,
            lineHeight: "24px",
            width: 573,
            textAlign: "center",
          }}
        >
         برای ‌‌کسب‌وکارهایی که به برندینگ خود اهمیت می‌دهند، استفاده از یک {v10} حرفه‌ای و زیبا یکی از اولین و مهم‌ترین الزامات {v4}  است. در ویترین می‌توانید میان تعداد زیادی {xb7} مقایسه کنید و قالبی که را پسندیدید انتخاب کنید. سپس در ادامه به کمک همان قالب، یک {xb2} چشم‌نواز بسازید و اولین قدم برای حضور برند کسب‌وکار خودتان در فضای اینترنت را استوار بردارید.
        </p>}
        
        <Image
          unoptimized
          priority
          height={438}
          width={600}
          className="mt-4"
          src="/images/Main-Temp.jpg"
          alt={`تعدادی قالب سایت ${ibt} که برای برندهای مختلف در سایت ساز ویترین ارائه می‌شود.`}
        />
      </div>
    </div>
  </LazyHydrate>
}

Section4OfBusinessNoShopping.propTypes = {
  ibt:PropTypes.string.isRequired,
  v10:PropTypes.element.isRequired,
  xb7:PropTypes.element.isRequired,
  v4:PropTypes.element.isRequired,
  xb2:PropTypes.element.isRequired,
  xbc2: PropTypes.element.isRequired
}

export default memo(Section4OfBusinessNoShopping)