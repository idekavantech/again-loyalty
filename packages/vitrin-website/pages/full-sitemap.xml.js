import { cn, bn, bcn } from "utils/constants/PAGES";

function Sitemap() {
  return null;
}
const baseUrl = {
  development: "http://localhost:3000",
  production: "https://vitrin.me",
}[process.env.NODE_ENV];
export const getServerSideProps = ({ res }) => {
  let sitemaps = "";
  cn.forEach((item) => {
    if (item.show) {
      let sitemapItem = `<url>
      <loc>${baseUrl}/c/${item.english}</loc>
      <priority>0.4</priority>
    </url>`;

      sitemaps = sitemaps.concat("", sitemapItem);
    }
  });

  bn.forEach((item) => {
    if (item.show) {
      let sitemapItem = `<url>
      <loc>${baseUrl}/b/${item.english}</loc>
      <priority>0.4</priority>
    </url>`;

      sitemaps = sitemaps.concat("", sitemapItem);
    }
  });

  bcn.forEach((item) => {
    if (item.show) {
      let sitemapItem = `<url>
      <loc>${baseUrl}/bc/${item.english.business}~${item.english.city}</loc>
      <priority>0.4</priority>
    </url>`;

      sitemaps = sitemaps.concat("", sitemapItem);
    }
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <priority>1</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/examples</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/examples/shopping</loc>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/features</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/pricing</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/reports</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/shop-builder</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/shopping</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/site-builder</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/digital-menu</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/cr~templates</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/website/t~personal</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/website/t~corporate</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/102520-کسب-درآمد-اینستاگرام</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/84542-آموزش-سئو</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24597-ساخت-سایت-بدون-دانش-برنامهنویسی</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24441-تبدیل-کسب-و-کار-سنتی-به-کسب-و-کار-اینترنتی</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/29221-طول-کلیدواژه-در-سئو</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/28660-زبان-برنامه-نویسی-طراحی-سایت-۲۰۲۱</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/30110-معرفی-کسب-و-کار-موفق-اینترنتی</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24750-عنوان-سئو-چیست</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24442-مهمترین-اشتباهات-طراحی-سایت</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/102526-سئو-اینستاگرام</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/30995-پینترست-چیست</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/31215-بالا-بردن-امنیت-پیج-اینستاگرام</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/31212-انتخاب-پسورد-قوی</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/31086-پایتون-چیست</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/31074-اینفوگرافیک</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/31071-بک-لینک-خوب</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/31025-vps</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/30885-افزایش-فالوور-اینستاگرام</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/102526-سئو-اینستاگرام</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/30714-طراحی-واکنشگرا</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/30514-فروش-در-بایا</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/30442-هاست-چیست</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/30108-ترفندهای-فروشگاه-اینترنتی-پرفروش</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/30101-افزایش-ترافیک-سایت</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/29725-مزایا-و-معایب-فروش-در-اینستاگرام</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/29568-کسب-درآمد-در-خانه</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/29481-متن-جایگزین-تصویر-در-سئو</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/29320-فرق-محتوای-اینستاگرام-با-سایت</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/28739-تعداد-کلمات-متن-برای-سئو</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/28657-لینک-خروجی-در-سئو</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24879-بازاریابی-پیامکی-برای-فروش-آنلاین</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/28979-ورود-پست-به-اکسپلور-اینستاگرام</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/28928-تراکم-کلیدواژهٔ-کانونی-چه-تأثیری-در-سئوی-سایت-دارد؟</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/28770-معیارهای-طراحی-سایت-حرفه-ای</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24593-راه-اندازی-فروشگاه-اینترنتی</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24598-مزایا-و-معایب-طراحی-سایت-فروشگاهی-با-وردپرس</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/28584-تأثیر-لوگو-در-برندسازی</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/28551-اسلاگ-برای-سئو</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/28420-ترند-طراحی-سایت-در-۲۰۲۱</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/28344-تأثیر-لینک-دهی-داخلی-در-سئو</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24824-توضیحات-متا</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/26257-تبلیغات-کلیکی</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24794-افزایش-فروش-اینترنتی-سال-۱۴۰۰</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24758-داستان-موفقیت-با-ویترین</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24715-قالب-آماده-سایت-فروشگاهی</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24685-کلیدواژهٔ-کانونی</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24606-پرستاشاپ-یا-ووکامرس</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24595-اشتباهات-منجر-به-هک-سایت-وردپرس</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24594-استراتژی-بازاریابی-محتوایی-برای-کسبوکارها</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24592-راه-کسب-درآمد-از-اینترنت</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24551-ابزار-اینسایت-اینستاگرام</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24443-تفاوت-فروشگاه-اینستاگرامی-و-سایت-فروشگاهی</loc>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog/24472-معیارهای-رتبه-بندی-سایت-در-گوگل</loc>
    <priority>0.4</priority>
  </url>
  ${sitemaps}
</urlset>
      `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
