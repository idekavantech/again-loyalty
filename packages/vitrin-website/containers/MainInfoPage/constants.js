import { uniqueId } from "lodash";

export const GrowthOpportunities = [
  {
    id: uniqueId(),
    title: "باشگاه مشتریان",
    label: "customer_club",
  },
  {
    id: uniqueId(),
    title: "سئو (دیده شدن در گوگل)",
    label: "seo",
  },
  {
    id: uniqueId(),
    title: "حسابداری و فروش",
    label: "accounting",
  },
  {
    id: uniqueId(),
    title: "تبلیغات آنلاین",
    label: "online_ads",
  },
  {
    id: uniqueId(),
    title: "هنوز نمی‌دانم، مشاوره می‌خواهم",
    label: "more_info",
  },
];

export const MainInfoPageSteps = {
  information: 1,
  promotion: 2,
  selectLocation: 3,
  addImages: 4,
  sale: 5,
};
