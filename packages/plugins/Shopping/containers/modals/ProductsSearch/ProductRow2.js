/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable camelcase */
import React, { memo } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import { ellipseText } from "@saas/utils/helpers/ellipseText";
import { slugify } from "@saas/utils/helpers/slugify";
import { addOrderItemToCart, decrementOrderItem } from "../../../actions";
import { setSnackBarMessage } from "@saas/stores/ui/actions";
import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN_URL } from "@saas/utils/constants/plugins";
import LazyImage from "@saas/components/LazyImage";
import { useRouter } from "next/router";

const ProductRow = ({ product, urlPrefix }) => {
  const router = useRouter();
  const _openProductPage = () => {
    const slug =
      (product.seo && slugify(product.seo.slug)) ||
      (product.title && slugify(product.title));
    router.push(
      `${urlPrefix}/${SHOPPING_PLUGIN_URL}/products/${product.id}-${slug}`
    );
  };
  return (
    <div
      className="d-flex px-2 py-1 u-relative justify-content-between align-items-center u-cursor-pointer"
      onClick={_openProductPage}
    >
      <div className="d-flex align-items-center">
        <div className="wrapper--img-order2 d-flex justify-content-center align-items-center">
          <LazyImage
            alt=""
            className="w-100 h-100 object-fit"
            src={product.main_image_thumbnail_url}
          />
        </div>
        <div className="d-flex flex-column align-items-start jsutify-content-between">
          <div className="u-text-black" style={{ textAlign: "right" }}>
            {ellipseText(product.title, 50)}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  urlPrefix: makeSelectUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    increaseOrderItem: (product) => {
      dispatch(addOrderItemToCart(product));
    },
    decreaseOrderItem: (product) => dispatch(decrementOrderItem(product.id)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
    dispatch,
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(ProductRow);
