import React, { memo } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { useRouter } from "next/router";
import { pollution } from "@saas/utils/colors";
import {
  makeSelectBusinessPhone,
  makeSelectBusinessThemeColor,
  makeSelectBusinessTitle,
} from "@saas/stores/business/selector";
import { makeSelectTransaction } from "@saas/stores/transaction/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { orderPayment } from "@saas/stores/transaction/actions";
import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
import useTheme from "@material-ui/core/styles/useTheme";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
function PaymentFailure({ retry,  transaction, urlPrefix }) {
  const router = useRouter();
  const error = [
    "Unfortunately an error occurred in order registration.",
    "Finalization of the order was canceled by you.",
  ];
  const message = [
    "If you have been deducted from your account, your account will be returned within 4 hours.",
    "Adding goods to the shopping cart does not mean booking goods and\n Paying process is required for final order registration",
  ];
  const theme = useTheme();
  const {minWidth768} = useResponsive()


  return (
    <div style={{ backgroundColor: "#F6F6F7" }}>
      <div
        style={{
          width: `${minWidth768 ? "70%" : ""}`,
        }}
        className="container py-5"
      >
        <Paper>
          <div
            style={{ minHeight: `${minWidth768 ? "500px" : "440px"}` }}
            className="d-flex px-3 flex-column justify-content-center align-items-center"
          >
            <div
              style={{
                backgroundColor: theme.palette.error.main,
                borderRadius: "50%",
                padding: 12,
                marginTop: `${minWidth768 ? "48px" : "28px"}`,
              }}
              className="d-flex"
            >
              <ClearRoundedIcon style={{ color: "#ffffff" }} />
            </div>
            <h1
              style={{
                fontWeight: 600,
                fontSize: 16,
                textAlign: "center",
                marginTop: `${minWidth768 ? "32px" : "21px"}`,
              }}
            >
              {error[0]}
            </h1>
            <div
              style={{
                color: pollution,
                fontSize: `${minWidth768 ? "14px" : "13px"}`,
                fontWeight: 400,
                textAlign: "center",
                marginTop: `${minWidth768 ? "16px" : "14px"}`,
              }}
              className="mb-auto"
            >
              {message[0]}
            </div>
            <Button
              style={{
                marginBottom: `${minWidth768 ? "19px" : "18px"}`,
                fontSize: 14,
                fontWeight: 800,
                width: `${minWidth768 ? "60%" : "100%"}`,
                padding: "14px 0",
              }}
              variant="contained"
              color="secondary"
              onClick={() =>
                retry(transaction.order_id, { plugin: transaction.plugin })
              }
            >
              Re -pay attempt
            </Button>
            <div
              className="d-flex align-items-center justify-content-between mb-4"
              style={{
                width: `${minWidth768 ? "60%" : "100%"}`,
              }}
            >
              <div
                style={{
                  flex: 1,
                }}
                className="d-flex justify-content-end"
              >
                <Button
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                  }}
                  color="secondary"
                  className="px-2"
                  onClick={() => router.push(`${urlPrefix}/checkout/cart`)}
                >
                  Edit the cart item
                </Button>
              </div>
              <div
                style={{
                  height: 16,
                  width: 1,
                  backgroundColor: theme.palette.secondary.main,
                }}
              ></div>
              <div
                style={{
                  flex: 1,
                }}
                className="d-flex justify-content-start"
              >
                <Button
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                  }}
                  className="px-2"
                  color="secondary"
                  onClick={() => router.push(`${urlPrefix}/s`)}
                >
                  Product Page
                </Button>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  themeColor: makeSelectBusinessThemeColor(),
  businessTitle: makeSelectBusinessTitle(),
  businessPhone: makeSelectBusinessPhone(),
  transaction: makeSelectTransaction(),
  loading: makeSelectLoading(),
  urlPrefix: makeSelectUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    retry: (id, data) => dispatch(orderPayment(id, data)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(PaymentFailure);
