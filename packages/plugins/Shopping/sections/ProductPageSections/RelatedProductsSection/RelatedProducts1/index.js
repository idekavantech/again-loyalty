/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
/**
 *
 * ProductPage
 *
 */
import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import Paper from "@material-ui/core/Paper";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  makeSelectHierarchy,
  makeSelectBusinessWorkingHours,
  makeSelectBusiness,
  makeSelectFilteredDeals,
  makeSelectDeal,
} from "@saas/stores/business/selector";
import { getProducts } from "@saas/stores/business/actions";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  makeSelectPlugin,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import {
  SHOPPING_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";

import { slugify } from "@saas/utils/helpers/slugify";
import { useRouter } from "next/router";
import ProductSlider from "@saas/components/ProductSlider";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { APP_SHOPPINGPAGE_MODIFIERS_MODAL } from "@saas/stores/plugins/constants";
import { addOrderItemToCart, decrementOrderItem } from "../../../../actions";
import { makeSelectOrdersBySiteDomain } from "@saas/stores/plugins/selector";
import { mockProducts } from "../../../constants";
export function RelatedProducts1({
  product: p,
  deals: _deals,
  urlPrefix,
  orders,
  pluginData,
  decreaseOrderItem,
  increaseOrderItem,
  workingHours,
  _getProducts,
  business,
}) {
  const deals = _deals ? _deals["general"] : [];
  const product = p || mockProducts[0];
  const router = useRouter();
  const isDisabled =
    pluginData.data.is_open === false ||
    (!isBusinessOpenNow(workingHours) &&
      business?.is_open_out_of_working_hours !== true);
  useEffect(() => {
    _getProducts({
      categories: product?.extra_data?.similar_products
        ? product?.extra_data?.similar_products?.categories
        : [...product?.labels],
      filters: {
        page: 1,
        pageSize: 11,
        conjoined: product.extra_data.similar_products
          ? product.extra_data.similar_products.conjoined
          : true,
      },
    });
  }, [product.id]);
  if (!product) {
    return <LoadingIndicator />;
  }
  return (
    <div className="c-modal-body-sec container p-2 text-right">
      {deals?.filter((d) => d.id !== product.id)?.length ? (
        <Paper elevation={3}>
          <ProductSlider
            pluginBaseUrl={SHOPPING_PLUGIN_URL}
            title="similar products"
            products={deals.filter(
              (d) => d?.extra_data?.is_hidden !== true && d.id !== product.id
            )}
            productCardOptions={{
              link: (product) => {
                const slug =
                  (product.seo && slugify(product.seo.slug)) ||
                  (product.title && slugify(product.title));
                return `${urlPrefix}/${SHOPPING_PLUGIN_URL}/products/${product.id}-${slug}`;
              },
              increaseOrderItem: (product) => {
                const hasVariation = product?.variants_data?.length;
                if (hasVariation) {
                  const slug =
                    (product.seo && slugify(product.seo.slug)) ||
                    (product.title && slugify(product.title));
                  router.push(
                    `${urlPrefix}/${SHOPPING_PLUGIN_URL}/products/${product.id}-${slug}`
                  );
                } else if (product.modifier_sets?.length) {
                  pushParamsToUrl({
                    [APP_SHOPPINGPAGE_MODIFIERS_MODAL]: true,
                    product: product.id,
                  });
                } else {
                  increaseOrderItem(product);
                }
              },
              decreaseOrderItem,
              hasOrderControlPanel: !isDisabled,
            }}
            orders={orders}
          />
        </Paper>
      ) : null}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  hierarchy: makeSelectHierarchy(),
  product: makeSelectDeal(),
  loading: makeSelectLoading(),
  orders: makeSelectOrdersBySiteDomain(),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  workingHours: makeSelectBusinessWorkingHours(),
  business: makeSelectBusiness(),
  deals: makeSelectFilteredDeals(),
  urlPrefix: makeSelectUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    _getProducts: (data) => dispatch(getProducts(data)),
    increaseOrderItem: (product, variation_id) =>
      dispatch(addOrderItemToCart(product, [], variation_id)),
    decreaseOrderItem: (id) => dispatch(decrementOrderItem(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(RelatedProducts1);
