import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Button from "@material-ui/core/Button";
import useTheme from "@material-ui/core/styles/useTheme";
import { fonts } from "@saas/utils/themeConfig/constants";
import { makeSelectBusinessThemeConfig } from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Modal from "@saas/components/Modal";
import { updateBusiness } from "@saas/stores/business/actions";
import ModalHeader from "@saas/components/Modal/ModalHeader";

const FontSelectorModal = ({
  onClose,
  _updateBusiness,
  themeConfig,
  isOpen,
}) => {
  const [font, setFont] = useState(themeConfig.font);
  const theme = useTheme();
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      header={<ModalHeader onRightClick={onClose} title="Font selection" />}
      body={
        <div className="d-flex flex-wrap justify-content-between p-3">
          {fonts().map((option) => (
            <div
              key={`font-option-${option.name}`}
              tabIndex="0"
              onKeyDown={() => {}}
              role="button"
              style={{
                height: 60,
                width: 100,
                borderColor: theme.palette.primary.main,
                border: font && option.name === font.name ? "2px solid" : "",
              }}
              className="d-flex justify-content-center align-items-center mx-1 my-2 u-border-radius-4  u-cursor-pointer"
              onClick={() => setFont(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      }
      cta={
        <Button
          color="primary"
          variant="contained"
          className="w-100"
          onClick={() => {
            _updateBusiness(
              {
                theme_config: {
                  ...themeConfig,
                  font,
                },
              },
              "Fonts changed successfully.",
              "Change the font was unsuccessful!"
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
  themeConfig: makeSelectBusinessThemeConfig(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateBusiness: (data, successMessage, failMessage) =>
      dispatch(updateBusiness(data, successMessage, failMessage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(FontSelectorModal);
