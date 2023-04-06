/**
 *
 * ShoppingLayout
 *
 */

import React, { memo } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { makeSelectBusiness } from "@saas/stores/business/selector";
import OrderingPopup from "./OrderingPopup";
function ShoppingLayout({ children }) {
  return (
    <div>
      <OrderingPopup />
      {children}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ShoppingLayout);
