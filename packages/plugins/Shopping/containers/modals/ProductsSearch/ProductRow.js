/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
/* eslint-disable camelcase */
import React, { memo, useRef, useState, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";

import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";
import { useOutsideAlerter } from "@saas/utils/hooks/useOutsideAlerter";

import { calculateDiscountPercent } from "@saas/utils/helpers/calculateDiscountPercent";
import { priceFormatter } from "@saas/utils/helpers/priceFormatter";
import { pushParamsToUrl } from "@saas/utils/helpers/pushParamsToUrl";

import { ellipseText } from "@saas/utils/helpers/ellipseText";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";

import { slugify } from "@saas/utils/helpers/slugify";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeColor,
  makeSelectBusinessWorkingHours,
} from "@saas/stores/business/selector";
import { addOrderItemToCart, decrementOrderItem } from "../../../actions";

import { setSnackBarMessage } from "@saas/stores/ui/actions";
import {
  makeSelectPlugin,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import {
  SHOPPING_PLUGIN,
  SHOPPING_PLUGIN_URL,
} from "@saas/utils/constants/plugins";
import LazyImage from "@saas/components/LazyImage";
import { makeSelectOrdersBySiteDomain } from "@saas/stores/plugins/selector";
import { APP_SHOPPINGPAGE_MODIFIERS_MODAL } from "@saas/stores/plugins/constants";
import { coal, white } from "@saas/utils/colors";
import { useRouter } from "next/router";
import useTheme from "@material-ui/core/styles/useTheme";

const ProductRow = ({
  product,
  increaseOrderItem,
  decreaseOrderItem,
  themeColor,
  orders,
  pluginData,
  _setSnackBarMessage,
  urlPrefix,
  workingHours,
  business,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const [productCount, setProductCount] = useState(0);
  const isDisabled =
    pluginData.data.is_open === false ||
    (!isBusinessOpenNow(workingHours) &&
      business?.is_open_out_of_working_hours !== true);

  useEffect(() => {
    if (product) {
      const arr = orders?.filter((item) => item.product.id === product.id)
        ? orders
            ?.filter((item) => item.product.id === product.id)
            .map((item) => item.count)
        : 0;

      setProductCount(
        arr && arr.length
          ? arr.reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            )
          : 0
      );
    }
  }, [orders, product]);
  const _increaseOrderItem = (_product) => {
    if (_product.modifier_sets?.length) {
      pushParamsToUrl({
        [APP_SHOPPINGPAGE_MODIFIERS_MODAL]: true,
        product: _product.id,
      });
    } else {
      increaseOrderItem(_product);
    }
  };

  const _openProductPage = () => {
    const slug =
      (product.seo && slugify(product.seo.slug)) ||
      (product.title && slugify(product.title));
    router.push(
      `${urlPrefix}/${SHOPPING_PLUGIN_URL}/products/${product.id}-${slug}`
    );
  };
  const wrapperRef = useRef(null);
  const [isControlMode, toggleControlMode] = useState(false);
  useOutsideAlerter(wrapperRef, () => toggleControlMode(false));
  const discount =
    product.default_variation.initial_price -
    product.default_variation.discounted_price;
  const discountPercent = calculateDiscountPercent(
    product.default_variation.initial_price,
    product.default_variation.discounted_price
  );
  const hasVariation = product?.variants_data?.length;
  const [selectedOrderInventory, setSelectedOrderInventory] = useState(null);
  useEffect(() => {
    if (orders?.find((item) => item.product.id === product.id)) {
      setSelectedOrderInventory(
        orders?.find((item) => item.product.id === product.id).count
      );
    } else {
      setSelectedOrderInventory(null);
    }
  }, [orders, product]);
  const isAvailable =
    (hasVariation &&
      !isDisabled &&
      product.variations.some(
        (variant) =>
          variant.available &&
          (variant.keep_selling ||
            variant.inventory_count > selectedOrderInventory)
      )) ||
    (!hasVariation &&
      product.default_variation.available &&
      !isDisabled &&
      (product.default_variation.keep_selling ||
        product.default_variation.inventory_count > selectedOrderInventory));
  return (
    <div
      className="d-flex px-3 py-1 u-relative justify-content-between align-items-center u-cursor-pointer"
      onClick={_openProductPage}
    >
      <div className="d-flex align-items-center">
        <div className="wrapper--img-order d-flex justify-content-center align-items-center">
          <LazyImage
            alt=""
            className="w-100 h-100 object-fit"
            src={product.main_image_thumbnail_url}
          />
        </div>
        <div className="d-flex flex-column aling-items-start jsutify-content-between">
          <div className="u-text-black u-fontWeightBold">
            {ellipseText(product.title, 50)}
          </div>
          <div
            className="overflow-hidden u-text-darkest-grey u-fontVerySmall"
            dangerouslySetInnerHTML={{
              __html: ellipseText(product.description, 30),
            }}
          />
        </div>
      </div>
      <div className="d-flex align-items-center flex-row-reverse">
        {!hasVariation && product.default_variation.available && !isDisabled ? (
          <div>
            {!product.modifier_sets?.length ? (
              <div className="position-relative">
                {isControlMode ? (
                  <div
                    role="button"
                    tabIndex="0"
                    onKeyDown={() => {}}
                    className=" d-flex align-items-center"
                    ref={wrapperRef}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleControlMode(false);
                    }}
                  >
                    <Paper className="deal-card-control-mode-custom">
                      {isAvailable ? (
                        <Add
                          color="secondary"
                          className="d-flex flex-1 justify-content-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            _increaseOrderItem(product);
                          }}
                        />
                      ) : null}

                      <div
                        className="p-2 u-background-melo-grey-remove"
                        style={{
                          borderRadius: 4,
                          flex: "unset",
                          width: 36,
                          height: 34,
                          lineHeight: "18px",
                          backgroundColor: theme.palette.background.default,
                        }}
                      >
                        {englishNumberToPersianNumber(productCount)}
                      </div>
                      <div
                        role="button"
                        tabIndex="0"
                        onKeyDown={() => {}}
                        className="d-flex justify-content-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (productCount === 1) {
                            toggleControlMode(false);
                          }
                          decreaseOrderItem(product);
                        }}
                      >
                        {productCount > 1 ? (
                          <RemoveRoundedIcon color="secondary" />
                        ) : (
                          <DeleteIcon color="secondary" />
                        )}
                      </div>
                    </Paper>
                  </div>
                ) : null}
                {productCount ? (
                  <Button
                    disableElevation
                    variant="contained"
                    color="default"
                    style={{ minWidth: "unset" }}
                    className="u-text-darkest-grey order--item order--item__secondary position-relative m-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleControlMode(true);
                    }}
                  >
                    <div>{englishNumberToPersianNumber(productCount)}</div>
                    <div
                      style={{ backgroundColor: theme.palette.secondary.main }}
                      className="position-absolute d-flex justify-content-center align-items-center edit-pen u-text-white"
                    >
                      <EditRoundedIcon style={{ fontSize: 8 }} />
                    </div>
                  </Button>
                ) : (
                  <div className="m-2 d-flex justify-content-end flex-1">
                    <Button
                      variant="contained"
                      color="secondary"
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: 36,
                        minWidth: "unset",
                        borderRadius: "4px",
                      }}
                      disabled={!isAvailable}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (product.modifier_sets?.length) {
                          pushParamsToUrl({
                            [APP_SHOPPINGPAGE_MODIFIERS_MODAL]: true,
                            product: product.id,
                          });
                        } else {
                          _increaseOrderItem(product);
                          _setSnackBarMessage(
                            "Added to the cart..",
                            "default"
                          );
                        }
                      }}
                    >
                      <Add style={{ color: white }} />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {product.variants_data.available && !isDisabled ? (
                  <div className="p-2 d-flex justify-content-end flex-1">
                    <Button
                      className="d-flex align-items-center justify-content-center"
                      color="secondary"
                      variant="contained"
                      style={{
                        width: 36,
                        minWidth: "unset",
                      }}
                      disabled={!isAvailable}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (product?.variations[0]?.modifier_sets?.length) {
                          pushParamsToUrl({
                            [APP_SHOPPINGPAGE_MODIFIERS_MODAL]: true,
                            product: product.id,
                          });
                        } else {
                          _increaseOrderItem(product);
                          _setSnackBarMessage(
                            "Added to the cart..",
                            "default"
                          );
                        }
                      }}
                    >
                      <Add />
                    </Button>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        ) : null}
        {hasVariation && isAvailable ? (
          <div className="p-2 d-flex justify-content-end flex-1">
            <Button
              className="d-flex align-items-center justify-content-center"
              style={{
                minWidth: "unset",
                width: 36,
              }}
              color="secondary"
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                router.push(
                  `${urlPrefix}/s/products/${product.id}-${slugify(
                    product.title
                  )}`
                );
              }}
            >
              <Add />
            </Button>
          </div>
        ) : null}
        <div style={{ minWidth: 80 }}>
          <div className="u-font-semi-small u-text-darkest-grey d-flex ">
            {isAvailable ? (
              <div
                className={`d-flex justify-content-between ${
                  discount ? "u-text-line-through" : ""
                }`}
                style={{ fontSize: discount ? "" : "13px", marginLeft: "38px" }}
              >
                <div
                  className={discount ? "" : "u-fontWeightBold mx-1"}
                  style={{
                    fontSize: discount ? "inherit" : "15px",
                    color: discount ? "inherit" : coal,
                  }}
                >
                  {priceFormatter(product.default_variation.initial_price)}
                </div>
                {discountPercent ? "" : " Toman"}
              </div>
            ) : (
              <div className="u-font-semi-small pr-3">unavailable</div>
            )}

            {discountPercent ? (
              <div
                className="c-btn-discount p-1 mx-1"
                style={{
                  color: themeColor,
                  height: 22,
                  lineHeight: "initial",
                }}
              >
                ٪{englishNumberToPersianNumber(discountPercent)}
              </div>
            ) : null}
          </div>
          {discount ? (
            <div className="u-text-darkest-grey u-no-wrap u-fontWeightBold">
              {priceFormatter(product.default_variation.discounted_price)}{" "}
              <span className="u-fontSmall font-weight-normal">Toman</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  themeColor: makeSelectBusinessThemeColor(),
  orders: makeSelectOrdersBySiteDomain(),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  workingHours: makeSelectBusinessWorkingHours(),
  urlPrefix: makeSelectUrlPrefix(),
  business: makeSelectBusiness(),
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
