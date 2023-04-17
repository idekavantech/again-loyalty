/**
 *
 * Category
 *
 */
/* eslint-disable no-nested-ternary */

import React, { memo } from "react";

import Category from "../../../../containers/Category";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import {
  makeSelectPlugin,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import LazyHydrate from "react-lazy-hydration";
import { useRouter } from "next/router";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import Button from "@material-ui/core/Button";
import { makeSelectOrdersBySiteDomain } from "@saas/stores/plugins/selector";

function FlatShoppingProductList1({ pluginData, orders, urlPrefix, ...props }) {
  const router = useRouter();
  const reducerFunc = (accumulator, currentValue) =>
    accumulator + currentValue.count;
  return (
    <>
      <LazyHydrate whenVisible style={{ display: "block" }}>
        <div
          className={`py-3 fixed-order-ct d-flex flex-column ${
            orders?.length > 0 &&
            router.asPath !== `${pluginData.baseUrl.url}/search` &&
            !router.asPath.includes("/orders")
              ? "slide-up"
              : "slide-down"
          }`}
        >
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              router.push(`${urlPrefix}/checkout/cart`);
            }}
            id="finalizeOrderButton"
          >
            Complete the purchase(
            {englishNumberToPersianNumber(orders?.reduce(reducerFunc, 0))})
          </Button>
        </div>
      </LazyHydrate>
      <Category {...props} />
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  urlPrefix: makeSelectUrlPrefix(),
  orders: makeSelectOrdersBySiteDomain(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(FlatShoppingProductList1);
