import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { createStructuredSelector } from "reselect";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeConfig,
} from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";

import Modal from "@saas/components/Modal";
import Input from "@saas/components/Input";
import { updateBusiness } from "@saas/stores/business/actions";
import DeleteSectionPopup from "@saas/builder/SectionRenderer/components/DeleteSectionPopup";
import ModalHeader from "@saas/components/Modal/ModalHeader";

function EditEnamadModal({
  isOpen,
  onClose,
  _updateBusiness,
  themeConfig,
  loading,
  deleteSection,
}) {
  const [enamad, setEnamad] = useState(themeConfig.enamad || "");
  const [enamadId, setEnamadId] = useState(themeConfig.enamadId || "");
  const [enamadImage, setEnamadImage] = useState(themeConfig.enamadImage || "");
  const [samandehi, setSamandehi] = useState(themeConfig.samandehi || "");
  const [samandehiId, setSamandehiId] = useState(themeConfig.samandehiId || "");
  const [samandehiImage, setSamandehiImage] = useState(
    themeConfig.samandehiImage || ""
  );

  const [isDialogOpen, openDialog] = useState(false);
  const submit = () => {
    _updateBusiness({
      theme_config: {
        ...themeConfig,
        enamad,
        enamadId,
        enamadImage,
        samandehi,
        samandehiId,
        samandehiImage,
      },
    });
  };
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={
        <ModalHeader
          onRightClick={onClose}
          title="Electronic trust symbol"
          LeftItem={() => (
            <IconButton>
              <DeleteIcon onClick={() => openDialog(true)} color="inherit" />
            </IconButton>
          )}
        />
      }
      body={
        <div className="px-3">
          <Input
            dir="ltr"
            className="my-2"
            value={enamad}
            maxlength={11}
            label="Link Inm"
            hasLabel
            onChange={setEnamad}
          />
          <Input
            dir="ltr"
            className="my-2"
            value={enamadImage}
            maxlength={11}
            label="Image of Inim"
            hasLabel
            onChange={setEnamadImage}
          />{" "}
          <Input
            dir="ltr"
            className="my-2"
            value={enamadId}
            maxlength={11}
            label="ID"
            hasLabel
            onChange={setEnamadId}
          />
          <Input
            dir="ltr"
            className="my-2"
            value={samandehi}
            maxlength={11}
            label="Organizing link"
            hasLabel
            onChange={setSamandehi}
          />
          <Input
            dir="ltr"
            className="my-2"
            value={samandehiImage}
            maxlength={11}
            label="Picture of organizing"
            hasLabel
            onChange={setSamandehiImage}
          />
          <Input
            dir="ltr"
            className="my-2"
            value={samandehiId}
            maxlength={11}
            label="ID"
            hasLabel
            onChange={setSamandehiId}
          />
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
  themeConfig: makeSelectBusinessThemeConfig(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateBusiness: (data) => dispatch(updateBusiness(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(EditEnamadModal);
