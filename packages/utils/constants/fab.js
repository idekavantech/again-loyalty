import {
  ONLINE_SUPPORT_CHANNEL_IS_ACTIVE,
  ONLINE_SUPPORT_CHANNEL_IS_INACTIVE,
  ONLINE_SUPPROT_CALL,
  ONLINE_SUPPROT_CRISP,
  ONLINE_SUPPROT_EMAIL,
  ONLINE_SUPPROT_INSTAGRAM,
  ONLINE_SUPPROT_RAYCHAT,
  ONLINE_SUPPROT_SMS,
  ONLINE_SUPPROT_TELEGRAM,
  ONLINE_SUPPROT_WHATSAPP,
} from "../../stores/plugins/constants";

export const contactChannelsInitialState = [
  {
    name: ONLINE_SUPPROT_WHATSAPP,
    link: "https://api.whatsapp.com/send/?phone=",
    icon: `/images/whatsapp.svg`,
    status: ONLINE_SUPPORT_CHANNEL_IS_ACTIVE,
    description:
      "To properly operate the WhatsApp number, you need to have the phone number on which you have a WhatsApp account with the country code(Without any sign+, Distance, brackets or parentheses) Enter the box above.",
  },
  {
    name: ONLINE_SUPPROT_TELEGRAM,
    link: "https://t.me/",
    icon: `/images/telegram.svg`,
    status: ONLINE_SUPPORT_CHANNEL_IS_ACTIVE,
    description:
      "To operate the channel link correctly/Profile in the telegram just write the username related to the box above.",
  },
  {
    name: ONLINE_SUPPROT_SMS,
    link: "sms:",
    icon: `/images/sms.svg`,
    status: ONLINE_SUPPORT_CHANNEL_IS_ACTIVE,
    description:
      "For the correct functioning of the buttonSMS Simply put the desired number with the character+ And country code(No distance, brackets or brackets) Enter in the box above.",
  },
  {
    name: ONLINE_SUPPROT_EMAIL,
    link: "mailto:",
    icon: `/images/email.svg`,
    status: ONLINE_SUPPORT_CHANNEL_IS_ACTIVE,
    description:
      "To operate the correct email button is enough to make the email address in the correct format(xxx@zzz.com) Enter the email box.",
  },
  {
    name: ONLINE_SUPPROT_CALL,
    link: "tel:",
    icon: `/images/call.svg`,
    status: ONLINE_SUPPORT_CHANNEL_IS_ACTIVE,
    description:
      "To properly operate the phone call button is enough to make the call number with the character+ And country code(No distance, brackets or brackets) Enter in the box above.",
  },
  {
    name: ONLINE_SUPPROT_RAYCHAT,
    link: "",
    icon: `/images/raychat.svg`,
    status: ONLINE_SUPPORT_CHANNEL_IS_INACTIVE,
    description: `<div>To install chat service"Rice" On the website need to register in<a style="color:rgb(0, 80, 255) !important" href="https://raychat.io/signup" target="_blank">Rice Panel</a> You are. After successful registration, on the user panel dashboard page on the button"Installation and settings" Hit and from the right -hand menu of the option"Installation and activation" Press. in part"Manual installation" Copy the provided code completely and copy to the box above.<div>`,
  },
  {
    name: ONLINE_SUPPROT_CRISP,
    link: "",
    icon: `/images/crisp.svg`,
    status: ONLINE_SUPPORT_CHANNEL_IS_INACTIVE,
    description: `To install chat service"Crispe" On the website need to register in<a style="color:rgb(0,80,255) !important" href="https://app.crisp.chat/initiate/signup/" target="_blank">Crisp panel</a> You are. After successful registration, on the dashboard page of the user panel on the wheelchair icon orSettings Hit and from the left menu of the optionWebsite Settings Press. On the screen displayed on the optionSettings Click and on the new page on the optionSetup Instructions click. On the new screen on the blue buttonChatbox Setup Instructions Click and from the popup menu of the optionHTML Select. And finally copy the received code on the last page and enter the box above.`,
  },
  {
    name: ONLINE_SUPPROT_INSTAGRAM,
    link: "https://instagram.com/",
    icon: `/images/instagram.svg`,
    status: ONLINE_SUPPORT_CHANNEL_IS_ACTIVE,
    description:
      "To operate the profile link on Instagram, simply write down the username in the box above.",
  },
];

export const contactChannelsPrefix = {
  whatsapp: {
    prefix: "https://api.whatsapp.com/send/?phone=",
  },
  telegram: {
    prefix: "https://t.me/",
  },
  sms: {
    prefix: "sms:",
  },
  email: {
    prefix: "mailto:",
  },
  call: {
    prefix: "tel:",
  },
  raychat: {
    prefix: "",
  },
  crisp: {
    prefix: "",
  },
  instagram: {
    prefix: "https://instagram.com/",
  },
};
