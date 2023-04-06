import { uniqueId } from "lodash";


export const GENERAL_INFO = "general_info";
export const FINANCIAL_INFO = "financial-info";
export const CONTACT_INFO = "contact_info";

export const steps = [
  {
    step: 1,
    title: "اطلاعات عمومی",
    label: GENERAL_INFO,
  },
  {
    step: 2,
    title: "اطلاعات تماس",
    label: CONTACT_INFO,
  },
  {
    step: 3,
    title: "اطلاعات مالی",
    label: FINANCIAL_INFO,
  },
];

export const interfaceGateWays = [
  {
    id: uniqueId(),
    title: "درگاه زیبال",
    image: `/images/zibal.svg`,
    link: "https://zibal.ir/",
    button: {
      title: "اتصال خودکار",
      link: "gate_away/general_info",
    },
  },

  {
    id: uniqueId(),
    title: "درگاه زرین پال(بسته نقره‌ای به اینماد نیاز ندارد)",
    image: `/images/zarinpal.svg`,
    link: "https://www.zarinpal.com/payment-gateway.html",
  },
  {
    id: uniqueId(),
    image: `/images/sp.svg`,
    link: "https://merchant.sizpay.ir/Acnt/Reg?MF=00100180",
    title: "درگاه سیزپی",
  },
  {
    id: uniqueId(),
    title: "درگاه آیدی پی",
    image: `/images/idPay.svg`,
    link: "https://idpay.ir/user/auth",
  },
];

export const directGateWays = [
  {
    id: uniqueId(),
    title: "درگاه سامان کیش",
    link: "https://my.sep.ir/InternetMerchant/Register",
    image: `/images/samankish.svg`,
  },
  {
    id: uniqueId(),
    title: "درگاه پرداخت ملت",
    image: `/images/behpardakht.svg`,
    link: "http://www.behpardakht.com/resources/TerminalRegistration.html#",
  },
];
