import WebsiteBuilderPage from "containers/websiteBuilderPage";
import Head from "next/head";
export default function Login() {
  return (
    <div>
      <Head>
        <title>سایت ساز ویترین | با تکنولوژی I.O.M سایت بسازید! | Vitrin</title>
        <meta
          name="description"
          content="ساخت سایت با گوشی و 100% بدون کدنویسی! تکنولوژی I.O.M سایت ساز ویترین در اختیار شماست تا سایت یا فروشگاه حرفه ای خود را در کتر از 5 دقیقه بسازید!"
        />
        <meta
          property="og:title"
          content="ساخت سایت با گوشی و 100% بدون کدنویسی! تکنولوژی I.O.M سایت ساز ویترین در اختیار شماست تا سایت یا فروشگاه حرفه ای خود را در کتر از 5 دقیقه بسازید!"
        />
        <meta
          property="og:description"
          content="ساخت سایت با گوشی و 100% بدون کدنویسی! تکنولوژی I.O.M سایت ساز ویترین در اختیار شماست تا سایت یا فروشگاه حرفه ای خود را در کتر از 5 دقیقه بسازید!"
        />
        <meta
          name="twitter:title"
          content="سایت ساز ویترین | با تکنولوژی I.O.M سایت بسازید! | Vitrin"
        />
        <meta
          property="twitter:description"
          content="ساخت سایت با گوشی و 100% بدون کدنویسی! تکنولوژی I.O.M سایت ساز ویترین در اختیار شماست تا سایت یا فروشگاه حرفه ای خود را در کتر از 5 دقیقه بسازید!"
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
                  name: "سایت ساز ویترین می‌تونه برای فروشگاه‌های اینستاگرامی هم مفید باشه؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "بله! با ویترین می‌تونید یه سایت فروشگاهی برای خودتون بسازید و فروش آنلاینی که از اینستاگرام دارید رو از طریق سایت خودتون انجام بدید و دیگه دردسرهایی مثل پیگیری پرداخت مشتری، کنترل موجودی محصولات و موارد زمان‌بر مشابه رو نداشته باشید. یکبار تنظیمات سفارش‌گیری سایت رو انجام می‌دید و از اون به بعد مشتری‌های پیج شما از طریق لینک فروشگاه شما که در بیو پیجتون می‌ذارید، وارد سایت شما می‌شن و خریدشون رو با حداکثر سرعت انجام می‌دن. این یعنی فروش بیشتر و راحت‌تر برای شما!",
                  },
                },
                {
                  "@type": "Question",
                  name: "می‌شه با ویترین سایتی ساخت که فروش آنلاین نداشته باشه؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "بله! با ویترین می‌تونید سایت‌های غیر فروشگاهی (که بهشون می‌گیم سایت معرفی) هم بسازید. البته مزیت و تخصص ویترین در ساخت سایت فروشگاهی و کمک به افزایش فروش آنلاین هست. شما می‌تونید با سایت ساز ویترین، اول یه سایت معرفی بسازید و بعد اگه خواستید اون رو به یه فروشگاه اینترنتی حرفه‌ای ارتقا بدید.",
                  },
                },
                {
                  "@type": "Question",
                  name: "ساخت سایت با ویترین چقدر هزینه داره؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "قیمت بسته‌های مختلف سایت ساز ویترین رو می‌تونید در صفحهٔ تعرفه ببینید. بسته‌ها طبق تجربهٔ تیم ما از ساختن سایت‌های مختلف برای کسب‌وکارها و متناسب با نیاز اون‌ها تنظیم شده. این رو هم بگیم که به مدت ۱۴ روز و به رایگان می‌تونید از تمام امکانات ویترین استفاده کنید و بعد از تست، بستهٔ مورد نظرتون رو انتخاب کنید.",
                  },
                },
                {
                  "@type": "Question",
                  name: "بدون دانش برنامه نویسی می‌شه سایت ساخت؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `مزیت سایت ساز ویترین اینه که شما می‌تونید به راحتی و بدون کدنویسی سایت خودتون رو بسازید! ساختن سایت هیچ وقت به این راحتی و سرعت نبوده! کافیه در ویترین ثبت نام کنید و به سرعت سایت خودتون رو بسازید.
            صفحهٔ راهنمای ویترین می‌تونه پرسش‌هایی که ممکنه براتون پیش بیاد رو پاسخ بده. همچنین در بلاگ ویترین، برای شما آموزش‌های کاربردی دیگه‌ای در مورد فروش آنلاین و مدیریت فروشگاه اینترنتی قرار داده‌یم.`,
                  },
                },
                {
                  "@type": "Question",
                  name: "آیا برای سایتی که با ویترین ساختم باید هاست و دامنه هم بخرم؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "وقتی با سایت ساز ویترین سایت خودتون رو می‌سازید، به صورت خودکار یه هاست قوی هم به شما اختصاص پیدا می‌کنه و نیازی نیست به فکر هاست جداگانه باشید. همچنین برای راحتی کار شما، یه دامنهٔ رایگان ir.ink هم در حین ثبت نام برای سایت شما در نظر گرفته می‌شه که به عنوان آدرس سایت شما استفاده می‌شه. هر وقت خواستید می‌تونید دامنهٔ دیگه‌ای رو به سایت خودتون وصل کنید.",
                  },
                },
                {
                  "@type": "Question",
                  name: "اگه برای سایتم نیاز به سئو یا تبلیغات داشتم چکار کنم؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "چون کار با سایت ساز ویترین خیلی آسونه، شما می‌تونید آموزش سئو با ویترین رو بخونید و خودتون مقدار زیادی از سئوی سایتی که ساختید رو پیش بببرید. برای مشاورهٔ بازاریابی یا تبلیغات هم می‌تونید با ما تماس بگیرید تا شما رو راهنمایی کنیم.",
                  },
                },
                {
                  "@type": "Question",
                  name: "آیا ویترین اپلیکیشن هم طراحی می‌کنه؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "همهٔ سایت‌هایی که با ویترین ساخته می‌شن، یه وب‌اپلیکیشن رایگان (PWA) هم دارن که کاملا با سایت هماهنگه و روی هر نوع گوشی هوشمند نصب می‌شه. به‌علاوه، سایت ساز ویترین از طراحی واکنشگرا (Responsive) هم استفاده می‌کنه که باعث می‌شه همهٔ صفحات سایت شما روی صفحه نمایش گوشی هم خوب دیده بشن. در نتیجه بابت کاربرهای گوشی به دست نگران نباشید!",
                  },
                },
                {
                  "@type": "Question",
                  name: "چطور می‌تونم با ویترین، سایت خاص‌تری بسازم؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "ما همیشه در حال توسعهٔ قابلیت‌های سایت ساز ویترین هستیم. اگه قابلیت خاصی مد نظر دارید که الان در سایتی که ساختید در دسترس نیست، لطفا با ما تماس بگیرید تا دربارهٔ نیازمندی شما صحبت کنیم.",
                  },
                },
              ],
            }),
          }}
        />
      </Head>
      <WebsiteBuilderPage />
    </div>
  );
}
