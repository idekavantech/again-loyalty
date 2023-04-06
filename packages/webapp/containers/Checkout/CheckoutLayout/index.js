import React, { memo } from "react";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import {
  makeSelectBusiness,
  makeSelectBusinessThemeColor,
  makeSelectIsBranch,
} from "@saas/stores/business/selector";
import { makeSelectOrdersBySiteDomain } from "@saas/stores/plugins/selector";
import { emptyCart } from "@saas/plugins/Shopping/actions";
import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
import CheckoutHeader from "containers/Checkout/CheckoutLayout/components/CheckoutHeader";

function CheckoutLayout({
  children,
  business,
  isBranch,
  themeColor,
  hasTrashIcon,
  headerTitle,
  orders,
  emptyOrders,
  urlPrefix,
}) {
  return (
    <>
      <CheckoutHeader
        business={business}
        isBranch={isBranch}
        themeColor={themeColor}
        hasTrashIcon={hasTrashIcon}
        headerTitle={headerTitle}
        orders={orders}
        emptyOrders={emptyOrders}
        urlPrefix={urlPrefix}
      />
      <div style={{ backgroundColor: "#F6F6F7" }}>{children}</div>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
  isBranch: makeSelectIsBranch(),
  themeColor: makeSelectBusinessThemeColor(),
  urlPrefix: makeSelectUrlPrefix(),
  orders: makeSelectOrdersBySiteDomain(),
});

function mapDispatchToProps(dispatch) {
  return {
    emptyOrders: () => dispatch(emptyCart()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CheckoutLayout);
