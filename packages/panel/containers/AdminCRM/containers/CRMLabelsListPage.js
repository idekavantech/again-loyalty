import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import useTheme from "@material-ui/core/styles/useTheme";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import NoCRMLabel from "../components/NoCRMLabel";
import Switch from "@saas/components/Switch";
import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugin,
} from "@saas/stores/plugins/selector";
import { CRM_PLUGIN } from "@saas/utils/constants/plugins";
import { makeSelectCrmLabels } from "store/selectors";
import AdminBreadCrumb from "../../AdminBreadCrumb";
import { changeCRMLabels, getLabels } from "store/actions";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";

function CRMLabelsListPage({
  labels,
  toggleLabelActivity,
  _getCRMLabels,
  urlPrefix,
}) {
  const theme = useTheme();
  useEffect(() => {
    setTimeout(() => {
      _getCRMLabels();
    }, 0);
  }, []);
  return (
    <div className="container">
      <AdminBreadCrumb />

      <div className=" flex-1 d-flex flex-column ">
        <div
          style={{
            borderBottom: "1px solid #E4E6E7",
            paddingBottom: 30,
          }}
        >
          <Link passHref href={`${urlPrefix}crm/automation/settings`}>
            <Paper
              elevation={3}
              style={{ padding: 24 }}
              className="d-flex align-items-center justify-content-between w-100 cursor-pointer"
            >
              <p style={{ fontSize: 16, fontWeight: 600 }}>
                Marketing Automation Settings
              </p>

              <KeyboardArrowLeftIcon />
            </Paper>
          </Link>
        </div>
        <Paper elevation={1} style={{ marginTop: 30, padding: 24 }}>
          {labels && labels.length ? (
            labels.map((label) => (
              <div className="text-right  p-2 mt-1" key={label.id}>
                <div className="u-fontWeightBold u-text-black d-flex justify-content-between">
                  <div>{label.title}</div>
                  <div>
                    <Switch
                      id={`automation-label-${label.id}`}
                      onColor={theme.palette.primary.main}
                      isSwitchOn={label.is_active}
                      toggleSwitch={(isActive) => {
                        toggleLabelActivity(label.id, { is_active: isActive });
                      }}
                    />
                  </div>
                </div>
                <div className="mt-2 u-font-medium u-text-darkest-grey">
                  {label.description}
                </div>
                {label.is_active ? (
                  <div className="u-text-primary-green d-flex align-items-center mt-1">
                    <div className="pulse-container ml-1">
                      <div className="position-absolute">
                        <div
                          className="pulse-outer-circle"
                          style={{
                            width: 16,
                            height: 16,
                            background: theme.palette.success.main,
                          }}
                        />
                      </div>
                      <div className="position-absolute">
                        <div
                          className="pulse-inner-circle "
                          style={{
                            width: 8,
                            height: 8,
                            background: theme.palette.success.main,
                          }}
                        />
                      </div>
                    </div>
                    Smart Marketing Automation is active.
                  </div>
                ) : (
                  <div className="u-text-dark-grey d-flex align-items-center mt-1">
                    <div
                      className="pulse-container m-2 "
                      style={{
                        width: 8,
                        height: 8,
                        background: theme.palette.text.disabled,
                      }}
                    />
                    Smart marketing automation is inactive.
                  </div>
                )}
              </div>
            ))
          ) : (
            <NoCRMLabel />
          )}
        </Paper>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  labels: makeSelectCrmLabels(),
  pluginData: makeSelectPlugin(CRM_PLUGIN),
  urlPrefix: makeSelectAdminUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getCRMLabels: () => dispatch(getLabels()),
    toggleLabelActivity: (id, data) => dispatch(changeCRMLabels(id, data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CRMLabelsListPage);
