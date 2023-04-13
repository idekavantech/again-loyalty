/* eslint-disable indent */
/**
 *
 * CategoryPresentation
 *
 */

import React, { memo, useState, useEffect } from "react";
import moment from "moment";
import ProductCard from "../ProductCard";
import CategoryHeader from "./CategoryHeader";
import AddNewProductCard from "../ProductCard/AddNewProductCard";
import { isCurrentTimeAvailable } from "@saas/utils/helpers/isCurrentTimeAvailable";
import { slugify } from "@saas/utils/helpers/slugify";

const dragIcon = `/images/dragg-icon.png`;

function CategoryPresentation({
  category = { products: [] },
  themeColor,
  orders = [],
  productCardOptions,
  pluginBaseUrl,
  isEditMode,
  onCategoryEditButtonClick,
  onNewProductCardClick = () => {},
  isDragging,
  dragHandleProps,
  isMock,
  isDesktop,
  hasFilterInLayout,
}) {
  const { products, name: title, id, seo } = category;
  const sortedProducts = [...products];
  const [productsCount, setProductsCount] = useState(
    sortedProducts
      ? sortedProducts.map((_product) => {
          const arr = orders.filter((item) => item.product.id === _product.id)
            ? orders
                .filter((item) => item.product.id === _product.id)
                .map((item) => item.count)
            : 0;
          return arr && arr.length
            ? arr.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
              )
            : 0;
        })
      : []
  );
  sortedProducts.sort((a, b) => {
    if (isEditMode) return 0;
    return b.available ? 0 : -1;
  });
  useEffect(() => {
    setProductsCount(
      sortedProducts
        ? sortedProducts.map((_product) => {
            const arr = orders.filter((item) => item.product.id === _product.id)
              ? orders
                  .filter((item) => item.product.id === _product.id)
                  .map((item) => item.count)
              : 0;
            return arr && arr.length
              ? arr.reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0
                )
              : 0;
          })
        : []
    );
  }, [JSON.stringify(orders), category]);
  const scale = isDragging * -0.05 + 1;
  const shadow = 0;
  return (
    <div
      className={`${isDesktop ? "px-3" : "px-0"} mt-1`}
      style={{
        transition: "all 0.3s ease-in-out",
        transform: `scale(${scale})`,
        boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`,
      }}
    >
      <div className="px-3 d-flex justify-content-between">
        {isEditMode && dragHandleProps && (
          <span className="dragHandle" {...dragHandleProps}>
            <img src={dragIcon} alt="dragging" style={{ width: 24 }} />
          </span>
        )}
        <div className="w-100">
          <CategoryHeader
            categoryName={title}
            themeColor={themeColor}
            showMoreBtnLink={`${pluginBaseUrl}/categories/${id}-${
              (seo && slugify(seo.slug)) || slugify(title)
            }`}
            onCategoryEditButtonClick={() => onCategoryEditButtonClick(id)}
            isEditMode={isEditMode}
          />
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-start">
        {isEditMode && (
          <div
            className={`${
              isDesktop
                ? isMock
                  ? "col-3 p-1"
                  : hasFilterInLayout
                  ? "col-6 col-md-4 col-lg-3 p-1"
                  : "col-6 col-md-4 col-lg-3 col-xl-2 p-1"
                : "col-6 p-1"
            } justify-content-center d-flex my-1 px-1`}
          >
            <AddNewProductCard
              className="w-100"
              onClick={() => {
                localStorage.setItem(
                  "adminNewProductCategory",
                  JSON.stringify({ title, id })
                );
                onNewProductCardClick();
              }}
            />
          </div>
        )}
        {products &&
          sortedProducts.map((product, i) => {
            const {
              extra_data: { only_on_day: onlyOnDay, shifts },
              default_variation: { extra_data },
            } = product;
            const productAvailableToday =
              onlyOnDay && onlyOnDay.length
                ? onlyOnDay.find((sc) => sc.id === moment().day())
                : true;
            const shiftAvailable = shifts
              ? isCurrentTimeAvailable(shifts)
              : true;
            if (
              (productAvailableToday &&
                shiftAvailable &&
                !extra_data?.is_hidden) ||
              isEditMode
            ) {
              return (
                <div
                  className={
                    isDesktop
                      ? isMock
                        ? "col-3 p-1"
                        : hasFilterInLayout
                        ? "col-6 col-sm-4 col-lg-3 col-xxl-2 p-1"
                        : "col-6 col-sm-4 col-lg-3 col-xl-2 p-1"
                      : "col-6 p-1"
                  }
                  key={`c-${id}-p-${product.id}`}
                >
                  <ProductCard
                    isMobile={!isDesktop}
                    isMock={isMock}
                    orders={orders}
                    className="mx-0"
                    themeColor={themeColor}
                    product={{
                      ...product,
                      default_variation: {
                        ...product.default_variation,
                        ...(product.has_image && {
                          main_image_thumbnail_url:
                            product.main_image_thumbnail_url,
                        }),
                      },
                    }}
                    count={productsCount[i]}
                    {...productCardOptions}
                    isEditMode={isEditMode}
                    altImage={product.title}
                  />
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
}

export default memo(CategoryPresentation);
