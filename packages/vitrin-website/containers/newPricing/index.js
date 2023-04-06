import React, { memo, useEffect, useState } from "react";
import { FAQS, ONE_YEAR, pricing_package_details } from "./constant";
import { Collapse } from "react-collapse";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { makeSelectLoading } from "stores/global/selector";
import { VITRIN_TOKEN } from "utils/constants";
import { useRouter } from "next/router";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { CUSTOMER_COMMENTS } from "utils/constants/CUSTOMER_COMMENTS";
import Footer from "/components/Footer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import Link from "next/link";
import FreeConsultationModal from "containers/FreeConsultationModal";
import LazyImage from "components/LazyImage";
import uniqueId from "lodash/uniqueId";
import LocalPizzaIcon from "@material-ui/icons/LocalPizza";
import LaptopIcon from "@material-ui/icons/Laptop";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import OfflinePinIcon from "@material-ui/icons/OfflinePin";
import DoneIcon from "@material-ui/icons/Done";
import BookmarkSharpIcon from "@material-ui/icons/BookmarkSharp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Slider from "react-slick";
import LazyHydrate from "react-lazy-hydration";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import PossibilitiesModal from "./Modals/possibilitiesModal";
import JourneyHeader from "components/JourneyHeader";
import LoginModal from "./Modals/LoginModal";
import Cookies from "js-cookie";
import Image from "next/image";
import BreadCrumb from "components/BreadCrumb";
import { makeStyles } from "@material-ui/core/styles";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import Skeleton from "@material-ui/lab/Skeleton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles({
  customTableContainer: {
    overflowX: "initial",
  },
});

const customers_comments_slider_setting = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "31%",
  dots: true,
  slidesToShow: 1,
  arrows: false,
  speed: 500,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        dots: false,
        arrows: false,
        slidesToShow: 1,
        centerPadding: "25%",
      },
    },
  ],
};

const pricing_tabs = [
  {
    id: 1,
    title: "فروشگاه اینترنتی",
    image: "/images/shopping-cart.svg",
    description: "برای فروش آنلاین",
    icon: (size) => <ShoppingCartIcon style={{ fontSize: size }} />,
    type: "shopping",
    head_title: "کدام بسته فروشگاهی ویترین مناسب من است؟",
    head_description:
      "تعرفه طراحی سایت و هزینه ساخت فروشگاه اینترنتی با ویترین متناسب با نوع سایت و امکاناتی که کسب‌وکار شما برای موفقیت آنلاین نیاز دارد برآورد شده است.",
    video_url:
      "https://hs3-cf.behtarino.com/media/business_videos/Sequence-foroshgahi.mp4",
  },
  {
    id: 2,
    title: "وبسایت معرفی",
    image: "/images/laptop.svg",
    description: "بدون فروش آنلاین",
    icon: (size) => <LaptopIcon style={{ fontSize: size }} />,
    type: "intro",
    head_title: "کدام بسته معرفی ویترین مناسب من است؟",
    head_description:
      "تعرفه طراحی سایت و هزینه ساخت وبسایت معرفی با ویترین متناسب با نوع سایت و امکاناتی که کسب‌وکار شما برای موفقیت آنلاین نیاز دارد برآورد شده است.",
    video_url:
      "https://hs3-cf.behtarino.com/media/business_videos/Sequence-moarefi.mp4",
  },
  {
    id: 3,
    title: "سایت رستورانی",
    image: "/images/local-pizza.svg",
    description: "برای فروش آنلاین",
    icon: (size) => <LocalPizzaIcon style={{ fontSize: size }} />,
    type: "restaurant",
    head_title: "کدام بسته رستورانی ویترین مناسب من است؟",
    head_description:
      "تعرفه طراحی سایت و هزینه ساخت وبسایت رستورانی با ویترین متناسب با نوع سایت و امکاناتی که کسب‌وکار شما برای موفقیت آنلاین نیاز دارد برآورد شده است.",
    video_url:
      "https://hs3-cf.behtarino.com/media/business_videos/Sequence-%20restaurant-.mp4",
  },
];

const vitrin_possibilities = [
  {
    id: uniqueId(),
    image: "/images/youtube-searched-for.svg",
    title: "سرعت به روز رسانی بالا",
    description: `هر ۱۴ روز یک به روز رسانی؟
    تیم محصول ۲۰ نفره  ما  با تحقیق بازار و جلسات با شما، سایت ساز ویترین را توسعه می‌دهند.
  `,
  },
  {
    id: uniqueId(),
    image: "/images/store-white.svg",
    title: "۱ یا ۱۰۰ سفارش در روز؟",
    description: `فرقی نمی‌کند فروشگاه اینترنتی شما چه تعداد سفارش دارد. سرورهای مقیاس‌پذیر ویترین می‌تواند همپای رشد کسب‌وکار شما، منابع لازم برای میزبانی از وبسایت شما را تأمین کند.`,
  },
  {
    id: uniqueId(),
    image: "/images/Group 148.svg",
    title: "اتصال به کانال‌های جذب مشتری",
    description:
      "ویترین راهکارهای افزایش فروش مختلف  را آزموده و بهترین آن‌ها را در قالب تکنولوژی I.O.M در اختیار کسب‌وکارها قرار می‌دهد. در ویترین می‌توانید به کانال‌های جذب مشتری مثل ترب، قیمت، بهترینو و ایمالز متصل شوید.",
  },
  {
    id: uniqueId(),
    image: "/images/Support agent.svg",
    title: "پشتیبان اختصاصی و  آموزش",
    description:
      "۲۴ ساعته سفارش می‌گیرید؟ در بسته حرفه‌ای و طلایی ویترین یک پشتیبان اختصاصی با شما همراه می‌کنیم. تیم پشتیبانی ویترین در مسیر طراحی سایت همراه شماست و آموزش‌های مختلفی برای مدیریت سایت و فروشگاه اینترنتی در اختیار شما می‌گذارد.",
  },
  {
    id: uniqueId(),
    image: "/images/security.svg",
    title: "امنیت بالا",
    description:
      "سایت‌های ساخته شده با ویترین از بالاترین پروتکل‌های امنیتی استفاده می‌کنند تا شما هیچ‌گونه نگرانی بابت امنیت اطلاعات آنلاین خود و مشتری‌هایتان نداشته باشید.",
  },
  {
    id: uniqueId(),
    image: "/images/business.svg",
    title: "مورد اعتماد کسب‌وکارها",
    description:
      "تا امروز بیش از ۷۱۰ کسب‌وکار در صنف‌های مختلف به ویترین اعتماد کرده‌اند و در طراحی سایت و فروشگاه اینترنتی خود از خدمات ویترین استفاده می‌کنند.",
  },
];

const CUSTOMERS = [
  "/images/customer-01.svg",
  "/images/customer-02.svg",
  "/images/customer-03.svg",
  "/images/customer-04.svg",
  "/images/customer-05.svg",
  "/images/customer-06.svg",
  "/images/customer-07.svg",
  "/images/customer-08.svg",
  "/images/customer-09.svg",
  "/images/customer-10.svg",
  "/images/customer-11.svg",
  "/images/customer-12.svg",
  "/images/customer-13.svg",
  "/images/customer-14.svg",
  "/images/customer-15.svg",
  "/images/customer-16.svg",
  "/images/customer-17.svg",
  "/images/customer-18.svg",
  "/images/customer-19.svg",
  "/images/customer-20.svg",
  "/images/customer-21.svg",
  "/images/customer-22.svg",
  "/images/customer-23.svg",
  "/images/customer-24.svg",
  "/images/customer-25.svg",
  "/images/customer-26.svg",
  "/images/customer-27.svg",
  "/images/customer-28.svg",
  "/images/customer-29.svg",
  "/images/customer-30.svg",
];

const vitrin_features = [
  {
    id: uniqueId(),
    number: 1,
    title: "دسترسی کامل به پنل مدیریت سایت",
    description:
      "بلافاصله بعد از خرید هر بسته، به پنل مدیریت سایت دسترسی پیدا می‌کنید. یک معرفی کوتاه از محیط پنل مدیریت انجام می‌شود و سپس می‌توانید مدیریت کامل سایت خودتان را در اختیار بگیرید.",
  },
  {
    id: uniqueId(),
    number: 2,
    title: "آموزش کار با پنل",
    description:
      "کار کردن با سایت ساز ویترین آسان است و نیاز به دانش فنی طراحی سایت ندارد. در پنل سایت شما آموزش‌های ویدئویی قرار دارد که جزئیات مختلف مدیریت سایت را به شما آموزش می‌دهد. با دیدن و اجراکردن آموزش‌ها، شما آماده مدیریت یک سایت یا فروشگاه اینترنتی شده‌اید!",
  },
  {
    id: uniqueId(),
    number: 3,
    title: "تکمیل تنظیمات اصلی و راه‌اندازی",
    description:
      "برای داشتن یک سایت حرفه‌ای، ابتدا اطلاعات مهم کسب‌وکارتان مثل نام، آدرس و شماره تماس را تکمیل کنید. سپس می‌توانید تنظیماتی مثل اتصال به دامنه دلخواه، درگاه پرداخت آنلاین، اینماد و موارد دیگر را مطابق با آموزش‌ها انجام دهید یا از تیم ویترین کمک بگیرید. در این مرحله زیرساخت فعالیت آنلاین شما آماده شده است!",
  },
  {
    id: uniqueId(),
    number: 4,
    title: "افزودن محتوا و محصولات",
    description:
      "قدم بعدی افزودن محصولات و محتوا به سایت است. محصولاتی که می‌فروشید، قلب فروشگاه اینترنتی شماست. توضیحات و تصاویر هر محصول را با جزئیات وارد کنید. اگر فروش آنلاین ندارید، روی تولید محتوا و تصاویر جذاب وقت بگذارید. برای اجرای حرفه‌ای‌تر این مرحله، تیم ویترین می‌تواند به شما کمک کند.",
  },
  {
    id: uniqueId(),
    number: 5,
    title: "پشتیبانی و همراهی",
    description:
      "حالا سایت یا فروشگاه اینترنتی شما آماده موفقیت است! در تمام مسیر از پشتیبانی فنی ویترین بهره‌مند هستید. در بسته‌های حرفه‌ای طراحی سایت نیز یک اکانت منیجر اختصاصی برای پشتیبانی و آموزش‌های دقیق‌تر همراه شما خواهد بود.",
  },
  {
    id: uniqueId(),
    number: "+",
    title: "امکان طراحی ویژه صفحات شما و سئو",
    description:
      "در صورت تمایل می توانیم برای مشتریان خاص پسند و بلندپرواز طراحی اختصاصی صفحات و بنرهای ویژه داشته باشیم. همچنین در صورتی که می‌خواهید در عبارت های مهمی که مشتریان‌تان سرچ می‌کنند بالاتر دیده شوید خدمات سئو در اختیار شما قرار می دهیم تا مشتریان شما را راحت‌تر پیدا کنند.",
  },
];

const pricing_package = {
  shopping: [
    {
      id: uniqueId(),
      icon: () => <TrendingUpIcon />,
      title: "بسته حرفه ای",
      type: "professional",
      subTitle: "مناسب فروشگاه‌های آنلاین بزرگ",
      price: 380,
      color: "#33CBF4",
      featuresTitle: "همه امکانات بسته‌ استاندارد  به اضافه:",
      features: [
        "اکانت منیجر اختصاصی",
        "امکانات چندشعبه‌ای",
        "افزونه مدیریت انبار",
      ],
    },
    {
      id: uniqueId(),
      icon: () => <LoyaltyIcon />,
      title: "بسته‌استاندارد",
      type: "standard",
      subTitle: "به صرفه ترین و محبوب ترین بسته",
      price: 220,
      color: "#00A47C",
      featuresTitle: "همه امکانات بسته‌ پایه به اضافه:",
      features: [
        "اتوماسیون بازاریابی ویترین (I.O.M)",
        "سئوی فنی خودکار",
        "گزارش‌های فروش",
      ],
    },
    {
      id: uniqueId(),
      icon: () => <OfflinePinIcon />,
      title: "بسته پایه",
      subTitle: "برای شروع ساده و بدون ریسک",
      type: "basic",
      price: 80,
      color: "#6D7175",
      features: [
        "بدون نیاز به کدنویسی",
        "سیستم کامل فروش آنلاین",
        "درگاه پرداخت و روش‌های ارسال",
        "امنیت و پشتیبانی",
      ],
    },
  ],
  intro: [
    {
      id: uniqueId(),
      icon: () => <TrendingUpIcon />,
      title: "بسته حرفه ای",
      type: "professional",
      subTitle: "مناسب برای برندهای مصمم",
      price: 220,
      color: "#33CBF4",
      featuresTitle: "همه امکانات بسته‌ استاندارد  به اضافه:",
      features: [
        "اکانت منیجر اختصاصی",
        "استفاده از ابزارهای تحلیلی گوگل",
        "اتصال به پلتفرم‌های تبلیغاتی",
      ],
    },
    {
      id: uniqueId(),
      icon: () => <LoyaltyIcon />,
      title: "بسته‌استاندارد",
      type: "standard",
      subTitle: "به صرفه ترین و محبوب ترین بسته",
      price: 100,
      color: "#00A47C",
      featuresTitle: "همه امکانات بسته‌ پایه به اضافه:",
      features: [
        "سئوی فنی خودکار",
        "شخصی‌سازی قالب",
        "افزونه ارتباط سریع(دکمه شناور تماس)",
      ],
    },
    {
      id: uniqueId(),
      icon: () => <OfflinePinIcon />,
      title: "بسته پایه",
      type: "basic",
      subTitle: "برای شروع ساده و بدون ریسک",
      price: 50,
      color: "#6D7175",
      features: [
        "اتصال به دامنه دلخواه",
        "بدون نیاز به کدنویسی",
        "ساخت صفحات محتوایی",
        "امنیت و پشتیبانی",
      ],
    },
  ],
  restaurant: [
    {
      id: uniqueId(),
      icon: () => <TrendingUpIcon />,
      title: "بسته حرفه ای",
      type: "professional",
      subTitle: "مخصوص رستوران‌های بزرگ و چند شعبه‌ای",
      price: 760,
      color: "#33CBF4",
      featuresTitle: "همه امکانات بسته‌ استاندارد  به اضافه:",
      features: [
        "اکانت منیجر اختصاصی",
        "اتصال به نرم‌افزارهای رستوران",
        "افزونه مدیریت انبار",
      ],
    },
    {
      id: uniqueId(),

      icon: () => <LoyaltyIcon />,
      title: "بسته‌استاندارد",
      type: "standard",
      subTitle: "به صرفه ترین و محبوب ترین بسته",
      price: 380,
      color: "#00A47C",
      features: [
        "بدون نیاز به کدنویسی",
        "سیستم فروش آنلاین رستورانی",
        "اتوماسیون بازاریابی ویترین (I.O.M)",
        "امنیت و پشتیبانی",
      ],
    },
  ],
};

const PricingPage = ({ isLoading }) => {
  const [selectedTime, setSelectedTime] = useState(ONE_YEAR);
  const [isOpenCollapse, setIsOpenCollapse] = useState(false);
  const router = useRouter();
  const { business_type } = router.query;
  const [collapses, setCollapses] = useState({});
  const packageType = "";
  const [isOpenTooltip, setIsOpenTooltip] = useState({});
  const isOpenFactorCollapse = false;
  const [isOpenPossibilitiesModal, setIsOpenPossibilitiesModal] =
    useState(false);
  const [isOpenConsultationModal, setIsOpenConsultationModal] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [loadedVideos, setLoadedVideos] = useState({});
  const [isShowVideo, setIsShowVideo] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (business_type && !isLoading && !Cookies.get(VITRIN_TOKEN)) {
      setIsOpenLoginModal(true);
    }
    setVideoUrl(
      pricing_tabs?.find((tab) => tab.type == business_type)?.video_url
    );
  }, [business_type]);

  return (
    <div className="position-relative">
      <JourneyHeader />
      <div>
        {business_type ? (
          <div>
            <Dialog
              open={isShowVideo}
              onClose={() => setIsShowVideo(false)}
              className="p-0 w-100"
              PaperProps={{ className: "m-2" }}
              maxWidth="md"
            >
              <DialogContent className="w-100 p-0">
                <video autoPlay className="w-100 d-flex" controls>
                  <source src={videoUrl} />
                  Your browser does not support the video tag.
                </video>
              </DialogContent>
            </Dialog>
            {/* Desktop */}
            <div
              className="d-none d-md-block"
              style={{
                background:
                  "linear-gradient(270.23deg, #0050FF 0.22%, #0050FF 20.45%, #0050FF 55.21%, rgba(0, 80, 255, 0.74) 99.82%)",
                padding: "65px 0 200px",
                color: "#fff",
              }}
            >
              <div className="container d-flex flex-column align-items-center">
                <h1
                  style={{ fontSize: 24, fontWeight: 600, lineHeight: "32px" }}
                  className="text-center mb-4"
                >
                  تماشا کنید :
                  <br />
                  {
                    pricing_tabs?.find((tab) => tab.type == business_type)
                      ?.head_title
                  }
                </h1>
                <div
                  className=" d-flex align-items-center justify-content-center u-border-radius-8 overflow-hidden position-relative"
                  style={{
                    width: 576,
                    height: 325,
                    backgroundColor: "#ffffff82",
                    marginBottom: 50,
                  }}
                  onClick={() => setIsShowVideo(true)}
                >
                  {!loadedVideos[business_type] ? (
                    <div>
                      <Skeleton
                        variant="rect"
                        animation="wave"
                        width={576}
                        height={325}
                        className="position-absolute top-0 left-0"
                      />
                    </div>
                  ) : null}
                  <video
                    style={{
                      maxWidth: "unset",
                    }}
                    width="576"
                    height="325"
                    onLoadedData={() => {
                      setLoadedVideos({
                        [business_type]: true,
                      });
                    }}
                    src={`${videoUrl}`}
                  />

                  <PlayCircleFilledWhiteIcon
                    fontSize="large"
                    style={{
                      color: "#fff",
                      border: "rgba(0, 0, 0, 0.1) 0px 0px 4px inset",
                    }}
                    className="position-absolute left-0 right-0 bottom-0 u-top-0 m-auto"
                  />
                </div>
                <h2
                  className="mb-4 text-center"
                  style={{ width: 576, fontWeight: 400, fontSize: 16 }}
                >
                  {
                    pricing_tabs?.find((tab) => tab.type == business_type)
                      ?.head_description
                  }
                </h2>
                <div
                  className="d-flex"
                  style={{
                    width: 576,
                    height: 92,
                    borderRadius: 8,
                    border: "1px solid #fff",
                  }}
                >
                  {pricing_tabs?.map((tab, index) => (
                    <div
                      key={tab.id}
                      className="flex-1 d-flex flex-column align-items-center p-2 cursor-pointer"
                      style={{
                        backgroundColor:
                          business_type == tab.type ? "#fff" : "transparent",
                        color:
                          business_type == tab.type ? "#0050FF" : "#F0F0F040",
                        borderRight: index !== 0 ? "0.5px solid #fff" : "none",
                        height: "100%",
                        borderRadius:
                          index == 0
                            ? "0px 8px 8px 0"
                            : index == 2
                            ? "8px 0 0 8px"
                            : 0,
                      }}
                      onClick={() => {
                        const query = { business_type: tab.type };
                        router.push({
                          pathname: router.pathname,
                          query,
                        });
                      }}
                    >
                      {tab.icon(40)}
                      <p
                        className="mt-3"
                        style={{ fontSize: 15, fontWeight: 600 }}
                      >
                        {tab.title}
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  className="d-flex align-items-center mt-5 position-relative"
                  style={{
                    width: 576,
                    height: 60,
                    borderRadius: 8,
                    border: "1px solid #fff",
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  <div
                    className="flex-1 d-flex align-items-center justify-content-center cursor-pointer"
                    style={{
                      borderRadius: "0 8px 8px 0",
                      height: "100%",
                      color: selectedTime == ONE_YEAR ? "#0050ff" : "#fff",
                      backgroundColor:
                        selectedTime == ONE_YEAR ? "#fff" : "transparent",
                    }}
                    onClick={() => setSelectedTime(ONE_YEAR)}
                  >
                    <p>یکساله</p>
                    <BookmarkSharpIcon
                      style={{
                        position: "absolute",
                        top: -6,
                        right: 10,
                        fontSize: 40,
                        color: "#00E676",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 19,
                        fontSize: 14,
                        color: "#fff",
                      }}
                    >
                      ۲۰٪
                    </span>
                  </div>
                  <div
                    className="flex-1 d-flex align-items-center justify-content-center cursor-pointer"
                    style={{
                      borderRight: "0.5px solid #fff",
                      height: "100%",
                      borderRadius: "8px 0 0 8px",
                      color: selectedTime == "threeMonths" ? "#0050ff" : "#fff",
                      backgroundColor:
                        selectedTime == "threeMonths" ? "#fff" : "transparent",
                    }}
                    onClick={() => setSelectedTime("threeMonths")}
                  >
                    <p>سه ماهه</p>
                  </div>
                </div>
              </div>
            </div>
            {/* mobile */}
            <div
              className="d-md-none"
              style={{
                background:
                  "linear-gradient(270.23deg, #0050FF 0.22%, #0050FF 20.45%, #0050FF 55.21%, rgba(0, 80, 255, 0.74) 99.82%)",
                padding: "40px 0 80px",
                color: "#fff",
              }}
            >
              <div className="container d-flex flex-column align-items-center">
                <h1
                  style={{ fontSize: 19, fontWeight: 600, lineHeight: "32px" }}
                  className="text-center mb-4"
                >
                  تماشا کنید :
                  <br />
                  {
                    pricing_tabs?.find((tab) => tab.type == business_type)
                      ?.head_title
                  }
                </h1>
                <div
                  className=" d-flex align-items-center justify-content-center u-border-radius-8 overflow-hidden position-relative"
                  style={{
                    width: 320,
                    height: 180,
                    backgroundColor: "#ffffff82",
                    marginBottom: 32,
                  }}
                  onClick={() => setIsShowVideo(true)}
                >
                  {!loadedVideos[business_type] ? (
                    <div>
                      <Skeleton
                        variant="rect"
                        animation="wave"
                        width={320}
                        height={180}
                        className="position-absolute top-0 left-0"
                      />
                    </div>
                  ) : null}
                  <video
                    style={{
                      maxWidth: "unset",
                    }}
                    width={320}
                    height={180}
                    onLoadedData={() => {
                      setLoadedVideos({
                        [business_type]: true,
                      });
                    }}
                    src={`${videoUrl}`}
                  />

                  <PlayCircleFilledWhiteIcon
                    fontSize="large"
                    style={{
                      color: "#fff",
                      border: "rgba(0, 0, 0, 0.1) 0px 0px 4px inset",
                    }}
                    className="position-absolute left-0 right-0 bottom-0 u-top-0 m-auto"
                  />
                </div>
                <h2
                  className="mb-4 text-center"
                  style={{ fontWeight: 400, fontSize: 16 }}
                >
                  {
                    pricing_tabs?.find((tab) => tab.type == business_type)
                      ?.head_description
                  }
                </h2>
                <div
                  className="w-100 d-flex mt-4"
                  style={{
                    height: 92,
                    borderRadius: 8,
                    border: "1px solid #fff",
                  }}
                >
                  {pricing_tabs?.map((tab, index) => (
                    <div
                      key={tab.id}
                      className="flex-1 d-flex flex-column align-items-center p-2 cursor-pointer"
                      style={{
                        backgroundColor:
                          business_type == tab.type ? "#fff" : "transparent",
                        color:
                          business_type == tab.type ? "#0050FF" : "#F0F0F040",
                        borderRight: index !== 0 ? "0.5px solid #fff" : "none",
                        height: "100%",
                        borderRadius:
                          index == 0
                            ? "0px 8px 8px 0"
                            : index == 2
                            ? "8px 0 0 8px"
                            : 0,
                      }}
                      onClick={() => {
                        const query = { business_type: tab.type };
                        router.push({
                          pathname: router.pathname,
                          query,
                        });
                      }}
                    >
                      {tab.icon(40)}
                      <p
                        className="mt-3"
                        style={{ fontSize: 13, fontWeight: 600 }}
                      >
                        {tab.title}
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  className="w-100 d-flex align-items-center mt-5 position-relative"
                  style={{
                    height: 60,
                    borderRadius: 8,
                    border: "1px solid #fff",
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  <div
                    className="flex-1 d-flex align-items-center justify-content-center cursor-pointer"
                    style={{
                      borderRadius: "0 8px 8px 0",
                      height: "100%",
                      color: selectedTime == ONE_YEAR ? "#0050ff" : "#fff",
                      backgroundColor:
                        selectedTime == ONE_YEAR ? "#fff" : "transparent",
                    }}
                    onClick={() => setSelectedTime(ONE_YEAR)}
                  >
                    <p>یکساله</p>
                    <BookmarkSharpIcon
                      style={{
                        position: "absolute",
                        top: -6,
                        right: 10,
                        fontSize: 40,
                        color: "#00E676",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 19,
                        fontSize: 14,
                        color: "#fff",
                      }}
                    >
                      ۲۰٪
                    </span>
                  </div>
                  <div
                    className="flex-1 d-flex align-items-center justify-content-center cursor-pointer"
                    style={{
                      borderRight: "0.5px solid #fff",
                      height: "100%",
                      borderRadius: "8px 0 0 8px",
                      color: selectedTime == "threeMonths" ? "#0050ff" : "#fff",
                      backgroundColor:
                        selectedTime == "threeMonths" ? "#fff" : "transparent",
                    }}
                    onClick={() => setSelectedTime("threeMonths")}
                  >
                    <p>سه ماهه</p>
                  </div>
                </div>
              </div>
            </div>
            {/* desttop */}
            <div className="d-none w-100 d-md-flex flex-column align-items-center">
              <div
                className="d-flex justify-content-center"
                style={{ width: 860, marginTop: -140 }}
              >
                {pricing_package[business_type]?.map((pack, index) => (
                  <div
                    key={pack.id}
                    style={{
                      borderRadius: 12,
                      backgroundColor: "#FFF",
                      width: business_type == "restaurant" ? 276 : 284,
                      boxShadow: "0px 4px 4px rgba(130, 132, 39, 0.1)",
                    }}
                    className={`p-3 text-center ${index !== 0 && "mr-4"}`}
                  >
                    <div style={{ fontSize: 24, color: pack.color }}>
                      {pack.icon()}
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
                            pack.price - (2 * pack.price) / 10
                          )}
                        </p>
                        <div
                          className="position-relative text-center "
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

                    <p
                      className="mt-1"
                      style={{
                        color: "#202223",
                        fontSize: 15,
                        fontWeight: 400,
                      }}
                    >
                      هزار تومان در ماه
                    </p>
                    <Link passHref href="/cr~templates">
                      <button
                        className="w-100 mt-4"
                        style={{
                          height: 44,
                          color: "#fff",
                          backgroundColor: "#0050FF",
                          borderRadius: 8,
                        }}
                      >
                        ۱۴ روز تست رایگان
                      </button>
                    </Link>
                    <p
                      className="mt-3"
                      style={{
                        fontSize: 10,
                        lineHeight: "20px",
                        color: "#000000",
                      }}
                    >
                      آموزش کار با پنل
                    </p>
                    <div className="mt-1 d-flex justify-content-center">
                      <LazyImage width={32} src="/images/image 6.svg" />
                      <LazyImage
                        className="mr-1"
                        width={40}
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
                        <DoneIcon
                          style={{ fontSize: 24, color: "#00000054" }}
                        />
                        <span
                          className="mr-1"
                          style={{ fontSize: 11, lineHeight: "20px" }}
                        >
                          {feature}
                        </span>
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
                <span className="ml-1">مقایسه امکانات بسته ها</span>
                <div
                  style={{
                    transform: isOpenCollapse
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
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
              className="d-md-none w-100 d-flex flex-column"
              style={{ overflowX: "scroll", marginTop: -40 }}
            >
              <div
                className="d-flex"
                style={{ width: business_type == "restaurant" ? 600 : 874 }}
              >
                {pricing_package[business_type]?.map((pack) => (
                  <div
                    key={pack.id}
                    style={{
                      borderRadius: 12,
                      backgroundColor: "#FFF",
                      width: business_type == "restaurant" ? 276 : 284,
                      boxShadow: "0px 4px 4px rgba(130, 132, 39, 0.1)",
                    }}
                    className="p-3 text-center mr-4"
                  >
                    <div style={{ fontSize: 24, color: pack.color }}>
                      {pack.icon()}
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
                            pack.price - (2 * pack.price) / 10
                          )}
                        </p>
                        <div
                          className="position-relative text-center "
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

                    <p
                      className="mt-1"
                      style={{
                        color: "#202223",
                        fontSize: 15,
                        fontWeight: 400,
                      }}
                    >
                      هزار تومان در ماه
                    </p>
                    <Link passHref href="/cr~templates">
                      <button
                        className="w-100 mt-4"
                        style={{
                          height: 44,
                          color: "#fff",
                          backgroundColor: "#0050FF",
                          borderRadius: 8,
                        }}
                      >
                        ۱۴ روز تست رایگان
                      </button>
                    </Link>
                    <p
                      className="mt-3"
                      style={{
                        fontSize: 10,
                        lineHeight: "20px",
                        color: "#000000",
                      }}
                    >
                      آموزش کار با پنل
                    </p>
                    <div className="mt-1 d-flex justify-content-center">
                      <LazyImage width={32} src="/images/image 6.svg" />
                      <LazyImage
                        className="mr-1"
                        width={40}
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
                        <DoneIcon
                          style={{ fontSize: 24, color: "#00000054" }}
                        />
                        <span
                          className="mr-1"
                          style={{ fontSize: 11, lineHeight: "20px" }}
                        >
                          {feature}
                        </span>
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
            <div className="container pb-5 ">
              <Collapse isOpened={isOpenCollapse}>
                <div>
                  <TableContainer
                    className="purchase-by-order-table mt-5 radius-16"
                    classes={{ root: classes.customTableContainer }}
                  >
                    <Table className="w-100" stickyHeader>
                      <TableHead>
                        <TableRow
                          className="position-sticky d-none d-md-table-row"
                          style={{
                            top: 0,
                            zIndex: 10000,
                            backgroundColor: "#fff",
                          }}
                        >
                          <TableCell
                            className="py-4"
                            colSpan="1"
                            style={{
                              textAlign: "right",
                              color: "#6D7175",
                              fontSize: 20,
                            }}
                          >
                            امکانات بسته‌های مختلف ویترین را با یکدیگر مقایسه
                            کنید
                          </TableCell>
                          {pricing_package[business_type]?.map((pack) => (
                            <TableCell
                              key={pack.id}
                              className="py-4"
                              colSpan="1"
                              style={{
                                background:
                                  "linear-gradient(180deg, rgba(186, 190, 195, 0) 0%, rgba(186, 190, 195, 0.71) 76.35%, #BABEC3 100%)",
                                textAlign: "center",
                                borderBottom: "2px solid #BABEC3",
                                color: "#6D7175",
                              }}
                            >
                              <p className="mt-2">{pack.title}</p>
                              <p
                                className="my-4"
                                style={{
                                  color: pack.color,
                                  fontWeight: 600,
                                  fontSize: 27,
                                }}
                              >
                                {selectedTime == ONE_YEAR
                                  ? englishNumberToPersianNumber(
                                      pack.price - (2 * pack.price) / 10
                                    )
                                  : englishNumberToPersianNumber(pack.price)}
                              </p>
                              <p style={{ fontSize: 10, color: "#202223" }}>
                                هزار تومان در ماه
                              </p>
                            </TableCell>
                          ))}
                        </TableRow>
                        <TableRow
                          className="position-sticky  d-md-none"
                          style={{
                            top: 0,
                            zIndex: 10000,
                            backgroundColor: "#fff",
                          }}
                        >
                          <TableCell
                            className="py-4"
                            colSpan="1"
                            style={{
                              textAlign: "right",
                              color: "#6D7175",
                              borderBottom: "2px solid #BABEC3",

                              background:
                                "linear-gradient(180deg, rgba(186, 190, 195, 0) 0%, rgba(186, 190, 195, 0.71) 76.35%, #BABEC3 100%)",
                            }}
                          ></TableCell>
                          {pricing_package[business_type]?.map((pack) => (
                            <TableCell
                              key={pack.id}
                              className="py-2"
                              colSpan="1"
                              style={{
                                background:
                                  "linear-gradient(180deg, rgba(186, 190, 195, 0) 0%, rgba(186, 190, 195, 0.71) 76.35%, #BABEC3 100%)",
                                textAlign: "center",
                                borderBottom: "2px solid #BABEC3",
                                color: "#6D7175",
                              }}
                            >
                              <p className="mt-2" style={{ fontSize: 12 }}>
                                {pack.title?.split("بسته")[1]}
                              </p>
                              <p
                                className="mt-1"
                                style={{
                                  color: pack.color,
                                  fontWeight: 400,
                                  fontSize: 16,
                                }}
                              >
                                {selectedTime == ONE_YEAR
                                  ? englishNumberToPersianNumber(
                                      pack.price - (2 * pack.price) / 10
                                    )
                                  : englishNumberToPersianNumber(pack.price)}
                              </p>
                              <p style={{ fontSize: 8, color: "#202223" }}>
                                هزار تومان
                                <br />
                                در ماه
                              </p>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {pricing_package_details[business_type].map(
                          (detaile) => (
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
                                            [option.id]:
                                              !isOpenTooltip[option.id],
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
                                      backgroundColor:
                                        packageType == "professional"
                                          ? "#DADADA48"
                                          : "#fff",
                                    }}
                                    className="py-2"
                                  >
                                    {typeof option.professional == "boolean" ? (
                                      option.professional ? (
                                        <CheckBoxIcon
                                          style={{ color: "#FF9A82" }}
                                        />
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
                                      backgroundColor:
                                        packageType == "standard"
                                          ? "#DADADA48"
                                          : "#fff",
                                    }}
                                  >
                                    {typeof option.standard == "boolean" ? (
                                      option.standard ? (
                                        <CheckBoxIcon
                                          style={{ color: "#FF9A82" }}
                                        />
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
                                  {business_type !== "restaurant" && (
                                    <TableCell
                                      align="center"
                                      className="py-2"
                                      style={{
                                        fontSize: 18,
                                        backgroundColor:
                                          packageType == "basic"
                                            ? "#DADADA48"
                                            : "#fff",
                                      }}
                                    >
                                      {typeof option.basic == "boolean" ? (
                                        option.basic ? (
                                          <CheckBoxIcon
                                            style={{ color: "#FF9A82" }}
                                          />
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
                                  )}
                                </TableRow>
                              ))}
                            </>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Collapse>
            </div>
          </div>
        ) : (
          <>
            {/* banner (Desktop) */}
            <div
              className="d-none d-md-block"
              style={{
                background:
                  "linear-gradient(270.23deg, #0050FF 0.22%, #0050FF 20.45%, #0050FF 55.21%, rgba(0, 80, 255, 0.74) 99.82%)",
                padding: "100px 0",
                color: "#fff",
              }}
            >
              <div className="d-flex container  flex-column align-items-center">
                <h1
                  style={{
                    marginTop: 24,
                    fontSize: 32,
                    lineHeight: "36px",
                    fontWeight: 600,
                  }}
                >
                  قیمت طراحی سایت با ویترین
                </h1>
                <p
                  className="text-center"
                  style={{
                    marginTop: 24,
                    fontSize: 26,
                    lineHeight: "36px",
                    fontWeight: 400,
                  }}
                >
                  برای مشاهده قیمت و تعرفه سایت‌ساز ویترین <br /> نوع سایت مد
                  نظرتان را انتخاب کنید
                </p>
                <div
                  className="d-flex justify-content-center"
                  style={{ marginTop: 24 }}
                >
                  {pricing_tabs?.map((tab, index) => (
                    <div key={tab.id}>
                      <div
                        className="d-flex flex-column align-items-center cursor-pointer"
                        style={{
                          borderRadius: 16,
                          border: "1px solid #fff",
                          width: 228,
                          height: 180,
                          backgroundColor: "#ffffff38",
                          padding: 24,
                          margin: index == 1 ? "0 60px" : 0,
                        }}
                        onClick={() => {
                          const query = { business_type: tab.type };
                          router.push({
                            pathname: router.pathname,
                            query,
                          });
                        }}
                      >
                        <div>{tab.icon(60)}</div>
                        <p
                          className="mt-4"
                          style={{ fontSize: 20, fontWeight: 500 }}
                        >
                          {tab.title}
                        </p>
                        <p
                          className="mt-1"
                          style={{ fontSize: 14, color: "#F0F0F0" }}
                        >
                          {tab.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p
                  className="text-center"
                  style={{
                    marginTop: 24,
                    fontSize: 26,
                    lineHeight: "36px",
                    fontWeight: 400,
                  }}
                >
                  یا می‌توانید
                </p>
                <Link passHref href="/cr~templates">
                  <button
                    className="mt-3"
                    style={{
                      width: 536,
                      height: 51,
                      color: "#0050FF",
                      borderRadius: 8,
                      backgroundColor: "#fff",
                      fontWeight: 500,
                    }}
                  >
                    رایگان شروع کنید
                  </button>
                </Link>

                <p className="mt-3" style={{ fontSize: 12, marginBottom: 24 }}>
                  امکانات ویترین را برای ۱۴ روز رایگان تست کنید
                </p>
                <LazyImage
                  style={{ width: 300 }}
                  src="/images/header-pricing.svg"
                />
              </div>
            </div>
            {/* banner (Mobile) */}
            <div
              className="d-md-none"
              style={{
                background:
                  "linear-gradient(270.23deg, #0050FF 0.22%, #0050FF 20.45%, #0050FF 55.21%, rgba(0, 80, 255, 0.74) 99.82%)",
                padding: "37px 0",
                color: "#fff",
              }}
            >
              <div className="container d-flex flex-column align-items-center">
                <h1
                  style={{
                    fontSize: 27,
                    lineHeight: "36px",
                    fontWeight: 600,
                  }}
                >
                  قیمت طراحی سایت با ویترین
                </h1>
                <p
                  className="text-center"
                  style={{
                    marginTop: 16,
                    fontSize: 16,
                    lineHeight: "24px",
                    fontWeight: 400,
                  }}
                >
                  برای مشاهده قیمت و تعرفه سایت‌ساز ویترین <br /> نوع سایت مد
                  نظرتان را انتخاب کنید
                </p>
                <div
                  className="w-100 d-flex flex-column justify-content-center"
                  style={{ marginTop: 16 }}
                >
                  {pricing_tabs?.map((tab, index) => (
                    <div key={tab.id}>
                      <div
                        className="w-100 d-flex justify-content-center align-items-center cursor-pointer"
                        style={{
                          borderRadius: 16,
                          border: "1px solid #fff",
                          width: "100%",
                          height: 83,
                          backgroundColor: "#ffffff38",
                          padding: 16,
                          margin: index == 1 ? "16px 0px" : 0,
                          boxShadow: " 0px 2px 4px rgba(255, 255, 255, 0.38)",
                        }}
                        onClick={() => {
                          const query = { business_type: tab.type };
                          router.push({
                            pathname: router.pathname,
                            query,
                          });
                        }}
                      >
                        <div style={{ height: 32 }}>{tab.icon(32)}</div>
                        <div className="d-flex flex-column align-items-center mr-4">
                          <p
                            className="mt-2"
                            style={{ fontSize: 15, fontWeight: 500 }}
                          >
                            {tab.title}
                          </p>
                          <p
                            className="mt-1"
                            style={{ fontSize: 15, color: "#F0F0F0" }}
                          >
                            {tab.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p
                  className="text-center"
                  style={{
                    marginTop: 16,
                    fontSize: 14,
                    lineHeight: "26px",
                    fontWeight: 400,
                  }}
                >
                  یا می‌توانید
                </p>
                <Link passHref href="/cr~templates">
                  <button
                    className="mt-3"
                    style={{
                      width: 242,
                      height: 50,
                      color: "#0050FF",
                      borderRadius: 8,
                      backgroundColor: "#fff",
                      fontWeight: 500,
                    }}
                  >
                    رایگان شروع کنید
                  </button>
                </Link>
                <p className="mt-3" style={{ fontSize: 12 }}>
                  امکانات ویترین را برای ۱۴ روز رایگان تست کنید
                </p>
                <div style={{ marginTop: 24 }}>
                  <LazyImage width={180} src="/images/header-pricing.svg" />
                </div>
              </div>
            </div>
          </>
        )}
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
            <Link passHref href="/features">
              <button
                style={{
                  width: 254,
                  height: 50,
                  color: "#fff",
                  border: "1px solid #fff",
                  borderRadius: 8,
                  marginTop: 88,
                }}
              >
                مشاهده سایر ویژگی ها و امکانات ویترین
              </button>
            </Link>
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
            <Link passHref href="/features">
              <button
                style={{
                  width: 254,
                  height: 50,
                  color: "#fff",
                  border: "1px solid #fff",
                  borderRadius: 8,
                  marginTop: 88,
                }}
              >
                مشاهده سایر ویژگی ها و امکانات ویترین
              </button>
            </Link>
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
                      عدد
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
                      نفر
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
              بعد از خرید از ویترین چه اتفاقی می‌افتد؟
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
            <div
              className="w-100 d-flex flex-column align-items-center justify-content-center"
              style={{ marginTop: 32 }}
            >
              <Link passHref href="/cr~templates">
                <button
                  style={{
                    width: 252,
                    height: 44,
                    color: "#fff",
                    border: "1px solid #fff",
                    borderRadius: 8,
                  }}
                >
                  رایگان تست کنید
                </button>
              </Link>
              <p className="mt-3" style={{ fontSize: 12 }}>
                ۱۴ روز رایگان امکانات ویترین را آزمایش کنید و بعد تصمیم بگیرید
              </p>
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
              بعد از خرید از ویترین چه اتفاقی می‌افتد؟
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
            <div
              className="w-100 d-flex flex-column align-items-center justify-content-center"
              style={{ marginTop: 60 }}
            >
              <Link passHref href="/cr~templates">
                <button
                  style={{
                    width: 252,
                    height: 44,
                    color: "#fff",
                    border: "1px solid #fff",
                    borderRadius: 8,
                  }}
                >
                  رایگان تست کنید
                </button>
              </Link>
              <p className="mt-3" style={{ fontSize: 12 }}>
                ۱۴ روز رایگان امکانات ویترین را آزمایش کنید و بعد تصمیم بگیرید
              </p>
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
                        minHeight: 350,
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
            <div
              className="w-100 d-flex flex-column align-items-center justify-content-center"
              style={{ marginTop: 24, color: "#fff" }}
            >
              <Link passHref href="/cr~templates">
                <button
                  style={{
                    width: 252,
                    height: 44,
                    color: "#fff",
                    border: "1px solid #fff",
                    borderRadius: 8,
                  }}
                >
                  رایگان تست کنید
                </button>
              </Link>

              <p className="mt-1" style={{ fontSize: 11 }}>
                ۱۴ روز رایگان امکانات ویترین را آزمایش کنید و بعد تصمیم بگیرید
              </p>
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
              style={{ paddingTop: 40 }}
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
            <div
              className="w-100 d-flex flex-column align-items-center justify-content-center"
              style={{ marginTop: 70, color: "#fff" }}
            >
              <Link passHref href="/cr~templates">
                <button
                  style={{
                    width: 252,
                    height: 44,
                    color: "#fff",
                    border: "1px solid #fff",
                    borderRadius: 8,
                  }}
                >
                  رایگان تست کنید
                </button>
              </Link>

              <p className="mt-3" style={{ fontSize: 12 }}>
                ۱۴ روز رایگان امکانات ویترین را آزمایش کنید و بعد تصمیم بگیرید
              </p>
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
        <BreadCrumb text="قیمت طراحی سایت" link={router.asPath} />
        <Footer />
        <div
          className="w-100 d-flex justify-content-center"
          style={{
            position: "fixed",
            bottom: 0,
            height: isOpenFactorCollapse ? 385 : 0,
            fontSize: 12,
            lineHeight: "20px",
            color: "#202223",
            transition: "0.5s all",
            backgroundColor: "#fff",
            borderRadius: "8px 8px 0 0",
            boxShadow: "0px -4px 4px rgba(0, 0, 0, 0.05)",
          }}
        >
          <div className="w-100 pt-3 px-4" style={{ maxWidth: 800 }}>
            <div className="d-flex justify-content-between">
              <p style={{ fontSize: 16, lineHeight: "24px", fontWeight: 600 }}>
                فاکتور
              </p>
              <p style={{ fontSize: 14, lineHeight: "24px", fontWeight: 400 }}>
                مهلت اعتبار بسته ۳۰ - تیر - ۱۴۰۱
              </p>
            </div>
            <div
              className="d-flex justify-content-between"
              style={{
                marginTop: 24,
                fontSize: 14,
                lineHeight: "24px",
                fontWeight: 400,
              }}
            >
              <p>قیمت بسته انتخاب شده</p>
              <p>تومان ۲/۷۰۰/۰۰۰</p>
            </div>
            <div
              className="d-flex justify-content-between"
              style={{
                marginTop: 24,
                fontSize: 14,
                lineHeight: "24px",
                fontWeight: 400,
              }}
            >
              <p>مالیات بر ارزش افزوده</p>
              <p>تومان ۲/۷۰۰/۰۰۰</p>
            </div>
            <hr className="hr-normal" style={{ marginTop: 24 }} />
            <div
              className="d-flex justify-content-between p-3"
              style={{
                marginTop: 24,
                fontSize: 14,
                lineHeight: "24px",
                fontWeight: 400,
                backgroundColor: "#0050FF10",
                borderRadius: 8,
              }}
            >
              <p>مبلغ قابل پرداخت</p>
              <p>تومان ۲/۷۰۰/۰۰۰</p>
            </div>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ marginTop: 24, fontSize: 14, lineHeight: "24px" }}
            >
              <p>کد تخفیف</p>
              <div
                className="d-flex justify-content-between"
                style={{
                  backgroundColor: "#FAFBFB",
                  borderRadius: 8,
                  border: "1px solid #E4E6E7",
                  height: 52,
                  width: 278,
                }}
              >
                <input
                  className="flex-1 pr-4"
                  style={{ height: "100%" }}
                  placeholder="افزودن کد تخیف"
                />
                <button
                  className="my-2 ml-4 py-2 px-3"
                  style={{
                    borderRadius: 8,
                    color: "#0050FF",
                    border: "1px solid #0050FF",
                  }}
                >
                  اعمال
                </button>
              </div>
            </div>
            <button
              className="w-100 mb-3"
              style={{
                height: 44,
                color: "#fff",
                backgroundColor: "#0050FF",
                borderRadius: 8,
                marginTop: 24,
                fontWeight: 500,
              }}
            >
              پرداخت
            </button>
          </div>
        </div>
        <FreeConsultationModal
          isOpen={isOpenConsultationModal}
          onClose={() => setIsOpenConsultationModal(false)}
        />
        <PossibilitiesModal
          isOpen={isOpenPossibilitiesModal}
          onClose={() => setIsOpenPossibilitiesModal(false)}
        />
        <LoginModal
          isOpen={isOpenLoginModal}
          onClose={() => setIsOpenLoginModal(false)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(PricingPage);
