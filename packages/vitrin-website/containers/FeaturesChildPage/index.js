import { useState, useRef } from "react";
import Header from "containers/Header/index";
import LazyImage from "components/LazyImage";
import { Button } from "@material-ui/core";
import Link from "next/link";
import FreeConsultationModal from "containers/FreeConsultationModal";

const FeaturesChildPage = () => {
  const [isOpenConsultationModal, setIsOpenConsultationModal] = useState(false);

  return (
    <div className="w-100 position-relative">
      <Header isTransparent />
      <div className="feature-child-page-banner">
        <div className="container d-flex flex-column-reverse flex-md-row justify-content-between align-items-center">
          <div className="col-md-5 p-0 d-flex flex-column d-md-block align-items-center ">
            <p className="title">
              طراحی سایت
              <br />
              بدون کدنویسی
            </p>
            <p className="description">
              وقتی می‌توانید در کمترین زمان و بدون کدنویسی سایت خودتان را طراحی
              کنید، چرا سریع‌تر دست به کار نشوید؟ برای کار با سایت ساز ویترین
              نیازی به دانستن هیچ زبان برنامه‌نویسی ندارید!
            </p>

            <div className="buttons w-100 d-flex flex-column flex-md-row justify-content-between pl-md-5 align-items-center">
              <Link passHref href="/cr~templates">
                <Button
                  variant="ontlined"
                  color="primary"
                  style={{ color: "#fff", border: "1px solid #fff" }}
                >
                  <span> بدون کد‌نویسی سایت بسازید </span>
                </Button>
              </Link>
            </div>
          </div>
          <LazyImage src="/images/undraw_investor_update.svg" />
        </div>
      </div>
      <div className="features-page-child p-5 d-flex justify-content-center position-relative">
        <div className="content-child">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div>
              <h1 className="p-4">مزایای ساخت سایت بدون کدنویسی چیست؟</h1>
              <p className="pr-4 mt-md-4">
                طراحی سایت هم مثل هر تخصص دیگری نیاز به صرف وقت و هزینه دارد اما
                طراحی سایت بدون کدنویسی می‌تواند مزایای زیادی برای کسب‌وکار شما
                به همراه داشته باشد.
              </p>
            </div>
            <LazyImage
              className="content-image mt-5 mt-md-0"
              src="/images/persons.svg"
            />
          </div>
          <div className="pt-5 mt-md-4">
            <h1 className="p-4">در زمان صرفه‌جویی کنید</h1>
            <p className="pr-4 mt-md-4">
              با ویترین می‌توانید به‌سرعت سایت بسازید! به کمک ابزارهای ویترین،
              زمانی را که باید برای یادگیری برنامه‌نویسی وب بگذارید به شدت کاهش
              می‌دهید. همچنین برای افزودن صفحه‌ها و محصولات مختلف به سایت، نیاز
              به دانش پیچیده‌ای ندارید. کافیست چند مرحله ساده را طی کنید تا
              وبسایت شما آماده شود و محتوای دلخواه خود را در سایت بارگذاری کنید.
            </p>
          </div>
          <div className="pt-5 mt-md-5">
            <h1 className="p-4">هزینه‌های خود را کاهش دهید</h1>
            <p className="pr-4 mt-md-4">
              اگر بخواهید از دانش و تجربه متخصصان برنامه‌نویسی برای طراحی سایت
              خودتان استفاده کنید، طبیعتا باید هزینه آن را هم بپردازید. با
              ویترین می‌توانید هزینه‌های تأسیس یک سایت فروشگاهی یا معرفی را به
              شدت کاهش دهید. راهکارهای آزموده‌شده برای فروش آنلاین در اختیار
              شماست و دیگر نیاز نیست برای بهینه کردن هر جزء از سایت خودتان،
              متخصص جداگانه‌ای استخدام کنید.
            </p>
          </div>
          <div className="pt-5 mt-md-5">
            <h1 className="p-4">به سلیقه خودتان طراحی کنید</h1>
            <p className="pr-4 mt-md-4">
              سپردن کار طراحی سایت به افراد گوناگون معمولا باعث می‌شود که شما
              برای هر تغییر حتی جزئی در سایت خودتان، دست به دامن شخصی شوید که آن
              بخش از سایت را طراحی کرده است. شما در ویترین کنترل کامل سایت خود
              را در اختیار دارید و می‌توانید ظاهر و محتوای هر صفحه را مطابق میل
              خود تغییر دهید، در عین حال نگران به‌هم‌ریختگی سایت هم نیستید.
            </p>
          </div>
          <div className="w-100 d-flex justify-content-center pt-5 mt-md-5">
            <div className="w-100 card mt-2">
              <h1>ساخت سایت بدون کدنویسی برای شما مفید است اگر:</h1>
              <ul>
                <li>دانش برنامه‌نویسی ندارید.</li>
                <li>کسب‌وکاری دارید و سرتان شلوغ است.</li>
                <li>می‌خواهید سریعا یک سایت داشته باشید.</li>
                <li>می‌خواهید هزینه طراحی سایت را کاهش دهید.</li>
                <li>می‌خواهید مدیریت سایت شما به سلیقه خودتان باشد.</li>
                <li>می‌خواهید یک سیستم فروش آنلاین بی‌دردسر داشته باشید.</li>
              </ul>
              <Link passHref href="/cr~templates">
                <button className="mt-4">رایگان شروع کنید</button>
              </Link>
            </div>
          </div>

          <div className="pt-5 mt-md-5">
            <h1 className="p-4">آموزش رایگان طراحی سایت بدون کدنویسی!</h1>
            <p className="pr-4 mt-4">
              دوست دارید یک آموزش کاملا رایگان برای ساخت سایت بدون نیاز به دانش
              برنامه‌نویسی ببینید؟!
              <br />
              <br />
              می‌دانستید حتی بدون آموزش و فقط در ۵ دقیقه می‌توانید سایت خودتان
              را بدون یک خط کدنویسی بسازید؟! حتما شما هم با انواع دوره‌ها و
              پکیج‌های طراحی سایت برخورد کرده‌اید. آموزش در اکثر این دوره‌ها به
              وردپرس محدود می‌شود و برای هر دوره، قیمت‌های بالایی هم قرار داده
              شده است.
              <br />
              <br />
              طراحی سایت با ویترین آنقدر ساده است که باورتان نمی‌شود! با ویترین
              می‌توانید بدون داشتن دانش برنامه‌نویسی، برای سایت خودتان صفحات
              مختلف بسازید! اگر تا حالا با آموزش‌های مختلفی برای طراحی و ساخت
              سایت روبه‌رو شده‌اید، حتما از کارکردن با ویترین لذت می‌برید چون در
              ویترین خبری از آموزش‌های بلندبالا نیست چون مراحل ساخت سایت در
              ویترین کمتر از دو دقیقه طی می‌شود!
            </p>
          </div>
          <div className="d-flex justify-content-center mt-4 pt-4">
            <LazyImage
              src="/images/Screenshot.svg"
              className="mt-4 laptop-image"
            />
          </div>
          <div className="w-100 d-flex justify-content-center py-5 my-md-5">
            <div className="w-100 card my-2">
              <h1>چطور بدون کدنویسی سایت بسازیم؟</h1>
              <p>
                سریع‌ترین و ساده‌ترین راه ساخت سایت بدون کدنویسی، استفاده از
                سایت‌ساز ویترین است! کافی است از طریق دکمه زیر، طراحی سایت
                خودتان را رایگان شروع کنید.
              </p>
              <Link passHref href="/cr~templates">
                <button className="mt-4">رایگان شروع کنید</button>
              </Link>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-md-4">
            <div className="mt-md-4 pt-md-4">
              <h1 className="p-4">
                چه راه‌هایی برای طراحی سایت بدون کدنویسی وجود دارد؟
              </h1>
              <p className="pr-4 mt-md-4">
                اگر امروز بخواهید سایت خود را طراحی کنید، سه روش اصلی برای این
                کار در اختیار شما خواهد بود:
              </p>
            </div>
            <LazyImage
              className="d-none d-md-block content-image"
              width={373}
              src="/images/persons.svg"
            />
          </div>
          <div className="pt-5 mt-md-5">
            <h1 className="p-4">۱. طراحی سایت از پایه (با کدنویسی)</h1>
            <p className="pr-4 mt-md-4">
              طراحی سایت با زبان‌های برنامه‌نویسی، روشی پیچیده و زمان‌بر است و
              شما به‌عنوان صاحب یک کسب‌وکار یا باید دانش برنامه‌نویسی داشته
              باشید یا مبالغ زیادی را برای استخدام برنامه‌نویس هزینه کنید. با
              اینکه روش کدنویسی از پایه می‌تواند برای کسب‌وکارهای جاافتاده و
              بزرگ مناسب باشد، اما به دلیل اینکه زمان‌بر و پرهزینه است، برای
              کسب‌وکارهای کوچک و متوسط و افرادی که به دنبال راه‌اندازی کسب‌وکار
              اینترنتی هستند مناسب نیست. همچنین برای مدیریت و پشتیبانی سایت هم
              دردسرهای خاص خودش را دارد.
            </p>
          </div>
          <div className="pt-5 mt-md-5">
            <h1 className="p-4">۲. نرم‌افزارهای طراحی سایت</h1>
            <p className="pr-4 mt-md-4">
              روش بعدی که قدری راحت‌تر است، استفاده از نرم‌افزارهای طراحی سایت
              مثل Dreamweaver است. این نرم‌افزارها که بعضا به اسم برنامه طراحی
              سایت بدون کدنویسی هم شناخته می‌شوند از یک راطب کاربری گرافیکی بهره
              می‌برند که با استفاده از آن می‌توانید تغییراتی که در کد سایت
              می‌دهید را به‌صورت بصری مشاهده کنید. با اینکه استفاده از این
              برنامه‌های طراحی سایت، بدون برنامه‌نویسی هم ممکن است اما شما به
              عنوان طراح سایت، حتما باید از زبان‌های برنامه‌نویسی وب سررشته
              داشته باشید.
            </p>
          </div>
          <div className="pt-5 mt-md-5">
            <h1 className="p-4">۳. سیستم‌های مدیریت محتوا</h1>
            <p className="pr-4 mt-md-4">
              راه دیگر برای طراحی سایت، استفاده از سیستم‌های مدیریت محتوا (CMS)
              مانند وردپرس است. مشابه نرم‌افزارهایی که در بالا توضیح دادیم، به
              کمک سیستم‌های مدیریت محتوا می‌توانید سایت خود را بسازید با این
              تفاوت که همه‌چیز آنلاین انجام می‌شود و میزان اتکای شما به کدنویسی
              باز هم کمتر می شود. در کنار مزایای خوبی که وردپرس دارد،
              محدودیت‌هایی مانند عدم پشتیبانی انسانی، نیاز به دانش حداقلی
              برنامه‌نویسی برای نصب هسته وردپرس، قالب‌ها، افزونه‌ها و راه‌اندازی
              سرور و هاست هم‌چنان پابرجاست.
            </p>
          </div>
          <div className="pt-5 mt-md-5">
            <h1 className="p-4">۴. سایت‌ساز و فروشگاه‌ساز</h1>
            <p className="pr-4 mt-md-4">
              سایت‌سازها تحول بزرگی را در حوزه ساخت سایت بدون برنامه‌نویسی
              به‌وجود آورد. افراد مختلف و صاحبان کسب‌وکار می‌توانند طراحی سایت
              خود را بدون نیاز به کدنویسی انجام دهند و به‌سادگی سایت خود را در
              چند دقیقه بسازند. در ادامه هم تمام انرژی و وقت خود را صرف گسترش
              کسب‌وکار و فروش خود کنند نه کار با زبان‌های برنامه‌نویسی.
              <br />
              <br />
              سایت‌ساز ویترین یکی از بهترین سایت‌سازهای ایرانی به‌حساب می‌آید که
              امکان طراحی و ساخت سایت بدون کدنویسی را برای شما فراهم می‌کند. آن
              هم نه یک سایت ساده و پیش‌پا افتاده، بلکه سایتی با طراحی جذاب،
              واکنش‌گرا، مطابق اصول سئو و تمام ویژگی‌های مورد نیاز در یک فروشگاه
              اینترنتی حرفه‌ای. کدهای سایت شما در ویترین توسط یک تیم حرفه‌ای
              نوشته شده و علاوه بر آن همواره در حال به‌روزرسانی است.
              <br />
              <br />
              تنها چیزی که برای طراحی سایت بدون کدنویسی با ویترین نیاز دارید یک
              گوشی است و بس!
            </p>
          </div>
          <div className="w-100 d-flex justify-content-center pt-5 mt-md-5">
            <div className="w-100 card mt-2">
              <div className="d-flex">
                <LazyImage
                  src="/images/pak-market.svg"
                  width={48}
                  height={48}
                />{" "}
                <h1 className="mr-4">
                  فروشگاه <span>پاک مارکت</span> ، سایت خود را بدون کدنویسی
                  طراحی کرده است.
                </h1>
              </div>

              <p>
                این کسب‌وکار سوپرمارکتی، انواع اقلام پروتئینی، خوراکی و شوینده
                را ارائه می‌کند. پاک مارکت برای شروع فروش آنلاین مستقل خود نیاز
                به یک سیستم فروش آنلاین داشت و به کمک فروشگاه‌ساز ویترین توانست
                یک فروشگاه اینترنتی حرفه‌ای را بدون نیاز به دانش برنامه‌نویسی
                طراحی کند.
              </p>
              <Link passHref href="/cr~templates">
                <button className="mt-4">رایگان شروع کنید</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="content-box  d-none d-md-flex flex-column align-items-center justify-content-center">
          <p>
            دوست دارید <br />
            امکانات ویترین را <br />
            در عمل ببینید؟
          </p>
          <Link passHref href="/cr~templates">
            <Button variant="contained" color="primary">
              ۱۴ روز تست رایگان
            </Button>
          </Link>
        </div>
      </div>
      <div className="feature-page-footer d-flex flex-column align-items-center ">
        <p>وبسایت یا فروشگاه اینترنتی کسب‌وکار خود را با ویترین بسازید.</p>
        <div className="w-100 d-flex justify-content-center buttons p-4">
          <Button className="text-center primary-btn">
            <Link passHref href="/cr~templates">
              رایگان شروع کنید
            </Link>
          </Button>
          <Button
            className="text-center secondary-btn"
            onClick={() => setIsOpenConsultationModal(true)}
          >
            درخواست مشاوره
          </Button>
        </div>
        <FreeConsultationModal
          isOpen={isOpenConsultationModal}
          onClose={() => setIsOpenConsultationModal(false)}
        />
      </div>
    </div>
  );
};
export default FeaturesChildPage;
