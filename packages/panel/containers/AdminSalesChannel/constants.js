

const getImageUrl = (name) =>
  `/images/sales_channels/sales_channel_${name}.png`;

const getVideoUrl = (name) =>
  `https://hs3-cdn-saas.behtarino.com/static/panel/saleschannel/${name}.mp4`;
export const SALES_CHANNELS = [
  {
    name: "Bestino",
    description:
      "The best is a business introduction platform that has 2 million visitors a month. See with the best in Google's top results and attract more customers.",
    image: getImageUrl("behtarino"),
    cta: {
      text: "Sign up in the best.",
      link: "https://behtarino.com/precreate",
    },
    video: getVideoUrl("behtarino"),
  },
  {
    name: "Rabboo",
    description:
      "Visitors to the Torb site are looking to compare products in different online stores,. Draw their attention to your site.",
    image: getImageUrl("torob"),
    cta: {
      text: "Horrying enrollment",
      link: "https://panel.torob.com/s",
    },
    video: getVideoUrl("torob"),
  },
  {
    name: "Imals",
    description:
      "Imals is one of the most popular online sales platforms that connect customers to the sellers site. With Imalas you can increase your online store visit.",
    image: getImageUrl("emalls"),
    cta: {
      text: "Enrollment in Imalas",
      link: "https://emalls.ir/ShopRequest/",
    },
    video: getVideoUrl("emalls"),
  },
  {
    name: "Instagram",
    description:
      "With the site link in Bioo, Story and Instagram posts, direct your Instagram account audience to the site and online shopping.",
    image: getImageUrl("instagram"),
    cta: {
      text: "Receive advice",
      link: "https://atro.agency/",
    },
    video: getVideoUrl("instagram"),
  },
  {
    name: "Again",
    description:
      "Your current customers are the main business capital of your business;Don't say goodbye to them! With Customer Club Software«Again», You can get them back from your store to repurchase.",
    image: getImageUrl("dobare"),
    cta: {
      text: "Club activation",
      link: "https://dobare.me/",
    },
    video: getVideoUrl("dobare"),
  },
  {
    name: "QR Code",
    description:
      "If you have in -person sales, easily by putting aQR Code In your store you can turn your customer into your site user.",
    image: getImageUrl("qr"),
    cta: {
      text: "BuildQR Code",
      link: "https://bizarar.ir/qrcode-generator",
    },
    video: getVideoUrl("qr"),
  },
  {
    name: "Google map",
    description:
      "Register your store address and its website on Google Map so you can enter your customers on the map..",
    image: getImageUrl("gmap"),
    cta: {
      text: "Position registration",
      link: "https://www.google.com/maps",
    },
    video: getVideoUrl("gmap"),
  },
  {
    name: "The article",
    description:
      "Using SEO techniques(Site Optimization for search engines), Bring your site to Google's front page to grow your site's visit.",
    image: getImageUrl("seo"),
    cta: {
      text: "Receive advice",
      link: "https://atro.agency/",
    },
    video: getVideoUrl("seo"),
  },
  {
    name: "Google Adz",
    description:
      "If you want to shorten the long time SEO at the expense, you can advertise on Google(Google Adz) Choose the shortcut and be the link to a Google.",
    image: getImageUrl("gads"),
    cta: {
      text: "Receive advice",
      link: "https://atro.agency/",
    },
    video: getVideoUrl("gads"),
  },
  {
    name: "One",
    description:
      "To increase your visit and sale, you can visit the same advertising with this platform on high -profile Iranian sites..",
    image: getImageUrl("yektanet"),
    cta: {
      text: "Advertise",
      link: "https://www.yektanet.com/",
    },
    video: getVideoUrl("yektanet"),
  },
  {
    name: "Taples",
    description:
      "Get help from Taples to run a variety of ads in mobile apps such as banner and video in -app promotional to bring your site closer to your audience.",
    image: getImageUrl("tapsell"),
    cta: {
      text: "Advertisement",
      link: "https://tapsell.ir/",
    },
    video: getVideoUrl("tapsell"),
  },
  {
    name: "Media",
    description:
      "Madia Ede is a digital advertising platform with which you can show banner and text ads and products on visited sites..",
    image: getImageUrl("mediaad"),
    cta: {
      text: "Advertisement in Media Ed",
      link: "https://mediaad.org/",
    },
    video: getVideoUrl("media-ad"),
  },
];
