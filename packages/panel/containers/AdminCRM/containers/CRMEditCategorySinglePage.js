/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import React, { memo, useEffect, useState } from "react";
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
import { changeCRMLabel, deleteCRMLabel, getCRMLabels } from "store/actions";
import { useRouter } from "next/router";
import { makeSelectBusinessCRMLabels } from "@saas/stores/business/selector";
function CRMEditUserSinglePage({
  loading,
  _changeCRMLabel,
  _deleteCRMLabel,
  _getCRMLabels,
  _labels,
}) {
  const router = useRouter();
  const labelID = router.query.id;
  const [labelName, setLabelName] = useState("");
  const submit = () => {
    _changeCRMLabel(labelID, { name: labelName }, router.back);
  };

  const deleteLabel = () => {
    _deleteCRMLabel(labelID, null);
  };

  useEffect(() => {
    setTimeout(() => {
      _getCRMLabels();
    }, 0);
  }, []);

  useEffect(() => {
    if (_labels) {
      const __label = _labels.filter((l) => l.id == labelID);
      __label && setLabelName(__label[0].name);
    }
  }, [_labels]);

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
        secondButton
        saveAction={submit}
        saveText="Save changes"
        secondButtonText="Classification Remove"
        secondButtonAction={deleteLabel}
        disabled={loading}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  _labels: makeSelectBusinessCRMLabels(),
});

function mapDispatchToProps(dispatch) {
  return {
    _getCRMLabels: () => dispatch(getCRMLabels()),
    _changeCRMLabel: (id, data, callback) =>
      dispatch(changeCRMLabel(id, data, callback)),
    _deleteCRMLabel: (id, callback) => dispatch(deleteCRMLabel(id, callback)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CRMEditUserSinglePage);
