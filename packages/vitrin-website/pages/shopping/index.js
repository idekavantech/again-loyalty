import ShoppingPage from "containers/ShoppingPage";
import Head from "next/head";
export default function Login() {
  return (
    <div>
      <Head>
        <title>طراحی سایت فروشگاهی | تا 200% بیشتر بفروشید | Vitrin</title>
        <meta
          name="description"
          content="طراحی سایت فروشگاهی با ویترین | به کمک تکنولوژی I.O.M فروش آنلاین خود را تا 200% بیشتر و عملیات فروشگاه اینترنتی خود را یکپارچه کنید."
        />
        <meta
          property="og:title"
          content="طراحی سایت فروشگاهی | تا 200% بیشتر بفروشید | Vitrin"
        />
        <meta
          property="og:description"
          content="طراحی سایت فروشگاهی با ویترین | به کمک تکنولوژی I.O.M فروش آنلاین خود را تا 200% بیشتر و عملیات فروشگاه اینترنتی خود را یکپارچه کنید."
        />
        <meta
          name="twitter:title"
          content="طراحی سایت فروشگاهی | تا 200% بیشتر بفروشید | Vitrin"
        />
        <meta
          property="twitter:description"
          content="طراحی سایت فروشگاهی با ویترین | به کمک تکنولوژی I.O.M فروش آنلاین خود را تا 200% بیشتر و عملیات فروشگاه اینترنتی خود را یکپارچه کنید."
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
                  name: "ویترین دقیقاً چه کمکی به فروش آنلاین من می‌کنه؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `شما در ویترین با طراحی سایت فروشگاهی، ۴ امکان زیر رو به دست میارید:
                  ۱. یه سایت فروشگاهی به عنوان شعبهٔ آنلاین فروشگاهتون که  مدیریتش دست خودتونه. درست مثل یه خط تلفن، ولی در اینترنت!
                  ۲. ترغیب مشتری‌هاتون به خرید دوباره از فروشگاه شما. این کار به کمک ابزارهای اتوماسیون بازاریابی ویترین قابل انجامه.
                  ۳. راحت‌تر کردن عملیات فروشگاه اینترنتی تا برای کارهایی مثل مدیریت انبار و محصولات زمان کمتری صرف کنید.
                  ۴. و یکپارچه کردن همهٔ کانال‌های فروش شما بطوریکه بتونید خریدهای حضوری و آنلاین در سایت فروشگاهتون رو کنار هم داشته باشید و گزارش‌های جامعی از فروشتون بگیرید.`,
                  },
                },
                {
                  "@type": "Question",
                  name: "قیمت طراحی سایت فروشگاهی با ویترین چقدره؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `در ویترین بسته‌های قیمتی مختلفی داریم که می‌تونید بسته به نیاز و نوع کسب‌وکار خودتون یکی رو انتخاب کنید. برای دیدن جزئیات قیمت‌ها می‌تونید به صفحهٔ تعرفه مراجعه کنید و طراحی سایت فروشگاهی خودتون رو شروع کنید.
                  همهٔ بسته‌ها دارای یه دورهٔ تست رایگان ۱۴ روزه هستن تا در این مدت بتونید با امکانات ویترین آشنا بشید. شما همیشه می‌تونید با یه پکیج پایه شروع کنید و بعداً سایتتون رو به بسته‌های بالاتر ارتقا بدید.`,
                  },
                },
                {
                  "@type": "Question",
                  name: "برای طراحی سایت فروشگاهی با ویترین نیازه با کدنویسی آشنا باشم؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `شما برای طراحی سایت فروشگاهی با ویترین، نیازی به کدنویسی ندارید! تمام مراحل طراحی فروشگاه اینترنتی شما به صورت کاملا ساده و با زبان فارسی توضیح داده شده. برای استفاده از قسمت‌های مختلف صفحه ساز ویترین هم می‌تونید از آموزش‌های ویدئویی که در پنل مدیریت سایتتون گذاشته شده استفاده کنید.
                  از لحاظ فنی هم خیالتون راحته چون پشتیبانی فنی ویترین رایگانه. اگه سؤالی داشتید لطفا اول به صفحهٔ راهنمای ویترین مراجعه کنید و اگه جوابتون رو اونجا ندیدید، با پشتیبانی ویترین تماس بگیرید. همچنین در ویترین‌بلاگ همیشه آموزش‌های مختلفی برای فروش آنلاین خواهیم داشت.`,
                  },
                },
                {
                  "@type": "Question",
                  name: "ویترین می‌تونه برای من که در پیج اینستاگرام فروش دارم مفید باشه؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "بله، چرا که نه! طراحی سایت فروشگاهی با ویترین به چندین دلیل می‌تونه به پیج‌های اینستاگرامی کمک کنه که فروش خودشون رو بیشتر کنن و از اون طرف زمان کمتری برای مدیریت سفارش‌ها و دریافت پرداختی‌ها صرف کنن. خیلی خلاصه بخوایم بگیم همین که تمام فرایند خرید از فروشگاهتون اتوماتیک می‌شه می‌تونه خیلی جذاب باشه.",
                  },
                },
                {
                  "@type": "Question",
                  name: "آیا سایت‌های فروشگاهی طراحی شده با ویترین نیاز به هاست و دامنهٔ جداگانه دارن؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "خیر! مزیت طراحی سایت فروشگاهی با ویترین اینه که نیاز نیست برای فروشگاهتون به فکر تهیهٔ هاست و دامنهٔ جداگانه باشید. با ثبت نام در ویترین، می‌تونید یه دامنهٔ رایگان ir.ink بگیرید که به عنوان آدرس سایت شما استفاده می‌شه. این امکان رو دارید که بعداً هر دامنهٔ دلخواه دیگه‌ای رو به سایتتون وصل کنید.",
                  },
                },
                {
                  "@type": "Question",
                  name: "برای سئو و تبلیغات هم می‌تونم روی ویترین حساب کنم؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "فروشگاه اینترنتی که با ویترین طراحی می‌کنید می‌تونه سئو بشه و شما می‌تونید انواع تبلیغات کلیکی رو برای سایت فروشگاهتون اجرا کنید. پیشنهاد می‌کنیم آموزش سئو با ویترین رو ببینید تا با جزئیات بیشتری از ابزار سئوی ویترین آشننا بشید. اگه برای سئو و اجرای کمپین‌های تبلیغاتی نیاز به مشاوره داشتید، خوشحال می‌شیم با ما تماس بگیرید.",
                  },
                },
                {
                  "@type": "Question",
                  name: "برای فروشگاهم اپلیکیشن داشته باشم بهتره یا سایت فروشگاهی؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `همهٔ سایت‌های فروشگاهی طراحی شده با ویترین، یه وب‌اپلیکیشن (PWA) رایگان هم دارن که دقیقا با سایت فروشگاه هماهنگ می‌شه و خوبیش اینه که روی هر گوشی موبایلی نصب می‌شه؛ فرقی نمی‌کنه اندروید باشه یا iOS.
                  به علاوه تمام سایت‌های فروشگاهی ویترین از طراحی واکنشگرا (Responsive) استفاده می‌کنن و روی صفحهٔ هر گوشی درست دیده می‌شن. پس دیگه نگران کاربرهایی که با موبایل سایت شما رو می‌بینن نباشید!`,
                  },
                },
                {
                  "@type": "Question",
                  name: "چطور می‌تونم یه سایت فروشگاهی خاص با امکانات ویژه طراحی کنم؟",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "اگه سایت فروشگاهی ویژه‌ای مد نظر دارید (مثلا با طراحی خاص یا با امکاناتی مثل فروشگاه‌های زنجیره‌ای) لطفا برای رزرو جلسهٔ مشاوره با ما تماس بگیرید تا در مورد جزئیات صحبت کنیم.",
                  },
                },
              ],
            }),
          }}
        />
      </Head>
      <ShoppingPage />
    </div>
  );
}