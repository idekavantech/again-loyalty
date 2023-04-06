import { useState } from "react";
import {
  FAQS,
  CUSTOMERS,
  pricing_package_details,
  customers_comments_slider_setting,
  vitrin_possibilities,
  vitrin_features,
  pricing_package,
  ONE_YEAR,
} from "./constant";
import Image from "next/image";
import { Collapse } from "react-collapse";
import Footer from "/components/Footer";
import FreeConsultationModal from "containers/FreeConsultationModal";
import { useRouter } from "next/router";
import LazyImage from "components/LazyImage";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { CUSTOMER_COMMENTS } from "utils/constants/CUSTOMER_COMMENTS";
import Slider from "react-slick";
import LazyHydrate from "react-lazy-hydration";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PossibilitiesModal from "./Modals/possibilitiesModal";
import JourneyHeader from "components/JourneyHeader";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";

const UpgradePage = () => {
  const [selectedTime, setSelectedTime] = useState(ONE_YEAR);
  const [isOpenCollapse, setIsOpenCollapse] = useState(false);
  const [collapses, setCollapses] = useState({});
  const [isOpenTooltip, setIsOpenTooltip] = useState({});
  const [isOpenPossibilitiesModal, setIsOpenPossibilitiesModal] =
    useState(false);
  const [isOpenConsultationModal, setIsOpenConsultationModal] = useState(false);
  const [isOpenQuestionMark, setIsOpenQuestionMark] = useState(false);
  const router = useRouter();

  return (
    <div className="position-relative">
      <JourneyHeader />
      <div className="upgrade-contianer">
        <div>
          <div className="banner">
            <div className="container d-flex flex-column align-items-center">
              <h1 className="title text-center">قیمت طراحی سایت با ویترین</h1>
              <p className="mt-5 text-center text">
                تعرفه طراحی سایت و هزینه ساخت فروشگاه اینترنتی با ویترین
                <br />
                متناسب با نوع سایت و امکاناتی که کسب‌وکار شما
                <br /> برای موفقیت آنلاین نیاز دارد برآورد شده است.
              </p>
              <div className="d-flex align-items-center mt-5 position-relative timing-tabs">
                <div
                  className={`flex-1 d-flex align-items-center justify-content-center cursor-pointer  tab-one ${
                    selectedTime == ONE_YEAR ? "active-tab" : ""
                  }`}
                  onClick={() => setSelectedTime(ONE_YEAR)}
                >
                  <p>یکساله</p>
                  <div className="discount-icon">
                    <div className="bookmark"></div>
                  </div>

                  <span className="discount-title">۲۵٪</span>
                </div>
                <div
                  className={`flex-1 d-flex align-items-center justify-content-center cursor-pointer  tab-two ${
                    selectedTime == "threeMonths" ? "active-tab" : ""
                  }`}
                  onClick={() => setSelectedTime("threeMonths")}
                >
                  <p>سه ماهه</p>
                </div>
              </div>
            </div>
          </div>

          {/* desktop */}
          <div className="d-none w-100 d-md-flex flex-column align-items-center">
            <div
              className="d-flex justify-content-center"
              style={{ width: 860, marginTop: -140 }}
            >
              {pricing_package?.map((pack, index) => (
                <div
                  key={pack.id}
                  style={{
                    borderRadius: 12,
                    backgroundColor: "#FFF",
                    width: 284,
                    boxShadow: "0px 4px 4px rgba(130, 132, 39, 0.1)",
                    color: pack.color,
                  }}
                  className={`p-3 d-flex flex-column align-items-center text-center ${
                    index !== 0 && "mr-4"
                  }`}
                >
                  <Image alt="" width={24} height={24} src={pack.icon} />
                  <p
                    className="mt-2"
                    style={{
                      color: pack.color,
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {pack.subTitle}
                  </p>
                  <p
                    className="my-4"
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: "#202223",
                    }}
                  >
                    {pack.title}
                  </p>
                  <hr
                    className="w-100"
                    style={{
                      backgroundColor: pack.color,
                      border: `0.5px solid ${pack.color}`,
                    }}
                  />
                  <div>
                    {selectedTime == ONE_YEAR ? (
                      <p className="mt-4   d-flex justify-content-center align-items-end">
                        <p
                          style={{
                            color: pack.color,
                            fontSize: 27,
                            fontWeight: 500,
                            marginRight: 40,
                          }}
                        >
                          {englishNumberToPersianNumber(
                            (pack.price - (2.5 * pack.price) / 10).toFixed(0)
                          )}
                        </p>
                        <div
                          className="text-center "
                          style={{
                            position: "relative",
                            color: pack.color,
                            fontSize: 14,
                            fontWeight: 500,
                            width: 40,
                          }}
                        >
                          {englishNumberToPersianNumber(pack.price)}
                          <div
                            style={{
                              width: 30,
                              borderTop: `1px solid ${pack.color}`,
                              position: "absolute",
                              bottom: 0,
                              top: "14%",
                              transform: "rotate(-45deg)",
                            }}
                          ></div>
                        </div>
                      </p>
                    ) : (
                      <p
                        className="mt-4"
                        style={{
                          color: pack.color,
                          fontSize: 27,
                          fontWeight: 500,
                        }}
                      >
                        {englishNumberToPersianNumber(pack.price)}
                      </p>
                    )}
                  </div>

                  <span
                    className="mt-1"
                    style={{
                      color: "#202223",
                      fontSize: 15,
                      fontWeight: 400,
                    }}
                  >
                    هزار تومان در ماه
                  </span>

                  <button
                    className="w-100 mt-3"
                    style={{
                      height: 44,
                      color: "#0050FF",

                      borderRadius: 8,
                      border: "1px solid #0050FF",
                    }}
                    onClick={() => {
                      router.push({
                        pathname: "/pay",
                        query: {
                          ...router.query,
                          amount: pack.price,
                          time: selectedTime,
                          type: pack.type,
                        },
                      });
                    }}
                  >
                    خرید بسته
                  </button>
                  <span
                    className="mt-3"
                    style={{
                      fontSize: 10,
                      lineHeight: "20px",
                      color: "#000000",
                    }}
                  >
                    آموزش کار با پنل
                  </span>
                  <div className="d-flex w-100 mt-1 justify-content-center">
                    <LazyImage width={40} src="/images/image 6.svg" />
                    <LazyImage
                      className="mr-1"
                      width={60}
                      src="/images/image 7.svg"
                    />
                  </div>
                  <p
                    className="mt-4"
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#000000",
                    }}
                  >
                    {pack.featuresTitle}
                  </p>
                  {pack.features.map((feature) => (
                    <p
                      key={feature.id}
                      className="w-100 justify-content-start d-flex align-items-center mt-4"
                    >
                      <Image width={24} height={24} src="/images/check.svg" />
                      <span
                        className="mr-1"
                        style={{
                          fontSize: 11,
                          lineHeight: "20px",
                          color: "#000000",
                        }}
                      >
                        {feature.title}
                      </span>
                      {feature.description ? (
                        <ClickAwayListener
                          onClickAway={() => {
                            if (isOpenQuestionMark[feature.id]) {
                              setIsOpenQuestionMark({
                                [feature.id]: false,
                              });
                            }
                          }}
                        >
                          <Tooltip
                            placement="top"
                            PopperProps={{
                              disablePortal: true,
                            }}
                            disableFocusListener
                            disableHoverListener
                            arrow
                            onClose={() =>
                              setIsOpenQuestionMark({
                                [feature.id]: !isOpenQuestionMark[feature.id],
                              })
                            }
                            title={
                              <p
                                className="my-2"
                                style={{
                                  LineHeight: "20px",
                                  fontSize: 11,
                                  fontWeight: 400,
                                }}
                              >
                                {feature.description}
                              </p>
                            }
                            open={isOpenQuestionMark[feature.id] || false}
                          >
                            <button
                              className="mr-2"
                              style={{ height: 16 }}
                              onClick={() => {
                                setIsOpenQuestionMark({
                                  [feature.id]: true,
                                });
                              }}
                            >
                              <HelpOutlineRoundedIcon
                                style={{ fontSize: 16, color: "gray" }}
                              />
                            </button>
                          </Tooltip>
                        </ClickAwayListener>
                      ) : null}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <p
              className="w-100 my-4 d-flex justify-content-center cursor-pointer"
              style={{ color: "#0050FF", fontSize: 15, fontWeight: 500 }}
              onClick={() => setIsOpenCollapse(!isOpenCollapse)}
            >
              <span className="ml-1">مشاهده جزئیات بسته‌ها</span>
              <div
                style={{
                  transform: isOpenCollapse ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "0.5s all",
                  height: 24,
                }}
              >
                <KeyboardArrowDownIcon />
              </div>
            </p>
          </div>
          {/* mobile */}
          <div
            className="d-md-none  w-100 d-flex flex-column"
            style={{ overflowX: "scroll", marginTop: -40 }}
          >
            <div className="d-flex pl-4" style={{ width: 874 }}>
              {pricing_package?.map((pack, index) => (
                <div
                  key={pack.id}
                  style={{
                    borderRadius: 12,
                    backgroundColor: "#FFF",
                    width: 284,
                    boxShadow: "0px 4px 4px rgba(130, 132, 39, 0.1)",
                  }}
                  className="p-3 text-center mr-4"
                >
                  <div>
                    <Image alt="" width={24} height={24} src={pack.icon} />
                  </div>
                  <p
                    className="mt-2"
                    style={{
                      color: pack.color,
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {pack.subTitle}
                  </p>
                  <p
                    className="my-4"
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      color: "#202223",
                    }}
                  >
                    {pack.title}
                  </p>
                  <hr
                    style={{
                      backgroundColor: pack.color,
                      border: `0.5px solid ${pack.color}`,
                    }}
                  />
                  {selectedTime == ONE_YEAR ? (
                    <div className="mt-4   d-flex justify-content-center align-items-end">
                      <p
                        style={{
                          color: pack.color,
                          fontSize: 27,
                          fontWeight: 500,
                          marginRight: 40,
                        }}
                      >
                        {englishNumberToPersianNumber(
                          (pack.price - (2.5 * pack.price) / 10).toFixed(0)
                        )}
                      </p>
                      <div
                        className=" text-center position-relative"
                        style={{
                          color: pack.color,
                          fontSize: 14,
                          fontWeight: 500,
                          width: 40,
                        }}
                      >
                        {englishNumberToPersianNumber(pack.price)}
                        <div
                          style={{
                            width: 30,
                            borderTop: `1px solid ${pack.color}`,
                            position: "absolute",
                            bottom: 0,
                            top: "14%",
                            transform: "rotate(-45deg)",
                          }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    <p
                      className="mt-4"
                      style={{
                        color: pack.color,
                        fontSize: 27,
                        fontWeight: 500,
                      }}
                    >
                      {englishNumberToPersianNumber(pack.price)}
                    </p>
                  )}

                  <span
                    className="mt-1"
                    style={{
                      color: "#202223",
                      fontSize: 15,
                      fontWeight: 400,
                    }}
                  >
                    هزار تومان در ماه
                  </span>
                  <button
                    className="w-100 mt-3"
                    style={{
                      height: 44,
                      color: "#0050FF",
                      backgroundColor: "#fff",
                      borderRadius: 8,
                      border: "1px solid #0050FF",
                    }}
                    onClick={() => {
                      router.push({
                        pathname: "/pay",
                        query: {
                          ...router.query,
                          amount: pack.price,
                          time: selectedTime,
                          type: pack.type,
                        },
                      });
                    }}
                  >
                    خرید بسته
                  </button>
                  <span
                    className="mt-3"
                    style={{
                      fontSize: 10,
                      lineHeight: "20px",
                      color: "#000000",
                    }}
                  >
                    آموزش کار با پنل
                  </span>
                  <div className="mt-1 d-flex justify-content-center">
                    <LazyImage width={40} src="/images/image 6.svg" />
                    <LazyImage
                      className="mr-1"
                      width={60}
                      src="/images/image 7.svg"
                    />
                  </div>
                  <p
                    className="mt-4"
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#000000",
                    }}
                  >
                    {pack.featuresTitle}
                  </p>
                  {pack.features.map((feature) => (
                    <p
                      key={feature.id}
                      className="d-flex align-items-center mt-4"
                    >
                      <Image width={24} height={24} src="/images/check.svg" />
                      <span
                        className="mr-1"
                        style={{ fontSize: 11, lineHeight: "20px" }}
                      >
                        {feature.title}
                      </span>
                      {feature.description ? (
                        <ClickAwayListener
                          onClickAway={() => {
                            if (isOpenTooltip[feature.id]) {
                              setIsOpenTooltip({
                                [feature.id]: false,
                              });
                            }
                          }}
                        >
                          <Tooltip
                            placement="top"
                            PopperProps={{
                              disablePortal: true,
                            }}
                            disableFocusListener
                            disableHoverListener
                            arrow
                            onClose={() =>
                              setIsOpenTooltip({
                                [feature.id]: !isOpenTooltip[feature.id],
                              })
                            }
                            title={
                              <p
                                className="my-2"
                                style={{
                                  LineHeight: "20px",
                                  fontSize: 11,
                                  fontWeight: 400,
                                }}
                              >
                                {feature.description}
                              </p>
                            }
                            open={isOpenTooltip[feature.id] || false}
                          >
                            <button
                              className="mr-2"
                              style={{ height: 16 }}
                              onClick={() => {
                                setIsOpenTooltip({
                                  [feature.id]: true,
                                });
                              }}
                            >
                              <HelpOutlineRoundedIcon
                                style={{ fontSize: 16, color: "gray" }}
                              />
                            </button>
                          </Tooltip>
                        </ClickAwayListener>
                      ) : null}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p
            className="d-md-none w-100 my-4 d-flex justify-content-center cursor-pointer"
            style={{ color: "#0050FF", fontSize: 15, fontWeight: 500 }}
            onClick={() => setIsOpenCollapse(!isOpenCollapse)}
          >
            <span className="ml-1">مقایسه امکانات بسته ها</span>
            <div
              style={{
                transform: isOpenCollapse ? "rotate(180deg)" : "rotate(0deg)",
                transition: "0.5s all",
                height: 24,
              }}
            >
              <KeyboardArrowDownIcon />
            </div>
          </p>
        </div>
        <div className="container  pb-5">
          <Collapse isOpened={isOpenCollapse}>
            <div>
              <TableContainer className="w-100 purchase-by-order-table mt-5 radius-16">
                <Table className="w-100">
                  <TableBody>
                    {pricing_package_details?.map((detaile, index) => (
                      <>
                        <TableRow>
                          <TableCell
                            className=" py-4 flex-1"
                            colSpan="4"
                            style={{
                              backgroundColor: "#BABEC3",
                              color: "#fff",
                              textAlign: "right",
                            }}
                          >
                            {detaile.lable}
                          </TableCell>
                        </TableRow>
                        {detaile.options.map((option) => (
                          <TableRow className="py-4" key={option.id}>
                            <TableCell
                              className="font-weight-600"
                              align="right"
                            >
                              <ClickAwayListener
                                onClickAway={() => {
                                  if (isOpenTooltip[option.id]) {
                                    setIsOpenTooltip({
                                      [option.id]: false,
                                    });
                                  }
                                }}
                              >
                                <Tooltip
                                  placement="top"
                                  PopperProps={{
                                    disablePortal: true,
                                  }}
                                  disableFocusListener
                                  disableHoverListener
                                  arrow
                                  onClose={() =>
                                    setIsOpenTooltip({
                                      [option.id]: !isOpenTooltip[option.id],
                                    })
                                  }
                                  title={
                                    <p
                                      className="my-2"
                                      style={{
                                        LineHeight: "20px",
                                        fontSize: 11,
                                        fontWeight: 400,
                                      }}
                                    >
                                      {option.description}
                                    </p>
                                  }
                                  open={isOpenTooltip[option.id] || false}
                                >
                                  <span
                                    className="cursor-pointer"
                                    style={{
                                      textDecoration: option.description
                                        ? "underline"
                                        : "none",
                                    }}
                                    onMouseEnter={() => {
                                      if (option.description) {
                                        setIsOpenTooltip({
                                          [option.id]:
                                            !isOpenTooltip[option.id],
                                        });
                                      }
                                    }}
                                    onClick={() => {
                                      if (option.description) {
                                        setIsOpenTooltip({
                                          [option.id]: true,
                                        });
                                      }
                                    }}
                                  >
                                    {option.title}
                                  </span>
                                </Tooltip>
                              </ClickAwayListener>
                            </TableCell>
                            <TableCell
                              align="center"
                              style={{
                                fontSize: 18,
                              }}
                              className="py-2"
                            >
                              {typeof option.professional == "boolean" ? (
                                option.professional ? (
                                  <CheckBoxIcon style={{ color: "#FF9A82" }} />
                                ) : (
                                  <CheckBoxOutlineBlankIcon
                                    style={{ color: "#DADADA48" }}
                                  />
                                )
                              ) : (
                                <span
                                  style={{
                                    fontSize: 14,
                                    lineHeight: "18px",
                                  }}
                                >
                                  {option.professional}
                                </span>
                              )}
                            </TableCell>

                            <TableCell
                              align="center"
                              className="py-2"
                              style={{
                                fontSize: 18,
                              }}
                            >
                              {typeof option.standard == "boolean" ? (
                                option.standard ? (
                                  <CheckBoxIcon style={{ color: "#FF9A82" }} />
                                ) : (
                                  <CheckBoxOutlineBlankIcon
                                    style={{ color: "#DADADA48" }}
                                  />
                                )
                              ) : (
                                <span
                                  style={{
                                    fontSize: 14,
                                    lineHeight: "18px",
                                  }}
                                >
                                  {option.standard}
                                </span>
                              )}
                            </TableCell>
                            <TableCell
                              align="center"
                              className="py-2"
                              style={{
                                fontSize: 18,
                              }}
                            >
                              {typeof option.basic == "boolean" ? (
                                option.basic ? (
                                  <CheckBoxIcon style={{ color: "#FF9A82" }} />
                                ) : (
                                  <CheckBoxOutlineBlankIcon
                                    style={{ color: "#DADADA48" }}
                                  />
                                )
                              ) : (
                                <span
                                  style={{
                                    fontSize: 14,
                                    lineHeight: "18px",
                                  }}
                                >
                                  {option.basic}
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Collapse>
        </div>
        {/* vitrin_possibilities(Desktop) */}
        <div
          className="d-none d-md-block"
          style={{
            background:
              "linear-gradient(270.23deg, #0050FF 0.22%, #0050FF 20.45%, #0050FF 55.21%, rgba(0, 80, 255, 0.74) 99.82%)",
            padding: "40px 0",
            color: "#fff",
          }}
        >
          <div className="container d-flex flex-column align-items-center">
            <div
              className="w-100"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2 , 1fr)",
              }}
            >
              {vitrin_possibilities.map((possible, index) => (
                <div
                  key={possible.id}
                  className="d-flex align-items-center"
                  style={{
                    maxWidth: 540,
                    marginRight: index % 2 != 0 ? "auto" : 0,
                    marginTop: index >= 2 ? 80 : 0,
                  }}
                >
                  <LazyImage width={100} height={100} src={possible.image} />
                  <div style={{ marginRight: 40 }}>
                    <p
                      style={{
                        fontSize: 20,
                        fontWeight: 500,
                        lineHeight: "28px",
                      }}
                    >
                      {possible?.title}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                      className="mt-2"
                    >
                      {possible?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              style={{
                width: 254,
                height: 50,
                color: "#fff",
                border: "1px solid #fff",
                borderRadius: 8,
                marginTop: 88,
              }}
              onClick={() => setIsOpenPossibilitiesModal(true)}
            >
              مشاهده سایر ویژگی ها و امکانات ویترین
            </button>
          </div>
        </div>
        {/* vitrin_possibilities(mobile) */}
        <div
          className="d-md-none"
          style={{
            background:
              "linear-gradient(270.23deg, #0050FF 0.22%, #0050FF 20.45%, #0050FF 55.21%, rgba(0, 80, 255, 0.74) 99.82%)",
            padding: "40px 0",
            color: "#fff",
          }}
        >
          <div className="container d-flex flex-column align-items-center">
            <div
              className="w-100"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1 , 1fr)",
              }}
            >
              {vitrin_possibilities.map((possible, index) => (
                <div
                  key={possible.id}
                  className="d-flex align-items-center"
                  style={{
                    maxWidth: 540,
                    flexDirection: index % 2 == 0 ? "row-reverse" : "row",
                    marginTop: index >= 1 ? 100 : 0,
                  }}
                >
                  <LazyImage width={80} height={80} src={possible.image} />
                  <div
                    style={{
                      marginRight: index % 2 == 0 ? 0 : 24,
                      marginLeft: index % 2 == 0 ? 24 : 0,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 21,
                        fontWeight: 500,
                        lineHeight: "28px",
                      }}
                    >
                      {possible?.title}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 400,
                        lineHeight: "24px",
                      }}
                      className="mt-2"
                    >
                      {possible?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              style={{
                width: 254,
                height: 50,
                color: "#fff",
                border: "1px solid #fff",
                borderRadius: 8,
                marginTop: 88,
              }}
              onClick={() => setIsOpenPossibilitiesModal(true)}
            >
              مشاهده سایر ویژگی ها و امکانات ویترین
            </button>
          </div>
        </div>
        {/* customer(Desktop) */}
        <div
          className="d-none d-md-block"
          style={{
            padding: "40px 0",
            overflowX: "hidden",
          }}
        >
          <div className="container d-flex flex-column align-items-center">
            <p
              className="text-center"
              style={{ fontSize: 20, fontWeight: 500, lineHeight: "28px" }}
            >
              برخی از کسب‌وکارهایی که به ویترین اعتماد کرده‌اند
            </p>
            <div className="d-flex slide-logos-two mt-5 pt-1">
              {CUSTOMERS.map((item) => (
                <div
                  className=" position-relative d-flex m-2 p-1"
                  key={item}
                  style={{
                    borderRadius: 16,
                  }}
                >
                  <LazyImage
                    unoptimized
                    priority
                    width={60}
                    height={60}
                    src={item}
                    alt="customer"
                    className="logo-img"
                  />
                </div>
              ))}
            </div>

            <div className="w-100 d-flex justify-content-between mt-5 pt-5">
              <LazyImage src="/images/undraw_voting_nvu7.svg" width={500} />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2 ,1fr)",
                }}
              >
                <div
                  className="d-flex flex-column align-items-center"
                  style={{
                    border: "1px solid #CCCCCC",
                    borderRadius: 16,
                    marginRight: 24,
                    padding: 24,
                  }}
                >
                  <LazyImage
                    width={60}
                    height={60}
                    src="/images/my-location.svg"
                  />
                  <p
                    className="my-3"
                    style={{
                      fontWeight: 400,
                      fontSize: 12,
                      lineHeight: "24px",
                    }}
                  >
                    تا امروز
                  </p>
                  <p
                    className="d-flex align-items-center"
                    style={{ color: "#0050FF" }}
                  >
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: 28,
                        lineHeight: "32px",
                      }}
                    >
                      ۱۰۰۰
                    </span>
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: 12,
                        lineHeight: "16px",
                      }}
                    >
                      برند و کسب‌وکار
                    </span>
                  </p>

                  <p
                    className="mt-1 text-center"
                    style={{
                      color: "#44474A",
                      fontSize: 20,
                      fontWeight: 500,
                      lineHeight: "32px",
                    }}
                  >
                    از سایت ساز ویترین استفاده کرده‌اند
                  </p>
                </div>
                <div
                  className="d-flex flex-column align-items-center"
                  style={{
                    border: "1px solid #CCCCCC",
                    borderRadius: 16,
                    marginRight: 24,
                    padding: 24,
                  }}
                >
                  <LazyImage
                    width={60}
                    height={60}
                    src="/images/emoji-people.svg"
                  />
                  <p
                    className="my-3"
                    style={{
                      fontWeight: 400,
                      fontSize: 12,
                      lineHeight: "24px",
                    }}
                  >
                    در ماه گذشته
                  </p>
                  <p
                    className="d-flex align-items-center"
                    style={{ color: "#0050FF" }}
                  >
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: 28,
                        lineHeight: "32px",
                      }}
                    >
                      ۱۱۰
                    </span>
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: 12,
                        lineHeight: "16px",
                      }}
                    >
                      برند و کسب‌وکار
                    </span>
                  </p>

                  <p
                    className="mt-1 text-center"
                    style={{
                      color: "#44474A",
                      fontSize: 20,
                      fontWeight: 500,
                      lineHeight: "32px",
                    }}
                  >
                    فروش آنلاین خود را با ویترین شروع کردند
                  </p>
                </div>

                <div
                  className="d-flex flex-column align-items-center"
                  style={{
                    minHeight: 268,
                    border: "1px solid #CCCCCC",
                    borderRadius: 16,
                    marginRight: 24,
                    marginTop: 24,
                    padding: 24,
                  }}
                >
                  <LazyImage
                    width={60}
                    height={60}
                    src="/images/my-location.svg"
                  />
                  <p
                    className="my-3"
                    style={{
                      fontWeight: 400,
                      fontSize: 12,
                      lineHeight: "24px",
                    }}
                  >
                    تا امروز
                  </p>
                  <p
                    className="d-flex align-items-center "
                    style={{ color: "#0050FF" }}
                  >
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: 28,
                        lineHeight: "32px",
                      }}
                    >
                      ۱۱۹,۳۹۰,۳۶۴,۴۲۵
                    </span>
                    <span
                      className="mr-4"
                      style={{
                        fontWeight: 400,
                        fontSize: 12,
                        lineHeight: "16px",
                      }}
                    >
                      تومان
                    </span>
                  </p>

                  <p
                    className="mt-3 text-center"
                    style={{ color: "#44474A", fontSize: 20, fontWeight: 500 }}
                  >
                    درآمد آنلاین کسب‌وکارهایی که سایت خود را با ویترین ساخته‌اند
                  </p>
                  <p
                    className="mt-1"
                    style={{ color: "#44474A", fontSize: 12, fontWeight: 400 }}
                  >
                    + آمار شما هنوز به این عدد اضافه نشده است
                  </p>
                </div>
                <div
                  className="d-flex flex-column align-items-center"
                  style={{
                    minHeight: 268,
                    border: "1px solid #CCCCCC",
                    borderRadius: 16,
                    marginRight: 24,
                    marginTop: 24,
                    padding: 24,
                  }}
                >
                  <LazyImage width={60} height={60} src="/images/money.svg" />
                  <p
                    className="my-3"
                    style={{
                      fontWeight: 400,
                      fontSize: 12,
                      lineHeight: "24px",
                    }}
                  >
                    در ماه گذشته
                  </p>

                  <p
                    className="d-flex align-items-center "
                    style={{ color: "#0050FF" }}
                  >
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: 28,
                        lineHeight: "32px",
                      }}
                    >
                      ۱۰,۱۰۰,۰۰۰,۰۰۰{" "}
                    </span>
                    <span
                      className="mr-4"
                      style={{
                        fontWeight: 400,
                        fontSize: 12,
                        lineHeight: "16px",
                      }}
                    >
                      تومان
                    </span>
                  </p>
                  <p
                    className="mt-3 text-center"
                    style={{ color: "#44474A", fontSize: 20, fontWeight: 500 }}
                  >
                    درآمد آنلاین کسب‌وکارهایی که سایت خود را با ویترین ساخته‌اند
                  </p>
                </div>
              </div>
            </div>
            <div className="w-100 d-flex justify-content-between mt-5 pt-1">
              <div className="d-flex" style={{ width: 500 }}>
                <div
                  className="d-flex flex-column align-items-center"
                  style={{
                    width: 238,
                    border: "1px solid #CCCCCC",
                    borderRadius: 16,
                    padding: 24,
                  }}
                >
                  <LazyImage width={60} height={60} src="/images/receipt.svg" />
                  <p
                    className="d-flex align-items-center"
                    style={{ color: "#0050FF", marginTop: 24 }}
                  >
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: 28,
                        lineHeight: "32px",
                      }}
                    >
                      ۲۰۹
                    </span>
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: 12,
                        lineHeight: "16px",
                      }}
                    >
                      عدد{" "}
                    </span>
                  </p>
                  <p
                    className="mt-3 text-center"
                    style={{ color: "#44474A", fontSize: 20, fontWeight: 500 }}
                  >
                    بیشترین سفارش روزانه(از یک سایت){" "}
                  </p>
                  <p
                    className="mt-1"
                    style={{ color: "#44474A", fontSize: 12, fontWeight: 400 }}
                  >
                    ۲۵ بهمن ۱۴۰۰
                  </p>
                </div>
                <div
                  className="d-flex flex-column align-items-center"
                  style={{
                    width: 238,
                    border: "1px solid #CCCCCC",
                    borderRadius: 16,
                    padding: 24,
                    marginRight: 24,
                  }}
                >
                  <LazyImage
                    width={60}
                    height={60}
                    src="/images/remove-red-eye.svg"
                  />
                  <p
                    className="d-flex align-items-center"
                    style={{ color: "#0050FF", marginTop: 24 }}
                  >
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: 28,
                        lineHeight: "32px",
                      }}
                    >
                      ۴۸۷۳
                    </span>
                    <span
                      style={{
                        fontWeight: 400,
                        fontSize: 12,
                        lineHeight: "16px",
                      }}
                    >
                      نفر{" "}
                    </span>
                  </p>
                  <p
                    className="mt-3 text-center"
                    style={{ color: "#44474A", fontSize: 20, fontWeight: 500 }}
                  >
                    بیشترین بازدید روزانه (از یک سایت)
                  </p>
                  <p
                    className="mt-1"
                    style={{ color: "#44474A", fontSize: 12, fontWeight: 400 }}
                  >
                    ۲۵ بهمن ۱۴۰۰
                  </p>
                </div>
              </div>
              <div
                className="d-flex flex-column align-items-center"
                style={{
                  flex: 1,
                  border: "1px solid #CCCCCC",
                  borderRadius: 16,
                  marginRight: 24,
                  padding: 38,
                }}
              >
                <LazyImage
                  width={180}
                  height={60}
                  src="/images/google.com.svg"
                />
                <p
                  className="d-flex align-items-center"
                  style={{ color: "#0050FF", marginTop: 24 }}
                >
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 28,
                      lineHeight: "32px",
                    }}
                  >
                    ۲۳۴
                  </span>
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: 12,
                      lineHeight: "16px",
                    }}
                  >
                    برند و کسب‌وکار
                  </span>
                </p>
                <p
                  className="mt-4 text-center"
                  style={{ color: "#44474A", fontSize: 20, fontWeight: 500 }}
                >
                  در نام کسب‌وکار خودشان رتبه یک گوگل را دارند{" "}
                </p>
                <p
                  className="mt-1"
                  style={{ color: "#44474A", fontSize: 12, fontWeight: 400 }}
                >
                  نام کسب و کارتان را در گوگل جست‌وجو کرده‌اید؟
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* customer(mobile) */}
        <div
          className="d-md-none"
          style={{
            padding: "20px 0",
            overflowX: "hidden",
          }}
        >
          <div className="container d-flex flex-column align-items-center">
            <p
              className="text-center"
              style={{ fontSize: 16, fontWeight: 500, lineHeight: "24px" }}
            >
              برخی از کسب‌وکارهایی که به ویترین اعتماد کرده‌اند
            </p>
            <div className="d-flex slide-logos-two mt-5 pt-1">
              {CUSTOMERS.map((item) => (
                <div
                  className=" position-relative d-flex m-2 p-1"
                  key={item}
                  style={{
                    borderRadius: 16,
                  }}
                >
                  <LazyImage
                    unoptimized
                    priority
                    width={60}
                    height={60}
                    src={item}
                    alt="customer"
                    className="logo-img"
                  />
                </div>
              ))}
            </div>
            <div className="w-100 d-flex flex-column  align-items-center mt-5 pt-5">
              <LazyImage src="/images/undraw_voting_nvu7.svg" width={200} />
              <div className=" w-100 mt-4">
                <div className="d-flex">
                  <div
                    className="d-flex flex-column align-items-center p-4"
                    style={{
                      border: "1px solid #CCCCCC",
                      borderRadius: 16,
                      width: "50%",
                    }}
                  >
                    <LazyImage
                      width={40}
                      height={40}
                      src="/images/my-location.svg"
                    />
                    <p
                      className="my-3"
                      style={{
                        fontWeight: 400,
                        fontSize: 12,
                        lineHeight: "24px",
                      }}
                    >
                      تا امروز
                    </p>
                    <p className="text-center" style={{ color: "#0050FF" }}>
                      <span
                        style={{
                          fontWeight: 500,
                          fontSize: 27,
                          lineHeight: "32px",
                        }}
                      >
                        ۱۰۰۰
                      </span>
                      <br />
                      <span
                        style={{
                          fontWeight: 400,
                          fontSize: 11,
                          lineHeight: "16px",
                        }}
                      >
                        برند و کسب‌وکار
                      </span>
                    </p>
                    <p
                      className="mt-1 text-center"
                      style={{
                        color: "#44474A",
                        fontSize: 16,
                        fontWeight: 500,
                        lineHeight: "28px",
                      }}
                    >
                      از سایت ساز ویترین استفاده کرده‌اند
                    </p>
                  </div>
                  <div
                    className="d-flex flex-column align-items-center p-4"
                    style={{
                      border: "1px solid #CCCCCC",
                      borderRadius: 16,
                      marginRight: 12,
                      width: "50%",
                    }}
                  >
                    <LazyImage
                      width={40}
                      height={40}
                      src="/images/emoji-people.svg"
                    />
                    <p
                      className="my-3"
                      style={{
                        fontWeight: 400,
                        fontSize: 12,
                        lineHeight: "24px",
                      }}
                    >
                      در ماه گذشته
                    </p>
                    <p className="text-center" style={{ color: "#0050FF" }}>
                      <span
                        style={{
                          fontWeight: 500,
                          fontSize: 27,
                          lineHeight: "32px",
                        }}
                      >
                        ۱۱۰
                      </span>
                      <br />
                      <span
                        style={{
                          fontWeight: 400,
                          fontSize: 11,
                          lineHeight: "16px",
                        }}
                      >
                        برند و کسب‌وکار
                      </span>
                    </p>

                    <p
                      className="mt-1 text-center"
                      style={{
                        color: "#44474A",
                        fontSize: 16,
                        fontWeight: 500,
                        lineHeight: "28px",
                      }}
                    >
                      فروش آنلاین خود را با ویترین شروع کردند{" "}
                    </p>
                  </div>
                </div>
                <div
                  className=" d-flex flex-column align-items-center"
                  style={{
                    minHeight: 232,
                    border: "1px solid #CCCCCC",
                    borderRadius: 16,
                    marginTop: 16,
                    padding: 16,
                  }}
                >
                  <LazyImage
                    width={40}
                    height={40}
                    src="/images/my-location.svg"
                  />
                  <p
                    className="my-3"
                    style={{
                      fontWeight: 400,
                      fontSize: 12,
                      lineHeight: "24px",
                    }}
                  >
                    تا امروز
                  </p>
                  <p
                    className="d-flex align-items-center"
                    style={{ color: "#0050FF" }}
                  >
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: 27,
                        lineHeight: "32px",
                      }}
                    >
                      ۱۱۹,۳۹۰,۳۶۴,۴۲۵{" "}
                    </span>
                    <span
                      className="mr-1"
                      style={{
                        fontWeight: 400,
                        fontSize: 12,
                        lineHeight: "16px",
                      }}
                    >
                      تومان
                    </span>
                  </p>
                  <p
                    className="mt-3 text-center"
                    style={{ color: "#44474A", fontSize: 16, fontWeight: 500 }}
                  >
                    درآمد آنلاین کسب‌وکارهایی که سایت خود را با ویترین ساخته‌اند
                  </p>
                  <p
                    className="mt-1"
                    style={{ color: "#44474A", fontSize: 11, fontWeight: 400 }}
                  >
                    + آمار شما هنوز به این عدد اضافه نشده است
                  </p>
                </div>
                <div
                  className="d-flex flex-column align-items-center"
                  style={{
                    border: "1px solid #CCCCCC",
                    borderRadius: 16,
                    marginTop: 16,
                    padding: 16,
                  }}
                >
                  <LazyImage width={40} height={40} src="/images/money.svg" />
                  <p
                    className="my-3"
                    style={{
                      fontWeight: 400,
                      fontSize: 12,
                      lineHeight: "24px",
                    }}
                  >
                    در ماه گذشته
                  </p>
                  <p
                    className="d-flex align-items-center"
                    style={{ color: "#0050FF" }}
                  >
                    <span
                      style={{
                        fontWeight: 500,
                        fontSize: 27,
                        lineHeight: "32px",
                      }}
                    >
                      ۱۰,۱۰۰,۰۰۰,۰۰۰{" "}
                    </span>
                    <span
                      className="mr-1"
                      style={{
                        fontWeight: 400,
                        fontSize: 12,
                        lineHeight: "16px",
                      }}
                    >
                      تومان
                    </span>
                  </p>
                  <p
                    className="mt-3 text-center"
                    style={{ color: "#44474A", fontSize: 16, fontWeight: 500 }}
                  >
                    درآمد آنلاین کسب‌وکارهایی که سایت خود را با ویترین ساخته‌اند
                  </p>
                </div>
              </div>
            </div>

            <div className="w-100 d-flex mt-4">
              <div
                className="d-flex flex-column align-items-center "
                style={{
                  width: 238,
                  border: "1px solid #CCCCCC",
                  borderRadius: 16,
                  padding: 16,
                  height: "fit-content",
                }}
              >
                <LazyImage width={40} height={40} src="/images/receipt.svg" />
                <p
                  className="d-flex align-items-center"
                  style={{ color: "#0050FF", marginTop: 24 }}
                >
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 27,
                      lineHeight: "32px",
                    }}
                  >
                    ۲۰۹
                  </span>
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: 12,
                      lineHeight: "16px",
                    }}
                  >
                    عدد
                  </span>
                </p>
                <p
                  className="mt-3 text-center"
                  style={{ color: "#44474A", fontSize: 16, fontWeight: 500 }}
                >
                  بیشترین سفارش روزانه
                  <br />
                  (از یک سایت){" "}
                </p>
                <p
                  className="mt-1"
                  style={{ color: "#44474A", fontSize: 11, fontWeight: 400 }}
                >
                  ۲۵ بهمن ۱۴۰۰{" "}
                </p>
              </div>
              <div
                className="d-flex flex-column align-items-center"
                style={{
                  width: 238,
                  border: "1px solid #CCCCCC",
                  borderRadius: 16,
                  padding: 16,
                  marginRight: 16,
                }}
              >
                <LazyImage
                  width={40}
                  height={40}
                  src="/images/remove-red-eye.svg"
                />
                <p
                  className="d-flex align-items-center"
                  style={{ color: "#0050FF", marginTop: 24 }}
                >
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 27,
                      lineHeight: "32px",
                    }}
                  >
                    ۴۸۷۳
                  </span>
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: 12,
                      lineHeight: "16px",
                    }}
                  >
                    نفر
                  </span>
                </p>
                <p
                  className="mt-3 text-center"
                  style={{ color: "#44474A", fontSize: 16, fontWeight: 500 }}
                >
                  بیشترین بازدید روزانه
                  <br />
                  (از یک سایت)
                </p>
                <p
                  className="mt-1"
                  style={{ color: "#44474A", fontSize: 11, fontWeight: 400 }}
                >
                  ۲۵ بهمن ۱۴۰۰{" "}
                </p>
              </div>
            </div>
            <div
              className="w-100 d-flex flex-column align-items-center mt-4"
              style={{
                flex: 1,
                border: "1px solid #CCCCCC",
                borderRadius: 16,
                padding: 16,
              }}
            >
              <LazyImage width={174} height={58} src="/images/google.com.svg" />
              <p
                className="d-flex align-items-center"
                style={{ color: "#0050FF", marginTop: 24 }}
              >
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: 28,
                    lineHeight: "32px",
                  }}
                >
                  ۲۳۴
                </span>
                <span
                  style={{
                    fontWeight: 400,
                    fontSize: 12,
                    lineHeight: "16px",
                  }}
                >
                  برند و کسب‌وکار
                </span>
              </p>
              <p
                className="mt-4 text-center"
                style={{ color: "#44474A", fontSize: 16, fontWeight: 500 }}
              >
                در نام کسب‌وکار خودشان رتبه یک گوگل را دارند
              </p>
              <p
                className="mt-1"
                style={{ color: "#44474A", fontSize: 11, fontWeight: 400 }}
              >
                نام کسب و کارتان را در گوگل جست‌وجو کرده‌اید؟
              </p>
            </div>
          </div>
        </div>
        {/* vitrin_features(Desktop) */}
        <div
          className="d-none d-md-block"
          style={{
            background:
              "linear-gradient(180.92deg, #0050FF 0.84%, #0050FF 44%, #0050FF 75.71%, rgba(0, 80, 255, 0.4) 107.64%)",
            padding: "40px 0",
            color: "#fff",
          }}
        >
          <div className="container">
            <h2 style={{ fontSize: 26, lineHeight: "32px" }}>
              بعد از خرید از سایت ویترین چه اتفاقی می‌افتد؟
            </h2>
            <div className="d-flex align-items-center justify-content-between">
              <LazyImage
                width={300}
                src="/images/undraw_choose_re_7d5a (1) 1.svg"
              />
              <div style={{ maxWidth: 860 }}>
                {vitrin_features?.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="d-flex align-items-center"
                    style={{
                      marginTop: 40,
                      flexDirection: index % 2 !== 0 ? "row-reverse" : "row",
                    }}
                  >
                    <p
                      className="text-center"
                      style={{
                        fontSize: 60,
                        lineHeight: "66px",
                        fontWeight: 500,
                        width: 40,
                      }}
                    >
                      {englishNumberToPersianNumber(feature.number)}
                    </p>
                    <div
                      style={{
                        marginRight: index % 2 !== 0 ? 0 : 32,
                        marginLeft: index % 2 !== 0 ? 32 : 0,
                        width: 600,
                      }}
                    >
                      <h3
                        style={{
                          fontSize: 20,
                          lineHeight: "28px",
                          fontWeight: 400,
                        }}
                      >
                        {" "}
                        {feature.title}
                      </h3>
                      <p
                        style={{
                          fontSize: 13,
                          lineHeight: "24px",
                          fontWeight: 400,
                        }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* vitrin_features(Mobile) */}
        <div
          className="d-md-none"
          style={{
            background:
              "linear-gradient(180.92deg, #0050FF 0.84%, #0050FF 44%, #0050FF 75.71%, rgba(0, 80, 255, 0.4) 107.64%)",
            padding: "20px 0",
            color: "#fff",
          }}
        >
          <div className="container">
            <h2 style={{ fontSize: 21, lineHeight: "32px" }}>
              بعد از خرید از سایت ویترین چه اتفاقی می‌افتد؟
            </h2>
            <div
              className="d-flex flex-column align-items-center justify-content-between"
              style={{ paddingTop: 60 }}
            >
              <LazyImage
                width={200}
                src="/images/undraw_choose_re_7d5a (1) 1.svg"
              />
              <div>
                {vitrin_features?.map((feature, index) => (
                  <div
                    key={feature.id}
                    className="w-100 d-flex align-items-center"
                    style={{
                      marginTop: 60,
                      flexDirection: index % 2 !== 0 ? "row-reverse" : "row",
                    }}
                  >
                    <p
                      className="text-center"
                      style={{
                        fontSize: 48,
                        lineHeight: "66px",
                        fontWeight: 700,
                        width: 40,
                      }}
                    >
                      {englishNumberToPersianNumber(feature.number)}
                    </p>
                    <div
                      style={{
                        marginRight: index % 2 !== 0 ? 0 : 16,
                        marginLeft: index % 2 !== 0 ? 16 : 0,
                      }}
                    >
                      <h3
                        style={{
                          fontSize: 20,
                          lineHeight: "28px",
                          fontWeight: 400,
                        }}
                      >
                        {" "}
                        {feature.title}
                      </h3>
                      <p
                        className="mt-12"
                        style={{
                          fontSize: 13,
                          lineHeight: "24px",
                          fontWeight: 400,
                        }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* vitrin initialize(Desktop) */}
        <div className="d-none d-md-block" style={{ padding: "40px 0" }}>
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  color: "#6D7175",
                  lineHeight: "24px",
                }}
              >
                <h2 style={{ fontSize: 21 }}>
                  برای راه‌اندازی سایت کمک می‌خواهید؟
                </h2>
                <p style={{ fontSize: 14 }}>خدمات راه‌اندازی ویترین پرو</p>
                <p className="mt-4 pb-5 text-right" style={{ fontSize: 15 }}>
                  معمولا استفاده از تجربه افراد متخصص بهتر از صرف وقت برای کسب
                  تجربه است. اگر برای راه‌اندازی وبسایت کسب‌وکارتان می‌خواهید از
                  تخصص و سلیقه افراد حرفه‌ای استفاده کنید، می‌توانید روی ویترین
                  حساب کنید.
                </p>
                <button
                  className="mt-5"
                  style={{
                    height: 44,
                    color: "#fff",
                    backgroundColor: "#0050FF",
                    borderRadius: 8,
                    width: 252,
                  }}
                  onClick={() => setIsOpenConsultationModal(true)}
                >
                  درخواست مشاوره راه‌اندازی
                </button>
              </div>
              <div className="flex-1 d-flex justify-content-center">
                <LazyImage
                  width={300}
                  height="auto"
                  src="/images/undraw_profile_details_re_ch9r.svg"
                />
              </div>
            </div>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ marginTop: 40 }}
            >
              <div className="flex-1">
                <LazyImage
                  width={300}
                  height="auto"
                  src="/images/undraw_mobile_app_re_catg 1.svg"
                />
              </div>

              <div className="flex-1">
                <div
                  style={{
                    flex: 1,
                    textAlign: "center",
                    color: "#6D7175",
                    lineHeight: "24px",
                  }}
                >
                  <h2 style={{ fontSize: 21 }}>
                    در مورد تعرفه طراحی سایت سؤال دارید؟{" "}
                  </h2>
                  <p className="mt-4 pb-5 text-right" style={{ fontSize: 15 }}>
                    اگر برای طراحی سایت کسب‌وکارتان نیازمندی ویژه‌ای دارید که در
                    جزئیات بسته‌ها پیدا نکردید، می‌خواهید بعضی از خدماتی که در
                    لیست قیمت طراحی سایت آمده را متناسب با کسب‌وکار خودتان تغییر
                    دهید یا هر سؤال دیگری درباره تعرفه ساخت سایت و فروشگاه
                    اینترنتی دارید، می‌توانید با کارشناسان ویترین صحبت کنید.
                  </p>
                  <button
                    className=" mt-5"
                    style={{
                      height: 44,
                      color: "#fff",
                      backgroundColor: "#0050FF",
                      borderRadius: 8,
                      width: 252,
                    }}
                    onClick={() => setIsOpenConsultationModal(true)}
                  >
                    درخواست مشاوره
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* vitrin initialize(mobile) */}
        <div className="d-md-none" style={{ padding: "20px 0" }}>
          <div className="container">
            <h2
              className="text-center"
              style={{ fontSize: 21, fontWeight: 600, color: "#6D7175" }}
            >
              برای راه‌اندازی سایت کمک می‌خواهید؟
            </h2>
            <p
              className="text-center"
              style={{ fontSize: 11, color: "#6D7175" }}
            >
              خدمات راه‌اندازی ویترین پرو
            </p>

            <div
              className="mt-3"
              style={{
                flex: 1,
                textAlign: "center",
                color: "#6D7175",
                lineHeight: "24px",
              }}
            >
              <p className="mt-4 pb-5 text-right" style={{ fontSize: 15 }}>
                معمولا استفاده از تجربه افراد متخصص بهتر از صرف وقت برای کسب
                تجربه است. اگر برای راه‌اندازی وبسایت کسب‌وکارتان می‌خواهید از
                تخصص و سلیقه افراد حرفه‌ای استفاده کنید، می‌توانید روی ویترین
                حساب کنید.
              </p>
              <div className="w-100 d-flex justify-content-center">
                <LazyImage
                  width={200}
                  height="auto"
                  src="/images/undraw_profile_details_re_ch9r.svg"
                />
              </div>
              <button
                style={{
                  height: 44,
                  color: "#fff",
                  backgroundColor: "#0050FF",
                  borderRadius: 8,
                  width: 252,
                  marginTop: 44,
                }}
                onClick={() => setIsOpenConsultationModal(true)}
              >
                درخواست مشاوره راه‌اندازی{" "}
              </button>
            </div>

            <h2
              className="text-center"
              style={{
                fontSize: 21,
                fontWeight: 600,
                color: "#6D7175",
                marginTop: 40,
              }}
            >
              در مورد تعرفه طراحی سایت سؤال دارید؟{" "}
            </h2>
            <div className="w-100 d-flex justify-content-center">
              <LazyImage
                width={200}
                height="auto"
                src="/images/undraw_mobile_app_re_catg 1.svg"
              />
            </div>

            <div
              style={{
                flex: 1,
                textAlign: "center",
                color: "#6D7175",
                lineHeight: "24px",
              }}
            >
              <p className="mt-4 text-right" style={{ fontSize: 15 }}>
                اگر برای طراحی سایت کسب‌وکارتان نیازمندی ویژه‌ای دارید که در
                جزئیات بسته‌ها پیدا نکردید، می‌خواهید بعضی از خدماتی که در لیست
                قیمت طراحی سایت آمده را متناسب با کسب‌وکار خودتان تغییر دهید یا
                هر سؤال دیگری درباره تعرفه ساخت سایت و فروشگاه اینترنتی دارید،
                می‌توانید با کارشناسان ویترین صحبت کنید.
              </p>
              <button
                style={{
                  height: 44,
                  color: "#fff",
                  backgroundColor: "#0050FF",
                  borderRadius: 8,
                  width: 252,
                  marginTop: 44,
                }}
                onClick={() => setIsOpenConsultationModal(true)}
              >
                درخواست مشاوره
              </button>
            </div>
          </div>
        </div>
        <LazyHydrate whenVisible>
          {/* (Mobile) */}
          <div
            className="d-md-none"
            style={{
              backgroundColor: "#0050FF",
              padding: "32px 0",
            }}
          >
            <p
              style={{
                fontSize: 20,
                textAlign: "center",
                lineHeight: "24px",
                color: "#fff",
                fontWeight: 500,
              }}
            >
              از دیگران بپرسید
            </p>
            <div
              className="customers-comments w-100"
              style={{ paddingTop: 29 }}
            >
              <Slider {...customers_comments_slider_setting}>
                {CUSTOMER_COMMENTS.map((customer) => (
                  <div key={customer.id}>
                    <div
                      className="d-flex flex-column  align-items-center"
                      style={{
                        backgroundColor: "#fff",
                        width: "90%",
                        marginLeft: "5%",
                        borderRadius: 16,
                        padding: 16,
                      }}
                    >
                      <div className="flex-1">
                        <Image
                          unoptimized
                          priority
                          width={204}
                          height={204}
                          src={customer.image}
                          className="radius-16"
                          alt={customer.name}
                        />
                      </div>
                      <p className="flex-1" style={{ textAlign: "right" }}>
                        <p
                          className=" font-weight-600 w-100 mt-4"
                          style={{ fontSize: 13, lineHeight: "16px" }}
                        >
                          {customer.name}
                        </p>
                        <p
                          style={{
                            fontSize: 11,
                            lineHeight: "20px",
                            marginTop: 4,
                            direction: "rtl",
                          }}
                        >
                          {customer.comment}
                        </p>
                      </p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          {/* (Desktop) */}
          <div
            className="d-none d-md-block"
            style={{
              backgroundColor: "#0050FF",
              padding: "52px 0 22px",
            }}
          >
            <p
              style={{
                fontSize: 32,
                textAlign: "center",
                lineHeight: "24px",
                color: "#fff",
                fontWeight: 500,
              }}
            >
              از دیگران بپرسید
            </p>
            <div
              className="customers-comments w-100"
              style={{ padding: "40px 0 60px" }}
            >
              <Slider {...customers_comments_slider_setting}>
                {CUSTOMER_COMMENTS.map((customer) => (
                  <div key={customer.id}>
                    <div
                      className="d-flex justify-content-center"
                      style={{
                        backgroundColor: "transparent",
                        width: "100%",
                      }}
                    >
                      <div
                        className="d-flex flex-row align-items-center  radius-16"
                        style={{
                          backgroundColor: "#fff",
                          width: "90%",
                          padding: 21,
                        }}
                      >
                        <div
                          style={{
                            textAlign: "right",
                            width: "100%",
                          }}
                        >
                          <p className="pr-5 font-weight-600 w-100">
                            {customer.name}
                          </p>
                          <p
                            className="pr-5 mt-2"
                            style={{
                              fontSize: 12,
                              lineHeight: "16px",
                              direction: "rtl",
                            }}
                          >
                            {customer.comment}
                          </p>
                        </div>
                        <div style={{ marginRight: "-50px" }}>
                          <Image
                            unoptimized
                            priority
                            width={185}
                            height={185}
                            src={customer.image}
                            className="radius-8"
                            alt={customer.name}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </LazyHydrate>

        {/* Traditional questions (Mobile) */}
        <LazyHydrate whenVisible>
          <div
            className="container d-md-none"
            style={{
              paddingTop: 32,
            }}
          >
            <div
              style={{
                backgroundColor: "#F6F6F7",
                borderRadius: 16,
                padding: "24px 16px",
              }}
            >
              <p
                className="font-weight-600"
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  lineHeight: "24px",
                  paddingBottom: 0,
                }}
              >
                پرسش‌های متداول
              </p>
              {FAQS.map((item, index) => (
                <div
                  key={item.question}
                  style={{
                    backgroundColor: "#DFE9FF",
                    borderRadius: 16,
                  }}
                >
                  <div
                    className="d-flex justify-content-between align-items-center p-4"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 16,
                      marginTop: 24,
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      setCollapses({ ...collapses, [index]: !collapses[index] })
                    }
                  >
                    <div className={`d-flex align-items-center p-0`}>
                      <div style={{ minWidth: 24 }}>
                        <Image
                          unoptimized
                          priority
                          height={24}
                          width={24}
                          src="/images/question-icon-blue.svg"
                          alt={item.question}
                        />
                      </div>

                      <span
                        style={{
                          fontSize: 13,
                          lineHeight: "24px",
                          color: "#202223",
                          margin: "0 10px",
                        }}
                      >
                        {item.question}
                      </span>
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                        transform: collapses[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.5s",
                        marginLeft: 0,
                      }}
                    >
                      <div style={{ width: 12, height: 12 }}>
                        <Image
                          unoptimized
                          priority
                          layout="fill"
                          src="/images/arrow-bottom-icon-blue.svg"
                          alt="پرسش های متداول"
                        />
                      </div>
                    </div>
                  </div>
                  <Collapse isOpened={collapses[index]}>
                    <p
                      style={{
                        fontSize: 12,
                        lineHeight: "20px",
                        padding: 20,
                        color: "#202223",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: item.response,
                      }}
                    ></p>
                  </Collapse>
                </div>
              ))}
            </div>
          </div>
        </LazyHydrate>
        <div className="d-none d-md-block container">
          <div
            style={{
              backgroundColor: "#F6F6F7",
              borderRadius: 16,
              padding: "40px 64px",
            }}
          >
            <p
              className="font-weight-600 pb-4"
              style={{ textAlign: "center", fontSize: 16, lineHeight: "24px" }}
            >
              پرسش‌های متداول
            </p>
            {FAQS.map((item, index) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "#DFE9FF",
                  borderRadius: 16,
                }}
              >
                <div
                  className="d-flex justify-content-between align-items-center p-4"
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 16,
                    marginTop: 24,
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setCollapses({ ...collapses, [index]: !collapses[index] })
                  }
                >
                  <div className={`d-flex align-items-center pr-2`}>
                    <div style={{ minWidth: 24 }}>
                      <Image
                        height={24}
                        width={24}
                        src="/images/question-icon-blue.svg"
                        alt="question"
                      />
                    </div>

                    <span
                      style={{
                        fontSize: 14,
                        lineHeight: "24px",
                        color: "#202223",
                        margin: "0 16px 0 0",
                      }}
                    >
                      {item.question}
                    </span>
                  </div>
                  <div
                    style={{
                      cursor: "pointer",
                      transform: collapses[index]
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "0.5s all",
                      marginLeft: 8,
                    }}
                  >
                    <div style={{ width: 12, height: 12 }}>
                      <Image
                        layout="fill"
                        src="/images/arrow-bottom-icon-blue.svg"
                        alt="arrow"
                      />
                    </div>
                  </div>
                </div>
                <Collapse isOpened={collapses[index]}>
                  <p
                    style={{
                      fontSize: 12,
                      lineHeight: "20px",
                      padding: 20,
                      color: "#202223",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: item.response,
                    }}
                  ></p>
                </Collapse>
              </div>
            ))}
          </div>
        </div>

        <Footer />

        <FreeConsultationModal
          isOpen={isOpenConsultationModal}
          onClose={() => setIsOpenConsultationModal(false)}
        />
        <PossibilitiesModal
          isOpen={isOpenPossibilitiesModal}
          onClose={() => setIsOpenPossibilitiesModal(false)}
        />
      </div>
    </div>
  );
};

export default UpgradePage;
