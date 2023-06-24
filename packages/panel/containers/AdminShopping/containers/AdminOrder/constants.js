import { assignDeliveryMan, requestAlopeyk, requestMiare } from "store/actions";
import { jungleI, pollution, strawberryII } from "@saas/utils/colors";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import moment from "moment";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import ErrorRoundedIcon from "@material-ui/icons/ErrorRounded";

export const paymentTypes = {
  2: {
    label: "in place",
    progress: "100%",
    color: pollution,
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  1: {
    label: "Online",
    progress: "100%",
    color: pollution,
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
};
export const deliverersIcon = {
  miare: `/images/Miare.png`,
  alopeyk: `/images/Alopeyk.png`,
  personal_peyk: `/images/Delivery.png`,
};
export const deliverersClickEvents = {
  miare: requestMiare,
  alopeyk: requestAlopeyk,
  personal_peyk: assignDeliveryMan,
};
export const deliverer_companies_dict = {
  alopeyk_api_token: { label: "Alopic", value: "alopeyk" },
  miare_api_token: { label: "Come", value: "miare" },
};
export const NAVIGATION_MODAL = "NAVIGATION_MODAL";
export const ACCEPT_ORDER_MODAL = "ACCEPT_ORDER_MODAL";
export const CHANGE_ADDRESS_MODAL = "CHANGE_ADDRESS_MODAL";
export const ASSIGN_CUSTOMER_MODAL = "ASSIGN_CUSTOMER_MODAL";
export const ASSIGN_COURIER_MODAL = "ASSIGN_COURIER_MODAL";
export const ADD_CUSTOMER_DESCRIPTION_MODAL = "ADD_CUSTOMER_DESCRIPTION_MODAL";
export const ADD_NOTE_MODAL = "ADD_NOTE_MODAL";
export const CANCEL_ORDER_MODAL_COMP = "CANCEL_ORDER_MODAL_COMP";
export const CANCEL_ORDER_MODAL_VOID = "CANCEL_ORDER_MODAL_VOID";
export const RECEIVE_ORDER_MODAL = "RECEIVE_ORDER_MODAL";
export const EDIT_USER_IN_ORDER_MODAL = "EDIT_USER_IN_ORDER_MODAL";
export const EDIT_DELIVERY_TIME_MODAL = "EDIT_DELIVERY_TIME_MODAL";

export const RETURN_MONEY_TO_CUSTOMER_WALLET_MODAL =
  "RETURN_MONEY_TO_CUSTOMER_WALLET_MODAL";
export const RETURN_MONEY_TO_CUSTOMER_BY_CASH_OR_CART_MODAL =
  "RETURN_MONEY_TO_CUSTOMER_BY_CASH_OR_CART_MODAL";
export const RECIEVE_MONEY_FROM_CUSTOMER_BY_WALLET_MODAL =
  "RECIEVE_MONEY_FROM_CUSTOMER_BY_WALLET_MODAL";
export const RECIEVE_MONEY_FROM_CUSTOMER_BY_SMS_MODAL =
  "RECIEVE_MONEY_FROM_CUSTOMER_BY_SMS_MODAL";
export const RECIEVE_MONEY_FROM_CUSTOMER_BY_CASH_MODAL =
  "RECIEVE_MONEY_FROM_CUSTOMER_BY_CASH_MODAL";
export const RECIEVE_MONEY_FROM_CUSTOMER_BY_CART_MODAL =
  "RECIEVE_MONEY_FROM_CUSTOMER_BY_CART_MODAL";
export const CHECKOUT_AFTER_CANCELING_ORDER_MODAL =
  "CHECKOUT_AFTER_CANCELING_ORDER_MODAL";

export const $ = `/images/$.svg`;

export const DELIVERY_TIME = "delivery_time";
export const DELIVERY_INTERVAL = "delivery_interval";

//////// START OF LOG TYPE CONSTANTS

export const LOG_TYPE_CREATED_ORDER = "created";
export const LOG_TYPE_ACCEPTED_ORDER = "accepted";
export const LOG_TYPE_EDITED_ORDER = "edited";
export const LOG_TYPE_SEND_RECEIPT = "receipt";
export const LOG_TYPE_PAID_CASH = "paid_cash";
export const LOG_TYPE_PAID_CARD = "paid_card";
export const LOG_TYPE_PAID_POS = "paid_pos";
export const LOG_TYPE_PAID_WALLET = "paid_wallet";
export const LOG_TYPE_RETURN_CASH = "return_cash";
export const LOG_TYPE_RETURN_CARD = "return_card";
export const LOG_TYPE_RETURN_WALLET = "return_wallet";
export const LOG_TYPE_ASSIGN_DELIVERY = "assign_delivery";
export const LOG_TYPE_DELIVERY_CANCELED = "cancel_delivery";
export const LOG_TYPE_DELIVERED = "delivered";
export const LOG_TYPE_COMMENT = "comment";
export const LOG_TYPE_PRINT_ORDER = "print";
export const LOG_TYPE_NEW_ORDER = "new";
export const LOG_TYPE_COMP_ORDER = "comp";
export const LOG_TYPE_VOID_ORDER = "void";
export const LOG_TYPE_READY_TO_DELIVERY_ORDER = "ready_to_deliver";
export const LOG_TYPE_COURIER_ASSIGNED_TO_ORDER = "courier_assigned";
export const LOG_TYPE_COURIER_PICKED_UP_ORDER = "courier_picked_up";
export const LOG_TYPE_COMPLETED_ORDER = "completed";
export const LOG_TYPE_EDITED_DELIVERY_TIME_OF_ORDER = "edited_delivery_time";

//////// END OF LOG TYPE CONSTANTS

export const groupByKey = (list, key) =>
  list?.reduce?.(
    (hash, obj) => ({
      ...hash,
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    }),
    {}
  );

export const orderHistorySerializer = (order_history) =>
  groupByKey(
    order_history?.map?.((order_item) => ({
      ...order_item,
      group_date: order_item.timestamp,
    })),
    "group_date"
  );

export const orderTimeLineComponentsByType = {
  [LOG_TYPE_CREATED_ORDER]: () => <div>The new order was registered.</div>,
  [LOG_TYPE_ACCEPTED_ORDER]: (pos_user_name) => (
    <div>This order by{pos_user_name || "User without name"} Confirmed.</div>
  ),
  [LOG_TYPE_VOID_ORDER]: (pos_user_name) => (
    <div>
      This order by{pos_user_name || "User without name"} Canceled and all items to
      The warehouse was returned..
    </div>
  ),
  [LOG_TYPE_COMP_ORDER]: (pos_user_name) => (
    <div>This order by{pos_user_name || "User without name"} Cancelled.</div>
  ),
  [LOG_TYPE_NEW_ORDER]: (pos_user_name) => (
    <div>
      The status of this order by{pos_user_name || "User without name"} To the examination
      Changed.
    </div>
  ),
  [LOG_TYPE_EDITED_ORDER]: (pos_user_name) => (
    <div>This order by{pos_user_name || "User without name"} Edited.</div>
  ),

  [LOG_TYPE_COMMENT]: (pos_user_name) => (
    <div>This order by{pos_user_name || "User without name"} Edited.</div>
  ),

  [LOG_TYPE_SEND_RECEIPT]: (pos_user_name) => (
    <div>
      The remaining payment message of the order amount by{pos_user_name || "User without name"}{" "}
      Sent.
    </div>
  ),
  [LOG_TYPE_PAID_CASH]: () => (
    <div>The rest of the order amount was paid by the customer.</div>
  ),
  [LOG_TYPE_PAID_CARD]: () => (
    <div>The rest of the order amount was paid by the Customer by the customer.</div>
  ),

  [LOG_TYPE_PAID_POS]: () => (
    <div>The rest of the order amount was paid by the customer by the customer.</div>
  ),
  [LOG_TYPE_PAID_WALLET]: () => (
    <div>The rest of the order amount was paid through the wallet by the customer.</div>
  ),
  [LOG_TYPE_RETURN_CASH]: (pos_user_name) => (
    <div>
      The rest of the order amount in cash by{pos_user_name || "User without name"}{" "}
      Paid.
    </div>
  ),
  [LOG_TYPE_RETURN_CARD]: (pos_user_name) => (
    <div>
      The rest of the order amount to card to card by{" "}
      {pos_user_name || "User without name"} Paid.
    </div>
  ),
  [LOG_TYPE_RETURN_WALLET]: (pos_user_name) => (
    <div>
      The rest of the order amount to the customer's wallet by{pos_user_name || "User without name"}{" "}
      Paid.
    </div>
  ),
  [LOG_TYPE_ASSIGN_DELIVERY]: (pos_user_name) => (
    <div>Courier by{pos_user_name || "User without name"} Was dedicated.</div>
  ),
  [LOG_TYPE_DELIVERED]: () => <div>delivered.</div>,
  [LOG_TYPE_DELIVERY_CANCELED]: () => <div>The delivery of the order was canceled..</div>,
  [LOG_TYPE_READY_TO_DELIVERY_ORDER]: () => <div>Was ready to deliver.</div>,
  [LOG_TYPE_COURIER_PICKED_UP_ORDER]: () => (
    <div>Received the order courier.</div>
  ),
  [LOG_TYPE_PRINT_ORDER]: (pos_user_name) => (
    <div>Print by{pos_user_name || "User without name"} It was taken.</div>
  ),
  [LOG_TYPE_COURIER_ASSIGNED_TO_ORDER]: (pos_user_name) => (
    <div>Courier by{pos_user_name || "User without name"} Was dedicated.</div>
  ),
  [LOG_TYPE_COMPLETED_ORDER]: (pos_user_name) => (
    <div>Order by{pos_user_name || "User without name"} It was closed.</div>
  ),
  [LOG_TYPE_EDITED_DELIVERY_TIME_OF_ORDER]: (pos_user_name) => (
    <div>
      The time of delivery of order by{pos_user_name || "User without name"} Edited.
    </div>
  ),
};

export const notificationByOrderHistoryType = {
  [LOG_TYPE_CREATED_ORDER]: null,
  [LOG_TYPE_DELIVERY_CANCELED]: null,
  [LOG_TYPE_ACCEPTED_ORDER]: ({ order }) => ({
    color: jungleI,
    content: `Order${englishNumberToPersianNumber(order.order_id)} Confirmed.`,
    icon: CheckCircleRoundedIcon,
  }),
  [LOG_TYPE_VOID_ORDER]: ({ order }) => ({
    color: strawberryII,
    content: `Order${englishNumberToPersianNumber(
      order.order_id
    )} Canceled and all items were returned to the warehouse.`,
    icon: ErrorRoundedIcon,
  }),
  [LOG_TYPE_COMP_ORDER]: ({ order }) => ({
    color: strawberryII,
    content: `Order${englishNumberToPersianNumber(order.order_id)} Cancelled.`,
    icon: ErrorRoundedIcon,
  }),
  [LOG_TYPE_EDITED_ORDER]: ({ order }) => ({
    color: "#ffaa00",
    content:
      order?.total_price > order?.paid_price
        ? `Customer to you${priceFormatter(
            order?.total_price - order?.paid_price
          )} $ owes.`
        : `You${priceFormatter(
            order?.paid_price - order?.total_price
          )} $ owed to the customer.`,
    icon: ErrorRoundedIcon,
  }),
  [LOG_TYPE_NEW_ORDER]: ({ order }) => ({
    color: "#ffaa00",
    content: `Order status${englishNumberToPersianNumber(
      order.order_id
    )} Changed to the survey.`,
    icon: ErrorRoundedIcon,
  }),
  [LOG_TYPE_SEND_RECEIPT]: () => ({
    color: jungleI,
    content: "The remaining payment message was sent by you.",
    icon: CheckCircleRoundedIcon,
  }),

  [LOG_TYPE_PAID_CASH]: () => ({
    color: jungleI,
    content: "The rest of the order amount was paid by the customer.",
    icon: CheckCircleRoundedIcon,
  }),

  [LOG_TYPE_PAID_CARD]: () => ({
    color: jungleI,
    content: "The rest of the order amount was paid by the Customer by the customer.",
    icon: CheckCircleRoundedIcon,
  }),
  [LOG_TYPE_PAID_POS]: () => ({
    color: jungleI,
    content: "The rest of the order amount was paid by the customer by the customer.",
    icon: CheckCircleRoundedIcon,
  }),

  [LOG_TYPE_PAID_WALLET]: () => ({
    color: jungleI,
    content: "The rest of the order amount was paid through the wallet by the customer.",
    icon: CheckCircleRoundedIcon,
  }),

  [LOG_TYPE_RETURN_CASH]: () => ({
    color: jungleI,
    content: "The rest of the order amount was paid by you.",
    icon: CheckCircleRoundedIcon,
  }),

  [LOG_TYPE_RETURN_CARD]: () => ({
    color: jungleI,
    content: "The rest of the order amount was paid by card to card by you.",
    icon: CheckCircleRoundedIcon,
  }),

  [LOG_TYPE_RETURN_WALLET]: () => ({
    color: jungleI,
    content: "The rest was paid to the customer's wallet by you.",
    icon: CheckCircleRoundedIcon,
  }),

  [LOG_TYPE_ASSIGN_DELIVERY]: () => ({
    color: jungleI,
    content: "The courier was assigned by you.",
    icon: CheckCircleRoundedIcon,
  }),
  [LOG_TYPE_COURIER_ASSIGNED_TO_ORDER]: () => ({
    color: jungleI,
    content: "The courier was assigned by you.",
    icon: CheckCircleRoundedIcon,
  }),
  [LOG_TYPE_READY_TO_DELIVERY_ORDER]: () => ({
    color: jungleI,
    content: "Was ready to deliver.",
    icon: CheckCircleRoundedIcon,
  }),
  [LOG_TYPE_COURIER_PICKED_UP_ORDER]: () => ({
    color: jungleI,
    content: "The courier delivered the order.",
    icon: CheckCircleRoundedIcon,
  }),
  [LOG_TYPE_COMPLETED_ORDER]: () => ({
    color: jungleI,
    content: "The order was closed.",
    icon: CheckCircleRoundedIcon,
  }),
  [LOG_TYPE_EDITED_DELIVERY_TIME_OF_ORDER]: () => ({
    color: jungleI,
    content: "The order time was edited.",
    icon: CheckCircleRoundedIcon,
  }),
};
