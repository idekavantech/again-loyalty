import uniqueId from "lodash/uniqueId";

export const FEATURES = [
  {
    title: "مزیت‌‌های کلیدی",
    type: "key benefits",
    icon: "/images/icons-01.svg",
    id: uniqueId(),
    options: [
      {
        id: uniqueId(),
        title: "عملیات و بازاریابی یکپارچه (I.O.M)",
        description:
          "تکنولوژی I.O.M ویترین به شما کمک می‌کند فروش کسب‌وکار خود را بیشتر کنید و عملیات فروشگاه را راحت‌تر مدیریت کنید.",
        icon: "/images/I.O.M.svg",
        link: "",
        link_text: "درباره I.O.M بیشتر بدانید",
        name: "iom",
      },
      {
        id: uniqueId(),
        title: "یکپارچگی‌ها",
        description:
          "می‌توانید سایت خود را به انواع نرم‌افزارهای حسابداری، صندوق فروشگاهی، باشگاه مشتریان، درگاه پرداخت و سرویس‌های ارسال متصل کنید.",
        icon: "/images/HubFilled.svg",
        link: "",
        link_text: "ویترین با چه سیستم‌هایی یکپارچه می‌شود؟",
        name: "integrations",
      },
      {
        id: uniqueId(),
        title: "پشتیبانی",
        description:
          "تیم پشتیبانی ویترین علاوه بر ارائه آموزش و پاسخ به پرسش‌های شما، خدمات منحصربه‌فردی مثل اکانت منیجر اختصاصی نیز در اختیار کسب‌وکارها می‌گذارد.",
        icon: "/images/SupportAgentFilled.svg",
        link: "",
        link_text: "با تیم پشتیبانی سایت ساز ویترین آشنا شوید",
        name: "support",
      },
      {
        id: uniqueId(),
        title: "مدیریت فروشگاه اینترنتی",
        description:
          "تجربه طراحی صدها فروشگاه اینترنتی موفق در ویترین منجر به طراحی فرآیندهایی شده است که مدیریت فروشگاه شما را بسیار ساده و کارآمد می‌کند.",
        icon: "/images/ManageAccountsFilled.svg",
        link: "",
        link_text: "پنل مدیریت فروشگاهی ویترین را ببینید",
        name: "managers",
      },
      {
        id: uniqueId(),
        title: "مسیر خرید مشتری",
        description:
          "راحتی ثبت سفارش در فروشگاه اینترنتی شما تأثیر مستقیمی روی افزایش فروش شما دارد. با ویترین، مشتری‌های سایت شما به‌سرعت و به‌سادگی سفارش ثبت می‌کنند.",
        icon: "/images/ShoppingCartCheckoutFilled.svg",
        link: "",
        link_text: "مشتری چطور از سایت شما سفارش می‌دهد؟",
        name: "customers",
      },
    ],
  },
  {
    title: "زیرساخت و امنیت",
    type: "Infrastructure and security",
    icon: "/images/icons-02.svg",
    id: uniqueId(),
    options: [
      {
        id: uniqueId(),
        title: "بدون کدنویسی",
        description:
          "برنامه‌نویس نیستید؟ نگران نباشید! ویترین طوری طراحی شده که بدون داشتن دانش فنی طراحی سایت، خودتان بتوانید سایت کسب‌وکارتان را بسازید.",
        icon: "/images/SettingsEthernetFilled.svg",
        link: "",
        link_text: "چطور می‌توان بدون کدنویسی سایت ساخت؟",
        name: "no-code",
      },
      {
        id: uniqueId(),
        title: "سرور مقیاس پذیر",
        description:
          "هر چه مشتری و سفارش بیشتری روی سایت داشته باشید، سرورهای ویترین هم منابع بیشتری به سایت شما اختصاص می‌دهند تا جوابگوی کاربران شما باشند.",
        icon: "/images/MemoryFilled.svg",
        link: "",
        link_text: "با سرورهای ابری ویترین آشنا شوید",
        name: "scalable",
      },
      {
        id: uniqueId(),
        title: "اتصال دامنه دلخواه",
        description:
          "هر دامنه‌ای را که قبلا داشته‌اید یا جدید خریداری می‌کنید، می‌توانید به سایتی که با ویترین می‌سازید متصل کنید؛ به‌علاوه یک دامنه ir رایگان، هدیه ویترین به شما!",
        icon: "/images/AdminPanelSettingsFilled.svg",
        link: "",
        link_text: "از ویترین دامنه رایگان بگیرید!",
        name: "domain",
      },
      {
        id: uniqueId(),
        title: "امنیت سایت",
        description:
          "تیم فنی ویترین امنیت سایت شما را تضمین می‌کند. همه سایت‌های ویترین گواهینامه ssl دارند و در برابر هک و حمله‌های سایبری مقاوم هستند.",
        icon: "/images/AdminPanelSettingsFilled (1).svg",
        link: "",
        link_text: "ویژگی‌های امنیتی ویترین را بررسی کنید",
        name: "security",
      },
      {
        id: uniqueId(),
        title: "به‌روزرسانی‌ها",
        description:
          "تیم ویترین همیشه در حال توسعه سایت ساز ویترین است؛ از بهبود امکانات قبلی گرفته تا پیاده‌سازی قابلیت‌های جدید که به‌مرور اضافه خواهند شد.",
        icon: "/images/UpdateFilled.svg",
        link: "",
        link_text: "از آخرین به‌روزرسانی‌ها مطلع شوید",
        name: "updates",
      },
    ],
  },
  {
    title: "فروش آنلاین",
    type: "online sell",
    icon: "/images/icons-003.svg",
    id: uniqueId(),
    options: [
      {
        id: uniqueId(),
        title: "افزودن محصولات و دسته‌بندی‌ها",
        description:
          "محصولات مهم‌ترین قسمت فروشگاه اینترنتی شما هستند. در ویترین می‌توانید علاوه بر توضیحات هر محصول، دسته‌بندی‌های چند لایه و برچسب‌های مختلف تعریف کنید.",
        icon: "/images/AddShoppingCartFilled.svg",
        link: "",
        link_text: "افزودن محصولات را حرفه‌ای یاد بگیرید",
        name: "product-categories",
      },
      {
        id: uniqueId(),
        title: "ویژگی‌های پیشرفته محصولات ",
        description:
          "می‌توانید برای یک محصول، گوناگونی (مثل رنگ یا اندازه متفاوت) تعریف کنید یا هنگام افزودن به سبد خرید، افزودنی‌های قابل سفارش را جلوی دید مشتری بگذارید.",
        icon: "/images/StarBorderFilled.svg",
        link: "",
        link_text: "محصولات خود را غنی‌تر کنید",
        name: "advanced-products",
      },
      {
        id: uniqueId(),
        title: "مدیریت محدوده‌های ارسال کالا",
        description:
          "متناسب با موقعیت مشتری، هزینه ارسال دریافت کنید.به‌راحتی محدوده‌ها را روی نقشه تعیین کنید و برای هر کدام قیمت دلخواه بگذارید.",
        icon: "/images/EditLocationAltFilled.svg",
        link: "",
        link_text: "چطور می‌توان محدوده ارسال تعیین کرد؟",
        name: "delivery-regions",
      },
      {
        id: uniqueId(),
        title: "اتصال به روش‌های ارسال کالا",
        description:
          "در ویترین می‌توانید از سرویس‌های حمل و نقل گوناگون و حتی پیک شخصی فروشگاه خودتان استفاده کنید و به مشتری امکان انتخاب روش ارسال بدهید.",
        icon: "/images/SendTimeExtensionFilled.svg",
        link: "",
        link_text: "لیست روش‌های ارسال را ببینید",
        name: "shipping-methods",
      },
      {
        id: uniqueId(),
        title: "محاسبه فاکتور اتوماتیک",
        description:
          "سیستم فروش آنلاین ویترین بدون خستگی همه جزئیات فاکتور و هزینه‌های لازم را حساب می‌کند. نیازی نیست با هر مشتری تماس بگیرید و جزئیات سفارش را بپرسید!",
        icon: "/images/AdfScannerFilled.svg",
        link: "",
        link_text: "چه مواردی در فاکتور اتوماتیک لحاظ می‌شود؟",
        name: "billing",
      },
      {
        id: uniqueId(),
        title: "اتصال به درگاه پرداخت",
        description:
          "هر طور که می‌خواهید از مشتری پول بگیرید! ویترین از انواع روش‌های پرداخت مستقیم و درگاه‌های پرداخت واسط پشتیبانی می‌کند.",
        icon: "/images/AddCardFilled.svg",
        link: "",
        link_text: "لیست درگاه‌های پرداخت را ببینید",
        name: "psp",
      },
    ],
  },
  {
    title: "مدیریت پیشرفته",
    type: "advanced management",
    icon: "/images/icons-004.svg",
    id: uniqueId(),
    options: [
      {
        id: uniqueId(),
        title: "انبارگردانی",
        description:
          "انبار و مواد اولیه کسب‌وکار خود را در ویترین مدیریت کنید تا سیستم فروش یکپارچه شما تکمیل شود و نگران پیچیده‌شدن عملیات روزمره کسب‌وکار نباشید.",
        icon: "/images/Inventory2Filled.svg",
        link: "",
        link_text: "افزونه انبارگردانی ویترین چه قابلیت‌هایی دارد؟",
        name: "warehouse",
      },
      {
        id: uniqueId(),
        title: "امکانات چندشعبه‌ای",
        description:
          "با ویژگی‌هایی مثل انتخاب خودکار نزدیک‌ترین شعبه به مشتری و کیف پول مشترک بین شعبه‌ها، همه شعبه‌های کسب‌وکار شما مثل یک فروشگاه یکپارچه عمل می‌کنند.",
        icon: "/images/AccountTreeFilled.svg",
        link: "",
        link_text: "با امکانات چندشعبه‌ای ویترین آشنا شوید",
        name: "branches",
      },
      {
        id: uniqueId(),
        title: "گزارش‌گیری",
        description:
          "با گزارش‌های جامع و دقیقی که در پنل مدیریت سایت شما ارائه می‌شود همیشه از حجم فروش، بازدیدهای سایت و موجودی محصولات مطلع خواهید بود.",
        icon: "/images/QueryStatsFilled.svg",
        link: "",
        link_text: "در ویترین چه گزارش‌هایی ارائه می‌شود؟",
        name: "reports",
      },
      {
        id: uniqueId(),
        title: "اتصال به ابزارهای تحلیل سایت",
        description:
          "اگر برای بازدیدکننده‌های سایت نیاز به تحلیل‌هایی فراتر از گزارش‌های پنل ویترین دارید می‌توانید سایت خود را به انواع ابزارهای تحلیلی متصل کنید.",
        icon: "/images/MiscellaneousServicesFilled.svg",
        link: "",
        link_text: "لیست ابزارهای تحلیل سایت را ببینید",
        name: "analytics",
      },
    ],
  },
  {
    title: "سئو",
    type: "seo",
    icon: "/images/icons-05.svg",
    id: uniqueId(),
    options: [
      {
        id: uniqueId(),
        title: "سئو فنی خودکار",
        description:
          "کدهای ویترین با گوگل دوست هستند! اصول فنی سئو در کدنویسی ویترین رعایت شده تا شما بدون نیاز به دانش فنی، بتوانید در گوگل رقابت کنید.",
        icon: "/images/LaptopWindowsFilled.svg",
        link: "",
        link_text: "اجزای سئو فنی را بیشتر بشناسید",
        name: "technical-seo",
      },
      {
        id: uniqueId(),
        title: "سئو محصولات",
        description:
          "دوست دارید از گوگل مشتری جذب کنید؟ پس روی سئو محصولات فروشگاهتان کار کنید. به کمک ابزارهای ویترین می‌توانید بیشتر بفروشید.",
        icon: "/images/StoreMallDirectoryFilled.svg",
        link: "",
        link_text: "ویترین چه قابلیت‌هایی برای سئو محصولات دارد؟",
        name: "product-seo",
      },
      {
        id: uniqueId(),
        title: "ابزار سئو محتوایی",
        description:
          "هر صفحه از سایت شما به محتوا نیاز دارد تا مؤثر باشد. ابزار سئو محتوایی ویترین به شما کمک می‌کند کارایی محتوای شما بیشتر شود.",
        icon: "/images/ManageSearchFilled.svg",
        link: "",
        link_text: "با ابزار سئو ویترین آشنا شوید",
        name: "content-tool",
      },
    ],
  },
  {
    title: "صفحه‌ساز",
    type: "page builder",
    icon: "/images/icons-06.svg",
    id: uniqueId(),
    options: [
      {
        id: uniqueId(),
        title: "تم و قالب سایت",
        description:
          "قالب‌های ویترین نقطه شروع طراحی سایت شما هستند. همه قالب‌ها واکنش‌گرا هستند و کاملا قابل ویرایش طراحی شده‌اند تا با سلیقه شما سازگار شوند.",
        icon: "/images/DashboardCustomizeFilled.svg",
        link: "/cr~templates",
        link_text: "یک قالب انتخاب کنید و سایت بسازید!",
        name: "themes",
      },
      {
        id: uniqueId(),
        title: "صفحه‌های اتوماتیک",
        description:
          "در ویترین این قابلیت وجود دارد تا بعضی از صفحه‌های سایت شما به‌طور خودکار ساخته شوند! البته دست شما در ویرایش همه صفحات باز است.",
        icon: "/images/FileCopyFilled.svg",
        link: "",
        link_text: "کدام صفحه‌های سایت، خودکار ساخته می‌شوند؟",
        name: "pages",
      },
      {
        id: uniqueId(),
        title: "محتواگذاری",
        description:
          "صفحه‌ساز ویترین مجموعه‌ای از سکشن‌ها را در اختیار شما می‌گذارد تا با یک رابط گرافیکی و بدون نیاز به کدنویسی، صفحه‌های سایت خود را پرمحتوا کنید.",
        icon: "/images/TextFieldsFilled.svg",
        link: "",
        link_text: "ویترین چه سکشن‌هایی برای محتوا دارد؟",
        name: "sections",
      },
      {
        id: uniqueId(),
        title: "ناوبری سایت",
        description:
          "انواع سکشن‌های ناوبری مثل هدر و فوتر و منوها به بازدیدکننده‌های سایت شما کمک می‌کنند تا راه خود را میان صفحات مختلف پیدا کنند.",
        icon: "/images/MergeFilled.svg",
        link: "",
        link_text: "سکشن‌های ناوبری را بشناسید",
        name: "site navigation",
      },
      {
        id: uniqueId(),
        title: "ارتباط با مشتری",
        description:
          "درست مثل مشتری‌های حضوری، برای بازدیدکننده‌های سایت هم باید گوش‌به‌زنگ باشید و همیشه راه ارتباطی مستقیم و سریعی در دسترس کاربر قرار دهید.",
        icon: "/images/SpeakerNotesFilled.svg",
        link: "",
        link_text: "در ویترین چه راه‌هایی برای ارتباط با مشتری هست؟",
        name: "fab",
      },
    ],
  },
  {
    title: "افزایش فروش",
    type: "sales increase",
    icon: "/images/icons-07.svg",
    id: uniqueId(),
    options: [
      {
        id: uniqueId(),
        title: "منو دیجیتال",
        description:
          "منو دیجیتال ویترین، سریع‌ترین راه سفارش‌گیری رستوران‌ها و کافی‌شاپ‌هاست که زیبایی و انعطاف‌پذیری فوق‌العاده‌ای به فروش آنلاین این کسب‌وکارها می‌دهد.",
        icon: "/images/menu-book.svg",
        link: "/digital-menu",
        link_text: "درباره منو دیجیتال بیشتر بدانید",
        name: "digital menu",
      },
      {
        id: uniqueId(),
        title: "کمپین‌های تبلیغاتی",
        description:
          "با داشتن سایت می‌توانید تبلیغات آنلاین خود را کاملا هدفمند و به‌صرفه اجرا کنید. ویترین راه‌های تبلیغاتی متنوعی برای افزایش فروش پیش پای شما می‌گذارد.",
        icon: "/images/CampaignFilled.svg",
        link: "",
        link_text: "لیست راهکارهای تبلیغاتی پشتیبانی‌شده را ببینید",
        name: "campaigns",
      },
      {
        id: uniqueId(),
        title: "اتصال به سایت‌های فروش",
        description:
          "با اتصال ویترین خودتان به سایت‌های فروش مثل تُرُب، محصولات فروشگاه شما دقیقا جلوی آن دسته از مشتریانی قرار می‌گیرند که قصد خرید دارند.",
        icon: "/images/AccountTreeFilled.svg",
        link: "",
        link_text: "لیست سایت‌های فروش را ببینید",
        name: "sales-channels",
      },
      {
        id: uniqueId(),
        title: "کیف پول اختصاصی ",
        icon: "/images/AccountBalanceWalletFilled.svg",

        description:
          "هر مشتری یک کیف پول! با داشتن کیف پول اختصاصی برای هر مشتری روی سایت خودتان می‌توانید از روش‌های مثل کش‌بک برای فروش بیشتر استفاده کنید.",
        link: "",
        link_text: "کیف پول چطور فروش شما را بیشتر می‌کند؟",
        name: "wallet",
      },
      {
        id: uniqueId(),
        title: "باشگاه مشتریان",
        description:
          "اطلاعات مشتری‌های شما در باشگاه مشتریان سایت ذخیره می‌شود و می‌توانید با اعمال دسته‌بندی و برچسب‌های مختلف، از این لیست برای اتوماسیون بازاریابی استفاده کنید.",
        icon: "/images/PersonAddFilled.svg",
        link: "",
        link_text: "ویژگی‌های باشگاه مشتریان را بررسی کنید",
        name: "customer-club",
      },
    ],
  },
];
