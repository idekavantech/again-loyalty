import uniqueId from "lodash/uniqueId";
export const footerMenus = [
  { id: uniqueId(), label: "طراحی سایت", link: "/" },
  {
    id: uniqueId(),
    label: "طراحی سایت فروشگاهی",
    link: "/shopping",
  },
  {
    id: uniqueId(),
    label: "سایت ساز",
    link: "/site-builder",
  },
  {
    id: uniqueId(),
    label: "فروشگاه ساز",
    link: "/shop-builder",
  },
  {
    id: uniqueId(),
    label: "طراحی سایت شخصی",
    link: "/website/t~personal",
  },
  {
    id: uniqueId(),
    label: "طراحی سایت شرکتی",
    link: "/website/t~corporate",
  },
];
