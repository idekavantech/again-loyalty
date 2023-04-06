import React, { memo } from "react";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { compose } from "redux";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugin,
} from "@saas/stores/plugins/selector";
import AdminBreadCrumb from "../../AdminBreadCrumb";
function FailedPayment({ loading,  urlPrefix }) {
  return (
    <main className="container position-relative text-center">
      <AdminBreadCrumb />

      <div className="u-fontLarge u-text-darkest-grey mt-4">
        Your payment was unsuccessful.
      </div>
      <div className="u-fontMedium u-text-darkest-grey text-right mt-5 text-center ">
        If you have been deducted from your account, returned to your account for up to 2 hours
        will be given.
      </div>
      <div className="col-12 col-sm-3 mx-auto c-wrapper-fixed-button u-mt-120-r">
        <Button
          color="primary"
          variant="contained"
          disabled={loading}
          onClick={() => history.replace(urlPrefix)}
        >
          Back to Management Panel
        </Button>
      </div>
    </main>
  );
}

const mapStateToProps = createStructuredSelector({
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  urlPrefix: makeSelectAdminUrlPrefix(),
});

function mapDispatchToProps() {
  return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(memo, withConnect)(FailedPayment);
