import React, { memo, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { pollution, graphite, white } from "@saas/utils/colors";
import { getCountDown } from "@saas/utils/helpers/getCountDown";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { deliveryTimeFormatter } from "@saas/utils/helpers/deliveryTimeFormatter";
import { deliveryIntervalFormatter } from "@saas/utils/helpers/deliveryIntervalFormatter";

import { useRouter } from "next/router";
import {
  SHOPPING_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import {
  makeSelectBusinessPhone,
  makeSelectBusinessThemeColor,
  makeSelectBusinessTitle,
  makeSelectBusinessWorkingHours,
} from "@saas/stores/business/selector";
import { makeSelectTransaction } from "@saas/stores/transaction/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import {
  makeSelectPlugin,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import useTheme from "@material-ui/core/styles/useTheme";
import { makeSelectUserOrder } from "@saas/plugins/Shopping/selectors";
import { getOrder } from "@saas/plugins/Shopping/actions";
import { CANCELLED } from "@saas/plugins/Shopping/constants";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const DELIVERY_TIME = "delivery_time";
const DELIVERY_INTERVAL = "delivery_interval";

function SuccessPayment({
  themeColor,
  transaction,
  urlPrefix,
  _fetchOrder,
  userOrder: order,
  loading,
}) {
  const {minWidth768} = useResponsive()
  const { order_id: orderID } = transaction;
  const router = useRouter();
  const [timer, setTimer] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const deliveryTime = order?.delivery_time || 60 * 60;
  const absoluteDeliveryTime = order?.absolute_delivery_time;
  const deliveryInterval = order?.delivery_interval;
  const theme = useTheme();
  useEffect(() => {
    setTimeout(() => {
      _fetchOrder({ id: orderID });
    }, 0);
  }, []);

  useEffect(() => {
    let id;
    if (order && deliveryTime) {
      clearInterval(intervalId);
      id = setInterval(() => {
        if (order.submitted_at) {
          const timePast = (new Date() - order.submitted_at) / 1000;
          if (Math.round(timePast) % 60 === 0)
            _fetchOrder({ id: router.query.id });

          setTimer(getCountDown(deliveryTime - timePast));
        }
      }, 1000);
      setIntervalId(id);
    }

    return () => clearInterval(id);
  }, [order && order.id]);
  useEffect(() => {
    setTimeout(() => {
      router.push(
        `${urlPrefix}/${SHOPPING_PLUGIN_URL}/orders/${orderID}/status`
      );
    }, 5000);
  }, [Boolean(order && order.id)]);

  const deliveryTimeOptions = {
    [DELIVERY_TIME]: deliveryTime
      ? deliveryTime > 10800
        ? deliveryTimeFormatter(absoluteDeliveryTime)
        : englishNumberToPersianNumber(timer)
      : null,
    [DELIVERY_INTERVAL]: deliveryInterval
      ? deliveryIntervalFormatter(deliveryInterval)
      : null,
  };

  const finalDeliveryTime = Object.values(deliveryTimeOptions).find((value) =>
    Boolean(value)
  );
  const timePast = order ? (new Date() - order.submitted_at) / 1000 : 0;
  const isWaitingForTimer = order && deliveryTime - timePast > 0;

  return (
    <div>
      <div className="container py-5">
        <Paper>
          <div className="d-flex px-3 flex-column justify-content-center align-items-center">
            <div
              style={{
                backgroundColor: themeColor,
                borderRadius: "50%",
                padding: 12,
                marginTop: `${minWidth768 ? "48px" : "28px"}`,
              }}
              className="d-flex"
            >
              <CheckRoundedIcon style={{ color: "#ffffff" }} />
            </div>
            <h1
              style={{
                fontWeight: 600,
                fontSize: 16,
                textAlign: "center",
                marginTop: `${minWidth768 ? "32px" : "20px"}`,
              }}
            >
              Your order has been registered and is being reviewed.
            </h1>
            <div
              style={{
                color: pollution,
                fontSize: `${minWidth768 ? "14px" : "13px"}`,
                fontWeight: 400,
                textAlign: "center",
                marginTop: `${minWidth768 ? "16px" : "19px"}`,
              }}
            >
              Order status for you will tex.
            </div>
            {loading || (!timer && isWaitingForTimer) ? (
              <LoadingIndicator />
            ) : finalDeliveryTime ? (
              <div
                style={{
                  border: "1px solid #EDEDED",
                  borderRadius: 8,
                  height: "80px",
                  marginTop: `${minWidth768 ? "34px" : "51px"}`,
                  width: `${minWidth768 ? "60%" : "100%"}`,
                }}
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <p
                  style={{
                    fontSize: `${minWidth768 ? "15px" : "12px"}`,
                    fontWeight: "normal",
                    textAlign: "center",
                    color: graphite,
                    paddingBottom: `${minWidth768 ? "13px" : "8px"}`,
                  }}
                  className="pb-2"
                >
                  Delivery time
                </p>
                {order && order.order_status !== CANCELLED && (
                  <div
                    style={{
                      fontSize: 15,
                      textAlign: "center",
                    }}
                  >
                    {finalDeliveryTime}
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-3">
                {" "}
                It is expected that the desired customer is expected to be selected by your hand
                Reached. Otherwise please contact support.
              </div>
            )}
            <div
              className="my-3"
              style={{ color: theme.palette.secondary.main }}
            >
              You will be transferred to the order tracking page for another 5 seconds.
            </div>
            <Button
              style={{
                color: white,
                marginTop: `${minWidth768 ? "62px" : "36px"}`,
                fontSize: 14,
                fontWeight: 800,
                width: `${minWidth768 ? "60%" : "100%"}`,
                padding: "14px 0",
              }}
              color="secondary"
              variant="contained"
              onClick={() =>
                router.push(
                  `${urlPrefix}/${SHOPPING_PLUGIN_URL}/orders/${orderID}/status`
                )
              }
            >
              Tracking order
            </Button>
            <Button
              className="my-1"
              style={{
                fontSize: 14,
                fontWeight: 800,
                width: `${minWidth768 ? "60%" : "100%"}`,
                padding: "14px 0",
              }}
              color="secondary"
              onClick={() => router.push(`${urlPrefix}/${SHOPPING_PLUGIN_URL}`)}
            >
              Product Page
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  userOrder: makeSelectUserOrder(),
  themeColor: makeSelectBusinessThemeColor(),
  businessTitle: makeSelectBusinessTitle(),
  businessPhone: makeSelectBusinessPhone(),
  transaction: makeSelectTransaction(),
  loading: makeSelectLoading(),
  urlPrefix: makeSelectUrlPrefix(),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  workingHours: makeSelectBusinessWorkingHours(),
});

function mapDispatchToProps(dispatch) {
  return {
    _fetchOrder: (data) => dispatch(getOrder(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(SuccessPayment);
