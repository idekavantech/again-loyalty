import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import { createStructuredSelector } from "reselect";
import Modal from "@saas/components/Modal";
import { buyVisitCardSMS } from "@saas/stores/transaction/actions";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Input from "@saas/components/Input";
import { createCRMLabel } from "store/actions";
import ModalHeader from "@saas/components/Modal/ModalHeader";

function AddNewCRMLabelModal({ isOpen, onClose, loading, _createLabel }) {
  const [labelName, setLabelName] = useState("");
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isSmall
      header={
        <ModalHeader onRightClick={onClose} title="New customer category" />
      }
      body={
        <div className="p-3">
          <Input
            type="text"
            onChange={(val) => setLabelName(val)}
            value={labelName}
            label="Category title"
          />
        </div>
      }
      cta={
        <Button
          color="primary"
          variant="contained"
          className="w-100"
          disabled={loading}
          onClick={() => _createLabel(labelName)}
        >
          Confirm and continue
        </Button>
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
    _createLabel: (name, description) =>
      dispatch(createCRMLabel(name, description)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AddNewCRMLabelModal);
