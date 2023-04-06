import { uniqueId } from "lodash";


export const GENERAL_INFO = "general_info";
export const FINANCIAL_INFO = "financial-info";
export const CONTACT_INFO = "contact_info";

export const steps = [
  {
    step: 1,
    title: "general information",
    label: GENERAL_INFO,
  },
  {
    step: 2,
    title: "Contacts",
    label: CONTACT_INFO,
  },
  {
    step: 3,
    title: "financial information",
    label: FINANCIAL_INFO,
  },
];

export const interfaceGateWays = [
  {
    id: uniqueId(),
    title: "Zibal",
    image: `/images/zibal.svg`,
    link: "https://zibal.ir/",
    button: {
      title: "Automatic connection",
      link: "gate_away/general_info",
    },
  },

  {
    id: uniqueId(),
    title: "Zarrin Pal Port(Silver package does not require this)",
    image: `/images/zarinpal.svg`,
    link: "https://www.zarinpal.com/payment-gateway.html",
  },
  {
    id: uniqueId(),
    image: `/images/sp.svg`,
    link: "https://merchant.sizpay.ir/Acnt/Reg?MF=00100180",
    title: "Siegie port",
  },
  {
    id: uniqueId(),
    title: "IDP",
    image: `/images/idPay.svg`,
    link: "https://idpay.ir/user/auth",
  },
];

export const directGateWays = [
  {
    id: uniqueId(),
    title: "Saman Kish",
    link: "https://my.sep.ir/InternetMerchant/Register",
    image: `/images/samankish.svg`,
  },
  {
    id: uniqueId(),
    title: "Nation's payment door",
    image: `/images/behpardakht.svg`,
    link: "http://www.behpardakht.com/resources/TerminalRegistration.html#",
  },
];
