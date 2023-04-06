import React, { memo, useState } from "react";

import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Button from "@material-ui/core/Button";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  makeSelectBusinessThemeColor,
  makeSelectBusinessThemeConfig,
} from "@saas/stores/business/selector";

import Modal from "@saas/components/Modal";
import Icon from "@saas/components/Icon";
import { TICK } from "@saas/icons";
import { colorsList } from "@saas/utils/themeConfig/constants";
import { updateBusiness } from "@saas/stores/business/actions";
import ModalHeader from "@saas/components/Modal/ModalHeader";

const ThemeColorPickerModal = ({
  isOpen,
  onClose,
  themeColor,
  themeConfig,
  _updateBusiness,
}) => {
  const [color, setColor] = useState(themeColor);
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={<ModalHeader onRightClick={onClose} />}
      body={
        <div className="d-flex flex-wrap justify-content-start">
          {colorsList.map((eachColor) => (
            <div
              className="mx-2 mx-md-4 my-1 flex-1"
              key={`color-option-${eachColor}`}
            >
              <div
                onKeyDown={() => {}}
                role="button"
                tabIndex="0"
                className="u-dot d-flex justify-content-center align-items-center"
                onClick={() => setColor(eachColor)}
                style={{ backgroundColor: eachColor }}
              >
                {color === eachColor && (
                  <Icon width={19} height={15} icon={TICK} color="white" />
                )}
              </div>
            </div>
          ))}
        </div>
      }
      cta={
        <Button
          color="primary"
          className="w-100"
          variant="contained"
          onClick={() => {
            _updateBusiness(
              { theme_config: { ...themeConfig, theme_color: color } },
              "The original color change was successfully done.",
              "Changed the original color of the site!"
            );
            onClose();
          }}
        >
          Store
        </Button>
      }
    />
  );
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  themeColor: makeSelectBusinessThemeColor(),
  themeConfig: makeSelectBusinessThemeConfig(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateBusiness: (data, successMessage, failMessage) =>
      dispatch(updateBusiness(data, successMessage, failMessage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ThemeColorPickerModal);
