/**
 *
 * Modal
 *
 */

import React, { memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import MaterialModal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { reversePriceFormatter } from "@saas/utils/helpers/reversePriceFormatter";

import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { makeSelectCreditTransaction } from "@saas/stores/business/selector";
import { payTransaction } from "@saas/stores/transaction/actions";
import CloseIcon from "@material-ui/icons/Close";
import { white } from "@saas/utils/colors";
import useTheme from "@material-ui/core/styles/useTheme";
import { makeSelectBusinessTitle } from "@saas/stores/business/selector";
import { makeSelectUser } from "@saas/stores/user/selector";
import WalletIcon from "@saas/icons/walletIcon";
import { addCreditTransaction } from "@saas/stores/business/actions";

const chargeWalletCard = [
  { id: 0, amount: 50000 },
  { id: 0, amount: 100000 },
  { id: 0, amount: 150000 },
];

function WalletCharge({
  businessTitle,
  user,
  _addCreditTransaction,
  creditTransaction,
  _submitOnline,
}) {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  useEffect(() => {
    if (router?.query?.wallet_charge) {
      setOpenModal(true);
    }
  }, [router?.query?.wallet_charge]);

  const memberId = user?.crm_membership_id;

  const [amountCharge, setAmountCharge] = useState(null);
  const handleClose = () => {
    const _query = { ...router.query };
    delete _query.wallet_charge;
    router.push({
      pathname: router.pathname,
      query: {
        ..._query,
      },
    });
    setOpenModal(false);
  };

  const paymentSubmit = () => {
    if (amountCharge) {
      _addCreditTransaction(memberId, {
        source: "user",
        amount: reversePriceFormatter(amountCharge),
      });
    }
  };
  useEffect(() => {
    if (creditTransaction && openModal) {
      _submitOnline(creditTransaction);
    }
  }, [creditTransaction, openModal]);
  return (
    <MaterialModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      className={"d-flex align-items-center"}
    >
      <div className="walletChargeModalContainer">
        <Fade in={openModal}>
          <Paper
            elevation={3}
            className={`mx-auto  overflow-hidden d-flex flex-column col-md-5 p-5 col-11 py-5`}
            style={{
              backgroundColor: "#fff",
              height: "auto",
              maxWidth: 450,
              width: "95%",
            }}
          >
            <div
              style={{ cursor: "pointer", lineHeight: 0.5 }}
              className="position-relative mb-5"
              onClick={handleClose}
            >
              <CloseIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
            </div>
            <div>
              <div
                className="position-relative chargeWalletContainer px-5"
                style={{
                  background:
                    "linear-gradient(90deg, #818182 0%, #383838 42.12%, #383838 61.4%, #818182 100%)",
                  width: "100%",
                  height: "200px",
                  borderRadius: "16px",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    color: "#FFFFFF",
                    fontWeight: 400,
                    position: "absolute",
                    top: 24,
                    width: "100%",
                  }}
                >
                  {businessTitle}
                </div>
                <div
                  className="position-absolute mt-4"
                  style={{ top: 62, left: 32, color: white, marginBottom: 38 }}
                >
                  <WalletIcon />
                </div>
                <div
                  className="d-flex position-absolute justify-content-between"
                  style={{
                    color: "#FFFFFF",
                    bottom: "24px",
                    width: "88%",
                    margin: "0 auto",
                  }}
                >
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: 16,
                      fontFamily: "dana",
                    }}
                  >
                    Wallet inventory
                  </p>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: 20,
                      fontFamily: "dana",
                    }}
                  >
                    {user?.walletCredit
                      ? priceFormatter(user?.walletCredit)
                      : "۰"}
                    <span
                      className="mr-1"
                      style={{
                        fontWeight: 400,
                        fontSize: 12,
                        fontFamily: "dana",
                      }}
                    >
                      Toman
                    </span>
                  </p>
                </div>
                <div
                  className="position-absolute"
                  style={{
                    background:
                      "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.56) 0%, rgba(255, 255, 255, 0) 100%)",
                    width: 105,
                    height: 102,
                    right: "-37px",
                    top: "158px",
                  }}
                ></div>
                <div
                  className="position-absolute"
                  style={{
                    background:
                      "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0) 100%)",
                    width: 245,
                    height: 238,
                    bottom: "84px",
                    right: "151px",
                  }}
                ></div>
              </div>
            </div>
            <Divider className="mt-5" />
            <div className="mt-5">
              <p style={{ fontSize: "16px", fontWeight: "600" }}>
                Increased inventory
              </p>
              <div className="py-5 d-flex justify-content-between">
                {chargeWalletCard.map((item) => (
                  <div
                    key={item.id}
                    className="py-2 walletChargeCard"
                    onClick={() => setAmountCharge(item.amount)}
                    style={{
                      background: `${
                        item.amount === amountCharge ? "#EDEEEF" : "#fafbfb"
                      }`,
                    }}
                  >
                    <span
                      className="pl-1"
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        fontFamily: "dana",
                      }}
                    >
                      {priceFormatter(item.amount)}
                    </span>
                    Toman
                  </div>
                ))}
              </div>
              <input
                className="pr-3 py-2 "
                placeholder="Enter the desired amount"
                onChange={(e) => {
                  setAmountCharge(e.target.value);
                }}
                style={{
                  border: "1px solid #E4E6E7",
                  fontFamily: "dana",
                  fontWeight: 400,
                  width: "100%",
                  textAlign: "center",
                  fontSize: "14px",
                  borderRadius: "8px",
                  color: "#6D7175",
                }}
                value={priceFormatter(amountCharge)}
              />
              <div
                className="py-3"
                style={{
                  width: "100%",
                  background: theme.palette.secondary.main,
                  textAlign: "center",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                  cursor: "pointer",
                  margin: "32px auto 10px auto",
                  fontSize: 14,
                  fontFamily: "dana",
                  fontWeight: 400,
                }}
                onClick={paymentSubmit}
              >
                the payment
              </div>
            </div>
          </Paper>
        </Fade>
      </div>
    </MaterialModal>
  );
}

const mapStateToProps = createStructuredSelector({
  creditTransaction: makeSelectCreditTransaction(),
  businessTitle: makeSelectBusinessTitle(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    _submitOnline: (transactionId) => dispatch(payTransaction(transactionId)),

    _addCreditTransaction: (id, data) =>
      dispatch(addCreditTransaction(id, data)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(WalletCharge);
