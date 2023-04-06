import React, { memo, useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Drawer from "@material-ui/core/Drawer";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { createStructuredSelector } from "reselect";
import { makeSelectCashDrawerTransactions } from "store/selectors";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { getCashDrawerTransactions } from "store/actions";
import { connect } from "react-redux";
import { compose } from "redux";
import { border, dust } from "@saas/utils/colors";
import moment from "moment-jalaali";
import { makeSelectBranches } from "@saas/stores/business/selector";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import IconButton from "@material-ui/core/IconButton";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Divider from "@material-ui/core/Divider";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { getMonthName } from "@saas/utils/helpers/getMonthName";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Popover from "@material-ui/core/Popover";
import useTheme from "@material-ui/core/styles/useTheme";
import SendEmailModal from "containers/AdminModals/SendEmailModal";

const CashTransactionsDrawer = ({
  _getCashDrawerTransactions,
  isOpen,
  onClose,
  cashDrawer: _cashDrawer,
  cashDrawerTransactions,
  loading,
}) => {
  const {maxWidth768} = useResponsive()
  const theme = useTheme();
  const cashDrawer = _cashDrawer || { data: { drawer: {} } };
  const {
    id,
    pos_device: posDevice,
    data: {
      drawer: {
        closed_at,
        opened_at,
        balance,
        total_paid_out,
        total_paid_in,
        total_sales,
        total_refunds,
        initial_money,
        final_money,
        diff,
        finisher,
        initializer,
        description,
      },
    },
  } = cashDrawer;
  const createdAt = moment(opened_at);
  const finishedAt = moment(closed_at);
  const [anchorEl, setAnchorEl] = useState(null);
  const [emailModal, setEmailModal] = useState(false);
  useEffect(() => {
    if (isOpen && id) {
      _getCashDrawerTransactions(posDevice?.id, id);
    }
    if (!isOpen) setAnchorEl(null);
  }, [isOpen, id]);
  return (
    <>
      <SendEmailModal
        open={emailModal}
        onClose={() => setEmailModal(false)}
        title="Email Report Fund"
        content={{
          title: "Fund report",
          body:
            '<table style="width: 100%; padding: 30px; background-color: #eeeeee; direction: rtl; font-size: 15px;">' +
            "<tbody>" +
            '<td style="font-family: system-ui,sans-serif;" align="center">' +
            '<div style="width: 400px; padding: 30px; background-color: white; text-align: right; border:1px solid #ccd4d7">' +
            "<div>Fund report:</div>" +
            `<div style="margin-top: 8px;">${englishNumberToPersianNumber(
              `${createdAt.jDate()} ${getMonthName(
                createdAt.jMonth() + 1
              )} ${createdAt.jYear()} - ${createdAt.format("HH:mm")}`
            )} —</div>` +
            `<div>${englishNumberToPersianNumber(
              `${finishedAt.jDate()} ${getMonthName(
                finishedAt.jMonth() + 1
              )} ${finishedAt.jYear()} - ${finishedAt.format("HH:mm")}`
            )}</div>` +
            "<div style='margin-top: 30px; height: 2px; background-color: rgb(87, 87, 87);'></div>" +
            `<div style="margin-top: 30px; line-height:21px;color:#575757">The initial amount of the fund: ${priceFormatter(
              initial_money
            )} Toman</div>` +
            `<div style="margin-top: 15px; line-height:21px;color:#575757">The sum of the received transactions: ${priceFormatter(
              total_paid_in
            )} Toman</div>` +
            `<div style="margin-top: 15px; line-height:21px;color:#575757">The sum of paid transactions: ${priceFormatter(
              total_paid_out
            )} Toman</div>` +
            `<div style="margin-top: 15px; line-height:21px;color:#575757">Cash sales: ${priceFormatter(
              total_sales
            )} Toman</div>` +
            `<div style="margin-top: 15px; line-height:21px;color:#575757">Critical return: ${priceFormatter(
              total_refunds
            )} Toman</div>` +
            `<div style="margin-top: 15px; line-height:21px;color:#575757">Total transactions: ${priceFormatter(
              total_paid_in - total_paid_out
            )} Toman</div>` +
            `<div style="margin-top: 15px; line-height:21px;color:#575757">The expected amount in the box: ${priceFormatter(
              balance
            )} Toman</div>` +
            `<div style="margin-top: 15px; line-height:21px;color:#575757">The actual amount in the box: ${priceFormatter(
              final_money
            )} Toman</div>` +
            `<div style="margin-top: 15px; line-height:21px;color:#575757; font-weight: bold;">Disagreement: ${priceFormatter(
              diff
            )} Toman</div>` +
            "<div style='margin-top: 30px; height: 2px; background-color: rgb(87, 87, 87);'></div>" +
            "</div>" +
            "</td>" +
            "</tbody>" +
            "</table>",
        }}
      />
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
        <Popover
          keepMounted
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Paper elevation={0}>
            <ListItem
              button
              onClick={() => {
                setEmailModal(true);
                onClose();
                setAnchorEl(null);
              }}
            >
              <ListItemText
                style={{ color: theme.palette.primary.main }}
                className="text-right"
              >
                send mail
              </ListItemText>
            </ListItem>
          </Paper>
        </Popover>
        <div
          style={{
            backgroundColor: "#ffffff",
            borderBottom: `1px solid ${border.subdued}`,
          }}
          className="p-2 d-flex justify-content-between align-items-center"
        >
          <IconButton size="small" onClick={onClose}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
          <div className="u-fontLarge u-fontWeightBold">
            Fund report
            {description ? `: ${description}` : ""}
          </div>
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            size="small"
          >
            <MoreHorizRoundedIcon />
          </IconButton>
        </div>
        {loading || !cashDrawer ? (
          <LoadingIndicator />
        ) : (
          <div className="p-2 flex-1">
            <Paper className="w-100 position-relative h-100 d-flex flex-column">
              <div className="px-3 py-5 flex-1">
                <div className="u-fontWeightHeavy mb-2"> Fund report</div>
                <Divider />
                <div className="mb-1 mt-2">Start</div>
                {opened_at ? (
                  <>
                    <div className="mb-1">
                      {englishNumberToPersianNumber(
                        `${createdAt.jDate()} ${getMonthName(
                          createdAt.jMonth() + 1
                        )} ${createdAt.jYear()} - ${createdAt.format("HH:mm")}`
                      )}
                    </div>
                    <div className="mb-1"> By{initializer?.name}</div>
                  </>
                ) : (
                  "-"
                )}
                <div className="mb-1 mt-5">End</div>
                {closed_at ? (
                  <>
                    <div className="mb-1">
                      {englishNumberToPersianNumber(
                        `${finishedAt.jDate()} ${getMonthName(
                          finishedAt.jMonth() + 1
                        )} ${finishedAt.jYear()} - ${finishedAt.format(
                          "HH:mm"
                        )}`
                      )}
                    </div>
                    <div className="mb-1"> By{finisher?.name}</div>
                  </>
                ) : (
                  "-"
                )}
                <div className="mb-1 mt-5">closed</div>

                <div className="d-flex justify-content-between mt-5">
                  <div>
                    <div>The expected amount</div>
                    {balance ? (
                      <div className="mt-1">
                        {priceFormatter(balance)} Toman{" "}
                      </div>
                    ) : (
                      <div className="mt-1">-</div>
                    )}
                  </div>
                  <div>
                    <div>The actual amount in the box</div>
                    {final_money ? (
                      <div className="mt-1">
                        {priceFormatter(final_money)} Toman{" "}
                      </div>
                    ) : (
                      <div className="mt-1">-</div>
                    )}
                  </div>
                </div>
                <div className="mt-4 mb-5">
                  <div>Description</div>
                  <div className="mt-1">{description || ""}</div>
                </div>
                <div className="mt-5">
                  <Divider />
                  <div className="u-fontWeightBold my-3">Fund report</div>
                  <Divider />
                  <div className="d-flex justify-content-between my-4">
                    <div>The initial amount of the fund</div>
                    <div>{priceFormatter(initial_money)} Toman</div>
                  </div>
                  <div className="d-flex justify-content-between my-4">
                    <div>Cash sales</div>
                    <div>{priceFormatter(total_sales)} Toman</div>
                  </div>
                  <div className="d-flex justify-content-between my-4">
                    <div>Critical return</div>
                    <div>
                      {priceFormatter(total_refunds)} {total_refunds ? "-" : ""}{" "}
                      Toman
                    </div>
                  </div>
                  <div className="d-flex justify-content-between my-4">
                    <div>The sum of the received transactions</div>
                    <div>{priceFormatter(total_paid_in)} Toman</div>
                  </div>
                  <div className="d-flex justify-content-between my-4">
                    <div>The sum of paid transactions</div>
                    <div>
                      {priceFormatter(total_paid_out)}
                      {total_paid_out ? "-" : ""} Toman
                    </div>
                  </div>
                  <div className="d-flex justify-content-between my-4">
                    <div>Total transactions</div>
                    <div>
                      {priceFormatter(total_paid_in - total_paid_out)} Toman{" "}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between my-4">
                    <div>The expected amount in the box</div>
                    <div>{priceFormatter(balance)} Toman</div>
                  </div>
                  <div className="d-flex justify-content-between my-4">
                    <div>Disagreement</div>
                    <div>{priceFormatter(diff)} Toman</div>
                  </div>
                </div>
                <div className="mt-5">
                  <Divider />
                  <div className="u-fontWeightBold my-3">History</div>
                  <Divider />
                  <div className="d-flex justify-content-between my-4">
                    <div>Starting the box</div>
                    <div className="mb-2">
                      {englishNumberToPersianNumber(
                        `${createdAt.jDate()} ${getMonthName(
                          createdAt.jMonth() + 1
                        )} ${createdAt.jYear()} - ${createdAt.format("HH:mm")}`
                      )}
                    </div>
                  </div>
                  {cashDrawerTransactions?.map((transaction) => (
                    <div key={transaction.id} className="d-flex justify-content-between my-4">
                      <div>
                        <div>
                          {priceFormatter(Math.abs(transaction.amount))} Toman{" "}
                          {transaction.amount > 0 ? "received" : "Paid"}
                        </div>
                        <div className="mt-2">{transaction.description}</div>
                      </div>
                      <div>
                        {moment(transaction?.opened_at).format("HH:mm")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Paper>
          </div>
        )}

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
      </Drawer>
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  cashDrawerTransactions: makeSelectCashDrawerTransactions(),
  loading: makeSelectLoading(),
  branches: makeSelectBranches(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getCashDrawerTransactions: (posId, drawerId) =>
      dispatch(getCashDrawerTransactions(posId, drawerId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(CashTransactionsDrawer);
