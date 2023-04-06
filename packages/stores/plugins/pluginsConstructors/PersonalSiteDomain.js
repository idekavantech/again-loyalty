import Plugin from "./Plugin";
import { CDN_BASE_URL } from "@saas/utils/api";
import { PERSONAL_SITE_DOMAIN_PLUGIN } from "@saas/utils/constants/plugins";

const personalSiteDomainIcn = `${CDN_BASE_URL}upgrade-memberhsip-icn.svg`;
const promotion1 = `${CDN_BASE_URL}/promotion1.png`;
const promotion2 = `${CDN_BASE_URL}/promotion2.png`;
const promotion3 = `${CDN_BASE_URL}/promotion3.png`;
export default class PersonalSiteDomainPlugin extends Plugin {
  constructor(data, business, incomingUrl, incomingHost) {
    super(data, business, incomingUrl, incomingHost);
    this.name = PERSONAL_SITE_DOMAIN_PLUGIN;
    this.title = "اتصال به دامنه اختصاصی و عضویت ویژه";
    this.description =
      "امکان افزودن محصولات، افزودن به سبد خرید فعال‌سازی دامنه اختصاصی، حذف تبلیغات و ... ";
    this.descriptions = [
      "فعال سازی دامنه اختصاصی",
      "حذف تبلیغات ویترین از سایت شما",
      "امکان انتقال دامنه موجود به دامنه دلخواه",
    ];
    this.price = 29000;
    this.plans = [
      // {
      //   title: 'یک هفته رایگان',
      //   duration: 1,
      //   tax: 0,
      //   price: Math.floor(1.09 * (this.price + 2000000)),
      //   finalPrice: 0,
      //   initialExpenses: 2000000,
      //   finalInitialExpenses: 0,
      //   monthlyPrice: this.price,
      //   finalMonthlyPrice: 0,
      //   isPopular: false,
      //   isTrial: true,
      // },
      {
        title: "سه ماهه",
        duration: 3,
        tax: Math.floor(0.09 * (3 * this.price + 500000)),
        price: Math.floor(1.09 * (3 * this.price + 500000)),
        finalPrice: Math.floor(1.09 * (3 * this.price + 500000)),
        initialExpenses: 500000,
        finalInitialExpenses: 500000,
        monthlyPrice: this.price,
        finalMonthlyPrice: this.price,
        isPopular: false,
        isTrial: false,
      },
      {
        title: "یک ساله",
        duration: 12,
        tax: Math.floor(0.09 * (12 * this.price + 500000)),
        price: Math.floor(1.09 * (12 * this.price + 500000)),
        finalPrice: Math.floor(1.09 * (12 * this.price + 500000)),
        initialExpenses: 500000,
        finalInitialExpenses: 500000,
        monthlyPrice: this.price,
        finalMonthlyPrice: this.price,
        isPopular: true,
        isTrial: false,
      },
    ];
    this.image = personalSiteDomainIcn;
    this.images = [promotion1, promotion2, promotion3];

    this.hasCard = true;

    this.callToActionUrl = null;
    this.callToActionText = null;
  }
}
