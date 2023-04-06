import { Fragment, memo, useMemo } from "react"
import PropTypes from "prop-types"
import { Collapse } from "react-collapse"
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import {getVitrinPossibilitiesOfCity} from "./constant"
import Image from "next/image";

function Section3OfCity({refOfPossibilitiesMobile, openCollapse, onToggleCollapse, xc5, site, cn, shop2}) {
  const vitrinPossibilities = useMemo(() => getVitrinPossibilitiesOfCity({site, cn, shop2}), [site, cn, shop2]);

  return <Fragment>
    {/* Features (Mobile) */}
    <div
      ref={refOfPossibilitiesMobile}
      className="d-block d-md-none"
      style={{
        padding: "32px 0",
        textAlign: "center",
        backgroundColor: "#F2F7FE",
      }}
    >
      <div className="container">
        <h2 style={{ fontSize: 16, fontWeight: 500 }}>
        امکانات ویترین را برای {xc5} بشناسید
        </h2>
        <p
          className="mt-md-4 mt-2"
          style={{ fontSize: 16, fontWeight: 400 }}
        >
          چگونه ویترین به شما کمک می کند؟
        </p>
        <div className="d-flex flex-md-row flex-column justify-content-between ">
          {vitrinPossibilities.map((possibility) => (
            <div
              key={possibility.id}
              className="flex-1 position-relative d-flex flex-column justify-content-between"
              style={{
                backgroundColor: "#fff",
                borderRadius: 8,
                margin: possibility?.id == 2 ? "70px 0 24px" : 0,
                padding: "80px 40px 40px",
                marginTop: 60,
              }}
            >
              <div
                className=" d-flex align-items-center justify-content-between "
                style={{
                  position: "absolute",
                  top: -60,
                  right: 0,
                  left: 0,
                  padding: "0 25px",
                }}
              >
                <span
                  style={{
                    fontSize: 50,
                    color: "#0050FF",
                    fontWeight: 700,
                    lineHeight: "16px",
                  }}
                >
                  {englishNumberToPersianNumber(possibility?.id)}
                </span>
                <h3
                  style={{
                    fontSize: 16,
                    color: "#0050FF",
                    fontWeight: 700,
                    lineHeight: "16px",
                    whiteSpace: "nowrap",
                    display: "inline-block"
                  }}
                >
                  {possibility.title}
                </h3>
                <Image
                alt=""
                  unoptimized
                  height={120}
                  width={80}
                  src={possibility.image}
                  priority
                />
              </div>
              <div>
                {possibility.items.map((item, index) =>
                  index > 3 ? (
                    <Collapse key={item.id} isOpened={openCollapse}>
                      <div
                        className="p-4 radius-8 mt-4"
                        style={{
                          border: "1px solid #E4E6E7",
                          fontSize: 16,
                          color: "#000000",
                          fontWeight: 500,
                          textAlign: "right",
                        }}
                      >
                        {item}
                      </div>
                    </Collapse>
                  ) : (
                    <div
                    key={item.id}
                      className="p-4 radius-8 mt-4"
                      style={{
                        border: "1px solid #E4E6E7",
                        fontSize: 16,
                        color: "#000000",
                        fontWeight: 500,
                        textAlign: "right",
                      }}
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
              {!openCollapse && (
                <button
                  className="w-100 mt-4 d-flex align-items-center justify-content-end"
                  onClick={onToggleCollapse}
                >
                  <span
                    className="ml-4"
                    style={{ fontSize: 16, color: "#0050FF" }}
                  >
                    مشاهده سایر امکانات
                  </span>
                  <div
                    style={{
                      transform: "rotate(0deg)",
                      transition: "transform 0.5s",
                      width: 12,
                      height: 12,
                    }}
                  >
                    <Image
                    alt=""
                      unoptimized
                      priority
                      layout="fill"
                      src="/images/arrow-bottom-icon-blue.svg"
                    />
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>
        {openCollapse && (
          <button
            className="w-100 mt-4 d-flex align-items-center justify-content-end justify-content-md-center"
            onClick={onToggleCollapse}
          >
            <span className="ml-4" style={{ fontSize: 16, color: "#0050FF" }}>
              نمایش امکانات کمتر
            </span>
            <div
              style={{
                transform: "rotate(180deg)",
                transition: "0.5s all",
                width: 12,
                height: 12,
              }}
            >
              <Image
              alt=""
                unoptimized
                layout="fill"
                src="/images/arrow-bottom-icon-blue.svg"
                priority
              />
            </div>
          </button>
        )}
      </div>
    </div>
    {/* Features (Desktop)  */}
    <div
      ref={refOfPossibilitiesMobile}
      className="d-none d-md-block"
      style={{
        padding: "32px 0px 52px",
        textAlign: "center",
        backgroundColor: "#F2F7FE",
      }}
    >
      <div className="container">
        <h2 style={{ fontSize: 32, fontWeight: 500 }}>
        امکانات ویترین را برای {xc5} بشناسید
        </h2>
        <h2
          className="mt-md-4 mt-2"
          style={{ fontSize: 24, fontWeight: 400 }}
        >
          چگونه ویترین به شما کمک می کند؟
        </h2>
        <div className="d-flex flex-md-row flex-column justify-content-between ">
          {vitrinPossibilities.map((possibility) => (
            <div
              key={possibility.id}
              className="flex-1 position-relative d-flex flex-column justify-content-between"
              style={{
                backgroundColor: "#fff",
                borderRadius: 8,
                margin: possibility?.id == 2 ? "0 43px" : 0,
                padding: "80px 40px 40px",
                marginTop: 60,
              }}
            >
              <div
                className=" d-flex align-items-center justify-content-between "
                style={{
                  position: "absolute",
                  top: -60,
                  right: 0,
                  left: 0,
                  padding: "0 20px",
                }}
              >
                <span
                  style={{
                    fontSize: 50,
                    color: "#0050FF",
                    fontWeight: 700,
                    lineHeight: "16px",
                  }}
                >
                  {englishNumberToPersianNumber(possibility?.id)}
                </span>
                <h2
                  style={{
                    fontSize: 18,
                    color: "#0050FF",
                    fontWeight: 700,
                    lineHeight: "16px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {possibility.title}
                </h2>
                <Image
                alt=""
                  unoptimized
                  height={120}
                  width={80}
                  src={possibility.image}
                  priority
                />
              </div>
              <div>
                {possibility.items.map((item, index) =>
                  index > 3 ? (
                    <Collapse key={index} isOpened={openCollapse}>
                      <div
                        className="p-4 radius-8 mt-4"
                        style={{
                          border: "1px solid #E4E6E7",
                          fontSize: 16,
                          color: "#000000",
                          fontWeight: 500,
                          textAlign: "right",
                        }}
                      >
                        {item}
                      </div>
                    </Collapse>
                  ) : (
                    <div
                      key={index}
                      className="p-4 radius-8 mt-4"
                      style={{
                        border: "1px solid #E4E6E7",
                        fontSize: 16,
                        color: "#000000",
                        fontWeight: 500,
                        textAlign: "right",
                      }}
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
              {!openCollapse && (
                <button
                  className="w-100 mt-4 d-flex align-items-center justify-content-end"
                  onClick={onToggleCollapse}
                >
                  <span
                    className="ml-4"
                    style={{ fontSize: 16, color: "#0050FF" }}
                  >
                    مشاهده سایر امکانات
                  </span>
                  <div
                    style={{
                      transform: "rotate(0deg)",
                      transition: "0.5s all",
                      width: 12,
                      height: 12,
                    }}
                  >
                    <Image
                    alt=""
                      unoptimized
                      priority
                      layout="fill"
                      src="/images/arrow-bottom-icon-blue.svg"
                    />
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>
        {openCollapse && (
          <button
            className="w-100 mt-4 d-flex align-items-center justify-content-end justify-content-md-center"
            onClick={onToggleCollapse}
          >
            <span className="ml-4" style={{ fontSize: 16, color: "#0050FF" }}>
              نمایش امکانات کمتر
            </span>
            <div
              style={{
                transform: "rotate(180deg)",
                transition: "0.5s all",
                width: 12,
                height: 12,
              }}
            >
              <Image
              alt=""
                unoptimized
                layout="fill"
                src="/images/arrow-bottom-icon-blue.svg"
                priority
              />
            </div>
          </button>
        )}
      </div>
    </div>
  </Fragment>
}

Section3OfCity.propTypes = {
  refOfPossibilitiesMobile: PropTypes.object.isRequired,
  openCollapse: PropTypes.bool.isRequired,
  onToggleCollapse: PropTypes.func.isRequired,
  xc5: PropTypes.element.isRequired,
  site: PropTypes.element.isRequired,
  cn: PropTypes.string.isRequired,
  shop2: PropTypes.element.isRequired
}

export default memo(Section3OfCity)