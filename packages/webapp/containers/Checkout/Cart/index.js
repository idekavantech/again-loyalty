import React, { Fragment, memo, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { compose } from "redux";

import Axios from "axios";

import {
  makeSelectOrdersBySiteDomain,
  makeSelectPlugin,
  makeSelectUrlPrefix,
} from "@saas/stores/plugins/selector";
import { coal } from "@saas/utils/colors";
import { isBusinessOpenNow } from "@saas/utils/helpers/isBusinessOpenNow";
import { hexToRgb } from "@saas/utils/helpers/hexToRgb";
import { getWorkingDayStart } from "@saas/utils/helpers/getWorkingDayStart";
import { BASE_PLUGIN, SHOPPING_PLUGIN } from "@saas/utils/constants/plugins";
import {
  FULFILLMENT_CARRY_OUT,
  FULFILLMENT_ON_BUSINESS_SITE,
  FULFILLMENT_ON_USER_SITE,
  FULFILLMENT_ON_WEBSITE,
  SHOPPING_ORDER_INVOICE_DTO,
} from "@saas/plugins/Shopping/constants";
import {
  makeSelectBusiness,
  makeSelectBusinessThemeColor,
  makeSelectBusinessThemeConfig,
  makeSelectBusinessWorkingHours,
} from "@saas/stores/business/selector";
import {
  decrementOrderItemByOrderId,
  incrementOrderItemByOrderId,
  submitOrderEndUser,
} from "@saas/plugins/Shopping/actions";
import { makeSelectUser } from "@saas/stores/user/selector";
import { makeSelectLoading } from "@saas/stores/global/selectors";
import { useResponsive } from "@saas/utils/hooks/useResponsive";
import EmptyState from "containers/Checkout/Cart/components/EmptyState";
import CheckoutOrderCard from "containers/Checkout/Cart/components/CheckoutOrderCard";
import { useCallToAction } from "containers/Checkout/Cart/hooks/useCallToAction";
import { useOrdersFactor } from "containers/Checkout/Cart/hooks/useOrdersFactor";
import { useFulfillmentTypes } from "containers/Checkout/Cart/hooks/useFulfillmentTypes";
import { usePopup } from "containers/Checkout/Cart/hooks/usePopup";
import { useTableNumber } from "containers/Checkout/Cart/hooks/useTableNumber";
import { useFulfillmentType } from "containers/Checkout/Cart/hooks/useFulfillmentType";
import { useSubmit } from "containers/Checkout/Cart/hooks/useSubmit";
import FulfillmentTypesDrawer from "containers/Checkout/Cart/components/drawers/FulfillmentTypesDrawer";
import SalesInvoiceDrawer from "containers/Checkout/Cart/components/drawers/SalesInvoiceDrawer";
import Popup from "containers/Checkout/Cart/components/Popup";
import MobileFooter from "containers/Checkout/Cart/components/MobileFooter";
import Factor from "containers/Checkout/Cart/components/Factor";
import FulfillmentTypesDropDown from "containers/Checkout/Cart/components/FulfillmentTypesDropDown";

import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { getOrderForBehtarinoTraffic } from "@saas/plugins/Shopping/saga";
import LoadingIndicator from "@saas/components/LoadingIndicator";

function Cart({
  orders,
  workingHours,
  _increaseOrderItem,
  _decreaseOrderItem,
  isAuthenticated,
  _submitOrderEndUser,
  business,
  shoppingPluginData,
  themeColor,
  user,
  themeConfig,
  isLoading,
  basePluginData,
  urlPrefix,
  _fetchOrder,
}) {
  const router = useRouter();

  const { minWidth768 } = useResponsive();
  const { tableNumber } = useTableNumber();
  const { fulfillmentTypes } = useFulfillmentTypes(basePluginData);
  const { allItemsCount, allItemsPrice, allItemsDiscounts, amountOfTax } =
    useOrdersFactor(orders, business);

  const [isPriceDetailsCollapseOpen, setPriceDetailsCollapseOpen] =
    useState(false);
  const [isFulfillmentTypesDropDownOpen, setFulfillmentTypesDropDownOpen] =
    useState(false);
  const [isSalesInvoiceDrawerOpen, setSalesInvoiceDrawerOpen] = useState(false);
  const [isFulfillmentTypesDrawerOpen, setFulfillmentTypesDrawerOpen] =
    useState(false);

  const rgbThemeColor = hexToRgb(themeColor);

  const autoSubmit = router?.query?.auto_submit;
  const token = router?.query?.token;

  const nextWorkingDay = getWorkingDayStart(workingHours);

  const isCustomerOrderingOpen =
    typeof shoppingPluginData?.data?.is_open !== "boolean"
      ? true
      : shoppingPluginData?.data?.is_open;

  const businessCannotTakeOrders =
    !isCustomerOrderingOpen ||
    (!isBusinessOpenNow(workingHours) &&
      business?.is_open_out_of_working_hours !== true);

  const availableFulfillmentTypes = useMemo(() => {
    return (
      shoppingPluginData?.data?.delivery_type_options || [
        FULFILLMENT_ON_BUSINESS_SITE,
        FULFILLMENT_CARRY_OUT,
        FULFILLMENT_ON_USER_SITE,
        FULFILLMENT_ON_WEBSITE,
      ]
    );
  }, [shoppingPluginData?.data?.delivery_type_options]);

  const { popupHTMLContent, shouldPopupBeOpen } = usePopup(
    isCustomerOrderingOpen,
    themeConfig,
    shoppingPluginData,
    workingHours,
    business,
    nextWorkingDay
  );

  const { selectedFulfillmentType, setFulfillmentType } = useFulfillmentType(
    availableFulfillmentTypes,
    fulfillmentTypes,
    tableNumber,
    shoppingPluginData,
    autoSubmit,
    business
  );

  const { submit } = useSubmit(
    isAuthenticated,
    selectedFulfillmentType,
    user,
    business,
    orders,
    urlPrefix,
    _submitOrderEndUser
  );

  const { callToActionConfig } = useCallToAction(
    isAuthenticated,
    shoppingPluginData,
    selectedFulfillmentType
  );

  const isSubmitButtonDisabled =
    !orders?.length ||
    businessCannotTakeOrders ||
    isLoading ||
    callToActionConfig.isDisabled;

  const Icon = selectedFulfillmentType?.icon;

  useEffect(() => {
    setTimeout(() => {
      const { order_id: orderId } = router.query;
      if (orderId) _fetchOrder({ id: orderId });
      sessionStorage.removeItem(SHOPPING_ORDER_INVOICE_DTO);
    }, 0);
  }, []);

  useEffect(() => {
    const selectedFulfillmentTypeNameByUserFromLocalStorage =
      localStorage.getItem(`selectedGettingOrderMethodName-${business?.id}`);
    if (
      autoSubmit &&
      selectedFulfillmentTypeNameByUserFromLocalStorage &&
      orders?.length
    ) {
      submit(selectedFulfillmentTypeNameByUserFromLocalStorage);
    }
  }, [autoSubmit, orders?.length]);

  const toggleDrawer = (setStateFunction) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setStateFunction();
  };

  useEffect(() => {
    if (token) {
      Axios.defaults.headers.common.Authorization = `Token ${token}`;
    }
  }, [token]);

  if (!nextWorkingDay) {
    return null;
  }

  return (
    <div className={`py-2 py-md-4 ${minWidth768 && "container"}`}>
      {shouldPopupBeOpen ? (
        <Popup
          popupHTMLContent={popupHTMLContent}
          themeColor={themeColor}
          rgbThemeColor={rgbThemeColor}
        />
      ) : null}
      {isLoading ? <LoadingIndicator /> : orders?.length ? (
        <>
          <div
            key={0}
            className="col-12 u-fontLarge u-fontWeightBold pb-2"
            style={{ color: coal }}
          >
            انتخاب نحوه دریافت سفارش
          </div>
          <div className="d-flex">
            <div className="col-12 col-md-8">
              <FulfillmentTypesDropDown
                rgbThemeColor={rgbThemeColor}
                selectedFulfillmentType={selectedFulfillmentType}
                availableFulfillmentTypes={availableFulfillmentTypes}
                minWidth768={minWidth768}
                setFulfillmentTypesDropDownOpen={
                  setFulfillmentTypesDropDownOpen
                }
                isFulfillmentTypesDropDownOpen={isFulfillmentTypesDropDownOpen}
                setFulfillmentTypesDrawerOpen={setFulfillmentTypesDrawerOpen}
                isFulfillmentTypesDrawerOpen={isFulfillmentTypesDrawerOpen}
                toggleDrawer={toggleDrawer}
                shoppingPluginData={shoppingPluginData}
                themeColor={themeColor}
                Icon={Icon}
                fulfillmentTypes={fulfillmentTypes}
                setFulfillmentType={setFulfillmentType}
              />
              <section className="mt-3">
                <Paper
                  elevation={1}
                  className="pt-3 pt-md-5 px-2 d-flex flex-column"
                  style={{ marginBottom: minWidth768 ? "" : 85 }}
                >
                  {orders?.map((order, index) => (
                    <Fragment key={order.id}>
                      <CheckoutOrderCard
                        order={order}
                        increase={_increaseOrderItem}
                        decrease={_decreaseOrderItem}
                        themeColor={themeColor}
                      />
                      {index !== orders.length - 1 && (
                        <div className="px-md-4 pb-5">
                          <Divider />
                        </div>
                      )}
                    </Fragment>
                  ))}
                </Paper>
              </section>
            </div>

            {minWidth768 ? (
              <Factor
                isPriceDetailsCollapseOpen={isPriceDetailsCollapseOpen}
                setPriceDetailsCollapseOpen={setPriceDetailsCollapseOpen}
                allItemsCount={allItemsCount}
                allItemsPrice={allItemsPrice}
                orders={orders}
                allItemsDiscounts={allItemsDiscounts}
                themeColor={themeColor}
                selectedFulfillmentType={selectedFulfillmentType}
                amountOfTax={amountOfTax}
                business={business}
                isSubmitButtonDisabled={isSubmitButtonDisabled}
                isLoading={isLoading}
                submit={submit}
                callToActionConfig={callToActionConfig}
              />
            ) : null}

            {!minWidth768 ? (
              <Fragment>
                <MobileFooter
                  setSalesInvoiceDrawerOpen={setSalesInvoiceDrawerOpen}
                  isSalesInvoiceDrawerOpen={isSalesInvoiceDrawerOpen}
                  toggleDrawer={toggleDrawer}
                  allItemsPrice={allItemsPrice}
                  allItemsDiscounts={allItemsDiscounts}
                  isSubmitButtonDisabled={isSubmitButtonDisabled}
                  submit={submit}
                  isLoading={isLoading}
                  callToActionConfig={callToActionConfig}
                  themeColor={themeColor}
                />
                <SalesInvoiceDrawer
                  isSalesInvoiceDrawerOpen={isSalesInvoiceDrawerOpen}
                  setSalesInvoiceDrawerOpen={setSalesInvoiceDrawerOpen}
                  toggleDrawer={toggleDrawer}
                  setPriceDetailsCollapseOpen={setPriceDetailsCollapseOpen}
                  isPriceDetailsCollapseOpen={isPriceDetailsCollapseOpen}
                  allItemsCount={allItemsCount}
                  allItemsPrice={allItemsPrice}
                  orders={orders}
                  allItemsDiscounts={allItemsDiscounts}
                  selectedFulfillmentType={selectedFulfillmentType}
                  amountOfTax={amountOfTax}
                  business={business}
                  themeColor={themeColor}
                />
                <FulfillmentTypesDrawer
                  isFulfillmentTypesDrawerOpen={isFulfillmentTypesDrawerOpen}
                  setFulfillmentTypesDrawerOpen={setFulfillmentTypesDrawerOpen}
                  toggleDrawer={toggleDrawer}
                  availableFulfillmentTypes={availableFulfillmentTypes}
                  setFulfillmentType={setFulfillmentType}
                  selectedFulfillmentType={selectedFulfillmentType}
                  fulfillmentTypes={fulfillmentTypes}
                />
              </Fragment>
            ) : null}
          </div>
        </>
      ) : (
        <EmptyState themeColor={themeColor} urlPrefix={urlPrefix} />
      )}
    </div>
  );
}
const mapStateToProps = createStructuredSelector({
  orders: makeSelectOrdersBySiteDomain(),
  workingHours: makeSelectBusinessWorkingHours(),
  isAuthenticated: makeSelectUser(),
  business: makeSelectBusiness(),
  shoppingPluginData: makeSelectPlugin(SHOPPING_PLUGIN),
  basePluginData: makeSelectPlugin(BASE_PLUGIN),
  themeColor: makeSelectBusinessThemeColor(),
  user: makeSelectUser(),
  themeConfig: makeSelectBusinessThemeConfig(),
  isLoading: makeSelectLoading(),
  urlPrefix: makeSelectUrlPrefix(),
});

function mapDispatchToProps(dispatch) {
  return {
    _increaseOrderItem: (order_id) =>
      dispatch(incrementOrderItemByOrderId(order_id)),
    _decreaseOrderItem: (order_id) =>
      dispatch(decrementOrderItemByOrderId(order_id)),
    _submitOrderEndUser: (order, callback) =>
      dispatch(submitOrderEndUser(order, callback)),
    _fetchOrder: (data) => dispatch(getOrderForBehtarinoTraffic(data)),
  };
}
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, memo)(Cart);
