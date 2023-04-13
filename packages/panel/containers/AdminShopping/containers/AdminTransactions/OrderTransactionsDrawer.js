import React, { memo, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Drawer from "@material-ui/core/Drawer";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { createStructuredSelector } from "reselect";
import {
  makeSelectOrderTransactions,
  makeSelectPOSDevice,
  makeSelectShoppingAdminOrder,
} from "store/selectors";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  getOrderTransactions,
  getPosDevice,
  getShoppingAdminOrder,
} from "store/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import { border, dust, jungleI, strawberryII } from "@saas/utils/colors";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { getMonthName } from "@saas/utils/helpers/getMonthName";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

import moment from "moment";
import { makeSelectBranches } from "@saas/stores/business/selector";
import { orderStatus } from "@saas/plugins/Shopping/containers/Orders";
import { paymentTypeOptions } from "store/constants";
import useTheme from "@material-ui/core/styles/useTheme";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Chip from "@material-ui/core/Chip";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

const OrderTransactionsDrawer = ({
  _getAdminOrder,
  transaction,
  branches,
  isOpen,
  onClose,
  adminOrder,
  loading,
  transactions,
  _getOrderTransactions,
  _getPosDevice,
  adminDevice,
  salesChannels,
}) => {
  const salesChannel = Object.keys(salesChannels).find(
    (id) => id == adminOrder?.sales_channel_id
  );
  const theme = useTheme();
  const order = transaction?.order_id;
  useEffect(() => {
    if (isOpen && order) {
      _getAdminOrder(order);
      _getOrderTransactions(order);
    }
  }, [isOpen, order]);
  useEffect(() => {
    if (adminOrder.pos_device_id) _getPosDevice(adminOrder.pos_device_id);
  }, [adminOrder.pos_device_id]);
  const { maxWidth768 } = useResponsive();
  const branch = branches.find((b) => b.id === adminOrder.business_id);
  const totalTransactionAmount = transactions.reduce((a, t) => a + t.amount, 0);
  const date = new Date(adminOrder.submitted_at);
  const submittedAt = moment(adminOrder.submitted_at);
  return (
    <>
      <Drawer
        anchor={maxWidth768 ? "bottom" : "left"}
        PaperProps={{
          className: "col-md-5 col-12 px-0",
          style: {
            pointerEvents: "auto",
            boxShadow: "0 0 4px rgba(0,0,0,0.1),0 1px 2px rgba(0,0,0,0.1)",
            height: maxWidth768 ? "60vh" : "",
          },
        }}
        BackdropProps={{
          style: { background: "transparent" },
        }}
        style={{ pointerEvents: "none" }}
        open={isOpen}
        onClose={onClose}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            borderBottom: `1px solid ${border.subdued}`,
          }}
          className="p-2 d-flex justify-content-between align-items-center"
        >
          <div className="u-fontLarge u-fontWeightBold  justify-self-center">
            Transaction details
          </div>
          <IconButton size="small" onClick={onClose}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </div>
        <div
          className="w-100 position-relative h-100 d-flex flex-column"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="p-3 flex-1">
            {loading ? (
              <LoadingIndicator />
            ) : (
              <>
                <Paper className="p-3 mt-2">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>user name:</div>
                    <div>{adminOrder?.user_name}</div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>User phone number:</div>
                    <div>
                      {englishNumberToPersianNumber(adminOrder?.user_phone)}
                    </div>
                  </div>
                </Paper>
                <Paper className="p-3 mt-2">
                  <div className="u-fontWeightBold mt-2 mb-3 u-fontLarge">
                    {priceFormatter(totalTransactionAmount)} ${" "}
                    <Chip
                      style={{
                        color:
                          transaction.status === 0 ? jungleI : strawberryII,
                        backgroundColor:
                          transaction.status === 0
                            ? "rgba(0, 200, 151, 0.12)"
                            : "rgba(255, 0, 56, 0.16)",
                        left: 20,
                      }}
                      label={transaction.status === 0 ? "Successful" : "Failed"}
                      variant="default"
                      className="position-absolute m-1 px-1 u-text-ellipse"
                    />
                  </div>
                  {adminOrder.submitted_at ? (
                    <div
                      style={{ color: theme.palette.text.disabled }}
                      className="mt-2 mb-4"
                    >
                      {englishNumberToPersianNumber(
                        `${submittedAt.date()} ${getMonthName(
                          submittedAt.month() + 1
                        )} ${submittedAt.year()} - ${`0${date.getHours()}`.slice(
                          -2
                        )}:${`0${date.getMinutes()}`.slice(-2)}`
                      )}
                    </div>
                  ) : null}
                  {branch ? (
                    <div className="d-flex align-items-center my-1">
                      <div className="ml-1">Branch:</div>
                      <div style={{ color: theme.palette.text.disabled }}>
                        {branch.title}
                      </div>
                    </div>
                  ) : null}
                  {salesChannels[salesChannel]?.name ? (
                    <div className="d-flex align-items-center my-1">
                      <div className="ml-1">Sales Channel:</div>
                      <div style={{ color: theme.palette.text.disabled }}>
                        {salesChannels[salesChannel]?.name}
                      </div>
                    </div>
                  ) : null}
                  {adminOrder.pos_device_id && adminDevice ? (
                    <div className="d-flex align-items-center my-1">
                      <div className="ml-1">The device:</div>
                      <div style={{ color: theme.palette.text.disabled }}>
                        {adminDevice.name}
                      </div>
                    </div>
                  ) : null}
                </Paper>
                <Paper className="p-3 mt-2">
                  <div>{orderStatus[adminOrder.order_status]?.label}</div>
                </Paper>
                <Paper className="px-3 pb-2 mt-2">
                  {adminOrder?.items?.map((item, index) => (
                    <div
                      key={item.id}
                      className="py-2"
                      style={
                        index !== adminOrder.items.length - 1
                          ? { borderBottom: `1px solid ${dust}` }
                          : {}
                      }
                    >
                      <div>
                        <div className="d-flex justify-content-between">
                          <div className="pl-4 u-fontWeightMedium">
                            {item.deal?.title}
                          </div>
                          <div className="text-nowrap">
                            {priceFormatter(
                              item.amount * item.discounted_price
                            )}{" "}
                            $
                          </div>
                        </div>
                        {item.variation_title ? (
                          <div className="mt-2">{item.variation_title}</div>
                        ) : null}
                      </div>
                      {item.amount > 1 ? (
                        <div
                          style={{ color: theme.palette.text.disabled }}
                          className="mt-2"
                        >
                          {englishNumberToPersianNumber(item.amount)}
                          <span>x</span>
                          {priceFormatter(item.discounted_price)} $
                        </div>
                      ) : null}
                      {item.modifiers.map((modifier) => (
                        <div
                          key={modifier.id}
                          className="d-flex align-items-center justify-content-between"
                        >
                          <div>{modifier.title}</div>
                          <div>
                            {priceFormatter(
                              item.amount *
                                (modifier.amount || 1) *
                                modifier.price
                            )}{" "}
                            $
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </Paper>
                <Paper className="p-3 mt-2">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="u-fontWeightMedium">Total</div>
                    <div>{priceFormatter(totalTransactionAmount)} $</div>
                  </div>
                  {transactions.map((transaction) => {
                    const date = new Date(transaction._created_at);
                    const createdAt = moment(transaction._created_at);
                    return (
                      <>
                        <div className="mt-2 d-flex align-items-center u-fontNormal justify-content-between">
                          <div>
                            {
                              paymentTypeOptions.find(
                                (type) =>
                                  parseInt(type.keyword) ===
                                  transaction.payment_type
                              )?.text
                            }
                          </div>
                          <div>{priceFormatter(transaction.amount)} $</div>
                        </div>
                        <div
                          style={{ color: theme.palette.text.disabled }}
                          className="mt-1 u-fontNormal"
                        >
                          {englishNumberToPersianNumber(
                            `${createdAt.date()} ${getMonthName(
                              createdAt.month() + 1
                            )} ${createdAt.year()} - ${`0${date.getHours()}`.slice(
                              -2
                            )}:${`0${date.getMinutes()}`.slice(-2)}`
                          )}
                        </div>
                        {transaction.businessposboxtransaction ? (
                          <div className="d-flex align-items-center mt-1">
                            <div className="ml-1">By:</div>
                            <div style={{ color: theme.palette.text.disabled }}>
                              {
                                transaction.businessposboxtransaction.pos_user
                                  ?.name
                              }
                            </div>
                          </div>
                        ) : null}
                      </>
                    );
                  })}
                </Paper>
              </>
            )}
          </div>
          <div
            className="d-flex justify-content-end align-items-center p-2"
            style={{
              borderTop: `1px solid ${dust}`,
              position: "sticky",
              bottom: 0,
              background: "#ffffff",
              zIndex: 1,
            }}
          >
            <div>
              <Button color="default" className="close-btn" onClick={onClose}>
                to close
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  adminOrder: makeSelectShoppingAdminOrder(),
  loading: makeSelectLoading(),
  transactions: makeSelectOrderTransactions(),
  branches: makeSelectBranches(),
  adminDevice: makeSelectPOSDevice(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getAdminOrder: (id) => dispatch(getShoppingAdminOrder(id)),
    _getOrderTransactions: (data) => dispatch(getOrderTransactions(data)),
    _getPosDevice: (data) => dispatch(getPosDevice(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(OrderTransactionsDrawer);
