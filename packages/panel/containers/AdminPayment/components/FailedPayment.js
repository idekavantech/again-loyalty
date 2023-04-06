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
        پرداخت شما ناموفق بود.
      </div>
      <div className="u-fontMedium u-text-darkest-grey text-right mt-5 text-center ">
        چنانچه مبلغی از حساب شما کسر شد، حداکثر تا ۷۲ ساعت به حساب شما بازگشت
        داده خواهد شد.
      </div>
      <div className="col-12 col-sm-3 mx-auto c-wrapper-fixed-button u-mt-120-r">
        <Button
          color="primary"
          variant="contained"
          disabled={loading}
          onClick={() => history.replace(urlPrefix)}
        >
          بازگشت به پنل مدیریت
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
