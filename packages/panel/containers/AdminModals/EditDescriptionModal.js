import React, { memo, useState } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { makeSelectBusiness } from "@saas/stores/business/selector";
import Modal from "@saas/components/Modal";
import Input from "@saas/components/Input";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { updateBusiness } from "@saas/stores/business/actions";
import DeleteSectionPopup from "@saas/builder/SectionRenderer/components/DeleteSectionPopup";

import ModalHeader from "@saas/components/Modal/ModalHeader";

function EditDescriptionModal({
  onClose,
  _updateBusiness,
  isOpen,
  business,
  loading,
  deleteSection,
}) {
  const [description, setDescription] = useState(business.description);
  const [isDialogOpen, openDialog] = useState(false);

  const submit = () => {
    _updateBusiness({ description });
  };
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={
        <ModalHeader
          onRightClick={onClose}
          title="Description"
          LeftItem={() => (
            <IconButton>
              <DeleteIcon onClick={() => openDialog(true)} color="inherit" />
            </IconButton>
          )}
        />
      }
      body={
        <div className="p-3">
          <DeleteSectionPopup
            open={isDialogOpen}
            onClose={() => openDialog(false)}
            submit={() => {
              openDialog(false);
              onClose();
              deleteSection();
            }}
          />
          <div className="u-text-dark-grey u-fontNormal-r my-2">
            Write a description of your business
          </div>
          <div>
            <Input
              placeholder="about us"
              value={description}
              onChange={setDescription}
              multiline
            />
          </div>
        </div>
      }
      cta={
        <Button
          color="primary"
          variant="contained"
          className="w-100"
          onClick={submit}
          disabled={loading}
        >
          Store
        </Button>
      }
    />
  );
}

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateBusiness: (data) => dispatch(updateBusiness(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(EditDescriptionModal);
