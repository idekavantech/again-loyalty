/* eslint-disable no-underscore-dangle */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable camelcase */
/* eslint-disable indent */
/* eslint-disable react/no-danger */
import React, { memo, useState, useEffect, useCallback } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";
import Paper from "@material-ui/core/Paper";
import useTheme from "@material-ui/core/styles/useTheme";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";
import { removeParamsFromUrl } from "@saas/utils/helpers/removeParamsFromUrl";
import FlickitySlider from "@saas/components/FlickitySlider";
import Modal from "@saas/components/Modal";

import { setSnackBarMessage } from "@saas/stores/ui/actions";
import {
  makeSelectBusinessThemeColor,
  makeSelectDeal,
  makeSelectBusinessWorkingHours,
  makeSelectBusiness,
} from "@saas/stores/business/selector";
import { makeSelectPlugin } from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { decrementOrderItem, addOrderItemToCart } from "../../../actions";
import { getProduct } from "@saas/stores/business/actions";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectOrdersBySiteDomain } from "@saas/stores/plugins/selector";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import ProductSection from "./ProductSection";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import { useRouter } from "next/router";
import { useResponsive } from "@saas/utils/hooks/useResponsive";

function ProductModal({
  isOpen,
  increaseOrderItem,
  orders,
  pluginData,
  _getProduct,
  product,
  loading,
  workingHours,
  business,
}) {
  const theme = useTheme();
  const onClose = useCallback(() => {
    removeParamsFromUrl();
  }, []);
  const isDisabled =
    pluginData.data.is_open === false ||
    (!isBusinessOpenNow(workingHours) &&
      business?.is_open_out_of_working_hours !== true);
  const router = useRouter();
  const id = router && router.query.product;
  const [selectedTab, selectTab] = useState("description");
  const { minWidth992 } = useResponsive();


  useEffect(() => {
    if (id && isOpen) {
      _getProduct(id);
    }
  }, [isOpen]);
  useEffect(() => {
    if (product) {
      const infoTable = product.extra_data.info_table;
      const complementary = product.extra_data.complementary;
      if (complementary) {
        selectTab("description");
      } else if (infoTable && infoTable.length) {
        selectTab("technical");
      }
    }
  }, [product]);
  if (id && !loading && product) {
    const infoTable = product.extra_data.info_table;
    const complementary = product.extra_data.complementary;

    const noExtraSection =
      (!infoTable || (infoTable && infoTable.length === 0)) && !complementary;
    const images = product?.images?.length
      ? product.images
      : [{ image_url: product.main_image_url }];

    return (
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isBig
        header={<ModalHeader onRightClick={onClose} />}
        body={
          <>
            {!minWidth992 ? (
              <div className="p-3">
                <Paper elevation={2} className="u-relative w-100">
                  <div
                    style={{
                      overflow: "hidden",
                      borderRadius: "8px",
                    }}
                    className="w-100"
                  >
                    <FlickitySlider
                      wrapperClassName="mh-100 overflow-hidden d-flex align-items-center justify-content-center"
                      flickityClassName="mh-100 w-100"
                      className="w-100"
                      reloadOnUpdate
                      items={images.map((image) => ({
                        image: image.image_url,
                      }))}
                      options={{ prevNextButtons: false, pageDots: false }}
                    />
                  </div>
                  <div className="w-100 p-3">
                    <ProductSection
                      increaseOrderItem={increaseOrderItem}
                      isDisabled={isDisabled}
                      product={product}
                      orders={orders}
                    />
                  </div>
                </Paper>
                {!noExtraSection ? (
                  <Paper elevation={2} className="mt-2 u-relative">
                    <div
                      className="d-flex px-3  container-shadow"
                      style={{
                        borderRadius: "8px 8px 0px 0px",
                      }}
                    >
                      <div className="d-flex">
                        {complementary ? (
                          <div
                            className="mx-2 h-100 py-3 u-cursor-pointer"
                            onClick={() => selectTab("description")}
                            style={{
                              borderBottom:
                                selectedTab === "description"
                                  ? "2px solid #00283C"
                                  : "",
                            }}
                          >
                            شرح محصول
                          </div>
                        ) : null}
                        {infoTable && infoTable.length ? (
                          <div
                            className="mx-2 h-100 py-3 u-cursor-pointer"
                            onClick={() => selectTab("technical")}
                            style={{
                              borderBottom:
                                selectedTab === "technical"
                                  ? "2px solid #00283C"
                                  : "",
                            }}
                          >
                            مشخصات فنی
                          </div>
                        ) : null}
                        {product.modifier_sets?.length ? (
                          <div
                            className="mx-2 h-100 py-3 u-cursor-pointer"
                            onClick={() => selectTab("modifiers")}
                            style={{
                              borderBottom:
                                selectedTab === "modifiers"
                                  ? "2px solid #00283C"
                                  : "",
                            }}
                          >
                            افزودنی‌ها
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12 p-3">
                      {selectedTab === "description" ? (
                        <div
                          className="u-text-darkest-grey u-fontNormal mt-2"
                          dangerouslySetInnerHTML={{
                            __html: complementary,
                          }}
                        />
                      ) : null}
                      {selectedTab === "technical" ? (
                        <div>
                          {infoTable?.map((row) => (
                            <div className="row mx-0 py-1" key={row.key}>
                              <div className="px-0 col-4">
                                <div
                                  className="p-3 ml-2 u-border-radius-4"
                                  style={{
                                    background: row.key
                                      ? theme.palette.background.default
                                      : theme.palette.background.paper,
                                  }}
                                >
                                  {row.key}
                                </div>
                              </div>
                              <div className="px-0 col-8">
                                <div
                                  className="p-3 h-100 u-border-radius-4"
                                  style={{
                                    background: row.value
                                      ? theme.palette.background.default
                                      : theme.palette.background.paper,
                                  }}
                                >
                                  {row.value}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                      {selectedTab === "modifiers" ? (
                        <div>
                          {product.modifier_sets.map((row) => (
                            <div className="row mx-0 py-1" key={row.id}>
                              <div className="px-0 col-8">
                                <div
                                  className="p-3 ml-2 u-border-radius-4"
                                  style={{
                                    background: row.title
                                      ? theme.palette.background.default
                                      : theme.palette.background.paper,
                                  }}
                                >
                                  {row.title}
                                </div>
                              </div>
                              <div className="px-0 col-4">
                                <div className="p-3 h-100 u-background-melo-grey-remove u-border-radius-4">
                                  {row.price || ""}
                                  <span className="mx-1">
                                    {row.price ? "تومان" : "رایگان"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </Paper>
                ) : null}
              </div>
            ) : (
              <div className="flex-column px-5">
                <Paper elevation={2} className="mt-2 d-flex u-relative w-100">
                  <div
                    style={{
                      overflow: "hidden",
                      borderRadius: "8px",
                    }}
                    className="py-3 flex-shrink-0"
                  >
                    <FlickitySlider
                      noNav
                      wrapperClassName="mh-100 overflow-hidden d-flex align-items-center justify-content-center"
                      flickityClassName="mh-100 u-width-300 w-100"
                      className="w-100"
                      reloadOnUpdate
                      items={images.map((image) => ({
                        image: image.image_url,
                      }))}
                      options={{ prevNextButtons: false, pageDots: false }}
                    />
                  </div>
                  <div className="col-12 col-lg-6 pb-3">
                    <ProductSection
                      increaseOrderItem={increaseOrderItem}
                      isDisabled={isDisabled}
                      product={product}
                    />
                  </div>
                </Paper>
                {!noExtraSection ? (
                  <Paper elevation={2} className="mt-2 u-relative w-100">
                    <div className="d-flex px-3  u-border-radius-8 container-shadow">
                      <div className="d-flex">
                        {complementary ? (
                          <div
                            className="mx-2 h-100 py-3 u-cursor-pointer"
                            onClick={() => selectTab("description")}
                            style={{
                              borderBottom:
                                selectedTab === "description"
                                  ? "2px solid #00283C"
                                  : "",
                            }}
                          >
                            شرح محصول
                          </div>
                        ) : null}
                        {infoTable && infoTable.length ? (
                          <div
                            className="mx-2 h-100 py-3 u-cursor-pointer"
                            onClick={() => selectTab("technical")}
                            style={{
                              borderBottom:
                                selectedTab === "technical"
                                  ? "2px solid #00283C"
                                  : "",
                            }}
                          >
                            مشخصات فنی
                          </div>
                        ) : null}
                        {product.modifier_sets?.length ? (
                          <div
                            className="mx-2 h-100 py-3 u-cursor-pointer"
                            onClick={() => selectTab("modifiers")}
                            style={{
                              borderBottom:
                                selectedTab === "modifiers"
                                  ? "2px solid #00283C"
                                  : "",
                            }}
                          >
                            افزودنی‌ها
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12 p-3">
                      {selectedTab === "description" ? (
                        <div
                          className="u-text-darkest-grey u-fontNormal mt-2"
                          dangerouslySetInnerHTML={{
                            __html: complementary,
                          }}
                        />
                      ) : null}
                      {selectedTab === "technical" ? (
                        <div>
                          {infoTable?.map((row) => (
                            <div className="row mx-0 py-1" key={row.key}>
                              <div className="px-0 col-4">
                                <div
                                  className="p-3 ml-2 u-border-radius-4"
                                  style={{
                                    background: row.key
                                      ? theme.palette.background.default
                                      : theme.palette.background.paper,
                                  }}
                                >
                                  {row.key}
                                </div>
                              </div>
                              <div className="px-0 col-8">
                                <div
                                  className="p-3 h-100 u-border-radius-4"
                                  style={{
                                    background: row.value
                                      ? theme.palette.background.default
                                      : theme.palette.background.paper,
                                  }}
                                >
                                  {row.value}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                      {selectedTab === "modifiers" ? (
                        <div>
                          {product.modifier_sets.map((row) => (
                            <div className="row mx-0 py-1" key={row.key}>
                              <div className="px-0 col-8">
                                <div
                                  className="p-3 ml-2 u-border-radius-4"
                                  style={{
                                    background: row.title
                                      ? theme.palette.background.default
                                      : theme.palette.background.paper,
                                  }}
                                >
                                  {row.title}
                                </div>
                              </div>
                              <div className="px-0 col-4">
                                <div
                                  className="p-3 h-100 u-border-radius-4"
                                  style={{
                                    background: row.title
                                      ? theme.palette.background.default
                                      : theme.palette.background.paper,
                                  }}
                                >
                                  {row.price || ""}
                                  <span className="mx-1">
                                    {row.price ? "تومان" : "رایگان"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </Paper>
                ) : null}
              </div>
            )}
          </>
        }
      />
    );
  }
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isBig
      header={<ModalHeader onRightClick={onClose} />}
      body={
        <div style={{ height: 400 }}>
          <LoadingIndicator />
        </div>
      }
    />
  );
}

const mapStateToProps = createStructuredSelector({
  themeColor: makeSelectBusinessThemeColor(),
  pluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  product: makeSelectDeal(),
  loading: makeSelectLoading(),
  orders: makeSelectOrdersBySiteDomain(),
  workingHours: makeSelectBusinessWorkingHours(),
  business: makeSelectBusiness(),
});

function mapDispatchToProps(dispatch) {
  return {
    increaseOrderItem: (product, variation_id) =>
      dispatch(addOrderItemToCart(product, [], variation_id)),
    _getProduct: (id) => dispatch(getProduct(id)),
    decreaseOrderItem: (id) => dispatch(decrementOrderItem(id)),
    _setSnackBarMessage: (message, type) =>
      dispatch(setSnackBarMessage(message, type)),
    dispatch,
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(ProductModal);
