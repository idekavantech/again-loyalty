import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Button from "@material-ui/core/Button";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
import Modal from "@saas/components/Modal";
import { setPluginData } from "@saas/stores/plugins/actions";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import Input from "@saas/components/Input";
import ModalHeader from "@saas/components/Modal/ModalHeader";

const PackagingPriceModal = ({
  isOpen,
  onClose,
  _setPluginData,
  pluginData,
  plugin,
  packagingPrice,
}) => {
  const [cost, setCost] = useState(packagingPrice || "");
  const submit = () => {
    if (cost !== "") {
      _setPluginData(plugin, {
        ...pluginData.data,
        packaging_price: Number(cost),
      });
      setCost("");
      onClose();
    }
  };
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={
        <ModalHeader
          title="Packaging cost"
          onRightClick={onClose}
          LeftItem={() => (
            <Button
              color="primary"
              style={{ direction: "ltr" }}
              onClick={submit}
              disabled={cost === ""}
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
            numberOnly
            label="Order packaging fee($)"
            value={cost}
            onChange={(value) => setCost(persianToEnglishNumber(value))}
          />
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
  });
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(PackagingPriceModal);
