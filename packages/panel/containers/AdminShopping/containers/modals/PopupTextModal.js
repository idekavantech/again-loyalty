import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Button from "@material-ui/core/Button";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Modal from "@saas/components/Modal";
import { setPluginData } from "@saas/stores/plugins/actions";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import Input from "@saas/components/Input";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import LoadingIndicator from "@saas/components/LoadingIndicator";

const PopupTextModal = ({
  isOpen,
  onClose,
  _setPluginData,
  pluginData,
  plugin,
  popupType,
  popupText,
  isLoading,
}) => {
  const [popupTextModal, setPopupTextModal] = useState(popupText);
  const submit = () => {
    if (popupTextModal !== "") {
      _setPluginData(plugin, {
        ...pluginData.data,
        closed_business_popup: { type: popupType, text: popupTextModal },
      });
      onClose();
    }
  };
  return (
    <Modal
      onClose={() => {
        onClose();
        setPopupTextModal(popupText);
      }}
      isOpen={isOpen}
      header={
        <ModalHeader
          title="Dedicated pop -up text"
          onRightClick={() => {
            onClose();
            setPopupTextModal(popupText);
          }}
          LeftItem={() => (
            <Button
              color="primary"
              style={{ direction: "ltr" }}
              onClick={submit}
              disabled={popupTextModal === ""}
              startIcon={<CheckRoundedIcon />}
            >
              Store
            </Button>
          )}
        />
      }
      body={
        <div className="p-3">
          <Input
            noModal
            label="Dedicated pop -up text"
            value={popupTextModal}
            onChange={(value) => setPopupTextModal(value)}
          />
          {isLoading ? <LoadingIndicator /> : null}
        </div>
      }
    />
  );
};

export function mapDispatchToProps(dispatch) {
  return {
    _setPluginData: (pluginName, data) =>
      dispatch(setPluginData(pluginName, data)),
  };
}
const mapStateToProps = (state, props) => {
  const { plugin } = props;
  return createStructuredSelector({
    pluginData: makeSelectPlugin(plugin),
    isLoading: makeSelectLoading(),
  });
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(PopupTextModal);
