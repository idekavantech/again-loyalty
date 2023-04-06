import Header from "containers/Header";
import { uniqueId } from "lodash";
import Image from "next/image";
import Button from "@material-ui/core/Button";
import LazyImage from "components/LazyImage";
import { Close } from "@material-ui/icons";
import { memo, useRef, useState } from "react";
import { persianToEnglishNumber } from "utils/helpers/persianToEnglishNumber";
import { priceFormatter } from "utils/helpers/priceFormatter";
import Link from "next/link";
import { Collapse } from "react-collapse";
import { reversePriceFormatter } from "utils/helpers/reversePriceFormatter";
import { englishNumberToPersianNumber } from "utils/helpers/englishNumberToPersianNumber";
import { compose } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { makeSelectUser } from "stores/user/selector";
import Footer from "components/Footer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { setQueriesInLocalstorage } from "utils/helpers/setQueriesInLocalstorage";

export const CUSTOMERS = [
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

export const categories = [
  {
    id: uniqueId(),
    title: "رستوران",
    description: "شیلا، کلین‌فود، سرزمین سوخاری و ...",
    image: "/images/RestaurantFilled2.svg",
  },
  {
    id: uniqueId(),
    title: "پوشاک",
    description: "بوژان شاپ، میم‌شاپ و ...",
    image: "/images/ShoppingBasketFilled.svg",
  },
  {
    id: uniqueId(),
    title: "کافی‌شاپ",
    description: "کافه رئیس، کافه ایده و ...",
    image: "/images/CoffeeFilled.svg",
  },
  {
    id: uniqueId(),
    title: "قنادی",
    description: "شیرینی ماری، کیک‌خونه و ...",
    image: "/images/cooki.svg",
  },
  {
    id: uniqueId(),
    title: "پروتئینی",
    description: "هایپر پرولند، گوشت قبادی و ...",
    image: "/images/meat-svgrepo-com 1.svg",
  },
  {
    id: uniqueId(),
    title: "مواد غذایی",
    description: "پای دیگ سادات، گرین سید و ...",
    image: "/images/FastfoodFilled.svg",
  },
  {
    id: uniqueId(),
    title: "هایپر میوه",
    description: "میولند، سارابن،...",
    image: "/images/apple-svgrepo-com 1.svg",
  },
  {
    id: uniqueId(),
    title: "آرایشی و بهداشتی",
    description: "لیلی بیوتی، مهربیوتی شاپ و ...",
    image: "/images/FaceRetouchingNaturalFilled (1).svg",
  },
  {
    id: uniqueId(),
    title: "لوازم خانگی",
    description: "سیتوکالا، اس ام جی کالا و ...",
    image: "/images/HomeFilled.svg",
  },
  {
    id: uniqueId(),
    title: "ابزار و تجهیزات",
    description: "آسو ابزار، ابزار اکسین و ...",
    image: "/images/MiscellaneousServicesFilled2.svg",
  },
  {
    id: uniqueId(),
    title: "دیجیتال",
    description: "ای ام سی، آرکو و ...",
    image: "/images/MedicalServicesFilled.svg",
  },
  {
    id: uniqueId(),
    title: "گل و گیاه ",
    description: "گل و گیاه",
    image: "/images/LocalFloristFilled.svg",
  },
  {
    id: uniqueId(),
    title: "اسباب بازی",
    description: "پوفالو کیدز و ...",
    image: "/images/ToysFilled.svg",
  },
  {
    id: uniqueId(),
    title: "پت‌شاپ",
    description: "لیانا پت، پت‌کال و ...",
    image: "/images/PetsFilled.svg",
  },
  {
    id: uniqueId(),
    title: "شرکت",
    description: "بیمه کوثر، پت‌کال و ...",
    image: "/images/DomainFilled.svg",
  },
  {
    id: uniqueId(),
    title: "دکوراسیون داخلی",
    description: "راش‌چوب، دکونیک و ...",
    image: "/images/KingBedFilled.svg",
  },
  {
    id: uniqueId(),
    title: "وکالت",
    description: "نفسیه خضرایی، دادخواه و ...",
    image: "/images/BalanceFilled.svg",
  },
  {
    id: uniqueId(),
    title: "خدماتی",
    description: "صداقت سرویس، نمایندگی خودرو و ...",
    image: "/images/EngineeringFilled.svg",
  },
  {
    id: uniqueId(),
    title: "سالن زیبایی",
    description: "کلاریس، مهتاب مسرور و ...",
    image: "/images/FaceRetouchingNaturalFilled (1).svg",
  },
  {
    id: uniqueId(),

    title: "ورزشی",
    description: "نوین تن، المپیا و ...",
    image: "/images/FitnessCenterFilled.svg",
  },
  {
    id: uniqueId(),
    title: "تجهیزات پزشکی",
    description: "دیبا طب، بهزیست مد و ...",
    image: "/images/MiscellaneousServicesFilled2.svg",
  },
  {
    id: uniqueId(),
    title: "اکسسوری",
    description: "جوت هوم‌لند، نقره آلتین و ...",
    image: "/images/WatchFilled.svg",
  },
];

const ReportsPage = ({ user }) => {
  const [sellingAmount, setSellingAmount] = useState("");
  const [commissionPercentage, setCommissionPercentage] = useState("");
  const [isOpenCollapses, setIsOpenCollapses] = useState(false);
  const growthRef = useRef();
  const managmentRef = useRef();
  const backOfVitrinRef = useRef();
  const customerRef = useRef();
  const router = useRouter();

  useEffect(() => {
    setQueriesInLocalstorage(router.query);
  }, [router]);
  const scrollIntoView = (ref) => {
    ref.current.scrollIntoView();
  };

  const VITRIN_RESULTS = [
    {
      id: uniqueId(),
      title: "رشد نجومی!",
      description: "بیش از ۱۰۰ میلیارد",
      image: "/images/icons-08.svg",
      ref: growthRef,
    },
    {
      id: uniqueId(),
      title: "مدیریت راحت‌تر",
      description: "۵۰٪ کاهش هزینه‌ها",
      image: "/images/icons-09.svg",
      ref: managmentRef,
    },
    {
      id: uniqueId(),
      title: "پشت ویترین",
      description: "تیم ۶۰ نفره",
      image: "/images/icons-10.svg",
      ref: backOfVitrinRef,
    },
    {
      id: uniqueId(),
      title: "مشتری‌های موفق",
      description: "۱۰۰۰ برند مستقل",
      image: "/images/icons-11.svg",
      ref: customerRef,
    },
  ];

  const isAuthenticated = user?.token;
  const hrefButtons = user?.token ? "/profile" : "/login?type=report";

  return (
    <div className="reports-page">
      <Header isTransparent />
      <div className=" reports-head ">
        <div className="container d-flex  flex-column-reverse flex-md-row justify-content-between align-items-center">
          <div className=" content">
            <p className="title text-right mt-5">
              به <span className="font-weight-bold">ویترین</span> ، نه!
            </p>
            <p className="title d-none d-md-block text-right mt-4">
              به <span className="rose-color font-weight-bold">نتیجه‌ها</span>{" "}
              اعتماد کنید!
            </p>
          </div>
          <div>
            <LazyImage
              src="/images/baner-report.svg"
              className="d-none d-md-block"
              height={404}
            />
            <LazyImage src="/images/baner-report.svg" className="d-md-none" />
          </div>
        </div>
      </div>

      <div className="w-100 vitrin-features">
        <p className="title text-center d-md-none text-right">
          به <span className="rose-color">نتیجه‌ها</span> اعتماد کنید!
        </p>
        <div className="container  d-flex justify-content-between flex-wrap flex-md-nowrap">
          {VITRIN_RESULTS.map((result) => (
            <div
              className="p-1 w-50 d-flex flex-column flex-md-1 align-items-center cursor-pointer"
              key={result.id}
              onClick={() => scrollIntoView(result.ref)}
            >
              <Image alt="" width={72} height={72} src={result.image} />
              <p className="mt-3">{result.title}</p>
              <div className="d-flex mt-3">
                <p className="ml-2 description">{result.description}</p>
                <Image
                  alt=""
                  height={18}
                  width={18}
                  src="/images/ArrowBackFilled.svg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="w-100 mt-4 pt-4 px-0"
        style={{ backgroundColor: "#F6F9FF" }}
      >
        <div className="container d-none d-md-flex justify-content-between">
          <div className="flex-1  report-box d-flex align-items-center justify-content-center ml-1">
            <p className="text-center">
              بیش از <span>۱۰۰۰</span> کسب‌و کار <br /> به ویترین اعتماد
              کرده‌اند.
            </p>
          </div>
          <div className="flex-1 report-box d-flex align-items-center justify-content-center mr-5">
            <p className="text-center">
              تاکنون <span>۱۱۶,۲۷۴,۸۷۷,۰۰۰</span> تومان،
              <br />
              به کمک ویترین، فروش داشته‌اند.
            </p>
          </div>
        </div>
        <div className="w-100 container  d-md-none ">
          <div className="flex-1 report-box d-flex flex-column justify-content-center">
            <p className="text-center">
              بیش از <span>۱۰۰۰</span> کسب‌و کار <br /> به ویترین اعتماد
              کرده‌اند
            </p>
            <p className="text-center">
              تاکنون <span>۱۱۶,۰۰۰,۰۰۰,۰۰۰</span> <br />
              تومان، به کمک ویترین، فروش داشته‌اند.
            </p>
          </div>
        </div>
        <div
          className="container  d-flex justify-content-between align-items-center"
          style={{ marginTop: 40 }}
        >
          <div className="flex-1">
            <h2>بیایید از نتیجه‌ها حرف بزنیم!</h2>
            <br />
            <p>
              حتما شما هم موافقید که اگر برای کسب‌وکارتان از بهترین فناوری‌های
              فضایی هم استفاده کنید اما نتیجه نگیرید، به موفقیت نرسیده‌اید. در
              ویترین، نتیجه‌گرفتن کسب‌وکار شما حرف اول را می‌زند. برخلاف
              سایت‌سازها و شرکت‌های طراحی سایت دیگری که فقط از امکانات سایت صحبت
              می‌کنند، تمرکز ویترین روی <strong>دستاوردها</strong>ست.
            </p>
            <br />
            <br />
            <p>
              کسب‌وکارهای مختلفی به ویترین اعتماد کرده‌اند و حاصل این اعتماد
              دوطرفه، نتایج ارزشمندی است که برای مشتری‌های ویترین به دست آمده و
              این نتیجه‌ها مهم‌ترین دلیل برای اعتماد شما به ویترین است.
            </p>
            <br />
            <br />
            <h2>اینجا نتایج واقعی با شما حرف می‌زنند!</h2>
          </div>
          <div className="flex-1  d-none d-md-flex justify-content-center align-items-center">
            <Image
              alt=""
              unoptimized
              priority
              src="/images/undraw_investor_update.svg"
              height={383}
              width={548}
            />
          </div>
        </div>
        <div
          className="container d-flex justify-content-center justify-content-md-start"
          style={{ marginTop: 40, marginBottom: 40 }}
        >
          <Link passHref href={hrefButtons}>
            <Button
              style={{ borderRadius: 8 }}
              size="large"
              color="primary"
              variant="outlined"
            >
              رایگان شروع کنید
            </Button>
          </Link>
        </div>

        <div className=" w-100 banner-three" ref={growthRef}>
          <LazyImage
            className="d-none d-md-block"
            src="/images/baners-15.svg"
          />
          <LazyImage
            className=" d-md-none"
            src="/images/baners-14.svg"
          />

          <div className="container">
            <p>وقتی فروش شما بیشتر می‌شود و بیشتر سود می‌کنید؛ چه حسی دارید؟</p>
          </div>
        </div>
        <div className="details-reports d-flex flex-column align-items-center justify-content-center">
          <div className="container content-box ">
            <div className="order-1">
              <p>
                دقیقا همان حس خوبی که کسب‌وکارهای موفق در ویترین تجربه می‌کنند.
                مثلا یکی از این کسب‌وکارها در کمتر از ۶ ماه توانست حدود ۵۰
                میلیون تومان فقط از طریق سایتی که با ویترین ساخته بود، درآمد کسب
                کند.
              </p>
              <div className="d-none d-md-block">
                <Link passHref href={hrefButtons}>
                  <Button
                    style={{ borderRadius: 8, marginTop: 40 }}
                    size="large"
                    color="primary"
                    variant="contained"
                  >
                    با ویترین بیشتر رشد کنید
                  </Button>
                </Link>
              </div>
            </div>
            <div className="order-2 p-4 card">
              <p className="mb-1 font-weight-bold">
                رشد فروش آنلاین یک کسب‌وکار موفق در سال اول
              </p>
              <LazyImage
                className="mt-5"
                src="/images/chart2 1.svg"
              />
            </div>
            <div className="order-3 d-flex align-items-center">
              <p>
                برای مقایسه با خودتان، شاید بهتر باشد تعداد سفارش‌هایی را بدانید
                که می‌توانید با ویترین داشته باشید. البته تعداد سفارش برای هر
                کسب‌وکار در حوزه‌های مختلف متفاوت است اما برای همان کسب‌وکاری که
                قبلا اشاره شد، در ماه ششم توانسته حدود ۹۰۰ سفارش آنلاین از طریق
                سایت دریافت کند!
              </p>
            </div>
            <div className="order-4 d-md-none  d-flex justify-content-center">
              <Link passHref href={hrefButtons}>
                <Button
                  style={{ borderRadius: 8 }}
                  size="large"
                  color="primary"
                  variant="contained"
                >
                  با ویترین بیشتر رشد کنید
                </Button>
              </Link>
            </div>
            <div className="order-5 p-4 card">
              <div className="w-100 d-flex">
                <Image
                  alt=""
                  width={57}
                  height={57}
                  src="/images/Raees 1.svg"
                />
                <div className="flex-1 mr-3 head">
                  <h3>آقای علی‌آبادی</h3>
                  <p className="store-title">کافه رئیس</p>
                </div>
              </div>
              <div className="mt-3 pt-3">
                <Image
                  alt=""
                  width={34}
                  height={34}
                  className="align-self-start"
                  src="/images/BlogHero-CreativeQuotes 1.svg"
                />
                <p className="viewpoint my-2">
                  ویترین به مشتری‌های ما کمک می‌کنه تا سفارش‌های خودشون رو با
                  سهولت و در کمترین زمان ممکن ثبت کنن.
                </p>
                <div className="d-flex justify-content-end">
                  <Image
                    alt=""
                    width={34}
                    height={34}
                    src="/images/BlogHero-CreativeQuotes 2.svg"
                  />
                </div>
              </div>
            </div>
            <div className="order-7 order-md-5 p-5 card report-view">
              <div className="my-3 d-flex justify-content-between align-items-center">
                <Image
                  alt=""
                  width={60}
                  height={60}
                  src="/images/ManageSearchFilled2.svg"
                />
                <p className="flex-1 text-center">
                  دیده‌شدن سایت‌های
                  <br />
                  <br />
                  <span>۲۴۳</span>
                </p>
              </div>
              <p className="mb-2 text-center big-title">
                کسب‌و‌کار در صفحه اول گوگل
              </p>
            </div>
            <div className="order-6 order-md-6 d-flex flex-column justify-content-between">
              <p>
                شاید بگویید که برای رسیدن به این تعداد سفارش باید تبلیغات زیادی
                انجام داد. خوشبختانه با داشتن سایت اختصاصی خودتان، راه‌های
                به‌صرفه و زیادی برای جذب مشتری در اختیار دارید و مثل اینستاگرام
                مجبور به پرداخت هزینه‌های سنگین به اینفلوئنسرها نیستید.
              </p>
              <br />
              <p>
                یک امتیاز مهم راه‌اندازی سایت اختصاصی برای کسب‌وکارتان نسبت به
                روش‌های فروش آنلاین دیگر این است که می‌توانید با استفاده از
                تکنیک‌های سئو (SEO) از گوگل هم مشتری داشته باشید!
              </p>
            </div>
            <div className="order-9 order-md-7 py-3 px-5 card report-view">
              <div className=" d-flex justify-content-between align-items-center">
                <Image
                  alt=""
                  width={60}
                  height={60}
                  src="/images/CampaignFilled2.svg"
                />
                <p className="flex-1 text-center">
                  افزایش فروش حدود
                  <br />
                  <br />
                  <span>۲۰۰٪</span>
                </p>
              </div>
              <p className="text-center big-title">
                یک کسب‌و‌کار در ۲۳ بهمن به کمک کمپین‌های‌ پیامکی{" "}
              </p>
            </div>
            <div className="order-8 order-md-8 d-flex align-items-center">
              <p>
                حتی در کوتاه مدت هم می‌توانید سفارش‌های زیادی بگیرید. یکی دیگر
                از امکانات کاربردی ویترین، اتوماسیون بازاریابی است که به کمک پنل
                پیامکی و کیف پول اختصاصی کاربران، می‌توانید از تکنیک‌هایی مثل
                کش‌بک (Cash Back) و تخفیف‌های هدفمند استفاده کنید تا مشتریان خود
                را به خرید دوباره از سایت ترغیب کنید.
              </p>
            </div>
          </div>
          <div
            className="container  d-flex justify-content-center justify-content-md-start"
            style={{ maxWidth: 864, margin: "40px 0" }}
          >
            <Link passHref href={hrefButtons}>
              <Button
                style={{ borderRadius: 8 }}
                size="large"
                color="primary"
                variant="contained"
              >
                با ویترین بیشتر بفروشید
              </Button>
            </Link>
          </div>
          <div className="container content-box">
            <div className="p-4 card">
              <div className="w-100 d-flex">
                <Image alt="" width={57} height={57} src="/images/vasabi.svg" />
                <div className="flex-1 mr-3 head">
                  <h3>آقای بیات</h3>
                  <p className="store-title">رستوران واسابی</p>
                </div>
              </div>
              <div className="mt-3 pt-3">
                <Image
                  alt=""
                  width={34}
                  height={34}
                  className="align-self-start"
                  src="/images/BlogHero-CreativeQuotes 1.svg"
                />
                <p className="viewpoint my-2">
                  ویترین به واسطه آپشن‌هایی که داره، مثل کیف پول و تخفیفاتی که
                  برای مشتری‌ها در نظر می‌گیریم، خیلی کمک می‌کنه به جذب
                  مشتری‌ها.
                </p>
                <div className="d-flex justify-content-end">
                  <Image
                    alt=""
                    width={34}
                    height={34}
                    src="/images/BlogHero-CreativeQuotes 2.svg"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <p>
                باز هم هست! ویترین طوری طراحی شده که شما بتوانید سایت خودتان را
                به نرم‌افزارهای دیگری که در کارتان استفاده می‌کنید متصل کنید.
                مثلا سایت خود را به سیستم صندوق فروشگاهی متصل کنید، از طریق
                سایت‌هایی مثل تُرُب و ایمالز مشتری بیشتری جذب کنید و در ادامه یک
                باشگاه مشتریان یکپارچه هم برای تمام مشتری‌های آنلاین و حضوری
                داشته باشید.
              </p>
            </div>
          </div>

          <div className="w-100" style={{ maxWidth: 864 }}>
            <h2 className="container d-flex justify-content-center  justify-content-md-start">
              عملیات و بازاریابی یکپارچه
            </h2>
            <div className="container mt-4 pt-2 d-flex flex-column flex-md-row align-items-center  justify-content-between iom-container">
              <div className="flex-1">
                <div className="d-flex">
                  <div className="channel iom-box d-flex align-items-center justify-content-center ml-3">
                    کانال‌های جذب مشتری
                  </div>
                  <div className="iom-images-box mr-3">
                    <Image
                      alt=""
                      width={64}
                      height={64}
                      src="/images/torob.svg"
                    />
                    <Image
                      alt=""
                      width={64}
                      height={64}
                      src="/images/imalls.svg"
                    />
                    <Image
                      alt=""
                      width={64}
                      height={64}
                      src="/images/behratino.svg"
                    />
                    <Image
                      alt=""
                      width={64}
                      height={64}
                      src="/images/gheyment.svg"
                    />
                  </div>
                </div>
                <div className="d-flex d-md-none my-4 pt-4">
                  <div className="payment-gateway iom-box d-flex align-items-center justify-content-center ml-3">
                    درگاه پرداخت
                  </div>
                  <div className="payment-gateway-images mr-3">
                    <Image
                      alt=""
                      width={64}
                      height={64}
                      src="/images/zibal.svg"
                    />
                    <Image
                      alt=""
                      width={64}
                      height={64}
                      src="/images/id-pay.svg"
                    />
                    <Image
                      width={64}
                      height={64}
                      src="/images/saman-kish.svg"
                      alt=""
                    />
                    <Image
                      width={64}
                      height={64}
                      src="/images/beh-pardakht.svg"
                      alt=""
                    />
                    <Image
                      width={64}
                      height={64}
                      src="/images/zarin-pall.svg"
                      alt=""
                    />
                    <Image alt="" width={64} height={64} src="/images/sp.svg" />
                  </div>
                </div>
                <div className="d-flex my-4 py-4">
                  <div className="customer-club iom-box d-flex align-items-center justify-content-center ml-3">
                    باشگاه مشتریان
                  </div>
                  <div className="iom-images-box mr-3">
                    <Image
                      alt=""
                      width={64}
                      height={64}
                      src="/images/dobare.svg"
                    />
                    <Image
                      alt=""
                      width={64}
                      height={64}
                      src="/images/dayatek.svg"
                    />
                  </div>
                </div>
                <div className="d-flex">
                  <div className="customer-club iom-box d-flex align-items-center justify-content-center ml-3">
                    صندوق فروشگاهی{" "}
                  </div>
                  <div className="iom-images-box mr-3">
                    <Image
                      alt=""
                      width={64}
                      height={64}
                      src="/images/hami.svg"
                    />
                    <Image
                      alt=""
                      width={64}
                      height={64}
                      src="/images/daramad.svg"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="d-none d-md-flex">
                  <div className="payment-gateway iom-box d-flex align-items-center justify-content-center ml-3">
                    درگاه پرداخت
                  </div>
                  <div className="payment-gateway-images mr-3">
                    <Image
                      alt=""
                      width={64}
                      height={64}
                      src="/images/zibal.svg"
                    />
                    <Image
                      alt=""
                      width={64}
                      height={64}
                      src="/images/id-pay.svg"
                    />
                    <Image
                      width={64}
                      height={64}
                      src="/images/saman-kish.svg"
                      alt=""
                    />
                    <Image
                      width={64}
                      height={64}
                      src="/images/beh-pardakht.svg"
                      alt=""
                    />
                    <Image
                      width={64}
                      height={64}
                      src="/images/zarin-pall.svg"
                      alt=""
                    />
                    <Image alt="" width={64} height={64} src="/images/sp.svg" />
                  </div>
                </div>
                <div className="d-flex py-4 my-4">
                  <div className="cash-desk-shopping iom-box d-flex align-items-center justify-content-center ml-3">
                    پیک و روش‌های ارسال{" "}
                  </div>
                  <div className="iom-images-box mr-3">
                    <Image
                      width={64}
                      height={64}
                      src="/images/int icons-05.svg"
                      alt=""
                    />
                    <Image
                      width={64}
                      height={64}
                      src="/images/int icons-06.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <h3 className="container" style={{ marginTop: 40 }}>
              با این یکپارچگی‌ها فروش شما بیشتر می‌شود و راحت‌تر!
            </h3>
            <div className="container d-flex justify-content-center justify-content-md-start">
              <Link passHref href={hrefButtons}>
                <Button
                  style={{ borderRadius: 8, marginTop: 40 }}
                  size="large"
                  color="primary"
                  variant="outlined"
                >
                  رایگان شروع کنید
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-100 banner-three" ref={managmentRef}>
        <LazyImage
          className="d-none d-md-block"
          src="/images/baners-17.svg"
        />
        <LazyImage
          className="d-md-none"
          src="/images/baners-16.svg"
        />

        <div className="container">
          <p>
            چطور می‌توانید کسب‌وکار آنلاین خود را بدون افزایش هزینه، راحت‌تر
            مدیریت کنید؟{" "}
          </p>
        </div>
      </div>
      <div className="details-reports d-flex flex-column align-items-center justify-content-center">
        <div className="container content-box">
          <div className="order-2 order-md-1 py-3 px-4 card report-view">
            <div className="my-3 d-flex justify-content-between align-items-center">
              <Image
                width={60}
                height={60}
                src="/images/ShoppingCartFilled.svg"
                alt=""
              />
              <p className="flex-1 text-center">
                یک کسب‌و‌کار در ۱۴ بهمن
                <br />
                <span>۴۷۵</span> سفارش
              </p>
            </div>
            <p className="text-center big-title">
              ثبت شده بر روی سایت خود داشته است.{" "}
            </p>
          </div>

          <div className="order-1 order-md-2 d-flex align-items-center">
            <p>
              ویترین تمام فرایند سفارش‌گیری شما را آنلاین و خودکار می‌کند؛ از
              انتخاب جزئیات محصول و روش‌های پرداخت توسط مشتری گرفته تا
              اطلاع‌رسانی پیامکی و اعمال مالیات روی فاکتور.
            </p>
          </div>
          <div className="order-3">
            <p>
              فکر کنید این کسب‌و‌کار که در یک روز ۴۷۵ سفارش جدید دریافت کرده،
              می‌خواست این سفارش‌ها را حضوری بگیرد یا از طریق دایرکت اینستاگرام
              با هر مشتری صحبت کند. حالا فرض کنید هر ثبت سفارش حدود ۵ دقیقه از
              ادمین شما وقت بگیرد. در این صورت حدود ۲۴۰۰ دقیقه یا ۴۰ ساعت برای
              سفارش گیری زمان لازم دارید. این عدد معادل ساعت کاری ۵ نفر در یک
              روز است!
            </p>
          </div>
          <div className="order-4 container d-flex w-100 d-md-none justify-content-center">
            <Link passHref href={hrefButtons}>
              <Button
                style={{ borderRadius: 8 }}
                size="large"
                color="primary"
                variant="contained"
              >
                با ویترین راحت‌تر بفروشید{" "}
              </Button>
            </Link>
          </div>
          <div className="order-5 order-md-4 p-4 card">
            <div className="w-100 d-flex">
              <Image alt="" width={57} height={57} src="/images/sadeghi.svg" />
              <div className="flex-1 mr-3 head">
                <h3>خانم صادقی</h3>
                <p className="store-title">شال و روسری ژاندارک</p>
              </div>
            </div>
            <div className="mt-3 pt-3">
              <Image
                alt=""
                width={34}
                height={34}
                className="align-self-start"
                src="/images/BlogHero-CreativeQuotes 1.svg"
              />
              <p className=" viewpoint my-2">
                مشتری توی پیج عکس رو می‌بینه، بعد توی دایرکت سؤال می‌پرسه و وقتت
                رو می‌گیره. ولی توی توی سایت، مشتری کاری رو که دوست داره انتخاب
                می‌کنه، پرداخت می‌کنه و سفارش ثبت می‌شه.
              </p>
              <div className="d-flex justify-content-end">
                <Image
                  alt=""
                  width={34}
                  height={34}
                  src="/images/BlogHero-CreativeQuotes 2.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="container d-none w-100 d-md-flex justify-content-start"
          style={{ maxWidth: 864, margin: "36px 0 10px" }}
        >
          <Link passHref href={hrefButtons}>
            <Button
              style={{ borderRadius: 8 }}
              size="large"
              color="primary"
              variant="contained"
            >
              با ویترین راحت‌تر بفروشید{" "}
            </Button>
          </Link>
        </div>
        <div className="container py-5 " style={{ maxWidth: 864 }}>
          <p>
            شاید تصمیم بگیرید به جای استفاده از وبسایت (یا هر کانال فروش اختصاصی
            دیگر) از پلتفرم‌های واسط یا بازار‌های آنلاین (Marketplace) استفاده
            کنید. بله، مدیریت فروش آنلاین شما سخت نمی‌شود اما کمیسیونی که
            می‌پردازید ممکن است ماهانه به چند ده میلیون تومان برسد!
          </p>
        </div>
        <div className="container content-box pt-4 mt-4">
          <div className="py-3 px-4 card report-view d-flex flex-column justify-content-center">
            <div className="my-3 d-flex justify-content-between align-items-center">
              <Image alt="" width={60} height={60} src="/images/doller.svg" />
              <p className="flex-1 text-center">
                یک کسب‌و‌کار در یک سال حدود
                <br />
                <br />
                <span>۴۵۰</span> میلیون تومان
              </p>
            </div>
            <p className="text-center big-title">
              بابت نپرداختن هزینه کمیسیون، سود کرده است!{" "}
            </p>
          </div>

          <div className="p-4 card">
            <div className="w-100 d-flex">
              <Image alt="" width={57} height={57} src="/images/zahedi.svg" />
              <div className="flex-1 mr-3 head">
                <h3>آقای زاهدی</h3>
                <p className="store-title">پیتزا هزار</p>
              </div>
            </div>
            <div className="mt-3 pt-3">
              <Image
                alt=""
                width={34}
                height={34}
                className="align-self-start"
                src="/images/BlogHero-CreativeQuotes 1.svg"
              />
              <p className="viewpoint my-2">
                ویترین باعث می‌شه من روی پای خودم وایسم. چرا من باید ۱۰ تا ۱۵
                درصد از سودم رو از دست بدم در حالی که می‌تونم با ویترین مستقیم
                به مشتری بفروشم؟
              </p>
              <div className="d-flex justify-content-end">
                <Image
                  alt=""
                  width={34}
                  height={34}
                  src="/images/BlogHero-CreativeQuotes 2.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 container d-flex justify-content-center mt-4">
          <div className="commission-box">
            <p className="w-100 d-flex align-items-center text-right title">
              <span className="icon">!</span>
              <span>
                تا به حال حساب کرده اید ماهیانه چقدر کمیسیون پرداخت می‌کنید؟
              </span>
            </p>
            <div className="w-100 cards-container flex-column flex-md-row d-flex justify-content-between">
              <div className="ml-md-4 flex-1">
                <p>
                  اعداد مربوط به کسب‌و‌کار خود را در جای خالی زیر وارد کنید:
                </p>
                <div className="mt-2 card d-flex flex-column align-items-center">
                  <div className=" d-flex align-items-center">
                    <p className="flex-1 input-title"> مبلغ فروش روزانه</p>
                    <input
                      className="px-1 direction-ltr"
                      value={sellingAmount ? priceFormatter(sellingAmount) : ""}
                      onChange={(e) =>
                        setSellingAmount(
                          persianToEnglishNumber(
                            reversePriceFormatter(e.target.value)
                          )
                        )
                      }
                    />
                  </div>
                  <div className="multi-icon">
                    <Close style={{ color: "gray", fontSize: 20 }} />
                  </div>
                  <div className="d-flex align-items-center position-relative">
                    <p className="flex-1 input-title">درصد کمیسیون</p>
                    <input
                      className="px-1 direction-ltr"
                      value={
                        commissionPercentage
                          ? englishNumberToPersianNumber(commissionPercentage)
                          : ""
                      }
                      onChange={(e) =>
                        setCommissionPercentage(
                          persianToEnglishNumber(e.target.value)
                        )
                      }
                    />
                    <span className="precent-icon">%</span>
                  </div>
                </div>
              </div>
              <div className="mr-md-4 mt-3  mt-md-0 flex-1 card">
                <div className="d-flex justify-content-center mt-2">
                  <div className="title ml-3">
                    <p>یعنی شما ماهیانه </p>
                    <span>
                      {commissionPercentage && sellingAmount
                        ? priceFormatter(
                            ((commissionPercentage * sellingAmount) / 100) * 30
                          )
                        : "?"}
                    </span>
                    <p>تومان</p>
                  </div>
                  <div className="title mr-3">
                    <p> و سالیانه</p>
                    <span>
                      {" "}
                      {commissionPercentage && sellingAmount
                        ? priceFormatter(
                            ((commissionPercentage * sellingAmount) / 100) * 365
                          )
                        : "?"}
                    </span>
                    <p>تومان</p>
                  </div>
                </div>
                <h3 className="text-center">
                  بابت پرداخت کمیسیون هزینه می‌کنید!{" "}
                </h3>
              </div>
            </div>
            <div className="w-100 d-flex justify-content-center align-items-center">
              <Link passHref href={hrefButtons}>
                <button>بدون کمیسیون بفروشید</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="container content-box  mt-4">
          <div className="order-2 order-md-1 py-2 px-4 card report-view d-flex flex-column justify-content-center">
            <div className=" d-flex justify-content-between align-items-center">
              <Image alt="" width={60} height={60} src="/images/doller.svg" />
              <p className="flex-1 text-center">
                ابزار اکسین روی سایت خود
                <br />
                <span>۱۵۰۰</span>
              </p>
            </div>
            <p className="text-center big-title">محصول قرار داده است!</p>
          </div>
          <div className="order-1 order-md-2">
            <p>
              خب مگر چند محصول در یک سایت می‌توانید قرار دهید تا این همه سفارش
              داشته باشید؟ به تعداد نامحدود! سخت نیست؟ اصلا! افزودن محصولات،
              ایجاد دسته‌بندی، زدن برچسب، قراردادن توضیحات و عکس و همه جزئیات
              مرتبط با محصولات در ویترین حتی به‌وسیله گوشی موبایل هم امکان‌پذیر
              است.
            </p>
          </div>
          <div className="order-3">
            <p>
              به نظر شما آقای چکانی که در سایت خود ۱۵۰۰ عدد محصول دارد، برای
              اعمال تخفیف روی همه محصولات فروشگاهش چقدر زمان صرف می‌کند؟
              <br />۵ ثانیه، چون با یک کلیک قیمت همه محصولات را ویرایش می‌کند!{" "}
              <br />
              <br />
              <span className="d-none d-md-block">
                پیاده‌سازی هر کدام از این قابلیت‌ها برای یک سایت هزینه و زمان
                زیادی نیاز دارد که از عهده اکثر کسب‌وکارهای کوچک و متوسط خارج
                است. استفاده از ویترین باعث کاهش چشمگیر هزینه‌های طراحی سایت شما
                می‌شود و دسترسی به فناوری‌های آنلاین برای رشد و توسعه
                کسب‌وکارتان را فراهم می‌کند. تیم ویترین کنار شماست.
              </span>
            </p>
          </div>
          <div className="order-4 d-flex justify-content-center">
            <LazyImage
              src="/images/Screenshot.svg"
              className="d-none d-md-block"
              height={290}
            />
            <LazyImage
              src="/images/Screenshot.svg"
              className="d-md-none"
              height={200}
            />
          </div>
          <div className="order-5 d-md-none">
            <p>
              پیاده‌سازی هر کدام از این قابلیت‌ها برای یک سایت هزینه و زمان
              زیادی نیاز دارد که از عهده اکثر کسب‌وکارهای کوچک و متوسط خارج است.
              استفاده از ویترین باعث کاهش چشمگیر هزینه‌های طراحی سایت شما می‌شود
              و دسترسی به فناوری‌های آنلاین برای رشد و توسعه کسب‌وکارتان را
              فراهم می‌کند. تیم ویترین کنار شماست.
            </p>
          </div>
        </div>
        <div
          className="container w-100 d-flex justify-content-center justify-content-md-start"
          style={{ maxWidth: 864, margin: "36px 0" }}
        >
          <Link passHref href={hrefButtons}>
            <Button
              style={{ borderRadius: 8, marginTop: 40 }}
              size="large"
              color="primary"
              variant="outlined"
            >
              رایگان شروع کنید
            </Button>
          </Link>
        </div>
      </div>

      <div className=" w-100 banner-three" ref={backOfVitrinRef}>
        <LazyImage
          className="d-none d-md-block"
          src="/images/Layer 1.svg"
        />
        <LazyImage
          className="d-md-none"
          src="/images/baners-20.svg"
        />
        <div className="container">
          <p>یک شرکت دانش‌بنیان همراه و پشتیبان شماست.</p>
        </div>
      </div>
      <div className="details-reports d-flex flex-column align-items-center justify-content-center">
        <div className="container content-box mb-5">
          <div className="order-1 d-flex flex-column justify-content-end">
            <p>
              هدف شرکت ویترین این است که شما برای فعالیت آنلاین مستقل
              کسب‌وکارتان، دغدغه دانش فنی و پشتیبانی از سیستم فروش آنلاین نداشته
              باشید. ویترین از دو جنبه فنی و پشتیبانی سایت به شما کمک می‌کند.
            </p>
            <div className="d-none d-md-block">
              <Link passHref href={hrefButtons}>
                <Button
                  style={{ borderRadius: 8, marginTop: 40, width: 192 }}
                  size="large"
                  color="primary"
                  variant="contained"
                >
                  با خیال راحت شروع کنید
                </Button>
              </Link>
            </div>
          </div>
          <div
            className="order-2 d-md-none container px-0"
            style={{ maxWidth: 864 }}
          >
            <p>
              <strong>تیم فنی ویترین </strong> ، ستون و سازنده زیرساخت سایت
              شماست. این تیم هر روز و هر ساعت در حال توسعه و بهبود سیستم ویترین،
              افزودن ویژگی‌های جدید و رفع باگ‌ها و مشکلات احتمالی است. ارزش
              اقدامات تیم فنی وقتی مشخص می‌شود که مشتری شما هر ساعت از شبانه‌روز
              می‌تواند بدون مشکل از سایت شما بازدید کند و سفارش خود را روی
              فروشگاه اینترنتی شما ثبت کند.
            </p>
          </div>
          <div className="order-2 d-none d-md-block">
            <LazyImage
              className="radius-8 "
              width={444}
              src="/images/vitrin-support.jpg"
            />
          </div>
          <div className="order-3 d-md-none">
            <LazyImage
              className="radius-8 "
              src="/images/vitrin-support.jpg"
            />
          </div>
        </div>

        <div className="container py-5 my-2" style={{ maxWidth: 864 }}>
          <p>
            همچنین وقتی شما یک کمپین تبلیغاتی برگزار می‌کنید، تعداد
            بازدیدکننده‌های سایت شما جهش می‌کند. اگر زیرساخت سایت شما (هاست،
            سرور و ... ) توانایی پاسخگویی به این حجم از کاربر را نداشته باشد،
            وبسایت شما از دسترس خارج شده و هزینه‌های تبلیغاتی شما سوخت می‌شود؛
            اتفاقی که در سایت‌های ویترین هرگز رخ نمی‌دهد.
            <br />
            <br />
            <span className="d-none d-md-block">
              <strong>تیم فنی ویترین </strong> ، ستون و سازنده زیرساخت سایت
              شماست. این تیم هر روز و هر ساعت در حال توسعه و بهبود سیستم ویترین،
              افزودن ویژگی‌های جدید و رفع باگ‌ها و مشکلات احتمالی است. ارزش
              اقدامات تیم فنی وقتی مشخص می‌شود که مشتری شما هر ساعت از شبانه‌روز
              می‌تواند بدون مشکل از سایت شما بازدید کند و سفارش خود را روی
              فروشگاه اینترنتی شما ثبت کند.
            </span>
          </p>
        </div>

        <div className="container content-box">
          <div className="order-md-1 order-3 py-2 px-4 card report-view d-flex flex-column justify-content-center">
            <div className=" d-flex justify-content-between align-items-center">
              <Image
                alt=""
                width={60}
                height={60}
                src="/images/RemoveRedEyeFilled.svg"
              />
              <div className="flex-1 text-center">
                <p>در یک روز</p>
                <br />
                <span>۲۱۸۴۷</span> نفر
              </div>
            </div>
            <p className="text-center big-title">
              از سایت‌هایی که با ویترین ساخته شده‌اند بازدید کردند.
            </p>
          </div>
          <div className="order-2 d-md-none w-100 d-flex justify-content-center">
            <Link passHref href={hrefButtons}>
              <Button
                style={{ borderRadius: 8 }}
                size="large"
                color="primary"
                variant="contained"
              >
                با زیرساخت قوی ویترین شروع کنید
              </Button>
            </Link>
          </div>
          <div className="order-1 order-md-2 p-4 card">
            <div className="w-100 d-flex">
              <Image alt="" width={57} height={57} src="/images/chekani.svg" />
              <div className="flex-1 mr-3 head">
                <h3>آقای چکانی</h3>
                <p className="store-title">فروشگاه ابزار اکسین</p>
              </div>
            </div>
            <div className="mt-3 pt-3">
              <Image
                alt=""
                width={34}
                height={34}
                className="align-self-start"
                src="/images/BlogHero-CreativeQuotes 1.svg"
              />
              <p className="viewpoint my-2">
                امنیت و کاربری سایت برام خیلی مهمه. خوبی سایتی که با ویترین زدم
                اینه که مشتری‌هام با کمترین کلیک می‌تونن خرید ساده و امنی انجام
                بدن.
              </p>
              <div className="d-flex justify-content-end">
                <Image
                  alt=""
                  width={34}
                  height={34}
                  src="/images/BlogHero-CreativeQuotes 2.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="d-none w-100 d-md-flex justify-content-center"
          style={{ maxWidth: 864, margin: "36px 0 12px" }}
        >
          <Link passHref href={hrefButtons}>
            <Button
              style={{ borderRadius: 8 }}
              size="large"
              color="primary"
              variant="contained"
            >
              با زیرساخت قوی ویترین شروع کنید
            </Button>
          </Link>
        </div>
        <div className="container content-box my-5">
          <div className="order-2 order-md-1 d-flex flex-column">
            <LazyImage
              className="radius-8 pb-5"
              width={336}
              height={224}
              src="/images/vitrin-support.jpg"
            />
            <LazyImage
              className="radius-8 mt-5 d-none d-md-block"
              width={335}
              height={201}
              src="/images/Component 6.svg"
            />
          </div>
          <div className="order-1 order-md-2">
            <p>
              <strong>تیم پشتیبانی </strong>
              ویترین، همراه همیشگی شما در مسیر طراحی، راه‌اندازی و مدیریت سایت
              است. مهم‌ترین خدماتی که تیم پشتیبانی به شما ارائه می‌کند، این
              موارد است:
              <br />
              <ul>
                <li>
                  آموزش و پاسخ‌گویی: علاوه بر آموزش‌های ویدئویی که در پنل مدیریت
                  سایت شما قرار دارد، تیم پشتیبانی پاسخ‌گوی سؤال‌های دیگری که
                  هنگام ساخت سایت برای شما بوجود می‌آید خواهد بود.
                </li>
                <li>
                  راه‌اندازی سایت: اگر بخواهید سایت شما از لحاظ طراحی گرافیکی و
                  محتوایی سریع‌تر و حرفه‌ای‌تر آماده شود، می‌توانید از خدمات
                  راه‌اندازی استفاده کنید.
                </li>
                <li>
                  اکانت منیجر اختصاصی: یک پشتیبان اختصاصی که به‌طور مستقیم با
                  شما در ارتباط است و در مسیر فروش آنلاین شما را همراهی می‌کند.
                  <br />
                  <br />
                  <span className="d-none d-md-block">
                    ویژگی بارز ویترین این است که ترکیبی از خدمات طراحی سایت و
                    سایت‌ساز را در اختیار شما می‌گذارد. می‌توانید خودتان سایت
                    بسازید و تمام کارهای راه‌اندازی آن را به کمک ویدئوهای آموزشی
                    انجام دهید یا اینکه در این مسیر از تیم پشتیبانی ویترین کمک
                    بگیرید.
                  </span>
                </li>
              </ul>
            </p>
          </div>
          <div className="order-4 d-md-none">
            <p>
              ویژگی بارز ویترین این است که ترکیبی از خدمات طراحی سایت و سایت‌ساز
              را در اختیار شما می‌گذارد. می‌توانید خودتان سایت بسازید و تمام
              کارهای راه‌اندازی آن را به کمک ویدئوهای آموزشی انجام دهید یا اینکه
              در این مسیر از تیم پشتیبانی ویترین کمک بگیرید.
            </p>
          </div>
          <div className="order-5 order-md-3">
            <div className="py-3 px-4 card report-view d-flex flex-column justify-content-center">
              <div className=" d-flex justify-content-between align-items-center">
                <Image
                  alt=""
                  width={60}
                  height={60}
                  src="/images/TagFacesFilled.svg"
                />
                <div className="flex-1 text-center">
                  <p>در فصل گذشته</p>
                  <br />
                  <span className="mt-1">۹۳٪</span>
                </div>
              </div>
              <p className="text-center big-title mt-2">
                از کسب‌وکارهایی که از خدمات پشتیبانی اختصاصی ویترین استفاده کرده
                بودند، سرویس خود را تمدید کرده‌اند.
              </p>
            </div>
          </div>
          <div className="order-3 p-4 order-md-4 card">
            <div className="w-100 d-flex">
              <Image alt="" width={57} height={57} src="/images/chekani.svg" />
              <div className="flex-1 mr-3 head">
                <h3>آقای چکانی</h3>
                <p className="store-title">فروشگاه ابزار اکسین</p>
              </div>
            </div>
            <div className="mt-3 pt-3">
              <Image
                alt=""
                width={34}
                height={34}
                className="align-self-start"
                src="/images/BlogHero-CreativeQuotes 1.svg"
              />
              <p className="viewpoint my-2">
                مهم‌ترین چیز واسه من پشتیبانی سایته که مجموعه ویترین خداروشکر تا
                جایی که تونستن واسه ما کم نذاشتن.
              </p>
              <div className="d-flex justify-content-end">
                <Image
                  alt=""
                  width={34}
                  height={34}
                  src="/images/BlogHero-CreativeQuotes 2.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="container w-100 d-flex justify-content-center"
          style={{ maxWidth: 864, margin: "36px 0" }}
        >
          <Link passHref href={hrefButtons}>
            <Button
              style={{ borderRadius: 8 }}
              size="large"
              color="primary"
              variant="outlined"
            >
              رایگان شروع کنید
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-100 banner-three" ref={customerRef}>
        <LazyImage
          className="d-none d-md-block"
          src="/images/baners-21 (2).svg"
        />
        <LazyImage
          className="d-md-none"
          src="/images/baners-14.svg"
        />

        <div className="container">
          <p>کسب‌وکارهایی مشابه شما به ویترین اعتماد دارند</p>
        </div>
      </div>
      <div className=" details-reports d-flex flex-column align-items-center justify-content-center">
        <p
          className="container text-right"
          style={{
            fontSize: 16,
            maxWidth: 864,
          }}
        >
          ویترین تا امروز مورد اعتماد بیش از ۱۰۰۰ برند مختلف بوده است که وبسایت
          و سیستم فروش آنلاین خود را به کمک ویترین راه‌اندازی کرده‌اند.
        </p>
        <div style={{ maxWidth: 864, overflowX: "hidden" }}>
          <div className="d-flex slide-logos-two mt-4">
            {CUSTOMERS.map((item) => (
              <div
                className=" position-relative d-flex m-2 p-1"
                key={item}
                style={{
                  borderRadius: 16,
                }}
              >
                <Image
                  unoptimized
                  priority
                  width={60}
                  height={60}
                  src={item}
                  layout="fixed"
                  alt="customer"
                  className="logo-img"
                />
              </div>
            ))}
          </div>
        </div>
        <p className="container mt-4" style={{ maxWidth: 864 }}>
          فرقی نمی‌کند کسب‌وکار شما در چه صنفی فعال باشد؛ از رستوران و پزشک
          گرفته تا آرایشگاه و هر نوع فروشگاه اینترنتی، می‌توانید با ویترین نتیجه
          بگیرید.
        </p>
        <div className="container cotegoties-container pb-4">
          {categories.map((category, index) =>
            index <= 5 ? (
              <div
                className="category-card d-flex position-relative"
                key={category.id}
              >
                <Image alt="" width={36} height={36} src={category.image} />
                <div className="mr-4 pr-2">
                  <p className="title"> {category.title}</p>
                  <p>{category.description}</p>
                </div>
                {index == 5 && !isOpenCollapses && (
                  <div
                    className="position-absolute d-flex justify-content-center align-items-center"
                    style={{
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(255, 255, 255, 0.31) 0%, rgba(245, 249, 255, 0.88) 29.69%, #F0F5FF 82.29%)",
                    }}
                  >
                    <button
                      style={{ color: "#0050FF" }}
                      onClick={() => setIsOpenCollapses(true)}
                    >
                      مشاهده بیشتر
                    </button>
                  </div>
                )}
              </div>
            ) : null
          )}
        </div>
        <div
          className="container d-flex justify-content-center"
          style={{ maxWidth: 864 }}
        >
          <Collapse className="w-100" isOpened={isOpenCollapses}>
            <div className="w-100 cotegoties-container mt-0 pb-5">
              {categories.map((category, index) =>
                index > 5 ? (
                  <div
                    className="category-card d-flex position-relative"
                    key={category.id}
                  >
                    <Image alt="" width={36} height={36} src={category.image} />
                    <div className="mr-4 pr-2">
                      <p className="title"> {category.title}</p>
                      <p>{category.description}</p>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </Collapse>
        </div>

        <div
          className="w-100 d-flex justify-content-center"
          style={{ maxWidth: 864, margin: "48px 0" }}
        >
          <Link passHref href={hrefButtons}>
            <Button
              style={{ borderRadius: 8, height: 42 }}
              size="large"
              color="primary"
              variant="contained"
            >
              سایت مناسب صنف خودتان را داشته باشید{" "}
            </Button>
          </Link>
        </div>
        <div className="w-100 container" style={{ maxWidth: 864 }}>
          <div className="d-flex flex-column flex-md-row mt-2 ">
            <div className="flex-1 p-4 card ml-md-5 mb-5 mb-md-0">
              <div className="w-100 d-flex">
                <Image
                  alt=""
                  width={57}
                  height={57}
                  src="/images/nikravesh.svg"
                />
                <div className="flex-1 mr-3 head">
                  <h3>آقای نیک‌روش</h3>
                  <p className="store-title">هایپر میوه میوان</p>
                </div>
              </div>
              <div className="mt-3 pt-3">
                <Image
                  alt=""
                  width={34}
                  height={34}
                  className="align-self-start"
                  src="/images/BlogHero-CreativeQuotes 1.svg"
                />
                <p className="viewpoint my-2">
                  ویترین رو به همه دوستانم در صنف‌های مختلف پیشنهاد می‌کنم چون
                  در این مدت از حسن‌نیت‌شون واقعا احساس آرامش کردم.
                </p>
                <div className="d-flex justify-content-end">
                  <Image
                    alt=""
                    width={34}
                    height={34}
                    src="/images/BlogHero-CreativeQuotes 2.svg"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 p-4 card mr-md-5 my-5 my-md-0">
              <div className="w-100 d-flex">
                <Image
                  alt=""
                  width={57}
                  height={57}
                  src="/images/sobhani.svg"
                />
                <div className="flex-1 mr-3 head">
                  <h3>آقای سبحانی</h3>
                  <p className="store-title">فروشگاه پتکال</p>
                </div>
              </div>
              <div className="mt-3 pt-3">
                <Image
                  alt=""
                  width={34}
                  height={34}
                  className="align-self-start"
                  src="/images/BlogHero-CreativeQuotes 1.svg"
                />
                <p className="viewpoint my-2">
                  مزیت ویترین مسئولیت‌پذیر بودنشونه. یعنی اینکه به مشتری اهمیت
                  می‌دن. از ویترین یاد گرفتم که باید حواست به مشتری‌ت باشه تا
                  بفهمه واست مهمه.
                </p>
                <div className="d-flex justify-content-end">
                  <Image
                    alt=""
                    width={34}
                    height={34}
                    src="/images/BlogHero-CreativeQuotes 2.svg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row align-items-center my-md-5 pt-5">
            <div className="flex-1">
              <p className="pl-md-5 ml-md-4">
                تهران نیستید؟ فرقی ندارد ساکن کدام منطقه هستید. ویترین در تمام
                ایران آماده همکاری با شماست و می‌توانید به پشتیبانی و آموزش‌های
                ویترین به صورت آنلاین دسترسی داشته باشید. ببینید کسب‌وکارها در
                کدام شهرها از ویترین استفاده کرده‌اند.
              </p>
            </div>
            <Image alt="" width={336} height={306} src="/images/iran.svg" />
          </div>
          <div className="d-flex flex-column flex-md-row  my-md-5 py-md-5 align-items-center">
            <h3 className="py-5 my-5 my-md-0 py-md-0  flex-1">
              هر روز کسب‌وکارهای بیشتری همراه ویترین می‌شوند تا بتوانند فعالیت
              کسب‌وکار خود را در اینترنت به نتیجه برسانند.
            </h3>
            <div className="mx-md-5" style={{ width: 310 }}>
              <div className="py-3 px-4 card report-view d-flex flex-column justify-content-center">
                <div className=" d-flex justify-content-between align-items-center">
                  <Image
                    alt=""
                    width={60}
                    height={60}
                    src="/images/AddReactionFilled.svg"
                  />
                  <div className="flex-1 text-center">
                    <p> در ماه گذشته</p>
                    <br />
                    <span>۱۱۲</span>
                  </div>
                </div>
                <p className="text-center big-title mt-2">
                  کسب‌و‌کار جدید به کمک ویترین، فروش آنلاین خود را اضافه کردند
                </p>
              </div>
            </div>
          </div>
          <h2 className="text-center">
            جای شما خالی است. با ویترین همراه شوید.
          </h2>
          <div
            className="w-100 d-flex justify-content-center"
            style={{ maxWidth: 864, margin: "48px 0" }}
          >
            <Link passHref href={hrefButtons}>
              <Button
                style={{ borderRadius: 8, width: 188, height: 42 }}
                size="large"
                color="primary"
                variant="contained"
              >
                همراه می‌شوم
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ReportsPage);
