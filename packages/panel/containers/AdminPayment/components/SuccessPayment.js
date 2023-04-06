import React, { memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Button from "@material-ui/core/Button";
import {
  makeSelectAdminUrlPrefix,
  makeSelectPlugin,
} from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { useRouter } from "next/router";
import AdminBreadCrumb from "../../AdminBreadCrumb";
function SuccessPayment({ urlPrefix }) {
  const router = useRouter();

  return (
    <main className="container position-relative text-center">
      <AdminBreadCrumb />

      <div className="d-flex justify-content-between flex-col h-80-vh">
        <div className="d-flex flex-col flex-1 justify-content-center">
          <div className="u-fontLarge u-text-primary-green mb-3 text-center">
            congratulations
          </div>
          <div className="u-fontLarge u-text-primary-green mb-3 text-center">
            Your payment was successful.
          </div>
        </div>
        <div className="col-12 col-sm-3 mx-auto c-wrapper-fixed-button u-mt-120-r">
          <Button
            color="primary"
            variant="contained"
            onClick={() => router.push(urlPrefix)}
          >
            Back to Management Panel
          </Button>
        </div>
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

export default compose(memo, withConnect)(SuccessPayment);
