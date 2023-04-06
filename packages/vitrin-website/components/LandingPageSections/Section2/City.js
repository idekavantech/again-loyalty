import { memo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

function Section2OfCity({
  cn,
  v1,
  v3,
  v5,
  v6Text,
  v8,
  xc1,
  xc2,
  image,
  site,
  xsbc1,
  xbc1,
  shop1,
  v35,
  businessName,
}) {
  return (
    <section style={{ backgroundColor: "#F6F6F7" }}>
      <div className="container">
        <div
          className={`feature-of-sample-sites w-100 d-flex flex-column flex-md-row justify-space-between align-items-center`}
        >
          <div className="col-12 col-md-6 pl-md-4">
            {businessName ? (
              <p style={{ fontWeight: 600, fontSize: 16 }}>
                طراحی و ساخت سایت {businessName} در {cn} را به کمک ویترین اجرا
                کنید
              </p>
            ) : (
              <p style={{ fontWeight: 600, fontSize: 16 }}>
                طراحی و ساخت سایت در {cn} را به کمک ویترین اجرا کنید
              </p>
            )}

            <p className="my-4" style={{ fontSize: 14, lineHeight: "24px" }}>
              هر کسب‌وکاری که در {cn} قرار دارد برای رشد و افزایش فروش خود دیر
              یا زود به {v3} نیاز پیدا می‌کند. مزایای داشتن یک {site} برای
              برندها آن‌قدر زیاد است که شما را برای {xc2} برند خودتان ترغیب کند.
              مهم‌ترین فایدهٔ {xsbc1 || xbc1 || xc1} این است که شرکت و برند شما
              از طریق اینترنت هم مشتری جذب می‌کند. البته از تأثیری که یک {v8}{" "}
              برای معرفی و برندسازی کسب‌وکار شما دارد نیز نمی‌توان غافل بود.
            </p>

            {xsbc1 || xbc1 ? (
              <p className="my-4" style={{ fontSize: 14, lineHeight: "24px" }}>
                اگر می‌خواهید یک {shop1} داشته باشید تا محصولات خود را مستقیما و
                با اطمینان از طریق اینترنت به مشتری خود بفروشید، یا وبسایتی
                می‌خواهید که برند شرکت خودتان را معرفی کنید و درباره خدمات
                ارزشمند آن صحبت کنید، به کمک {v35} می‌توانید {site} خود را
                بسازید. ویترین، ابزار و تکنولوژی ساخت سایت و فروشگاه اینترنتی را
                دراختیار شما می‌گذارد تا به‌صورت آنلاین و از هرجای ایران (مثلا{" "}
                {cn}) بتوانید برند خود را آنلاین کنید.
              </p>
            ) : (
              <p className="my-4" style={{ fontSize: 14, lineHeight: "24px" }}>
                اگر به دنبال {v5} هستید تا بتوانید محصولات خود را مستقیما و با
                اطمینان از طریق اینترنت به مشتری خود بفروشید، یا سایتی می‌خواهید
                که برند شرکت خودتان را معرفی کنید و درباره خدمات ارزشمند آن صحبت
                کنید، به کمک {v1} می‌توانید {site} خود را بسازید. ویترین به شما
                ابزارهای {xc2} را می‌دهد و در ادامه مسیر پشتیبان شما خواهد بود.
              </p>
            )}
            <Link
              href="/cr~templates"
              className="d-flex justify-content-end mt-4"
              style={{ color: "#0050ff" }}
            >
              <span>ساخت سایت</span>
              <Image
                width={24}
                height={24}
                priority
                unoptimized
                src="/images/arrow-left-icon-blue.svg"
                alt="ساخت سایت"
              />
            </Link>
          </div>
          <div className="col-12 col-md-6  pl-md-4">
            <div className="feature-of-sample-sites-image w-100">
              <Image
                layout="fill"
                width={725}
                height={449}
                priority
                unoptimized
                src={image}
                alt={`کسب‌وکارهایی که در ${cn} هستند می‌توانند برای ${v6Text} از فروشگاه ساز ویترین استفاده کنند.`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Section2OfCity.propTypes = {
  cn: PropTypes.element.isRequired,
  v3: PropTypes.element.isRequired,
  xc2: PropTypes.element.isRequired,
  xc1: PropTypes.element.isRequired,
  xsbc1: PropTypes.element.isRequired,
  xbc1: PropTypes.element.isRequired,
  shop1: PropTypes.element.isRequired,
  v35: PropTypes.element.isRequired,
  v8: PropTypes.element.isRequired,
  v5: PropTypes.element.isRequired,
  v6Text: PropTypes.string.isRequired,
  v1: PropTypes.element.isRequired,
  businessName: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  site: PropTypes.string.isRequired,
};

export default memo(Section2OfCity);
