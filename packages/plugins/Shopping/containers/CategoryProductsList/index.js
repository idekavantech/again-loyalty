import { useResponsive } from "@saas/utils/hooks/useResponsive";
import { memo, useEffect, useMemo, useState } from "react";
import DesktopProductCard from "../../components/ProductCard2/DesktopProductCard";
import MobileProductCard from "../../components/ProductCard2/MobileProductCard";
import moment from "moment-jalaali";
import { isCurrentTimeAvailable } from "@saas/utils/helpers/isCurrentTimeAvailable";

const CategoryProductList = ({
  id,
  name,
  deals,
  orders,
  addOrderItemToCart,
  incrementOrderItemByOrderId,
  decrementOrderItemByOrderId,
  updateOrderItemByOrderId,
  updateMultipleOrdersItems,
  deleteOrderItem,
  finalPrice,
  isMobile,
  couldShop,
}) => {
  const {maxWidth768} = useResponsive()
  const isMobileMatch = typeof isMobile === "boolean" ? isMobile : maxWidth768;
  const [orderItemsGroupByProductId, setOrderItemsGroupByProductId] = useState(
    {}
  );
  const _orders = useMemo(() => JSON.stringify(orders), [orders]);

  useEffect(() => {
    const _orderItemsGroupByProductId = {};
    orders.forEach((order) => {
      if (!_orderItemsGroupByProductId[order?.product?.id]) {
        _orderItemsGroupByProductId[order?.product?.id] = [];
      }
      _orderItemsGroupByProductId[order?.product?.id].push(order);
    });
    setOrderItemsGroupByProductId(_orderItemsGroupByProductId);
  }, [_orders, deals, orders]);
  return (
    <div id={`category-${id}`} className="products-container text-right">
      <h2
        className={`${isMobile ? "pt-5 pb-4" : "pb-3 pt-5"}`}
        style={{
          fontSize: isMobile ? 16 : 24,
          fontWeight: 600,
          color: "black",
        }}
      >
        {name}
      </h2>
      <div className="row">
        {deals
          .filter(
            (deal) =>
              !deal.extra_data ||
              (!deal.extra_data.shifts && !deal?.extra_data?.only_on_day) ||
              (isCurrentTimeAvailable(deal.extra_data.shifts) &&
                (deal?.extra_data?.only_on_day &&
                deal?.extra_data?.only_on_day.length
                  ? deal?.extra_data?.only_on_day.find(
                      (sc) => sc.id === moment().day()
                    )
                  : true))
          )
          .filter((deal) => !deal?.default_variation?.extra_data?.is_hidden)
          .filter(
            (deal) =>
              !deal?.variations?.variations_table ||
              (deal?.variations?.variations_table &&
                Object.values(deal?.variations?.variations_table).find(
                  (variation) => !variation?.extra_data?.is_hidden
                ))
          )
          .map((deal) => {
            if (!isMobileMatch) {
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
                <>
                  <div key={deal.id} className="col-xl-4 col-md-6 col-12 my-3">
                    <DesktopProductCard
                      deal={deal}
                      incrementOrderItemByOrderId={incrementOrderItemByOrderId}
                      decrementOrderItemByOrderId={decrementOrderItemByOrderId}
                      addOrderItemToCart={addOrderItemToCart}
                      updateOrderItemByOrderId={updateOrderItemByOrderId}
                      updateMultipleOrdersItems={updateMultipleOrdersItems}
                      deleteOrderItem={deleteOrderItem}
                      finalPrice={finalPrice}
                      orderItem={orderItem}
                      customizedOrderItems={customizedOrderItems}
                      couldShop={couldShop}
                      categoryId={id}
                    />
                  </div>
                </>
              );
            }
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
              <div key={deal.id} className="col-12 mb-3">
                <MobileProductCard
                  deal={deal}
                  incrementOrderItemByOrderId={incrementOrderItemByOrderId}
                  decrementOrderItemByOrderId={decrementOrderItemByOrderId}
                  addOrderItemToCart={addOrderItemToCart}
                  updateOrderItemByOrderId={updateOrderItemByOrderId}
                  updateMultipleOrdersItems={updateMultipleOrdersItems}
                  deleteOrderItem={deleteOrderItem}
                  finalPrice={finalPrice}
                  orderItem={orderItem || { count: 0 }}
                  customizedOrderItems={customizedOrderItems}
                  couldShop={couldShop}
                  categoryId={id}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default memo(CategoryProductList);
