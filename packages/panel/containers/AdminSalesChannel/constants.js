

const getImageUrl = (name) =>
  `/images/sales_channels/sales_channel_${name}.png`;

const getVideoUrl = (name) =>
  `https://hs3-cdn-saas.behtarino.com/static/panel/saleschannel/${name}.mp4`;
export const SALES_CHANNELS = [
  {
    name: "بهترینو",
    description:
      "بهترینو یک پلتفرم معرفی کسب‌وکار است که ماهانه ۵ میلیون بازدیدکننده دارد. با بهترینو در نتایج برتر گوگل دیده شوید و مشتری‌های بیشتری جذب کنید.",
    image: getImageUrl("behtarino"),
    cta: {
      text: "ثبت نام در بهترینو",
      link: "https://behtarino.com/precreate",
    },
    video: getVideoUrl("behtarino"),
  },
  {
    name: "تُرُب",
    description:
      "بازدیدکنندگان سایت تُرُب دنبال مقایسه محصولات در فروشگاه‌های اینترنتی مختلف هستند،. توجه آن‌ها را به سایت خود جلب کنید.",
    image: getImageUrl("torob"),
    cta: {
      text: "ثبت نام در ترب",
      link: "https://panel.torob.com/s",
    },
    video: getVideoUrl("torob"),
  },
  {
    name: "ایمالز",
    description:
      "ایمالز از محبوب‌ترین پلتفرم‌های فروش آنلاین است که مشتریان را به سایت فروشندگان وصل می‌کند. با ایمالز می‌توانید بازدید فروشگاه اینترنتی خود را بالا ببرید.",
    image: getImageUrl("emalls"),
    cta: {
      text: "ثبت نام در ایمالز",
      link: "https://emalls.ir/ShopRequest/",
    },
    video: getVideoUrl("emalls"),
  },
  {
    name: "اینستاگرام",
    description:
      "با قرار دادن لینک سایت در بایو، استوری و پست‌های اینستاگرام، مخاطبان اکانت اینستاگرام خود را به سمت سایت و خرید آنلاین هدایت کنید.",
    image: getImageUrl("instagram"),
    cta: {
      text: "دریافت مشاوره",
      link: "https://atro.agency/",
    },
    video: getVideoUrl("instagram"),
  },
  {
    name: "دوباره",
    description:
      "مشتریان فعلی شما، سرمایه اصلی کسب‌وکارتان هستند؛ با آن‌ها خداحافظی نکنید! با نرم‌افزار باشگاه مشتریان «دوباره»، می‌توانید آن‌ها را برای خرید مجدد از فروشگاه خود بازگردانید.",
    image: getImageUrl("dobare"),
    cta: {
      text: "فعال‌سازی باشگاه",
      link: "https://dobare.me/",
    },
    video: getVideoUrl("dobare"),
  },
  {
    name: "QR Code",
    description:
      "اگر فروش حضوری دارید، به‌راحتی با قراردادن یک QR Code در فروشگاه خود می‌توانید مشتری حضوری خود را تبدیل به کاربر سایتتان کنید.",
    image: getImageUrl("qr"),
    cta: {
      text: "ساخت QR Code",
      link: "https://bizarar.ir/qrcode-generator",
    },
    video: getVideoUrl("qr"),
  },
  {
    name: "گوگل مپ",
    description:
      "آدرس فروشگاه خود و وبسایت آن را در گوگل مپ ثبت کنید تا بتوانید مشتری‌هایی که در نقشه جست‌وجو می‌کنند را وارد فروشگاه خود کنید.",
    image: getImageUrl("gmap"),
    cta: {
      text: "ثبت موقعیت",
      link: "https://www.google.com/maps",
    },
    video: getVideoUrl("gmap"),
  },
  {
    name: "سئو",
    description:
      "با استفاده از تکنیک‌های سئو (بهینه‌سازی سایت برای موتورهای جست‌وجو)، سایت خود را به صفحه اول گوگل بیاورید تا بازدید سایت شما رشد کند.",
    image: getImageUrl("seo"),
    cta: {
      text: "دریافت مشاوره",
      link: "https://atro.agency/",
    },
    video: getVideoUrl("seo"),
  },
  {
    name: "گوگل ادز",
    description:
      "اگر بخواهید زمان طولانی سئو را با صرف هزینه کوتاه‌تر کنید، می‌توانید با تبلیغات در گوگل (گوگل ادز) راه میانبر را انتخاب کنید و لینک یک گوگل باشید.",
    image: getImageUrl("gads"),
    cta: {
      text: "دریافت مشاوره",
      link: "https://atro.agency/",
    },
    video: getVideoUrl("gads"),
  },
  {
    name: "یکتانت",
    description:
      "برای افزایش بازدید و فروش خود می‌توانید به یکتانت مراجعه کنید تا به کمک این پلتفرم در سایت‌های پربازدید ایرانی تبلیغات گسترده انجام دهید.",
    image: getImageUrl("yektanet"),
    cta: {
      text: "ثبت آگهی در یکتانت",
      link: "https://www.yektanet.com/",
    },
    video: getVideoUrl("yektanet"),
  },
  {
    name: "تپسل",
    description:
      "از تپسل برای اجرای انواع تبلیغات در اپلیکیشن‌های موبایل مثل بنر و ویدئوی تبلیغاتی درون برنامه‌ای کمک بگیرید تا سایت خود را به مخاطب خود نزدیک‌تر کنید.",
    image: getImageUrl("tapsell"),
    cta: {
      text: "ثبت آگهی در تپسل",
      link: "https://tapsell.ir/",
    },
    video: getVideoUrl("tapsell"),
  },
  {
    name: "مِدیا اَد",
    description:
      "مِدیا اَد یک پلتفرم تبلیغات دیجیتالی است که با آن می‌توانید تبلیغات بنری و متنی سایت و محصولات آن را در سایت‌های پربازدید به نمایش بگذارید.",
    image: getImageUrl("mediaad"),
    cta: {
      text: "ثبت آگهی در مدیا اد",
      link: "https://mediaad.org/",
    },
    video: getVideoUrl("media-ad"),
  },
];
