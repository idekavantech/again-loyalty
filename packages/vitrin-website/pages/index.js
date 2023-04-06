import LandingPage from "containers/LandingPage";
import Head from "next/head";
export default function Login() {
  return (
    <div>
      <Head>
        <title>
          ویترین:‌ طراحی سایت | ساخت سایت رایگان 15 روز | آموزش | Vitrin
        </title>
        <meta
          name="description"
          content="طراحی وب سایت حرفه‌ای | ساخت سایت | ویترین | آموزش - ضمانت بازگشت وجه - صفحه ساز و قالب‌های متنوع - SEO پیشرفته - امنیت بالا - درگاه اختصاصی | خرداد 1401"
        />
        <meta
          property="og:title"
          content="ویترین:‌ طراحی سایت | ساخت سایت رایگان 15 روز | آموزش | Vitrin"
        />
        <meta
          property="og:description"
          content="طراحی وب سایت حرفه‌ای | ساخت سایت | ویترین | آموزش - ضمانت بازگشت وجه - صفحه ساز و قالب‌های متنوع - SEO پیشرفته - امنیت بالا - درگاه اختصاصی | خرداد 1401"
        />
        <meta
          name="twitter:title"
          content="ویترین:‌ طراحی سایت | ساخت سایت رایگان 15 روز | آموزش | Vitrin"
        />
        <meta
          property="twitter:description"
          content="طراحی وب سایت حرفه‌ای | ساخت سایت | ویترین | آموزش - ضمانت بازگشت وجه - صفحه ساز و قالب‌های متنوع - SEO پیشرفته - امنیت بالا - درگاه اختصاصی | خرداد 1401"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Vitrin.me | ویترین",
              image:
                "https://hs3-cf.behtarino.com/media/profile_images/06logo.png",
              "@id": "https://vitrin.me/",
              url: "https://vitrin.me/",
              telephone: "+982191070751",
              priceRange: "IR",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "خیابان حبیب اله، بالاتر از میدان حسن حسینی، پلاک ۵۶، ایستگاه نوآوری شریف, شرکت ایده کاوان سرآمد سیستم",
                addressLocality: "تهران",
                postalCode: "1455714138",
                addressCountry: "IR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 35.7067457,
                longitude: 51.3554142,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "08:00",
                closes: "18:00",
              },
              sameAs: [
                "https://www.instagram.com/vitrin.me/",
                "https://www.youtube.com/channel/UCPJ0igq_Ox4K1-iym7j0lSw/",
                "https://www.linkedin.com/company/vitrin-me/",
                "https://vitrin.me/",
                "https://twitter.com/vitrin_me",
              ],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "چرا استفاده از ویترین ارزون‌تر از طراحی سایت اختصاصی هست؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "طراحی سایت با ویترین ارزون‌تر از استخدام یه طراح سایت هست چون قبلا کدنویسی سایت توسط تیم ویترین انجام شده. در واقع ویترین ترکیبی از طراحی سایت و سایت ساز هست که شما می‌تونید با استفاده از اون در کمتر از ۵ دقیقه برای خودتون یه سایت بسازید و برای این کار نیاز به دانش برنامه‌نویسی ندارید. ظاهر و محتوای سایت شما کاملا قابل ویرایشه و شما می‌تونید بدون نگرانی‌های فنی، سایت خودتون رو مدیریت کنید.",
                  },
                },
                {
                  "@type": "Question",
                  name: "طراحی سایت با ویترین چقدر طول می‌کشه؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "کمتر از ۵ دقیقه! زیرساخت ویترین از قبل آماده شده و شما با انتخاب یه قالب سایت و تنظیمات اصلی کسب‌وکارتون، سایت خودتون رو راه‌اندازی می‌کنید. در ادامه می‌تونید تمام جزئیات ظاهری و محتوایی سایت رو طبق سلیقه خودتون تغییر بدید. این کار بسته به مهارت شما و حجم محتوای سایت ممکنه چند روز طول بکشه. طراحی فروشگاه اینترنتی هم به دلیل اینکه نیاز به وارد کردن محصولات فروشگاه داره، بیشتر طول می‌کشه.",
                  },
                },
                {
                  "@type": "Question",
                  name: "سایت قبلی خودم رو می‌تونم بیارم روی ویترین؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "ویترین یه سرویس طراحی سایت و فروشگاه ساز هست که هاست و سرور ابری مخصوص به خودش رو داره. به این دلیل امکان انتقال کدهای سایت دیگه‌ای که قبلا داشتید به سرویس ویترین وجود نداره.",
                  },
                },
                {
                  "@type": "Question",
                  name: "آیا ویترین می‌تونه سایت‌های سفارشی طراحی کنه؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "بله! ویترین یه سایت ساز بسیار منعطفه که می‌تونید باهاش انواع سایت‌های فروشگاهی یا معرفی کسب‌وکار رو بسازید. برای مشاهده قیمت طراحی سایت و سفارش طراحی سایت به صفحه تعرفه‌ها مراجعه کنید. اگه نیازمندی خودتون رو در امکانات بسته‌های ویترین پیدا نکردید، از طریق همون صفحه می‌تونید برای یه جلسه مشاوره با ویترین اقدام کنید.",
                  },
                },
              ],
            }),
          }}
        />
      </Head>
      <LandingPage />
    </div>
  );
}
