import React, { memo, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeConfig,
} from "@saas/stores/business/selector";

import Modal from "@saas/components/Modal";
import { updateBusiness } from "@saas/stores/business/actions";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import DeleteSectionPopup from "@saas/builder/SectionRenderer/components/DeleteSectionPopup";
import ModalHeader from "@saas/components/Modal/ModalHeader";

function EditBranchesSectionModal({
  isOpen,
  onClose,
  business,
  deleteSection,
}) {
  const [isDialogOpen, openDialog] = useState(false);
  const branches =
    business.branches && business.branches.length ? business.branches : [];
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={
        <ModalHeader
          onRightClick={onClose}
          title="branches"
          LeftItem={() => (
            <IconButton>
              <DeleteIcon onClick={() => openDialog(true)} color="inherit" />
            </IconButton>
          )}
        />
      }
      body={
        <div className="py-1 u-text-darkest-grey u-fontNormal-r w-100">
          <div className="px-3 pt-3">
            {branches &&
              branches.map((branch, index) => (
                <div
                  className="d-flex align-items-start justify-content-between w-100 py-1"
                  key={`admin-branch-${branch.slug}`}
                >
                  <div style={{ minWidth: "64px" }}>
                    <span>{`Branch${englishNumberToPersianNumber(
                      index + 1
                    )}:`}</span>
                    <span className="u-text-darkest-grey mr-2">
                      {englishNumberToPersianNumber(branch.title)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <div className="px-3 u-text-black u-fontWeightBold">
            Contact Showcase Support to add or edit branches.
          </div>
          <DeleteSectionPopup
            open={isDialogOpen}
            onClose={() => openDialog(false)}
            submit={() => {
              openDialog(false);
              onClose();
              deleteSection();
            }}
          />
        </div>
      }
    />
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  business: makeSelectBusiness(),
  themeConfig: makeSelectBusinessThemeConfig(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateBusiness: (data) => dispatch(updateBusiness(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(EditBranchesSectionModal);
