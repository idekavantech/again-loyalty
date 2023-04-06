/**
 *
 * ProductCard
 *
 */

import React, { memo, useMemo, useState } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import AdminProductCard from "./AddNewProductCard";
import ProductPrice from "./ProductPrice";
import ProductDescription from "./ProductDescription";
import RenderOrderControlPanel from "./RenderOrderControlPanel";
import useTheme from "@material-ui/core/styles/useTheme";
import Link from "next/link";
import { CDN_BASE_URL } from "@saas/utils/api";
import Image from "next/image";

function ProductCard({
  className = " mx-1 my-1 ",
  increaseOrderItem,
  decreaseOrderItem,
  product,
  hasOrderControlPanel,
  isNewProductCard,
  count,
  link,
  isEditMode,
  withPadding,
  altImage,
  orders,
  isMock,
}) {
  const { title, description, available, has_image } = product;
  let { main_image_thumbnail_url: mainImageThumbnailUrl } = product;
  const {
    initial_price: initialPrice,
    discounted_price: discountedPrice,
    keep_selling: keepSelling,
    inventory_count: inventoryCount,
  } = product?.default_variation;

  if (!has_image) {
    mainImageThumbnailUrl =
      product?.default_variation?.main_image_thumbnail_url;
  }

  const selectedOrderInventory = useMemo(
    () =>
      orders?.reduce((count, item) => {
        if (item.product.id === product.id) {
          return count + item.count;
        }
        return count;
      }, 0) || 0,
    [orders, product.id]
  );
  const theme = useTheme();
  const [isControlMode, toggleControlMode] = useState(false);
  const [snackBar, setSnackBar] = useState(false);
  const openOrderControlPanel = (e) => {
    e.stopPropagation();
    toggleControlMode(true);
  };
  const hasVariation = product?.variants_data?.length;

  const initialIncrement = (e) => {
    if (hasVariation) {
      increaseOrderItem(product);
      return;
    }
    if (increaseOrderItem) {
      e.stopPropagation();
      if (!product?.variations[0].modifier_sets?.length) {
        setSnackBar(true);
        toggleControlMode(true);
      }
      increaseOrderItem(product);
      setTimeout(() => {
        setSnackBar(false);
      }, 2000);
    }
  };
  const increment = (e) => {
    if (increaseOrderItem) {
      e.stopPropagation();
      increaseOrderItem(product);
    }
  };
  const decrement = (e) => {
    if (decreaseOrderItem) {
      e.stopPropagation();
      if (count === 1) {
        toggleControlMode(false);
      }
      decreaseOrderItem(product.id);
    }
  };

  if (isNewProductCard) {
    return <AdminProductCard />;
  }
  const isAvailable =
    available && (keepSelling || inventoryCount > selectedOrderInventory);
  return (
    <Paper
      color="text.primary"
      elevation={0}
      className={`w-100 cursorPointer u-relative ${className}`}
    >
      <div
        style={{
          backgroundColor: theme.palette.background.default,
          borderColor: theme.palette.primary.main,
        }}
        className={
          isEditMode
            ? "w-100 u-dashed-border u-border-radius-4"
            : "w-100 u-border-radius-4"
        }
      >
        <div className="w-100 position-relative align-self-center u-border-top-left-radius-4 u-border-top-right-radius-4">
          {isMock ? (
            <div className="position-relative aspect-ratio-box-1-1 aspect-ratio-box">
              <img
                alt=""
                className="position-absolute left-0 right-0 u-top-0 bottom-0 m-auto"
                style={{ width: 40, height: 40 }}
                src={`${CDN_BASE_URL}mock-bag.svg`}
              />
            </div>
          ) : typeof link === "function" ? (
            <Link
              className="position-relative d-block"
              href={link(product)}
              passHref
              style={{ height: "100%" }}
            >
              <Image
                layout={"responsive"}
                width={300}
                height={300}
                src={mainImageThumbnailUrl}
                alt={altImage}
                unoptimized
              />
            </Link>
          ) : (
            <Image
              layout={"responsive"}
              width={300}
              height={300}
              src={mainImageThumbnailUrl}
              alt={altImage}
              unoptimized
            />
          )}

          <div
            tabIndex="0"
            role="button"
            onKeyDown={() => setSnackBar(false)}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setSnackBar(false);
            }}
            className="add-snackbar d-flex py-2 justify-content-center align-items-center u-text-white u-fontWeightBold position-absolute w-100 u-top-0"
            style={{
              backgroundColor: theme.palette.secondary.main,
              opacity: snackBar ? 1 : 0,
            }}
          >
            به سبد خرید افزوده شد!
          </div>
          <div className="px-1 py-1">
            {!withPadding ? (
              <div
                className="d-flex justify-content-end position-relative align-items-center flex-wrap"
                style={{ height: 40 }}
              >
                {hasOrderControlPanel || isEditMode ? (
                  <RenderOrderControlPanel
                    count={count}
                    increment={increment}
                    decrement={decrement}
                    toggleControlMode={toggleControlMode}
                    openOrderControlPanel={openOrderControlPanel}
                    initialIncrement={initialIncrement}
                    isControlMode={isControlMode}
                    isProductAvailable={isAvailable}
                    isEditMode={isEditMode}
                    product={product}
                    selectedOrderInventory={selectedOrderInventory}
                  />
                ) : null}
                <ProductPrice
                  initialPrice={initialPrice}
                  discountedPrice={discountedPrice}
                />
              </div>
            ) : null}
            <div className={`${withPadding && "p-2"}`}>
              <ProductDescription
                title={title}
                description={description}
                isEditMode={isEditMode}
              />
            </div>
            {isEditMode && (
              <Button
                color="primary"
                variant="contained"
                className="c-btn c-product-btn-editMode u-addItem z-index-2"
                style={{ minWidth: "unset", padding: "0" }}
              >
                <EditRoundedIcon />
              </Button>
            )}
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default memo(ProductCard);
