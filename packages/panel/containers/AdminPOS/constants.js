import { actions, border, surface, text } from "@saas/utils/colors";

export const CASH_DRAWER_TYPE_OPEN = "1";
export const CASH_DRAWER_TYPE_FINISHED = "2";
export const CASH_DRAWER_TYPE_CLOSED = "3";

export const cashDrawerTypes = [
  {
    id: CASH_DRAWER_TYPE_OPEN,
    title: "صندوق‌های باز",
    color: text.success,
    borderColor: border.success,
    surfaceColor: surface.success.default,
    text: "باز",
  },
  {
    id: CASH_DRAWER_TYPE_FINISHED,
    title: "صندوق‌های بررسی‌نشده",
    color: text.critical,
    borderColor: actions.critical.default,
    surfaceColor: surface.critical.default,
    text: "بررسی‌نشده",
  },
  {
    id: CASH_DRAWER_TYPE_CLOSED,
    title: "صندوق‌های بسته‌شده",
    color: text.default,
    borderColor: border.default,
    surfaceColor: surface.neutral.default,
    text: "بسته",
  },
];
