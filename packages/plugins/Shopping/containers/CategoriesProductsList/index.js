import { memo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeColor,
} from "@saas/stores/business/selector";
import { CATEGORY_DEALS } from "@saas/stores/global/constants";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { makeSelectUrlPrefix } from "@saas/stores/plugins/selector";
import CategoryProductsList from "../CategoryProductsList";
import SkeletonRenderer from "./components/SkeletonRenderer";
import EmptyResults from "../HierarchyCategory/EmptyResults";

const CategoriesProductsList = ({
  categoriesProducts,
  isCategoiesDealsLoading,
  orders = [],
  addOrderItemToCart,
  decrementOrderItem,
  incrementOrderItemByOrderId,
  decrementOrderItemByOrderId,
  updateOrderItemByOrderId,
  updateMultipleOrdersItems,
  deleteOrderItem,
  themeColor,
  finalPrice,
  isLoading,
  couldShop,
  urlPrefix,
}) => {
  return (
    <div style={{ minHeight: 400 }}>
      {!isCategoiesDealsLoading && !isLoading ? (
        categoriesProducts.length === 0 ? (
          <div className="mt-5">
            <EmptyResults />
          </div>
        ) : (
          categoriesProducts.map((category, index) => (
            <CategoryProductsList
              key={category.id}
              name={category.title}
              id={category.id}
              index={index}
              deals={category.products}
              orders={orders}
              addOrderItemToCart={addOrderItemToCart}
              decrementOrderItem={decrementOrderItem}
              incrementOrderItemByOrderId={incrementOrderItemByOrderId}
              decrementOrderItemByOrderId={decrementOrderItemByOrderId}
              updateOrderItemByOrderId={updateOrderItemByOrderId}
              updateMultipleOrdersItems={updateMultipleOrdersItems}
              deleteOrderItem={deleteOrderItem}
              themeColor={themeColor}
              finalPrice={finalPrice}
              couldShop={couldShop}
              urlPrefix={urlPrefix}
            />
          ))
        )
      ) : (
        <>
          <SkeletonRenderer />
        </>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  themeColor: makeSelectBusinessThemeColor(),
  business: makeSelectBusiness(),
  urlPrefix: makeSelectUrlPrefix(),
  isCategoiesDealsLoading: makeSelectLoading(CATEGORY_DEALS),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect, memo)(CategoriesProductsList);
