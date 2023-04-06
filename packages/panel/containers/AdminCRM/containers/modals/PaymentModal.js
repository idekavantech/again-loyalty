import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import { createStructuredSelector } from "reselect";
import Modal from "@saas/components/Modal";
import { CDN_BASE_URL } from "@saas/utils/api";
import { buyVisitCardSMS } from "@saas/stores/transaction/actions";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import LazyImage from "@saas/components/LazyImage";
import ModalHeader from "@saas/components/Modal/ModalHeader";

const zarinpal = `${CDN_BASE_URL}zarinpal.png`;
const ayandeh = `${CDN_BASE_URL}ayandeh.png`;

function PaymentModal({ isOpen, onClose, plan, _buySMS, loading }) {
  const [selectedOption, selectOption] = useState("zarinpal");
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={<ModalHeader title="Charging SMS" onRightClick={onClose} />}
      cta={
        <Button
          color="primary"
          variant="contained"
          className="w-100"
          disabled={loading}
          onClick={() =>
            _buySMS(selectedOption, {
              credit: plan.credit,
              price: plan.price,
            })
          }
        >
          Confirm and continue
        </Button>
      }
      body={
        <div className="pt-3 flex-1">
          <div className="px-3">
            <div className="text-right u-fontWeightBold py-2">
              Choose one of the following ports to pay.
            </div>
          </div>
          <div className="px-3 py-3">
            <div
              onKeyDown={() => {}}
              role="button"
              tabIndex="0"
              className="u-cursor-pointer position-absolute"
              style={{ opacity: selectedOption === "zarinpal" ? 1 : 0.3 }}
              onClick={() => selectOption("zarinpal")}
            >
              <LazyImage src={zarinpal} alt="" />
            </div>
            <div
              onKeyDown={() => {}}
              role="button"
              tabIndex="0"
              className="u-cursor-pointer"
              onClick={() => selectOption("ayande")}
              style={{
                marginRight: 60,
                opacity: selectedOption === "ayande" ? 1 : 0.3,
              }}
            >
              <LazyImage src={ayandeh} alt="" />
            </div>
          </div>
        </div>
      }
    />
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    _buySMS: (gateway, data) => dispatch(buyVisitCardSMS(gateway, data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(PaymentModal);
