/* eslint-disable camelcase */
import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Button from "@material-ui/core/Button";
import useTheme from "@material-ui/core/styles/useTheme";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import Icon from "@saas/components/Icon";
import { CASH, CLOCK, NOTE, PERCENTAGE } from "@saas/icons";

import { makeSelectBusinessDiscountCodes } from "@saas/stores/business/selector";
import NoDiscountCode from "../components/NoDiscountCode";
import { getDiscountCodes } from "@saas/stores/business/actions";
import { persianToEnglishNumber } from "@saas/utils/helpers/persianToEnglishNumber";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Paper from "@material-ui/core/Paper";
import Input from "@saas/components/Input";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import { setPluginData } from "@saas/stores/plugins/actions";
import Switch from "@saas/components/Switch";
import AdminBreadCrumb from "../../AdminBreadCrumb";
import { setSnackBarMessage } from "@saas/stores/ui/actions";

function CRMAutomationSettingsPage({
  discountCodes,
  _getDiscountCodes,
  pluginData,
  _setPluginData,
  _setSnackBarMessage,
  loading,
}) {
  const theme = useTheme();
  useEffect(() => {
    setTimeout(() => {
      _getDiscountCodes();
    }, 0);
  }, []);
  const {
    data: {
      inactivity_interval,
      cashback_percent,
      no_event_sms_count,
      target_count,
      discount_code,
      automation,
    },
  } = pluginData;
  const [selectedCode, selectCode] = useState(discount_code || "");
  const [inactivityInterval, setInactivityInterval] = useState(
    inactivity_interval || 15
  );
  const [cashBackPercent, setCashBackPercent] = useState(cashback_percent || 5);
  const [noEventCount, setNoEventCount] = useState(no_event_sms_count || 1000);
  const [targetCount, setTargetCount] = useState(target_count || 0);
  const [isActive, toggleActivity] = useState(automation || false);
  return (
    <div className="container">
      <AdminBreadCrumb />
      <Paper
        elevation={3}
        style={{ padding: 24 }}
        className="d-flex align-items-center justify-content-between w-100 cursor-pointer"
      >
        <div className="flex-1 d-flex flex-column ">
          {discountCodes.length ? (
            <div>
              <div className="text-right  p-2 mt-1">
                <div className="d-flex justify-content-between">
                  <div className="u-fontWeightBold u-text-black">
                    Activate Smart Marketing Automation
                  </div>
                  <div>
                    <Switch
                      id="product-availability"
                      onColor={theme.palette.primary.main}
                      isSwitchOn={isActive}
                      toggleSwitch={() => toggleActivity(!isActive)}
                    />
                  </div>
                </div>
              </div>
              <div className="text-right  p-2 mt-1">
                <div className="u-fontWeightBold u-text-black py-1">
                  <Icon icon={PERCENTAGE} className="ml-1" />
                  Discount code phrase
                </div>
                <div className="py-1">
                  Choose one of the defined discount code.
                </div>
                {discountCodes.map((codeObj) => {
                  const { code } = codeObj;
                  return (
                    <FormControlLabel
                      key={codeObj.id}
                      style={{ direction: "ltr" }}
                      label={code}
                      onClick={() => selectCode(code)}
                      control={
                        <Radio
                          color="primary"
                          checked={code === selectedCode}
                        />
                      }
                      labelPlacement="start"
                    />
                  );
                })}
              </div>
              <div className="text-right  p-2 mt-1">
                <div className="u-fontWeightBold u-text-black py-1">
                  <Icon icon={NOTE} className="ml-1" color="black" />
                  SMS settings of discount code
                </div>
                <div className="py-1">
                  The number of customers who receive a discount code each day and the number of
                  Determine the Reminder Frequently to use the discount code.
                </div>
                <div className="py-1">
                  <Input
                    noModal
                    numberOnly
                    label="Number of SMS Discount Code Submitted each day"
                    value={
                      noEventCount
                        ? englishNumberToPersianNumber(noEventCount)
                        : ""
                    }
                    onChange={(value) =>
                      setNoEventCount(persianToEnglishNumber(value))
                    }
                  />
                </div>
                <div className="py-1">
                  <Input
                    noModal
                    numberOnly
                    label="Number of reminders to use the discount code"
                    value={
                      targetCount
                        ? englishNumberToPersianNumber(targetCount)
                        : ""
                    }
                    onChange={(value) =>
                      setTargetCount(persianToEnglishNumber(value))
                    }
                  />
                </div>
              </div>
              <div className="text-right  p-2 mt-1">
                <div className="u-fontWeightBold u-text-black py-1">
                  <Icon icon={CLOCK} color="black" className="ml-1" />
                  SMS interval
                </div>
                <div className="py-1">
                  You prefer marketing automation texts every day
                  To be submitted?Specify their interval.
                </div>
                <div className="py-1">
                  <Input
                    noModal
                    numberOnly
                    label="SMS interval"
                    value={
                      inactivityInterval
                        ? englishNumberToPersianNumber(inactivityInterval)
                        : ""
                    }
                    onChange={(value) =>
                      setInactivityInterval(persianToEnglishNumber(value))
                    }
                  />
                </div>
              </div>
              <div className="text-right  p-2 mt-1">
                <div className="u-fontWeightBold u-text-black py-1">
                  <Icon icon={CASH} color="black" className="ml-1" />
                  Return money
                </div>
                <div className="pt-1 pb-2">
                  After each purchase what percentage of money returned to the customer's wallet credit
                  to be given?
                </div>
                <Input
                  noModal
                  numberOnly
                  label="The percentage of money return"
                  value={
                    cashBackPercent
                      ? englishNumberToPersianNumber(cashBackPercent)
                      : ""
                  }
                  onChange={(value) =>
                    setCashBackPercent(persianToEnglishNumber(value))
                  }
                />
              </div>
              <div className="sticky-bottom p-3">
                <Button
                  style={{
                    ...(selectedCode && !loading
                      ? {
                          color: "#FFFFFF",
                          background: theme.palette.primary.main,
                        }
                      : {
                          cursor: "default",
                          color: "rgba(0, 0, 0, 0.26)",
                          boxShadow: "none",
                          backgroundColor: "rgba(0, 0, 0, 0.12)",
                        }),
                  }}
                  variant="contained"
                  className="w-100"
                  onClick={() => {
                    if (!selectedCode || loading) {
                      _setSnackBarMessage(
                        "Choose the phrase of the coded.",
                        "fail"
                      );
                      return;
                    }
                    _setPluginData(CRM_PLUGIN, {
                      ...pluginData.data,
                      discount_code: selectedCode,
                      cashback_percent: parseInt(cashBackPercent, 10),
                      inactivity_interval: parseInt(inactivityInterval, 10),
                      no_event_sms_count: parseInt(noEventCount, 10),
                      target_count: parseInt(targetCount, 10),
                      automation: isActive,
                    });
                  }}
                >
                  Store
                </Button>
              </div>
            </div>
          ) : (
            <NoDiscountCode />
          )}
        </div>
      </Paper>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  discountCodes: makeSelectBusinessDiscountCodes(),
  pluginData: makeSelectPlugin(CRM_PLUGIN),
});

function mapDispatchToProps(dispatch) {
  return {
    _getDiscountCodes: () => dispatch(getDiscountCodes()),
    _setPluginData: (pluginName, data) =>
      dispatch(setPluginData(pluginName, data)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,

  memo
)(CRMAutomationSettingsPage);
