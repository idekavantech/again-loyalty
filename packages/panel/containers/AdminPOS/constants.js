import { actions, border, surface, text } from "@saas/utils/colors";

export const CASH_DRAWER_TYPE_OPEN = "1";
export const CASH_DRAWER_TYPE_FINISHED = "2";
export const CASH_DRAWER_TYPE_CLOSED = "3";

export const cashDrawerTypes = [
  {
    id: CASH_DRAWER_TYPE_OPEN,
    title: "Open boxes",
    color: text.success,
    borderColor: border.success,
    surfaceColor: surface.success.default,
    text: "Open",
  },
  {
    id: CASH_DRAWER_TYPE_FINISHED,
    title: "Untidered funds",
    color: text.critical,
    borderColor: actions.critical.default,
    surfaceColor: surface.critical.default,
    text: "Not checked",
  },
  {
    id: CASH_DRAWER_TYPE_CLOSED,
    title: "Closed boxes",
    color: text.default,
    borderColor: border.default,
    surfaceColor: surface.neutral.default,
    text: "Closed",
  },
];
