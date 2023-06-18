import React, { memo, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import DirectionsRoundedIcon from "@material-ui/icons/DirectionsRounded";
import {
  makeSelectBusiness,
  makeSelectBusinessPhone,
  makeSelectBusinessThemeColor,
  makeSelectBusinessTitle,
} from "@saas/stores/business/selector";
import { makeSelectAuthorization, makeSelectUserOrder } from "../../selectors";
import { emptyCart, getOrder } from "../../actions";
import {
  FULFILLMENT_CARRY_OUT,
  FULFILLMENT_ON_BUSINESS_SITE,
  FULFILLMENT_ON_CAR,
  FULFILLMENT_ON_USER_SITE,
  FULFILLMENT_ON_WEBSITE,
  NEW_ORDER_STATUS_ACCEPTED,
  NEW_ORDER_STATUS_CART,
  NEW_ORDER_STATUS_COMP,
  NEW_ORDER_STATUS_COMPLETED,
  NEW_ORDER_STATUS_COURIER_ASSIGNED,
  NEW_ORDER_STATUS_COURIER_PICKED_UP,
  NEW_ORDER_STATUS_DELIVERED,
  NEW_ORDER_STATUS_NEW,
  NEW_ORDER_STATUS_OPEN_TAB,
  NEW_ORDER_STATUS_READY_TO_DELIVER,
  NEW_ORDER_STATUS_VOID,
  REMINDING,
  SHOPPING_ORDER_INVOICE_DTO,
} from "../../constants";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { googleMapsNavigate } from "@saas/utils/helpers/googleMapsNavigate";

import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";

import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { getCountDown } from "@saas/utils/helpers/getCountDown";

import { hexToRGBA } from "@saas/utils/helpers/hexToRGBA";
import { deliveryIntervalFormatter } from "@saas/utils/helpers/deliveryIntervalFormatter";

import { deliveryTimeFormatter } from "@saas/utils/helpers/deliveryTimeFormatter";

import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import {
  coal,
  graphite,
  night,
  pollution,
  strawberryI,
  strawberryII,
} from "@saas/utils/colors";
import { useRouter } from "next/router";
import Icon from "@saas/components/Icon";
import { $ } from "@saas/icons";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import Image from "next/image";


const blueToman = `/images/blue-$.svg`;

const DELIVERY_TIME = "delivery_time";
const DELIVERY_INTERVAL = "delivery_interval";

const ORDER_STEP_STATUS_CURRENT = "ORDER_STEP_STATUS_CURRENT";
const ORDER_STEP_STATUS_PENDING = "ORDER_STEP_STATUS_PENDING";
const ORDER_STEP_STATUS_PASSED = "ORDER_STEP_STATUS_PASSED";

const deliveryTypes = {
  [FULFILLMENT_ON_USER_SITE]: {
    label: "delivery",
    icon: `/images/bike.svg`,
  },
  [FULFILLMENT_CARRY_OUT]: {
    label: "In-person delivery",
    icon: `/images/man.svg`,
  },
  [FULFILLMENT_ON_BUSINESS_SITE]: {
    label: "Cedar in place",
    icon: `/images/serve.svg`,
  },
  [FULFILLMENT_ON_CAR]: {
    label: "In -car delivery",
    icon: `/images/man.svg`,
  },
  [FULFILLMENT_ON_WEBSITE]: {
    label: "Virtual receipt",
    icon: `/images/phonelink.svg`,
  },
};

const paymentTypes = {
  online: {
    label: "Online",
    iconProgress: "100%",
    iconColor: pollution,
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  cash: {
    label: "Cash",
    iconProgress: "100%",
    iconColor: pollution,
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  card: {
    label: "Card to card",
    iconProgress: "100%",
    iconColor: pollution,
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  wallet: {
    label: "wallet",
    iconProgress: "100%",
    iconColor: pollution,
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
  pos: {
    label: "in place",
    iconProgress: "0%",
    iconColor: strawberryII,
    backgroundColor:
      "linear-gradient(0deg, rgba(255, 0, 56, 0.16), rgba(255, 0, 56, 0.16)), #FFFFFF",
  },
  third_party: {
    label: "Payment of Third Service",
    iconProgress: "100%",
    iconColor: pollution,
    backgroundColor: "rgba(152, 169, 177, 0.16)",
  },
};
const orderStatus = {
  [NEW_ORDER_STATUS_NEW]: {
    order: 0,
    status: NEW_ORDER_STATUS_NEW,
    label: "Your order was successfully registered.",
  },
  [NEW_ORDER_STATUS_ACCEPTED]: {
    order: 1,
    status: NEW_ORDER_STATUS_ACCEPTED,
    label: "Your order was approved..",
  },
  [NEW_ORDER_STATUS_READY_TO_DELIVER]: {
    order: 2,
    status: NEW_ORDER_STATUS_READY_TO_DELIVER,
    label: {
      [FULFILLMENT_ON_USER_SITE]: "Your order is being prepared.",
      [FULFILLMENT_CARRY_OUT]:
        "You can visit us in person to get your order.",
      [FULFILLMENT_ON_CAR]:
        "You can visit us in person to get your order and get your order in the car.",
      [FULFILLMENT_ON_BUSINESS_SITE]:
        "You can visit us in person for your order.",
      [FULFILLMENT_ON_WEBSITE]: "Your order is preparing and sending.",
    },
  },
  [NEW_ORDER_STATUS_DELIVERED]: {
    order: 3,
    status: NEW_ORDER_STATUS_DELIVERED,
    label: {
      [FULFILLMENT_ON_USER_SITE]: "Your order was successfully sent.",
      [FULFILLMENT_CARRY_OUT]: "Your order was delivered.",
      [FULFILLMENT_ON_CAR]: "Your order was delivered.",
      [FULFILLMENT_ON_BUSINESS_SITE]: "Your order was delivered.",
      [FULFILLMENT_ON_BUSINESS_SITE]: "Your order was successfully sent.",
    },
  },
};

const progressBarConst = {
  [REMINDING]: 1,
  [NEW_ORDER_STATUS_CART]: 1,
  [NEW_ORDER_STATUS_OPEN_TAB]: 1,
  [NEW_ORDER_STATUS_VOID]: 4,
  [NEW_ORDER_STATUS_COMP]: 4,
  [NEW_ORDER_STATUS_NEW]: 1,
  [NEW_ORDER_STATUS_ACCEPTED]: 2,
  [NEW_ORDER_STATUS_READY_TO_DELIVER]: 3,
  [NEW_ORDER_STATUS_COURIER_ASSIGNED]: 3,
  [NEW_ORDER_STATUS_COURIER_PICKED_UP]: 3,
  [NEW_ORDER_STATUS_DELIVERED]: 4,
  [NEW_ORDER_STATUS_COMPLETED]: 4,
};

export function OrderStatus({
  userOrder: order,
  _fetchOrder,
  isLoading,
  pluginData,
  business,
  themeColor,
  emptyOrders,
}) {
  const router = useRouter();
  const [timer, setTimer] = useState(null);
  const hasSentDataLayer = useRef(false);
  const [intervalId, setIntervalId] = useState(null);
  const order_status_states_amount = 4;
  const orderDeliverySiteType = order?.delivery_site_type?.toUpperCase();
  const deliveryTime =
    order?.delivery_interval?.from_time - order?.submitted_at / 1000;
  const absoluteDeliveryTime = !order?.delivery_interval?.to_time
    ? order?.delivery_interval?.from_time
    : null;
  const deliveryInterval = order?.delivery_interval;
  const remainingTimeToDelivered =
    order?.delivery_interval?.from_time - Date.now() / 1000;
  const generateOrderStatus = (orderStatus) => {
    if (
      (orderStatus >= NEW_ORDER_STATUS_ACCEPTED &&
        ((!deliveryInterval?.to_time && remainingTimeToDelivered < 0) ||
          (deliveryInterval?.to_time &&
            deliveryInterval?.to_time < Date.now() / 1000))) ||
      orderStatus >= NEW_ORDER_STATUS_COURIER_ASSIGNED
    ) {
      return NEW_ORDER_STATUS_DELIVERED;
    } else if (
      orderStatus >= NEW_ORDER_STATUS_ACCEPTED &&
      remainingTimeToDelivered > 0
    ) {
      return NEW_ORDER_STATUS_READY_TO_DELIVER;
    } else {
      return orderStatus;
    }
  };

  const local_order_status = order
    ? generateOrderStatus(order?.order_status)
    : null;

  const { minWidth768, maxWidth430 } = useResponsive();
  useEffect(() => {
    setTimeout(() => {
      emptyOrders();
      sessionStorage.removeItem(SHOPPING_ORDER_INVOICE_DTO);
    }, 500);
    setTimeout(() => {
      _fetchOrder({ id: router.query.id });
    }, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {
    let id;
    if (order && deliveryTime && !deliveryInterval?.to_time) {
      clearInterval(intervalId);
      id = setInterval(() => {
        if (order.submitted_at) {
          const timePast = (new Date() - order.submitted_at) / 1000;
          if (Math.round(timePast) % 60 === 0)
            _fetchOrder({ id: router.query.id });
          setTimer(getCountDown(remainingTimeToDelivered));
        }
      }, 1000);
      setIntervalId(id);
    }

    if (
      order &&
      order.order_status >= NEW_ORDER_STATUS_NEW &&
      hasSentDataLayer.current === false
    ) {
      const paymentMethod = order.paid_price_details?.online
        ? "Online"
        : "Cash";
      window.dataLayer.push({ ecommerce: null });
      window.dataLayer.push({
        event: "purchase",
        ecommerce: {
          merchant: order.business_site_domain,
          transaction_id: order.id,
          currency: "IRR",
          value: order.total_price * 10,
          basket_size: order.items.length,
          coupon: order.discount_code,
          discount: order.total_discount_amount * 10,
          shipping: order.delivery_price * 10,
          tax: order.taxing_price * 10,
          packaging: order.total_packaging_price * 10,
          delivery_method: order.delivery_site_type,
          items: order.items.map((item) => ({
            item_id: item.id,
            item_name: item.product_title,
            discount: +item.initial_price - +item.discounted_price,
            price: item.discounted_price,
            quantity: item.amount,
          })),
          payment_method: paymentMethod,
        },
      });

      hasSentDataLayer.current = true;
    }

    return () => clearInterval(id);
  }, [order && order.id]);

  const deliveryTimeOptions = {
    [DELIVERY_TIME]: !deliveryInterval?.to_time
      ? deliveryTime > 10800
        ? deliveryTimeFormatter(absoluteDeliveryTime)
        : englishNumberToPersianNumber(timer)
      : null,
    [DELIVERY_INTERVAL]: deliveryInterval
      ? deliveryIntervalFormatter(deliveryInterval)
      : null,
  };

  const finalDeliveryTime =
    deliveryTimeOptions[DELIVERY_TIME] ||
    deliveryTimeOptions[DELIVERY_INTERVAL];

  if (isLoading || !order) {
    return (
      <div style={{ height: 300 }}>
        <LoadingIndicator />
      </div>
    );
  }
  let cost = pluginData.data.delivery_costs_by_user
    ? "Customer"
    : "Free";
  if (order && +order.delivery_price !== 0)
    cost = `${priceFormatter(+order.delivery_price)}`;

  const totalAmount = order?.items.reduce(
    (sum, orderItem) => sum + orderItem.amount,
    0
  );
  const orderDate = order && new Date(order.submitted_at);
  const orderTime =
    order &&
    moment(
      `${orderDate.getFullYear()}-${
        orderDate.getMonth() + 1
      }-${orderDate.getDate()}`,
      "YYYY-MM-DD"
    );

  const progressBar = (currentStep, allStep, color) => {
    return (
      <div
        className="w-100"
        style={{
          position: "relative",
          backgroundColor: hexToRGBA(color, 0.1),
          height: 8,
          borderRadius: 4,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            backgroundColor: hexToRGBA(color, 0.5),
            width: `${(currentStep / allStep) * 100}%`,
            borderRadius: 4,
            height: "100%",
          }}
        ></div>
      </div>
    );
  };
  const ordersStyles = {
    [ORDER_STEP_STATUS_PASSED]: {
      parent: {},
      child: {
        backgroundColor: themeColor,
      },
    },
    [ORDER_STEP_STATUS_CURRENT]: {
      parent: {
        border: `1px solid ${themeColor}`,
      },
      child: {
        backgroundColor: themeColor,
      },
    },
    [ORDER_STEP_STATUS_PENDING]: {
      parent: {},
      child: {
        backgroundColor: "transparent",
        border: `1px solid ${themeColor}`,
      },
    },
  };
  const isPaidPriceOnLocation =
    order.paid_price_details &&
    !Object?.values?.(order.paid_price_details).filter(
      (item) => Boolean(item) === true
    )?.length;
  const sortedOrderStatuses =
    order && Object.values(orderStatus).sort((a, b) => a.order - b.order);

  const pelateChar = order?.user_address?.extra_data?.plate_number?.replace(
    /[0-9]/g,
    ""
  );
  const plateNums = order?.user_address?.extra_data?.plate_number?.replace(
    pelateChar,
    ""
  );

  return (
    <div style={{ backgroundColor: "#F6F6F7" }}>
      <div className="container col-12 col-md-8">
        {pluginData?.data?.order_progressing_image_url && (
          <Paper style={{ backgroundColor: "#ffffff" }} className="my-5 py-3">
            <div className="d-flex justify-content-center">
              <img
                alt=""
                className=""
                style={{ height: 200, maxWidth: "100%" }}
                src={pluginData?.data?.order_progressing_image_url}
              />
            </div>
          </Paper>
        )}
        <Paper style={{ backgroundColor: "#ffffff" }} className="my-5 py-1">
          <div className="d-flex justify-content-between align-items-center py-2 px-4">
            <div
              style={
                minWidth768
                  ? {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  : {
                      display: "block",
                    }
              }
            >
              <div
                style={{
                  fontSize: 11,
                  color: "#98A9B1",
                  paddingBottom: `${minWidth768 ? "0px" : "5px"}`,
                }}
                className="ml-2"
              >
                Order registration date
              </div>
              <div style={{ fontSize: 14, color: hexToRGBA(night, 0.8) }}>
                {order
                  ? englishNumberToPersianNumber(
                      orderTime.format("YYYY/MM/DD")
                    )
                  : null}
              </div>
            </div>
            <div
              style={
                minWidth768
                  ? {
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }
                  : {
                      display: "block",
                    }
              }
            >
              <div
                style={{
                  fontSize: 11,
                  color: "#98A9B1",
                  paddingBottom: `${minWidth768 ? "0px" : "5px"}`,
                }}
                className="ml-2"
              >
                Order number
              </div>
              <div style={{ fontSize: 14, color: hexToRGBA(night, 0.8) }}>
                {order && englishNumberToPersianNumber(order.order_id)}
              </div>
            </div>
          </div>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #EDEDED",
              height: 1,
              width: "100%",
              padding: 0,
            }}
          />

          <div className="px-4 py-4">
            {progressBar(
              progressBarConst[local_order_status],
              order_status_states_amount,
              themeColor
            )}
          </div>
          <div>
            {order &&
            (local_order_status === NEW_ORDER_STATUS_VOID ||
              local_order_status === NEW_ORDER_STATUS_COMP) ? (
              <>
                <div className="px-4 py-4">
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        borderRadius: "100%",
                      }}
                    >
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          backgroundColor: themeColor,
                          margin: 2,
                          borderRadius: "100%",
                        }}
                      ></div>
                    </div>
                    <div
                      className="mr-2"
                      style={{ fontSize: 13, color: graphite }}
                    >
                      Your order was successfully registered.
                    </div>
                  </div>
                </div>

                <hr
                  style={{
                    textAlign: "right",
                    border: "none",
                    borderTop: `3px solid ${themeColor}`,
                    width: "21px",
                    marginRight: 13,
                    color: themeColor,
                    transform: "rotate(90deg)",
                  }}
                />
                <div className="px-4 py-4">
                  <div className="d-flex align-items-center">
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{
                        borderRadius: "100%",
                        border: `1px solid ${strawberryI}`,
                      }}
                    >
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          backgroundColor: strawberryI,
                          margin: 2,
                          borderRadius: "100%",
                        }}
                      ></div>
                    </div>
                    <div
                      className="mr-2"
                      style={{ fontSize: 13, color: graphite }}
                    >
                      Unfortunately your order was canceled..
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div>
                {sortedOrderStatuses?.map((value, index) => {
                  const ordersStylesStatus =
                    local_order_status === value.status
                      ? ORDER_STEP_STATUS_CURRENT
                      : local_order_status < value.status
                      ? ORDER_STEP_STATUS_PENDING
                      : ORDER_STEP_STATUS_PASSED;
                  const previousValue = index
                    ? sortedOrderStatuses[index - 1]
                    : null;
                  const previousStepStatus = previousValue
                    ? local_order_status === previousValue.status
                      ? ORDER_STEP_STATUS_CURRENT
                      : local_order_status < previousValue.status
                      ? ORDER_STEP_STATUS_PENDING
                      : ORDER_STEP_STATUS_PASSED
                    : null;
                  return (
                    <>
                      {index !== 0 ? (
                        <hr
                          style={{
                            textAlign: "right",
                            border: "none",
                            borderTop:
                              previousStepStatus === ORDER_STEP_STATUS_PENDING
                                ? `1px dashed ${themeColor}`
                                : `3px solid ${themeColor}`,
                            width: `${
                              value.status === NEW_ORDER_STATUS_DELIVERED
                                ? "35px"
                                : "27px"
                            }`,
                            marginRight: `${
                              value.status === NEW_ORDER_STATUS_DELIVERED
                                ? "5px"
                                : "10px"
                            }`,
                            marginTop: `${
                              value.status === NEW_ORDER_STATUS_DELIVERED
                                ? "5px"
                                : "0px"
                            }`,
                            color: themeColor,
                            transform: "rotate(90deg)",
                            backgroundColor: "transparent",
                          }}
                        />
                      ) : null}

                      <div
                        style={{ position: "relative" }}
                        className={`px-4 ${
                          value.status === NEW_ORDER_STATUS_ACCEPTED
                            ? "pt-4 pb-2 mb-3"
                            : index === sortedOrderStatuses.length - 1
                            ? "pt-5 pb-4 mt-3"
                            : "py-4"
                        }`}
                      >
                        <div className="d-flex align-items-center">
                          <div
                            className="d-flex justify-content-center align-items-center"
                            style={{
                              borderRadius: "100%",
                              ...ordersStyles[ordersStylesStatus].parent,
                            }}
                          >
                            <div
                              style={{
                                width: 10,
                                height: 10,
                                margin: 2,
                                borderRadius: "100%",
                                ...ordersStyles[ordersStylesStatus].child,
                              }}
                            ></div>
                          </div>
                          <div
                            className="d-flex mr-2 position-relative"
                            style={{ fontSize: 13, color: graphite }}
                          >
                            <div>
                              {typeof value.label === "string"
                                ? value.label
                                : value.label[orderDeliverySiteType]}
                            </div>
                            {value.status ===
                              NEW_ORDER_STATUS_READY_TO_DELIVER &&
                            finalDeliveryTime ? (
                              <div
                                className="position-absolute px-2 py-1 rounded"
                                style={{
                                  backgroundColor: hexToRGBA(pollution, 0.05),
                                  color: pollution,
                                  fontSize: 12,
                                  borderRadius: 4,
                                  width: minWidth768 ? "max-content" : "",
                                  top: 30,
                                  right: 0,
                                }}
                              >
                                <div className="d-flex align-items-center justify-content-center">
                                  <AccessTimeIcon fontSize="small" />
                                  <div className="mr-2">
                                    {finalDeliveryTime}
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </Paper>

        {orderDeliverySiteType !== FULFILLMENT_ON_USER_SITE && (
          <Paper
            style={{ backgroundColor: "#ffffff" }}
            className="my-5 py-3 pr-4"
          >
            {orderDeliverySiteType === FULFILLMENT_ON_CAR &&
            (order?.user_address?.extra_data?.model_name ||
              order?.user_address?.extra_data?.color ||
              order?.user_address?.extra_data?.plate_number) ? (
              <div className="mb-5">
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: night,
                  }}
                >
                  The recipient's profile
                </div>

                <div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 400,
                      color: "#98A9B1",
                    }}
                    className="pt-2"
                  >
                    Car information
                  </div>
                </div>
                <div className="row d-flex align-items-center">
                  {order?.user_address?.extra_data?.model_name && (
                    <div className="col-sm-3 mb-3">
                      Model:
                      {englishNumberToPersianNumber(
                        order?.user_address?.extra_data?.model_name
                      )}
                    </div>
                  )}
                  {order?.user_address?.extra_data?.color && (
                    <div className="col-sm-3 mb-3">
                      Color:
                      {englishNumberToPersianNumber(
                        order?.user_address?.extra_data?.color
                      )}
                    </div>
                  )}
                  {order?.user_address?.extra_data?.plate_number && (
                    <div className="d-flex align-items-center col-sm-5 mb-3">
                      <span>Plaque:</span>
                      <div
                        className="d-flex"
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <div
                          className="d-flex justify-content-center py-1 px-3 position-relative"
                          style={{
                            border: "1px solid gray",
                          }}
                        >
                          <span
                            className="position-absolute"
                            style={{ top: 0 }}
                          >
                            Iran
                          </span>
                          <span className="ml-2 pt-3">
                            {englishNumberToPersianNumber(plateNums?.slice(5))}
                          </span>
                        </div>
                        <div
                          className="py-1 pt-3 px-3"
                          style={{
                            border: "1px solid gray",
                          }}
                        >
                          <span className="ml-2">
                            {englishNumberToPersianNumber(
                              plateNums?.slice(2, 5)
                            )}
                          </span>
                          <span className="ml-2">{pelateChar}</span>
                          <span>
                            {englishNumberToPersianNumber(
                              plateNums?.slice(0, 2)
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            <div className="d-flex justify-content-between align-items-center">
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: night,
                }}
              >
                View Specifications
              </div>
              <div
                style={{
                  background:
                    "linear-gradient(0deg, rgba(152, 169, 177, 0.16), rgba(152, 169, 177, 0.16)), #FFFFFF",
                  borderRadius: 100,
                  width: "fit-content",
                  padding: "3px 8px",
                }}
                className="d-flex align-items-center ml-3"
              >
                <img
                  alt=""
                  className="ml-1"
                  src={deliveryTypes[orderDeliverySiteType].icon}
                />
                <div style={{ fontSize: 12 }}>
                  {deliveryTypes[orderDeliverySiteType].label}
                </div>
              </div>
            </div>

            <div className="py-2">
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 400,
                  color: "#98A9B1",
                }}
                className="pb-1"
              >
                Address
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 400,
                  color: hexToRGBA(night, 0.8),
                }}
              >
                {business.address}
              </div>
            </div>
            {orderDeliverySiteType === FULFILLMENT_ON_BUSINESS_SITE && (
              <div className="py-2">
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 400,
                    color: "#98A9B1",
                  }}
                  className="pb-1"
                >
                  The table number
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 400,
                    color: hexToRGBA(night, 0.8),
                  }}
                >
                  {englishNumberToPersianNumber(
                    order?.user_address?.extra_data?.table_number
                  ) || "-"}
                </div>
              </div>
            )}

            <Button
              variant="contained"
              color="secondary"
              style={{ direction: "ltr" }}
              endIcon={<DirectionsRoundedIcon />}
              onClick={() =>
                googleMapsNavigate(business.latitude, business.longitude)
              }
            >
              Routing
            </Button>
          </Paper>
        )}

        {orderDeliverySiteType === FULFILLMENT_ON_USER_SITE && (
          <Paper
            style={{ backgroundColor: "#ffffff" }}
            className="my-5 py-1 pr-4"
          >
            <div className="d-flex justify-content-between align-items-center py-2">
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: night,
                }}
              >
                Send profile
              </div>
              <div
                style={{
                  background:
                    "linear-gradient(0deg, rgba(152, 169, 177, 0.16), rgba(152, 169, 177, 0.16)), #FFFFFF",
                  borderRadius: 100,
                  width: "fit-content",
                  padding: "3px 8px",
                }}
                className="d-flex align-items-center ml-3"
              >
                <img
                  alt=""
                  className="ml-1"
                  src={deliveryTypes[orderDeliverySiteType].icon}
                />
                <div style={{ fontSize: 12 }}>
                  {deliveryTypes[orderDeliverySiteType].label}
                </div>
              </div>
            </div>

            {minWidth768 ? (
              <div className="d-flex py-2 justify-content-between align-items-center">
                <div className="d-flex flex-column jusfity-content-center align-items-start">
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 400,
                      color: "#98A9B1",
                    }}
                    className="pb-1"
                  >
                    Transferee
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: hexToRGBA(night, 0.8),
                    }}
                  >
                    {order?.user_address?.name || null}
                    {order?.user_address?.detail
                      ? defaultAddressDetailsRequirements.map((key) =>
                          order?.user_address?.detail[key]
                            ? ` - ${addressDetailsRequirementsFieldsLabels[key]}: ${order?.user_address?.detail[key]}`
                            : null
                        )
                      : null}
                  </div>
                </div>

                <div className="d-flex flex-column jusfity-content-center align-items-end ml-3">
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 400,
                      color: "#98A9B1",
                    }}
                    className="pb-1"
                  >
                    phone number
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: hexToRGBA(night, 0.8),
                    }}
                  >
                    {englishNumberToPersianNumber(
                      order ? order.user_address?.phone : null
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="py-2">
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 400,
                      color: "#98A9B1",
                    }}
                    className="pb-1"
                  >
                    Transferee
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: hexToRGBA(night, 0.8),
                    }}
                  >
                    {order ? order.user_address?.name : null}
                  </div>
                </div>

                <div className="py-2">
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 400,
                      color: "#98A9B1",
                    }}
                    className="pb-1"
                  >
                    phone number
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 400,
                      color: hexToRGBA(night, 0.8),
                    }}
                  >
                    {englishNumberToPersianNumber(
                      order ? order.user_address?.phone : null
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="py-2">
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 400,
                  color: "#98A9B1",
                }}
                className="pb-1"
              >
                Address
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 400,
                  color: hexToRGBA(night, 0.8),
                  width: "90%",
                }}
                className="text-justify"
              >
                {order ? order.user_address?.address : null}
              </div>
            </div>
          </Paper>
        )}

        {order?.description ? (
          <Paper
            style={{ backgroundColor: "#ffffff" }}
            className="my-5 py-1 pr-4"
          >
            <div className="d-flex flex-column justify-content-center py-2">
              <div
                style={{ color: night }}
                className="u-fontLarge u-fontWeightBold"
              >
                Order details
              </div>
              <div
                style={{ color: hexToRGBA(night, 0.8) }}
                className="u-fontLarge mt-3"
              >
                {order.description}
              </div>
            </div>
          </Paper>
        ) : null}

        <Paper
          style={{ backgroundColor: "#ffffff" }}
          className="my-5 py-3 pr-4 pl-3"
        >
          <h3
            className="py-2"
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: night,
            }}
          >
            Specifications
          </h3>
          {order &&
            order.items &&
            order.items.map((item) => {
              const discount_amount =
                item.discounted_price === item.initial_price
                  ? null
                  : item.initial_price - item.discounted_price;

              const modifiers_price = item?.modifiers
                ? item.modifiers.reduce(
                    (a, modifier) =>
                      a + +modifier.discounted_price * (modifier.amount || 1),
                    0
                  )
                : 0;

              return (
                <>
                  <div
                    className="d-flex align-items-start justify-content-start mt-2"
                    {...(maxWidth430 && {
                      style: {
                        borderTop: "1px solid #00000014",
                        paddingTop: 10,
                      },
                    })}
                  >
                    <div
                      style={{
                        maxHeight: `${minWidth768 ? "140px" : "100px"}`,
                        minWidth: `${minWidth768 ? undefined : "100px"}`,
                        maxWidth: `${minWidth768 ? "140px" : "100px"}`,
                        overflow: "hidden",
                      }}
                    >
                      {item.product_main_image_thumbnail_url ? (
                        <Image
                          src={item.product_main_image_thumbnail_url}
                          alt={`Image${item.product_title}`}
                          layout="fixed"
                          width={100}
                          height={100}
                        />
                      ) : null}
                    </div>

                    <div
                      className={`w-100 ${
                        minWidth768 ? "mr-5" : "mr-2"
                      } position-relative d-flex flex-column justify-content-between`}
                      style={{ height: `${minWidth768 ? "auto" : "100%"}` }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 13,
                            color: coal,
                            marginTop: `${minWidth768 ? "auto" : "10px"}`,
                          }}
                          className="pb-2"
                        >
                          {item.product_title}
                        </div>
                        <div
                          className="mb-auto"
                          style={{
                            fontSize: 10,
                            color: pollution,
                          }}
                        >
                          {item.modifiers?.length ? (
                            <div
                              className="d-flex align-items-center u-font-semi-small mt-2"
                              style={{ color: graphite }}
                            >
                              <div className="ml-1">Additive items</div>
                              <div>
                                {modifiers_price === 0 ? (
                                  "(Free)"
                                ) : (
                                  <>
                                    {priceFormatter(modifiers_price)}
                                    &nbsp;
                                    <Icon
                                      icon={$}
                                      width={21}
                                      height={21}
                                      color={graphite}
                                    />
                                  </>
                                )}
                              </div>
                            </div>
                          ) : null}
                          {item?.modifiers?.map((item) => (
                            <div
                              key={item.id}
                              style={{ color: night }}
                              className="u-font-semi-small my-2"
                            >
                              <div
                                className={
                                  "w-100 d-flex justify-content-between"
                                }
                              >
                                <div>
                                  {englishNumberToPersianNumber(
                                    item.amount || 1
                                  )}{" "}
                                  x {item.modifier_title}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        {item.has_variations && (
                          <div
                            className="my-1 u-font-semi-small"
                            style={{ color: night }}
                          >
                            <div>variety: {item.variation_title}</div>
                          </div>
                        )}
                      </div>

                      {minWidth768 && (
                        <div
                          className="w-100 d-flex justify-content-between align-items-center"
                          style={{
                            bottom: 0,
                            right: 0,
                          }}
                        >
                          <div
                            style={{
                              width: 80,
                              borderRadius: 8,
                              border: "1px solid #EDEDED",
                              color: coal,
                              fontSize: 14,
                              fontWeight: 400,
                            }}
                            className="py-1 px-2  d-flex justify-content-around"
                          >
                            <div className="ml-auto">
                              {englishNumberToPersianNumber(item.amount)}
                            </div>
                            <div>number</div>
                          </div>
                          <div className="d-flex flex-column align-items-end">
                            {discount_amount && (
                              <div
                                style={{
                                  fontSize: 10,
                                  color: themeColor,
                                }}
                              >
                                <span className="pl-1">
                                  {priceFormatter(discount_amount)}
                                </span>
                                <span>Discount</span>
                              </div>
                            )}
                            <div
                              style={{
                                fontSize: 14,
                                color: "#001E2D",
                              }}
                            >
                              <span className="pl-1">
                                {priceFormatter(
                                  (item.discounted_price + modifiers_price) *
                                    item.amount
                                )}
                              </span>
                              <span>
                                <Icon
                                  icon={$}
                                  width={21}
                                  height={21}
                                  color="#001E2D"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {!minWidth768 && (
                    <div
                      className="w-100 d-flex justify-content-between align-items-center pt-1 pb-3"
                      style={{
                        bottom: 0,
                        right: 0,
                      }}
                    >
                      <div
                        style={{
                          width: 80,
                          borderRadius: 8,
                          border: "1px solid #EDEDED",
                          color: coal,
                          fontSize: 14,
                          fontWeight: 400,
                        }}
                        className="py-1 px-2  d-flex justify-content-around"
                      >
                        <div className="ml-auto">
                          {englishNumberToPersianNumber(item.amount)}
                        </div>
                        <div>number</div>
                      </div>
                      <div className="d-flex flex-column align-items-end">
                        {discount_amount && (
                          <div
                            style={{
                              fontSize: 10,
                              color: themeColor,
                            }}
                          >
                            <span className="pl-1">
                              {priceFormatter(discount_amount)}
                            </span>
                            <span>Discount</span>
                          </div>
                        )}
                        <div
                          style={{
                            fontSize: 14,
                            color: "#001E2D",
                          }}
                        >
                          <span className="pl-1">
                            {priceFormatter(item.initial_price)}
                          </span>
                          <span>
                            <Icon
                              icon={$}
                              width={21}
                              height={21}
                              color="#001E2D"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
        </Paper>

        {order && (
          <Paper style={{ fontSize: 13 }} className="py-2 px-4 my-5">
            <h3
              className="py-2"
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: night,
              }}
            >
              Factor
            </h3>

            <div className="d-flex justify-content-between align-items-center py-2">
              <div style={{ color: night }}>
                price of products(
                <span>{englishNumberToPersianNumber(totalAmount)}</span>)
              </div>
              <div style={{ color: night }}>
                <div>
                  <span className="pl-1">
                    {priceFormatter(order.total_items_initial_price)}
                  </span>
                  <span>
                    <Icon icon={$} width={21} height={21} color={night} />
                  </span>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center py-2">
              <div style={{ color: pollution }}>Discount Products</div>
              <div>
                <div
                  style={{
                    color: process.env.NEXT_PUBLIC_ADMIN_THEME_COLOR,
                  }}
                >
                  <span className="pl-1" style={{ fontWeight: 500 }}>
                    %(
                    {englishNumberToPersianNumber(
                      calculateDiscountPercent(
                        order.total_items_initial_price,
                        order.total_items_initial_price -
                          order.total_discount_amount
                      )
                    )}
                    ) {priceFormatter(order.total_discount_amount)}-
                  </span>
                  <span>
                    <img alt="" src={blueToman} />
                  </span>
                </div>
              </div>
            </div>

            <div
              className="d-flex justify-content-between align-items-center py-2"
              style={{ color: pollution }}
            >
              <div>Total</div>
              <div>
                <div>
                  <span className="pl-1">
                    {priceFormatter(
                      order.total_items_initial_price -
                        order.total_discount_amount
                    )}
                  </span>
                  <span>
                    <svg
                      width="16"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.27048 7.19C5.42915 7.19 5.54582 7.18533 5.62048 7.176C5.78848 7.15733 5.91448 7.13867 5.99848 7.12C6.14782 7.10133 6.27382 7.08267 6.37648 7.064L6.54448 7.008L6.71248 6.966L6.82448 6.924C6.88048 6.90533 6.93182 6.88667 6.97848 6.868C7.03448 6.84933 7.10915 6.82133 7.20248 6.784L7.51048 6.63L7.72048 6.504H7.70648C7.78115 6.46667 7.85115 6.41533 7.91648 6.35L7.97248 6.294C8.01915 6.238 8.04715 6.196 8.05648 6.168C8.10315 6.10267 8.14982 6.028 8.19649 5.944C8.22448 5.89733 8.25715 5.82733 8.29448 5.734C8.30382 5.68733 8.32715 5.608 8.36448 5.496C8.38315 5.40267 8.39249 5.31867 8.39249 5.244L8.40648 5.216C8.42515 5.104 8.43448 5.02 8.43448 4.964L8.42048 4.264C8.42048 4.16133 8.41115 4.00733 8.39249 3.802C8.37382 3.56867 8.35515 3.39133 8.33648 3.27L8.26648 2.78L8.29448 2.85L8.11248 1.814C8.06582 1.57133 8.00048 1.27733 7.91648 0.931999L7.95848 1.128L7.13248 1.324C7.13248 1.38 7.14648 1.47333 7.17448 1.604L7.27248 2.08C7.33782 2.36 7.38915 2.63533 7.42648 2.906L7.56648 3.83V3.942C7.59449 4.09133 7.60849 4.24533 7.60849 4.404C7.61782 4.49733 7.62248 4.63267 7.62248 4.81V5.244L7.58048 5.426L7.55248 5.594L7.18848 5.804L7.09048 5.832C7.03448 5.86 6.95048 5.89267 6.83848 5.93L6.55848 6.014C6.50248 6.02333 6.40915 6.04667 6.27848 6.084C6.22248 6.10267 6.12915 6.12133 5.99848 6.14H5.97048C5.90515 6.14 5.80715 6.14933 5.67648 6.168C5.61115 6.17733 5.50848 6.182 5.36848 6.182C5.09782 6.182 4.85048 6.154 4.62648 6.098C4.41182 6.042 4.22515 5.95333 4.06648 5.832C3.91715 5.72933 3.79582 5.58467 3.70248 5.398C3.61848 5.21133 3.57648 5.00133 3.57648 4.768C3.57648 4.60933 3.59048 4.432 3.61848 4.236C3.64648 4.068 3.69782 3.858 3.77248 3.606C3.80982 3.45667 3.87515 3.22333 3.96848 2.906C4.05248 2.66333 4.13648 2.41133 4.22048 2.15L3.59048 1.912L3.28248 2.836L3.04448 3.634C3.01648 3.774 2.97915 3.97 2.93248 4.222L2.90448 4.348C2.87648 4.572 2.86248 4.79133 2.86248 5.006C2.86248 5.40733 2.91382 5.72933 3.01648 5.972C3.10982 6.23333 3.26848 6.462 3.49248 6.658C3.68848 6.826 3.94048 6.96133 4.24848 7.064C4.54715 7.148 4.88782 7.19 5.27048 7.19ZM5.64848 4.488L6.33448 3.802L5.64848 3.088L4.94848 3.802L5.64848 4.488ZM12.9285 6.56L13.6285 5.874L12.9285 5.174L12.2425 5.874L12.9285 6.56ZM6.85248 12.328C6.94582 12.328 7.02982 12.3093 7.10448 12.272C7.15115 12.2533 7.19782 12.23 7.24448 12.202L7.30048 12.16C7.38448 12.0947 7.44515 12.0293 7.48249 11.964C7.55715 11.8707 7.60848 11.796 7.63648 11.74C7.66448 11.684 7.69715 11.6 7.73449 11.488C7.76248 11.404 7.79048 11.306 7.81848 11.194C7.81848 11.1473 7.82782 11.0727 7.84648 10.97V10.928C7.85582 10.8627 7.86048 10.76 7.86048 10.62C7.86048 10.4147 7.85115 10.2653 7.83248 10.172L7.74848 9.752V9.78C7.70182 9.612 7.65515 9.486 7.60849 9.402L7.41249 9.066C7.36582 9.01 7.28648 8.926 7.17448 8.814C7.08115 8.73933 6.98782 8.674 6.89448 8.618H6.88048C6.83382 8.59 6.75915 8.55733 6.65648 8.52L6.57248 8.492C6.47915 8.47333 6.40448 8.464 6.34848 8.464L6.20848 8.45C6.15248 8.45 6.06382 8.464 5.94248 8.492L5.90048 8.506L5.71848 8.59L5.63448 8.646L5.35448 8.87L5.10248 9.136L4.62648 9.794C4.59848 9.84067 4.54248 9.91533 4.45848 10.018L4.12248 10.438C4.05715 10.5033 3.95915 10.592 3.82848 10.704C3.73515 10.7787 3.63248 10.8533 3.52048 10.928C3.40848 11.0027 3.29648 11.054 3.18448 11.082C3.07248 11.11 2.94648 11.124 2.80648 11.124H2.49848C2.38648 11.1053 2.30715 11.0867 2.26048 11.068C2.19515 11.068 2.12515 11.0447 2.05048 10.998L1.86848 10.886L1.74248 10.718C1.71448 10.6713 1.69115 10.6247 1.67248 10.578L1.65848 10.494C1.63982 10.4287 1.62115 10.34 1.60248 10.228L1.58848 9.92V5.468L0.804484 5.496V9.864C0.804484 10.1347 0.813818 10.326 0.832484 10.438C0.841818 10.578 0.865151 10.7367 0.902484 10.914L0.944484 11.04C0.991151 11.1707 1.02848 11.264 1.05648 11.32C1.13115 11.4413 1.20582 11.5393 1.28048 11.614C1.35515 11.7167 1.44848 11.796 1.56048 11.852C1.62582 11.8987 1.73315 11.95 1.88248 12.006C2.06915 12.062 2.21382 12.0947 2.31648 12.104C2.52182 12.1227 2.68515 12.132 2.80648 12.132C2.98382 12.132 3.13315 12.1133 3.25448 12.076C3.44115 12.02 3.57648 11.9687 3.66048 11.922C3.78182 11.866 3.90315 11.782 4.02448 11.67C4.15515 11.558 4.26248 11.446 4.34648 11.334C4.47715 11.446 4.57515 11.5253 4.64048 11.572C4.71515 11.6187 4.82715 11.6793 4.97648 11.754C5.08848 11.8193 5.20048 11.8753 5.31248 11.922L5.64848 12.076L5.99848 12.188L6.30648 12.272L6.65648 12.314C6.73115 12.3233 6.78715 12.328 6.82448 12.328H6.85248ZM12.9285 7.946L13.6285 7.246L12.9285 6.56L12.2425 7.246L12.9285 7.946ZM10.5345 11.11C10.4132 11.11 10.3245 11.11 10.2685 11.11C10.2218 11.1007 10.1518 11.0867 10.0585 11.068C10.0212 11.068 9.97448 11.0587 9.91848 11.04C9.86248 11.012 9.81582 10.9887 9.77848 10.97H9.80649C9.77848 10.9513 9.74582 10.9233 9.70848 10.886L9.65248 10.788L9.63848 10.676L9.61049 10.55C9.61049 10.4567 9.61982 10.382 9.63848 10.326V10.284C9.65715 10.2 9.67582 10.1347 9.69448 10.088L9.77848 9.878C9.83448 9.78467 9.87648 9.71933 9.90448 9.682C9.96048 9.60733 10.0025 9.556 10.0305 9.528L10.1985 9.402L10.3665 9.318L10.4645 9.304H10.5765C10.6698 9.304 10.7352 9.30867 10.7725 9.318L10.9545 9.402C11.0478 9.458 11.1178 9.50467 11.1645 9.542C11.2112 9.57933 11.2578 9.64 11.3045 9.724C11.3512 9.77067 11.3978 9.85467 11.4445 9.976C11.5005 10.088 11.5425 10.1907 11.5705 10.284C11.6078 10.396 11.6358 10.5173 11.6545 10.648L11.6965 11.068C11.4725 11.0867 11.2905 11.1007 11.1505 11.11C11.0198 11.11 10.8145 11.11 10.5345 11.11ZM5.28448 10.914L5.31248 10.928C5.23782 10.8907 5.15848 10.844 5.07448 10.788L4.97648 10.718L4.87848 10.634L4.94848 10.522L5.17248 10.2C5.24715 10.088 5.30315 10.0087 5.34048 9.962L5.49448 9.78C5.53182 9.724 5.58782 9.65867 5.66248 9.584L5.80248 9.458C5.87715 9.41133 5.93782 9.37867 5.98448 9.36C6.03115 9.34133 6.08248 9.332 6.13848 9.332C6.16648 9.332 6.20382 9.33667 6.25048 9.346L6.30648 9.36L6.47448 9.416C6.54915 9.472 6.59582 9.50933 6.61448 9.528C6.64248 9.54667 6.67982 9.57467 6.72648 9.612L6.78248 9.668C6.81048 9.70533 6.85248 9.77067 6.90848 9.864C6.94582 9.92 6.97848 9.99467 7.00648 10.088L7.09048 10.368C7.09982 10.4333 7.10448 10.536 7.10448 10.676L7.09048 10.886C7.09048 10.97 7.08582 11.0307 7.07648 11.068H7.06248C7.06248 11.124 7.04848 11.18 7.02048 11.236L6.95048 11.404L6.64248 11.362L6.34848 11.306L6.39048 11.32C6.18515 11.2733 5.99382 11.2173 5.81648 11.152C5.75115 11.1333 5.65782 11.096 5.53648 11.04L5.28448 10.914ZM15.2805 7.946L14.4265 8.114L14.5245 8.702C14.5618 8.954 14.5852 9.15933 14.5945 9.318C14.6132 9.46733 14.6318 9.69133 14.6505 9.99C14.6692 10.2047 14.6692 10.4333 14.6505 10.676L14.3565 10.83C14.3192 10.8487 14.2632 10.8673 14.1885 10.886L14.0905 10.914L13.9785 10.956L13.5725 11.012L13.1385 11.04H12.4525C12.4525 10.844 12.4385 10.6527 12.4105 10.466C12.3825 10.27 12.3405 10.088 12.2845 9.92L12.2985 9.948L12.1305 9.514C12.0372 9.32733 11.9625 9.192 11.9065 9.108V9.122C11.8318 9.00067 11.7525 8.898 11.6685 8.814C11.5378 8.702 11.4352 8.62267 11.3605 8.576H11.3465C11.2252 8.51067 11.1085 8.46867 10.9965 8.45C10.8938 8.422 10.7725 8.408 10.6325 8.408H10.6045C10.5018 8.408 10.4038 8.422 10.3105 8.45C10.2172 8.478 10.1145 8.52467 10.0025 8.59C9.89048 8.646 9.79248 8.71133 9.70848 8.786C9.59648 8.898 9.51715 8.98667 9.47048 9.052C9.39582 9.15467 9.32115 9.26667 9.24648 9.388C9.18115 9.50933 9.12515 9.64 9.07848 9.78V9.794C9.02248 9.91533 8.98048 10.0553 8.95248 10.214C8.93382 10.4193 8.92448 10.5733 8.92448 10.676C8.92448 10.8347 8.93382 10.9513 8.95248 11.026C8.97115 11.1567 9.00382 11.2593 9.05048 11.334C9.05982 11.418 9.09715 11.4973 9.16249 11.572L9.24648 11.67L9.34448 11.754C9.41915 11.81 9.49382 11.8567 9.56848 11.894C9.65248 11.9313 9.74115 11.9547 9.83448 11.964L10.1285 12.006C10.2032 12.0153 10.3152 12.02 10.4645 12.02H11.1365C11.3978 12.0013 11.5892 11.9827 11.7105 11.964L11.6685 11.992L11.6405 12.076V12.202L11.6265 12.23C11.5238 12.3887 11.3885 12.5473 11.2205 12.706C11.0525 12.8553 10.8938 12.9813 10.7445 13.084L10.7305 13.098C10.6372 13.154 10.5625 13.196 10.5065 13.224C10.3945 13.28 10.3105 13.3173 10.2545 13.336H10.2405C10.1565 13.3827 10.0818 13.4107 10.0165 13.42L9.82048 13.434C9.74582 13.434 9.68515 13.4293 9.63848 13.42C9.60115 13.42 9.54048 13.4107 9.45648 13.392H9.41449C9.31182 13.3827 9.19048 13.3593 9.05048 13.322C8.92915 13.294 8.82182 13.252 8.72848 13.196L8.74248 13.224L8.50448 13.784C8.60715 13.84 8.75648 13.9053 8.95248 13.98L9.05048 14.022L9.48449 14.176L9.55449 14.19C9.67582 14.218 9.76915 14.2367 9.83448 14.246L9.90448 14.26C9.99782 14.2693 10.0678 14.274 10.1145 14.274C10.1612 14.274 10.2405 14.2647 10.3525 14.246L10.6605 14.134C10.7538 14.0967 10.8612 14.0407 10.9825 13.966C11.1318 13.8727 11.2485 13.7933 11.3325 13.728C11.4818 13.5973 11.5938 13.4947 11.6685 13.42C11.7712 13.2987 11.8738 13.168 11.9765 13.028C12.0792 12.8973 12.1678 12.7433 12.2425 12.566C12.3172 12.3793 12.3685 12.202 12.3965 12.034V12.02H13.1385C13.3718 12.02 13.5398 12.0107 13.6425 11.992C13.7732 11.9827 13.9225 11.9593 14.0905 11.922C14.2678 11.8847 14.4032 11.8473 14.4965 11.81C14.5898 11.7727 14.6878 11.7213 14.7905 11.656C14.9305 11.572 15.0332 11.4833 15.0985 11.39C15.2105 11.2407 15.2852 11.1193 15.3225 11.026C15.3878 10.8767 15.4298 10.7367 15.4485 10.606C15.4765 10.466 15.4905 10.3167 15.4905 10.158C15.4905 9.71933 15.4718 9.332 15.4345 8.996C15.3972 8.688 15.3645 8.44067 15.3365 8.254L15.2805 7.946Z"
                        fill={pollution}
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>

            <div
              className="d-flex justify-content-between align-items-center pt-2 pb-4"
              style={{ color: pollution }}
            >
              <div>Packaging cost</div>
              <div>
                <div
                  style={{
                    fontSize: 14,
                  }}
                >
                  <span className="pl-1">
                    {order.total_packaging_price
                      ? priceFormatter(order.total_packaging_price)
                      : "Free"}
                  </span>
                  {order.total_packaging_price ? (
                    <span>
                      <svg
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.27048 7.19C5.42915 7.19 5.54582 7.18533 5.62048 7.176C5.78848 7.15733 5.91448 7.13867 5.99848 7.12C6.14782 7.10133 6.27382 7.08267 6.37648 7.064L6.54448 7.008L6.71248 6.966L6.82448 6.924C6.88048 6.90533 6.93182 6.88667 6.97848 6.868C7.03448 6.84933 7.10915 6.82133 7.20248 6.784L7.51048 6.63L7.72048 6.504H7.70648C7.78115 6.46667 7.85115 6.41533 7.91648 6.35L7.97248 6.294C8.01915 6.238 8.04715 6.196 8.05648 6.168C8.10315 6.10267 8.14982 6.028 8.19649 5.944C8.22448 5.89733 8.25715 5.82733 8.29448 5.734C8.30382 5.68733 8.32715 5.608 8.36448 5.496C8.38315 5.40267 8.39249 5.31867 8.39249 5.244L8.40648 5.216C8.42515 5.104 8.43448 5.02 8.43448 4.964L8.42048 4.264C8.42048 4.16133 8.41115 4.00733 8.39249 3.802C8.37382 3.56867 8.35515 3.39133 8.33648 3.27L8.26648 2.78L8.29448 2.85L8.11248 1.814C8.06582 1.57133 8.00048 1.27733 7.91648 0.931999L7.95848 1.128L7.13248 1.324C7.13248 1.38 7.14648 1.47333 7.17448 1.604L7.27248 2.08C7.33782 2.36 7.38915 2.63533 7.42648 2.906L7.56648 3.83V3.942C7.59449 4.09133 7.60849 4.24533 7.60849 4.404C7.61782 4.49733 7.62248 4.63267 7.62248 4.81V5.244L7.58048 5.426L7.55248 5.594L7.18848 5.804L7.09048 5.832C7.03448 5.86 6.95048 5.89267 6.83848 5.93L6.55848 6.014C6.50248 6.02333 6.40915 6.04667 6.27848 6.084C6.22248 6.10267 6.12915 6.12133 5.99848 6.14H5.97048C5.90515 6.14 5.80715 6.14933 5.67648 6.168C5.61115 6.17733 5.50848 6.182 5.36848 6.182C5.09782 6.182 4.85048 6.154 4.62648 6.098C4.41182 6.042 4.22515 5.95333 4.06648 5.832C3.91715 5.72933 3.79582 5.58467 3.70248 5.398C3.61848 5.21133 3.57648 5.00133 3.57648 4.768C3.57648 4.60933 3.59048 4.432 3.61848 4.236C3.64648 4.068 3.69782 3.858 3.77248 3.606C3.80982 3.45667 3.87515 3.22333 3.96848 2.906C4.05248 2.66333 4.13648 2.41133 4.22048 2.15L3.59048 1.912L3.28248 2.836L3.04448 3.634C3.01648 3.774 2.97915 3.97 2.93248 4.222L2.90448 4.348C2.87648 4.572 2.86248 4.79133 2.86248 5.006C2.86248 5.40733 2.91382 5.72933 3.01648 5.972C3.10982 6.23333 3.26848 6.462 3.49248 6.658C3.68848 6.826 3.94048 6.96133 4.24848 7.064C4.54715 7.148 4.88782 7.19 5.27048 7.19ZM5.64848 4.488L6.33448 3.802L5.64848 3.088L4.94848 3.802L5.64848 4.488ZM12.9285 6.56L13.6285 5.874L12.9285 5.174L12.2425 5.874L12.9285 6.56ZM6.85248 12.328C6.94582 12.328 7.02982 12.3093 7.10448 12.272C7.15115 12.2533 7.19782 12.23 7.24448 12.202L7.30048 12.16C7.38448 12.0947 7.44515 12.0293 7.48249 11.964C7.55715 11.8707 7.60848 11.796 7.63648 11.74C7.66448 11.684 7.69715 11.6 7.73449 11.488C7.76248 11.404 7.79048 11.306 7.81848 11.194C7.81848 11.1473 7.82782 11.0727 7.84648 10.97V10.928C7.85582 10.8627 7.86048 10.76 7.86048 10.62C7.86048 10.4147 7.85115 10.2653 7.83248 10.172L7.74848 9.752V9.78C7.70182 9.612 7.65515 9.486 7.60849 9.402L7.41249 9.066C7.36582 9.01 7.28648 8.926 7.17448 8.814C7.08115 8.73933 6.98782 8.674 6.89448 8.618H6.88048C6.83382 8.59 6.75915 8.55733 6.65648 8.52L6.57248 8.492C6.47915 8.47333 6.40448 8.464 6.34848 8.464L6.20848 8.45C6.15248 8.45 6.06382 8.464 5.94248 8.492L5.90048 8.506L5.71848 8.59L5.63448 8.646L5.35448 8.87L5.10248 9.136L4.62648 9.794C4.59848 9.84067 4.54248 9.91533 4.45848 10.018L4.12248 10.438C4.05715 10.5033 3.95915 10.592 3.82848 10.704C3.73515 10.7787 3.63248 10.8533 3.52048 10.928C3.40848 11.0027 3.29648 11.054 3.18448 11.082C3.07248 11.11 2.94648 11.124 2.80648 11.124H2.49848C2.38648 11.1053 2.30715 11.0867 2.26048 11.068C2.19515 11.068 2.12515 11.0447 2.05048 10.998L1.86848 10.886L1.74248 10.718C1.71448 10.6713 1.69115 10.6247 1.67248 10.578L1.65848 10.494C1.63982 10.4287 1.62115 10.34 1.60248 10.228L1.58848 9.92V5.468L0.804484 5.496V9.864C0.804484 10.1347 0.813818 10.326 0.832484 10.438C0.841818 10.578 0.865151 10.7367 0.902484 10.914L0.944484 11.04C0.991151 11.1707 1.02848 11.264 1.05648 11.32C1.13115 11.4413 1.20582 11.5393 1.28048 11.614C1.35515 11.7167 1.44848 11.796 1.56048 11.852C1.62582 11.8987 1.73315 11.95 1.88248 12.006C2.06915 12.062 2.21382 12.0947 2.31648 12.104C2.52182 12.1227 2.68515 12.132 2.80648 12.132C2.98382 12.132 3.13315 12.1133 3.25448 12.076C3.44115 12.02 3.57648 11.9687 3.66048 11.922C3.78182 11.866 3.90315 11.782 4.02448 11.67C4.15515 11.558 4.26248 11.446 4.34648 11.334C4.47715 11.446 4.57515 11.5253 4.64048 11.572C4.71515 11.6187 4.82715 11.6793 4.97648 11.754C5.08848 11.8193 5.20048 11.8753 5.31248 11.922L5.64848 12.076L5.99848 12.188L6.30648 12.272L6.65648 12.314C6.73115 12.3233 6.78715 12.328 6.82448 12.328H6.85248ZM12.9285 7.946L13.6285 7.246L12.9285 6.56L12.2425 7.246L12.9285 7.946ZM10.5345 11.11C10.4132 11.11 10.3245 11.11 10.2685 11.11C10.2218 11.1007 10.1518 11.0867 10.0585 11.068C10.0212 11.068 9.97448 11.0587 9.91848 11.04C9.86248 11.012 9.81582 10.9887 9.77848 10.97H9.80649C9.77848 10.9513 9.74582 10.9233 9.70848 10.886L9.65248 10.788L9.63848 10.676L9.61049 10.55C9.61049 10.4567 9.61982 10.382 9.63848 10.326V10.284C9.65715 10.2 9.67582 10.1347 9.69448 10.088L9.77848 9.878C9.83448 9.78467 9.87648 9.71933 9.90448 9.682C9.96048 9.60733 10.0025 9.556 10.0305 9.528L10.1985 9.402L10.3665 9.318L10.4645 9.304H10.5765C10.6698 9.304 10.7352 9.30867 10.7725 9.318L10.9545 9.402C11.0478 9.458 11.1178 9.50467 11.1645 9.542C11.2112 9.57933 11.2578 9.64 11.3045 9.724C11.3512 9.77067 11.3978 9.85467 11.4445 9.976C11.5005 10.088 11.5425 10.1907 11.5705 10.284C11.6078 10.396 11.6358 10.5173 11.6545 10.648L11.6965 11.068C11.4725 11.0867 11.2905 11.1007 11.1505 11.11C11.0198 11.11 10.8145 11.11 10.5345 11.11ZM5.28448 10.914L5.31248 10.928C5.23782 10.8907 5.15848 10.844 5.07448 10.788L4.97648 10.718L4.87848 10.634L4.94848 10.522L5.17248 10.2C5.24715 10.088 5.30315 10.0087 5.34048 9.962L5.49448 9.78C5.53182 9.724 5.58782 9.65867 5.66248 9.584L5.80248 9.458C5.87715 9.41133 5.93782 9.37867 5.98448 9.36C6.03115 9.34133 6.08248 9.332 6.13848 9.332C6.16648 9.332 6.20382 9.33667 6.25048 9.346L6.30648 9.36L6.47448 9.416C6.54915 9.472 6.59582 9.50933 6.61448 9.528C6.64248 9.54667 6.67982 9.57467 6.72648 9.612L6.78248 9.668C6.81048 9.70533 6.85248 9.77067 6.90848 9.864C6.94582 9.92 6.97848 9.99467 7.00648 10.088L7.09048 10.368C7.09982 10.4333 7.10448 10.536 7.10448 10.676L7.09048 10.886C7.09048 10.97 7.08582 11.0307 7.07648 11.068H7.06248C7.06248 11.124 7.04848 11.18 7.02048 11.236L6.95048 11.404L6.64248 11.362L6.34848 11.306L6.39048 11.32C6.18515 11.2733 5.99382 11.2173 5.81648 11.152C5.75115 11.1333 5.65782 11.096 5.53648 11.04L5.28448 10.914ZM15.2805 7.946L14.4265 8.114L14.5245 8.702C14.5618 8.954 14.5852 9.15933 14.5945 9.318C14.6132 9.46733 14.6318 9.69133 14.6505 9.99C14.6692 10.2047 14.6692 10.4333 14.6505 10.676L14.3565 10.83C14.3192 10.8487 14.2632 10.8673 14.1885 10.886L14.0905 10.914L13.9785 10.956L13.5725 11.012L13.1385 11.04H12.4525C12.4525 10.844 12.4385 10.6527 12.4105 10.466C12.3825 10.27 12.3405 10.088 12.2845 9.92L12.2985 9.948L12.1305 9.514C12.0372 9.32733 11.9625 9.192 11.9065 9.108V9.122C11.8318 9.00067 11.7525 8.898 11.6685 8.814C11.5378 8.702 11.4352 8.62267 11.3605 8.576H11.3465C11.2252 8.51067 11.1085 8.46867 10.9965 8.45C10.8938 8.422 10.7725 8.408 10.6325 8.408H10.6045C10.5018 8.408 10.4038 8.422 10.3105 8.45C10.2172 8.478 10.1145 8.52467 10.0025 8.59C9.89048 8.646 9.79248 8.71133 9.70848 8.786C9.59648 8.898 9.51715 8.98667 9.47048 9.052C9.39582 9.15467 9.32115 9.26667 9.24648 9.388C9.18115 9.50933 9.12515 9.64 9.07848 9.78V9.794C9.02248 9.91533 8.98048 10.0553 8.95248 10.214C8.93382 10.4193 8.92448 10.5733 8.92448 10.676C8.92448 10.8347 8.93382 10.9513 8.95248 11.026C8.97115 11.1567 9.00382 11.2593 9.05048 11.334C9.05982 11.418 9.09715 11.4973 9.16249 11.572L9.24648 11.67L9.34448 11.754C9.41915 11.81 9.49382 11.8567 9.56848 11.894C9.65248 11.9313 9.74115 11.9547 9.83448 11.964L10.1285 12.006C10.2032 12.0153 10.3152 12.02 10.4645 12.02H11.1365C11.3978 12.0013 11.5892 11.9827 11.7105 11.964L11.6685 11.992L11.6405 12.076V12.202L11.6265 12.23C11.5238 12.3887 11.3885 12.5473 11.2205 12.706C11.0525 12.8553 10.8938 12.9813 10.7445 13.084L10.7305 13.098C10.6372 13.154 10.5625 13.196 10.5065 13.224C10.3945 13.28 10.3105 13.3173 10.2545 13.336H10.2405C10.1565 13.3827 10.0818 13.4107 10.0165 13.42L9.82048 13.434C9.74582 13.434 9.68515 13.4293 9.63848 13.42C9.60115 13.42 9.54048 13.4107 9.45648 13.392H9.41449C9.31182 13.3827 9.19048 13.3593 9.05048 13.322C8.92915 13.294 8.82182 13.252 8.72848 13.196L8.74248 13.224L8.50448 13.784C8.60715 13.84 8.75648 13.9053 8.95248 13.98L9.05048 14.022L9.48449 14.176L9.55449 14.19C9.67582 14.218 9.76915 14.2367 9.83448 14.246L9.90448 14.26C9.99782 14.2693 10.0678 14.274 10.1145 14.274C10.1612 14.274 10.2405 14.2647 10.3525 14.246L10.6605 14.134C10.7538 14.0967 10.8612 14.0407 10.9825 13.966C11.1318 13.8727 11.2485 13.7933 11.3325 13.728C11.4818 13.5973 11.5938 13.4947 11.6685 13.42C11.7712 13.2987 11.8738 13.168 11.9765 13.028C12.0792 12.8973 12.1678 12.7433 12.2425 12.566C12.3172 12.3793 12.3685 12.202 12.3965 12.034V12.02H13.1385C13.3718 12.02 13.5398 12.0107 13.6425 11.992C13.7732 11.9827 13.9225 11.9593 14.0905 11.922C14.2678 11.8847 14.4032 11.8473 14.4965 11.81C14.5898 11.7727 14.6878 11.7213 14.7905 11.656C14.9305 11.572 15.0332 11.4833 15.0985 11.39C15.2105 11.2407 15.2852 11.1193 15.3225 11.026C15.3878 10.8767 15.4298 10.7367 15.4485 10.606C15.4765 10.466 15.4905 10.3167 15.4905 10.158C15.4905 9.71933 15.4718 9.332 15.4345 8.996C15.3972 8.688 15.3645 8.44067 15.3365 8.254L15.2805 7.946Z"
                          fill={pollution}
                        />
                      </svg>
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className="d-flex justify-content-between align-items-center pt-2 pb-4"
              style={{ color: pollution }}
            >
              <div>
                Tax(
                {englishNumberToPersianNumber(
                  Math.round(
                    (order.taxing_price /
                      (order.total_price - order.taxing_price)) *
                      100
                  )
                )}
                ٪)
              </div>
              <div>
                <div
                  style={{
                    fontSize: 14,
                  }}
                >
                  <span className="pl-1">
                    {order.taxing_price
                      ? priceFormatter(order.taxing_price)
                      : "Without taxation"}
                  </span>
                  {order.taxing_price ? (
                    <span>
                      <svg
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.27048 7.19C5.42915 7.19 5.54582 7.18533 5.62048 7.176C5.78848 7.15733 5.91448 7.13867 5.99848 7.12C6.14782 7.10133 6.27382 7.08267 6.37648 7.064L6.54448 7.008L6.71248 6.966L6.82448 6.924C6.88048 6.90533 6.93182 6.88667 6.97848 6.868C7.03448 6.84933 7.10915 6.82133 7.20248 6.784L7.51048 6.63L7.72048 6.504H7.70648C7.78115 6.46667 7.85115 6.41533 7.91648 6.35L7.97248 6.294C8.01915 6.238 8.04715 6.196 8.05648 6.168C8.10315 6.10267 8.14982 6.028 8.19649 5.944C8.22448 5.89733 8.25715 5.82733 8.29448 5.734C8.30382 5.68733 8.32715 5.608 8.36448 5.496C8.38315 5.40267 8.39249 5.31867 8.39249 5.244L8.40648 5.216C8.42515 5.104 8.43448 5.02 8.43448 4.964L8.42048 4.264C8.42048 4.16133 8.41115 4.00733 8.39249 3.802C8.37382 3.56867 8.35515 3.39133 8.33648 3.27L8.26648 2.78L8.29448 2.85L8.11248 1.814C8.06582 1.57133 8.00048 1.27733 7.91648 0.931999L7.95848 1.128L7.13248 1.324C7.13248 1.38 7.14648 1.47333 7.17448 1.604L7.27248 2.08C7.33782 2.36 7.38915 2.63533 7.42648 2.906L7.56648 3.83V3.942C7.59449 4.09133 7.60849 4.24533 7.60849 4.404C7.61782 4.49733 7.62248 4.63267 7.62248 4.81V5.244L7.58048 5.426L7.55248 5.594L7.18848 5.804L7.09048 5.832C7.03448 5.86 6.95048 5.89267 6.83848 5.93L6.55848 6.014C6.50248 6.02333 6.40915 6.04667 6.27848 6.084C6.22248 6.10267 6.12915 6.12133 5.99848 6.14H5.97048C5.90515 6.14 5.80715 6.14933 5.67648 6.168C5.61115 6.17733 5.50848 6.182 5.36848 6.182C5.09782 6.182 4.85048 6.154 4.62648 6.098C4.41182 6.042 4.22515 5.95333 4.06648 5.832C3.91715 5.72933 3.79582 5.58467 3.70248 5.398C3.61848 5.21133 3.57648 5.00133 3.57648 4.768C3.57648 4.60933 3.59048 4.432 3.61848 4.236C3.64648 4.068 3.69782 3.858 3.77248 3.606C3.80982 3.45667 3.87515 3.22333 3.96848 2.906C4.05248 2.66333 4.13648 2.41133 4.22048 2.15L3.59048 1.912L3.28248 2.836L3.04448 3.634C3.01648 3.774 2.97915 3.97 2.93248 4.222L2.90448 4.348C2.87648 4.572 2.86248 4.79133 2.86248 5.006C2.86248 5.40733 2.91382 5.72933 3.01648 5.972C3.10982 6.23333 3.26848 6.462 3.49248 6.658C3.68848 6.826 3.94048 6.96133 4.24848 7.064C4.54715 7.148 4.88782 7.19 5.27048 7.19ZM5.64848 4.488L6.33448 3.802L5.64848 3.088L4.94848 3.802L5.64848 4.488ZM12.9285 6.56L13.6285 5.874L12.9285 5.174L12.2425 5.874L12.9285 6.56ZM6.85248 12.328C6.94582 12.328 7.02982 12.3093 7.10448 12.272C7.15115 12.2533 7.19782 12.23 7.24448 12.202L7.30048 12.16C7.38448 12.0947 7.44515 12.0293 7.48249 11.964C7.55715 11.8707 7.60848 11.796 7.63648 11.74C7.66448 11.684 7.69715 11.6 7.73449 11.488C7.76248 11.404 7.79048 11.306 7.81848 11.194C7.81848 11.1473 7.82782 11.0727 7.84648 10.97V10.928C7.85582 10.8627 7.86048 10.76 7.86048 10.62C7.86048 10.4147 7.85115 10.2653 7.83248 10.172L7.74848 9.752V9.78C7.70182 9.612 7.65515 9.486 7.60849 9.402L7.41249 9.066C7.36582 9.01 7.28648 8.926 7.17448 8.814C7.08115 8.73933 6.98782 8.674 6.89448 8.618H6.88048C6.83382 8.59 6.75915 8.55733 6.65648 8.52L6.57248 8.492C6.47915 8.47333 6.40448 8.464 6.34848 8.464L6.20848 8.45C6.15248 8.45 6.06382 8.464 5.94248 8.492L5.90048 8.506L5.71848 8.59L5.63448 8.646L5.35448 8.87L5.10248 9.136L4.62648 9.794C4.59848 9.84067 4.54248 9.91533 4.45848 10.018L4.12248 10.438C4.05715 10.5033 3.95915 10.592 3.82848 10.704C3.73515 10.7787 3.63248 10.8533 3.52048 10.928C3.40848 11.0027 3.29648 11.054 3.18448 11.082C3.07248 11.11 2.94648 11.124 2.80648 11.124H2.49848C2.38648 11.1053 2.30715 11.0867 2.26048 11.068C2.19515 11.068 2.12515 11.0447 2.05048 10.998L1.86848 10.886L1.74248 10.718C1.71448 10.6713 1.69115 10.6247 1.67248 10.578L1.65848 10.494C1.63982 10.4287 1.62115 10.34 1.60248 10.228L1.58848 9.92V5.468L0.804484 5.496V9.864C0.804484 10.1347 0.813818 10.326 0.832484 10.438C0.841818 10.578 0.865151 10.7367 0.902484 10.914L0.944484 11.04C0.991151 11.1707 1.02848 11.264 1.05648 11.32C1.13115 11.4413 1.20582 11.5393 1.28048 11.614C1.35515 11.7167 1.44848 11.796 1.56048 11.852C1.62582 11.8987 1.73315 11.95 1.88248 12.006C2.06915 12.062 2.21382 12.0947 2.31648 12.104C2.52182 12.1227 2.68515 12.132 2.80648 12.132C2.98382 12.132 3.13315 12.1133 3.25448 12.076C3.44115 12.02 3.57648 11.9687 3.66048 11.922C3.78182 11.866 3.90315 11.782 4.02448 11.67C4.15515 11.558 4.26248 11.446 4.34648 11.334C4.47715 11.446 4.57515 11.5253 4.64048 11.572C4.71515 11.6187 4.82715 11.6793 4.97648 11.754C5.08848 11.8193 5.20048 11.8753 5.31248 11.922L5.64848 12.076L5.99848 12.188L6.30648 12.272L6.65648 12.314C6.73115 12.3233 6.78715 12.328 6.82448 12.328H6.85248ZM12.9285 7.946L13.6285 7.246L12.9285 6.56L12.2425 7.246L12.9285 7.946ZM10.5345 11.11C10.4132 11.11 10.3245 11.11 10.2685 11.11C10.2218 11.1007 10.1518 11.0867 10.0585 11.068C10.0212 11.068 9.97448 11.0587 9.91848 11.04C9.86248 11.012 9.81582 10.9887 9.77848 10.97H9.80649C9.77848 10.9513 9.74582 10.9233 9.70848 10.886L9.65248 10.788L9.63848 10.676L9.61049 10.55C9.61049 10.4567 9.61982 10.382 9.63848 10.326V10.284C9.65715 10.2 9.67582 10.1347 9.69448 10.088L9.77848 9.878C9.83448 9.78467 9.87648 9.71933 9.90448 9.682C9.96048 9.60733 10.0025 9.556 10.0305 9.528L10.1985 9.402L10.3665 9.318L10.4645 9.304H10.5765C10.6698 9.304 10.7352 9.30867 10.7725 9.318L10.9545 9.402C11.0478 9.458 11.1178 9.50467 11.1645 9.542C11.2112 9.57933 11.2578 9.64 11.3045 9.724C11.3512 9.77067 11.3978 9.85467 11.4445 9.976C11.5005 10.088 11.5425 10.1907 11.5705 10.284C11.6078 10.396 11.6358 10.5173 11.6545 10.648L11.6965 11.068C11.4725 11.0867 11.2905 11.1007 11.1505 11.11C11.0198 11.11 10.8145 11.11 10.5345 11.11ZM5.28448 10.914L5.31248 10.928C5.23782 10.8907 5.15848 10.844 5.07448 10.788L4.97648 10.718L4.87848 10.634L4.94848 10.522L5.17248 10.2C5.24715 10.088 5.30315 10.0087 5.34048 9.962L5.49448 9.78C5.53182 9.724 5.58782 9.65867 5.66248 9.584L5.80248 9.458C5.87715 9.41133 5.93782 9.37867 5.98448 9.36C6.03115 9.34133 6.08248 9.332 6.13848 9.332C6.16648 9.332 6.20382 9.33667 6.25048 9.346L6.30648 9.36L6.47448 9.416C6.54915 9.472 6.59582 9.50933 6.61448 9.528C6.64248 9.54667 6.67982 9.57467 6.72648 9.612L6.78248 9.668C6.81048 9.70533 6.85248 9.77067 6.90848 9.864C6.94582 9.92 6.97848 9.99467 7.00648 10.088L7.09048 10.368C7.09982 10.4333 7.10448 10.536 7.10448 10.676L7.09048 10.886C7.09048 10.97 7.08582 11.0307 7.07648 11.068H7.06248C7.06248 11.124 7.04848 11.18 7.02048 11.236L6.95048 11.404L6.64248 11.362L6.34848 11.306L6.39048 11.32C6.18515 11.2733 5.99382 11.2173 5.81648 11.152C5.75115 11.1333 5.65782 11.096 5.53648 11.04L5.28448 10.914ZM15.2805 7.946L14.4265 8.114L14.5245 8.702C14.5618 8.954 14.5852 9.15933 14.5945 9.318C14.6132 9.46733 14.6318 9.69133 14.6505 9.99C14.6692 10.2047 14.6692 10.4333 14.6505 10.676L14.3565 10.83C14.3192 10.8487 14.2632 10.8673 14.1885 10.886L14.0905 10.914L13.9785 10.956L13.5725 11.012L13.1385 11.04H12.4525C12.4525 10.844 12.4385 10.6527 12.4105 10.466C12.3825 10.27 12.3405 10.088 12.2845 9.92L12.2985 9.948L12.1305 9.514C12.0372 9.32733 11.9625 9.192 11.9065 9.108V9.122C11.8318 9.00067 11.7525 8.898 11.6685 8.814C11.5378 8.702 11.4352 8.62267 11.3605 8.576H11.3465C11.2252 8.51067 11.1085 8.46867 10.9965 8.45C10.8938 8.422 10.7725 8.408 10.6325 8.408H10.6045C10.5018 8.408 10.4038 8.422 10.3105 8.45C10.2172 8.478 10.1145 8.52467 10.0025 8.59C9.89048 8.646 9.79248 8.71133 9.70848 8.786C9.59648 8.898 9.51715 8.98667 9.47048 9.052C9.39582 9.15467 9.32115 9.26667 9.24648 9.388C9.18115 9.50933 9.12515 9.64 9.07848 9.78V9.794C9.02248 9.91533 8.98048 10.0553 8.95248 10.214C8.93382 10.4193 8.92448 10.5733 8.92448 10.676C8.92448 10.8347 8.93382 10.9513 8.95248 11.026C8.97115 11.1567 9.00382 11.2593 9.05048 11.334C9.05982 11.418 9.09715 11.4973 9.16249 11.572L9.24648 11.67L9.34448 11.754C9.41915 11.81 9.49382 11.8567 9.56848 11.894C9.65248 11.9313 9.74115 11.9547 9.83448 11.964L10.1285 12.006C10.2032 12.0153 10.3152 12.02 10.4645 12.02H11.1365C11.3978 12.0013 11.5892 11.9827 11.7105 11.964L11.6685 11.992L11.6405 12.076V12.202L11.6265 12.23C11.5238 12.3887 11.3885 12.5473 11.2205 12.706C11.0525 12.8553 10.8938 12.9813 10.7445 13.084L10.7305 13.098C10.6372 13.154 10.5625 13.196 10.5065 13.224C10.3945 13.28 10.3105 13.3173 10.2545 13.336H10.2405C10.1565 13.3827 10.0818 13.4107 10.0165 13.42L9.82048 13.434C9.74582 13.434 9.68515 13.4293 9.63848 13.42C9.60115 13.42 9.54048 13.4107 9.45648 13.392H9.41449C9.31182 13.3827 9.19048 13.3593 9.05048 13.322C8.92915 13.294 8.82182 13.252 8.72848 13.196L8.74248 13.224L8.50448 13.784C8.60715 13.84 8.75648 13.9053 8.95248 13.98L9.05048 14.022L9.48449 14.176L9.55449 14.19C9.67582 14.218 9.76915 14.2367 9.83448 14.246L9.90448 14.26C9.99782 14.2693 10.0678 14.274 10.1145 14.274C10.1612 14.274 10.2405 14.2647 10.3525 14.246L10.6605 14.134C10.7538 14.0967 10.8612 14.0407 10.9825 13.966C11.1318 13.8727 11.2485 13.7933 11.3325 13.728C11.4818 13.5973 11.5938 13.4947 11.6685 13.42C11.7712 13.2987 11.8738 13.168 11.9765 13.028C12.0792 12.8973 12.1678 12.7433 12.2425 12.566C12.3172 12.3793 12.3685 12.202 12.3965 12.034V12.02H13.1385C13.3718 12.02 13.5398 12.0107 13.6425 11.992C13.7732 11.9827 13.9225 11.9593 14.0905 11.922C14.2678 11.8847 14.4032 11.8473 14.4965 11.81C14.5898 11.7727 14.6878 11.7213 14.7905 11.656C14.9305 11.572 15.0332 11.4833 15.0985 11.39C15.2105 11.2407 15.2852 11.1193 15.3225 11.026C15.3878 10.8767 15.4298 10.7367 15.4485 10.606C15.4765 10.466 15.4905 10.3167 15.4905 10.158C15.4905 9.71933 15.4718 9.332 15.4345 8.996C15.3972 8.688 15.3645 8.44067 15.3365 8.254L15.2805 7.946Z"
                          fill={pollution}
                        />
                      </svg>
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            {order.gift_credit_used ? (
              <div
                className="d-flex justify-content-between align-items-center pt-2 pb-4"
                style={{ color: pollution }}
              >
                <div>Pay from the wallet</div>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                    }}
                  >
                    <span className="pl-1">
                      {order.gift_credit_used
                        ? priceFormatter(order.gift_credit_used)
                        : "Free"}
                    </span>
                    {order.gift_credit_used ? (
                      <span>
                        <svg
                          width="16"
                          height="15"
                          viewBox="0 0 16 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.27048 7.19C5.42915 7.19 5.54582 7.18533 5.62048 7.176C5.78848 7.15733 5.91448 7.13867 5.99848 7.12C6.14782 7.10133 6.27382 7.08267 6.37648 7.064L6.54448 7.008L6.71248 6.966L6.82448 6.924C6.88048 6.90533 6.93182 6.88667 6.97848 6.868C7.03448 6.84933 7.10915 6.82133 7.20248 6.784L7.51048 6.63L7.72048 6.504H7.70648C7.78115 6.46667 7.85115 6.41533 7.91648 6.35L7.97248 6.294C8.01915 6.238 8.04715 6.196 8.05648 6.168C8.10315 6.10267 8.14982 6.028 8.19649 5.944C8.22448 5.89733 8.25715 5.82733 8.29448 5.734C8.30382 5.68733 8.32715 5.608 8.36448 5.496C8.38315 5.40267 8.39249 5.31867 8.39249 5.244L8.40648 5.216C8.42515 5.104 8.43448 5.02 8.43448 4.964L8.42048 4.264C8.42048 4.16133 8.41115 4.00733 8.39249 3.802C8.37382 3.56867 8.35515 3.39133 8.33648 3.27L8.26648 2.78L8.29448 2.85L8.11248 1.814C8.06582 1.57133 8.00048 1.27733 7.91648 0.931999L7.95848 1.128L7.13248 1.324C7.13248 1.38 7.14648 1.47333 7.17448 1.604L7.27248 2.08C7.33782 2.36 7.38915 2.63533 7.42648 2.906L7.56648 3.83V3.942C7.59449 4.09133 7.60849 4.24533 7.60849 4.404C7.61782 4.49733 7.62248 4.63267 7.62248 4.81V5.244L7.58048 5.426L7.55248 5.594L7.18848 5.804L7.09048 5.832C7.03448 5.86 6.95048 5.89267 6.83848 5.93L6.55848 6.014C6.50248 6.02333 6.40915 6.04667 6.27848 6.084C6.22248 6.10267 6.12915 6.12133 5.99848 6.14H5.97048C5.90515 6.14 5.80715 6.14933 5.67648 6.168C5.61115 6.17733 5.50848 6.182 5.36848 6.182C5.09782 6.182 4.85048 6.154 4.62648 6.098C4.41182 6.042 4.22515 5.95333 4.06648 5.832C3.91715 5.72933 3.79582 5.58467 3.70248 5.398C3.61848 5.21133 3.57648 5.00133 3.57648 4.768C3.57648 4.60933 3.59048 4.432 3.61848 4.236C3.64648 4.068 3.69782 3.858 3.77248 3.606C3.80982 3.45667 3.87515 3.22333 3.96848 2.906C4.05248 2.66333 4.13648 2.41133 4.22048 2.15L3.59048 1.912L3.28248 2.836L3.04448 3.634C3.01648 3.774 2.97915 3.97 2.93248 4.222L2.90448 4.348C2.87648 4.572 2.86248 4.79133 2.86248 5.006C2.86248 5.40733 2.91382 5.72933 3.01648 5.972C3.10982 6.23333 3.26848 6.462 3.49248 6.658C3.68848 6.826 3.94048 6.96133 4.24848 7.064C4.54715 7.148 4.88782 7.19 5.27048 7.19ZM5.64848 4.488L6.33448 3.802L5.64848 3.088L4.94848 3.802L5.64848 4.488ZM12.9285 6.56L13.6285 5.874L12.9285 5.174L12.2425 5.874L12.9285 6.56ZM6.85248 12.328C6.94582 12.328 7.02982 12.3093 7.10448 12.272C7.15115 12.2533 7.19782 12.23 7.24448 12.202L7.30048 12.16C7.38448 12.0947 7.44515 12.0293 7.48249 11.964C7.55715 11.8707 7.60848 11.796 7.63648 11.74C7.66448 11.684 7.69715 11.6 7.73449 11.488C7.76248 11.404 7.79048 11.306 7.81848 11.194C7.81848 11.1473 7.82782 11.0727 7.84648 10.97V10.928C7.85582 10.8627 7.86048 10.76 7.86048 10.62C7.86048 10.4147 7.85115 10.2653 7.83248 10.172L7.74848 9.752V9.78C7.70182 9.612 7.65515 9.486 7.60849 9.402L7.41249 9.066C7.36582 9.01 7.28648 8.926 7.17448 8.814C7.08115 8.73933 6.98782 8.674 6.89448 8.618H6.88048C6.83382 8.59 6.75915 8.55733 6.65648 8.52L6.57248 8.492C6.47915 8.47333 6.40448 8.464 6.34848 8.464L6.20848 8.45C6.15248 8.45 6.06382 8.464 5.94248 8.492L5.90048 8.506L5.71848 8.59L5.63448 8.646L5.35448 8.87L5.10248 9.136L4.62648 9.794C4.59848 9.84067 4.54248 9.91533 4.45848 10.018L4.12248 10.438C4.05715 10.5033 3.95915 10.592 3.82848 10.704C3.73515 10.7787 3.63248 10.8533 3.52048 10.928C3.40848 11.0027 3.29648 11.054 3.18448 11.082C3.07248 11.11 2.94648 11.124 2.80648 11.124H2.49848C2.38648 11.1053 2.30715 11.0867 2.26048 11.068C2.19515 11.068 2.12515 11.0447 2.05048 10.998L1.86848 10.886L1.74248 10.718C1.71448 10.6713 1.69115 10.6247 1.67248 10.578L1.65848 10.494C1.63982 10.4287 1.62115 10.34 1.60248 10.228L1.58848 9.92V5.468L0.804484 5.496V9.864C0.804484 10.1347 0.813818 10.326 0.832484 10.438C0.841818 10.578 0.865151 10.7367 0.902484 10.914L0.944484 11.04C0.991151 11.1707 1.02848 11.264 1.05648 11.32C1.13115 11.4413 1.20582 11.5393 1.28048 11.614C1.35515 11.7167 1.44848 11.796 1.56048 11.852C1.62582 11.8987 1.73315 11.95 1.88248 12.006C2.06915 12.062 2.21382 12.0947 2.31648 12.104C2.52182 12.1227 2.68515 12.132 2.80648 12.132C2.98382 12.132 3.13315 12.1133 3.25448 12.076C3.44115 12.02 3.57648 11.9687 3.66048 11.922C3.78182 11.866 3.90315 11.782 4.02448 11.67C4.15515 11.558 4.26248 11.446 4.34648 11.334C4.47715 11.446 4.57515 11.5253 4.64048 11.572C4.71515 11.6187 4.82715 11.6793 4.97648 11.754C5.08848 11.8193 5.20048 11.8753 5.31248 11.922L5.64848 12.076L5.99848 12.188L6.30648 12.272L6.65648 12.314C6.73115 12.3233 6.78715 12.328 6.82448 12.328H6.85248ZM12.9285 7.946L13.6285 7.246L12.9285 6.56L12.2425 7.246L12.9285 7.946ZM10.5345 11.11C10.4132 11.11 10.3245 11.11 10.2685 11.11C10.2218 11.1007 10.1518 11.0867 10.0585 11.068C10.0212 11.068 9.97448 11.0587 9.91848 11.04C9.86248 11.012 9.81582 10.9887 9.77848 10.97H9.80649C9.77848 10.9513 9.74582 10.9233 9.70848 10.886L9.65248 10.788L9.63848 10.676L9.61049 10.55C9.61049 10.4567 9.61982 10.382 9.63848 10.326V10.284C9.65715 10.2 9.67582 10.1347 9.69448 10.088L9.77848 9.878C9.83448 9.78467 9.87648 9.71933 9.90448 9.682C9.96048 9.60733 10.0025 9.556 10.0305 9.528L10.1985 9.402L10.3665 9.318L10.4645 9.304H10.5765C10.6698 9.304 10.7352 9.30867 10.7725 9.318L10.9545 9.402C11.0478 9.458 11.1178 9.50467 11.1645 9.542C11.2112 9.57933 11.2578 9.64 11.3045 9.724C11.3512 9.77067 11.3978 9.85467 11.4445 9.976C11.5005 10.088 11.5425 10.1907 11.5705 10.284C11.6078 10.396 11.6358 10.5173 11.6545 10.648L11.6965 11.068C11.4725 11.0867 11.2905 11.1007 11.1505 11.11C11.0198 11.11 10.8145 11.11 10.5345 11.11ZM5.28448 10.914L5.31248 10.928C5.23782 10.8907 5.15848 10.844 5.07448 10.788L4.97648 10.718L4.87848 10.634L4.94848 10.522L5.17248 10.2C5.24715 10.088 5.30315 10.0087 5.34048 9.962L5.49448 9.78C5.53182 9.724 5.58782 9.65867 5.66248 9.584L5.80248 9.458C5.87715 9.41133 5.93782 9.37867 5.98448 9.36C6.03115 9.34133 6.08248 9.332 6.13848 9.332C6.16648 9.332 6.20382 9.33667 6.25048 9.346L6.30648 9.36L6.47448 9.416C6.54915 9.472 6.59582 9.50933 6.61448 9.528C6.64248 9.54667 6.67982 9.57467 6.72648 9.612L6.78248 9.668C6.81048 9.70533 6.85248 9.77067 6.90848 9.864C6.94582 9.92 6.97848 9.99467 7.00648 10.088L7.09048 10.368C7.09982 10.4333 7.10448 10.536 7.10448 10.676L7.09048 10.886C7.09048 10.97 7.08582 11.0307 7.07648 11.068H7.06248C7.06248 11.124 7.04848 11.18 7.02048 11.236L6.95048 11.404L6.64248 11.362L6.34848 11.306L6.39048 11.32C6.18515 11.2733 5.99382 11.2173 5.81648 11.152C5.75115 11.1333 5.65782 11.096 5.53648 11.04L5.28448 10.914ZM15.2805 7.946L14.4265 8.114L14.5245 8.702C14.5618 8.954 14.5852 9.15933 14.5945 9.318C14.6132 9.46733 14.6318 9.69133 14.6505 9.99C14.6692 10.2047 14.6692 10.4333 14.6505 10.676L14.3565 10.83C14.3192 10.8487 14.2632 10.8673 14.1885 10.886L14.0905 10.914L13.9785 10.956L13.5725 11.012L13.1385 11.04H12.4525C12.4525 10.844 12.4385 10.6527 12.4105 10.466C12.3825 10.27 12.3405 10.088 12.2845 9.92L12.2985 9.948L12.1305 9.514C12.0372 9.32733 11.9625 9.192 11.9065 9.108V9.122C11.8318 9.00067 11.7525 8.898 11.6685 8.814C11.5378 8.702 11.4352 8.62267 11.3605 8.576H11.3465C11.2252 8.51067 11.1085 8.46867 10.9965 8.45C10.8938 8.422 10.7725 8.408 10.6325 8.408H10.6045C10.5018 8.408 10.4038 8.422 10.3105 8.45C10.2172 8.478 10.1145 8.52467 10.0025 8.59C9.89048 8.646 9.79248 8.71133 9.70848 8.786C9.59648 8.898 9.51715 8.98667 9.47048 9.052C9.39582 9.15467 9.32115 9.26667 9.24648 9.388C9.18115 9.50933 9.12515 9.64 9.07848 9.78V9.794C9.02248 9.91533 8.98048 10.0553 8.95248 10.214C8.93382 10.4193 8.92448 10.5733 8.92448 10.676C8.92448 10.8347 8.93382 10.9513 8.95248 11.026C8.97115 11.1567 9.00382 11.2593 9.05048 11.334C9.05982 11.418 9.09715 11.4973 9.16249 11.572L9.24648 11.67L9.34448 11.754C9.41915 11.81 9.49382 11.8567 9.56848 11.894C9.65248 11.9313 9.74115 11.9547 9.83448 11.964L10.1285 12.006C10.2032 12.0153 10.3152 12.02 10.4645 12.02H11.1365C11.3978 12.0013 11.5892 11.9827 11.7105 11.964L11.6685 11.992L11.6405 12.076V12.202L11.6265 12.23C11.5238 12.3887 11.3885 12.5473 11.2205 12.706C11.0525 12.8553 10.8938 12.9813 10.7445 13.084L10.7305 13.098C10.6372 13.154 10.5625 13.196 10.5065 13.224C10.3945 13.28 10.3105 13.3173 10.2545 13.336H10.2405C10.1565 13.3827 10.0818 13.4107 10.0165 13.42L9.82048 13.434C9.74582 13.434 9.68515 13.4293 9.63848 13.42C9.60115 13.42 9.54048 13.4107 9.45648 13.392H9.41449C9.31182 13.3827 9.19048 13.3593 9.05048 13.322C8.92915 13.294 8.82182 13.252 8.72848 13.196L8.74248 13.224L8.50448 13.784C8.60715 13.84 8.75648 13.9053 8.95248 13.98L9.05048 14.022L9.48449 14.176L9.55449 14.19C9.67582 14.218 9.76915 14.2367 9.83448 14.246L9.90448 14.26C9.99782 14.2693 10.0678 14.274 10.1145 14.274C10.1612 14.274 10.2405 14.2647 10.3525 14.246L10.6605 14.134C10.7538 14.0967 10.8612 14.0407 10.9825 13.966C11.1318 13.8727 11.2485 13.7933 11.3325 13.728C11.4818 13.5973 11.5938 13.4947 11.6685 13.42C11.7712 13.2987 11.8738 13.168 11.9765 13.028C12.0792 12.8973 12.1678 12.7433 12.2425 12.566C12.3172 12.3793 12.3685 12.202 12.3965 12.034V12.02H13.1385C13.3718 12.02 13.5398 12.0107 13.6425 11.992C13.7732 11.9827 13.9225 11.9593 14.0905 11.922C14.2678 11.8847 14.4032 11.8473 14.4965 11.81C14.5898 11.7727 14.6878 11.7213 14.7905 11.656C14.9305 11.572 15.0332 11.4833 15.0985 11.39C15.2105 11.2407 15.2852 11.1193 15.3225 11.026C15.3878 10.8767 15.4298 10.7367 15.4485 10.606C15.4765 10.466 15.4905 10.3167 15.4905 10.158C15.4905 9.71933 15.4718 9.332 15.4345 8.996C15.3972 8.688 15.3645 8.44067 15.3365 8.254L15.2805 7.946Z"
                            fill={pollution}
                          />
                        </svg>
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

            {order.discount_code_amount ? (
              <div
                className="d-flex justify-content-between align-items-center pt-2 pb-4"
                style={{ color: pollution }}
              >
                <div>discount code</div>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                    }}
                  >
                    <span className="pl-1">
                      {priceFormatter(order.discount_code_amount)}
                    </span>
                    <span>
                      <svg
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.27048 7.19C5.42915 7.19 5.54582 7.18533 5.62048 7.176C5.78848 7.15733 5.91448 7.13867 5.99848 7.12C6.14782 7.10133 6.27382 7.08267 6.37648 7.064L6.54448 7.008L6.71248 6.966L6.82448 6.924C6.88048 6.90533 6.93182 6.88667 6.97848 6.868C7.03448 6.84933 7.10915 6.82133 7.20248 6.784L7.51048 6.63L7.72048 6.504H7.70648C7.78115 6.46667 7.85115 6.41533 7.91648 6.35L7.97248 6.294C8.01915 6.238 8.04715 6.196 8.05648 6.168C8.10315 6.10267 8.14982 6.028 8.19649 5.944C8.22448 5.89733 8.25715 5.82733 8.29448 5.734C8.30382 5.68733 8.32715 5.608 8.36448 5.496C8.38315 5.40267 8.39249 5.31867 8.39249 5.244L8.40648 5.216C8.42515 5.104 8.43448 5.02 8.43448 4.964L8.42048 4.264C8.42048 4.16133 8.41115 4.00733 8.39249 3.802C8.37382 3.56867 8.35515 3.39133 8.33648 3.27L8.26648 2.78L8.29448 2.85L8.11248 1.814C8.06582 1.57133 8.00048 1.27733 7.91648 0.931999L7.95848 1.128L7.13248 1.324C7.13248 1.38 7.14648 1.47333 7.17448 1.604L7.27248 2.08C7.33782 2.36 7.38915 2.63533 7.42648 2.906L7.56648 3.83V3.942C7.59449 4.09133 7.60849 4.24533 7.60849 4.404C7.61782 4.49733 7.62248 4.63267 7.62248 4.81V5.244L7.58048 5.426L7.55248 5.594L7.18848 5.804L7.09048 5.832C7.03448 5.86 6.95048 5.89267 6.83848 5.93L6.55848 6.014C6.50248 6.02333 6.40915 6.04667 6.27848 6.084C6.22248 6.10267 6.12915 6.12133 5.99848 6.14H5.97048C5.90515 6.14 5.80715 6.14933 5.67648 6.168C5.61115 6.17733 5.50848 6.182 5.36848 6.182C5.09782 6.182 4.85048 6.154 4.62648 6.098C4.41182 6.042 4.22515 5.95333 4.06648 5.832C3.91715 5.72933 3.79582 5.58467 3.70248 5.398C3.61848 5.21133 3.57648 5.00133 3.57648 4.768C3.57648 4.60933 3.59048 4.432 3.61848 4.236C3.64648 4.068 3.69782 3.858 3.77248 3.606C3.80982 3.45667 3.87515 3.22333 3.96848 2.906C4.05248 2.66333 4.13648 2.41133 4.22048 2.15L3.59048 1.912L3.28248 2.836L3.04448 3.634C3.01648 3.774 2.97915 3.97 2.93248 4.222L2.90448 4.348C2.87648 4.572 2.86248 4.79133 2.86248 5.006C2.86248 5.40733 2.91382 5.72933 3.01648 5.972C3.10982 6.23333 3.26848 6.462 3.49248 6.658C3.68848 6.826 3.94048 6.96133 4.24848 7.064C4.54715 7.148 4.88782 7.19 5.27048 7.19ZM5.64848 4.488L6.33448 3.802L5.64848 3.088L4.94848 3.802L5.64848 4.488ZM12.9285 6.56L13.6285 5.874L12.9285 5.174L12.2425 5.874L12.9285 6.56ZM6.85248 12.328C6.94582 12.328 7.02982 12.3093 7.10448 12.272C7.15115 12.2533 7.19782 12.23 7.24448 12.202L7.30048 12.16C7.38448 12.0947 7.44515 12.0293 7.48249 11.964C7.55715 11.8707 7.60848 11.796 7.63648 11.74C7.66448 11.684 7.69715 11.6 7.73449 11.488C7.76248 11.404 7.79048 11.306 7.81848 11.194C7.81848 11.1473 7.82782 11.0727 7.84648 10.97V10.928C7.85582 10.8627 7.86048 10.76 7.86048 10.62C7.86048 10.4147 7.85115 10.2653 7.83248 10.172L7.74848 9.752V9.78C7.70182 9.612 7.65515 9.486 7.60849 9.402L7.41249 9.066C7.36582 9.01 7.28648 8.926 7.17448 8.814C7.08115 8.73933 6.98782 8.674 6.89448 8.618H6.88048C6.83382 8.59 6.75915 8.55733 6.65648 8.52L6.57248 8.492C6.47915 8.47333 6.40448 8.464 6.34848 8.464L6.20848 8.45C6.15248 8.45 6.06382 8.464 5.94248 8.492L5.90048 8.506L5.71848 8.59L5.63448 8.646L5.35448 8.87L5.10248 9.136L4.62648 9.794C4.59848 9.84067 4.54248 9.91533 4.45848 10.018L4.12248 10.438C4.05715 10.5033 3.95915 10.592 3.82848 10.704C3.73515 10.7787 3.63248 10.8533 3.52048 10.928C3.40848 11.0027 3.29648 11.054 3.18448 11.082C3.07248 11.11 2.94648 11.124 2.80648 11.124H2.49848C2.38648 11.1053 2.30715 11.0867 2.26048 11.068C2.19515 11.068 2.12515 11.0447 2.05048 10.998L1.86848 10.886L1.74248 10.718C1.71448 10.6713 1.69115 10.6247 1.67248 10.578L1.65848 10.494C1.63982 10.4287 1.62115 10.34 1.60248 10.228L1.58848 9.92V5.468L0.804484 5.496V9.864C0.804484 10.1347 0.813818 10.326 0.832484 10.438C0.841818 10.578 0.865151 10.7367 0.902484 10.914L0.944484 11.04C0.991151 11.1707 1.02848 11.264 1.05648 11.32C1.13115 11.4413 1.20582 11.5393 1.28048 11.614C1.35515 11.7167 1.44848 11.796 1.56048 11.852C1.62582 11.8987 1.73315 11.95 1.88248 12.006C2.06915 12.062 2.21382 12.0947 2.31648 12.104C2.52182 12.1227 2.68515 12.132 2.80648 12.132C2.98382 12.132 3.13315 12.1133 3.25448 12.076C3.44115 12.02 3.57648 11.9687 3.66048 11.922C3.78182 11.866 3.90315 11.782 4.02448 11.67C4.15515 11.558 4.26248 11.446 4.34648 11.334C4.47715 11.446 4.57515 11.5253 4.64048 11.572C4.71515 11.6187 4.82715 11.6793 4.97648 11.754C5.08848 11.8193 5.20048 11.8753 5.31248 11.922L5.64848 12.076L5.99848 12.188L6.30648 12.272L6.65648 12.314C6.73115 12.3233 6.78715 12.328 6.82448 12.328H6.85248ZM12.9285 7.946L13.6285 7.246L12.9285 6.56L12.2425 7.246L12.9285 7.946ZM10.5345 11.11C10.4132 11.11 10.3245 11.11 10.2685 11.11C10.2218 11.1007 10.1518 11.0867 10.0585 11.068C10.0212 11.068 9.97448 11.0587 9.91848 11.04C9.86248 11.012 9.81582 10.9887 9.77848 10.97H9.80649C9.77848 10.9513 9.74582 10.9233 9.70848 10.886L9.65248 10.788L9.63848 10.676L9.61049 10.55C9.61049 10.4567 9.61982 10.382 9.63848 10.326V10.284C9.65715 10.2 9.67582 10.1347 9.69448 10.088L9.77848 9.878C9.83448 9.78467 9.87648 9.71933 9.90448 9.682C9.96048 9.60733 10.0025 9.556 10.0305 9.528L10.1985 9.402L10.3665 9.318L10.4645 9.304H10.5765C10.6698 9.304 10.7352 9.30867 10.7725 9.318L10.9545 9.402C11.0478 9.458 11.1178 9.50467 11.1645 9.542C11.2112 9.57933 11.2578 9.64 11.3045 9.724C11.3512 9.77067 11.3978 9.85467 11.4445 9.976C11.5005 10.088 11.5425 10.1907 11.5705 10.284C11.6078 10.396 11.6358 10.5173 11.6545 10.648L11.6965 11.068C11.4725 11.0867 11.2905 11.1007 11.1505 11.11C11.0198 11.11 10.8145 11.11 10.5345 11.11ZM5.28448 10.914L5.31248 10.928C5.23782 10.8907 5.15848 10.844 5.07448 10.788L4.97648 10.718L4.87848 10.634L4.94848 10.522L5.17248 10.2C5.24715 10.088 5.30315 10.0087 5.34048 9.962L5.49448 9.78C5.53182 9.724 5.58782 9.65867 5.66248 9.584L5.80248 9.458C5.87715 9.41133 5.93782 9.37867 5.98448 9.36C6.03115 9.34133 6.08248 9.332 6.13848 9.332C6.16648 9.332 6.20382 9.33667 6.25048 9.346L6.30648 9.36L6.47448 9.416C6.54915 9.472 6.59582 9.50933 6.61448 9.528C6.64248 9.54667 6.67982 9.57467 6.72648 9.612L6.78248 9.668C6.81048 9.70533 6.85248 9.77067 6.90848 9.864C6.94582 9.92 6.97848 9.99467 7.00648 10.088L7.09048 10.368C7.09982 10.4333 7.10448 10.536 7.10448 10.676L7.09048 10.886C7.09048 10.97 7.08582 11.0307 7.07648 11.068H7.06248C7.06248 11.124 7.04848 11.18 7.02048 11.236L6.95048 11.404L6.64248 11.362L6.34848 11.306L6.39048 11.32C6.18515 11.2733 5.99382 11.2173 5.81648 11.152C5.75115 11.1333 5.65782 11.096 5.53648 11.04L5.28448 10.914ZM15.2805 7.946L14.4265 8.114L14.5245 8.702C14.5618 8.954 14.5852 9.15933 14.5945 9.318C14.6132 9.46733 14.6318 9.69133 14.6505 9.99C14.6692 10.2047 14.6692 10.4333 14.6505 10.676L14.3565 10.83C14.3192 10.8487 14.2632 10.8673 14.1885 10.886L14.0905 10.914L13.9785 10.956L13.5725 11.012L13.1385 11.04H12.4525C12.4525 10.844 12.4385 10.6527 12.4105 10.466C12.3825 10.27 12.3405 10.088 12.2845 9.92L12.2985 9.948L12.1305 9.514C12.0372 9.32733 11.9625 9.192 11.9065 9.108V9.122C11.8318 9.00067 11.7525 8.898 11.6685 8.814C11.5378 8.702 11.4352 8.62267 11.3605 8.576H11.3465C11.2252 8.51067 11.1085 8.46867 10.9965 8.45C10.8938 8.422 10.7725 8.408 10.6325 8.408H10.6045C10.5018 8.408 10.4038 8.422 10.3105 8.45C10.2172 8.478 10.1145 8.52467 10.0025 8.59C9.89048 8.646 9.79248 8.71133 9.70848 8.786C9.59648 8.898 9.51715 8.98667 9.47048 9.052C9.39582 9.15467 9.32115 9.26667 9.24648 9.388C9.18115 9.50933 9.12515 9.64 9.07848 9.78V9.794C9.02248 9.91533 8.98048 10.0553 8.95248 10.214C8.93382 10.4193 8.92448 10.5733 8.92448 10.676C8.92448 10.8347 8.93382 10.9513 8.95248 11.026C8.97115 11.1567 9.00382 11.2593 9.05048 11.334C9.05982 11.418 9.09715 11.4973 9.16249 11.572L9.24648 11.67L9.34448 11.754C9.41915 11.81 9.49382 11.8567 9.56848 11.894C9.65248 11.9313 9.74115 11.9547 9.83448 11.964L10.1285 12.006C10.2032 12.0153 10.3152 12.02 10.4645 12.02H11.1365C11.3978 12.0013 11.5892 11.9827 11.7105 11.964L11.6685 11.992L11.6405 12.076V12.202L11.6265 12.23C11.5238 12.3887 11.3885 12.5473 11.2205 12.706C11.0525 12.8553 10.8938 12.9813 10.7445 13.084L10.7305 13.098C10.6372 13.154 10.5625 13.196 10.5065 13.224C10.3945 13.28 10.3105 13.3173 10.2545 13.336H10.2405C10.1565 13.3827 10.0818 13.4107 10.0165 13.42L9.82048 13.434C9.74582 13.434 9.68515 13.4293 9.63848 13.42C9.60115 13.42 9.54048 13.4107 9.45648 13.392H9.41449C9.31182 13.3827 9.19048 13.3593 9.05048 13.322C8.92915 13.294 8.82182 13.252 8.72848 13.196L8.74248 13.224L8.50448 13.784C8.60715 13.84 8.75648 13.9053 8.95248 13.98L9.05048 14.022L9.48449 14.176L9.55449 14.19C9.67582 14.218 9.76915 14.2367 9.83448 14.246L9.90448 14.26C9.99782 14.2693 10.0678 14.274 10.1145 14.274C10.1612 14.274 10.2405 14.2647 10.3525 14.246L10.6605 14.134C10.7538 14.0967 10.8612 14.0407 10.9825 13.966C11.1318 13.8727 11.2485 13.7933 11.3325 13.728C11.4818 13.5973 11.5938 13.4947 11.6685 13.42C11.7712 13.2987 11.8738 13.168 11.9765 13.028C12.0792 12.8973 12.1678 12.7433 12.2425 12.566C12.3172 12.3793 12.3685 12.202 12.3965 12.034V12.02H13.1385C13.3718 12.02 13.5398 12.0107 13.6425 11.992C13.7732 11.9827 13.9225 11.9593 14.0905 11.922C14.2678 11.8847 14.4032 11.8473 14.4965 11.81C14.5898 11.7727 14.6878 11.7213 14.7905 11.656C14.9305 11.572 15.0332 11.4833 15.0985 11.39C15.2105 11.2407 15.2852 11.1193 15.3225 11.026C15.3878 10.8767 15.4298 10.7367 15.4485 10.606C15.4765 10.466 15.4905 10.3167 15.4905 10.158C15.4905 9.71933 15.4718 9.332 15.4345 8.996C15.3972 8.688 15.3645 8.44067 15.3365 8.254L15.2805 7.946Z"
                          fill={pollution}
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
            {order.coupon_discount_amount ? (
              <div
                className="d-flex justify-content-between align-items-center pt-2 pb-4"
                style={{ color: pollution }}
              >
                <div>Discounts by coupon</div>
                <div>
                  <div
                    style={{
                      fontSize: 14,
                    }}
                  >
                    <span className="pl-1">
                      {priceFormatter(order.coupon_discount_amount)}
                    </span>
                    <span>
                      <svg
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.27048 7.19C5.42915 7.19 5.54582 7.18533 5.62048 7.176C5.78848 7.15733 5.91448 7.13867 5.99848 7.12C6.14782 7.10133 6.27382 7.08267 6.37648 7.064L6.54448 7.008L6.71248 6.966L6.82448 6.924C6.88048 6.90533 6.93182 6.88667 6.97848 6.868C7.03448 6.84933 7.10915 6.82133 7.20248 6.784L7.51048 6.63L7.72048 6.504H7.70648C7.78115 6.46667 7.85115 6.41533 7.91648 6.35L7.97248 6.294C8.01915 6.238 8.04715 6.196 8.05648 6.168C8.10315 6.10267 8.14982 6.028 8.19649 5.944C8.22448 5.89733 8.25715 5.82733 8.29448 5.734C8.30382 5.68733 8.32715 5.608 8.36448 5.496C8.38315 5.40267 8.39249 5.31867 8.39249 5.244L8.40648 5.216C8.42515 5.104 8.43448 5.02 8.43448 4.964L8.42048 4.264C8.42048 4.16133 8.41115 4.00733 8.39249 3.802C8.37382 3.56867 8.35515 3.39133 8.33648 3.27L8.26648 2.78L8.29448 2.85L8.11248 1.814C8.06582 1.57133 8.00048 1.27733 7.91648 0.931999L7.95848 1.128L7.13248 1.324C7.13248 1.38 7.14648 1.47333 7.17448 1.604L7.27248 2.08C7.33782 2.36 7.38915 2.63533 7.42648 2.906L7.56648 3.83V3.942C7.59449 4.09133 7.60849 4.24533 7.60849 4.404C7.61782 4.49733 7.62248 4.63267 7.62248 4.81V5.244L7.58048 5.426L7.55248 5.594L7.18848 5.804L7.09048 5.832C7.03448 5.86 6.95048 5.89267 6.83848 5.93L6.55848 6.014C6.50248 6.02333 6.40915 6.04667 6.27848 6.084C6.22248 6.10267 6.12915 6.12133 5.99848 6.14H5.97048C5.90515 6.14 5.80715 6.14933 5.67648 6.168C5.61115 6.17733 5.50848 6.182 5.36848 6.182C5.09782 6.182 4.85048 6.154 4.62648 6.098C4.41182 6.042 4.22515 5.95333 4.06648 5.832C3.91715 5.72933 3.79582 5.58467 3.70248 5.398C3.61848 5.21133 3.57648 5.00133 3.57648 4.768C3.57648 4.60933 3.59048 4.432 3.61848 4.236C3.64648 4.068 3.69782 3.858 3.77248 3.606C3.80982 3.45667 3.87515 3.22333 3.96848 2.906C4.05248 2.66333 4.13648 2.41133 4.22048 2.15L3.59048 1.912L3.28248 2.836L3.04448 3.634C3.01648 3.774 2.97915 3.97 2.93248 4.222L2.90448 4.348C2.87648 4.572 2.86248 4.79133 2.86248 5.006C2.86248 5.40733 2.91382 5.72933 3.01648 5.972C3.10982 6.23333 3.26848 6.462 3.49248 6.658C3.68848 6.826 3.94048 6.96133 4.24848 7.064C4.54715 7.148 4.88782 7.19 5.27048 7.19ZM5.64848 4.488L6.33448 3.802L5.64848 3.088L4.94848 3.802L5.64848 4.488ZM12.9285 6.56L13.6285 5.874L12.9285 5.174L12.2425 5.874L12.9285 6.56ZM6.85248 12.328C6.94582 12.328 7.02982 12.3093 7.10448 12.272C7.15115 12.2533 7.19782 12.23 7.24448 12.202L7.30048 12.16C7.38448 12.0947 7.44515 12.0293 7.48249 11.964C7.55715 11.8707 7.60848 11.796 7.63648 11.74C7.66448 11.684 7.69715 11.6 7.73449 11.488C7.76248 11.404 7.79048 11.306 7.81848 11.194C7.81848 11.1473 7.82782 11.0727 7.84648 10.97V10.928C7.85582 10.8627 7.86048 10.76 7.86048 10.62C7.86048 10.4147 7.85115 10.2653 7.83248 10.172L7.74848 9.752V9.78C7.70182 9.612 7.65515 9.486 7.60849 9.402L7.41249 9.066C7.36582 9.01 7.28648 8.926 7.17448 8.814C7.08115 8.73933 6.98782 8.674 6.89448 8.618H6.88048C6.83382 8.59 6.75915 8.55733 6.65648 8.52L6.57248 8.492C6.47915 8.47333 6.40448 8.464 6.34848 8.464L6.20848 8.45C6.15248 8.45 6.06382 8.464 5.94248 8.492L5.90048 8.506L5.71848 8.59L5.63448 8.646L5.35448 8.87L5.10248 9.136L4.62648 9.794C4.59848 9.84067 4.54248 9.91533 4.45848 10.018L4.12248 10.438C4.05715 10.5033 3.95915 10.592 3.82848 10.704C3.73515 10.7787 3.63248 10.8533 3.52048 10.928C3.40848 11.0027 3.29648 11.054 3.18448 11.082C3.07248 11.11 2.94648 11.124 2.80648 11.124H2.49848C2.38648 11.1053 2.30715 11.0867 2.26048 11.068C2.19515 11.068 2.12515 11.0447 2.05048 10.998L1.86848 10.886L1.74248 10.718C1.71448 10.6713 1.69115 10.6247 1.67248 10.578L1.65848 10.494C1.63982 10.4287 1.62115 10.34 1.60248 10.228L1.58848 9.92V5.468L0.804484 5.496V9.864C0.804484 10.1347 0.813818 10.326 0.832484 10.438C0.841818 10.578 0.865151 10.7367 0.902484 10.914L0.944484 11.04C0.991151 11.1707 1.02848 11.264 1.05648 11.32C1.13115 11.4413 1.20582 11.5393 1.28048 11.614C1.35515 11.7167 1.44848 11.796 1.56048 11.852C1.62582 11.8987 1.73315 11.95 1.88248 12.006C2.06915 12.062 2.21382 12.0947 2.31648 12.104C2.52182 12.1227 2.68515 12.132 2.80648 12.132C2.98382 12.132 3.13315 12.1133 3.25448 12.076C3.44115 12.02 3.57648 11.9687 3.66048 11.922C3.78182 11.866 3.90315 11.782 4.02448 11.67C4.15515 11.558 4.26248 11.446 4.34648 11.334C4.47715 11.446 4.57515 11.5253 4.64048 11.572C4.71515 11.6187 4.82715 11.6793 4.97648 11.754C5.08848 11.8193 5.20048 11.8753 5.31248 11.922L5.64848 12.076L5.99848 12.188L6.30648 12.272L6.65648 12.314C6.73115 12.3233 6.78715 12.328 6.82448 12.328H6.85248ZM12.9285 7.946L13.6285 7.246L12.9285 6.56L12.2425 7.246L12.9285 7.946ZM10.5345 11.11C10.4132 11.11 10.3245 11.11 10.2685 11.11C10.2218 11.1007 10.1518 11.0867 10.0585 11.068C10.0212 11.068 9.97448 11.0587 9.91848 11.04C9.86248 11.012 9.81582 10.9887 9.77848 10.97H9.80649C9.77848 10.9513 9.74582 10.9233 9.70848 10.886L9.65248 10.788L9.63848 10.676L9.61049 10.55C9.61049 10.4567 9.61982 10.382 9.63848 10.326V10.284C9.65715 10.2 9.67582 10.1347 9.69448 10.088L9.77848 9.878C9.83448 9.78467 9.87648 9.71933 9.90448 9.682C9.96048 9.60733 10.0025 9.556 10.0305 9.528L10.1985 9.402L10.3665 9.318L10.4645 9.304H10.5765C10.6698 9.304 10.7352 9.30867 10.7725 9.318L10.9545 9.402C11.0478 9.458 11.1178 9.50467 11.1645 9.542C11.2112 9.57933 11.2578 9.64 11.3045 9.724C11.3512 9.77067 11.3978 9.85467 11.4445 9.976C11.5005 10.088 11.5425 10.1907 11.5705 10.284C11.6078 10.396 11.6358 10.5173 11.6545 10.648L11.6965 11.068C11.4725 11.0867 11.2905 11.1007 11.1505 11.11C11.0198 11.11 10.8145 11.11 10.5345 11.11ZM5.28448 10.914L5.31248 10.928C5.23782 10.8907 5.15848 10.844 5.07448 10.788L4.97648 10.718L4.87848 10.634L4.94848 10.522L5.17248 10.2C5.24715 10.088 5.30315 10.0087 5.34048 9.962L5.49448 9.78C5.53182 9.724 5.58782 9.65867 5.66248 9.584L5.80248 9.458C5.87715 9.41133 5.93782 9.37867 5.98448 9.36C6.03115 9.34133 6.08248 9.332 6.13848 9.332C6.16648 9.332 6.20382 9.33667 6.25048 9.346L6.30648 9.36L6.47448 9.416C6.54915 9.472 6.59582 9.50933 6.61448 9.528C6.64248 9.54667 6.67982 9.57467 6.72648 9.612L6.78248 9.668C6.81048 9.70533 6.85248 9.77067 6.90848 9.864C6.94582 9.92 6.97848 9.99467 7.00648 10.088L7.09048 10.368C7.09982 10.4333 7.10448 10.536 7.10448 10.676L7.09048 10.886C7.09048 10.97 7.08582 11.0307 7.07648 11.068H7.06248C7.06248 11.124 7.04848 11.18 7.02048 11.236L6.95048 11.404L6.64248 11.362L6.34848 11.306L6.39048 11.32C6.18515 11.2733 5.99382 11.2173 5.81648 11.152C5.75115 11.1333 5.65782 11.096 5.53648 11.04L5.28448 10.914ZM15.2805 7.946L14.4265 8.114L14.5245 8.702C14.5618 8.954 14.5852 9.15933 14.5945 9.318C14.6132 9.46733 14.6318 9.69133 14.6505 9.99C14.6692 10.2047 14.6692 10.4333 14.6505 10.676L14.3565 10.83C14.3192 10.8487 14.2632 10.8673 14.1885 10.886L14.0905 10.914L13.9785 10.956L13.5725 11.012L13.1385 11.04H12.4525C12.4525 10.844 12.4385 10.6527 12.4105 10.466C12.3825 10.27 12.3405 10.088 12.2845 9.92L12.2985 9.948L12.1305 9.514C12.0372 9.32733 11.9625 9.192 11.9065 9.108V9.122C11.8318 9.00067 11.7525 8.898 11.6685 8.814C11.5378 8.702 11.4352 8.62267 11.3605 8.576H11.3465C11.2252 8.51067 11.1085 8.46867 10.9965 8.45C10.8938 8.422 10.7725 8.408 10.6325 8.408H10.6045C10.5018 8.408 10.4038 8.422 10.3105 8.45C10.2172 8.478 10.1145 8.52467 10.0025 8.59C9.89048 8.646 9.79248 8.71133 9.70848 8.786C9.59648 8.898 9.51715 8.98667 9.47048 9.052C9.39582 9.15467 9.32115 9.26667 9.24648 9.388C9.18115 9.50933 9.12515 9.64 9.07848 9.78V9.794C9.02248 9.91533 8.98048 10.0553 8.95248 10.214C8.93382 10.4193 8.92448 10.5733 8.92448 10.676C8.92448 10.8347 8.93382 10.9513 8.95248 11.026C8.97115 11.1567 9.00382 11.2593 9.05048 11.334C9.05982 11.418 9.09715 11.4973 9.16249 11.572L9.24648 11.67L9.34448 11.754C9.41915 11.81 9.49382 11.8567 9.56848 11.894C9.65248 11.9313 9.74115 11.9547 9.83448 11.964L10.1285 12.006C10.2032 12.0153 10.3152 12.02 10.4645 12.02H11.1365C11.3978 12.0013 11.5892 11.9827 11.7105 11.964L11.6685 11.992L11.6405 12.076V12.202L11.6265 12.23C11.5238 12.3887 11.3885 12.5473 11.2205 12.706C11.0525 12.8553 10.8938 12.9813 10.7445 13.084L10.7305 13.098C10.6372 13.154 10.5625 13.196 10.5065 13.224C10.3945 13.28 10.3105 13.3173 10.2545 13.336H10.2405C10.1565 13.3827 10.0818 13.4107 10.0165 13.42L9.82048 13.434C9.74582 13.434 9.68515 13.4293 9.63848 13.42C9.60115 13.42 9.54048 13.4107 9.45648 13.392H9.41449C9.31182 13.3827 9.19048 13.3593 9.05048 13.322C8.92915 13.294 8.82182 13.252 8.72848 13.196L8.74248 13.224L8.50448 13.784C8.60715 13.84 8.75648 13.9053 8.95248 13.98L9.05048 14.022L9.48449 14.176L9.55449 14.19C9.67582 14.218 9.76915 14.2367 9.83448 14.246L9.90448 14.26C9.99782 14.2693 10.0678 14.274 10.1145 14.274C10.1612 14.274 10.2405 14.2647 10.3525 14.246L10.6605 14.134C10.7538 14.0967 10.8612 14.0407 10.9825 13.966C11.1318 13.8727 11.2485 13.7933 11.3325 13.728C11.4818 13.5973 11.5938 13.4947 11.6685 13.42C11.7712 13.2987 11.8738 13.168 11.9765 13.028C12.0792 12.8973 12.1678 12.7433 12.2425 12.566C12.3172 12.3793 12.3685 12.202 12.3965 12.034V12.02H13.1385C13.3718 12.02 13.5398 12.0107 13.6425 11.992C13.7732 11.9827 13.9225 11.9593 14.0905 11.922C14.2678 11.8847 14.4032 11.8473 14.4965 11.81C14.5898 11.7727 14.6878 11.7213 14.7905 11.656C14.9305 11.572 15.0332 11.4833 15.0985 11.39C15.2105 11.2407 15.2852 11.1193 15.3225 11.026C15.3878 10.8767 15.4298 10.7367 15.4485 10.606C15.4765 10.466 15.4905 10.3167 15.4905 10.158C15.4905 9.71933 15.4718 9.332 15.4345 8.996C15.3972 8.688 15.3645 8.44067 15.3365 8.254L15.2805 7.946Z"
                          fill={pollution}
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
            <div
              className="d-flex justify-content-between align-items-center pt-2 pb-4"
              style={{ color: pollution, borderBottom: "1px solid #EDEDED" }}
            >
              <div>shipping cost</div>
              <div>
                <div
                  style={{
                    fontSize: 14,
                  }}
                >
                  <span className="pl-1">{cost}</span>
                  {order.delivery_price ? (
                    <span>
                      <svg
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.27048 7.19C5.42915 7.19 5.54582 7.18533 5.62048 7.176C5.78848 7.15733 5.91448 7.13867 5.99848 7.12C6.14782 7.10133 6.27382 7.08267 6.37648 7.064L6.54448 7.008L6.71248 6.966L6.82448 6.924C6.88048 6.90533 6.93182 6.88667 6.97848 6.868C7.03448 6.84933 7.10915 6.82133 7.20248 6.784L7.51048 6.63L7.72048 6.504H7.70648C7.78115 6.46667 7.85115 6.41533 7.91648 6.35L7.97248 6.294C8.01915 6.238 8.04715 6.196 8.05648 6.168C8.10315 6.10267 8.14982 6.028 8.19649 5.944C8.22448 5.89733 8.25715 5.82733 8.29448 5.734C8.30382 5.68733 8.32715 5.608 8.36448 5.496C8.38315 5.40267 8.39249 5.31867 8.39249 5.244L8.40648 5.216C8.42515 5.104 8.43448 5.02 8.43448 4.964L8.42048 4.264C8.42048 4.16133 8.41115 4.00733 8.39249 3.802C8.37382 3.56867 8.35515 3.39133 8.33648 3.27L8.26648 2.78L8.29448 2.85L8.11248 1.814C8.06582 1.57133 8.00048 1.27733 7.91648 0.931999L7.95848 1.128L7.13248 1.324C7.13248 1.38 7.14648 1.47333 7.17448 1.604L7.27248 2.08C7.33782 2.36 7.38915 2.63533 7.42648 2.906L7.56648 3.83V3.942C7.59449 4.09133 7.60849 4.24533 7.60849 4.404C7.61782 4.49733 7.62248 4.63267 7.62248 4.81V5.244L7.58048 5.426L7.55248 5.594L7.18848 5.804L7.09048 5.832C7.03448 5.86 6.95048 5.89267 6.83848 5.93L6.55848 6.014C6.50248 6.02333 6.40915 6.04667 6.27848 6.084C6.22248 6.10267 6.12915 6.12133 5.99848 6.14H5.97048C5.90515 6.14 5.80715 6.14933 5.67648 6.168C5.61115 6.17733 5.50848 6.182 5.36848 6.182C5.09782 6.182 4.85048 6.154 4.62648 6.098C4.41182 6.042 4.22515 5.95333 4.06648 5.832C3.91715 5.72933 3.79582 5.58467 3.70248 5.398C3.61848 5.21133 3.57648 5.00133 3.57648 4.768C3.57648 4.60933 3.59048 4.432 3.61848 4.236C3.64648 4.068 3.69782 3.858 3.77248 3.606C3.80982 3.45667 3.87515 3.22333 3.96848 2.906C4.05248 2.66333 4.13648 2.41133 4.22048 2.15L3.59048 1.912L3.28248 2.836L3.04448 3.634C3.01648 3.774 2.97915 3.97 2.93248 4.222L2.90448 4.348C2.87648 4.572 2.86248 4.79133 2.86248 5.006C2.86248 5.40733 2.91382 5.72933 3.01648 5.972C3.10982 6.23333 3.26848 6.462 3.49248 6.658C3.68848 6.826 3.94048 6.96133 4.24848 7.064C4.54715 7.148 4.88782 7.19 5.27048 7.19ZM5.64848 4.488L6.33448 3.802L5.64848 3.088L4.94848 3.802L5.64848 4.488ZM12.9285 6.56L13.6285 5.874L12.9285 5.174L12.2425 5.874L12.9285 6.56ZM6.85248 12.328C6.94582 12.328 7.02982 12.3093 7.10448 12.272C7.15115 12.2533 7.19782 12.23 7.24448 12.202L7.30048 12.16C7.38448 12.0947 7.44515 12.0293 7.48249 11.964C7.55715 11.8707 7.60848 11.796 7.63648 11.74C7.66448 11.684 7.69715 11.6 7.73449 11.488C7.76248 11.404 7.79048 11.306 7.81848 11.194C7.81848 11.1473 7.82782 11.0727 7.84648 10.97V10.928C7.85582 10.8627 7.86048 10.76 7.86048 10.62C7.86048 10.4147 7.85115 10.2653 7.83248 10.172L7.74848 9.752V9.78C7.70182 9.612 7.65515 9.486 7.60849 9.402L7.41249 9.066C7.36582 9.01 7.28648 8.926 7.17448 8.814C7.08115 8.73933 6.98782 8.674 6.89448 8.618H6.88048C6.83382 8.59 6.75915 8.55733 6.65648 8.52L6.57248 8.492C6.47915 8.47333 6.40448 8.464 6.34848 8.464L6.20848 8.45C6.15248 8.45 6.06382 8.464 5.94248 8.492L5.90048 8.506L5.71848 8.59L5.63448 8.646L5.35448 8.87L5.10248 9.136L4.62648 9.794C4.59848 9.84067 4.54248 9.91533 4.45848 10.018L4.12248 10.438C4.05715 10.5033 3.95915 10.592 3.82848 10.704C3.73515 10.7787 3.63248 10.8533 3.52048 10.928C3.40848 11.0027 3.29648 11.054 3.18448 11.082C3.07248 11.11 2.94648 11.124 2.80648 11.124H2.49848C2.38648 11.1053 2.30715 11.0867 2.26048 11.068C2.19515 11.068 2.12515 11.0447 2.05048 10.998L1.86848 10.886L1.74248 10.718C1.71448 10.6713 1.69115 10.6247 1.67248 10.578L1.65848 10.494C1.63982 10.4287 1.62115 10.34 1.60248 10.228L1.58848 9.92V5.468L0.804484 5.496V9.864C0.804484 10.1347 0.813818 10.326 0.832484 10.438C0.841818 10.578 0.865151 10.7367 0.902484 10.914L0.944484 11.04C0.991151 11.1707 1.02848 11.264 1.05648 11.32C1.13115 11.4413 1.20582 11.5393 1.28048 11.614C1.35515 11.7167 1.44848 11.796 1.56048 11.852C1.62582 11.8987 1.73315 11.95 1.88248 12.006C2.06915 12.062 2.21382 12.0947 2.31648 12.104C2.52182 12.1227 2.68515 12.132 2.80648 12.132C2.98382 12.132 3.13315 12.1133 3.25448 12.076C3.44115 12.02 3.57648 11.9687 3.66048 11.922C3.78182 11.866 3.90315 11.782 4.02448 11.67C4.15515 11.558 4.26248 11.446 4.34648 11.334C4.47715 11.446 4.57515 11.5253 4.64048 11.572C4.71515 11.6187 4.82715 11.6793 4.97648 11.754C5.08848 11.8193 5.20048 11.8753 5.31248 11.922L5.64848 12.076L5.99848 12.188L6.30648 12.272L6.65648 12.314C6.73115 12.3233 6.78715 12.328 6.82448 12.328H6.85248ZM12.9285 7.946L13.6285 7.246L12.9285 6.56L12.2425 7.246L12.9285 7.946ZM10.5345 11.11C10.4132 11.11 10.3245 11.11 10.2685 11.11C10.2218 11.1007 10.1518 11.0867 10.0585 11.068C10.0212 11.068 9.97448 11.0587 9.91848 11.04C9.86248 11.012 9.81582 10.9887 9.77848 10.97H9.80649C9.77848 10.9513 9.74582 10.9233 9.70848 10.886L9.65248 10.788L9.63848 10.676L9.61049 10.55C9.61049 10.4567 9.61982 10.382 9.63848 10.326V10.284C9.65715 10.2 9.67582 10.1347 9.69448 10.088L9.77848 9.878C9.83448 9.78467 9.87648 9.71933 9.90448 9.682C9.96048 9.60733 10.0025 9.556 10.0305 9.528L10.1985 9.402L10.3665 9.318L10.4645 9.304H10.5765C10.6698 9.304 10.7352 9.30867 10.7725 9.318L10.9545 9.402C11.0478 9.458 11.1178 9.50467 11.1645 9.542C11.2112 9.57933 11.2578 9.64 11.3045 9.724C11.3512 9.77067 11.3978 9.85467 11.4445 9.976C11.5005 10.088 11.5425 10.1907 11.5705 10.284C11.6078 10.396 11.6358 10.5173 11.6545 10.648L11.6965 11.068C11.4725 11.0867 11.2905 11.1007 11.1505 11.11C11.0198 11.11 10.8145 11.11 10.5345 11.11ZM5.28448 10.914L5.31248 10.928C5.23782 10.8907 5.15848 10.844 5.07448 10.788L4.97648 10.718L4.87848 10.634L4.94848 10.522L5.17248 10.2C5.24715 10.088 5.30315 10.0087 5.34048 9.962L5.49448 9.78C5.53182 9.724 5.58782 9.65867 5.66248 9.584L5.80248 9.458C5.87715 9.41133 5.93782 9.37867 5.98448 9.36C6.03115 9.34133 6.08248 9.332 6.13848 9.332C6.16648 9.332 6.20382 9.33667 6.25048 9.346L6.30648 9.36L6.47448 9.416C6.54915 9.472 6.59582 9.50933 6.61448 9.528C6.64248 9.54667 6.67982 9.57467 6.72648 9.612L6.78248 9.668C6.81048 9.70533 6.85248 9.77067 6.90848 9.864C6.94582 9.92 6.97848 9.99467 7.00648 10.088L7.09048 10.368C7.09982 10.4333 7.10448 10.536 7.10448 10.676L7.09048 10.886C7.09048 10.97 7.08582 11.0307 7.07648 11.068H7.06248C7.06248 11.124 7.04848 11.18 7.02048 11.236L6.95048 11.404L6.64248 11.362L6.34848 11.306L6.39048 11.32C6.18515 11.2733 5.99382 11.2173 5.81648 11.152C5.75115 11.1333 5.65782 11.096 5.53648 11.04L5.28448 10.914ZM15.2805 7.946L14.4265 8.114L14.5245 8.702C14.5618 8.954 14.5852 9.15933 14.5945 9.318C14.6132 9.46733 14.6318 9.69133 14.6505 9.99C14.6692 10.2047 14.6692 10.4333 14.6505 10.676L14.3565 10.83C14.3192 10.8487 14.2632 10.8673 14.1885 10.886L14.0905 10.914L13.9785 10.956L13.5725 11.012L13.1385 11.04H12.4525C12.4525 10.844 12.4385 10.6527 12.4105 10.466C12.3825 10.27 12.3405 10.088 12.2845 9.92L12.2985 9.948L12.1305 9.514C12.0372 9.32733 11.9625 9.192 11.9065 9.108V9.122C11.8318 9.00067 11.7525 8.898 11.6685 8.814C11.5378 8.702 11.4352 8.62267 11.3605 8.576H11.3465C11.2252 8.51067 11.1085 8.46867 10.9965 8.45C10.8938 8.422 10.7725 8.408 10.6325 8.408H10.6045C10.5018 8.408 10.4038 8.422 10.3105 8.45C10.2172 8.478 10.1145 8.52467 10.0025 8.59C9.89048 8.646 9.79248 8.71133 9.70848 8.786C9.59648 8.898 9.51715 8.98667 9.47048 9.052C9.39582 9.15467 9.32115 9.26667 9.24648 9.388C9.18115 9.50933 9.12515 9.64 9.07848 9.78V9.794C9.02248 9.91533 8.98048 10.0553 8.95248 10.214C8.93382 10.4193 8.92448 10.5733 8.92448 10.676C8.92448 10.8347 8.93382 10.9513 8.95248 11.026C8.97115 11.1567 9.00382 11.2593 9.05048 11.334C9.05982 11.418 9.09715 11.4973 9.16249 11.572L9.24648 11.67L9.34448 11.754C9.41915 11.81 9.49382 11.8567 9.56848 11.894C9.65248 11.9313 9.74115 11.9547 9.83448 11.964L10.1285 12.006C10.2032 12.0153 10.3152 12.02 10.4645 12.02H11.1365C11.3978 12.0013 11.5892 11.9827 11.7105 11.964L11.6685 11.992L11.6405 12.076V12.202L11.6265 12.23C11.5238 12.3887 11.3885 12.5473 11.2205 12.706C11.0525 12.8553 10.8938 12.9813 10.7445 13.084L10.7305 13.098C10.6372 13.154 10.5625 13.196 10.5065 13.224C10.3945 13.28 10.3105 13.3173 10.2545 13.336H10.2405C10.1565 13.3827 10.0818 13.4107 10.0165 13.42L9.82048 13.434C9.74582 13.434 9.68515 13.4293 9.63848 13.42C9.60115 13.42 9.54048 13.4107 9.45648 13.392H9.41449C9.31182 13.3827 9.19048 13.3593 9.05048 13.322C8.92915 13.294 8.82182 13.252 8.72848 13.196L8.74248 13.224L8.50448 13.784C8.60715 13.84 8.75648 13.9053 8.95248 13.98L9.05048 14.022L9.48449 14.176L9.55449 14.19C9.67582 14.218 9.76915 14.2367 9.83448 14.246L9.90448 14.26C9.99782 14.2693 10.0678 14.274 10.1145 14.274C10.1612 14.274 10.2405 14.2647 10.3525 14.246L10.6605 14.134C10.7538 14.0967 10.8612 14.0407 10.9825 13.966C11.1318 13.8727 11.2485 13.7933 11.3325 13.728C11.4818 13.5973 11.5938 13.4947 11.6685 13.42C11.7712 13.2987 11.8738 13.168 11.9765 13.028C12.0792 12.8973 12.1678 12.7433 12.2425 12.566C12.3172 12.3793 12.3685 12.202 12.3965 12.034V12.02H13.1385C13.3718 12.02 13.5398 12.0107 13.6425 11.992C13.7732 11.9827 13.9225 11.9593 14.0905 11.922C14.2678 11.8847 14.4032 11.8473 14.4965 11.81C14.5898 11.7727 14.6878 11.7213 14.7905 11.656C14.9305 11.572 15.0332 11.4833 15.0985 11.39C15.2105 11.2407 15.2852 11.1193 15.3225 11.026C15.3878 10.8767 15.4298 10.7367 15.4485 10.606C15.4765 10.466 15.4905 10.3167 15.4905 10.158C15.4905 9.71933 15.4718 9.332 15.4345 8.996C15.3972 8.688 15.3645 8.44067 15.3365 8.254L15.2805 7.946Z"
                          fill={pollution}
                        />
                      </svg>
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            <div
              className="d-flex justify-content-between align-items-center py-4"
              style={{ color: coal }}
            >
              <div style={{ fontSize: 13, fontWeight: 600 }}>
                The amount payable
              </div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>
                <div>
                  <span className="pl-1">
                    {priceFormatter(order.should_pay)}
                  </span>
                  <span>
                    <svg
                      style={{ strokeWidth: 20 }}
                      width="21"
                      height="18"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.27048 7.19C5.42915 7.19 5.54582 7.18533 5.62048 7.176C5.78848 7.15733 5.91448 7.13867 5.99848 7.12C6.14782 7.10133 6.27382 7.08267 6.37648 7.064L6.54448 7.008L6.71248 6.966L6.82448 6.924C6.88048 6.90533 6.93182 6.88667 6.97848 6.868C7.03448 6.84933 7.10915 6.82133 7.20248 6.784L7.51048 6.63L7.72048 6.504H7.70648C7.78115 6.46667 7.85115 6.41533 7.91648 6.35L7.97248 6.294C8.01915 6.238 8.04715 6.196 8.05648 6.168C8.10315 6.10267 8.14982 6.028 8.19649 5.944C8.22448 5.89733 8.25715 5.82733 8.29448 5.734C8.30382 5.68733 8.32715 5.608 8.36448 5.496C8.38315 5.40267 8.39249 5.31867 8.39249 5.244L8.40648 5.216C8.42515 5.104 8.43448 5.02 8.43448 4.964L8.42048 4.264C8.42048 4.16133 8.41115 4.00733 8.39249 3.802C8.37382 3.56867 8.35515 3.39133 8.33648 3.27L8.26648 2.78L8.29448 2.85L8.11248 1.814C8.06582 1.57133 8.00048 1.27733 7.91648 0.931999L7.95848 1.128L7.13248 1.324C7.13248 1.38 7.14648 1.47333 7.17448 1.604L7.27248 2.08C7.33782 2.36 7.38915 2.63533 7.42648 2.906L7.56648 3.83V3.942C7.59449 4.09133 7.60849 4.24533 7.60849 4.404C7.61782 4.49733 7.62248 4.63267 7.62248 4.81V5.244L7.58048 5.426L7.55248 5.594L7.18848 5.804L7.09048 5.832C7.03448 5.86 6.95048 5.89267 6.83848 5.93L6.55848 6.014C6.50248 6.02333 6.40915 6.04667 6.27848 6.084C6.22248 6.10267 6.12915 6.12133 5.99848 6.14H5.97048C5.90515 6.14 5.80715 6.14933 5.67648 6.168C5.61115 6.17733 5.50848 6.182 5.36848 6.182C5.09782 6.182 4.85048 6.154 4.62648 6.098C4.41182 6.042 4.22515 5.95333 4.06648 5.832C3.91715 5.72933 3.79582 5.58467 3.70248 5.398C3.61848 5.21133 3.57648 5.00133 3.57648 4.768C3.57648 4.60933 3.59048 4.432 3.61848 4.236C3.64648 4.068 3.69782 3.858 3.77248 3.606C3.80982 3.45667 3.87515 3.22333 3.96848 2.906C4.05248 2.66333 4.13648 2.41133 4.22048 2.15L3.59048 1.912L3.28248 2.836L3.04448 3.634C3.01648 3.774 2.97915 3.97 2.93248 4.222L2.90448 4.348C2.87648 4.572 2.86248 4.79133 2.86248 5.006C2.86248 5.40733 2.91382 5.72933 3.01648 5.972C3.10982 6.23333 3.26848 6.462 3.49248 6.658C3.68848 6.826 3.94048 6.96133 4.24848 7.064C4.54715 7.148 4.88782 7.19 5.27048 7.19ZM5.64848 4.488L6.33448 3.802L5.64848 3.088L4.94848 3.802L5.64848 4.488ZM12.9285 6.56L13.6285 5.874L12.9285 5.174L12.2425 5.874L12.9285 6.56ZM6.85248 12.328C6.94582 12.328 7.02982 12.3093 7.10448 12.272C7.15115 12.2533 7.19782 12.23 7.24448 12.202L7.30048 12.16C7.38448 12.0947 7.44515 12.0293 7.48249 11.964C7.55715 11.8707 7.60848 11.796 7.63648 11.74C7.66448 11.684 7.69715 11.6 7.73449 11.488C7.76248 11.404 7.79048 11.306 7.81848 11.194C7.81848 11.1473 7.82782 11.0727 7.84648 10.97V10.928C7.85582 10.8627 7.86048 10.76 7.86048 10.62C7.86048 10.4147 7.85115 10.2653 7.83248 10.172L7.74848 9.752V9.78C7.70182 9.612 7.65515 9.486 7.60849 9.402L7.41249 9.066C7.36582 9.01 7.28648 8.926 7.17448 8.814C7.08115 8.73933 6.98782 8.674 6.89448 8.618H6.88048C6.83382 8.59 6.75915 8.55733 6.65648 8.52L6.57248 8.492C6.47915 8.47333 6.40448 8.464 6.34848 8.464L6.20848 8.45C6.15248 8.45 6.06382 8.464 5.94248 8.492L5.90048 8.506L5.71848 8.59L5.63448 8.646L5.35448 8.87L5.10248 9.136L4.62648 9.794C4.59848 9.84067 4.54248 9.91533 4.45848 10.018L4.12248 10.438C4.05715 10.5033 3.95915 10.592 3.82848 10.704C3.73515 10.7787 3.63248 10.8533 3.52048 10.928C3.40848 11.0027 3.29648 11.054 3.18448 11.082C3.07248 11.11 2.94648 11.124 2.80648 11.124H2.49848C2.38648 11.1053 2.30715 11.0867 2.26048 11.068C2.19515 11.068 2.12515 11.0447 2.05048 10.998L1.86848 10.886L1.74248 10.718C1.71448 10.6713 1.69115 10.6247 1.67248 10.578L1.65848 10.494C1.63982 10.4287 1.62115 10.34 1.60248 10.228L1.58848 9.92V5.468L0.804484 5.496V9.864C0.804484 10.1347 0.813818 10.326 0.832484 10.438C0.841818 10.578 0.865151 10.7367 0.902484 10.914L0.944484 11.04C0.991151 11.1707 1.02848 11.264 1.05648 11.32C1.13115 11.4413 1.20582 11.5393 1.28048 11.614C1.35515 11.7167 1.44848 11.796 1.56048 11.852C1.62582 11.8987 1.73315 11.95 1.88248 12.006C2.06915 12.062 2.21382 12.0947 2.31648 12.104C2.52182 12.1227 2.68515 12.132 2.80648 12.132C2.98382 12.132 3.13315 12.1133 3.25448 12.076C3.44115 12.02 3.57648 11.9687 3.66048 11.922C3.78182 11.866 3.90315 11.782 4.02448 11.67C4.15515 11.558 4.26248 11.446 4.34648 11.334C4.47715 11.446 4.57515 11.5253 4.64048 11.572C4.71515 11.6187 4.82715 11.6793 4.97648 11.754C5.08848 11.8193 5.20048 11.8753 5.31248 11.922L5.64848 12.076L5.99848 12.188L6.30648 12.272L6.65648 12.314C6.73115 12.3233 6.78715 12.328 6.82448 12.328H6.85248ZM12.9285 7.946L13.6285 7.246L12.9285 6.56L12.2425 7.246L12.9285 7.946ZM10.5345 11.11C10.4132 11.11 10.3245 11.11 10.2685 11.11C10.2218 11.1007 10.1518 11.0867 10.0585 11.068C10.0212 11.068 9.97448 11.0587 9.91848 11.04C9.86248 11.012 9.81582 10.9887 9.77848 10.97H9.80649C9.77848 10.9513 9.74582 10.9233 9.70848 10.886L9.65248 10.788L9.63848 10.676L9.61049 10.55C9.61049 10.4567 9.61982 10.382 9.63848 10.326V10.284C9.65715 10.2 9.67582 10.1347 9.69448 10.088L9.77848 9.878C9.83448 9.78467 9.87648 9.71933 9.90448 9.682C9.96048 9.60733 10.0025 9.556 10.0305 9.528L10.1985 9.402L10.3665 9.318L10.4645 9.304H10.5765C10.6698 9.304 10.7352 9.30867 10.7725 9.318L10.9545 9.402C11.0478 9.458 11.1178 9.50467 11.1645 9.542C11.2112 9.57933 11.2578 9.64 11.3045 9.724C11.3512 9.77067 11.3978 9.85467 11.4445 9.976C11.5005 10.088 11.5425 10.1907 11.5705 10.284C11.6078 10.396 11.6358 10.5173 11.6545 10.648L11.6965 11.068C11.4725 11.0867 11.2905 11.1007 11.1505 11.11C11.0198 11.11 10.8145 11.11 10.5345 11.11ZM5.28448 10.914L5.31248 10.928C5.23782 10.8907 5.15848 10.844 5.07448 10.788L4.97648 10.718L4.87848 10.634L4.94848 10.522L5.17248 10.2C5.24715 10.088 5.30315 10.0087 5.34048 9.962L5.49448 9.78C5.53182 9.724 5.58782 9.65867 5.66248 9.584L5.80248 9.458C5.87715 9.41133 5.93782 9.37867 5.98448 9.36C6.03115 9.34133 6.08248 9.332 6.13848 9.332C6.16648 9.332 6.20382 9.33667 6.25048 9.346L6.30648 9.36L6.47448 9.416C6.54915 9.472 6.59582 9.50933 6.61448 9.528C6.64248 9.54667 6.67982 9.57467 6.72648 9.612L6.78248 9.668C6.81048 9.70533 6.85248 9.77067 6.90848 9.864C6.94582 9.92 6.97848 9.99467 7.00648 10.088L7.09048 10.368C7.09982 10.4333 7.10448 10.536 7.10448 10.676L7.09048 10.886C7.09048 10.97 7.08582 11.0307 7.07648 11.068H7.06248C7.06248 11.124 7.04848 11.18 7.02048 11.236L6.95048 11.404L6.64248 11.362L6.34848 11.306L6.39048 11.32C6.18515 11.2733 5.99382 11.2173 5.81648 11.152C5.75115 11.1333 5.65782 11.096 5.53648 11.04L5.28448 10.914ZM15.2805 7.946L14.4265 8.114L14.5245 8.702C14.5618 8.954 14.5852 9.15933 14.5945 9.318C14.6132 9.46733 14.6318 9.69133 14.6505 9.99C14.6692 10.2047 14.6692 10.4333 14.6505 10.676L14.3565 10.83C14.3192 10.8487 14.2632 10.8673 14.1885 10.886L14.0905 10.914L13.9785 10.956L13.5725 11.012L13.1385 11.04H12.4525C12.4525 10.844 12.4385 10.6527 12.4105 10.466C12.3825 10.27 12.3405 10.088 12.2845 9.92L12.2985 9.948L12.1305 9.514C12.0372 9.32733 11.9625 9.192 11.9065 9.108V9.122C11.8318 9.00067 11.7525 8.898 11.6685 8.814C11.5378 8.702 11.4352 8.62267 11.3605 8.576H11.3465C11.2252 8.51067 11.1085 8.46867 10.9965 8.45C10.8938 8.422 10.7725 8.408 10.6325 8.408H10.6045C10.5018 8.408 10.4038 8.422 10.3105 8.45C10.2172 8.478 10.1145 8.52467 10.0025 8.59C9.89048 8.646 9.79248 8.71133 9.70848 8.786C9.59648 8.898 9.51715 8.98667 9.47048 9.052C9.39582 9.15467 9.32115 9.26667 9.24648 9.388C9.18115 9.50933 9.12515 9.64 9.07848 9.78V9.794C9.02248 9.91533 8.98048 10.0553 8.95248 10.214C8.93382 10.4193 8.92448 10.5733 8.92448 10.676C8.92448 10.8347 8.93382 10.9513 8.95248 11.026C8.97115 11.1567 9.00382 11.2593 9.05048 11.334C9.05982 11.418 9.09715 11.4973 9.16249 11.572L9.24648 11.67L9.34448 11.754C9.41915 11.81 9.49382 11.8567 9.56848 11.894C9.65248 11.9313 9.74115 11.9547 9.83448 11.964L10.1285 12.006C10.2032 12.0153 10.3152 12.02 10.4645 12.02H11.1365C11.3978 12.0013 11.5892 11.9827 11.7105 11.964L11.6685 11.992L11.6405 12.076V12.202L11.6265 12.23C11.5238 12.3887 11.3885 12.5473 11.2205 12.706C11.0525 12.8553 10.8938 12.9813 10.7445 13.084L10.7305 13.098C10.6372 13.154 10.5625 13.196 10.5065 13.224C10.3945 13.28 10.3105 13.3173 10.2545 13.336H10.2405C10.1565 13.3827 10.0818 13.4107 10.0165 13.42L9.82048 13.434C9.74582 13.434 9.68515 13.4293 9.63848 13.42C9.60115 13.42 9.54048 13.4107 9.45648 13.392H9.41449C9.31182 13.3827 9.19048 13.3593 9.05048 13.322C8.92915 13.294 8.82182 13.252 8.72848 13.196L8.74248 13.224L8.50448 13.784C8.60715 13.84 8.75648 13.9053 8.95248 13.98L9.05048 14.022L9.48449 14.176L9.55449 14.19C9.67582 14.218 9.76915 14.2367 9.83448 14.246L9.90448 14.26C9.99782 14.2693 10.0678 14.274 10.1145 14.274C10.1612 14.274 10.2405 14.2647 10.3525 14.246L10.6605 14.134C10.7538 14.0967 10.8612 14.0407 10.9825 13.966C11.1318 13.8727 11.2485 13.7933 11.3325 13.728C11.4818 13.5973 11.5938 13.4947 11.6685 13.42C11.7712 13.2987 11.8738 13.168 11.9765 13.028C12.0792 12.8973 12.1678 12.7433 12.2425 12.566C12.3172 12.3793 12.3685 12.202 12.3965 12.034V12.02H13.1385C13.3718 12.02 13.5398 12.0107 13.6425 11.992C13.7732 11.9827 13.9225 11.9593 14.0905 11.922C14.2678 11.8847 14.4032 11.8473 14.4965 11.81C14.5898 11.7727 14.6878 11.7213 14.7905 11.656C14.9305 11.572 15.0332 11.4833 15.0985 11.39C15.2105 11.2407 15.2852 11.1193 15.3225 11.026C15.3878 10.8767 15.4298 10.7367 15.4485 10.606C15.4765 10.466 15.4905 10.3167 15.4905 10.158C15.4905 9.71933 15.4718 9.332 15.4345 8.996C15.3972 8.688 15.3645 8.44067 15.3365 8.254L15.2805 7.946Z"
                        fill={coal}
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center pb-2">
              <div style={{ fontSize: 12, color: night }}>
                Tracking Code:{" "}
                <span>{englishNumberToPersianNumber(order.order_id)}</span>
              </div>
              <div>
                {isPaidPriceOnLocation || isPaidPriceOnLocation === null ? (
                  <div
                    style={{
                      background: paymentTypes.pos.backgroundColor,
                      borderRadius: 100,
                      width: "fit-content",
                      padding: "3px 8px",
                    }}
                    className="d-flex align-items-center"
                  >
                    <div
                      className="ml-1 d-flex justify-content-center align-items-end"
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "100%",
                        border: `2px solid ${paymentTypes.pos.iconColor}`,
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: paymentTypes.pos.iconProgress,
                          backgroundColor: paymentTypes.pos.iconColor,
                        }}
                      ></div>
                    </div>
                    <div style={{ fontSize: 12 }}>{paymentTypes.pos.label}</div>
                  </div>
                ) : (
                  order.paid_price_details &&
                  Object?.entries?.(order.paid_price_details)?.map?.(
                    ([key, value]) => {
                      if (!value) return;
                      return (
                        <div
                          key={key}
                          style={{
                            background: paymentTypes[key].backgroundColor,
                            borderRadius: 100,
                            width: "fit-content",
                            padding: "3px 8px",
                          }}
                          className="d-flex align-items-center"
                        >
                          <div
                            className="ml-1 d-flex justify-content-center align-items-end"
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "100%",
                              border: `2px solid ${paymentTypes[key].iconColor}`,
                            }}
                          >
                            <div
                              style={{
                                width: "100%",
                                height: paymentTypes[key].iconProgress,
                                backgroundColor: paymentTypes[key].iconColor,
                              }}
                            ></div>
                          </div>
                          <div style={{ fontSize: 12 }}>
                            {paymentTypes[key].label}
                          </div>
                        </div>
                      );
                    }
                  )
                )}
              </div>
            </div>
          </Paper>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  userOrder: makeSelectUserOrder(),
  themeColor: makeSelectBusinessThemeColor(),
  businessPhone: makeSelectBusinessPhone(),
  businessTitle: makeSelectBusinessTitle(),
  business: makeSelectBusiness(),
  isLoading: makeSelectLoading(),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  authorization: makeSelectAuthorization(),
});

function mapDispatchToProps(dispatch) {
  return {
    _fetchOrder: (data) => dispatch(getOrder(data)),
    emptyOrders: () => dispatch(emptyCart()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(OrderStatus);
