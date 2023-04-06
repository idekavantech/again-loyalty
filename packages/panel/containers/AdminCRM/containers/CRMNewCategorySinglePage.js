/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React, { memo, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Paper from "@material-ui/core/Paper";
import Input from "@saas/components/Input";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { coal } from "@saas/utils/colors";
import AdminBreadCrumb from "containers/AdminBreadCrumb";
import Head from "next/head";
import SaveAndDiscardButtons from "@saas/components/SaveAndDiscardButtons";
import { createCRMLabel } from "store/actions";

function CRMNewUserSinglePage({ loading, _createLabel }) {
  const [labelName, setLabelName] = useState("");

  const submit = () => {
    _createLabel(labelName);
  };

  return (
    <div className="container">
      <Head>
        <title>Grouping</title>
      </Head>

      <AdminBreadCrumb />

      <Paper elevation={1} className="d-flex mt-3 py-3 flex-wrap">
        <div className="col-12 col-lg-6 mb-lg-3 mb-0">
          <div className="u-fontLarge mb-3" style={{ color: coal }}>
            Basic Information
          </div>
          <Input
            label="Category title"
            placeholder="For example, Group One"
            value={labelName}
            onChange={(value) => setLabelName(value)}
            className="mt-2 mt-lg-0"
            size="medium"
          />
        </div>
      </Paper>
      <SaveAndDiscardButtons
        saveAction={submit}
        saveText="Category storage"
        disabled={loading}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    _createLabel: (name, description) =>
      dispatch(createCRMLabel(name, description)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CRMNewUserSinglePage);
