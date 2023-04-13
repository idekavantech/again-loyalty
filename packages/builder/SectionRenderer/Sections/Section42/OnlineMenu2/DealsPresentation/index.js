import React, { Fragment, useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import LoadingIndicator from "@saas/components/LoadingIndicator";
import { textTypes } from "@saas/utils/colors";
import { Swiper, SwiperSlide } from "swiper/react";
import { isCurrentTimeAvailable } from "@saas/utils/helpers/isCurrentTimeAvailable";
import moment from "moment";

export default function DealsPresentation({
  categories,
  themeColor,
  isLoading,
  isMobile,
  orders,
  addOrderItemToCart,
  decrementOrderItem,
  incrementOrderItemByOrderId,
  decrementOrderItemByOrderId,
  updateOrderItemByOrderId,
  updateMultipleOrdersItems,
  deleteOrderItem,
  couldShop,
  urlPrefix,
  categoryId,
  customization,
  isEditMode
}) {
  const [orderItemsGroupByProductId, setOrderItemsGroupByProductId] = useState(
    {}
  );
  const _orders = useMemo(() => JSON.stringify(orders), [orders]);
  const { colors: { body_categories_color } = {} } = customization;
  useEffect(() => {
    const _orderItemsGroupByProductId = {};
    orders?.forEach((order) => {
      if (!_orderItemsGroupByProductId[order?.product?.id]) {
        _orderItemsGroupByProductId[order?.product?.id] = [];
      }
      _orderItemsGroupByProductId[order?.product?.id].push(order);
    });
    setOrderItemsGroupByProductId(_orderItemsGroupByProductId);
  }, [_orders, orders]);

  if (isLoading || !categories?.length) {
    return <LoadingIndicator />;
  }
  return isMobile ? (
    <div>
      {categories.map((category) => (
        <Fragment key={category.id}>
          <div id={`category-${category.id}`} className="py-4" />
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 16,
                fontWeight: 400,
                color: body_categories_color || textTypes.text.default,
              }}
              className={`mb-0 px-4 ${isEditMode ? "" : "px-md-0"}`}
            >
              {category.title}
            </div>
            <div>
              {category?.products
                .filter(
                  (deal) =>
                    !deal.extra_data ||
                    (!deal.extra_data.shifts &&
                      !deal?.extra_data?.only_on_day) ||
                    (isCurrentTimeAvailable(deal.extra_data.shifts) &&
                      (deal?.extra_data?.only_on_day &&
                      deal?.extra_data?.only_on_day.length
                        ? deal?.extra_data?.only_on_day.find(
                            (sc) => sc.id === moment().day()
                          )
                        : true))
                )
                .filter((deal) => !deal?.extra_data?.is_hidden)
                .filter(
                  (deal) =>
                    !deal?.variations?.variations_table ||
                    (deal?.variations?.variations_table &&
                      Object.values(deal?.variations?.variations_table).find(
                        (variation) => !variation?.extra_data?.is_hidden
                      ))
                )
                .map((deal) => {
                  const customizedOrderItems = orderItemsGroupByProductId[
                    deal.id
                  ]?.filter(
                    (orderItem) =>
                      orderItem.modifiers?.length > -1 || orderItem.variation_id
                  );
                  const orderItem = orderItemsGroupByProductId[deal.id]?.find(
                    (orderItem) =>
                      !orderItem.modifiers?.length &&
                      !orderItem.product?.variants_data?.length
                  ) || { count: 0 };

                  return (
                    <div
                      key={deal.id}
                      className="online-menu-presentation w-100 d-flex align-items-center justify-content-center"
                    >
                      <div className="d-flex  w-100 h-100 px-4 px-md-2 online-menu-presentation__card-wrapper">
                        <ProductCard
                          isMobile={isMobile}
                          themeColor={themeColor}
                          deal={deal}
                          orders={orders}
                          addOrderItemToCart={addOrderItemToCart}
                          decrementOrderItem={decrementOrderItem}
                          incrementOrderItemByOrderId={
                            incrementOrderItemByOrderId
                          }
                          decrementOrderItemByOrderId={
                            decrementOrderItemByOrderId
                          }
                          updateOrderItemByOrderId={updateOrderItemByOrderId}
                          updateMultipleOrdersItems={updateMultipleOrdersItems}
                          deleteOrderItem={deleteOrderItem}
                          couldShop={couldShop}
                          urlPrefix={urlPrefix}
                          customizedOrderItems={customizedOrderItems}
                          orderItem={orderItem}
                          categoryId={categoryId}
                          customization={customization}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  ) : (
    <div>
      {categories.map((category) => (
        <Fragment key={category.id}>
          <div id={`category-${category.id}`} style={{ height: "32px" }} />
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 400,
                color: body_categories_color || textTypes.text.default,
              }}
              className="mb-4"
            >
              {category.title}
            </div>
            <div>
              <Swiper
                spaceBetween={-24}
                slidesPerView="auto"
                className="categories-swiper"
              >
                {category?.products
                  .filter(
                    (deal) =>
                      !deal.extra_data ||
                      (!deal.extra_data.shifts &&
                        !deal?.extra_data?.only_on_day) ||
                      (isCurrentTimeAvailable(deal.extra_data.shifts) &&
                        (deal?.extra_data?.only_on_day &&
                        deal?.extra_data?.only_on_day.length
                          ? deal?.extra_data?.only_on_day.find(
                              (sc) => sc.id === moment().day()
                            )
                          : true))
                  )
                  .filter((deal) => !deal?.extra_data?.is_hidden)
                  .filter(
                    (deal) =>
                      !deal?.variations?.variations_table ||
                      (deal?.variations?.variations_table &&
                        Object.values(deal?.variations?.variations_table).find(
                          (variation) => !variation?.extra_data?.is_hidden
                        ))
                  )
                  .map((deal, index) => {
                    const customizedOrderItems = orderItemsGroupByProductId[
                      deal.id
                    ]?.filter(
                      (orderItem) =>
                        orderItem.modifiers?.length > -1 ||
                        orderItem.variation_id
                    );
                    const orderItem = orderItemsGroupByProductId[deal.id]?.find(
                      (orderItem) =>
                        !orderItem.modifiers?.length &&
                        !orderItem.product?.variants_data?.length
                    ) || { count: 0 };

                    return (
                      <SwiperSlide key={deal.id}>
                        <div
                          className={`  ${index == 0 ? "ml-5" : "mx-5"}`}
                          style={{ direction: "rtl" }}
                        >
                          <ProductCard
                            isMobile={isMobile}
                            themeColor={themeColor}
                            deal={deal}
                            orders={orders}
                            addOrderItemToCart={addOrderItemToCart}
                            decrementOrderItem={decrementOrderItem}
                            incrementOrderItemByOrderId={
                              incrementOrderItemByOrderId
                            }
                            decrementOrderItemByOrderId={
                              decrementOrderItemByOrderId
                            }
                            updateOrderItemByOrderId={updateOrderItemByOrderId}
                            updateMultipleOrdersItems={
                              updateMultipleOrdersItems
                            }
                            deleteOrderItem={deleteOrderItem}
                            couldShop={couldShop}
                            urlPrefix={urlPrefix}
                            customizedOrderItems={customizedOrderItems}
                            orderItem={orderItem}
                            categoryId={categoryId}
                            customization={customization}
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
