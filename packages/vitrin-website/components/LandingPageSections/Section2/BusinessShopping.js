import { memo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import { getSection2ContentOfBusinessShopping } from "./constant";

function Section2OfBusinessShopping({
  sbm,
  nameOfBusiness,
  xsb1,
  v6,
  v3,
  v4,
  v9,
  v31,
  v33,
  v7,
  site,
  shop1,
  shop2,
  main,
  type,
  image,
}) {
  const Content = getSection2ContentOfBusinessShopping({
    name: nameOfBusiness,
    xsb1,
    v6,
    v3,
    v4,
    v9,
    v31,
    v33,
    v7,
    site,
    shop1,
    shop2,
    main,
    type,
  });

  return (
    <section style={{ backgroundColor: "#F6F6F7" }}>
      <div className="container">
        <div
          className={`feature-of-sample-sites w-100 d-flex flex-column flex-md-row justify-space-between align-items-center`}
        >
          <div className="col-12 col-md-6 pl-md-4">
            <p style={{ fontWeight: 600, fontSize: 16 }}>
              ساخت سایت {sbm} با ویترین چطور به کسب‌وکار شما کمک می‌کند؟
            </p>
            <p className="my-4" style={{ fontSize: 14, lineHeight: "24px" }}>
              <Content />
            </p>

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
                alt={`یک کسب‌وکار ${sbm} که ${v6} خود را به کمک فروشگاه ساز ویترین اجرا کرده است.`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Section2OfBusinessShopping.propTypes = {
  sbm: PropTypes.string.isRequired,
  nameOfBusiness: PropTypes.string.isRequired,
  xsb1: PropTypes.element.isRequired,
  v6: PropTypes.element.isRequired,
  v3: PropTypes.element.isRequired,
  v4: PropTypes.element.isRequired,
  v9: PropTypes.element.isRequired,
  v31: PropTypes.element.isRequired,
  v33: PropTypes.element.isRequired,
  v7: PropTypes.element.isRequired,
  site: PropTypes.element.isRequired,
  shop1: PropTypes.element.isRequired,
  shop2: PropTypes.element.isRequired,
  main: PropTypes.element.isRequired,
  type: PropTypes.element.isRequired,
  image: PropTypes.string.isRequired,
};

export default memo(Section2OfBusinessShopping);
