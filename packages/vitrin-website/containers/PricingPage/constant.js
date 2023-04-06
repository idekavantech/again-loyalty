import uniqueId from "lodash/uniqueId";
export const ONE_YEAR = "oneYear";
export const pricing_package_details = [
  {
    id: uniqueId(),
    lable: "فروش آنلاین",
    options: [
      {
        id: uniqueId(),
        title: "مدیریت فروشگاه با گوشی",
        basic: true,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "افزودن محصولات",
        basic: "۵۰ محصول",
        standard: "۱۵۰ محصول",
        professional: "نامحدود",
      },
      {
        id: uniqueId(),
        title: "دسته‌بندی چند لایه محصولات",
        basic: false,
        standard: false,
        professional: true,
        description:
          "با تعریف برچسب (Label) برای هر محصول می‌توانید دسته‌بندی‌های تودرتو و منطقی بسازید. هر صفحه دسته‌بندی به‌صورت خودکار ساخته و به‌روزسانی می‌شود.",
      },
      {
        id: uniqueId(),
        title: "صفحه سفارش آنلاین اختصاصی",
        basic: false,
        standard: true,
        professional: true,
        description:
          "این صفحه قلب فروشگاه اینترنتی شماست. وقتی محصولات خود را به سایت اضافه می‌کنید، صفحه سفارش آنلاین به‌صورت خودکار ساخته و به‌روزرسانی می‌شود.",
      },
      {
        id: uniqueId(),
        title: "اعمال فلیترهای مختلف در صفحه سفارش آنلاین",
        basic: true,
        standard: true,
        professional: true,
        description:
          "کاربر می‌تواند محصولات شما را بر اساس فیلترهای مختلف (مثل قیمت) فیلتر و مشاهده کند.",
      },
      {
        id: uniqueId(),
        title: "افزودن متن، عکس و ویدئو به هر محصول",
        basic: true,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "صفحه مجزا برای هر محصول",
        basic: true,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "تعریف گونه‌های مختلف یک محصول (مثل رنگ، اندازه، ...)",
        basic: false,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "اتصال درگاه پرداخت مستقیم",
        basic: true,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "استفاده از روش‌های پرداخت متنوع",
        basic: true,
        standard: true,
        professional: true,
        description:
          "در محل کسب‌وکار، در محل مشتری، در ماشین، کارت به کارت، آنلاین",
      },
      {
        id: uniqueId(),
        title: "استفاده از روش‌‌های ارسال متنوع",
        basic: true,
        standard: true,
        professional: true,
        description:
          "پیک، پست، تحویل حضوری، تحویل به‌صورت مجازی (برای محصولات مجازی مثل گیفت کارت که به‌صورت فیزیکی ارسال نمی‌شوند.)",
      },
      {
        id: uniqueId(),
        title: "تعریف پیک اختصاصی کسب‌وکار",
        basic: false,
        standard: false,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "محاسبه خودکار هزینه بسته‌بندی",
        basic: false,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "محاسبه هزینه ارسال بر اساس محدوده",
        basic: true,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "تعیین محدوده‌های ارسال به دلخواه",
        basic: true,
        standard: true,
        professional: true,
        description:
          "می‌توانید روی نقشه هر محدوده‌ای که می‌خواهید را به‌صورت Polygon بکشید و هزینه ارسال آن را تعیین کنید.",
      },
      {
        id: uniqueId(),
        title: "استفاده از شرط‌های مکانی برای ارسال",
        basic: false,
        standard: false,
        professional: true,
        description:
          "با استفاده از شرط‌های مکانی می‌توانید هزینه‌های ارسال را مدیریت کنید. مثلا کل تهران ۱۰۰ تومان، اما محدوده ۱ و ۲ را ۵۰ تومان محاسبه کنید.",
      },
      {
        id: uniqueId(),
        title: "اعمال خودکار مالیات بر ارزش افزوده",
        basic: false,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "اعمال تخفیف‌های مشروط روی سفارش",
        basic: false,
        standard: false,
        professional: true,
        description:
          "مثلا تعیین کنید اگر تعداد آیتم‌های سبد خرید از فلان عدد بیشتر بود، چند درصد تخفیف روی فاکتور اعمال شود.",
      },
      {
        id: uniqueId(),
        title: "فعال و غیرفعال کردن سفارش‌گیری",
        basic: true,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "تنظیم شروع و پایان ساعت سفارش‌گیری",
        basic: false,
        standard: true,
        professional: true,
      },
    ],
  },
  {
    id: uniqueId(),
    lable: "فنی و زیرساخت",
    options: [
      {
        id: uniqueId(),
        title: "بدون نیاز به کدنویسی",
        basic: true,
        standard: true,
        professional: true,
        description:
          "با صفحه‌ساز و ویرایشگر ویترین بدون نیاز به دانش فنی طراحی سایت می‌توانید به‌صورت Drag&Drop سایت خود را بسازید.",
      },
      {
        id: uniqueId(),
        title: "هاست (حجم ترافیک ماهانه)",
        basic: "نامحدود",
        standard: "نامحدود",
        professional: "نامحدود",
        description:
          "با ویترین نگران اتمام ترافیک هاست نباشید! اگر سایت با محتوای سنگین دارید، با پشتیبانی ویترین تماس بگیرید.",
      },
      {
        id: uniqueId(),
        title: "سرور مقیاس‌پذیر",
        basic: false,
        standard: false,
        professional: true,
        description:
          "سرور مقیاس‌پذیر به سروری گفته می‌شود که متناسب با حجم ترافیک یک سایت، منابع مورد نیاز برای دسترسی به سایت (مثل قدرت پردازشی) را به سایت شما اختصاص می‌دهد. با این روش فرقی نمی‌کند که سایت شما چند بازدیدکننده دارد؛ همیشه در دسترس و سریع عمل می‌کند.",
      },
      {
        id: uniqueId(),
        title: "اتصال به دامنه دلخواه",
        basic: true,
        standard: true,
        professional: true,
        description:
          "هر دامنه‌ای که قبلا داشته‌اید یا تازه خریداری می‌کنید، به ویترین شما وصل می‌شود.",
      },
      {
        id: uniqueId(),
        title: "قابلیت نمایش اینماد و ساماندهی",
        basic: false,
        standard: true,
        professional: true,
        description:
          "نماد اعتماد الکترونیکی و ساماندهی کسب‌وکارهای مجازی برای افزایش اطمینان بازدیدکننده سایت شما اهمیت دارند.",
      },
      {
        id: uniqueId(),
        title: "افزودن کد Java Script دلخواه به هر صفحه",
        basic: false,
        standard: false,
        professional: true,
        description:
          "با این قابلیت می‌توانید ابزارهای گوگل مثل آنالیتیکس را به سایت خود متصل کنید و از پلتفرم‌های تبلیغاتی کلیکی برای افزایش فروش خود بهره ببرید.",
      },
    ],
  },
  {
    id: uniqueId(),
    lable: "سئوی فنی خودکار",
    options: [
      {
        id: uniqueId(),
        title: "تولید خودکار Site Map برای کل سایت",
        basic: false,
        standard: true,
        professional: true,
        description:
          "سایت مپ یک لیست از صفحه‌های مهم سایت شماست که در قالب یک فایل xml در سایت شما قرار می‌گیرد و به رتبه گوگل شما کمک می‌کند.",
      },
      {
        id: uniqueId(),
        title: "امکان Redirect هر صفحه به آدرس دلخواه",
        basic: false,
        standard: false,
        professional: true,
        description:
          "می‌توانید هر صفحه از سایت را با ریدایرکت ۳۰۱ یا ۳۰۲ به هر صفحه دیگر منتقل کنید.",
      },
      {
        id: uniqueId(),
        title: "استفاده از ID در آدرس صفحات و محصولات",
        basic: true,
        standard: true,
        professional: true,
        description:
          "هر صفحه از سایت شما یک شماره (ID) دارد که در آدرس صفحه آمده است. با این روش می‌توان جلوی خطاهای سهوی و از بین رفتن اعتبار صفحات در گوگل را گرفت.",
      },
      {
        id: uniqueId(),
        title: "امکان درج تگ alt برای تمام تصاویر",
        basic: false,
        standard: true,
        professional: true,
        description:
          "تگ alt به بهبود سئو سایت و افزایش ورودی از جست‌وجوی تصاویر در گوگل به سایت شما کمک می‌کند.",
      },
      {
        id: uniqueId(),
        title: "ایجاد لینک در متن صفحات با تگ دلخواه",
        basic: true,
        standard: true,
        professional: true,
        description:
          "در سکشن متن می‌توانید هر قسمت از متن را تبدیل به لینک کنید و از تگ‌های دلخواه مثل nofollow یا noreferrer استفاده کنید.",
      },
      {
        id: uniqueId(),
        title: "ایجاد خودکار Breadcrumb",
        basic: false,
        standard: false,
        professional: true,
        description:
          "استفاده از Breadcrumb در صفحات دسته‌بندی محصولات به کاربر شما کمک می‌کند تا راه خود را میان تعداد زیادی از محصولات گم نکند و سردرگم نشود.",
      },
      {
        id: uniqueId(),
        title: "استفاده از Schema دلخواه در هر صفحه",
        basic: false,
        standard: false,
        professional: true,
        description:
          "می‌توانید برای هر صفحه محصول یا صفحه محتوایی سایت خود از اسکیما استفاده کنید تا اطلاعات مهم صفحه، مستقیما در نتایج جست‌وجوی گوگل نمایش داده شود.",
      },
    ],
  },
  {
    id: uniqueId(),
    lable: "ابزار سئوی محتوایی",
    options: [
      {
        id: uniqueId(),
        title: "انتخاب اسلاگ دلخواه برای هر صفحه",
        basic: false,
        standard: true,
        professional: true,
        description:
          "اسلاگ یا نامک، کلمات معناداری هستند که به عنوان آدرس صفحات سایت (بعد از نام دامنه) استفاده می‌شوند.",
      },
      {
        id: uniqueId(),
        title: "تعیین عنوان سئو دلخواه برای هر صفحه",
        basic: true,
        standard: true,
        professional: true,
        description:
          "عنوان سئو (SEO Title) عبارتی است که موقع نمایش لینک سایت شما در گوگل، به‌صورت آبی رنگ می‌بینید.",
      },
      {
        id: uniqueId(),
        title: "تعیین توضیحات متا برای هر صفحه",
        basic: true,
        standard: true,
        professional: true,
        description:
          "توضیحات متا (Meta Description) همان نوشته‌های کوتاهی است که زیر لینک‌های آبی رنگ گوگل نمایش داده می‌شود.",
      },
      {
        id: uniqueId(),
        title: "تعیین عکس مخصوص شبکه‌های اجتماعی برای هر صفحه",
        basic: false,
        standard: false,
        professional: true,
        description:
          "تصویر کوچکی که هنگام اشتراک‌گذاری لینک صفحات سایت در شبکه‌های اجتماعی و پیام‌رسان‌ها (مثل تلگرام یا توییتر) نمایش داده می‌شود.",
      },
      {
        id: uniqueId(),
        title: "بررسی لینک‌های خروجی و ورودی صفحه",
        basic: false,
        standard: false,
        professional: true,
        description:
          "ابزاری سئوی ویترین تمام لینک‌های ورودی و خروجی صفحه شما را بررسی می‌کند و استفاده از این لینک‌ها را به شما یادآوری می‌کند.",
      },
      {
        id: uniqueId(),
        title: "بررسی وجود تگ alt تصاویر",
        basic: false,
        standard: true,
        professional: true,
      },
    ],
  },
  {
    id: uniqueId(),
    lable: "شخصی‌سازی قالب و محتواگذاری",
    options: [
      {
        id: uniqueId(),
        title: "سکشن دسترسی سریع برای صفحات محتوایی",
        basic: false,
        standard: true,
        professional: true,
        description:
          "یک سکشن ویژه که شبیه یک فهرست عمل می‌کند و به کمک آن، کاربر می‌تواند به قسمت‌های مختلف محتوای یک صفحه سریعا دسترسی پیدا کند.",
      },
      {
        id: uniqueId(),
        title: "ایجاد گالری تصاویر",
        basic: true,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "ساخت صفحات وبلاگ",
        basic: "نا محدود",
        standard: "نا محدود",
        professional: "نا محدود",
      },
      {
        id: uniqueId(),
        title: "ساخت صفحات فرود (لندینگ پیج)",
        basic: "نا محدود",
        standard: "نا محدود",
        professional: "نا محدود",
      },
      {
        id: uniqueId(),
        title: "بارگذاری ویدئو به‌صورت Embed",
        basic: false,
        standard: true,
        professional: true,
        description:
          "کد embed کدی است که از سایت‌های اشتراک‌گذاری ویدئو (مثل آپارات یا Youtube) برای هر ویدئو دریافت می‌کنید.",
      },
      {
        id: uniqueId(),
        title: "نمایش Popup روی صفحات",
        basic: false,
        standard: false,
        professional: true,
        description:
          "می‌توانید از پاپ آپ برای اطلاع‌رسانی مهم و فوری به کاربر استفاده کنید و تنظیم کنید که روی چه صفحاتی و چند بار به هر کاربر نمایش داده شود.",
      },
      {
        id: uniqueId(),
        title: "نمایش Banner های اطلاع‌رسانی روی صفحات",
        basic: false,
        standard: true,
        professional: true,
        description:
          "امکان استفاده از بنرهای اطلاع‌رسانی برای مناسبت‌ها روی همه صفحات وجود دارد.",
      },
      {
        id: uniqueId(),
        title: "شخصی سازی صفحه سفارش آنلاین",
        basic: false,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "ویرایش ظاهر صفحه اصلی",
        basic: true,
        standard: true,
        professional: true,
        description:
          "ظاهر صفحه اصلی سایت شما بسیار اهمیت دارد. اگر برای این کار نیاز به راهنمایی دارید، می‌توانید با پشتیبانی ویترین تماس بگیرید.",
      },
      {
        id: uniqueId(),
        title: "استفاده از تم رنگی برای المان‌های ظاهری صفحات",
        basic: true,
        standard: true,
        professional: true,
        description:
          "با انتخاب یک تم رنگی برای کل سایت، دکمه‌ها و المان‌های ظاهری تمام صفحات به‌صورت خودکار از آن رنگ پیروی می‌کنند.",
      },
      {
        id: uniqueId(),
        title: "امکان آپلود تصاویر مجزا برای حالت موبایل و دسکتاپ هر صفحه",
        basic: false,
        standard: false,
        professional: true,
        description:
          "برای افزایش زیبایی سایت خود می‌توانید در هر سکشن تصویری از هر صفحه، یک عکس عریض برای حالت دسکتاپ و یک عکس کوچک‌تر برای نمایش در موبایل آپلود کنید.",
      },
      {
        id: uniqueId(),
        title: "ویرایش تصاویر در صفحه‌ساز",
        basic: false,
        standard: false,
        professional: true,
        description:
          "می‌توانید کارهایی مثل بریدن (Crop)، تغییر سایز و اعمال برخی فیلترها روی تصاویر را مستقیما در صفحه‌ساز ویترین انجام دهید.",
      },
      {
        id: uniqueId(),
        title: "امکان تعویض قالب",
        basic: false,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "ایجاد صفحه درباره ما به‌صورت خودکار",
        basic: false,
        standard: true,
        professional: true,
        description:
          " صفحه «درباره ما» سایت شما پس از تکمیل اطلاعات اصلی کسب‌وکار مثل نام، شماره تماس، آدرس و لوگو در دسترس خواهد بود.",
      },
      {
        id: uniqueId(),
        title: "افزودن لینک شبکه‌های اجتماعی",
        basic: true,
        standard: true,
        professional: true,
        description:
          "می‌‌توانید لینک شبکه‌های اجتماعی خودتان را در هدر یا فوتر سایت و در تمام صفحات به‌صورت خودکار قرار دهید.",
      },
      {
        id: uniqueId(),
        title: "ایجاد منو در هدر و فوتر سایت",
        basic: true,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "ایحاد منوهای تودرتو",
        basic: false,
        standard: false,
        professional: true,
      },
    ],
  },
  {
    id: uniqueId(),
    lable: "امنیت، به‌روزرسانی و پشتیبانی",
    options: [
      {
        id: uniqueId(),
        title: "گواهینامه ssl رایگان",
        basic: true,
        standard: true,
        professional: true,
        description:
          "سایت شما به‌صورت خودکار از پروتکل امن https استفاده می‌کند که برای دریافت درگاه پرداخت آنلاین ضروری است.",
      },
      {
        id: uniqueId(),
        title: "امنیت فنی ویترین",
        basic: true,
        standard: true,
        professional: true,
        description:
          "ویترین از پایه کدنویسی شده است و همین باعث می‌شود که سایت‌های ساخته شده با ویترین از حفره‌های امنیتی رایج در CMSهای آماده در امان باشند.",
      },
      {
        id: uniqueId(),
        title: "به‌روزرسانی سیستم فروش آنلاین ویترین",
        basic: true,
        standard: true,
        professional: true,
        description:
          "تجربه ویترین در طراحی سیستم‌های فروش آنلاین همیشه در حال افزایش است و به کمک داده‌های جدید، سیستم ویترین بهبود پیدا می‌کند.",
      },
      {
        id: uniqueId(),
        title: "رفع باگ‌های گزارش شده",
        basic: false,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "افزودن قابلیت‌های جدید به صفجه‌ساز ویترین",
        basic: false,
        standard: false,
        professional: true,
        description:
          "سکشن‌های جدید و زیبا متناسب با نیاز کاربران ویترین طراحی شده و به تدریج برای استفاده عمومی عرضه می‌شوند.",
      },
      {
        id: uniqueId(),
        title: "افزودن قالب‌های جدید و حرفه‌ای",
        basic: false,
        standard: true,
        professional: true,
        description:
          "قالب‌های جدید که توسط تیم حرفه‌ای ویترین طراحی شده‌اند به مرور در دسترس قرار می‌گیرند.",
      },
    ],
  },

  {
    id: uniqueId(),
    lable: "افزایش فروش",
    options: [
      {
        id: uniqueId(),
        title: "امکان اتصال به «ایمالز»",
        basic: true,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "امکان اتصال به «ترب»",
        basic: true,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "اتصال به پلتفرم‌های تبلیغاتی کلیکی",
        basic: false,
        standard: false,
        professional: true,
        description: "یکتانت، مدیااد، صباویژن، کاپریلا، ...",
      },
    ],
  },
  {
    id: uniqueId(),
    lable: "گزارشگیری و آمار",
    options: [
      {
        id: uniqueId(),
        title: "گزارش‌های دوره‌ای فروش",
        basic: true,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "گزارش فروش بر اساس مواد اولیه",
        basic: false,
        standard: false,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "گزارش فروش بر اساس محصولات",
        basic: true,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "گزارش فروش بر اساس کانال فروش (سایت، حضوری، ...)",
        basic: false,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "گزارش مواد اولیه مصرفی",
        basic: false,
        standard: false,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "گزارش اولین و آخرین فروش شعبه",
        basic: false,
        standard: false,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "گزارش کدهای تخفیف استفاده شده",
        basic: false,
        standard: true,
        professional: true,
      },
    ],
  },
  {
    id: uniqueId(),
    lable: "یکپارچگی‌ها",
    options: [
      {
        id: uniqueId(),
        title: "اتصال به سیستم حسابداری",
        basic: false,
        standard: false,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "اتصال به باشگاه مشتریان",
        basic: false,
        standard: false,
        professional: true,
        description:
          "ویترین به شما امکان می‌دهد اطلاعات مشتریان آنلاین خود را به‌صورت خودکار در نرم افزار باشگاه مشتریان خود وارد کنید.",
      },
      {
        id: uniqueId(),
        title: "اتصال به نرم‌افزار صندوق فروشگاهی",
        basic: false,
        standard: true,
        professional: true,
        description:
          "با اتصال نرم‌افزار صندوق فروشگاهی خود به ویترین می‌توانید تمام سفارش‌های حضوری و آنلاین خود را در پنل مدیریت سایت خود به‌صورت یکجا ببینید.",
      },
      {
        id: uniqueId(),
        title: "نرم افزار نصبی برای سیستم فروشگاه‌های حضوری",
        basic: false,
        standard: true,
        professional: true,
        description:
          "نرم افزار ویترین که روی کامپیوتر فروشگاه شما نصب می‌شود و به کمک آن می‌توانید سفارش‌های آنلاین را راحت‌تر مدیریت کنید.",
      },
      {
        id: uniqueId(),
        title: "اتصال به چاپگر حرارتی فروشگاه",
        basic: false,
        standard: false,
        professional: true,
        description:
          "با استفاده از نرم‌افزار نصبی ویترین می‌توانید فاکتور سفارش‌های آنلاین را مستقیما با پرینتر فروشگاه خود چاپ کنید.",
      },
      {
        id: uniqueId(),
        title: "اتصال به ابزارهای تحلیلی گوگل",
        basic: false,
        standard: false,
        professional: true,
        description:
          "Google Analytics, Google Search Console, Google Ads, Google Optimize, ...",
      },
      {
        id: uniqueId(),
        title: "اتصال به سرویس‌های ارسال",
        basic: true,
        standard: true,
        professional: true,
        description: "پست، الوپیک، میاره",
      },
      {
        id: uniqueId(),
        title: "اتصال به درگاه‌های پرداخت آنلاین",
        basic: true,
        standard: true,
        professional: true,
        description:
          "زیبال، ملت، زرین پال، سامان کیش، آی دی پی، بیست پی، سیز پی، پودیوم",
      },
      {
        id: uniqueId(),
        title: "امکان قراردادن چت آنلاین در سایت",
        basic: false,
        standard: true,
        professional: true,
      },
    ],
  },
  {
    id: uniqueId(),
    lable: "ارتباط با مشتری و پروفایل کاربری",
    options: [
      {
        id: uniqueId(),
        title: "دکمه شناور تماس و واتساپ (FAB)",
        basic: true,
        standard: true,
        professional: true,
        description:
          "یک افزونه کاربردی که می‌تواند بازدیدکننده هر صفحه از سایت را به مشتری شما تبدیل کند!",
      },
      {
        id: uniqueId(),
        title: "اطلاع رسانی پیامکی به مشتری",
        basic: true,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "مشاهده پیام‌های دریافتی از مشتریان",
        basic: false,
        standard: true,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "درج فرم دریافت اطلاعات با فیلدهای دلخواه",
        basic: false,
        standard: false,
        professional: true,
        description:
          "از فرم‌ها می‌توانید در صفحه تماس با ما یا مواقعی استفاده کنید که قبل از هماهنگی با مشتری، نیاز به دریافت اطلاعات خاصی از او دارید.",
      },
      {
        id: uniqueId(),
        title: "امکان ورود کاربر به سایت (لاگین) با شماره موبایل",
        basic: false,
        standard: true,
        professional: true,
      },

      {
        id: uniqueId(),
        title: "امکان آپلود عکس و مدارک توسط کاربر",
        basic: false,
        standard: false,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "امکان آپلود لوکیشن روی نقشه توسط کاربر",
        basic: false,
        standard: false,
        professional: true,
      },
      {
        id: uniqueId(),
        title: "کیف پول اختصاصی برای هر مشتری",
        basic: true,
        standard: true,
        professional: true,
      },
    ],
  },
];

export const packages = [
  { id: uniqueId(), label: "basic", title: "بسته‌ پایه" },
  { id: uniqueId(), label: "standard", title: "بسته‌ استاندارد" },
  { id: uniqueId(), label: "professional", title: "بسته‌ حرفه‌ای" },
  { id: uniqueId(), label: "golden", title: "بسته‌ طلایی" },
];

export const FAQS = [
  {
    id: uniqueId(),
    question: "شرایط پرداخت ویترین چطوریه؟",
    response: `قیمت‌های صفحه تعرفه ویترین به‌صورت ماهانه (بدون احتساب مالیات) نوشته شده و دوره‌های پرداخت، ۳ ماهه است که قبل از پایان اشتراکتون به شما اطلاع‌رسانی می‌شه. اگه هزینه ۱ سال رو یکجا و در ابتدا پرداخت کنید، می‌تونید از ۲۵٪ تخفیف استفاده کنید.`,
  },
  {
    id: uniqueId(),
    question: "امکان خرید اشتراک یک ماهه وجود داره؟",
    response: `خیر. دوره‌های پرداخت ویترین ۳ ماهه است و از زمانی که اولین پرداخت رو انجام می‌دید محاسبه می‌شه. چند هفته قبل از پایان سه ماه، از طریق پیامک برای تمدید اشتراک به شما اطلاع‌رسانی می‌شه.`,
  },
  {
    id: uniqueId(),
    question: "چرا هزینه ویترین در مقایسه با شرکت‌های طراحی سایت کمتره؟",
    response: `ویترین ترکیبی از خدمات طراحی سایت و سایت ساز رو در اختیار شما می‌ذاره. یعنی مثل یه سایت ساز، شما می‌تونید سایت خودتون رو از ابتدا و بدون نیاز به کدنویسی بسازید. در ادامه با دیدن ویدئوهای آموزشی ویترین، خودتون طراحی گرافیکی و محتوایی سایت رو پیش ببرید و کارهایی مثل اتصال سایت به درگاه پرداخت، خریداری دامنه اختصاصی یا گرفتن اینماد رو انجام بدید. به این دلیل که زیرساخت فنی ویترین از قبل آماده شده و اکثر کارهای سایت رو خودتون انجام می‌دید، هزینه طراحی سایت با ویترین هم خیلی کمتر از کدنویسی اختصاصی تموم می‌شه.`,
  },

  {
    id: uniqueId(),
    question: "چرا هزینه‌های ویترین به صورت اشتراک ماهانه دریافت می‌شه؟",
    response: `اصلی‌ترین دلیل اینه که زیرساخت فنی که ویترین از اون‌ها استفاده می‌کنه هزینه‌های ماهانه داره. شما از هر طریقی که سایت طراحی کنید، چه خودتون کدنویسی کنید چه شرکت دیگه‌ای این کار رو انجام بده، باید هزینه‌های هاست و سرور و دامنه رو به‌صورت ماهانه بپردازید. ویترین هم از این هزینه‌ها مستثنا نیست.`,
  },
  {
    id: uniqueId(),
    question: "پشتیبانی ویترین رایگانه؟",
    response: `بله! پشتیبانی فنی ویترین رایگانه. شما هر موقع که سؤالی در مورد بخش‌های فنی سایت یا عدم کارکرد درست سایت خودتون داشته باشید، می‌تونید با شماره <a  href="tel:+982191070751"style='color:#0050FF' > ۰۲۱۹۱۰۷۰۷۵۱  تماس بگیرید <a/> تا شما رو راهنمایی کنیم.`,
  },
];
