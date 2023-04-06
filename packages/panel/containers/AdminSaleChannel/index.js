import { memo } from "react";
import AdminSaleChannel from "./AdminSaleChannel";
import {
  makeSelectBusinessThemeColor,
  makeSelectBusinessThemeConfig,
} from "@saas/stores/business/selector";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";
import { makeSelectBusinessSlug } from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import store from "./context/store";
import { Provider } from "react-redux";

function AdminSaleChannelLayout({ business }) {
  return (
    <Provider store={store}>
      <AdminSaleChannel slug={business} />
    </Provider>
  );
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  themeConfig: makeSelectBusinessThemeConfig(),
  themeColor: makeSelectBusinessThemeColor(),
  business: makeSelectBusinessSlug(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect, memo)(AdminSaleChannelLayout);
