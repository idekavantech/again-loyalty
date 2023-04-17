/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/display-name */
/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-danger */
/**
 *
 * ProductPage
 *
 */

import React, { memo, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
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
  makeSelectDeal,
} from "@saas/stores/business/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import {
  makeSelectPlugin,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import { SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import { useRouter } from "next/router";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { makeSelectOrdersBySiteDomain } from "@saas/stores/plugins/selector";
import AddedProductRow from "../../../../containers/modals/ProductModal/AddedProductRow";
import ProductSection from "../../../../containers/modals/ProductModal/ProductSection";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";
import { addOrderItemToCart } from "../../../../actions";
import ReactImageMagnify from "react-image-magnify";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import InnerImageZoom from "react-inner-image-zoom";
import { mockProducts } from "../../../constants";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { night } from "@saas/utils/colors";
import IconButton from "@material-ui/core/IconButton";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
const DESKTOP_MODAL = "desktopModal";
const MOBILE_MODAL = "mobileModal";
export function ProductDetail({
  product: p,
  urlPrefix,
  orders,
  pluginData,
  increaseOrderItem,
  workingHours,
  business,
  isMobile,
}) {
  const product = p || mockProducts[0];
  const orderCount = orders?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.count,
    0
  );
  const timeout = useRef(null);
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState();
  const { minWidth768 } = useResponsive();

  const isDesktop = typeof isMobile === "boolean" ? !isMobile : minWidth768;
  const prevOrders = useRef(orderCount);
  const [open, setOpen] = useState(false);
  const [selectedVariant, selectVariant] = useState(null);
  useEffect(() => {
    setAnchorEl(
      isDesktop ? document.getElementById("shopping-cart") : document.body
    );
  }, [isDesktop]);

  useEffect(() => {
    if (orderCount > +(prevOrders.current || "0") && orderCount >= 1) {
      setOpen(true);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        setOpen(false);
      }, 5000);
    }
    prevOrders.current = orderCount;
  }, [orderCount]);
  const isDisabled =
    pluginData.data.is_open === false ||
    (!isBusinessOpenNow(workingHours) &&
      business?.is_open_out_of_working_hours !== true);
  let images = selectedVariant
    ? selectedVariant?.images
    : product?.default_variation?.images;
  images = [...images, ...product.images];
  const [modalOpen, setModalOpen] = useState({
    DESKTOP_MODAL: false,
    MOBILE_MODAL: false,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  if (!product) {
    return <LoadingIndicator />;
  }

  const phoneSliderSetting = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleOpen = (modalName) => {
    setModalOpen({ ...setModalOpen, [modalName]: true });
  };

  const handleClose = (modalName) => {
    setModalOpen({ ...setModalOpen, [modalName]: false });
  };

  return (
    <div className="text-right">
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={modalOpen[DESKTOP_MODAL]}
        onClose={() => handleClose(DESKTOP_MODAL)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Paper
          style={{
            position: "absolute",
            width: "80%",
            height: "80%",
            left: " 50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="d-flex m-auto"
        >
          <div className="col-8" style={{ width: "75%", height: "100%" }}>
            <InnerImageZoom
              src={selectedImage?.image_url}
              zoomSrc={selectedImage?.image_url}
              zoomType="hover"
              zoomPreload={true}
              className="w-100 h-100 modal-gallery"
            />
          </div>
          <div>
            {images?.map((image) => (
              <button
                onClick={() => setSelectedImage(image)}
                style={{
                  margin: 4,
                  borderRadius: 4,
                  width: 75,
                  height: 75,
                }}
              >
                <img className="w-100 h-100" src={image?.image_url} />
              </button>
            ))}
          </div>
        </Paper>
      </Modal>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={modalOpen[MOBILE_MODAL]}
        onClose={() => setModalOpen(MOBILE_MODAL)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Paper
          style={{
            position: "absolute",
            width: "80%",
            height: "70%",
            left: " 50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="d-flex flex-column align-items-start m-auto"
        >
          <IconButton
            className="p-0"
            onClick={() => setModalOpen(MOBILE_MODAL)}
            style={{ color: night }}
          >
            <CancelRoundedIcon />
          </IconButton>
          <div className="w-100 h-100">
            <InnerImageZoom
              src={selectedImage?.image_url}
              zoomSrc={selectedImage?.image_url}
              zoomPreload={true}
              className="w-100 h-100 modal-gallery"
              zoomScale={0.5}
            />
          </div>
        </Paper>
      </Modal>
      {!isDesktop ? (
        <div className="w-100">
          <div className="c-modal-body-sec container px-2">
            <Paper className="d-flex flex-column u-relative h-100">
              <div className="my-2" style={{ height: 285, width: "100%" }}>
                <Slider
                  className="product-slider-phone w-100"
                  {...phoneSliderSetting}
                >
                  {images?.map((image) => (
                    <div
                      className="m-auto image"
                      style={{ width: 250, height: 250 }}
                      onClick={() => {
                        setSelectedImage(image);
                        handleOpen(MOBILE_MODAL);
                      }}
                    >
                      <img
                        style={{ width: 250, height: 250, objectFit: "cover" }}
                        className="h-100 w-100 m-auto"
                        src={image?.image_url}
                      />
                    </div>
                  ))}
                </Slider>
              </div>

              <div className="px-3">
                <ProductSection
                  increaseOrderItem={increaseOrderItem}
                  isDisabled={isDisabled}
                  product={product}
                  orders={orders}
                  selectVariant={selectVariant}
                />
              </div>
            </Paper>
          </div>
        </div>
      ) : (
        <div className="pt-3">
          <div className="w-100">
            <div className="c-modal-body-sec container px-2">
              <Paper
                elevation={3}
                className="mt-2 u-relative d-flex px-3 position-relative"
              >
                <div className="py-3 col-4 ">
                  <div style={{ width: 325, height: 395 }}>
                    <div className="d-flex flex-column align-items-start justify-content-start">
                      <ReactImageMagnify
                        {...{
                          className: "product-image-zoom",
                          smallImage: {
                            src: images?.[0]?.image_url,
                            width: 286,
                            height: 286,
                          },
                          largeImage: {
                            src: images?.[0]?.image_url,
                            width: 1100,
                            height: 1700,
                          },
                          imageStyle: {
                            objectFit: "cover",
                          },
                          enlargedImageContainerStyle: {
                            position: "absolute",
                            top: 0,
                            left: "-200%",
                            zIndex: 100,
                          },
                          enlargedImageContainerDimensions: {
                            width: "180%",
                            height: "150%",
                            zIndex: 100,
                          },
                          enlargedImageContainerClassName: "direction-ltr",
                          enlargedImageClassName: "direction-ltr",
                          isHintEnabled: false,
                          shouldHideHintAfterFirstActivation: false,
                        }}
                      />
                      <div className="d-flex align-items-center justify-content-center mt-2">
                        {images?.length > 3 ? (
                          <div>
                            {images?.slice(0, 3)?.map((image, index) => (
                              <button
                                onClick={() => {
                                  setSelectedImage(image);
                                  handleOpen(DESKTOP_MODAL);
                                }}
                                style={{
                                  margin: index === 0 ? "1px 0 1px 1px" : 1,
                                  borderRadius: 4,
                                  width: 70,
                                  height: 70,
                                }}
                              >
                                <img
                                  style={{
                                    objectFit: "cover",
                                    opacity: 0.7,
                                    borderRadius: 4,
                                  }}
                                  className="w-100 h-100 obje"
                                  src={image?.image_url}
                                />
                              </button>
                            ))}
                            <button
                              onClick={() => {
                                handleOpen(DESKTOP_MODAL);
                                setSelectedImage(images?.[3]);
                              }}
                              style={{
                                margin: 1,
                                borderRadius: 4,
                                width: 70,
                                height: 70,
                                position: "relative",
                              }}
                            >
                              <img
                                style={{
                                  objectFit: "cover",
                                  opacity: 1,
                                  filter: "blur(1px)",
                                  borderRadius: 4,
                                }}
                                className="w-100 h-100"
                                src={images?.[3]?.image_url}
                              />
                              <button
                                onClick={() => {
                                  handleOpen(DESKTOP_MODAL);
                                  setSelectedImage(images?.[3]);
                                }}
                                style={{
                                  borderRadius: "100%",
                                  backgroundColor: "black",
                                  color: "white",
                                  objectFit: "cover",
                                  opacity: 0.7,
                                  fontSize: 20,
                                  border: "1px solid black",
                                  lineHeight: 0,
                                  padding: "12px 8px 18px 8px",
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate( -50%, -50%)",
                                }}
                                className="d-flex align-items-center justity-content-center"
                              >
                                ...
                              </button>
                            </button>
                          </div>
                        ) : (
                          images?.map((image, index) => (
                            <button
                              onClick={() => {
                                setSelectedImage(image);
                                handleOpen(DESKTOP_MODAL);
                              }}
                              style={{
                                margin: index === 0 ? "1px 0 1px 1px" : 1,
                                borderRadius: 4,
                                width: 70,
                                height: 70,
                              }}
                            >
                              <img
                                style={{
                                  objectFit: "cover",
                                  opacity: 0.7,
                                  borderRadius: 4,
                                }}
                                className="w-100 h-100 obje"
                                src={image?.image_url}
                              />
                            </button>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pb-3 mr-5 col-8">
                  <ProductSection
                    increaseOrderItem={increaseOrderItem}
                    isDisabled={isDisabled}
                    product={product}
                    orders={orders}
                    selectVariant={selectVariant}
                  />
                </div>
              </Paper>
            </div>
          </div>
        </div>
      )}
      <Popover
        open={open}
        anchorEl={anchorEl}
        PaperProps={{
          elevation: 3,
          style: { width: isDesktop ? 360 : "100%", marginTop: 10 },
        }}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: isDesktop ? "left" : "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: isDesktop ? "left" : "center",
        }}
      >
        <div className="p-2">
          <div className="d-flex mb-2 align-items-center u-fontWeightBold">
            The added item of the shopping cart
            <ShoppingCartIcon fontSize="small" className="mr-1" />
          </div>
          {orders &&
            orders.map((order) => (
              <AddedProductRow
                resetTimeout={() => {
                  clearTimeout(timeout.current);
                  timeout.current = setTimeout(() => {
                    setOpen(false);
                  }, 5000);
                }}
                key={`op-${order.id}`}
                order={order}
                product={product}
                orders={orders}
              />
            ))}
          <div className="d-flex mt-3">
            <Button
              color="secondary"
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              to close
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className="flex-1"
              onClick={() => {
                setOpen(false);
                router.push(`${urlPrefix}/checkout/cart`);
              }}
            >
              See shopping cart
            </Button>
          </div>
        </div>
      </Popover>
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
  urlPrefix: makeSelectUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    increaseOrderItem: (product, variation_id) =>
      dispatch(addOrderItemToCart(product, [], variation_id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ProductDetail);
