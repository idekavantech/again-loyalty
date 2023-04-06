import React, { memo } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import Modal from "@saas/components/Modal";
import { makeSelectBusinessThemeColor } from "@saas/stores/business/selector";
import Filters from "@saas/components/Filters";
import ModalHeader from "@saas/components/Modal/ModalHeader";

function FilterModal({ onClose, isOpen, themeColor }) {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={<ModalHeader onRightClick={onClose} title="فیلتر کردن" />}
      body={
        <div className="c-modal-body mt-2">
          <Filters themeColor={themeColor} callback={onClose} />
        </div>
      }
    />
  );
}

const mapStateToProps = createStructuredSelector({
  themeColor: makeSelectBusinessThemeColor(),
});

const withConnect = connect(mapStateToProps, null);
export default compose(withConnect, memo)(FilterModal);
