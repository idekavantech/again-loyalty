import uniqueId from "lodash/uniqueId";

export const headerMenus = [
  {
    id: uniqueId(),
    label: "شروع کنید",
    subMenu: [
      { id: uniqueId(), label: "قالب سایت", link: "/cr~templates" },
      { id: uniqueId(), label: "نمونه سایت", link: "/examples" },
      { id: uniqueId(), label: "منو دیجیتال", link: "/digital-menu" },
    ],
  },
  {
    id: uniqueId(),
    label: "بیشتر بدانید",
    subMenu: [
      {
        id: uniqueId(),
        label: "چرا ویترین",
        link: "/reports",
      },
      {
        id: uniqueId(),
        label: "امکانات ویترین",
        link: "/features",
      },
      {
        id: uniqueId(),
        label: "راهنمای ویترین",
        link: "https://help.vitrin.me",
      },
      {
        id: uniqueId(),
        label: "آموزش سئو",
        link: "https://vitrin.me/blog/84542-%D8%A2%D9%85%D9%88%D8%B2%D8%B4-%D8%B3%D8%A6%D9%88",
      },
    ],
  },
];
