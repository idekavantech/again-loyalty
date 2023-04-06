import { memo } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";
import { getSection2ContentOfBusinessNoShopping } from "./constant";

function Section2OfBusinessNoShopping({
  nameOfBusiness,
  xb1,
  xb2,
  xb3,
  v31,
  v4,
  v9,
  ibt,
  main,
  site,
  shop1,
  image,
}) {
  const Content = getSection2ContentOfBusinessNoShopping({
    name: nameOfBusiness,
    xb1,
    xb2,
    xb3,
    v31,
    v4,
    v9,
    ibt,
    main,
    site,
    shop1,
  });

  return (
    <section style={{ backgroundColor: "#F6F6F7" }}>
      <div className="container">
        <div
          className={`feature-of-sample-sites w-100 d-flex flex-column flex-md-row justify-space-between align-items-center`}
        >
          <div className="col-12 col-md-6 pl-md-4">
            <p style={{ fontWeight: 600, fontSize: 16 }}>
              چرا برای برند خود باید به دنبال ساخت سایت {ibt} باشید؟
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
                alt={`یک برند که برای طراحی سایت ${ibt} خود از خدمات شرکت ویترین استفاده کرده است.`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Section2OfBusinessNoShopping.propTypes = {
  nameOfBusiness: PropTypes.string.isRequired,
  xb1: PropTypes.element.isRequired,
  xb2: PropTypes.element.isRequired,
  xb3: PropTypes.element.isRequired,
  v31: PropTypes.element.isRequired,
  v4: PropTypes.element.isRequired,
  v9: PropTypes.element.isRequired,
  ibt: PropTypes.string.isRequired,
  main: PropTypes.element.isRequired,
  site: PropTypes.element.isRequired,
  shop1: PropTypes.element.isRequired,
};

export default memo(Section2OfBusinessNoShopping);
