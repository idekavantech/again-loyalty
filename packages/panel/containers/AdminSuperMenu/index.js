import { memo } from "react";
import AdminSuperMenu from "./AdminSuperMenu";
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
import { getAdminAllProducts } from "store/actions";
import { makeSelectAdminAllProducts } from "store/selectors";

function AdminSuperMenuLayout({
  businessSlug,
  getProducts,
  products,
  isLoading,
}) {
  return (
    <Provider store={store}>
      <AdminSuperMenu
        slug={businessSlug}
        getProducts={getProducts}
        isLoading={isLoading}
        products={products}
      />
    </Provider>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: makeSelectLoading(),
  themeConfig: makeSelectBusinessThemeConfig(),
  themeColor: makeSelectBusinessThemeColor(),
  businessSlug: makeSelectBusinessSlug(),
  products: makeSelectAdminAllProducts(),
});

function mapDispatchToProps(dispatch) {
  return {
    getProducts: (slug) => dispatch(getAdminAllProducts(slug)),
    dispatch,
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AdminSuperMenuLayout);
