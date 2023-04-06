const getCarefreeLaunchOfBusinessShopping = ({ xsb2 }) => (
  <span>راه‌اندازی حرفه‌ای {xsb2}</span>
);
const getAutomaticSalesOfBusinessShopping = ({ shop2 }) => (
  <span>{shop2} خودکار محصولات</span>
);
const getScalableGrowthOfBusinessShopping = () => (
  <span>افزایش مشتری سایت</span>
);
export const getVitrinPossibilitiesOfBusinessShopping = ({ xsb2, shop2 }) => [
  {
    id: 1,
    title: getCarefreeLaunchOfBusinessShopping({ xsb2 }),
    image: "/images/ICONS-03.svg",
    items: [
      "عدم نیاز به کد نویسی",
      "SSL رایگان",
      "سئوی فنی خودکار",
      "شخصی‌سازی قالب صفحات",
      "ویرایش محتوا با گوشی",
      "پشتیبانی از CDN",
      "اتصال به دامنه دلخواه",
      "دکمه شناور تماس",
      "فرم ساز",
      "آمار بازدید",
    ],
  },
  {
    id: 2,
    title: getAutomaticSalesOfBusinessShopping({ shop2 }),
    image: "/images/ICONS-04.svg",
    items: [
      "اتصال امن به درگاه پرداخت",
      "آمار فروش و سفارشات",
      "محاسبه خودکار هزینه ارسال بر اساس محدوده",
      "پیگیری لحظه ای وضعیت سفارش",
      "اتوماسیون پیامکی",
      "تعریف گونه‌های مختلف یک محصول",
      "محاسبه خودکار هزینه مالیات",
      "محاسبه خودکار هزینه بسته بندی",
      "تعریف پیک و روش‌های ارسال",
    ],
  },
  {
    id: 3,
    title: getScalableGrowthOfBusinessShopping(),
    image: "/images/Group.svg",
    items: [
      "منو دیجیتال",
      "امکانات خاص فروشگاه‌های چندشعبه‌ای",
      "اتصال به سیستم باشگاه مشتریان",
      "اتصال به سیستم حسابداری",
      "ابزار سئو محتوایی",
      "سرور ابری مقیاس پذیر",
      "گزارش‌های فروش و کارکرد دوره‌ای",
      "کیف پول مشترک بین شعبه‌ها",
    ],
  },
];

const getCarefreeLaunchOfCity = ({ site, cn }) => (
  <span>
    راه‌اندازی آسان {site} در {cn}
  </span>
);
const getAutomaticSalesOfCity = ({ shop2, cn }) => (
  <span>
    {shop2} پیشرفته در {cn}
  </span>
);
const getScalableGrowthOfCity = ({ site, cn }) => (
  <span>
    رشد و افزایش مشتری {site} در {cn}
  </span>
);
export const getVitrinPossibilitiesOfCity = ({ site, cn, shop2 }) => [
  {
    id: 1,
    title: getCarefreeLaunchOfCity({ site, cn }),
    image: "/images/ICONS-03.svg",
    items: [
      "عدم نیاز به کد نویسی",
      "SSL رایگان",
      "سئوی فنی خودکار",
      "شخصی‌سازی قالب صفحات",
      "ویرایش محتوا با گوشی",
      "پشتیبانی از CDN",
      "اتصال به دامنه دلخواه",
      "دکمه شناور تماس",
      "فرم ساز",
      "آمار بازدید",
    ],
  },
  {
    id: 2,
    title: getAutomaticSalesOfCity({ shop2, cn }),
    image: "/images/ICONS-04.svg",
    items: [
      "اتصال امن به درگاه پرداخت",
      "آمار فروش و سفارشات",
      "محاسبه خودکار هزینه ارسال بر اساس محدوده",
      "پیگیری لحظه ای وضعیت سفارش",
      "اتوماسیون پیامکی",
      "تعریف گونه‌های مختلف یک محصول",
      "محاسبه خودکار هزینه مالیات",
      "محاسبه خودکار هزینه بسته بندی",
      "تعریف پیک و روش‌های ارسال",
    ],
  },
  {
    id: 3,
    title: getScalableGrowthOfCity({ site, cn }),
    image: "/images/Group.svg",
    items: [
      "منو دیجیتال",
      "امکانات خاص فروشگاه‌های چندشعبه‌ای",
      "اتصال به سیستم باشگاه مشتریان",
      "اتصال به سیستم حسابداری",
      "ابزار سئو محتوایی",
      "سرور ابری مقیاس پذیر",
      "گزارش‌های فروش و کارکرد دوره‌ای",
      "کیف پول مشترک بین شعبه‌ها",
    ],
  },
];

const getCarefreeLaunchOfBusinessNoShopping = ({ ibt }) => (
  <span>راه‌اندازی و پشتیبانی سایت {ibt}</span>
);
const getAutomaticSalesOfBusinessNoShopping = ({ site }) => (
  <span>پنل مدیریت آسان {site}</span>
);
const getScalableGrowthOfBusinessNoShopping = () => (
  <span>ابزارهای رشد سریع</span>
);
export const getVitrinPossibilitiesOfBusinessNoShopping = ({ site, ibt }) => [
  {
    id: 1,
    title: getCarefreeLaunchOfBusinessNoShopping({ ibt }),
    image: "/images/ICONS-03.svg",
    items: ["عدم نیاز به کد نویسی", "SSL رایگان", "اتصال به دامنه دلخواه"],
  },
  {
    id: 2,
    title: getAutomaticSalesOfBusinessNoShopping({ site }),
    image: "/images/ICONS-04.svg",
    items: [
      "شخصی‌سازی قالب صفحات",
      "ویرایش محتوا با گوشی",
      "فرم ساز",
      "ابزار سئو محتوایی",
      "دکمه شناور تماس",
    ],
  },
  {
    id: 3,
    title: getScalableGrowthOfBusinessNoShopping(),
    image: "/images/Group.svg",
    items: [
      "سئوی فنی خودکار",
      "پشتیبانی از CDN",
      "سرور ابری و مقیاس‌پذیر",
      "آمار بازدید سایت",
    ],
  },
];
