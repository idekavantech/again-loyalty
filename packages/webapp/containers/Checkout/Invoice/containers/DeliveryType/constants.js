import { generateTimeRange } from "@saas/utils/helpers/generateTimeRange";

export const flickityOptions = {
    rightToLeft: true,
    pageDots: false,
    cellAlign: "right",
    freeScroll: true,
    contain: true,
    draggable: false,
};

export const preOrderTimeRanges = generateTimeRange(30);
export const SELECT_DELIVERY_TYPE_DROPDOWN = "SELECT_DELIVERY_TYPE_DROPDOWN";
export const FAST_PREORDER_TIME_RANGE_SELECT_DRAWER =
    "FAST_PREORDER_TIME_RANGE_SELECT_DRAWER";
export const SCHEDULED_TIME_RANGE_SELECT_DRAWER = "SCHEDULED_TIME_RANGE_SELECT_DRAWER";
export const FAST_PREORDER_TIME_RANGE_SELECT_MODAL =
    "FAST_PREORDER_TIME_RANGE_SELECT_MODAL";
export const SCHEDULED_TIME_RANGE_SELECT_MODAL = "SCHEDULED_TIME_RANGE_SELECT_MODAL";

export const DELIVERY_TYPE_FAST_IN_BUSINESS_TIME_CLOSED_MESSAGE =
    "این روش ارسال در این لحظه غیرفعال می‌باشد.";

export const DELIVERY_TYPE_FAST_IN_BUSINESS_TIME_CLOSED =
    "DELIVERY_TYPE_FAST_IN_BUSINESS_TIME_CLOSED";
export const PREORDER_TYPE = "PREORDER_TYPE";