/**
 *
 * Settings
 *
 */

import React, { memo, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Head from "next/head";

import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";

import { coal, smoke } from "@saas/utils/colors";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Divider from "@material-ui/core/Divider";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import FormControl from "@material-ui/core/FormControl";
import Input from "@saas/components/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {
  NO_CONDITION_POP_UP,
  DEFAULT_POPUP,
  NO_POP_UP,
} from "@saas/plugins/Shopping/constants";
import {
  getBranchBusiness,
  updateBusiness,
} from "@saas/stores/business/actions";
import {
  makeSelectBranchBusiness,
  makeSelectBranches,
  makeSelectBusinessThemeConfig,
} from "@saas/stores/business/selector";
import LocationSelector from "components/LocationSelector";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function AdminShoppingPopupSettings({
  _updateBusiness,
  loading,
  selfThemeConfig,
  isSuper,
  branches,
  _getBranchBusiness,
  branchBusiness,
}) {
  const {minWidth768} = useResponsive()
  const [selectedBranch, setSelectedBranch] = useState(
    isSuper ? branches?.[0]?.slug : null
  );
  const themeConfig = isSuper ? branchBusiness?.theme_config : selfThemeConfig;
  const [popupType, setPopupType] = useState(
    themeConfig?.plugins?.[SHOPPING_PLUGIN]?.ordering_popup?.type ||
      DEFAULT_POPUP
  );
  const [popupCustomText, setPopupCustomText] = useState(
    themeConfig?.plugins?.[SHOPPING_PLUGIN]?.ordering_popup?.text || ""
  );
  useEffect(() => {
    if (localStorage.getItem("adminDeliverySelectedBranch") && isSuper)
      setSelectedBranch(localStorage.getItem("adminDeliverySelectedBranch"));
  }, []);
  useEffect(() => {
    _getBranchBusiness(selectedBranch);
  }, [selectedBranch]);
  useEffect(() => {
    setPopupCustomText(
      themeConfig?.plugins?.[SHOPPING_PLUGIN]?.ordering_popup?.text || ""
    );
    setPopupType(
      themeConfig?.plugins?.[SHOPPING_PLUGIN]?.ordering_popup?.type ||
        DEFAULT_POPUP
    );
  }, [themeConfig]);
  const submit = () => {
    _updateBusiness(
      {
        theme_config: {
          ...themeConfig,
          plugins: {
            [SHOPPING_PLUGIN]: {
              ...themeConfig?.plugins?.[SHOPPING_PLUGIN],
              ordering_popup: {
                type: popupType,
                text: popupCustomText,
              },
            },
          },
        },
      },
      "The changes were successfully stored.",
      "Save the changes were unsuccessful.",
      selectedBranch
    );
  };
  return (
    <div className="container">
      <Head>
        <title>Popper Settings</title>
      </Head>
      <AdminBreadCrumb
        submitButtonText="Save changes"
        submitAction={submit}
        isLoading={loading}
      />
      {isSuper ? (
        <div className="mt-2">
          <LocationSelector
            value={selectedBranch}
            onChange={(slug) => {
              localStorage.setItem("adminDeliverySelectedBranch", slug);
              setSelectedBranch(slug);
            }}
            items={branches.map((branch) => ({
              title: branch.title,
              value: branch.slug,
            }))}
          />
        </div>
      ) : null}
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Paper
          elevation={1}
          className="mt-4 pb-3"
          style={{ marginBottom: minWidth768 ? "" : 80 }}
        >
          <div className="py-3 px-4">
            <div
              className="u-fontMedium u-fontWeightBold"
              style={{ color: coal }}
            >
              Popper Settings
            </div>
            <div style={{ color: smoke }} className="u-font-semi-small mt-1">
              Using this section you can specify what message the customer in
              See when ordering.
            </div>
          </div>
          <Divider />
          <div className="px-4 my-4">
            <div className="mt-4">
              <FormControl
                variant="outlined"
                style={{ width: 300 }}
                className="ml-1 mb-1"
              >
                <Select
                  value={popupType}
                  onChange={(event) => setPopupType(event.target.value)}
                  className="medium"
                  style={{ width: 300, direction: "rtl" }}
                >
                  <MenuItem value={DEFAULT_POPUP}>
                    Pop -ups and warnings have their default behavior.
                  </MenuItem>
                  <MenuItem value={NO_POP_UP}>
                    Popups and warnings are not displayed.
                  </MenuItem>
                  <MenuItem value={NO_CONDITION_POP_UP}>
                     The default behaviors are deleted and the text below always indicates
                    to be given.
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            {popupType === NO_CONDITION_POP_UP && (
              <div className="mt-4">
                <FormControl component="fieldset" className="w-100">
                  <Input
                    label="The text of the desired message"
                    placeholder="The text of the desired message"
                    value={popupCustomText}
                    onChange={(value) => setPopupCustomText(value)}
                    size="medium"
                    style={{ width: minWidth768 ? "50%" : "100%" }}
                  />
                </FormControl>
              </div>
            )}
          </div>
        </Paper>
      )}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  selfThemeConfig: makeSelectBusinessThemeConfig(),
  loading: makeSelectLoading(),
  branches: makeSelectBranches(),
  branchBusiness: makeSelectBranchBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    _updateBusiness: (data, successMessage, failMessage, slug) =>
      dispatch(updateBusiness(data, successMessage, failMessage, null, slug)),
    _getBranchBusiness: (slug) => dispatch(getBranchBusiness(slug)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(AdminShoppingPopupSettings);
