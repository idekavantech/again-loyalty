/**
 *
 * Modal
 *
 */

import React, { memo, useEffect, useState } from "react";
import MaterialModal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Input from "@saas/components/Input";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { BASE_PLUGIN } from "@saas/utils/constants/plugins";
import Button from "@material-ui/core/Button";

function PinCodeModal({ themeColor, BasePluginData }) {
  const [openModal, setOpenModal] = useState(false);
  const [pinCode, setPinCode] = useState();
  const [error, setError] = useState();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      submit();
    }
  };

  useEffect(() => {
    BasePluginData?.data?.access_permission?.value &&
    !localStorage.getItem("pinCode")
      ? setOpenModal(true)
      : setOpenModal(false);
  }, [BasePluginData]);

  const submit = () => {
    if (BasePluginData?.data?.access_permission?.value.includes(pinCode)) {
      setOpenModal(false);
      localStorage.setItem(
        "pinCode",
        BasePluginData?.data?.access_permission?.value
      );
    } else {
      setError("کد دسترسی وارد شده اشتباه است");
    }
  };

  return (
    <MaterialModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal}
      className={"d-flex align-items-center w-100"}
      style={{ backgroundColor: "#000000a1" }}
    >
      <Fade in={openModal}>
        <Paper
          elevation={3}
          className={`mx-auto position-relative overflow-hidden c-modal-box d-flex flex-column col-md-5 p-5 col-11 justify-content-center align-items-center`}
          style={{ backgroundColor: "#fff", height: "auto" }}
        >
          <p style={{ textAlign: "center" }}>
            برای دسترسی به این صفحه کد دسترسی را وارد نمایید .
          </p>
          <div className="col-md-8 col-11 mt-5 p-0">
            <Input
              // type="tel"
              dir="ltr"
              id="phoneNumber"
              value={pinCode}
              noModal
              label="کد دسترسی"
              onKeyPress={handleKeyPress}
              themeColor={themeColor}
              error={error}
              onChange={(value) => setPinCode(persianToEnglishNumber(value))}
              className={`text-center my-5 u-fontMedium ${
                pinCode ? "notEmpty" : null
              } d-flex 
             opacity-1`}
              color="secondary"
              helperText={error}
              onFocus={() => setError("")}
            />
          </div>
          <Button
            disabled={!pinCode}
            color="secondary"
            style={{
              flex: "2",
              height: 48,
            }}
            variant="contained"
            className="mt-5 col-md-4 col-11"
            onClick={submit}
          >
            تایید
          </Button>
        </Paper>
      </Fade>
    </MaterialModal>
  );
}

const mapStateToProps = createStructuredSelector({
  BasePluginData: makeSelectPlugin(BASE_PLUGIN),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(PinCodeModal);
