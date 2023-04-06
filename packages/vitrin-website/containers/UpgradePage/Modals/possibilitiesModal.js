import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { VITRIN_POSSIBILITIES } from "utils/constants/VITRIN_POSSIBILITIES";
import Image from "next/image";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { Collapse } from "react-collapse";
const online_ordering = [
  "/images/jet-icon.svg",
  "/images/pwa-icon.svg",
  "/images/torob-icon.svg",
  "/images/emallz-icon.svg",
];

const PossibilitiesModal = ({ isOpen, onClose }) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      isSelectingPreOrderingTimeDialogBoxOpenescribedby="alert-dialog-description"
      onClose={onClose}
      style={{ zIndex: 10000 }}
      maxWidth="xl"
    >
      <DialogTitle id="scroll-dialog-title ">
        <div className="w-100 d-flex justify-content-between">
          <span className="flex-1 text-right cursor-pointer" onClick={onClose}>
            X
          </span>
          <span className="flex-1 text-center">امکانات</span>
          <span className="flex-1"></span>
        </div>
      </DialogTitle>
      <DialogContent
        style={{
          padding: 0,
          maxWidth: "1400px",
          zIndex: 500,
          backgroundColor: "#F6F6F7",
        }}
      >
        <div
          className="d-block d-md-none"
          style={{
            textAlign: "center",
            backgroundColor: "#F2F7FE",
          }}
        >
          <div className="container p-0">
            <div className="d-flex flex-md-row flex-column justify-content-between ">
              {VITRIN_POSSIBILITIES.map((possibility) => (
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
                    <span
                      style={{
                        fontSize: 16,
                        color: "#0050FF",
                        fontWeight: 700,
                        lineHeight: "16px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {possibility.title}
                    </span>
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
                        <Collapse key={item.id} isOpened={isCollapseOpen}>
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
                  {!isCollapseOpen && (
                    <button
                      className="w-100 mt-4 d-flex align-items-center justify-content-end"
                      onClick={() => setIsCollapseOpen(!isCollapseOpen)}
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
            {isCollapseOpen && (
              <button
                className="w-100 mt-4 d-flex align-items-center justify-content-end justify-content-md-center"
                onClick={() => setIsCollapseOpen(!isCollapseOpen)}
              >
                <span
                  className="ml-4"
                  style={{ fontSize: 16, color: "#0050FF" }}
                >
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
          className="d-none d-md-block"
          style={{
            padding: "16px 0px 52px",
            textAlign: "center",
            backgroundColor: "#F2F7FE",
          }}
        >
          <div className="container px-4">
            <div className="d-flex flex-md-row flex-column justify-content-between ">
              {VITRIN_POSSIBILITIES.map((possibility) => (
                <div
                key={possibility.id}
                  className="flex-1 position-relative d-flex flex-column justify-content-between"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    margin: possibility?.id == 2 ? "0 43px" : 0,
                    padding: "0px 40px",
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
                    <span
                      style={{
                        fontSize: 18,
                        color: "#0050FF",
                        fontWeight: 700,
                        lineHeight: "16px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {possibility.title}
                    </span>
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
                        <Collapse isOpened={isCollapseOpen}>
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
                  {!isCollapseOpen && (
                    <button
                      className="w-100 mt-4 d-flex align-items-center justify-content-end"
                      onClick={() => setIsCollapseOpen(!isCollapseOpen)}
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
            {isCollapseOpen && (
              <button
                className="w-100 mt-4 d-flex align-items-center justify-content-end justify-content-md-center"
                onClick={() => setIsCollapseOpen(!isCollapseOpen)}
              >
                <span
                  className="ml-4"
                  style={{ fontSize: 16, color: "#0050FF" }}
                >
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
        <div className="container">
          {/* mobile */}

          <div
            className="container d-md-none"
            style={{
              padding: "16px 0",
            }}
          >
            <p
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: 500,
                lineHeight: "24px",
                marginBottom: 24,
              }}
            >
              اتصالات ویترین
              <br />
              برای سهولت عملیات و بازاریابی یکپارچه{" "}
            </p>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="d-flex  align-items-center">
                <span
                  className="pl-4 ml-2 d-flex align-items-center"
                  style={{
                    borderLeft: "1px solid #E4E6E7",
                    height: 64,
                    width: 155,
                    fontSize: 15,
                  }}
                >
                  پیک و روش‌های ارسال{" "}
                </span>
                <div className="m-1 my-md-0 mx-md-2">
                  <Image
                    unoptimized
                    priority
                    width={64}
                    height={64}
                    src="/images/miare-icon.svg"
                    alt="میاره"
                  />
                </div>
                <div className="m-1 my-md-0 mx-md-2">
                  <Image
                    unoptimized
                    priority
                    width={64}
                    height={64}
                    src="/images/alopeyk-icon.svg"
                    alt="الوپیک"
                  />
                </div>
              </div>
              <div className=" d-flex my-4 py-4 align-items-center">
                <span
                  className="pl-4  d-flex align-items-center flex-wrap"
                  style={{
                    height: 64,
                    width: 155,
                    fontSize: 15,
                  }}
                >
                  کانال‌های جذب مشتری
                </span>
                <div
                  className="  d-flex pr-2  flex-column"
                  style={{
                    borderRight: "1px solid #E4E6E7",
                    boxSizing: "border-box",
                    marginRight: -1,
                  }}
                >
                  <div className="d-flex  align-items-center">
                    {online_ordering.map(
                      (item, index) =>
                        index < 2 && (
                          <div key={item} className="mx-1 my-md-0 mx-md-2">
                            <Image
                              unoptimized
                              priority
                              width={64}
                              height={64}
                              src={item}
                              alt="سفارش‌گیری آنلاین"
                            />
                          </div>
                        )
                    )}
                  </div>
                  <div className="d-flex  align-items-center">
                    {online_ordering.map(
                      (item, index) =>
                        index > 1 && (
                          <div key={item} className="mx-1 my-md-0 mx-md-2">
                            <Image
                              unoptimized
                              priority
                              width={64}
                              height={64}
                              src={item}
                              alt="سفارش‌گیری آنلاین"
                            />
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>
              <div className=" d-flex  align-items-center">
                <span
                  className="pl-4 ml-2 d-flex align-items-center"
                  style={{
                    borderLeft: "1px solid #E4E6E7",
                    height: 64,
                    width: 155,
                    fontSize: 15,
                  }}
                >
                  درگاه پرداخت
                </span>
                <div className="m-1 my-md-0 mx-md-2">
                  <Image
                    unoptimized
                    priority
                    width={64}
                    height={64}
                    src="/images/zarinpall-icon.svg"
                    alt="زرین پال"
                  />
                </div>

                <div className="m-1 my-md-0 mx-md-2">
                  <Image
                    unoptimized
                    priority
                    width={64}
                    height={64}
                    src="/images/idpay-icon.svg"
                    alt="آیدی پی"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Desktop */}
          <div className="d-none d-md-block">
            <p
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: 500,
                lineHeight: "24px",
                color: "#6D7175",
              }}
            >
              اتصالات ویترین
              <br />
              برای سهولت عملیات و بازاریابی یکپارچه{" "}
            </p>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="d-flex  align-items-center">
                <span
                  className="pl-4 ml-2 d-flex align-items-center"
                  style={{
                    borderLeft: "1px solid #E4E6E7",
                    height: 64,
                    fontSize: 15,
                  }}
                >
                  پیک و روش‌های ارسال{" "}
                </span>
                <div className="m-1 my-md-0 mx-md-2">
                  <Image
                    unoptimized
                    priority
                    width={64}
                    height={64}
                    src="/images/miare-icon.svg"
                    alt="میاره"
                  />
                </div>
                <div className="m-1 my-md-0 mx-md-2">
                  <Image
                    unoptimized
                    priority
                    width={64}
                    height={64}
                    src="/images/alopeyk-icon.svg"
                    alt="الوپیک"
                  />
                </div>
              </div>
              <div className=" d-flex my-4 py-4 align-items-center">
                <span
                  className="pl-4  d-flex align-items-center flex-wrap"
                  style={{
                    height: 64,
                    fontSize: 15,
                  }}
                >
                  کانال‌های جذب مشتری
                </span>
                <div
                  className="d-flex pr-2"
                  style={{
                    borderRight: "1px solid #E4E6E7",
                    boxSizing: "border-box",
                    marginRight: -1,
                  }}
                >
                  <div className="d-flex  align-items-center">
                    {online_ordering.map((item) => (
                      <div key={item} className="m-1 my-md-0 mx-md-2">
                        <Image
                          unoptimized
                          priority
                          width={64}
                          height={64}
                          src={item}
                          alt="سفارش‌گیری آنلاین"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className=" d-flex  align-items-center">
                <span
                  className="pl-4 ml-2 d-flex align-items-center"
                  style={{
                    borderLeft: "1px solid #E4E6E7",
                    height: 64,
                    fontSize: 15,
                  }}
                >
                  درگاه پرداخت
                </span>
                <div className="m-1 my-md-0 mx-md-2">
                  <Image
                    unoptimized
                    priority
                    width={64}
                    height={64}
                    src="/images/zarinpall-icon.svg"
                    alt="زرین پال"
                  />
                </div>

                <div className="m-1 my-md-0 mx-md-2">
                  <Image
                    unoptimized
                    priority
                    width={64}
                    height={64}
                    src="/images/idpay-icon.svg"
                    alt="آیدی پی"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-100 d-flex flex-column mb-5 align-items-center">
            <button
              className="w-100 mt-3"
              style={{
                height: 44,
                color: "#0050FF",
                backgroundColor: "#fff",
                borderRadius: 8,
                border: "1px solid #0050FF",
                width: 252,
              }}
              onClick={onClose}
            >
              بازگشت
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PossibilitiesModal;
